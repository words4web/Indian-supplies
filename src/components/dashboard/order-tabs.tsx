"use client";

import { Clock, CheckCircle2 } from "lucide-react";
import { OrderTabsProps } from "@/types/order.types";

export function OrderTabs({
  activeTab,
  onTabChange,
  inProcessCount,
  deliveredCount,
}: OrderTabsProps) {
  return (
    <div className="inline-flex w-full sm:w-auto items-center gap-2 rounded-2xl bg-muted/80 p-1.5 text-base font-medium border border-border/50">
      <button
        type="button"
        onClick={() => onTabChange("IN_PROCESS")}
        className={`flex flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-base font-bold transition-all cursor-pointer ${
          activeTab === "IN_PROCESS"
            ? "bg-card text-foreground shadow-md border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`}>
        <Clock className="size-5 text-amber-500" />
        <span>In Process</span>
        <span
          className={`ml-1.5 rounded-full px-2.5 py-0.5 text-xs font-black transition-colors ${
            activeTab === "IN_PROCESS"
              ? "bg-amber-500/20 text-amber-600"
              : "bg-background text-muted-foreground"
          }`}>
          {inProcessCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("DELIVERED")}
        className={`flex flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-base font-bold transition-all cursor-pointer ${
          activeTab === "DELIVERED"
            ? "bg-card text-foreground shadow-md border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`}>
        <CheckCircle2 className="size-5 text-emerald-500" />
        <span>Delivered</span>
        <span
          className={`ml-1.5 rounded-full px-2.5 py-0.5 text-xs font-black transition-colors ${
            activeTab === "DELIVERED"
              ? "bg-emerald-500/20 text-emerald-600"
              : "bg-background text-muted-foreground"
          }`}>
          {deliveredCount}
        </span>
      </button>
    </div>
  );
}
