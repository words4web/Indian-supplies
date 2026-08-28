import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-background">
      <div className="flex-1 grid lg:grid-cols-2 h-full w-full">
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#081a11] via-background to-background p-16 flex-col justify-center text-primary-foreground border-r border-border/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />

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

        <div className="flex items-center justify-center p-6 sm:p-12 relative bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02),transparent_70%)] h-full overflow-y-auto">
          <div className="w-full max-w-[480px] z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
