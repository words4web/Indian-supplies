import { DesktopHeader } from "./navigation/desktop-header";
import { MobileHeader } from "./navigation/mobile-header";
import { MobileBottomNav } from "./navigation/mobile-bottom-nav";

export { DesktopHeader, MobileHeader, MobileBottomNav };

export function PortalHeader() {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
      <MobileBottomNav />
    </>
  );
}
