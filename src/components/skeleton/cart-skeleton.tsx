export function CartSkeleton() {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-5 w-3/4 sm:w-1/2 rounded-md bg-secondary animate-shimmer" />
              <div className="h-4 w-1/3 rounded-md bg-secondary animate-shimmer" />
              <div className="pt-2 flex items-center gap-3">
                <div className="h-9 w-28 rounded-lg bg-secondary animate-shimmer" />
                <div className="h-4 w-16 rounded bg-secondary animate-shimmer" />
              </div>
            </div>
            <div className="h-6 w-20 rounded-md bg-secondary animate-shimmer self-end sm:self-center" />
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-border/80 bg-card p-5 space-y-4">
        <div className="h-6 w-36 rounded-md bg-secondary animate-shimmer" />
        <div className="space-y-3 pt-2">
          <div className="flex justify-between">
            <div className="h-4 w-32 rounded bg-secondary animate-shimmer" />
            <div className="h-4 w-16 rounded bg-secondary animate-shimmer" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-secondary animate-shimmer" />
            <div className="h-4 w-12 rounded bg-secondary animate-shimmer" />
          </div>
        </div>
        <div className="my-4 border-t border-border/60" />
        <div className="flex justify-between">
          <div className="h-5 w-28 rounded bg-secondary animate-shimmer" />
          <div className="h-6 w-20 rounded bg-secondary animate-shimmer" />
        </div>
        <div className="h-11 w-full rounded-xl bg-secondary animate-shimmer mt-6" />
      </aside>
    </div>
  );
}
