"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { SearchBar } from "./SearchBar";
import { CategoryTabs } from "./CategoryTabs";
import { FeaturedSection } from "./FeaturedSection";
import { CategorySection } from "./CategorySection";
import { ProductRow } from "./ProductRow";
import { ProductModal } from "./ProductModal";
import { EmptyState } from "@/components/EmptyState";

export function MenuExplorer({ categories }: { categories: CategoryWithProducts[] }) {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null,
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductWithOptions | null>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const featuredProducts = useMemo(
    () =>
      categories.flatMap((c) => c.products.filter((p) => p.is_active && p.is_featured)),
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

  // Kaydırırken en görünür kategoriyi tespit et (yapışkan sekme vurgusu için).
  useEffect(() => {
    if (isSearching) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-category-section]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute("data-category-id");
          if (id) setActiveCategoryId(id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isSearching]);

  // Aktif sekme değiştikçe sekme şeridinde görünür kalsın.
  useEffect(() => {
    if (!activeCategoryId) return;
    const tab = tabRefs.current.get(activeCategoryId);
    tab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCategoryId]);

  function handleTabSelect(id: string) {
    setActiveCategoryId(id);
    document.getElementById(`kategori-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex-1">
      <SearchBar value={query} onChange={setQuery} />

      {isSearching ? (
        <div className="mx-auto max-w-2xl px-6 pb-12">
          {searchResults.length === 0 ? (
            <EmptyState message={tr.menu.emptySearch} variant="dark" />
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
        <>
          <FeaturedSection products={featuredProducts} onSelect={setSelectedProduct} />

          <CategoryTabs
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={handleTabSelect}
            tabRefs={tabRefs}
          />

          <div className="mx-auto max-w-2xl px-6">
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                onProductClick={setSelectedProduct}
              />
            ))}
          </div>
        </>
      )}

      {selectedProduct ? (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      ) : null}
    </div>
  );
}
