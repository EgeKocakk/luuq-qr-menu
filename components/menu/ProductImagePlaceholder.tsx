import Image from "next/image";

/** Görseli olmayan ürünler için markaya uyan nötr blok — kırık görsel ikonu yerine. */
export function ProductImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-cream-dark ${className}`} aria-hidden="true">
      <Image
        src="/luuq-logo.png"
        alt=""
        width={370}
        height={188}
        className="w-2/5 opacity-35"
      />
    </div>
  );
}
