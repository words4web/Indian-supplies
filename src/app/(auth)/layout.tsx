import React from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle
          size="sm"
          className="border border-border/80 bg-card/80 backdrop-blur-md shadow-xs hover:bg-card"
        />
      </div>

      <div className="flex-1 grid lg:grid-cols-2 h-full w-full">
        <div className="hidden lg:flex relative overflow-hidden bg-muted/40 p-16 flex-col justify-center border-r border-border/60">
          <div className="relative z-10 max-w-lg space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[.25em] text-primary">
                Indian Supplies
              </span>
              <h1 className="font-serif text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                Premium quality. <br />
                <span className="text-muted-foreground">
                  Direct to your business.
                </span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Get access to trade-only pricing, wholesale pack options, and
                reliable delivery slots arranged directly for your stockroom.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Trade-only pricing
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Better pricing for wholesale orders
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Flexible wholesale packs
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Options designed for business requirements
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Reliable UK delivery
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Scheduled delivery directly to your business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-12 relative bg-background h-full overflow-y-auto">
          <div className="w-full max-w-[480px] z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
