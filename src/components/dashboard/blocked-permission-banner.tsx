"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { BlockedPermissionBannerProps } from "@/types/notification.types";
import { STORAGE_KEYS } from "@/constants/storage";

export function BlockedPermissionBanner({
  className = "",
}: BlockedPermissionBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "denied" &&
      !sessionStorage.getItem(STORAGE_KEYS.NOTIF_BANNER_DISMISSED)
    ) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEYS.NOTIF_BANNER_DISMISSED, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-300 animate-in slide-in-from-top-2 duration-300 ${className}`}>
      <AlertCircle className="size-5 shrink-0 mt-0.5 text-amber-600" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug">
          Notifications Blocked
        </p>
        <p className="text-xs mt-0.5 leading-relaxed opacity-85">
          Push notifications are blocked in your browser settings. Enable them
          in your browser site settings to receive instant order updates.
        </p>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notification banner"
        className="shrink-0 p-0.5 rounded hover:opacity-70 transition-opacity cursor-pointer">
        <X className="size-4" />
      </button>
    </div>
  );
}
