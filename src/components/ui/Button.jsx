'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

const variants = {
  primary:
    'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-900/40 active:scale-[0.97]',
  secondary:
    'bg-surface-elevated hover:bg-white/10 text-ink-primary border border-surface-border active:scale-[0.97]',
  ghost: 'hover:bg-white/6 text-ink-secondary hover:text-ink-primary active:scale-[0.97]',
  danger: 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20 active:scale-[0.97]',
};

const sizes = {
  sm: 'h-7 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-6 text-base gap-2.5 rounded-xl',
  icon: 'h-9 w-9 rounded-lg',
};

const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150 select-none',
        'disabled:opacity-40 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
