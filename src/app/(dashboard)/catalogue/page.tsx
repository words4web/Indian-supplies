"use client";

import { PortalHeader } from "@/components/portal-header";
import { EmptyProducts, ProductGrid } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton/product-skeleton";
import { ErrorView } from "@/components/common/ErrorView";
import { CatalogueFilters } from "@/components/dashboard/catalogue-filters";
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";
import { CategoryItem } from "@/types/category/category.types";
import { useCatalogueFilters } from "@/hooks/useCatalogueFilters";

export default function CataloguePage() {
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useCategories({ limit: 100 });
  const fetchedCategories = categoriesData?.data?.categories || [];

  const categories: CategoryItem[] = fetchedCategories.map((cat: any) => ({
    id: cat?._id,
    name: cat?.name,
    slug: cat?.slug,
  }));

  const {
    query,
    debouncedQuery,
    selectedCategoryIdentifier,
    activeCategory,
    selectCategory,
    setQuery,
  } = useCatalogueFilters(categories);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts({
    limit: 100,
    categoryId: activeCategory?.id || undefined,
    search: debouncedQuery?.trim() || undefined,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const products = fetchedProducts?.map((prod: any) => ({
    id: prod?._id,
    name: prod?.name,
    slug: prod?.slug,
    description: prod?.description || "",
    pack: prod?.pack || null,
    price: prod?.price || null,
    categoryId:
      typeof prod?.categoryId === "object"
        ? prod?.categoryId?._id
        : prod?.categoryId || "",
    categoryName:
      typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
  }));

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-7xl px-3.5 sm:px-5 pb-10">
        <CatalogueFilters
          query={query}
          setQuery={setQuery}
          selectedCategory={selectedCategoryIdentifier}
          onSelectCategory={selectCategory}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
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
            className="mt-6 sm:mt-8"
          />
        ) : isLoadingProducts ? (
          <div className="mt-5 sm:mt-8">
            <ProductGridSkeleton count={8} />
          </div>
        ) : (
          <div className="mt-5 sm:mt-8">
            {products.length ? (
              <ProductGrid products={products} />
            ) : (
              <EmptyProducts query={query} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
