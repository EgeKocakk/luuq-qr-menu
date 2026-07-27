import { tr } from "@/i18n/tr";

export function Header() {
  return (
    <header className="flex flex-col gap-3 px-4 pb-2 pt-4">
      <div className="flex items-center justify-center">
        {/* Kaynak PNG altın renginde — koyu renge boyamak için görseli CSS mask
            olarak kullanıp arkasına düz koyu renk koyuyoruz. */}
        <span
          role="img"
          aria-label="LUUQ"
          className="h-[51px] w-[100px] bg-dark"
          style={{
            maskImage: "url(/luuq-logo-mark.png)",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: "url(/luuq-logo-mark.png)",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      </div>

      <div className="rounded-lg border border-gold/30 bg-white px-4 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-muted">
          {tr.menu.branch}
        </span>
      </div>
    </header>
  );
}
