"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { HEADER_UTILITIES } from "@/data/navigation";

export function MobileHeader() {
  const { user } = useAuth();
  const unreadCount = useSelector(
    (state: RootState) => state?.notification?.unreadCount,
  );

  return (
    <header className="sticky top-0 z-40 block md:hidden border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          href={ROUTES.HOME}
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Indian Supplies home">
          <Image
            src="/logo.png"
            alt="Indian Supplies Logo"
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-xl object-contain"
            priority
          />
          <span className="truncate font-serif text-base font-extrabold tracking-tight text-foreground">
            Indian Supplies
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            href={HEADER_UTILITIES.search.href}
            aria-label="Search catalogue"
            className="flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all">
            <Search className="size-5" />
          </Link>

          {user && (
            <Link
              href={ROUTES.NOTIFICATIONS}
              className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all"
              aria-label={`Notifications ${
                unreadCount > 0 ? `(${unreadCount} unread)` : ""
              }`}>
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex min-w-4 h-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-extrabold text-destructive-foreground shadow-xs animate-in zoom-in-50">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
