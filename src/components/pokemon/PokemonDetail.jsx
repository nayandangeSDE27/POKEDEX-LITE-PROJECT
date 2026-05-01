'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getPokemonSpecies, getSpriteUrl, getFlavorText } from '@/lib/api/pokeapi';
import { formatPokemonName, formatPokemonId, formatHeight, formatWeight } from '@/lib/utils/format';
import { TYPE_COLORS } from '@/constants/pokemonTypes';
import TypeBadge from './TypeBadge';
import PokemonStats from './PokemonStats';
import FavoriteButton from './FavoriteButton';
import Spinner from '@/components/ui/Spinner';

const tabContent = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.12 } },
};

export default function PokemonDetail({ pokemon, onClose, onPrev, onNext }) {
  const [species, setSpecies] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!pokemon) return;
    setSpecies(null);
    setActiveTab('stats');
    getPokemonSpecies(pokemon.name).then(setSpecies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.name]);

  if (!pokemon) return null;

  const sprite = getSpriteUrl(pokemon);
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
  const flavor = species ? getFlavorText(species) : null;
  const height = formatHeight(pokemon.height);
  const weight = formatWeight(pokemon.weight);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="relative pt-6 pb-4 px-6 flex flex-col items-center overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${typeColor.color}28 0%, ${typeColor.color}0a 55%, transparent 100%)`,
        }}
      >
        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-surface-elevated hover:bg-surface-border text-ink-secondary transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </motion.button>
          <div className="flex items-center gap-2">
            <FavoriteButton pokemonName={pokemon.name} />
            <Link
              href={`/pokemon/${pokemon.name}`}
              className="h-8 px-3 flex items-center gap-1.5 rounded-full bg-surface-elevated hover:bg-surface-border text-ink-secondary hover:text-ink-primary text-xs font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
              </svg>
              Full page
            </Link>
          </div>
        </div>

        {/* Sprite — bounces in */}
        <motion.div
          key={pokemon.name}
          initial={shouldReduce ? false : { opacity: 0, scale: 0.75, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.05 }}
          className="relative mt-4"
        >
          {sprite ? (
            <Image src={sprite} alt={pokemon.name} width={160} height={160} className="drop-shadow-2xl" priority />
          ) : (
            <div className="h-40 w-40 flex items-center justify-center text-5xl opacity-20">?</div>
          )}
        </motion.div>

        {/* Name + number */}
        <motion.div
          key={`info-${pokemon.name}`}
          initial={shouldReduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          className="text-center mt-2"
        >
          <p className="text-xs font-mono text-ink-muted mb-0.5">{formatPokemonId(pokemon.id)}</p>
          <h2 className="text-2xl font-bold text-ink-primary">{formatPokemonName(pokemon.name)}</h2>
          <div className="flex gap-2 justify-center mt-2.5">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="sm" />
            ))}
          </div>
        </motion.div>

        {/* Flavor text */}
        <AnimatePresence mode="wait">
          {!species ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center mt-3 h-4"
            >
              <Spinner size="sm" />
            </motion.div>
          ) : flavor ? (
            <motion.p
              key="flavor"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-ink-secondary text-center mt-3 max-w-sm leading-relaxed italic"
            >
              &ldquo;{flavor}&rdquo;
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Physical stats row */}
      <div className="grid grid-cols-3 divide-x divide-surface-border border-t border-surface-border">
        {[
          { label: 'Height', primary: height.metric, secondary: height.imperial },
          { label: 'Weight', primary: weight.metric, secondary: weight.imperial },
          {
            label: 'Gen',
            primary: species?.generation?.name?.replace('generation-', '')?.toUpperCase() ?? '—',
            secondary: null,
          },
        ].map(({ label, primary, secondary }) => (
          <div key={label} className="flex flex-col items-center py-3">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold mb-0.5">{label}</span>
            <span className="text-sm font-semibold text-ink-primary">{primary}</span>
            {secondary && <span className="text-[10px] text-ink-muted">{secondary}</span>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-t border-surface-border">
        <div className="flex relative">
          {['stats', 'abilities', 'moves'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest transition-colors relative ${
                activeTab === tab ? 'text-ink-primary' : 'text-ink-muted hover:text-ink-secondary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: typeColor.color }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="p-5 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={shouldReduce ? {} : tabContent}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {activeTab === 'stats' && <PokemonStats stats={pokemon.stats} />}

              {activeTab === 'abilities' && (
                <div className="space-y-2">
                  {pokemon.abilities.map((a, i) => (
                    <motion.div
                      key={a.ability.name}
                      initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.2 }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-elevated border border-surface-border"
                    >
                      <span className="text-sm font-medium text-ink-primary capitalize">
                        {a.ability.name.replace(/-/g, ' ')}
                      </span>
                      {a.is_hidden && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 font-semibold uppercase tracking-wide">
                          Hidden
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'moves' && (
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {pokemon.moves.slice(0, 40).map((m) => (
                    <span
                      key={m.move.name}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border text-ink-secondary capitalize"
                    >
                      {m.move.name.replace(/-/g, ' ')}
                    </span>
                  ))}
                  {pokemon.moves.length > 40 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-lg text-ink-muted">
                      +{pokemon.moves.length - 40} more
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next */}
      {(onPrev || onNext) && (
        <div className="flex border-t border-surface-border">
          <motion.button
            onClick={onPrev}
            disabled={!onPrev}
            whileHover={onPrev ? { x: -2 } : {}}
            whileTap={onPrev ? { scale: 0.95 } : {}}
            className="flex-1 py-3 flex items-center justify-center gap-2 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-30 disabled:pointer-events-none transition-colors hover:bg-surface-elevated"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
            </svg>
            Previous
          </motion.button>
          <div className="w-px bg-surface-border" />
          <motion.button
            onClick={onNext}
            disabled={!onNext}
            whileHover={onNext ? { x: 2 } : {}}
            whileTap={onNext ? { scale: 0.95 } : {}}
            className="flex-1 py-3 flex items-center justify-center gap-2 text-xs text-ink-secondary hover:text-ink-primary disabled:opacity-30 disabled:pointer-events-none transition-colors hover:bg-surface-elevated"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
}
