import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";

export function Hero() {
  return (
    <section className="motif-bg flex flex-col items-center justify-center gap-6 bg-dark px-6 py-20 text-center text-cream">
      <Logo />
      <p className="max-w-xs font-serif text-xl italic text-cream/90">{tr.menu.slogan}</p>
    </section>
  );
}
