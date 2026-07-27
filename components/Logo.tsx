/**
 * Geçici tipografik logo. Gerçek LUUQ logosu (yüksek çözünürlüklü PNG/SVG)
 * teslim edildiğinde bu bileşenin yerini bir <Image> alacak.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="font-serif text-4xl tracking-[0.15em] text-gold">LUUQ</span>
      <span className="flex items-center gap-2 text-[0.65rem] tracking-[0.35em] text-gold-light">
        <span className="h-px w-6 bg-gold-light" />
        COFFEE ROASTERY
        <span className="h-px w-6 bg-gold-light" />
      </span>
    </div>
  );
}
