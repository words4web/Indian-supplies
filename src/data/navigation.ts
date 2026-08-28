import { ROUTES } from "@/constants/routes";

export const NAVIGATION_ITEMS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.CATALOGUE, label: "Catalogue" },
  { href: ROUTES.ORDERS, label: "My orders" },
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
