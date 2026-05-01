'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PokemonCard from './PokemonCard';
import { PokemonCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.03 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const emptyVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function PokemonGrid({ pokemon, loading, onCardClick }) {
  const shouldReduce = useReducedMotion();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </motion.div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <motion.div variants={emptyVariants} initial="hidden" animate="show">
        <EmptyState
          icon="🔍"
          title="No Pokémon found"
          description="Try adjusting your search query or clearing the type filter."
        />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pokemon.map((p) => p.id).join(',')}
        variants={shouldReduce ? {} : containerVariants}
        initial={shouldReduce ? false : 'hidden'}
        animate="show"
        exit={shouldReduce ? {} : 'exit'}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} onClick={onCardClick} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
