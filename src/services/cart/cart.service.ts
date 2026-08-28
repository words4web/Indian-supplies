import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";

export const cartService = {
  getCart: async () => {
    const response = await axiosInstance.get(API_ROUTES.CART);
    return response?.data;
  },

  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await axiosInstance.post(`${API_ROUTES.CART}/add`, {
      productId,
      quantity,
    });
    return response?.data;
  },

  removeFromCart: async (productId: string, quantity?: number) => {
    const response = await axiosInstance.post(`${API_ROUTES.CART}/remove`, {
      productId,
      quantity,
    });
    return response?.data;
  },

  clearCart: async () => {
    const response = await axiosInstance.post(`${API_ROUTES.CART}/clear`);
    return response?.data;
  },
};
