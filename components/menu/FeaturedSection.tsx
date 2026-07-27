import Image from "next/image";
import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { RevealOnScroll } from "@/components/RevealOnScroll";
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
    <RevealOnScroll className="bg-dark py-10">
      <h2 className="mb-4 px-6 font-serif text-xl tracking-wide text-cream">
        {tr.menu.featuredTitle}
      </h2>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product)}
            className="w-36 shrink-0 snap-start rounded-lg border border-gold/20 bg-cream/10 p-3 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 active:scale-[0.97]"
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
            <p className="truncate text-sm font-semibold text-cream">{product.name}</p>
            <p className="text-sm text-gold">{formatPrice(product.base_price)}</p>
          </button>
        ))}
      </div>
    </RevealOnScroll>
  );
}
