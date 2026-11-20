"use client";

import Link from "next/link";
import { LogOut, Mail, User, Briefcase, Building2, ShieldCheck, UserCheck, CreditCard, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { useState } from "react";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { AddressModal } from "@/components/common/AddressModal";
import { EditProfileModal } from "@/components/dashboard/EditProfileModal";
import { AddressSection } from "@/components/dashboard/address-section";
import { Footer } from "@/components/footer";
import { NotificationToggle } from "@/components/dashboard/notification-toggle";
import { BlockedPermissionBanner } from "@/components/dashboard/blocked-permission-banner";
import {
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/services/address/address.hook";
import { useUpdateProfile } from "@/services/auth/auth.hook";

export default function AccountPage() {
  const router = useRouter();
  const { user, ready, signOut } = useAuth();
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const updateProfileMutation = useUpdateProfile({
    onSuccess: () => setShowEditProfileModal(false),
  });

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

        {/* Profile Grid: Main Information Cards */}
        <div className="mt-8 space-y-8">
          {/* Top Row: Business Identity & Overview Card + Delivery Locations */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Business Identity Card (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                    <Briefcase className="size-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {user?.business || "Wholesale Account"}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Primary Contact: <span className="font-medium text-foreground">{user?.name}</span>
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowEditProfileModal(true)}
                  className="cursor-pointer gap-2 h-9 px-3.5 text-xs font-semibold shrink-0 hover:bg-primary/10 hover:text-primary transition-all">
                  <Edit3 className="size-3.5" /> Edit Details
                </Button>
              </div>

              {/* Contact & Status Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-border/60">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-background text-primary shrink-0 shadow-2xs">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-muted-foreground">Account Email</span>
                    <span className="text-xs font-bold text-foreground truncate block">{user?.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-background text-primary shrink-0 shadow-2xs">
                    <User className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-medium text-muted-foreground">Account Type</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Trade Customer</span>
                  </div>
                </div>
              </div>

              {/* Wholesale Company & Tax Registration */}
              <div className="pt-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Building2 className="size-4" />
                  <span>Company Registration & Tax</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-[11px] font-semibold text-muted-foreground block mb-0.5">
                      Company Reg. Number (CRN)
                    </span>
                    <span className="font-mono text-sm font-bold text-foreground">
                      {user?.companyRegistrationNumber || (
                        <span className="text-muted-foreground/70 font-sans font-normal italic text-xs">Not provided</span>
                      )}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-[11px] font-semibold text-muted-foreground block mb-0.5">
                      VAT Registration Number
                    </span>
                    <span className="font-mono text-sm font-bold text-foreground">
                      {user?.vatNumber || (
                        <span className="text-muted-foreground/70 font-sans font-normal italic text-xs">Not registered / Not provided</span>
                      )}
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-muted/30 border border-border/50">
                    <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Registered Office Address
                    </span>
                    <p className="text-xs font-medium text-foreground leading-relaxed">
                      {[
                        user?.registeredAddress?.streetAddress,
                        user?.registeredAddress?.building,
                        user?.registeredAddress?.city,
                        user?.registeredAddress?.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ") || (
                        <span className="text-muted-foreground/70 italic font-normal">No registered address provided</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* System & Notification Settings */}
              <div className="mt-6 pt-5 border-t border-border/60 space-y-3">
                <BlockedPermissionBanner />
                <NotificationToggle />
              </div>
            </div>

            {/* Delivery Locations (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
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
          </div>

          {/* Bottom Row: Key Contacts (Directors & Accounts Payable) */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Director Details Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <UserCheck className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-foreground">Director Details</h3>
                      <p className="text-[11px] text-muted-foreground">Appointed company director information</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-semibold text-foreground">{user?.directorDetails?.name || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Phone Number:</span>
                    <span className="font-mono font-medium text-foreground">{user?.directorDetails?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Email Address:</span>
                    <span className="font-medium text-foreground truncate max-w-[55%] text-right">
                      {user?.directorDetails?.email || "Not provided"}
                    </span>
                  </div>
                  <div className="pt-1.5">
                    <span className="text-muted-foreground block mb-0.5 text-[11px]">Director Address:</span>
                    <p className="text-xs font-medium text-foreground">
                      {user?.directorDetails?.address || <span className="text-muted-foreground/70 italic font-normal">Not provided</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accounts Payable / Billing Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <CreditCard className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-foreground">Accounts Payable & Finance</h3>
                      <p className="text-[11px] text-muted-foreground">Invoice and billing department contact</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Finance Contact:</span>
                    <span className="font-semibold text-foreground">{user?.accountsPayable?.name || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Finance Phone:</span>
                    <span className="font-mono font-medium text-foreground">{user?.accountsPayable?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">Invoicing Email:</span>
                    <span className="font-medium text-foreground truncate max-w-[55%] text-right">
                      {user?.accountsPayable?.email || "Not provided"}
                    </span>
                  </div>
                  <div className="p-3 mt-2 rounded-xl bg-primary/5 border border-primary/15 text-[11px] text-muted-foreground">
                    Invoices and delivery notes will reference these contact details for credit ledger management.
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        user={user}
        onSubmit={(payload) => updateProfileMutation.mutate(payload)}
        isLoading={updateProfileMutation.isPending}
      />
    </div>
  );
}
