import { OrderStatus } from "@/types/order.types";
import { CheckCircle2, Clock } from "lucide-react";

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; badgeClass: string; icon: any; description: string }
> = {
  IN_PROCESS: {
    label: "In Process",
    badgeClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Clock,
    description:
      "Your wholesale order request has been received and is being prepared by our fulfillment team.",
  },
  DELIVERED: {
    label: "Delivered",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
    description:
      "This order has been fulfilled and delivered to the destination address.",
  },
};
