export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CART: "/cart",
  PROFILE: "/profile",
  CATALOGUE: "/catalogue",
  CATALOGUE_CATEGORY: (category: string) => `/catalogue?category=${category}`,
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  NOTIFICATIONS: "/notifications",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
};

export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.CHECKOUT,
  ROUTES.NOTIFICATIONS,
];

export const GUEST_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];
