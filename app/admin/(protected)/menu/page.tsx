"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/money";
import { tr } from "@/i18n/tr";
import type { Category, CategoryWithProducts, ProductWithOptions } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";

type LoadState = "loading" | "ready" | "error";

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  );
}

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categoryModal, setCategoryModal] = useState<{ category: Category | null } | null>(null);
  const [productModal, setProductModal] = useState<{ product: ProductWithOptions | null } | null>(
    null,
  );

  const load = useCallback(async () => {
    setLoadState("loading");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*, products(*, product_option_groups(*, product_options(*)))")
      .order("sort_order", { ascending: true })
      .order("sort_order", { referencedTable: "products", ascending: true });

    if (error) {
      setLoadState("error");
      return;
    }

    const list = (data ?? []) as CategoryWithProducts[];
    setCategories(list);
    setSelectedCategoryId((current) => current ?? list[0]?.id ?? null);
    setLoadState("ready");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount'ta sunucudan veri çekme
    load();
  }, [load]);

  async function removeCategory(category: Category) {
    if (!window.confirm(tr.admin.common.deleteConfirm)) return;
    const supabase = createClient();
    await supabase.from("categories").delete().eq("id", category.id);
    load();
  }

  async function removeProduct(product: ProductWithOptions) {
    if (!window.confirm(tr.admin.common.deleteConfirm)) return;
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", product.id);
    load();
  }

  if (loadState === "loading") {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-cream-dark" />
        <div className="h-12 animate-pulse rounded-lg bg-cream-dark" />
        <div className="h-64 animate-pulse rounded-lg bg-cream-dark" />
      </div>
    );
  }

  if (loadState === "error") {
    return <ErrorState message={tr.admin.common.error} onRetry={load} />;
  }

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title={tr.admin.menu.title} />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-dark">{tr.admin.menu.categoriesTitle}</h2>
          <button
            onClick={() => setCategoryModal({ category: null })}
            className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90"
          >
            {tr.admin.menu.addCategory}
          </button>
        </div>

        {categories.length === 0 ? (
          <EmptyState message={tr.admin.menu.categoryEmpty} />
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedCategoryId === category.id
                    ? "border-terra bg-terra text-cream"
                    : "border-gold/20 bg-white text-dark hover:border-gold/40"
                }`}
              >
                <button onClick={() => setSelectedCategoryId(category.id)} className="font-semibold">
                  {category.name}
                  {!category.is_active ? ` (${tr.admin.menu.passive})` : ""}
                </button>
                <button
                  onClick={() => setCategoryModal({ category })}
                  className={selectedCategoryId === category.id ? "text-cream/80" : "text-muted"}
                  aria-label={tr.admin.common.edit}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => removeCategory(category)}
                  className={selectedCategoryId === category.id ? "text-cream/80" : "text-red-600"}
                  aria-label={tr.admin.common.delete}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedCategory ? (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-dark">{selectedCategory.name}</h2>
            <button
              onClick={() => setProductModal({ product: null })}
              className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90"
            >
              {tr.admin.menu.addProduct}
            </button>
          </div>

          {selectedCategory.products.length === 0 ? (
            <EmptyState message={tr.admin.menu.productsEmpty} />
          ) : (
            <div className="flex flex-col gap-2">
              {selectedCategory.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border border-gold/20 bg-white p-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream-dark">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-center text-[10px] text-muted">
                        {tr.admin.menu.noImage}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-dark">{product.name}</p>
                    <p className="text-sm text-muted">
                      {formatPrice(product.base_price)}
                      {product.product_option_groups.length > 0
                        ? ` · ${product.product_option_groups.length} opsiyon grubu`
                        : ""}
                      {product.is_featured ? ` · ${tr.admin.menu.featured}` : ""}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-muted/20 text-muted"
                    }`}
                  >
                    {product.is_active ? tr.admin.menu.active : tr.admin.menu.passive}
                  </span>

                  <button
                    onClick={() => setProductModal({ product })}
                    aria-label={tr.admin.common.edit}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-terra transition-colors hover:bg-terra/10"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => removeProduct(product)}
                    aria-label={tr.admin.common.delete}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {categoryModal ? (
        <CategoryFormModal
          category={categoryModal.category}
          nextSortOrder={categories.length}
          onClose={() => setCategoryModal(null)}
          onSaved={() => {
            setCategoryModal(null);
            load();
          }}
        />
      ) : null}

      {productModal && selectedCategory ? (
        <ProductFormModal
          product={productModal.product}
          categories={categories}
          defaultCategoryId={selectedCategory.id}
          nextSortOrder={selectedCategory.products.length}
          onClose={() => setProductModal(null)}
          onSaved={() => {
            setProductModal(null);
            load();
          }}
        />
      ) : null}
    </div>
  );
}
