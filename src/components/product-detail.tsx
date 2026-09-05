"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { ProductGrid } from "@/components/product-card";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function add() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  const relatedProductsList = Array.isArray(product?.relatedProducts)
    ? product?.relatedProducts.map((rel: any) => ({
        id: rel?._id || rel?.id,
        name: rel?.name,
        slug: rel?.slug,
        description: rel?.description || "",
        pack: rel?.pack || null,
        price: rel?.price || null,
        categoryId: product?.categoryId,
        categoryName: product?.categoryName,
      }))
    : [];

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/catalogue");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/15">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-8 group cursor-pointer">
          <ArrowLeft className="size-3.5 sm:size-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 md:items-start">
          <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col justify-center min-h-[260px] sm:min-h-[380px] md:sticky md:top-24">
            <ProductVisual product={product} large />
          </div>

          <div className="flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  {product?.categoryName}
                </span>
                {product?.isVatApplicable && (
                  <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                    VAT Applicable
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-snug">
                {product?.name}
              </h1>

              <div className="pt-2 border-t border-border/40">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">
                  Description
                </h3>
                <div className="text-xs sm:text-sm leading-relaxed text-muted-foreground whitespace-pre-line font-normal max-h-48 sm:max-h-none overflow-y-auto scrollbar-thin">
                  {product?.description || (
                    <span className="italic text-muted-foreground/70">
                      No detailed description available for this product.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    <p className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {formatPounds(
                        product?.isVatApplicable && product?.price
                          ? product?.price * 1.2
                          : product?.price,
                      )}
                    </p>
                    {product?.isVatApplicable && (
                      <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground">
                        (Includes VAT)
                      </span>
                    )}
                  </div>
                </div>
                <div className="rounded-lg sm:rounded-xl bg-secondary px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-bold text-secondary-foreground shadow-sm shrink-0">
                  {product?.pack ?? "Wholesale pack"}
                </div>
              </div>

              <div className="flex flex-row items-center gap-2.5 sm:gap-3">
                <div className="flex items-center justify-between rounded-xl border border-input bg-card shadow-sm overflow-hidden h-10 sm:h-11 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!user}
                    className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
                    aria-label="Decrease quantity">
                    <Minus className="size-3.5 sm:size-4" />
                  </button>
                  <span className="px-3 sm:px-4 text-xs sm:text-sm font-extrabold min-w-[2rem] sm:min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!user}
                    className="px-3 sm:px-4 h-full hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"
                    aria-label="Increase quantity">
                    <Plus className="size-3.5 sm:size-4" />
                  </button>
                </div>

                {user ? (
                  <Button
                    onClick={add}
                    size="lg"
                    className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
                    {added ? (
                      <Check className="size-3.5 sm:size-4" />
                    ) : (
                      <ShoppingCart className="size-3.5 sm:size-4" />
                    )}
                    <span>{added ? "Added to cart" : "Add to cart"}</span>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="flex-1 h-10 sm:h-11 text-xs sm:text-sm rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    size="lg">
                    <Link href={ROUTES.LOGIN}>Login to Add</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {relatedProductsList?.length > 0 && (
          <section className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-border/60 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                  Related Products
                </h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                  Complementary items recommended for your store inventory
                </p>
              </div>
            </div>
            <ProductGrid products={relatedProductsList} />
          </section>
        )}
      </main>
    </div>
  );
}
