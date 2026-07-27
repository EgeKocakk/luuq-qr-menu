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
        className="w-full rounded-md border border-gold/30 bg-white/60 px-4 py-2.5 text-dark placeholder:text-muted focus:border-gold focus:outline-none"
      />
    </div>
  );
}
