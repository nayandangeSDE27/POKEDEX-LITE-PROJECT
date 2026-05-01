'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils/cn';

export default function FavoriteButton({ pokemonName, className }) {
  const { isFavorite, toggleFavorite, pendingToggles } = useFavorites();
  const shouldReduce = useReducedMotion();
  const active = isFavorite(pokemonName);
  const pending = pendingToggles.has(pokemonName);

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(pokemonName);
      }}
      disabled={pending}
      whileHover={shouldReduce ? {} : { scale: 1.1 }}
      whileTap={shouldReduce ? {} : { scale: 0.85 }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'relative flex items-center justify-center h-8 w-8 rounded-full',
        'transition-colors duration-150',
        active
          ? 'text-red-400 bg-red-500/15 hover:bg-red-500/25'
          : 'text-ink-muted bg-surface-elevated hover:bg-surface-border hover:text-ink-secondary',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {/* Burst ring that pops on activate */}
      <AnimatePresence>
        {active && !shouldReduce && (
          <motion.span
            key="burst"
            className="absolute inset-0 rounded-full border border-red-400/60 pointer-events-none"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.9, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.8}
        className="w-4 h-4"
        animate={shouldReduce ? {} : active
          ? { scale: [1, 1.45, 0.88, 1.1, 1], transition: { duration: 0.38, ease: 'easeOut' } }
          : { scale: 1 }
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </motion.svg>
    </motion.button>
  );
}
