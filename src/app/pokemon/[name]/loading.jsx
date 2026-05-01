import Skeleton from '@/components/ui/Skeleton';

export default function PokemonDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Skeleton className="h-5 w-32" />
      <div className="rounded-3xl border border-surface-border overflow-hidden bg-surface-card">
        <div className="flex flex-col sm:flex-row items-center gap-8 px-8 pt-10 pb-8">
          <Skeleton className="w-[220px] h-[220px] rounded-3xl shrink-0" />
          <div className="flex-1 w-full space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-10 w-56" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full max-w-sm" />
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[0, 1, 2].map((i) => <Skeleton key={i} className="h-12" />)}
            </div>
          </div>
        </div>
        <div className="border-t border-surface-border p-8 space-y-3">
          <Skeleton className="h-3 w-20" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="flex-1 h-2 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
