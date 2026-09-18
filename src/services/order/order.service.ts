import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";

export const orderService = {
  create: async (payload: { addressId: string; notes?: string }) => {
    const response = await axiosInstance.post(API_ROUTES.ORDERS, payload);
    return response.data;
  },

  list: async () => {
    const response = await axiosInstance.get(API_ROUTES.ORDERS);
    return response.data;
  },
};
export default orderService;
