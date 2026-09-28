export function OrderDetailSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-44 rounded-xl bg-secondary animate-shimmer" />
          <div className="h-6 w-24 rounded-full bg-secondary animate-shimmer" />
        </div>
        <div className="h-4 w-56 rounded bg-secondary animate-shimmer" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 space-y-4">
            <div className="h-6 w-36 rounded bg-secondary animate-shimmer" />
            <div className="space-y-3">
              <div className="h-20 rounded-xl bg-secondary animate-shimmer" />
              <div className="h-20 rounded-xl bg-secondary animate-shimmer" />
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 space-y-4">
            <div className="h-6 w-36 rounded bg-secondary animate-shimmer" />
            <div className="h-28 rounded-xl bg-secondary animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
