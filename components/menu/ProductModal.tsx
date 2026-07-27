"use client";

import { useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/money";
import type { ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

export function ProductModal({
  product,
  onClose,
}: {
  product: ProductWithOptions;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-dark/60 sm:items-center">
      <button
        type="button"
        aria-label={tr.productModal.close}
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="animate-sheet-in relative flex max-h-[85vh] w-full max-w-md flex-col overflow-y-auto rounded-t-lg bg-cream sm:rounded-lg">
        <button
          type="button"
          onClick={onClose}
          aria-label={tr.productModal.close}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-dark/70 text-cream"
        >
          ×
        </button>

        <div className="aspect-[4/3] w-full shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={640}
              height={480}
              className="h-full w-full object-cover"
            />
          ) : (
            <ProductImagePlaceholder className="h-full w-full" />
          )}
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div>
            <h2 className="font-serif text-2xl text-dark">{product.name}</h2>
            {product.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
            ) : null}
          </div>

          {product.product_option_groups.map((group) => (
            <div key={group.id}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold">
                {group.name}
              </p>
              <div className="flex flex-col divide-y divide-gold/10">
                {group.product_options.map((option) => (
                  <div key={option.id} className="flex items-center justify-between py-1.5 text-sm">
                    <span className="text-dark">
                      {option.name}
                      {option.is_default ? (
                        <span className="ml-2 text-xs text-muted">
                          ({tr.productModal.defaultOption})
                        </span>
                      ) : null}
                    </span>
                    {option.price_diff !== 0 ? (
                      <span className="text-terra">
                        {option.price_diff > 0 ? "+" : "-"}
                        {formatPrice(Math.abs(option.price_diff))}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-gold/20 pt-4">
            <span className="text-sm text-muted">{tr.productModal.basePrice}</span>
            <span className="font-serif text-xl text-terra">{formatPrice(product.base_price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
