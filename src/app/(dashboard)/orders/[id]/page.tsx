"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  FileText,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  User,
} from "lucide-react";

import { PortalHeader } from "@/components/portal-header";
import { Button } from "@/components/ui/button";
import { OrderDetailSkeleton } from "@/components/skeleton/order-detail-skeleton";
import { OrderPaymentSummary } from "@/components/dashboard/order-payment-summary";
import { OrderItemsList } from "@/components/dashboard/order-items-list";
import { useAuth } from "@/hooks/useAuth";
import { useOrderDetailQuery } from "@/services/order/order.hook";
import { formatPounds } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { ORDER_STATUS_CONFIG } from "@/constants/order";
import { Order } from "@/types/order.types";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const { user, ready } = useAuth();

  const {
    data: responseBody,
    isLoading,
    isError,
    error,
    refetch,
  } = useOrderDetailQuery(orderId, ready && !!user);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  const order: Order | undefined = responseBody?.data;
  const statusInfo =
    order?.status && ORDER_STATUS_CONFIG[order.status]
      ? ORDER_STATUS_CONFIG[order.status]
      : {
          label: order?.status || "Unknown",
          badgeClass: "bg-secondary text-secondary-foreground border-border",
          icon: Clock,
          description: "Order status update in progress.",
        };

  const StatusIcon = statusInfo.icon;
  const totalItems = order?.items?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pb-16">
        <div className="mb-4">
          <Link
            href={ROUTES.ORDERS}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> Back to orders
          </Link>
        </div>

        {isLoading || !ready ? (
          <OrderDetailSkeleton />
        ) : isError || !order ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm space-y-4">
            <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <Package className="size-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Order Not Found
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {(error as any)?.response?.data?.message ||
                  "The requested order could not be located."}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-1.5">
                <RotateCcw className="size-3.5" /> Try Again
              </Button>
              <Button size="sm" asChild>
                <Link href={ROUTES.ORDERS}>View All Orders</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Order {order.orderId}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-bold ${statusInfo.badgeClass}`}>
                      <StatusIcon className="size-3.5" />
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="size-3.5 text-muted-foreground/70" />
                      Placed on{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : "N/A"}
                    </span>
                    <span>•</span>
                    <span>
                      {totalItems} {totalItems === 1 ? "item" : "items"} ordered
                    </span>
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Total Amount
                  </p>
                  <p className="font-serif text-2xl sm:text-3xl font-extrabold text-primary">
                    {formatPounds(order?.total || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
                <OrderItemsList items={order?.items || []} />
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <OrderPaymentSummary
                  subtotal={order?.subtotal || 0}
                  vat={order?.vat || 0}
                  total={order?.total || 0}
                />

                <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4.5 text-primary" />
                      <h2 className="font-serif text-base font-bold text-foreground">
                        Delivery Destination
                      </h2>
                    </div>
                    {order?.delivery?.businessName && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary truncate max-w-[45%]">
                        {order?.delivery?.businessName}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3.5 text-sm">
                    <div className="space-y-2">
                      {order?.delivery?.contactPerson && (
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-muted-foreground/70 shrink-0" />
                          <span className="font-semibold text-foreground text-xs sm:text-sm">
                            {order?.delivery?.contactPerson}
                          </span>
                        </div>
                      )}

                      {order?.delivery?.businessName && (
                        <div className="flex items-center gap-2">
                          <Building2 className="size-4 text-muted-foreground/70 shrink-0" />
                          <span className="text-muted-foreground text-xs">
                            {order?.delivery?.businessName}
                          </span>
                        </div>
                      )}

                      {order?.delivery?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="size-4 text-muted-foreground/70 shrink-0" />
                          <span className="font-mono text-xs text-muted-foreground">
                            {order?.delivery?.phone}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl border border-border/50 bg-muted/20 p-3.5 text-xs leading-relaxed text-muted-foreground">
                      <p className="font-medium text-foreground/90 whitespace-pre-line">
                        {order?.delivery?.address ||
                          "No delivery address specified."}
                      </p>
                    </div>

                    {order?.delivery?.notes && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1 text-xs">
                        <span className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[11px]">
                          <FileText className="size-3.5" /> Delivery Notes
                        </span>
                        <p className="text-amber-900/90 dark:text-amber-200/90 italic pl-5 leading-relaxed">
                          &ldquo{order?.delivery?.notes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="size-4 text-primary" />
                    <h3 className="font-serif text-sm font-bold text-foreground">
                      Order Status: {statusInfo?.label}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {statusInfo?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
