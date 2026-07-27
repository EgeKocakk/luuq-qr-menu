import { getMenuData } from "@/lib/queries";
import { tr } from "@/i18n/tr";
import { Hero } from "@/components/menu/Hero";
import { AnnouncementBanner } from "@/components/menu/AnnouncementBanner";
import { CategorySection } from "@/components/menu/CategorySection";
import { Footer } from "@/components/menu/Footer";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";

export default async function Home() {
  let data;
  try {
    data = await getMenuData();
  } catch {
    return (
      <div className="flex flex-1 flex-col">
        <Hero />
        <ErrorState message={tr.menu.error} />
      </div>
    );
  }

  const { categories, settings } = data;
  const hasAnyProduct = categories.some((c) => c.products.some((p) => p.is_active));

  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      {settings?.announcement ? <AnnouncementBanner text={settings.announcement} /> : null}

      <main className="flex-1 bg-cream">
        {hasAnyProduct ? (
          <div className="mx-auto max-w-2xl px-6">
            {categories
              .filter((c) => c.is_active)
              .map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
          </div>
        ) : (
          <EmptyState message={tr.menu.emptyMenu} />
        )}
      </main>

      <Footer />
    </div>
  );
}
