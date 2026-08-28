"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";

import { OrderSuccessProps } from "@/types/order.types";

export function OrderSuccess({ order }: OrderSuccessProps) {
  const totalItems =
    order.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <main className="mx-auto max-w-xl px-5 py-16 text-center animate-fade-in">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="size-8" />
      </div>
      <p className="mt-6 text-sm font-bold uppercase tracking-[.14em] text-primary">
        Order received
      </p>
      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-extrabold">
        Thanks, we&apos;ve got it.
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Your order <strong className="text-foreground">{order?.orderId}</strong>{" "}
        has been sent for review. We&apos;ll contact you to confirm delivery.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-foreground">Order details</h3>
        <div className="space-y-2 border-b border-border/60 pb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-bold text-primary">Pending Review</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total items</span>
            <span className="font-bold">{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold">{formatPounds(order?.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT</span>
            <span className="font-bold">{formatPounds(order?.vat)}</span>
          </div>
        </div>
        <div className="flex justify-between text-base font-bold pt-1">
          <span className="text-foreground">Estimated total</span>
          <span className="text-primary font-serif text-lg">
            {formatPounds(order?.total)}
          </span>
        </div>
      </div>

      <Button asChild className="mt-8">
        <Link href="/catalogue">
          Continue shopping <ArrowRight className="size-4 ml-1" />
        </Link>
      </Button>
    </main>
  );
}

export default OrderSuccess;
