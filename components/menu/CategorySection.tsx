import type { CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { ProductRow } from "./ProductRow";

export function CategorySection({
  category,
  onProductClick,
}: {
  category: CategoryWithProducts;
  onProductClick?: (product: ProductWithOptions) => void;
}) {
  const activeProducts = category.products.filter((p) => p.is_active);
  if (activeProducts.length === 0) return null;

  return (
    <section id={`kategori-${category.id}`} className="scroll-mt-32 py-8">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-serif text-2xl text-dark">{category.name}</h2>
        <span className="h-px flex-1 bg-gold/40" />
      </div>
      <div className="flex flex-col divide-y divide-gold/15">
        {activeProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onClick={onProductClick ? () => onProductClick(product) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
