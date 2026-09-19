import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryVisual } from "@/components/product-visual";
import { ROUTES } from "@/constants/routes";

import { CategoriesSectionProps } from "@/types/category/category.types";

export function CategoriesSection({
  categories,
  isLoading = false,
}: CategoriesSectionProps & { isLoading?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-3.5 sm:px-5 py-8 sm:py-14 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-primary">
            Shop by need
          </p>
          <h2 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
            Browse categories
          </h2>
        </div>
        <Link
          href={ROUTES.CATALOGUE}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:underline">
          View all <ChevronRight className="size-3.5 sm:size-4" />
        </Link>
      </div>
      <div className="mt-5 sm:mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border/80 bg-card p-2.5 sm:p-4 shadow-xs">
                <div className="size-10 sm:size-14 rounded-xl bg-secondary animate-shimmer shrink-0" />
                <div className="h-3.5 sm:h-4 w-16 sm:w-24 rounded bg-secondary animate-shimmer" />
              </div>
            ))
          : categories?.map((category, index) => (
              <Link
                key={category?.id}
                href={ROUTES.CATALOGUE_CATEGORY(category?.slug || category?.id)}
                className="group flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-border bg-card p-2.5 sm:p-4 transition-all hover:border-primary/40 hover:bg-secondary/40 hover:shadow-xs active:scale-[0.98]">
                <CategoryVisual category={category} index={index} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {category?.name}
                  </span>
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
