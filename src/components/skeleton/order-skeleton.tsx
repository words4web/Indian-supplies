export function OrderSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="inline-flex w-full sm:w-auto items-center gap-2 rounded-2xl bg-muted/80 p-1.5 border border-border/50">
        <div className="h-11 w-36 rounded-xl bg-secondary animate-shimmer" />
        <div className="h-11 w-36 rounded-xl bg-secondary animate-shimmer" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-7 w-28 rounded-lg bg-secondary animate-shimmer" />
                <div className="h-6 w-20 rounded-full bg-secondary animate-shimmer" />
              </div>
              <div className="h-4 w-32 rounded bg-secondary animate-shimmer" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-muted/40 p-3 sm:p-4 border border-border/50">
              <div className="grid grid-cols-3 gap-2 sm:gap-6 flex-1">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-secondary animate-shimmer" />
                  <div className="h-5 w-12 rounded bg-secondary animate-shimmer" />
                </div>
                <div className="space-y-2 border-l border-border/60 pl-3 sm:pl-4">
                  <div className="h-3 w-16 rounded bg-secondary animate-shimmer" />
                  <div className="h-5 w-14 rounded bg-secondary animate-shimmer" />
                </div>
                <div className="space-y-2 border-l border-border/60 pl-3 sm:pl-4">
                  <div className="h-3 w-16 rounded bg-secondary animate-shimmer" />
                  <div className="h-5 w-16 rounded bg-secondary animate-shimmer" />
                </div>
              </div>
              <div className="h-9 w-28 rounded-lg bg-secondary animate-shimmer self-end sm:self-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
