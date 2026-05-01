import { PokemonCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <div className="h-9 w-48 rounded-xl bg-surface-elevated animate-pulse" />
        <div className="h-4 w-32 rounded-lg bg-surface-elevated animate-pulse" />
      </div>
      <div className="h-11 w-full max-w-md rounded-xl bg-surface-elevated animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
