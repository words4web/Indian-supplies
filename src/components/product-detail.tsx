"use client";

import Link from "next/link";
import { ArrowLeft, Check, Minus, Plus, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { useAuth } from "@/hooks/useAuth";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function add() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="size-4" /> Back to catalogue
        </Link>

        <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
          <div className="w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm flex flex-col justify-center min-h-[350px]">
            <ProductVisual product={product} large />
          </div>

          <div className="flex flex-col justify-between py-2">
            <div className="space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                {product.categoryName}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                High-quality wholesale pack selected for restaurant and supply
                retail businesses. Freshly catalogued and ready for immediate
                dispatch.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {formatPounds(product.price)}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    Guide price per pack (excluding VAT)
                  </p>
                </div>
                <div className="rounded-xl bg-secondary px-3.5 py-2 text-xs font-bold text-secondary-foreground shadow-sm">
                  {product.pack ?? "Wholesale pack"}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between rounded-xl border border-input bg-card shadow-sm overflow-hidden h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!user}
                    className="px-4 h-full hover:bg-muted transition-colors disabled:opacity-50"
                    aria-label="Decrease quantity">
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    disabled={!user}
                    className="px-4 h-full hover:bg-muted transition-colors disabled:opacity-50"
                    aria-label="Increase quantity">
                    <Plus className="size-4" />
                  </button>
                </div>

                {user ? (
                  <Button
                    className="flex-1 h-11 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                    size="lg"
                    onClick={add}>
                    {added ? (
                      <Check className="size-4" />
                    ) : (
                      <ShoppingBasket className="size-4" />
                    )}
                    {added ? "Added to basket" : "Add to basket"}
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="flex-1 h-11 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                    size="lg">
                    <Link href="/login">Login to Add</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
