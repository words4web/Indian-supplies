import { ProductCardSkeleton } from "./product-skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/15">
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="h-5 w-36 rounded-md bg-secondary animate-shimmer mb-8" />

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="w-full h-[380px] sm:h-[450px] rounded-3xl bg-secondary animate-shimmer" />

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-24 rounded-full bg-secondary animate-shimmer" />
                <div className="h-6 w-28 rounded-full bg-secondary animate-shimmer" />
              </div>

              <div className="space-y-2 pt-1">
                <div className="h-9 w-4/5 rounded-lg bg-secondary animate-shimmer" />
                <div className="h-9 w-3/5 rounded-lg bg-secondary animate-shimmer" />
              </div>

              <div className="pt-4 space-y-2 border-t border-border/40">
                <div className="h-4 w-28 rounded bg-secondary animate-shimmer mb-3" />
                <div className="h-4 w-full rounded bg-secondary animate-shimmer" />
                <div className="h-4 w-11/12 rounded bg-secondary animate-shimmer" />
                <div className="h-4 w-4/5 rounded bg-secondary animate-shimmer" />
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-9 w-32 rounded-lg bg-secondary animate-shimmer" />
                </div>
                <div className="h-8 w-24 rounded-xl bg-secondary animate-shimmer" />
              </div>

              <div className="flex items-center gap-3">
                <div className="h-11 w-32 rounded-xl bg-secondary animate-shimmer" />
                <div className="h-11 flex-1 rounded-xl bg-secondary animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border/60">
          <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-48 rounded-lg bg-secondary animate-shimmer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
