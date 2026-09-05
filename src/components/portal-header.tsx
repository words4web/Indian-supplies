"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, ShoppingBasket, UserRound, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { NAVIGATION_ITEMS, HEADER_UTILITIES } from "@/data/navigation";

export function PortalHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const unreadCount = useSelector(
    (state: RootState) => state.notification.unreadCount,
  );

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window?.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${scrolled ? "border-border/70 bg-background/98 backdrop-blur shadow-sm" : "border-border/40 bg-background"}`}>
      <div className="mx-auto flex h-[108px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          href={ROUTES.HOME}
          className="flex min-w-0 items-center gap-4 py-2"
          aria-label="Indian Supplies home">
          <Image
            src="/logo.png"
            alt="Indian Supplies Logo"
            width={112}
            height={112}
            className="size-20 sm:size-28 shrink-0 rounded-2xl object-contain"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
              Indian Supplies
            </span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              Wholesale food &amp; essentials
            </span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-2 lg:gap-3 md:flex"
          aria-label="Primary navigation">
          {NAVIGATION_ITEMS.filter(
            (item) => item.href !== ROUTES.ORDERS || !!user,
          ).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-5 py-2.5 text-base font-bold transition-colors ${pathname === item.href ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={HEADER_UTILITIES.search.href}
            aria-label={HEADER_UTILITIES.search.ariaLabel}
            className="hidden size-12 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground sm:flex">
            <Search className="size-6" />
          </Link>
          {user && (
            <>
              <Link
                href={ROUTES.NOTIFICATIONS}
                className="relative flex size-12 items-center justify-center rounded-xl bg-muted/50 text-foreground hover:bg-muted cursor-pointer transition-colors"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}>
                <Bell className="size-6" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-extrabold text-destructive-foreground shadow-xs z-10">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>
              <Link
                href={HEADER_UTILITIES.cart.href}
                className="relative flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
                aria-label={`Basket with ${itemCount} items`}>
                <ShoppingBasket className="size-6" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}
          <Link
            href={
              user
                ? HEADER_UTILITIES.auth.profileHref
                : HEADER_UTILITIES.auth.loginHref
            }
            aria-label={user ? "Account" : "Sign in"}
            className="hidden size-12 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground sm:flex">
            <UserRound className="size-6" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-12"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-border/70 px-5 py-3 md:hidden"
          aria-label="Mobile navigation">
          {NAVIGATION_ITEMS.filter(
            (item) => item.href !== ROUTES.ORDERS || !!user,
          ).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
