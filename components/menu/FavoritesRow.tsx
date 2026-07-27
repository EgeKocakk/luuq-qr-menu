import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { ProductVisual } from "./ProductVisual";

export function FavoritesRow({
  products,
  onProductClick,
}: {
  products: ProductWithOptions[];
  onProductClick?: (product: ProductWithOptions) => void;
}) {
  if (products.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="px-4 text-[10px] font-semibold uppercase tracking-[2px] text-muted">
        {tr.menu.favoritesTitle}
      </p>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onProductClick?.(product)}
            className="flex w-[115px] shrink-0 flex-col gap-1 text-left"
          >
            <ProductVisual
              imageUrl={product.image_url}
              name={product.name}
              className="aspect-square w-full rounded-md bg-cream-dark"
            />
            <p className="truncate text-[15px] font-semibold text-dark">{product.name}</p>
            <span className="text-xs tabular-nums text-muted">
              {formatPrice(product.base_price)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
