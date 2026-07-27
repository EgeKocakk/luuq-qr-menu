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
        className="w-full rounded-lg border border-gold/20 bg-white px-4 py-3 text-dark shadow-[0_1px_3px_rgba(59,42,38,0.06)] placeholder:text-muted transition-colors focus:border-gold focus:outline-none"
      />
    </div>
  );
}
