'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

const Input = forwardRef(function Input(
  { className, leftIcon, rightIcon, wrapperClassName, ...props },
  ref
) {
  if (leftIcon || rightIcon) {
    return (
      <div className={cn('relative flex items-center', wrapperClassName)}>
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-ink-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface-elevated border border-surface-border rounded-xl',
            'text-sm text-ink-primary placeholder:text-ink-muted',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            'py-2.5',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-ink-muted">{rightIcon}</div>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(
        'w-full bg-surface-elevated border border-surface-border rounded-xl',
        'px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted',
        'transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50',
        className
      )}
      {...props}
    />
  );
});

export default Input;
