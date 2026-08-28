"use client";

import { ArrowLeft } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { PortalHeader } from "@/components/portal-header";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { saveLastOrder } from "@/utils/order";
import { useCreateOrder } from "@/services/order/order.hook";
import { OrderSummary } from "@/components/dashboard/order-summary";
import { DeliverySelection } from "@/components/dashboard/delivery-selection";
import { OrderSuccess } from "@/components/dashboard/order-success";
import Link from "next/link";

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
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    },
  });

  const addresses = user?.addresses || [];

  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id);
    }
  }, [addresses, selectedAddressId]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!selectedAddressId) {
      setError("Please select a delivery address.");
      return;
    }

    const selectedAddress = addresses?.find(
      (addr: any) => addr?._id === selectedAddressId,
    );
    if (!selectedAddress) {
      setError("Selected address not found.");
      return;
    }

    if (!items.length) {
      setError("Your basket is empty.");
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

  if (!ready)
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <div className="mx-auto max-w-3xl px-5 py-20 text-center text-muted-foreground">
          Loading checkout…
        </div>
      </div>
    );

  if (confirmation) {
    return (
      <div className="min-h-screen bg-background">
        <PortalHeader />
        <OrderSuccess order={confirmation} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to basket
        </Link>
        <form
          onSubmit={submit}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <DeliverySelection
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
              notes={notes}
              onChangeNotes={setNotes}
            />
            {error && (
              <p
                className="rounded-xl bg-destructive/10 px-3 py-2.5 text-sm font-semibold text-destructive"
                role="alert">
                {error}
              </p>
            )}
          </div>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            vat={vat}
            placing={createOrderMutation.isPending}
            disabled={!selectedAddressId || createOrderMutation.isPending}
          />
        </form>
      </main>
    </div>
  );
}
