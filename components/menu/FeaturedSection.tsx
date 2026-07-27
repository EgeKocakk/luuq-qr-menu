import Image from "next/image";
import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function FeaturedSection({
  products,
  onSelect,
}: {
  products: ProductWithOptions[];
  onSelect: (product: ProductWithOptions) => void;
}) {
  if (products.length === 0) return null;

  return (
    <section className="bg-cream-dark/50 py-6">
      <h2 className="mb-3 px-6 font-serif text-xl text-dark">{tr.menu.featuredTitle}</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-1">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product)}
            className="w-36 shrink-0 rounded-lg bg-white/50 p-2 text-left shadow-sm transition-transform hover:-translate-y-0.5"
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
            <p className="text-sm text-terra">{formatPrice(product.base_price)}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
