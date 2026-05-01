'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllPokemonNames, fetchPokemonBatch, getPokemonByType } from '@/lib/api/pokeapi';
import { PAGE_SIZE } from '@/constants/config';
import { getPageItems, getTotalPages } from '@/lib/utils/pagination';
import { useDebounce } from './useDebounce';

export function usePokemonList() {
  const [allNames, setAllNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [typeCache, setTypeCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchPending, setIsSearchPending] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 280);
  const fetchGeneration = useRef(0);

  // Load all Pokémon names on mount
  useEffect(() => {
    getAllPokemonNames()
      .then((names) => {
        setAllNames(names);
        setFilteredNames(names);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Track debounce pending state
  useEffect(() => {
    setIsSearchPending(searchQuery !== debouncedSearch);
  }, [searchQuery, debouncedSearch]);

  // Apply search + type filters whenever they change
  useEffect(() => {
    if (allNames.length === 0) return;

    async function applyFilters() {
      let names = allNames;

      if (selectedType) {
        if (typeCache[selectedType]) {
          names = typeCache[selectedType];
        } else {
          try {
            const typeNames = await getPokemonByType(selectedType);
            const typeSet = new Set(typeNames);
            const filtered = allNames.filter((p) => typeSet.has(p.name));
            setTypeCache((prev) => ({ ...prev, [selectedType]: filtered }));
            names = filtered;
          } catch {
            names = allNames;
          }
        }
      }

      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        names = names.filter((p) => p.name.includes(query));
      }

      setFilteredNames(names);
      setPage(1);
    }

    applyFilters();
    // typeCache is read-only here and guards against redundant fetches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedType, allNames]);

  // Fetch detail data for the current page
  useEffect(() => {
    if (loading || filteredNames.length === 0) {
      if (!loading && filteredNames.length === 0) setCurrentPageData([]);
      return;
    }

    const gen = ++fetchGeneration.current;
    setPageLoading(true);

    const pageNames = getPageItems(filteredNames, page, PAGE_SIZE).map((p) => p.name);

    fetchPokemonBatch(pageNames).then((data) => {
      if (gen !== fetchGeneration.current) return; // stale, discard
      setCurrentPageData(data);
      setPageLoading(false);
    });
  }, [filteredNames, page, loading]);

  const totalPages = getTotalPages(filteredNames.length, PAGE_SIZE);

  const handleSearch = useCallback((q) => setSearchQuery(q), []);

  const handleTypeSelect = useCallback(
    (type) => setSelectedType((prev) => (prev === type ? '' : type)),
    []
  );

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [totalPages]
  );

  return {
    pokemon: currentPageData,
    page,
    totalPages,
    totalCount: filteredNames.length,
    loading,
    pageLoading,
    error,
    isSearchPending,
    searchQuery,
    selectedType,
    handleSearch,
    handleTypeSelect,
    handlePageChange,
  };
}
