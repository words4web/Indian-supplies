"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Search, ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { ROUTES } from "@/constants/routes";
import { NAVIGATION_ITEMS, HEADER_UTILITIES } from "@/data/navigation";

export function DesktopHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const unreadCount = useSelector(
    (state: RootState) => state?.notification?.unreadCount,
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`hidden md:block sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-border/70 bg-background/98 backdrop-blur shadow-xs"
          : "border-border/40 bg-background"
      }`}>
      <div className="mx-auto flex h-[84px] lg:h-[96px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          href={ROUTES.HOME}
          className="flex min-w-0 items-center gap-3.5 py-2 group"
          aria-label="Indian Supplies home">
          <Image
            src="/logo.png"
            alt="Indian Supplies Logo"
            width={88}
            height={88}
            className="size-14 lg:size-18 shrink-0 rounded-2xl object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="truncate font-serif text-lg lg:text-xl font-extrabold tracking-tight text-foreground">
            Indian Supplies
          </span>
        </Link>

        <nav
          className="flex items-center gap-1.5 lg:gap-2"
          aria-label="Primary navigation">
          {NAVIGATION_ITEMS?.filter(
            (item) => item?.href !== ROUTES.ORDERS || !!user,
          )?.map((item) => {
            const isActive = pathname === item?.href;
            return (
              <Link
                key={item?.href}
                href={item?.href}
                className={`rounded-xl px-4 lg:px-5 py-2 text-sm lg:text-base font-bold transition-all ${
                  isActive
                    ? "bg-secondary text-primary shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 lg:gap-3">
          <Link
            href={HEADER_UTILITIES.search.href}
            aria-label={HEADER_UTILITIES.search.ariaLabel}
            className="flex size-11 lg:size-12 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Search className="size-5 lg:size-6" />
          </Link>

          {user && (
            <>
              <Link
                href={ROUTES.NOTIFICATIONS}
                className="relative flex size-11 lg:size-12 items-center justify-center rounded-xl bg-muted/50 text-foreground hover:bg-muted cursor-pointer transition-colors"
                aria-label={`Notifications ${
                  unreadCount > 0 ? `(${unreadCount} unread)` : ""
                }`}>
                <Bell className="size-5 lg:size-6" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-extrabold text-destructive-foreground shadow-xs z-10 animate-in zoom-in-50">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                href={HEADER_UTILITIES.cart.href}
                className="relative flex size-11 lg:size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                aria-label={`Basket with ${itemCount} items`}>
                <ShoppingBasket className="size-5 lg:size-6" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground shadow-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {user ? (
            <Link
              href={HEADER_UTILITIES.auth.profileHref}
              aria-label={`Account profile for ${user?.name || "Customer"}`}
              title={user?.name || "Account"}
              className="relative flex size-11 lg:size-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-base lg:text-lg tracking-normal uppercase shadow-xs transition-all hover:scale-105 hover:shadow-md active:scale-95">
              {user?.name
                ? user?.name
                    ?.split(" ")
                    ?.filter(Boolean)
                    ?.map((n: string) => n[0])
                    ?.slice(0, 2)
                    ?.join("")
                : "U"}
            </Link>
          ) : (
            <Link
              href={HEADER_UTILITIES.auth.loginHref}
              aria-label="Sign in"
              className="flex items-center rounded-xl px-4 py-2 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs hover:-translate-y-0.5 transition-all">
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
