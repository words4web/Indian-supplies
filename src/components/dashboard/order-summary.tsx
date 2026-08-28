"use client";

import { ArrowRight } from "lucide-react";
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
    <aside className="h-fit rounded-2xl border border-border bg-card p-5">
      <h2 className="font-serif text-xl font-bold">Order summary</h2>
      <div className="mt-5 space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between gap-3 text-sm">
            <span className="min-w-0 truncate text-muted-foreground">
              {quantity} × {product.name}
            </span>
            <span className="shrink-0 font-semibold">
              {formatPounds((product.price ?? 0) * quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="my-5 border-t border-border" />
      <div className="space-y-2 text-sm mb-5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal (excl. VAT)</span>
          <span className="font-bold">{formatPounds(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">VAT (20%)</span>
          <span className="font-bold">{formatPounds(vat)}</span>
        </div>
      </div>
      <div className="my-5 border-t border-border" />
      <div className="flex justify-between">
        <span className="font-bold">Estimated total</span>
        <span className="font-serif text-xl font-extrabold">
          {formatPounds(estimatedTotal)}
        </span>
      </div>

      <Button
        type="submit"
        className="mt-6 w-full"
        size="lg"
        disabled={disabled || placing}>
        {placing ? "Sending order…" : "Place order request"}{" "}
        <ArrowRight className="size-4 ml-1" />
      </Button>
    </aside>
  );
}

export default OrderSummary;
