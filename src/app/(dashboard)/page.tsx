"use client";

import { PortalHeader } from "@/components/portal-header";
import { HeroSection } from "@/components/dashboard/hero-section";
import { CategoriesSection } from "@/components/dashboard/categories-section";
import { ProductsSection } from "@/components/dashboard/products-section";
import { FeaturesSection } from "@/components/dashboard/features-section";
import { Footer } from "@/components/footer";
import { useCategories } from "@/services/category/category.hook";
import { useProducts } from "@/services/product/product.hook";

import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { user } = useAuth();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const fetchedCategories = categoriesData?.data?.categories || [];

  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    limit: 32,
  });
  const fetchedProducts = productsData?.data?.products || [];

  const categories = fetchedCategories?.map((cat: any) => ({
    id: cat?._id,
    name: cat?.name,
    slug: cat?.slug,
  }));

  const featured = fetchedProducts?.map((prod: any) => ({
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="flex-grow">
        <HeroSection />
        <CategoriesSection
          categories={categories}
          isLoading={isLoadingCategories}
        />
        <ProductsSection products={featured} isLoading={isLoadingProducts} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
