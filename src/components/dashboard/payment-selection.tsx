"use client";

import { CreditCard, ShieldCheck } from "lucide-react";
import { PaymentSelectionProps } from "@/types/order.types";

export function PaymentSelection({
  paymentMethod,
  onSelectPaymentMethod,
  allowCredit,
  creditLimit,
}: PaymentSelectionProps) {
  const isCreditAvailable = allowCredit && creditLimit > 0;

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm space-y-3 max-w-full min-w-0">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Payment Method
        </label>
        {allowCredit && (
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {creditLimit} Credit {creditLimit === 1 ? "Order" : "Orders"}{" "}
            Available
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled
          className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all opacity-50 cursor-not-allowed border-dashed border-border/80 bg-muted/20">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
            <CreditCard className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                Online (Stripe)
              </p>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                Coming Soon
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              Card payment
            </p>
          </div>
          <div className="size-4 rounded-full border border-muted-foreground/30 bg-transparent shrink-0" />
        </button>

        <button
          type="button"
          disabled={!isCreditAvailable}
          onClick={() => {
            if (isCreditAvailable) {
              onSelectPaymentMethod("CREDIT");
            }
          }}
          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
            !isCreditAvailable
              ? "opacity-50 cursor-not-allowed border-dashed border-border/80 bg-muted/20"
              : paymentMethod === "CREDIT"
                ? "border-blue-500 bg-blue-500/5 ring-1.5 ring-blue-500/30 cursor-pointer"
                : "border-border/80 bg-background hover:bg-muted/40 cursor-pointer"
          }`}>
          <div
            className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
              !isCreditAvailable
                ? "bg-muted text-muted-foreground"
                : paymentMethod === "CREDIT"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}>
            <ShieldCheck className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">
              Credit Account
            </p>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {allowCredit
                ? isCreditAvailable
                  ? "Invoice terms"
                  : "Quota exhausted"
                : "Not enabled"}
            </p>
          </div>
          <div
            className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
              paymentMethod === "CREDIT"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-muted-foreground/30 bg-transparent"
            }`}>
            {paymentMethod === "CREDIT" && (
              <div className="size-1.5 rounded-full bg-white" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
