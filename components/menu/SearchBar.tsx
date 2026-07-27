import { tr } from "@/i18n/tr";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="px-6 py-4">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={tr.menu.searchPlaceholder}
        className="w-full rounded-lg border border-gold/20 bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/40 transition-colors focus:border-gold/50 focus:outline-none"
      />
    </div>
  );
}
