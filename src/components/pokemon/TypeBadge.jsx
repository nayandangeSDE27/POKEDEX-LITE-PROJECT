'use client';

import { motion } from 'framer-motion';
import { TYPE_COLORS } from '@/constants/pokemonTypes';
import { capitalize } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export default function TypeBadge({ type, interactive = false, selected = false, onClick, size = 'sm' }) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS.normal;

  const sizeClass = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wider',
    sm: 'text-xs px-2.5 py-1 tracking-wide',
    md: 'text-sm px-3 py-1.5 tracking-wide',
  }[size];

  const style = {
    backgroundColor: selected ? colors.color + '33' : colors.bg,
    color: colors.text,
    border: `1px solid ${selected ? colors.color + '66' : colors.color + '30'}`,
    boxShadow: selected ? `0 0 10px -2px ${colors.glow}` : 'none',
  };

  if (interactive) {
    return (
      <motion.button
        onClick={onClick}
        style={style}
        whileHover={{ y: -1, boxShadow: `0 4px 14px -2px ${colors.glow}` }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.12 }}
        className={cn(
          'inline-flex items-center rounded-full font-semibold uppercase cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          sizeClass
        )}
      >
        {capitalize(type)}
      </motion.button>
    );
  }

  return (
    <span
      style={style}
      className={cn(
        'inline-flex items-center rounded-full font-semibold uppercase',
        sizeClass
      )}
    >
      {capitalize(type)}
    </span>
  );
}
