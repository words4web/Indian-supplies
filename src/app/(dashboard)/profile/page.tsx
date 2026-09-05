"use client";

import Link from "next/link";
import { LogOut, Mail, User, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { useState } from "react";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { AddressModal } from "@/components/common/AddressModal";
import { AddressSection } from "@/components/dashboard/address-section";
import { Footer } from "@/components/footer";
import { NotificationToggle } from "@/components/dashboard/notification-toggle";
import { BlockedPermissionBanner } from "@/components/dashboard/blocked-permission-banner";
import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/services/address/address.hook";

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, signOut } = useAuth();
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const createAddressMutation = useCreateAddress({
    onSuccess: () => setShowAddressModal(false),
  });

  const updateAddressMutation = useUpdateAddress({
    onSuccess: () => {
      setShowAddressModal(false);
      setEditingAddress(null);
    },
  });

  const deleteAddressMutation = useDeleteAddress({
    onSuccess: () => setAddressToDelete(null),
  });

  if (!ready || !user)
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PortalHeader />
        <div className="flex-grow flex items-center justify-center">
          <Loader size="lg" />
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="flex-grow mx-auto w-full max-w-5xl px-5 py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
              Your profile
            </p>
            <h1 className="mt-2 font-serif text-4xl font-extrabold">
              Hello, {user.name?.split(" ")[0] || "User"}.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your wholesale credentials and delivery locations.
            </p>
          </div>
          <Button variant="outline" onClick={() => setConfirmSignOut(true)}>
            <LogOut className="size-4 mr-2" /> Sign out
          </Button>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold tracking-tight">
              Account Details
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <User className="size-5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Full Name
                  </span>
                  <span className="text-sm font-bold">{user?.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Email Address
                  </span>
                  <span className="text-sm font-bold">{user?.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Briefcase className="size-5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Business Name
                  </span>
                  <span className="text-sm font-bold">
                    {user?.business || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <BlockedPermissionBanner />
              <NotificationToggle />
            </div>
          </div>

          <AddressSection
            addresses={user?.addresses || []}
            onAddAddress={() => {
              setEditingAddress(null);
              setShowAddressModal(true);
            }}
            onEditAddress={(address) => {
              setEditingAddress(address);
              setShowAddressModal(true);
            }}
            onDeleteAddress={(id) => setAddressToDelete(id)}
            isDeleting={deleteAddressMutation.isPending}
          />
        </div>
      </main>

      <Footer />

      <ConfirmModal
        isOpen={confirmSignOut}
        onClose={() => setConfirmSignOut(false)}
        onConfirm={() => {
          signOut()?.then(() => router.push("/"));
        }}
        title="Sign out"
        description="Are you sure you want to sign out of your account?"
        confirmText="Sign out"
        cancelText="Cancel"
        variant="destructive"
      />

      <ConfirmModal
        isOpen={!!addressToDelete}
        onClose={() => setAddressToDelete(null)}
        onConfirm={() => {
          if (addressToDelete) {
            deleteAddressMutation.mutate(addressToDelete);
          }
        }}
        title="Remove Address"
        description="Are you sure you want to remove this delivery address?"
        confirmText="Remove"
        cancelText="Cancel"
        variant="destructive"
      />

      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSubmit={(payload) => {
          if (editingAddress) {
            updateAddressMutation.mutate({ id: editingAddress._id, payload });
          } else {
            createAddressMutation.mutate(payload);
          }
        }}
        isLoading={
          createAddressMutation.isPending || updateAddressMutation.isPending
        }
        defaultValues={editingAddress || undefined}
        title={editingAddress ? "Edit Address" : "Add Address"}
      />
    </div>
  );
}
