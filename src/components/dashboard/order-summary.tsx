"use client";

import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { OrderSummaryProps } from "@/types/order.types";

export function OrderSummary({
  items,
  subtotal,
  vat,
  placing,
  disabled,
}: OrderSummaryProps) {
  const estimatedTotal = subtotal + vat;

  return (
    <aside className="order-first lg:order-last h-fit rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm space-y-4 w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground">
          Order Summary
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          {items?.length || 0} {items?.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="space-y-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-2 custom-scrollbar">
        {items?.map(({ product, quantity }) => (
          <div
            key={product?.id}
            className="group flex items-center gap-3 p-2 sm:p-2.5 rounded-xl border border-border/50 bg-background/60 hover:bg-accent/40 transition-colors">
            <div className="relative size-11 sm:size-12 shrink-0 rounded-lg overflow-hidden border border-border/60 bg-muted flex items-center justify-center">
              {product?.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product?.name || "Product"}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <Package className="size-5 text-muted-foreground/60" />
              )}
              <span className="absolute bottom-0.5 right-0.5 min-w-5 h-4 px-1 rounded-md bg-foreground/90 text-[10px] font-bold text-background flex items-center justify-center shadow-xs">
                x{quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {product?.name}
              </h4>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                {product?.pack && (
                  <span className="font-medium truncate">{product.pack}</span>
                )}
                {product?.pack && <span>•</span>}
                <span>{formatPounds(product?.price ?? 0)} each</span>
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="font-bold text-xs sm:text-sm text-foreground">
                {formatPounds((product?.price ?? 0) * quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal (excl. VAT)</span>
          <span className="font-semibold text-foreground">
            {formatPounds(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>VAT (20%)</span>
          <span className="font-semibold text-foreground">
            {formatPounds(vat)}
          </span>
        </div>
      </div>

      <div className="border-t border-border/60 pt-3 flex justify-between items-baseline">
        <div>
          <span className="font-bold text-sm sm:text-base text-foreground block">
            Estimated total
          </span>
          <span className="text-[11px] text-muted-foreground">
            Includes applicable taxes
          </span>
        </div>
        <span className="font-serif text-xl sm:text-2xl font-extrabold text-primary">
          {formatPounds(estimatedTotal)}
        </span>
      </div>

      <Button
        type="submit"
        className="mt-2 w-full h-11 sm:h-12 rounded-xl font-bold text-sm shadow-md cursor-pointer transition-all hover:shadow-lg"
        size="lg"
        disabled={disabled || placing}>
        {placing ? "Sending order…" : "Place order request"}{" "}
        <ArrowRight className="size-4 ml-1.5" />
      </Button>
    </aside>
  );
}

export default OrderSummary;
