'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';

export default function FilterBar({
  searchQuery,
  onSearch,
  selectedType,
  onTypeSelect,
  totalCount,
  isPending,
}) {
  const [typeOpen, setTypeOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={onSearch} isPending={isPending} />
        </div>
        <motion.button
          onClick={() => setTypeOpen((v) => !v)}
          whileTap={shouldReduce ? {} : { scale: 0.94 }}
          className={`h-11 px-4 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center gap-2 shrink-0
            ${selectedType
              ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
              : 'bg-surface-elevated border-surface-border text-ink-secondary hover:text-ink-primary hover:border-white/10'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" />
          </svg>
          {selectedType ? (
            <span className="capitalize">{selectedType}</span>
          ) : (
            'Types'
          )}
          {selectedType && (
            <span
              onClick={(e) => { e.stopPropagation(); onTypeSelect(''); }}
              className="ml-0.5 hover:text-white"
              role="button"
              aria-label="Clear type filter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
              </svg>
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {typeOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-2">
              <TypeFilter selected={selectedType} onSelect={(t) => { onTypeSelect(t); }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(searchQuery || selectedType) && (
        <p className="text-xs text-ink-muted">
          {totalCount.toLocaleString()} Pokémon found
          {searchQuery && <> matching <span className="text-ink-secondary font-medium">&ldquo;{searchQuery}&rdquo;</span></>}
          {selectedType && <> of type <span className="capitalize text-ink-secondary font-medium">{selectedType}</span></>}
        </p>
      )}
    </div>
  );
}
