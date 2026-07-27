import Image from "next/image";
import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductCard({
  product,
  onClick,
}: {
  product: ProductWithOptions;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[140px] shrink-0 snap-start flex-col gap-1 text-left active:scale-[0.97]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[10px] bg-cream-dark">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={140}
            height={140}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProductImagePlaceholder className="h-full w-full" />
        )}
      </div>
      <p className="truncate text-[15px] font-semibold text-dark">{product.name}</p>
      <p className="text-xs text-muted">{formatPrice(product.base_price)}</p>
    </button>
  );
}
