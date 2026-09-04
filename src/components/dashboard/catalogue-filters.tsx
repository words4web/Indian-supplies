"use client";

import { Search } from "lucide-react";
import { CatalogueFiltersProps } from "@/types/category/category.types";
import { CategorySkeleton } from "@/components/skeleton/category-skeleton";

export function CatalogueFilters({
  query,
  setQuery,
  selectedCategory,
  onSelectCategory,
  categories,
  isLoadingCategories = false,
}: CatalogueFiltersProps & { isLoadingCategories?: boolean }) {
  return (
    <div className="mt-4 sm:mt-7 flex flex-col gap-3 sm:gap-4">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3.5 sm:left-4 top-1/2 size-4 sm:size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, packs, or categories"
          className="h-11 sm:h-14 w-full rounded-xl sm:rounded-2xl border border-input bg-card pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer">
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isLoadingCategories ? (
          <CategorySkeleton />
        ) : (
          <div
            className="flex min-w-0 flex-1 gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 sm:pb-2 scrollbar-none sm:scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent scrollbar-thumb-rounded-full"
            aria-label="Product categories">
            {categories?.map((category) => {
              const isSelected =
                selectedCategory === category?.slug ||
                selectedCategory === category?.id;
              return (
                <button
                  key={category?.id}
                  type="button"
                  onClick={() =>
                    onSelectCategory(category?.slug || category?.id)
                  }
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  }`}>
                  {category?.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogueFilters;
