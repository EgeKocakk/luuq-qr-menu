import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="motif-bg flex flex-col items-center justify-center gap-6 bg-dark px-6 py-24 text-center text-cream">
        <Logo />
        <p className="max-w-xs font-serif text-xl italic text-cream/90">
          Fas&apos;ın ruhu, Türkiye&apos;nin kalbinde.
        </p>
      </section>

      <section className="flex flex-1 items-center justify-center bg-cream px-6 py-24 text-center">
        <p className="text-muted">Menü içeriği yakında burada olacak.</p>
      </section>
    </div>
  );
}
