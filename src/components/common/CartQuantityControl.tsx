"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product/product.types";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface CartQuantityControlProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
  showAddButtonWhenZero?: boolean;
}

export function CartQuantityControl({
  product,
  size = "md",
  className = "",
  showAddButtonWhenZero = true,
}: CartQuantityControlProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { items, addItem, updateQuantity, removeItem } = useCart();

  const cartItem = items?.find((item) => item?.product?.id === product?.id);
  const serverQuantity = cartItem?.quantity || 0;

  const [localQuantity, setLocalQuantity] = useState(serverQuantity);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const serverQuantityRef = useRef(serverQuantity);
  serverQuantityRef.current = serverQuantity;

  useEffect(() => {
    if (!debounceTimerRef.current) {
      setLocalQuantity(serverQuantity);
    }
  }, [serverQuantity]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleStep = (targetQuantity: number) => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (targetQuantity <= 0) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      setLocalQuantity(0);
      removeItem(product?.id);
      return;
    }

    const cappedQuantity = Math.min(99, targetQuantity);
    setLocalQuantity(cappedQuantity);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      if (serverQuantityRef.current === 0) {
        addItem(product, cappedQuantity);
      } else {
        updateQuantity(product?.id, cappedQuantity);
      }
    }, 350);
  };

  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    setLocalQuantity(1);
    addItem(product, 1);
  };

  if (!user && showAddButtonWhenZero && localQuantity === 0) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(ROUTES.LOGIN);
        }}
        className={`relative z-10 cursor-pointer ${
          size === "sm"
            ? "text-[10px] sm:text-[11px] h-7 sm:h-8 px-2 sm:px-3"
            : size === "lg"
              ? "h-10 sm:h-11 text-xs sm:text-sm px-4"
              : "h-9 text-xs px-3"
        } ${className}`}
        aria-label="Login to add to basket">
        Login to Add
      </Button>
    );
  }

  if (showAddButtonWhenZero && localQuantity === 0) {
    return (
      <Button
        size={size === "lg" ? "lg" : "sm"}
        onClick={handleInitialAdd}
        className={`relative z-10 cursor-pointer font-bold shadow-sm ${
          size === "sm"
            ? "h-7 sm:h-8 px-2 sm:px-3 text-xs"
            : size === "lg"
              ? "flex-1 h-10 sm:h-11 text-xs sm:text-sm px-4 flex items-center justify-center gap-2"
              : "h-9 px-3 text-xs"
        } ${className}`}
        aria-label={`Add ${product?.name} to basket`}>
        {size === "lg" ? (
          <>
            <ShoppingCart className="size-4" />
            <span>Add to cart</span>
          </>
        ) : (
          <>
            <Plus className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline">Add</span>
          </>
        )}
      </Button>
    );
  }

  const heightClasses =
    size === "sm" ? "h-7 sm:h-8" : size === "lg" ? "h-10 sm:h-11" : "h-9";

  const btnPaddingClasses =
    size === "sm"
      ? "px-2 sm:px-2.5"
      : size === "lg"
        ? "px-3.5 sm:px-4"
        : "px-3";

  const textClasses =
    size === "sm"
      ? "text-xs min-w-[1.5rem]"
      : size === "lg"
        ? "text-xs sm:text-sm min-w-[2rem] sm:min-w-[2.5rem]"
        : "text-xs sm:text-sm min-w-[2rem]";

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`inline-flex items-center rounded-xl border border-input bg-card shadow-xs overflow-hidden select-none relative z-10 ${heightClasses} ${className}`}>
      <button
        type="button"
        onClick={() => handleStep(localQuantity - 1)}
        className={`${btnPaddingClasses} h-full hover:bg-muted transition-colors cursor-pointer flex items-center justify-center text-foreground active:scale-95`}
        aria-label="Decrease quantity">
        <Minus className="size-3.5" />
      </button>

      <span
        className={`px-1.5 sm:px-2 text-center font-extrabold text-foreground ${textClasses}`}>
        {localQuantity}
      </span>

      <button
        type="button"
        onClick={() => handleStep(localQuantity + 1)}
        className={`${btnPaddingClasses} h-full hover:bg-muted transition-colors cursor-pointer flex items-center justify-center text-foreground active:scale-95`}
        aria-label="Increase quantity">
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
