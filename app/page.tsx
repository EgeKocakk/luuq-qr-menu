import { getMenuData } from "@/lib/queries";
import { tr } from "@/i18n/tr";
import { Header } from "@/components/menu/Header";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { Footer } from "@/components/menu/Footer";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";

export default async function Home() {
  let data;
  try {
    data = await getMenuData();
  } catch {
    return (
      <div className="flex flex-1 flex-col bg-cream">
        <Header />
        <ErrorState message={tr.menu.error} />
      </div>
    );
  }

  const { categories, settings } = data;
  const activeCategories = categories
    .filter((c) => c.is_active)
    .map((c) => ({ ...c, products: c.products.filter((p) => p.is_active) }))
    .filter((c) => c.products.length > 0);
  const hasAnyProduct = activeCategories.length > 0;

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="grain-bg flex flex-1 flex-col bg-cream">
        {hasAnyProduct ? (
          <MenuExplorer categories={activeCategories} announcement={settings?.announcement ?? null} />
        ) : (
          <EmptyState message={tr.menu.emptyMenu} />
        )}
      </main>

      <Footer />
    </div>
  );
}
