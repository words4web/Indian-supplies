export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden animate-pulse flex flex-col justify-between">
      <div className="w-full aspect-square bg-muted/60 animate-shimmer relative overflow-hidden" />
      <div className="p-4 space-y-3">
        <div className="space-y-1.5 min-h-[4.5rem]">
          <div className="h-4 w-3/4 bg-muted/80 rounded animate-shimmer relative overflow-hidden" />
          <div className="h-3 w-1/2 bg-muted/50 rounded mt-1 animate-shimmer relative overflow-hidden" />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/40">
          <div className="h-5 w-16 bg-muted/80 rounded animate-shimmer relative overflow-hidden" />
          <div className="h-8 w-20 bg-muted/70 rounded-xl animate-shimmer relative overflow-hidden" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
