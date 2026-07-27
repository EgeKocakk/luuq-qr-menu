import { tr } from "@/i18n/tr";

/**
 * Sadakat/damga kartı — bilinçli olarak dekoratif ve sabit veriyle.
 * QR menüde müşteri girişi olmadığı için gerçek bir üyelik/puan sistemi yok;
 * bu kart sadece tasarımın bir parçası olarak sabit değerlerle gösterilir.
 */
export function StampCard() {
  const stampCount = 5;
  const goal = 8;
  const reward = "1 Filtre Kahve";
  const remaining = Math.max(goal - stampCount, 0);
  const isReady = stampCount >= goal;

  return (
    <div className="relative mx-4 overflow-hidden rounded-lg border border-gold/30 bg-white p-4">
      <div className="pointer-events-none absolute -right-8 -top-6 h-[115px] w-[90px] rounded-t-[45px] border-[1.4px] border-gold opacity-15" />

      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[2px] text-muted">
          {tr.menu.stampCardLabel}
        </span>
        <span className="font-semibold tabular-nums text-dark">
          {stampCount} / {goal}
        </span>
      </div>

      <div className="mb-2 flex gap-1">
        {Array.from({ length: goal }, (_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full ${i < stampCount ? "bg-dark" : "bg-cream-dark"}`} />
        ))}
      </div>

      <p className="text-[12.5px] font-light leading-[18px] text-muted">
        {isReady ? tr.menu.stampCardReady(reward) : tr.menu.stampCardRemaining(remaining)}
      </p>
    </div>
  );
}
