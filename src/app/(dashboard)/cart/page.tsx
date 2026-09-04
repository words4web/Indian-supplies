"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { useCart } from "@/hooks/useCart";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { CartSkeleton } from "@/components/skeleton/cart-skeleton";
import { CartItemCard } from "@/components/dashboard/cart-item-card";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    vat = 0,
    ready,
  } = useCart();

  const estimatedTotal = subtotal + vat;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 flex-1 w-full">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-primary">
          Your order
        </p>
        <h1 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-4xl font-extrabold tracking-tight">
          Cart
        </h1>

        {!ready ? (
          <CartSkeleton />
        ) : !items?.length ? (
          <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-dashed border-border p-8 sm:p-16 text-center">
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Browse the catalogue to add your first wholesale item.
            </p>
            <Button asChild className="mt-6 rounded-xl font-bold">
              <Link href="/catalogue">
                Browse catalogue <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px]">
            <aside className="order-first lg:order-last h-fit rounded-xl sm:rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm space-y-4">
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                Order summary
              </h2>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal (excl. VAT)
                  </span>
                  <span className="font-bold">{formatPounds(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VAT (20%)</span>
                  <span className="font-bold">{formatPounds(vat)}</span>
                </div>
              </div>
              <div className="my-4 border-t border-border/60" />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-sm sm:text-base">
                  Estimated total
                </span>
                <span className="font-serif text-xl sm:text-2xl font-extrabold text-foreground">
                  {formatPounds(estimatedTotal)}
                </span>
              </div>
              <Button
                asChild
                className="mt-4 w-full h-11 rounded-xl font-bold text-sm shadow-sm"
                size="lg">
                <Link href="/checkout">
                  Continue to delivery <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </aside>

            <div className="space-y-3 order-last lg:order-first max-h-[560px] sm:max-h-[680px] lg:max-h-[calc(100vh-260px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {items?.map((item) => (
                <CartItemCard
                  key={item?.product?.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
