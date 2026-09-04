"use client";

import { useParams } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { ProductDetail } from "@/components/product-detail";
import { ErrorView } from "@/components/common/ErrorView";
import { useProductDetail } from "@/services/product/product.hook";
import { ProductDetailSkeleton } from "@/components/skeleton/product-detail-skeleton";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error, refetch } = useProductDetail(slug);
  const productData = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <ProductDetailSkeleton />
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
    description: productData?.description || "",
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
    isVatApplicable: productData?.isVatApplicable,
    relatedProducts: Array.isArray(productData?.relatedProducts)
      ? productData?.relatedProducts
      : [],
  };

  return (
    <>
      <PortalHeader />
      <ProductDetail product={product} />
    </>
  );
}
