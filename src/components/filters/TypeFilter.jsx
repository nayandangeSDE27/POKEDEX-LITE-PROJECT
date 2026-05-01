'use client';

import { ALL_TYPES } from '@/constants/pokemonTypes';
import TypeBadge from '@/components/pokemon/TypeBadge';

export default function TypeFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_TYPES.map((type) => (
        <TypeBadge
          key={type}
          type={type}
          interactive
          selected={selected === type}
          onClick={() => onSelect(type)}
          size="sm"
        />
      ))}
    </div>
  );
}
