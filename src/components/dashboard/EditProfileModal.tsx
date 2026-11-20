"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/common/Input";
import { AuthUser } from "@/types/auth/auth.types";
import { updateProfileSchema, UpdateProfileInput } from "@/schemas/auth";
import { Building2, ShieldCheck, UserCheck, CreditCard } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser;
  onSubmit: (data: UpdateProfileInput) => void;
  isLoading: boolean;
}

export function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSubmit,
  isLoading,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user.name || "",
      businessName: user.business || "",
      companyRegistrationNumber: user.companyRegistrationNumber || "",
      vatNumber: user.vatNumber || "",
      registeredAddress: {
        streetAddress: user.registeredAddress?.streetAddress || "",
        building: user.registeredAddress?.building || "",
        city: user.registeredAddress?.city || "",
        postalCode: user.registeredAddress?.postalCode || "",
      },
      directorDetails: {
        name: user.directorDetails?.name || "",
        address: user.directorDetails?.address || "",
        phone: user.directorDetails?.phone || "",
        email: user.directorDetails?.email || "",
      },
      accountsPayable: {
        name: user.accountsPayable?.name || "",
        phone: user.accountsPayable?.phone || "",
        email: user.accountsPayable?.email || "",
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        fullName: user.name || "",
        businessName: user.business || "",
        companyRegistrationNumber: user.companyRegistrationNumber || "",
        vatNumber: user.vatNumber || "",
        registeredAddress: {
          streetAddress: user.registeredAddress?.streetAddress || "",
          building: user.registeredAddress?.building || "",
          city: user.registeredAddress?.city || "",
          postalCode: user.registeredAddress?.postalCode || "",
        },
        directorDetails: {
          name: user.directorDetails?.name || "",
          address: user.directorDetails?.address || "",
          phone: user.directorDetails?.phone || "",
          email: user.directorDetails?.email || "",
        },
        accountsPayable: {
          name: user.accountsPayable?.name || "",
          phone: user.accountsPayable?.phone || "",
          email: user.accountsPayable?.email || "",
        },
      });
    }
  }, [isOpen, user, reset]);

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="space-y-1 mb-4 sm:mb-5 pr-6 sm:pr-8">
        <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground">
          Edit Wholesale Account Details
        </h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
          Update your registered company information, directors details, and accounts payable contact.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 sm:space-y-6 max-h-[70vh] sm:max-h-[72vh] overflow-y-auto px-0.5 sm:px-1 pr-1.5 sm:pr-2 scrollbar-thin">
        {/* Company Registration */}
        <div className="space-y-3.5 pb-4 sm:pb-5 border-b border-border/60">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            <Building2 className="size-3.5 sm:size-4" />
            <span>Company Registration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="Business / Trade Name"
              placeholder="e.g. Spice House Ltd"
              error={errors.businessName?.message}
              {...register("businessName")}
            />
            <Input
              label="Contact Full Name"
              placeholder="e.g. John Doe"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="Company Reg. Number (CRN)"
              placeholder="e.g. 12345678"
              error={errors.companyRegistrationNumber?.message}
              {...register("companyRegistrationNumber")}
            />
            <Input
              label="VAT Registration Number"
              placeholder="e.g. GB 123 4567 89"
              error={errors.vatNumber?.message}
              {...register("vatNumber")}
            />
          </div>
        </div>

        {/* Registered Address */}
        <div className="space-y-3.5 pb-4 sm:pb-5 border-b border-border/60">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="size-3.5 sm:size-4" />
            <span>Registered Company Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="Street Address"
              placeholder="e.g. 12 High Street"
              error={errors.registeredAddress?.streetAddress?.message}
              {...register("registeredAddress.streetAddress")}
            />
            <Input
              label="Building / Suite (Optional)"
              placeholder="e.g. Suite 4B"
              error={errors.registeredAddress?.building?.message}
              {...register("registeredAddress.building")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="City"
              placeholder="e.g. London"
              error={errors.registeredAddress?.city?.message}
              {...register("registeredAddress.city")}
            />
            <Input
              label="Postal Code"
              placeholder="e.g. E1 6AN"
              error={errors.registeredAddress?.postalCode?.message}
              {...register("registeredAddress.postalCode")}
            />
          </div>
        </div>

        {/* Director Details */}
        <div className="space-y-3.5 pb-4 sm:pb-5 border-b border-border/60">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            <UserCheck className="size-3.5 sm:size-4" />
            <span>Director Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="Director Full Name"
              placeholder="e.g. Jane Doe"
              error={errors.directorDetails?.name?.message}
              {...register("directorDetails.name")}
            />
            <Input
              label="Director Phone"
              placeholder="e.g. 07123456789"
              error={errors.directorDetails?.phone?.message}
              {...register("directorDetails.phone")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <Input
              label="Director Email"
              type="email"
              placeholder="director@company.com"
              error={errors.directorDetails?.email?.message}
              {...register("directorDetails.email")}
            />
            <Input
              label="Director Address"
              placeholder="Director residential / registered address"
              error={errors.directorDetails?.address?.message}
              {...register("directorDetails.address")}
            />
          </div>
        </div>

        {/* Accounts Payable */}
        <div className="space-y-3.5 pb-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
            <CreditCard className="size-3.5 sm:size-4" />
            <span>Accounts Payable / Finance Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            <Input
              label="Contact Name"
              placeholder="e.g. Finance Team"
              error={errors.accountsPayable?.name?.message}
              {...register("accountsPayable.name")}
            />
            <Input
              label="Finance Phone"
              placeholder="e.g. 020 7123 4567"
              error={errors.accountsPayable?.phone?.message}
              {...register("accountsPayable.phone")}
            />
            <Input
              label="Invoicing Email"
              type="email"
              placeholder="accounts@company.com"
              error={errors.accountsPayable?.email?.message}
              {...register("accountsPayable.email")}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto h-10 sm:h-9">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-10 sm:h-9 font-semibold">
            {isLoading ? "Saving..." : "Save Account Details"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
