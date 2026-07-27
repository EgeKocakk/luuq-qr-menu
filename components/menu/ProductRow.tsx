import Image from "next/image";
import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductRow({
  product,
  onClick,
}: {
  product: ProductWithOptions;
  onClick?: () => void;
}) {
  const hasOptions = product.product_option_groups.length > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-lg bg-white p-4 text-left shadow-[0_1px_3px_rgba(59,42,38,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(59,42,38,0.12)] active:scale-[0.98]"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProductImagePlaceholder className="h-full w-full" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium text-dark">{product.name}</p>
        {product.description ? (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        ) : null}
        {hasOptions ? (
          <p className="mt-1 text-xs text-muted/80">{tr.menu.optionsAvailable}</p>
        ) : null}
      </div>

      <span className="shrink-0 font-serif text-lg text-terra">
        {formatPrice(product.base_price)}
      </span>
    </button>
  );
}
