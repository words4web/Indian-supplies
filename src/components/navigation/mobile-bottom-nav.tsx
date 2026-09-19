"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { getMobileNavItems } from "@/data/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { itemCount } = useCart();

  const navItems = getMobileNavItems({ pathname, user, itemCount });

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-background/95 backdrop-blur-xl border-t border-border/70 pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Bottom Navigation">
      <div className="flex items-center justify-around px-2">
        {navItems?.map((item) => {
          const Icon = item?.icon;
          const active = item?.isActive;
          const isProfileTab = item?.label === "Profile" && !!user;

          return (
            <Link
              key={item?.label}
              href={item?.href}
              className={`relative flex flex-1 flex-col items-center justify-center py-1 px-1 transition-all duration-200 active:scale-95 ${
                active
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground font-medium"
              }`}
              aria-label={item?.label}>
              <div
                className={`relative flex h-8 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}>
                {isProfileTab ? (
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[13px] font-semibold uppercase tracking-normal transition-transform ${
                      active
                        ? "bg-primary text-primary-foreground shadow-xs scale-105"
                        : "bg-muted text-foreground border border-border/80"
                    }`}>
                    {user?.name
                      ? user?.name
                          ?.split(" ")
                          ?.filter(Boolean)
                          ?.map((n: string) => n[0])
                          ?.slice(0, 2)
                          ?.join("")
                      : "U"}
                  </span>
                ) : (
                  <Icon
                    className={`size-5 transition-transform duration-200 ${
                      active ? "scale-110 stroke-[2.25]" : "stroke-[1.75]"
                    }`}
                  />
                )}

                {item?.badge !== null && item?.badge !== undefined && (
                  <span className="absolute -top-1 right-1 flex min-w-4 h-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground shadow-xs animate-in zoom-in-50">
                    {item?.badge}
                  </span>
                )}
              </div>

              <span
                className={`mt-0.5 text-[10px] leading-tight tracking-tight transition-all duration-200 ${
                  active ? "font-bold text-primary" : "text-muted-foreground"
                }`}>
                {item?.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
