import type { CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { RevealOnScroll } from "@/components/RevealOnScroll";
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
    <section
      id={`kategori-${category.id}`}
      data-category-section
      data-category-id={category.id}
      className="scroll-mt-32 py-10"
    >
      <RevealOnScroll>
        <h2 className="mb-6 font-serif text-2xl tracking-wide text-dark">{category.name}</h2>
        <div className="flex flex-col gap-3">
          {activeProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onClick={onProductClick ? () => onProductClick(product) : undefined}
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
