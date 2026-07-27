import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { ProductVisual } from "./ProductVisual";

export function WeeklyBrewCard({
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
      className="mx-4 flex items-stretch overflow-hidden rounded-lg bg-dark text-left"
    >
      <div className="flex flex-1 flex-col justify-center gap-1 p-4">
        <span className="mb-1 text-[9.5px] font-semibold uppercase tracking-[2px] text-gold">
          {tr.menu.weeklyBrewLabel}
        </span>
        <p className="font-serif text-xl leading-6 text-cream">{product.name}</p>
        {product.description ? (
          <p className="line-clamp-2 text-[11.5px] font-light leading-4 text-cream/60">
            {product.description}
          </p>
        ) : null}
        <p className="mt-2 font-semibold tabular-nums text-cream">
          {formatPrice(product.base_price)}
        </p>
      </div>
      <ProductVisual
        imageUrl={product.image_url}
        name={product.name}
        className="w-[132px] shrink-0"
      />
    </button>
  );
}
