import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";

export const categoryService = {
  list: async (params?: { page?: number; limit?: number }) => {
    const response = await axiosInstance.get(API_ROUTES.CATEGORIES, {
      params,
    });
    return response?.data;
  },
};
