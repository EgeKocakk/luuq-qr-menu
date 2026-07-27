"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (!activeCategoryId) return;
    const tab = tabRefs.current.get(activeCategoryId);
    const container = containerRef.current;
    if (!tab || !container) return;

    setIndicator({
      left: tab.offsetLeft,
      width: tab.offsetWidth,
    });
  }, [activeCategoryId, tabRefs]);

  return (
    <nav className="sticky top-0 z-10 bg-cream/95 backdrop-blur">
      <div ref={containerRef} className="no-scrollbar relative flex gap-6 overflow-x-auto px-6 py-4">
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
              className={`shrink-0 whitespace-nowrap pb-2 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-terra" : "text-muted/70 hover:text-dark"
              }`}
            >
              {category.name}
            </button>
          );
        })}

        {indicator ? (
          <span
            className="absolute bottom-0 h-[2px] rounded-full bg-terra transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: indicator.left, width: indicator.width }}
          />
        ) : null}
        <span className="absolute bottom-0 left-0 h-px w-full bg-gold/10" />
      </div>
    </nav>
  );
}
