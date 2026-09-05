"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { OrderDetailModalProps } from "@/types/order.types";
import { formatPounds } from "@/lib/format";
import { Modal } from "@/components/ui/modal";
import {
  Building2,
  MapPin,
  Phone,
  User,
  FileText,
  ExternalLink,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  IN_PROCESS: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  IN_PROCESS: "In Process",
  DELIVERED: "Delivered",
};

export function OrderDetailModal({
  order,
  open,
  onOpenChange,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4 pr-8">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              Order {order?.orderId}
            </h2>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold ${
                STATUS_COLORS[order?.status] ||
                "bg-secondary text-secondary-foreground"
              }`}>
              {STATUS_LABELS[order?.status] || order?.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Placed on{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 sm:p-5 grid gap-5 sm:grid-cols-2 text-sm">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Delivery Contact
            </p>
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <User className="size-4 text-primary shrink-0" />
                <span>{order?.delivery?.contactPerson || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                <Building2 className="size-4 text-muted-foreground/70 shrink-0" />
                <span>{order?.delivery?.businessName || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                <Phone className="size-4 text-muted-foreground/70 shrink-0" />
                <span>{order?.delivery?.phone || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Delivery Address
            </p>
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-start gap-2 text-muted-foreground text-xs leading-relaxed">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span className="font-semibold text-foreground/90">
                  {order?.delivery?.address || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {order?.delivery?.notes && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-2.5">
              <FileText className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-amber-700 dark:text-amber-400 mb-1">
                  Delivery Notes
                </p>
                <p className="whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto pr-1 font-medium">
                  {order?.delivery?.notes}
                </p>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ordered Items ({order?.items?.length || 0})
            </h4>
          </div>
          <div className="max-h-64 sm:max-h-72 overflow-y-auto rounded-xl border border-border bg-card divide-y divide-border/60 pr-1">
            {order?.items?.map((item, idx) => {
              const prod =
                typeof item?.productId === "object" ? item.productId : null;
              const name = prod?.name || "Product Item";
              const pack = prod?.pack ? ` (${prod?.pack})` : "";
              return (
                <div
                  key={prod?._id || idx}
                  className="p-3 sm:p-4 flex items-center justify-between gap-3 text-sm hover:bg-muted/20 transition-colors">
                  <div className="min-w-0 flex-1">
                    {prod?.slug ? (
                      <Link
                        href={ROUTES.PRODUCT_DETAIL(prod?.slug)}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey) {
                            onOpenChange(false);
                          }
                        }}
                        className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group truncate">
                        <span className="truncate">{name}</span>
                        <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary shrink-0 opacity-70" />
                      </Link>
                    ) : (
                      <p className="font-bold text-foreground truncate">
                        {name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      <span className="font-medium">{item?.quantity} ×</span>{" "}
                      {formatPounds(item?.priceAtOrder || 0)}
                      {pack && (
                        <span className="ml-1 text-muted-foreground/70">
                          • {pack}
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="font-bold text-foreground text-right shrink-0">
                    {formatPounds(
                      (item?.priceAtOrder || 0) * (item?.quantity || 0),
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-2.5 text-sm">
          <div className="flex justify-between text-muted-foreground text-xs sm:text-sm font-medium">
            <span>Subtotal</span>
            <span>{formatPounds(order?.subtotal || 0)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground text-xs sm:text-sm font-medium">
            <span>VAT</span>
            <span>{formatPounds(order?.vat || 0)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-border font-serif text-lg sm:text-xl font-extrabold text-primary">
            <span>Total Amount</span>
            <span>{formatPounds(order?.total || 0)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
