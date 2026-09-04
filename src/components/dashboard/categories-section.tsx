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
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
            Shop by need
          </p>
          <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight">
            Browse categories
          </h2>
        </div>
        <Link
          href={ROUTES.CATALOGUE}
          className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:flex">
          View all <ChevronRight className="size-4" />
        </Link>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card p-4">
                <div className="size-10 rounded-xl bg-secondary animate-shimmer shrink-0" />
                <div className="h-4 w-24 rounded bg-secondary animate-shimmer" />
              </div>
            ))
          : categories?.map((category, index) => (
              <Link
                key={category?.id}
                href={ROUTES.CATALOGUE_CATEGORY(category?.slug || category?.id)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40">
                <CategoryVisual category={category} index={index} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">
                    {category?.name}
                  </span>
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
