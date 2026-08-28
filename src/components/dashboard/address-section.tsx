"use client";

import { MapPin, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AddressSectionProps } from "@/types/address.types";

export function AddressSection({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  isDeleting,
}: AddressSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-xl font-bold tracking-tight">
          Delivery Addresses
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddAddress}
          className="rounded-xl flex items-center gap-1.5">
          <Plus className="size-4" /> Add
        </Button>
      </div>
      <div className="mt-6">
        {addresses && addresses?.length > 0 ? (
          <div className="space-y-3">
            {addresses?.map((address: any, index: number) => (
              <div
                key={address?._id || index}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-secondary/20 p-4">
                <div className="flex gap-3">
                  <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">{address?.fullName}</p>
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
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => onEditAddress(address)}
                    aria-label="Edit address">
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (address?._id) {
                        onDeleteAddress(address?._id);
                      }
                    }}
                    disabled={isDeleting}
                    aria-label="Delete address">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-border rounded-xl">
            <MapPin className="size-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              No addresses saved yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add a delivery address to start placing wholesale orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddressSection;
