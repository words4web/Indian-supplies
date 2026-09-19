import { ROUTES } from "@/constants/routes";
import {
  Home,
  LayoutGrid,
  ShoppingBasket,
  PackageCheck,
  User,
  LogIn,
  LucideIcon,
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.CATALOGUE, label: "Catalogue" },
  { href: ROUTES.ORDERS, label: "Orders" },
];

export const HEADER_UTILITIES = {
  search: {
    href: ROUTES.CATALOGUE,
    ariaLabel: "Search catalogue",
  },
  cart: {
    href: ROUTES.CART,
  },
  auth: {
    loginHref: ROUTES.LOGIN,
    profileHref: ROUTES.PROFILE,
  },
};

export interface MobileNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number | null;
  isActive: boolean;
}

export const getMobileNavItems = ({
  pathname,
  user,
  itemCount,
}: {
  pathname: string;
  user: any;
  itemCount: number;
}): MobileNavItem[] => [
  {
    href: ROUTES.HOME,
    label: "Home",
    icon: Home,
    isActive: pathname === ROUTES.HOME,
  },
  {
    href: ROUTES.CATALOGUE,
    label: "Catalogue",
    icon: LayoutGrid,
    isActive:
      pathname === ROUTES.CATALOGUE || pathname.startsWith("/products/"),
  },
  {
    href: ROUTES.CART,
    label: "Cart",
    icon: ShoppingBasket,
    badge: itemCount > 0 ? (itemCount > 99 ? "99+" : itemCount) : null,
    isActive: pathname === ROUTES.CART || pathname === ROUTES.CHECKOUT,
  },
  {
    href: user ? ROUTES.ORDERS : ROUTES.LOGIN,
    label: "Orders",
    icon: PackageCheck,
    isActive: pathname === ROUTES.ORDERS,
  },
  {
    href: user ? ROUTES.PROFILE : ROUTES.LOGIN,
    label: user ? "Profile" : "Sign In",
    icon: user ? User : LogIn,
    isActive:
      pathname === ROUTES.PROFILE ||
      pathname === ROUTES.LOGIN ||
      pathname === ROUTES.SIGNUP,
  },
];
