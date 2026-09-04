"use client";

import Link from "next/link";
import { Check, ChevronDown, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeliverySelectionProps } from "@/types/order.types";

export function DeliverySelection({
  addresses,
  selectedAddressId,
  onSelectAddress,
  notes,
  onChangeNotes,
}: DeliverySelectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedAddress = addresses?.find(
    (addr) => addr?._id === selectedAddressId,
  );

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-7 shadow-sm space-y-6 max-w-full min-w-0">
      <div>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[.14em] text-primary">
          Delivery details
        </p>
        <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-extrabold text-foreground">
          Choose Delivery Address
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          No payment is needed here. We&apos;ll review your order and confirm
          delivery with you.
        </p>
      </div>

      <div>
        {addresses?.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Select Address ({addresses.length} available)
              </label>
              <Link
                href="/profile"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                <Plus className="size-3.5" /> Manage in profile
              </Link>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 rounded-xl border border-input bg-card p-3.5 text-left shadow-sm transition-all hover:border-primary/40 focus:ring-2 focus:ring-primary/20 cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {selectedAddress
                        ? selectedAddress.fullName
                        : "Select delivery address"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {selectedAddress
                        ? `${selectedAddress.streetAddress}, ${selectedAddress.city} (${selectedAddress.postalCode})`
                        : "Choose an address for this order"}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-xl scrollbar-thin">
                  {addresses.map((address) => {
                    const isSelected = address?._id === selectedAddressId;
                    return (
                      <button
                        key={address?._id}
                        type="button"
                        onClick={() => {
                          onSelectAddress(address?._id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted text-foreground"
                        }`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold truncate">
                              {address?.fullName}
                            </span>
                            {address?.phone && (
                              <span className="text-xs text-muted-foreground">
                                · {address?.phone}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {address?.streetAddress}
                            {address?.building ? `, ${address?.building}` : ""}
                            {`, ${address?.city} ${address?.postalCode}`}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="size-4 text-primary shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedAddress && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">
                    {selectedAddress?.fullName}
                  </span>
                  <span className="text-xs text-primary font-semibold">
                    {selectedAddress?.phone}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {selectedAddress?.streetAddress}
                  {selectedAddress?.building
                    ? `, ${selectedAddress?.building}`
                    : ""}
                </p>
                <p className="text-muted-foreground font-medium">
                  {selectedAddress?.city}, {selectedAddress?.postalCode}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
            <MapPin className="size-7 text-muted-foreground" />
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              No delivery addresses found
            </p>
            <p className="mt-1 text-xs text-muted-foreground mb-4">
              Please add a delivery address in your profile before checking out.
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href="/profile" className="flex items-center gap-1">
                <Plus className="size-4" /> Add Address
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-border/40">
        <label className="text-xs sm:text-sm font-bold text-foreground">
          Order notes{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          rows={2}
          placeholder="Access instructions, preferred delivery time, etc."
          className="mt-2 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-xs sm:text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

export default DeliverySelection;
