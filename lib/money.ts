/**
 * Para kuruş cinsinden integer saklanır (floating point ile para hesabı YASAK).
 * Gösterim için tek yardımcı fonksiyon buradan geçer.
 */
export function formatPrice(cents: number): string {
  if (cents <= 0) return "—";
  const lira = cents / 100;
  return `₺${lira.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function liraToCents(lira: number): number {
  return Math.round(lira * 100);
}
