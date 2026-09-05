export const API_ROUTES = {
  AUTH: {
    LOGIN: "/user/auth/login",
    SIGNUP: "/user/auth/signup",
    REFRESH_TOKEN: "/user/auth/refresh-token",
    LOGOUT: "/user/auth/logout",
  },
  PROFILE: "/user/profile",
  ADDRESSES: "/user/addresses",
  CATEGORIES: "/user/categories",
  PRODUCTS: "/user/products",
  CART: "/user/cart",
  ORDERS: "/user/orders",
  NOTIFICATIONS: {
    ROOT: "/user/notification",
    UNREAD_COUNT: "/user/notification/unread-count",
    READ_ALL: "/user/notification/read-all",
    MARK_READ: (id: string) => `/user/notification/${id}/read`,
    DEVICES_SYNC: "/user/notification/devices/sync",
    DEVICES_REMOVE: "/user/notification/devices/remove",
  },
};
