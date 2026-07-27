import { getMenuData } from "@/lib/queries";
import { tr } from "@/i18n/tr";
import { Hero } from "@/components/menu/Hero";
import { AnnouncementBanner } from "@/components/menu/AnnouncementBanner";
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
      <div className="flex flex-1 flex-col bg-dark">
        <Hero />
        <ErrorState message={tr.menu.error} variant="dark" />
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
      <Hero />
      {settings?.announcement ? <AnnouncementBanner text={settings.announcement} /> : null}

      <main className="grain-bg flex flex-1 flex-col bg-dark">
        {hasAnyProduct ? (
          <MenuExplorer categories={activeCategories} />
        ) : (
          <EmptyState message={tr.menu.emptyMenu} variant="dark" />
        )}
      </main>

      <Footer />
    </div>
  );
}
