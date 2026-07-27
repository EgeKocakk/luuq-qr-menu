import Image from "next/image";
import { Logo } from "@/components/Logo";
import { tr } from "@/i18n/tr";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 overflow-hidden px-6 py-24 text-center text-cream">
      <Image
        src="/hero-cafe.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-dark/75" />
      <div className="motif-bg absolute inset-0" />

      <div className="relative flex flex-col items-center gap-6">
        <Logo />
        <p className="max-w-xs font-serif text-xl italic text-cream/90">{tr.menu.slogan}</p>
      </div>
    </section>
  );
}
