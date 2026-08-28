import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { orderService } from "./order.service";

export const useCreateOrder = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof orderService.create>[0]) =>
      orderService.create(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to place order.");
      options?.onError?.(error);
    },
  });
};

export const useOrdersQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.list(),
    enabled,
  });
};
