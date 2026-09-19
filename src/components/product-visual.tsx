import { ProductImage } from "@/components/common/ProductImage";
import type { Product } from "@/types/product/product.types";
import {
  Box,
  CupSoda,
  Droplets,
  Flame,
  Package,
  Snowflake,
  Sprout,
  Waves,
} from "lucide-react";

const icons = [
  Sprout,
  Droplets,
  Flame,
  Package,
  Snowflake,
  CupSoda,
  Waves,
  Box,
];

const tones = [
  "from-emerald-100 to-lime-50 text-emerald-700",
  "from-sky-100 to-cyan-50 text-sky-700",
  "from-amber-100 to-orange-50 text-orange-700",
  "from-violet-100 to-fuchsia-50 text-violet-700",
  "from-teal-100 to-emerald-50 text-teal-700",
  "from-rose-100 to-pink-50 text-rose-700",
  "from-blue-100 to-indigo-50 text-blue-700",
  "from-yellow-100 to-amber-50 text-amber-700",
];

function toneIndex(value: string) {
  return (
    [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0) %
    tones.length
  );
}

export function ProductVisual({
  product,
  large = false,
  imageIndex = 0,
}: {
  product: Product;
  large?: boolean;
  imageIndex?: number;
}) {
  const images =
    Array.isArray(product?.images) && product?.images?.length > 0
      ? product?.images
      : product?.imageUrl
        ? [product?.imageUrl]
        : [];

  const displayImage = images[imageIndex] || images[0];

  return (
    <ProductImage
      src={displayImage}
      alt={product?.name || "Product image"}
      size={large ? "xl" : "full"}
      priority={large}
      containerClassName={
        large ? "rounded-none border-0" : "rounded-none border-0 aspect-square"
      }
      className="group-hover:scale-105"
    />
  );
}

export function CategoryVisual({
  category,
  index = 0,
}: {
  category: { id: string; name: string };
  index?: number;
}) {
  const tone = (toneIndex(category?.id || "") + index) % tones?.length;
  const Icon = icons[tone] || Package;
  return (
    <div
      className={`flex size-10 sm:size-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${tones[tone]} transition-transform group-hover:scale-105`}
      aria-hidden="true">
      <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
    </div>
  );
}
