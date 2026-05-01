import { cn } from '@/lib/utils/cn';

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'rounded-lg bg-surface-elevated animate-pulse',
        className
      )}
    />
  );
}

export function PokemonCardSkeleton() {
  return (
    <div className="relative rounded-2xl bg-surface-card border border-surface-border overflow-hidden p-5 flex flex-col items-center gap-4">
      <div className="absolute top-3 right-3">
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-28 w-28 rounded-full mt-2" />
      <div className="w-full space-y-2.5">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <div className="flex justify-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
