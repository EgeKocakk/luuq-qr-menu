import { tr } from "@/i18n/tr";

export function Footer() {
  return (
    <footer className="bg-dark px-6 py-10 text-center text-sm text-cream/60">
      <p className="font-serif text-cream/80">{tr.footer.poweredBy}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-gold/80">{tr.footer.branch}</p>
    </footer>
  );
}
