import { tr } from "@/i18n/tr";

export function Footer() {
  return (
    <footer className="bg-dark px-6 py-10 text-center text-sm text-cream/60">
      <p className="font-serif text-cream/80">{tr.footer.poweredBy}</p>
    </footer>
  );
}
