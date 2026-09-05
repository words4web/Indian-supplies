"use client";

import { OrderCardProps } from "@/types/order.types";
import { formatPounds } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Eye, Package, Calendar, Receipt, CreditCard } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  IN_PROCESS: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  IN_PROCESS: "In Process",
  DELIVERED: "Delivered",
};

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const totalItems =
    order?.items?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;

  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            {order?.orderId}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${
              STATUS_COLORS[order?.status] ||
              "bg-secondary text-secondary-foreground"
            }`}>
            {STATUS_LABELS[order?.status] || order?.status}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground self-start sm:self-auto">
          <Calendar className="size-3.5 text-muted-foreground/70" />
          <span>Placed {formattedDate}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-muted/40 p-3 sm:p-4 border border-border/50 text-xs sm:text-sm">
        <div className="grid grid-cols-3 gap-2 sm:gap-6 flex-1">
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Package className="size-3.5 text-primary shrink-0" />
              <span className="hidden sm:inline">Total Items</span>
              <span className="sm:hidden">Items</span>
            </span>
            <span className="mt-1 font-bold text-foreground text-sm sm:text-base">
              {totalItems}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                pkgs
              </span>
            </span>
          </div>

          <div className="flex flex-col border-l border-border/60 pl-3 sm:pl-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Receipt className="size-3.5 text-amber-500 shrink-0" />
              <span className="hidden sm:inline">Total Tax</span>
              <span className="sm:hidden">Tax</span>
            </span>
            <span className="mt-1 font-bold text-foreground text-sm sm:text-base">
              {formatPounds(order?.vat || 0)}
            </span>
          </div>

          <div className="flex flex-col border-l border-border/60 pl-3 sm:pl-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <CreditCard className="size-3.5 text-emerald-500 shrink-0" />
              <span className="hidden sm:inline">Total Amount</span>
              <span className="sm:hidden">Total</span>
            </span>
            <span className="mt-1 font-serif font-extrabold text-primary text-sm sm:text-base">
              {formatPounds(order?.total || 0)}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(order)}
          className="w-full sm:w-auto gap-2 font-bold cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors shrink-0">
          <Eye className="size-4" /> View Details
        </Button>
      </div>
    </div>
  );
}
