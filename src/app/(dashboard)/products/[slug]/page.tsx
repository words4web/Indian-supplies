"use client";

import { useParams } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { ProductDetail } from "@/components/product-detail";
import { Loader } from "@/components/common/Loader";
import { ErrorView } from "@/components/common/ErrorView";
import { useProductDetail } from "@/services/product/product.hook";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error, refetch } = useProductDetail(slug);
  const productData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <main className="flex items-center justify-center min-h-[400px]">
          <Loader size="lg" />
        </main>
      </div>
    );
  }

  if (isError || !productData) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <main className="mx-auto max-w-3xl px-5 py-20">
          <ErrorView
            message={
              (error as any)?.response?.data?.message ?? "Product not found"
            }
            onRetry={refetch}
          />
        </main>
      </div>
    );
  }

  const product = {
    id: productData?._id,
    name: productData?.name,
    slug: productData?.slug,
    pack: productData?.pack || null,
    price: productData?.price || null,
    categoryId:
      typeof productData?.categoryId === "object"
        ? productData?.categoryId?._id
        : productData?.categoryId || "",
    categoryName:
      typeof productData?.categoryId === "object"
        ? productData?.categoryId?.name
        : "",
  };

  return (
    <>
      <PortalHeader />
      <ProductDetail product={product} />
    </>
  );
}
