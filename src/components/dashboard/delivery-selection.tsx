"use client";

import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliverySelectionProps } from "@/types/order.types";

export function DeliverySelection({
  addresses,
  selectedAddressId,
  onSelectAddress,
  notes,
  onChangeNotes,
}: DeliverySelectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
        Delivery details
      </p>
      <h1 className="mt-2 font-serif text-3xl font-extrabold">
        Choose Delivery Address
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        No payment is needed here. We&apos;ll review your order and confirm the
        delivery details with you.
      </p>

      <div className="mt-7">
        {addresses?.length > 0 ? (
          <div className="grid gap-3">
            {addresses?.map((address) => {
              const isSelected = address?._id === selectedAddressId;
              return (
                <label
                  key={address?._id}
                  className={`flex gap-3 items-start rounded-xl border p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-secondary/20"
                  }`}>
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value={address?._id}
                    checked={isSelected}
                    onChange={() => onSelectAddress(address?._id)}
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">
                      {address?.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {address?.phone}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {address?.streetAddress}
                      {address?.building ? `, ${address?.building}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address?.city}, {address?.postalCode}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-border rounded-xl">
            <MapPin className="size-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              No delivery addresses found
            </p>
            <p className="mt-1 text-xs text-muted-foreground mb-4">
              Please add a delivery address in your profile before checking out.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/profile" className="flex items-center gap-1">
                <Plus className="size-4" /> Add Address
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="text-sm font-bold">
          Order notes{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          rows={3}
          placeholder="Access instructions, preferred delivery time, or anything else"
          className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}

export default DeliverySelection;
