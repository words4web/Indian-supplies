import { useQuery } from "@tanstack/react-query";
import { categoryService } from "./category.service";

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters: any) => [...categoryKeys.lists(), { filters }] as const,
};

export const useCategories = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: categoryKeys.list(params || {}),
    queryFn: () => categoryService.list(params),
  });
};
