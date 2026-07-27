import { createClient } from "./supabase/server";
import type { CategoryWithProducts, Settings } from "./types";

export type MenuData = {
  categories: CategoryWithProducts[];
  settings: Settings | null;
};

/**
 * Müşteri menüsü için kategori + ürün + opsiyon verisini tek seferde çeker.
 * RLS zaten sadece aktif kategori/ürünleri anonim kullanıcıya döndürür.
 */
export async function getMenuData(): Promise<MenuData> {
  const supabase = await createClient();

  const [{ data: categories, error: categoriesError }, { data: settings }] = await Promise.all([
    supabase
      .from("categories")
      .select(
        "*, products(*, product_option_groups(*, product_options(*)))",
      )
      .order("sort_order", { ascending: true })
      .order("sort_order", { referencedTable: "products", ascending: true })
      .order("sort_order", { referencedTable: "products.product_option_groups", ascending: true })
      .order("sort_order", {
        referencedTable: "products.product_option_groups.product_options",
        ascending: true,
      }),
    supabase.from("settings").select("*").single(),
  ]);

  if (categoriesError) throw categoriesError;

  return {
    categories: (categories ?? []) as CategoryWithProducts[],
    settings: (settings as Settings) ?? null,
  };
}
