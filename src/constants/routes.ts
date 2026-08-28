export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_OTP: "/verify-otp",
  CART: "/cart",
  PROFILE: "/profile",
  CATALOGUE: "/catalogue",
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
};

export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.CHECKOUT,
];

export const GUEST_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];
