import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { ProductVisual } from "./ProductVisual";

export function CategorySection({
  title,
  products,
  onProductClick,
  id,
}: {
  title: string;
  products: ProductWithOptions[];
  onProductClick?: (product: ProductWithOptions) => void;
  id?: string;
}) {
  const activeProducts = products.filter((p) => p.is_active);
  if (activeProducts.length === 0) return null;

  return (
    <section id={id} className="flex flex-col gap-2 px-4">
      <p className="text-[10px] font-semibold uppercase tracking-[2px] text-muted">{title}</p>
      <div>
        {activeProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onProductClick?.(product)}
            className="flex w-full items-center gap-3 border-b border-gold/20 py-3 text-left last:border-b-0"
          >
            <ProductVisual
              imageUrl={product.image_url}
              name={product.name}
              className="h-20 w-20 shrink-0 rounded-md bg-cream-dark"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-medium text-dark">{product.name}</p>
              {product.description ? (
                <p className="mt-1 line-clamp-2 text-xs font-light leading-4 text-muted">
                  {product.description}
                </p>
              ) : null}
            </div>
            <span className="shrink-0 text-[14.5px] font-semibold tabular-nums text-dark">
              {formatPrice(product.base_price)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
