"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { CatalogueFiltersProps } from "@/types/category/category.types";

export function CatalogueFilters({
  query,
  setQuery,
  selectedCategory,
  onSelectCategory,
  categories,
}: CatalogueFiltersProps) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, packs, or categories"
          className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-12 text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary hover:underline">
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <SlidersHorizontal
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div
          className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent scrollbar-thumb-rounded-full"
          aria-label="Product categories">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            }`}>
            All products
          </button>
          {categories?.map((category) => (
            <button
              key={category?.id}
              type="button"
              onClick={() => onSelectCategory(category?.id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}>
              {category?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogueFilters;
