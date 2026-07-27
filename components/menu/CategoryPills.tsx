import type { Category } from "@/lib/types";

export function CategoryPills({
  categories,
  selectedCategoryId,
  onSelect,
}: {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="no-scrollbar flex snap-x snap-proximity gap-2 overflow-x-auto px-4 pb-1">
      {categories.map((category) => {
        const isActive = category.id === selectedCategoryId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-[0.97] ${
              isActive
                ? "border-terra bg-terra text-cream"
                : "border-gold/30 bg-white text-muted"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
