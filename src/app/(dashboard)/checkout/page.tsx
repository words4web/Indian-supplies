"use client";

import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { PortalHeader } from "@/components/portal-header";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { saveLastOrder } from "@/utils/order";
import { useCreateOrder } from "@/services/order/order.hook";
import { OrderSummary } from "@/components/dashboard/order-summary";
import { DeliverySelection } from "@/components/dashboard/delivery-selection";
import { OrderSuccess } from "@/components/dashboard/order-success";
import Link from "next/link";
import { CheckoutSkeleton } from "@/components/skeleton/checkout-skeleton";

export default function CheckoutPage() {
  const { items, subtotal, vat = 0, clearCart, ready: cartReady } = useCart();
  const { user, ready: authReady } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<any | null>(null);

  const createOrderMutation = useCreateOrder({
    onSuccess: (response) => {
      const order = response?.data;
      saveLastOrder(order);
      clearCart();
      setConfirmation(order);
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.message ||
        "Failed to place order. Please try again.";
      setError(msg);
      toast.error(msg);
    },
  });

  const addresses = user?.addresses || [];

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!selectedAddressId) {
      const msg = "Please select a delivery address.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const selectedAddress = addresses?.find(
      (addr: any) => addr?._id === selectedAddressId,
    );
    if (!selectedAddress) {
      const msg = "Selected address not found.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!items.length) {
      const msg = "Your basket is empty.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const formattedAddress = [
      selectedAddress?.streetAddress,
      selectedAddress?.building,
      selectedAddress?.city,
      selectedAddress?.postalCode,
    ]
      .filter(Boolean)
      .join(", ");

    createOrderMutation.mutate({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      delivery: {
        businessName: user?.business || "Not provided",
        contactPerson: selectedAddress?.fullName || user?.name || "",
        phone: selectedAddress?.phone,
        address: formattedAddress,
        notes: notes || undefined,
      },
    });
  }

  const ready = cartReady && authReady;

  if (confirmation) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <OrderSuccess order={confirmation} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 flex-1 w-full">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-3.5 sm:size-4" /> Back to cart
        </Link>

        {!ready ? (
          <CheckoutSkeleton />
        ) : (
          <form onSubmit={submit} className="mt-6 sm:mt-8 space-y-6">
            {error && (
              <div
                className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs sm:text-sm font-semibold text-destructive flex items-center justify-between"
                role="alert">
                <span>{error}</span>
              </div>
            )}
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px] w-full min-w-0">
              <div className="flex flex-col gap-6 min-w-0 w-full">
                <DeliverySelection
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                  notes={notes}
                  onChangeNotes={setNotes}
                />
              </div>
              <div className="min-w-0 w-full">
                <OrderSummary
                  items={items}
                  subtotal={subtotal}
                  vat={vat}
                  placing={createOrderMutation.isPending}
                  disabled={createOrderMutation.isPending}
                />
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
