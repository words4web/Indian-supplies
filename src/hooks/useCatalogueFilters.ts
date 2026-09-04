"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryItem } from "@/types/category/category.types";

export function useCatalogueFilters(categories: CategoryItem[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const queryFromUrl = searchParams.get("search") || "";

  const debouncedQuery = useDebounce(queryFromUrl, 500);

  const activeCategory =
    categories?.find(
      (cat) => cat?.slug === categoryFromUrl || cat?.id === categoryFromUrl,
    ) || (categories?.length > 0 ? categories[0] : null);

  const selectedCategoryIdentifier =
    categoryFromUrl ||
    (activeCategory ? activeCategory?.slug || activeCategory?.id : "");

  useEffect(() => {
    if (!categoryFromUrl && activeCategory) {
      const defaultSlug = activeCategory.slug || activeCategory.id;
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", defaultSlug);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [categoryFromUrl, activeCategory, pathname, router, searchParams]);

  const selectCategory = useCallback(
    (categorySlugOrId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", categorySlugOrId);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const setQuery = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newQuery) {
        params.set("search", newQuery);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (categories.length > 0) {
      params.set("category", categories[0]?.slug || categories[0]?.id);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [categories, pathname, router]);

  return {
    query: queryFromUrl,
    debouncedQuery,
    selectedCategoryIdentifier,
    activeCategory,
    selectCategory,
    setQuery,
    resetFilters,
  };
}
