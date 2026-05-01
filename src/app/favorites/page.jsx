'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchPokemonBatch } from '@/lib/api/pokeapi';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PokemonDetail from '@/components/pokemon/PokemonDetail';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FavoritesPage() {
  const { favorites, cloudLoading, clearAllFavorites } = useFavorites();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (cloudLoading) return;
    if (favorites.length === 0) {
      setPokemon([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchPokemonBatch(favorites)
      .then((data) => {
        const sorted = data.sort((a, b) => a.id - b.id);
        setPokemon(sorted);
      })
      .catch(() => setPokemon([]))
      .finally(() => setLoading(false));
  }, [favorites, cloudLoading]);

  const handleCardClick = (p) => {
    const idx = pokemon.findIndex((pk) => pk.id === p.id);
    setSelectedPokemon(p);
    setSelectedIndex(idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex items-center justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-ink-primary tracking-tight">Favorites</h1>
          {!loading && !cloudLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="text-ink-secondary text-sm"
            >
              {favorites.length > 0
                ? `${favorites.length} saved Pokémon`
                : 'None saved yet'}
            </motion.p>
          )}
        </div>
        {!loading && !cloudLoading && favorites.length > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={clearAllFavorites}
            className="h-8 px-3 rounded-lg text-xs font-medium text-ink-muted hover:text-red-400 hover:bg-red-500/10 border border-surface-border hover:border-red-500/20 transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </motion.div>

      {cloudLoading || loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-32"
        >
          <Spinner size="lg" />
        </motion.div>
      ) : favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
        >
          <EmptyState
            icon="♡"
            title="No favorites yet"
            description="Browse the Pokédex and tap the heart on any Pokémon to save it here."
            action={
              <Link href="/">
                <Button variant="secondary">Browse Pokédex</Button>
              </Link>
            }
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <PokemonGrid pokemon={pokemon} loading={loading} onCardClick={handleCardClick} />
        </motion.div>
      )}

      <Modal open={!!selectedPokemon} onClose={() => setSelectedPokemon(null)} size="lg">
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onPrev={selectedIndex > 0 ? () => { setSelectedPokemon(pokemon[selectedIndex - 1]); setSelectedIndex(selectedIndex - 1); } : null}
            onNext={selectedIndex < pokemon.length - 1 ? () => { setSelectedPokemon(pokemon[selectedIndex + 1]); setSelectedIndex(selectedIndex + 1); } : null}
          />
        )}
      </Modal>
    </div>
  );
}
