"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CategoryItem } from "@/types/category/category.types";

export function useCatalogueFilters(categories: CategoryItem[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const searchFromUrl = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUrlSearchRef = useRef(searchFromUrl);

  useEffect(() => {
    if (searchFromUrl !== lastUrlSearchRef.current) {
      lastUrlSearchRef.current = searchFromUrl;
      setSearchInput(searchFromUrl);
    }
  }, [searchFromUrl]);

  const isSearching = Boolean(searchFromUrl.trim());

  const activeCategory = isSearching
    ? null
    : categories?.find(
        (cat) => cat?.slug === categoryFromUrl || cat?.id === categoryFromUrl,
      ) || (categories?.length > 0 ? categories[0] : null);

  const selectedCategoryIdentifier = isSearching
    ? ""
    : categoryFromUrl ||
      (activeCategory ? activeCategory?.slug || activeCategory?.id : "");

  useEffect(() => {
    if (!isSearching && !categoryFromUrl && activeCategory) {
      const defaultSlug = activeCategory.slug || activeCategory.id;
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", defaultSlug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    isSearching,
    categoryFromUrl,
    activeCategory,
    pathname,
    router,
    searchParams,
  ]);

  useEffect(() => {
    const trimmedInput = searchInput.trim();

    if (trimmedInput === searchFromUrl.trim()) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmedInput) {
        params.set("search", trimmedInput);
        params.delete("category");
      } else {
        params.delete("search");
        if (categories?.length > 0) {
          const defaultCat = categories[0]?.slug || categories[0]?.id;
          params.set("category", defaultCat);
        }
      }

      lastUrlSearchRef.current = trimmedInput;
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInput, searchFromUrl, categories, pathname, router, searchParams]);

  const selectCategory = useCallback(
    (categorySlugOrId: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      setSearchInput("");
      lastUrlSearchRef.current = "";

      const params = new URLSearchParams();
      params.set("category", categorySlugOrId);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  const setQuery = useCallback((newQuery: string) => {
    setSearchInput(newQuery);
  }, []);

  const resetFilters = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setSearchInput("");
    lastUrlSearchRef.current = "";

    const params = new URLSearchParams();
    if (categories?.length > 0) {
      params.set("category", categories[0]?.slug || categories[0]?.id);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [categories, pathname, router]);

  return {
    query: searchInput,
    debouncedQuery: searchFromUrl,
    selectedCategoryIdentifier,
    activeCategory,
    selectCategory,
    setQuery,
    resetFilters,
  };
}
