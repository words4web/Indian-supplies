export function CategorySkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-28 shrink-0 rounded-full bg-muted/70 animate-pulse animate-shimmer relative overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
}
