import type { ProductWithOptions } from "@/lib/types";
import { ProductCard } from "./ProductCard";

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
    <section id={id} className="flex flex-col gap-3">
      <h2 className="px-6 font-serif text-xl tracking-wide text-dark">{title}</h2>
      <div className="no-scrollbar flex snap-x snap-proximity gap-4 overflow-x-auto px-6 pb-1">
        {activeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick ? () => onProductClick(product) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
