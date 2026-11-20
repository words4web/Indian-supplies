import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "./cart.service";
import { Product } from "@/types/product/product.types";
import { toast } from "sonner";

export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
};

export const useCartQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: ({ signal }) => cartService.getCart(signal),
    enabled,
  });
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity?: number;
      product?: Product;
    }) => cartService.addToCart(productId, quantity),
    onMutate: async ({ productId, quantity = 1, product }) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });

      const previousCart = queryClient.getQueryData(cartKeys.detail());

      queryClient.setQueryData(cartKeys.detail(), (old: any) => {
        if (!old?.data) return old;
        const currentItems = Array.isArray(old.data.items)
          ? [...old.data.items]
          : [];

        const existingIndex = currentItems.findIndex(
          (item: any) =>
            String(item?.productId?._id || item?.productId) === productId,
        );

        if (existingIndex > -1) {
          const existingItem = currentItems[existingIndex];
          currentItems[existingIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          };
        } else if (product) {
          currentItems.push({
            productId: {
              _id: product.id,
              name: product.name,
              slug: product.slug,
              pack: product.pack,
              price: product.price,
              images: product.images,
              categoryId: product.categoryId,
              isVatApplicable: product.isVatApplicable,
            },
            quantity,
          });
        }

        return {
          ...old,
          data: {
            ...old.data,
            items: currentItems,
          },
        };
      });

      return { previousCart };
    },
    onError: (err: any, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.detail(), context.previousCart);
      }
      toast.error(
        err?.response?.data?.message || "Failed to update cart item.",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useRemoveFromCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity?: number;
    }) => cartService.removeFromCart(productId, quantity),
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });

      const previousCart = queryClient.getQueryData(cartKeys.detail());

      queryClient.setQueryData(cartKeys.detail(), (old: any) => {
        if (!old?.data?.items) return old;
        const currentItems = Array.isArray(old.data.items)
          ? [...old.data.items]
          : [];

        const existingIndex = currentItems.findIndex(
          (item: any) =>
            String(item?.productId?._id || item?.productId) === productId,
        );

        if (existingIndex === -1) return old;

        if (quantity !== undefined && quantity > 0) {
          const newQty = currentItems[existingIndex].quantity - quantity;
          if (newQty > 0) {
            currentItems[existingIndex] = {
              ...currentItems[existingIndex],
              quantity: newQty,
            };
          } else {
            currentItems.splice(existingIndex, 1);
          }
        } else {
          currentItems.splice(existingIndex, 1);
        }

        return {
          ...old,
          data: {
            ...old.data,
            items: currentItems,
          },
        };
      });

      return { previousCart };
    },
    onError: (err: any, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.detail(), context.previousCart);
      }
      toast.error(
        err?.response?.data?.message || "Failed to update cart item.",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useClearCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartKeys.all });

      const previousCart = queryClient.getQueryData(cartKeys.detail());

      queryClient.setQueryData(cartKeys.detail(), (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: [],
          },
        };
      });

      return { previousCart };
    },
    onError: (err: any, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.detail(), context.previousCart);
      }
      toast.error(err?.response?.data?.message || "Failed to clear cart.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};
