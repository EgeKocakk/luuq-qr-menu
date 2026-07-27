import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";

export function Header() {
  return (
    <header className="flex items-center gap-3 bg-cream px-6 py-4">
      <Logo className="!w-10" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        {tr.menu.branch}
      </span>
    </header>
  );
}
