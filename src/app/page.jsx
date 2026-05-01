'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePokemonList } from '@/hooks/usePokemonList';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import FilterBar from '@/components/filters/FilterBar';
import Pagination from '@/components/pagination/Pagination';
import Modal from '@/components/ui/Modal';
import PokemonDetail from '@/components/pokemon/PokemonDetail';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const {
    pokemon,
    page,
    totalPages,
    totalCount,
    loading,
    pageLoading,
    error,
    isSearchPending,
    searchQuery,
    selectedType,
    handleSearch,
    handleTypeSelect,
    handlePageChange,
  } = usePokemonList();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCardClick = useCallback(
    (p) => {
      const idx = pokemon.findIndex((pk) => pk.id === p.id);
      setSelectedPokemon(p);
      setSelectedIndex(idx);
    },
    [pokemon]
  );

  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedPokemon(pokemon[selectedIndex - 1]);
      setSelectedIndex((i) => i - 1);
    }
  }, [selectedIndex, pokemon]);

  const handleNext = useCallback(() => {
    if (selectedIndex < pokemon.length - 1) {
      setSelectedPokemon(pokemon[selectedIndex + 1]);
      setSelectedIndex((i) => i + 1);
    }
  }, [selectedIndex, pokemon]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-xl font-semibold text-ink-primary">Failed to load Pokémon</p>
        <p className="text-ink-secondary text-sm">{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const showGrid = !loading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="space-y-1"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-primary tracking-tight">
          All Pokémon
        </h1>
        {!loading && (
          <p className="text-ink-secondary text-sm">
            {totalCount.toLocaleString()} in the Pokédex
            {selectedType && `, filtered by type`}
          </p>
        )}
      </motion.div>

      {/* Filters */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <FilterBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
            totalCount={totalCount}
            isPending={isSearchPending}
          />
        </motion.div>
      )}

      {/* Grid area */}
      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-ink-muted animate-pulse_soft">Loading Pokémon…</p>
          </div>
        </div>
      ) : (
        <div className="relative min-h-[400px]">
          <AnimatePresence>
            {pageLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: 'var(--overlay-bg)', backdropFilter: 'blur(4px)' }}
              >
                <Spinner size="md" />
              </motion.div>
            )}
          </AnimatePresence>
          <PokemonGrid
            pokemon={pokemon}
            loading={pageLoading && pokemon.length === 0}
            onCardClick={handleCardClick}
          />
        </div>
      )}

      {/* Pagination */}
      {showGrid && totalPages > 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </motion.div>
      )}

      {/* Detail modal */}
      <Modal open={!!selectedPokemon} onClose={() => setSelectedPokemon(null)} size="lg">
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onPrev={selectedIndex > 0 ? handlePrev : null}
            onNext={selectedIndex < pokemon.length - 1 ? handleNext : null}
          />
        )}
      </Modal>
    </div>
  );
}
