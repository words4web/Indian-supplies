import { formatPounds } from "@/lib/format";
import { Receipt } from "lucide-react";

export function OrderPaymentSummary({
  subtotal,
  vat,
  total,
}: {
  subtotal: number;
  vat: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-3">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Receipt className="size-4.5 text-primary" />
        <h2 className="font-serif text-base font-bold text-foreground">
          Payment Summary
        </h2>
      </div>

      <div className="space-y-2.5 text-sm pt-1">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal (Excl. VAT)</span>
          <span className="font-medium text-foreground">
            {formatPounds(subtotal || 0)}
          </span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Estimated VAT</span>
          <span className="font-medium text-foreground">
            {formatPounds(vat || 0)}
          </span>
        </div>

        <div className="flex justify-between pt-3 border-t border-border font-serif text-lg sm:text-xl font-extrabold text-foreground">
          <span>Total Amount</span>
          <span className="text-primary">{formatPounds(total || 0)}</span>
        </div>
      </div>
    </div>
  );
}
