import { useQuery } from "@tanstack/react-query";
import { productService } from "./product.service";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: any) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (idOrSlug: string) => [...productKeys.details(), idOrSlug] as const,
};

export const useProducts = (params?: {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => productService.list(params),
  });
};

export const useProductDetail = (idOrSlug: string) => {
  return useQuery({
    queryKey: productKeys.detail(idOrSlug),
    queryFn: () => productService.getDetail(idOrSlug),
    enabled: !!idOrSlug,
  });
};
