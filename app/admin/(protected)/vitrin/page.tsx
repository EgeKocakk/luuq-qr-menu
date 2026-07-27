"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/money";
import { tr } from "@/i18n/tr";
import type { CategoryWithProducts, ProductWithOptions, Settings } from "@/lib/types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ErrorState } from "@/components/ErrorState";

type LoadState = "loading" | "ready" | "error";
type Tab = "featured" | "weekly";

const MAX_FEATURED = 8;

export default function AdminVitrinPage() {
  const [tab, setTab] = useState<Tab>("featured");
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [weeklyBrewId, setWeeklyBrewId] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [savingProductId, setSavingProductId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    const supabase = createClient();

    const [{ data: categoryData, error: categoryError }, { data: settingsData }] =
      await Promise.all([
        supabase
          .from("categories")
          .select("*, products(*, product_option_groups(*, product_options(*)))")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("sort_order", { referencedTable: "products", ascending: true }),
        supabase.from("settings").select("*").single(),
      ]);

    if (categoryError) {
      setLoadState("error");
      return;
    }

    setCategories((categoryData ?? []) as CategoryWithProducts[]);
    setWeeklyBrewId((settingsData as Settings | null)?.weekly_brew_product_id ?? null);
    setLoadState("ready");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount'ta sunucudan veri çekme
    load();
  }, [load]);

  const allProducts: ProductWithOptions[] = categories.flatMap((c) =>
    c.products.filter((p) => p.is_active),
  );
  const featuredCount = allProducts.filter((p) => p.is_featured).length;
  const weeklyBrewProduct = allProducts.find((p) => p.id === weeklyBrewId) ?? null;

  async function toggleFeatured(product: ProductWithOptions) {
    if (!product.is_featured && featuredCount >= MAX_FEATURED) return;

    setSavingProductId(product.id);
    const supabase = createClient();
    const nextValue = !product.is_featured;
    await supabase.from("products").update({ is_featured: nextValue }).eq("id", product.id);

    setCategories((cats) =>
      cats.map((c) => ({
        ...c,
        products: c.products.map((p) => (p.id === product.id ? { ...p, is_featured: nextValue } : p)),
      })),
    );
    setSavingProductId(null);
  }

  async function selectWeeklyBrew(product: ProductWithOptions) {
    setSavingProductId(product.id);
    const supabase = createClient();
    await supabase.from("settings").update({ weekly_brew_product_id: product.id }).eq("id", true);
    setWeeklyBrewId(product.id);
    setSavingProductId(null);
  }

  if (loadState === "loading") {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-cream-dark" />
        <div className="h-64 animate-pulse rounded-lg bg-cream-dark" />
      </div>
    );
  }

  if (loadState === "error") {
    return <ErrorState message={tr.admin.common.error} onRetry={load} />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title={tr.admin.vitrin.title} description={tr.admin.vitrin.description} />

      <div className="flex gap-2 border-b border-gold/20">
        <button
          onClick={() => setTab("featured")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "featured"
              ? "border-b-2 border-terra text-terra"
              : "text-muted hover:text-dark"
          }`}
        >
          {tr.admin.vitrin.tabFeatured}
        </button>
        <button
          onClick={() => setTab("weekly")}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "weekly" ? "border-b-2 border-terra text-terra" : "text-muted hover:text-dark"
          }`}
        >
          {tr.admin.vitrin.tabWeeklyBrew}
        </button>
      </div>

      {tab === "featured" ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">{tr.admin.vitrin.featuredHelp}</p>
            <span className="shrink-0 rounded-full bg-cream-dark px-3 py-1 text-xs font-semibold text-dark">
              {tr.admin.vitrin.featuredCount(featuredCount)}
            </span>
          </div>
          {featuredCount >= MAX_FEATURED ? (
            <p className="text-xs text-terra">{tr.admin.vitrin.featuredMaxReached}</p>
          ) : null}

          <div className="flex flex-col gap-2">
            {allProducts.map((product) => {
              const disabled = !product.is_featured && featuredCount >= MAX_FEATURED;
              return (
                <label
                  key={product.id}
                  className={`flex items-center gap-4 rounded-lg border border-gold/20 bg-white p-3 ${
                    disabled ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream-dark">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-dark">{product.name}</p>
                    <p className="text-xs text-muted">{formatPrice(product.base_price)}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={product.is_featured}
                    disabled={disabled || savingProductId === product.id}
                    onChange={() => toggleFeatured(product)}
                    className="h-5 w-5 accent-terra"
                  />
                </label>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">{tr.admin.vitrin.weeklyBrewHelp}</p>

          <div className="rounded-lg border border-gold/20 bg-white p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {tr.admin.vitrin.weeklyBrewCurrent}
            </p>
            {weeklyBrewProduct ? (
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream-dark">
                  {weeklyBrewProduct.image_url ? (
                    <Image
                      src={weeklyBrewProduct.image_url}
                      alt={weeklyBrewProduct.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="font-semibold text-dark">{weeklyBrewProduct.name}</p>
              </div>
            ) : (
              <p className="text-sm text-muted">{tr.admin.vitrin.weeklyBrewNone}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {allProducts.map((product) => {
              const isSelected = product.id === weeklyBrewId;
              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border border-gold/20 bg-white p-3"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream-dark">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-dark">{product.name}</p>
                    <p className="text-xs text-muted">{formatPrice(product.base_price)}</p>
                  </div>
                  <button
                    onClick={() => selectWeeklyBrew(product)}
                    disabled={isSelected || savingProductId === product.id}
                    className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-cream-dark text-muted"
                        : "bg-terra text-cream hover:bg-terra/90"
                    }`}
                  >
                    {isSelected ? tr.admin.vitrin.selected : tr.admin.vitrin.select}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
