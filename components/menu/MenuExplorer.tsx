"use client";

import { useMemo, useState } from "react";
import type { CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { SearchBar } from "./SearchBar";
import { CampaignBanner } from "./CampaignBanner";
import { FavoritesRow } from "./FavoritesRow";
import { WeeklyBrewCard } from "./WeeklyBrewCard";
import { CategoryPills } from "./CategoryPills";
import { CategorySection } from "./CategorySection";
import { ProductRow } from "./ProductRow";
import { ProductModal } from "./ProductModal";
import { EmptyState } from "@/components/EmptyState";

export function MenuExplorer({
  categories,
  announcement,
}: {
  categories: CategoryWithProducts[];
  announcement: string | null;
}) {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductWithOptions | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  const featuredProducts = useMemo(
    () => categories.flatMap((c) => c.products.filter((p) => p.is_active && p.is_featured)),
    [categories],
  );
  const weeklyBrew = featuredProducts[0] ?? null;
  const favorites = featuredProducts.slice(1);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;

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
        <div className="mx-auto max-w-2xl px-4 pb-12">
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
        <div className="flex flex-col gap-6 pb-12">
          {announcement ? <CampaignBanner text={announcement} /> : null}

          <FavoritesRow products={favorites} onProductClick={setSelectedProduct} />

          {weeklyBrew ? (
            <WeeklyBrewCard product={weeklyBrew} onClick={() => setSelectedProduct(weeklyBrew)} />
          ) : null}

          <div className="flex flex-col gap-4">
            <CategoryPills
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />

            {selectedCategory ? (
              <CategorySection
                title={selectedCategory.name}
                products={selectedCategory.products}
                onProductClick={setSelectedProduct}
              />
            ) : null}
          </div>
        </div>
      )}

      {selectedProduct ? (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : null}
    </div>
  );
}
