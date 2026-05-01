'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getSpriteUrl as getSprite } from '@/lib/api/pokeapi';
import { TYPE_COLORS } from '@/constants/pokemonTypes';
import { formatPokemonName as fmtName, formatPokemonId as fmtId } from '@/lib/utils/format';
import TypeBadge from './TypeBadge';
import FavoriteButton from './FavoriteButton';

export const cardItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.32, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function PokemonCard({ pokemon, onClick }) {
  const shouldReduce = useReducedMotion();
  const sprite = getSprite(pokemon);
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  return (
    <motion.div
      variants={cardItemVariants}
      whileHover={shouldReduce ? {} : { y: -7, transition: { duration: 0.18, ease: 'easeOut' } }}
      whileTap={shouldReduce ? {} : { scale: 0.96, transition: { duration: 0.1 } }}
      onClick={() => onClick?.(pokemon)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(pokemon); }}
      className="group relative flex flex-col items-center rounded-2xl overflow-hidden cursor-pointer select-none
        border border-surface-border bg-surface-card
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* Colored glow shadow — appears on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 20px 50px -10px ${typeColor.glow}, 0 0 0 1px rgba(255,255,255,0.07)` }}
      />

      {/* Radial type-color gradient background */}
      <div
        className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${typeColor.color}28 0%, transparent 68%)`,
        }}
      />

      {/* Subtle shimmer line that scans on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${typeColor.color}88, transparent)` }}
      />

      {/* Top row */}
      <div className="relative w-full flex items-center justify-between px-4 pt-4 pb-1">
        <span className="font-mono text-[11px] font-medium text-ink-muted group-hover:text-ink-secondary transition-colors duration-200">
          {fmtId(pokemon.id)}
        </span>
        <FavoriteButton pokemonName={pokemon.name} />
      </div>

      {/* Sprite — floats up on hover */}
      <div className="relative z-10 px-3 py-2 transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-110 will-change-transform">
        {sprite ? (
          <Image
            src={sprite}
            alt={pokemon.name}
            width={112}
            height={112}
            className="drop-shadow-md group-hover:drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-[filter] duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center text-5xl text-ink-muted opacity-20">?</div>
        )}
      </div>

      {/* Info */}
      <div className="relative w-full px-4 pb-4 flex flex-col items-center gap-2">
        <p className="font-bold text-sm text-ink-primary text-center leading-tight tracking-tight">
          {fmtName(pokemon.name)}
        </p>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} size="xs" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
