import { cn } from '@/lib/utils/cn';

export default function Spinner({ className, size = 'md' }) {
  const sizes = { sm: 'h-4 w-4 border-[1.5px]', md: 'h-6 w-6 border-2', lg: 'h-10 w-10 border-[3px]' };
  return (
    <div
      className={cn(
        'rounded-full border-surface-border border-t-indigo-500 animate-spin',
        sizes[size],
        className
      )}
    />
  );
}
