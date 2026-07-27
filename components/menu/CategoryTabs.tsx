import type { Category } from "@/lib/types";

export function CategoryTabs({
  categories,
  activeCategoryId,
  onSelect,
  tabRefs,
}: {
  categories: Category[];
  activeCategoryId: string | null;
  onSelect: (id: string) => void;
  tabRefs: React.RefObject<Map<string, HTMLButtonElement>>;
}) {
  return (
    <nav className="sticky top-0 z-10 border-b border-gold/20 bg-cream/95 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              ref={(el) => {
                if (el) tabRefs.current.set(category.id, el);
              }}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-terra bg-terra text-cream"
                  : "border-gold/30 text-muted hover:border-gold"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
