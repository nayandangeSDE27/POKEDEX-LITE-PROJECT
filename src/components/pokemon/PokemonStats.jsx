'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { STAT_COLORS } from '@/constants/pokemonTypes';
import { formatStatName } from '@/lib/utils/format';

const MAX_STAT = 255;

export default function PokemonStats({ stats }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {stats.map((s, i) => {
        const key = s.stat.name;
        const config = STAT_COLORS[key] || { color: '#8888aa', label: formatStatName(key) };
        const pct = Math.round((s.base_stat / MAX_STAT) * 100);

        return (
          <div key={key} className="flex items-center gap-3">
            <span
              className="text-[11px] font-bold uppercase tracking-widest w-14 text-right shrink-0"
              style={{ color: config.color }}
            >
              {config.label}
            </span>
            <span className="text-sm font-semibold text-ink-secondary w-7 shrink-0 tabular-nums">
              {s.base_stat}
            </span>
            <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: config.color }}
                initial={{ width: shouldReduce ? `${pct}%` : '0%' }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: shouldReduce ? 0 : 0.6,
                  delay: shouldReduce ? 0 : i * 0.08,
                  ease: [0.34, 1.0, 0.64, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
