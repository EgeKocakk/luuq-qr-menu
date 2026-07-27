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
        <div className="mb-6">
          <h2 className="font-serif text-2xl tracking-wide text-dark">{category.name}</h2>
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-gold" />
        </div>
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
