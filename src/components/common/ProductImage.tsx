"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductImageSize = "sm" | "md" | "lg" | "xl" | "full";

interface ProductImageProps {
  src?: string | null;
  alt?: string;
  size?: ProductImageSize;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  priority?: boolean;
  aspectRatio?: "square" | "portrait" | "auto";
}

const SIZE_VARIANTS: Record<
  ProductImageSize,
  {
    container: string;
    icon: string;
    sizes: string;
  }
> = {
  sm: {
    container: "size-11 sm:size-12 rounded-lg",
    icon: "size-5",
    sizes: "48px",
  },
  md: {
    container: "size-16 sm:size-20 rounded-xl sm:rounded-2xl",
    icon: "size-6",
    sizes: "80px",
  },
  lg: {
    container: "size-24 sm:size-28 rounded-2xl",
    icon: "size-8",
    sizes: "120px",
  },
  xl: {
    container:
      "w-full min-h-[260px] sm:min-h-[380px] rounded-2xl sm:rounded-3xl",
    icon: "size-20 sm:size-24",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  full: {
    container: "w-full h-full",
    icon: "size-12 sm:size-16",
    sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  },
};

export function ProductImage({
  src,
  alt = "Product image",
  size = "full",
  className,
  containerClassName,
  iconClassName,
  priority = false,
  aspectRatio = "square",
}: ProductImageProps) {
  const variant = SIZE_VARIANTS[size] || SIZE_VARIANTS.full;

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
        ? "aspect-[4/5]"
        : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted/25 flex items-center justify-center border border-border/40",
        variant.container,
        aspectClass,
        containerClassName,
      )}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={variant.sizes}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-300",
            className,
          )}
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent text-primary">
          <Package
            className={cn("opacity-60", variant.icon, iconClassName)}
            strokeWidth={1.5}
          />
        </div>
      )}
    </div>
  );
}

export default ProductImage;
