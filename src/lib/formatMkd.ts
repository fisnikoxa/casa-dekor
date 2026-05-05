/** Format whole MKD amounts for displayed prices (spec §2 — English UI, MKD currency). */

const MKD_SUFFIX = "\u00a0MKD";

export function formatMkd(amount: number): string {
  const formatted = new Intl.NumberFormat("mk-MK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted + MKD_SUFFIX;
}
