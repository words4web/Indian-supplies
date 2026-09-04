export function CheckoutSkeleton() {
  return (
    <div className="mt-6 sm:mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-7 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-secondary animate-shimmer" />
          <div className="h-8 w-60 sm:w-80 rounded-lg bg-secondary animate-shimmer" />
          <div className="h-4 w-11/12 rounded bg-secondary animate-shimmer" />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-36 rounded bg-secondary animate-shimmer" />
            <div className="h-4 w-28 rounded bg-secondary animate-shimmer" />
          </div>
          <div className="h-12 w-full rounded-xl bg-secondary animate-shimmer" />
        </div>

        <div className="pt-4 border-t border-border/40 space-y-2">
          <div className="h-4 w-24 rounded bg-secondary animate-shimmer" />
          <div className="h-20 w-full rounded-xl bg-secondary animate-shimmer" />
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-5">
        <div className="h-6 w-36 rounded-md bg-secondary animate-shimmer" />

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="h-4 w-36 rounded bg-secondary animate-shimmer" />
                <div className="h-3 w-20 rounded bg-secondary animate-shimmer" />
              </div>
              <div className="h-4 w-12 rounded bg-secondary animate-shimmer" />
            </div>
          ))}
        </div>

        <div className="my-4 border-t border-border/60" />

        <div className="space-y-2.5">
          <div className="flex justify-between">
            <div className="h-4 w-28 rounded bg-secondary animate-shimmer" />
            <div className="h-4 w-16 rounded bg-secondary animate-shimmer" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 rounded bg-secondary animate-shimmer" />
            <div className="h-4 w-12 rounded bg-secondary animate-shimmer" />
          </div>
        </div>

        <div className="my-4 border-t border-border/60" />

        <div className="flex justify-between items-baseline">
          <div className="h-5 w-28 rounded bg-secondary animate-shimmer" />
          <div className="h-7 w-20 rounded bg-secondary animate-shimmer" />
        </div>

        <div className="h-11 w-full rounded-xl bg-secondary animate-shimmer mt-4" />
      </div>
    </div>
  );
}
