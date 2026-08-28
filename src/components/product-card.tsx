"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { useAuth } from "@/hooks/useAuth";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);
  function add() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="block">
        <ProductVisual product={product} />
      </div>
      <div className="space-y-3 p-4">
        <div className="min-h-16">
          <Link
            href={`/products/${product?.slug}`}
            className="line-clamp-2 font-serif text-[15px] font-extrabold leading-snug text-card-foreground hover:text-primary after:absolute after:inset-0 after:content-['']">
            {product?.name}
          </Link>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {product?.pack ? `Pack size · ${product?.pack}` : "Wholesale pack"}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-serif text-lg font-extrabold text-foreground">
              {formatPounds(product?.price)}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground">
              guide price / pack
            </p>
          </div>
          {user ? (
            <Button
              size="sm"
              variant={added ? "secondary" : "default"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                add();
              }}
              className="relative z-10"
              aria-label={`${added ? "Added" : "Add"} ${product?.name} to basket`}>
              {added ? <Check /> : <Plus />}
              <span className="hidden sm:inline">
                {added ? "Added" : "Add"}
              </span>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = "/login";
              }}
              className="relative z-10 text-[11px] h-8"
              aria-label="Login to add to basket">
              Login to Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
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
