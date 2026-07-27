import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";

export function Header() {
  return (
    <header className="flex items-center gap-2 bg-cream px-4 pb-2 pt-2">
      <Logo className="!h-9 !w-auto" />
      <div className="flex flex-col gap-0.5">
        <span className="font-serif text-[22px] leading-7 text-dark">LUUQ Coffee</span>
        <span className="text-xs leading-4 text-muted">{tr.menu.branch}</span>
      </div>
    </header>
  );
}
