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
      className="w-36 shrink-0 snap-start text-left active:scale-[0.97]"
    >
      <div className="mb-2 aspect-square w-full overflow-hidden rounded-md">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={144}
            height={144}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProductImagePlaceholder className="h-full w-full" />
        )}
      </div>
      <p className="truncate text-sm font-semibold text-dark">{product.name}</p>
      <p className="text-xs text-muted">{formatPrice(product.base_price)}</p>
    </button>
  );
}
