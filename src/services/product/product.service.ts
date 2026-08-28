import { axiosInstance } from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";

export const productService = {
  list: async (params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
  }) => {
    const response = await axiosInstance.get(API_ROUTES.PRODUCTS, {
      params,
    });
    return response?.data;
  },

  getDetail: async (idOrSlug: string) => {
    const response = await axiosInstance.get(
      `${API_ROUTES.PRODUCTS}/${idOrSlug}`,
    );
    return response?.data;
  },
};
