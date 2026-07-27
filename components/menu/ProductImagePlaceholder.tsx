/** Görseli olmayan ürünler için markaya uyan nötr blok — kırık görsel ikonu yerine. */
export function ProductImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-cream-dark ${className}`}
      aria-hidden="true"
    >
      <span className="font-serif text-lg tracking-widest text-gold/50">L</span>
    </div>
  );
}
