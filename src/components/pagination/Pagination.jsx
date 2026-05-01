'use client';

import { motion } from 'framer-motion';
import { getPageRange } from '@/lib/utils/pagination';
import { cn } from '@/lib/utils/cn';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const range = getPageRange(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <PageButton
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
        </svg>
      </PageButton>

      {range.map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-ink-muted text-sm select-none">
            ···
          </span>
        ) : (
          <PageButton
            key={item}
            active={item === page}
            onClick={() => onChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
        </svg>
      </PageButton>
    </nav>
  );
}

function PageButton({ children, active, disabled, onClick, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'h-9 min-w-[36px] px-2 rounded-lg text-sm font-medium transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        active
          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/50'
          : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-elevated border border-transparent hover:border-surface-border',
        disabled && 'opacity-30 pointer-events-none'
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
