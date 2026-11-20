"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/types/product/product.types";
import { formatPounds } from "@/lib/format";
import { ProductVisual } from "@/components/product-visual";
import { CartQuantityControl } from "@/components/common/CartQuantityControl";
import { ROUTES } from "@/constants/routes";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const productHref = ROUTES.PRODUCT_DETAIL(product?.slug);

  const handleCardClick = () => {
    if (product?.slug) {
      router.push(productHref);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between cursor-pointer">
      <div className="relative w-full [perspective:1000px] overflow-hidden rounded-t-xl sm:rounded-t-2xl flex-1 flex flex-col">
        <div className="relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex-1 flex flex-col">
          <div className="w-full h-full flex flex-col justify-between bg-card [backface-visibility:hidden]">
            <div className="w-full aspect-square relative overflow-hidden">
              <ProductVisual product={product} />
            </div>
            <div className="p-2.5 sm:p-4 space-y-0.5 sm:space-y-1 min-h-[3.5rem] sm:min-h-[4.5rem]">
              <h3 className="line-clamp-2 font-serif text-xs sm:text-[15px] font-extrabold leading-snug text-card-foreground group-hover:text-primary transition-colors">
                {product?.name}
              </h3>
              <p className="text-[10px] sm:text-xs font-medium text-white">
                {product?.pack
                  ? `Pack size · ${product?.pack}`
                  : "Wholesale pack"}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full bg-card dark:bg-card text-foreground dark:text-foreground p-3.5 sm:p-4 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border-b border-border/80 shadow-inner">
            <div className="space-y-2 flex-1 min-h-0 flex flex-col">
              <div>
                <h3 className="font-serif text-sm sm:text-base font-extrabold leading-snug text-foreground line-clamp-2">
                  {product?.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-primary mt-0.5">
                  {product?.pack
                    ? `Pack size · ${product?.pack}`
                    : "Wholesale pack"}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-none pr-0.5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-2 cursor-pointer font-normal">
                {product?.description ? (
                  product.description
                ) : (
                  <span className="italic text-muted-foreground/60">
                    No detailed description available for this product.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-4 pt-1.5 sm:pt-2 bg-card z-10 border-t border-border/30">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <p className="font-serif text-sm sm:text-lg font-extrabold text-foreground">
            {formatPounds(product?.price)}
          </p>
          <CartQuantityControl product={product} size="sm" showAddButtonWhenZero />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  );
}

export function EmptyProducts({ query }: { query?: string }) {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">
      <p className="font-serif text-xl font-bold">No products found</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {query ? `Nothing matched “${query}”.` : "Try a different category."}
      </p>
    </div>
  );
}
