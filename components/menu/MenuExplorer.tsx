"use client";

import { useMemo, useState } from "react";
import type { CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { SearchBar } from "./SearchBar";
import { CategorySection } from "./CategorySection";
import { ProductRow } from "./ProductRow";
import { ProductModal } from "./ProductModal";
import { EmptyState } from "@/components/EmptyState";

export function MenuExplorer({ categories }: { categories: CategoryWithProducts[] }) {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductWithOptions | null>(null);

  const featuredProducts = useMemo(
    () => categories.flatMap((c) => c.products.filter((p) => p.is_active && p.is_featured)),
    [categories],
  );

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return categories.flatMap((c) =>
      c.products.filter(
        (p) =>
          p.is_active &&
          (p.name.toLocaleLowerCase("tr-TR").includes(normalizedQuery) ||
            (p.description ?? "").toLocaleLowerCase("tr-TR").includes(normalizedQuery)),
      ),
    );
  }, [categories, normalizedQuery]);

  const isSearching = normalizedQuery.length > 0;

  return (
    <div className="flex-1">
      <SearchBar value={query} onChange={setQuery} />

      {isSearching ? (
        <div className="mx-auto max-w-2xl px-6 pb-12">
          {searchResults.length === 0 ? (
            <EmptyState message={tr.menu.emptySearch} />
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              {searchResults.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-8 pb-12">
          {featuredProducts.length > 0 ? (
            <CategorySection
              title={tr.menu.featuredTitle}
              products={featuredProducts}
              onProductClick={setSelectedProduct}
            />
          ) : null}

          {categories.map((category) => (
            <CategorySection
              key={category.id}
              title={category.name}
              products={category.products}
              onProductClick={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {selectedProduct ? (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : null}
    </div>
  );
}
