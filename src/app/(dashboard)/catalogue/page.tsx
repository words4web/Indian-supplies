"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/portal-header";
import { EmptyProducts, ProductGrid } from "@/components/product-card";
import { Loader } from "@/components/common/Loader";
import { ErrorView } from "@/components/common/ErrorView";
import { CatalogueFilters } from "@/components/dashboard/catalogue-filters";
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";
import { CategoryItem } from "@/types/category/category.types";
import { useDebounce } from "@/hooks/useDebounce";

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories({ limit: 100 });
  const fetchedCategories = categoriesData?.data?.categories || [];

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts({
    limit: 100,
    categoryId: selectedCategory === "all" ? undefined : selectedCategory,
    search: debouncedQuery?.trim() || undefined,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const categories: CategoryItem[] = fetchedCategories.map((cat: any) => ({
    id: cat?._id,
    name: cat?.name,
  }));

  const products = fetchedProducts?.map((prod: any) => ({
    id: prod?._id,
    name: prod?.name,
    slug: prod?.slug,
    pack: prod?.pack || null,
    price: prod?.price || null,
    categoryId:
      typeof prod?.categoryId === "object"
        ? prod?.categoryId?._id
        : prod?.categoryId || "",
    categoryName:
      typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
  }));

  function selectCategory(categoryId: string) {
    setSelectedCategory(categoryId);
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
              Indian Supplies
            </p>
            <h1 className="mt-2 font-serif text-4xl font-extrabold tracking-tight">
              Wholesale catalogue
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Find the right pack for your shelves. Browse by category or search
              the full list.
            </p>
          </div>
        </div>

        <CatalogueFilters
          query={query}
          setQuery={setQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategory}
          categories={categories}
        />

        {isCategoriesError || isProductsError ? (
          <ErrorView
            message={
              (categoriesError as any)?.response?.data?.message ??
              (productsError as any)?.response?.data?.message ??
              "Failed to load catalogue. Please check your connection."
            }
            onRetry={() => {
              refetchCategories();
              refetchProducts();
            }}
            className="mt-8"
          />
        ) : isLoadingProducts || isLoadingCategories ? (
          <div className="flex items-center justify-center min-h-[250px]">
            <Loader size="md" />
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-end">
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  className="text-sm font-bold text-primary hover:underline"
                  onClick={() => selectCategory("all")}>
                  Show all products
                </button>
              )}
            </div>
            <div className="mt-4">
              {products.length ? (
                <ProductGrid products={products} />
              ) : (
                <EmptyProducts query={query} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
