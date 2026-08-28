"use client";

import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";
import { PortalHeader } from "@/components/portal-header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useOrdersQuery } from "@/services/order/order.hook";
import { formatPounds } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  PENDING_REVIEW: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  DISPATCHED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  DELIVERED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
  CANCELLED: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: "Pending Review",
  APPROVED: "Approved",
  DISPATCHED: "Dispatched",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrdersPage() {
  const { user, ready } = useAuth();
  const { data: responseBody, isLoading } = useOrdersQuery(ready && !!user);

  const orders = responseBody?.data || [];
  const showLoading = !ready || (user && isLoading);

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="border-b border-border/70 pb-8">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
            Order history
          </p>
          <h1 className="mt-2 font-serif text-4xl font-extrabold tracking-tight">
            My orders
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Review all wholesale order requests placed from your account.
          </p>
        </div>
        {showLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground animate-pulse">
            Loading orders…
          </p>
        ) : !user ? (
          <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <PackageCheck className="mx-auto size-10 text-primary" />
            <h2 className="mt-5 font-serif text-2xl font-bold">
              Sign in to view your orders
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your order history is available after you sign in.
            </p>
            <Button asChild className="mt-6">
              <Link href="/login">
                Sign in <ArrowRight />
              </Link>
            </Button>
          </section>
        ) : orders.length > 0 ? (
          <div className="mt-8 space-y-6">
            {orders?.map((order: any) => {
              const totalItems =
                order.items?.reduce(
                  (acc: number, item: any) => acc + (item.quantity || 0),
                  0,
                ) || 0;
              return (
                <section
                  key={order._id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-serif text-2xl font-bold">
                          {order.orderId}
                        </h2>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-secondary text-secondary-foreground"}`}>
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Placed{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="font-serif text-2xl font-extrabold text-primary">
                      {formatPounds(order.total)}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3">
                    <div>
                      <p className="font-semibold text-muted-foreground">
                        Total Items
                      </p>
                      <p className="mt-1 font-bold">{totalItems}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">
                        Business
                      </p>
                      <p className="mt-1 font-bold">
                        {order.delivery?.businessName}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">
                        Delivery Address
                      </p>
                      <p className="mt-1 font-bold text-muted-foreground line-clamp-2">
                        {order.delivery?.address}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      Items Ordered
                    </p>
                    <div className="space-y-2">
                      {order.items?.map((item: any) => (
                        <div
                          key={item.productId?._id || item.productId}
                          className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity} ×{" "}
                            {item.productId?.name || "Product"}
                            {item.productId?.pack
                              ? ` (${item.productId.pack})`
                              : ""}
                          </span>
                          <span className="font-medium text-foreground">
                            {formatPounds(
                              (item.priceAtOrder || 0) * item.quantity,
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-border p-8 text-center">
            <PackageCheck className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-5 font-serif text-2xl font-bold">
              No orders yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your confirmed wholesale orders will appear here.
            </p>
            <Button asChild className="mt-6">
              <Link href="/catalogue">
                Browse catalogue <ArrowRight />
              </Link>
            </Button>
          </section>
        )}
      </main>
    </div>
  );
}
