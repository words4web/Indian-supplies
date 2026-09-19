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
    <div className="grid grid-cols-2 w-full sm:w-auto sm:inline-flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-muted/80 p-1 sm:p-1.5 text-sm sm:text-base font-medium border border-border/50">
      <button
        type="button"
        onClick={() => onTabChange("IN_PROCESS")}
        className={`flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl px-2.5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base font-bold transition-all cursor-pointer truncate ${
          activeTab === "IN_PROCESS"
            ? "bg-card text-foreground shadow-xs border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`}>
        <Clock className="size-3.5 sm:size-5 text-amber-500 shrink-0" />
        <span className="truncate">In Process</span>
        <span
          className={`ml-1 rounded-full px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold transition-colors shrink-0 ${
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
        className={`flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl px-2.5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base font-bold transition-all cursor-pointer truncate ${
          activeTab === "DELIVERED"
            ? "bg-card text-foreground shadow-xs border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
        }`}>
        <CheckCircle2 className="size-3.5 sm:size-5 text-emerald-500 shrink-0" />
        <span className="truncate">Delivered</span>
        <span
          className={`ml-1 rounded-full px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold transition-colors shrink-0 ${
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
