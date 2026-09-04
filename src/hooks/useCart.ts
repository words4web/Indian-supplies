import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product/product.types";
import { CartItem } from "@/types/cart.types";
import {
  useCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "@/services/cart/cart.hook";

export function useCart() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: cartData, isLoading } = useCartQuery(!!user);
  const addToCartMutation = useAddToCartMutation();
  const removeFromCartMutation = useRemoveFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  const items = useMemo<CartItem[]>(() => {
    if (!user || !cartData?.data?.items) return [];

    return cartData?.data?.items?.map((item: any) => {
      const prod = item?.productId || {};
      return {
        product: {
          id: prod?._id,
          name: prod?.name,
          slug: prod?.slug,
          pack: prod?.pack || null,
          price: prod?.price || null,
          categoryId:
            typeof prod?.categoryId === "object"
              ? prod?.categoryId?._id
              : prod?.categoryId || "",
          categoryName:
            typeof prod?.categoryId === "object" ? prod?.categoryId?.name : "",
          isVatApplicable: prod?.isVatApplicable ?? false,
        },
        quantity: item?.quantity,
      };
    });
  }, [user, cartData]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (user) {
        addToCartMutation.mutate({ productId: product?.id, quantity });
      }
    },
    [user, addToCartMutation],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!user) return;

      const currentItem = items?.find((item) => item?.product?.id === id);
      if (!currentItem) return;

      const diff = quantity - currentItem?.quantity;
      if (diff > 0) {
        addToCartMutation.mutate({ productId: id, quantity: diff });
      } else if (diff < 0) {
        removeFromCartMutation.mutate({
          productId: id,
          quantity: Math.abs(diff),
        });
      }
    },
    [user, items, addToCartMutation, removeFromCartMutation],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (user) {
        removeFromCartMutation.mutate({ productId: id });
      }
    },
    [user, removeFromCartMutation],
  );

  const clearCart = useCallback(() => {
    if (user) {
      clearCartMutation.mutate();
    }
  }, [user, clearCartMutation]);

  const itemCount = useMemo(() => {
    return items?.length || 0;
  }, [items]);

  const subtotal = useMemo(() => {
    return items?.reduce(
      (sum, item) => sum + (item?.product?.price ?? 0) * item?.quantity,
      0,
    );
  }, [items]);

  const vat = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        (item?.product?.isVatApplicable
          ? (item?.product.price ?? 0) * 0.2 * item?.quantity
          : 0),
      0,
    );
  }, [items]);

  return {
    items,
    ready: !isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount,
    subtotal,
    vat,
  };
}

export default useCart;
