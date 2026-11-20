"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductImage } from "@/components/common/ProductImage";
import { CartItem } from "@/types/cart.types";
import { formatPounds } from "@/lib/format";
import { ROUTES } from "@/constants/routes";
import { CartQuantityControl } from "@/components/common/CartQuantityControl";

export function CartItemCard({
  item,
  removeItem,
}: {
  item: CartItem;
  removeItem: (id: string) => void;
}) {
  const { product, quantity } = item;
  const imgUrl =
    product?.imageUrl ||
    (Array.isArray(product?.images) && product?.images?.length > 0
      ? product?.images?.[0]
      : undefined);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        <Link
          href={ROUTES.PRODUCT_DETAIL(product?.slug)}
          className="shrink-0 hover:opacity-90 transition-opacity">
          <ProductImage
            src={imgUrl}
            alt={product?.name || "Product"}
            size="md"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={ROUTES.PRODUCT_DETAIL(product?.slug)}
            className="font-serif text-base sm:text-lg font-bold hover:text-primary transition-colors line-clamp-2">
            {product?.name}
          </Link>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
            <span>{product?.pack ?? "Wholesale pack"}</span>
            <span>·</span>
            <span>{formatPounds(product?.price)} per pack</span>
            {product?.isVatApplicable && (
              <span className="text-[10px] sm:text-xs font-semibold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                + VAT
              </span>
            )}
          </p>
          <div className="mt-3 sm:mt-4 flex items-center gap-3">
            <CartQuantityControl
              product={product}
              size="md"
              showAddButtonWhenZero={false}
            />
            <button
              type="button"
              onClick={() => removeItem(product?.id)}
              className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
              <Trash2 className="size-3.5" /> Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col items-center justify-between sm:items-end border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0">
        <span className="sm:hidden text-xs text-muted-foreground font-medium">
          Item Total
        </span>
        <p className="font-serif text-base sm:text-lg font-extrabold text-foreground">
          {formatPounds((product?.price ?? 0) * quantity)}
        </p>
      </div>
    </div>
  );
}
