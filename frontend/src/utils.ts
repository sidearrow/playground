export function getDateString(s: string) {
  const input = new Date(s).getTime();
  const now = new Date().getTime();
  const diff = now - input;
  if (isNaN(diff)) {
    return "-";
  }
  const m = Math.round(diff / (1000 * 60));
  if (m < 60) {
    return `${m} 分前`;
  }
  const h = Math.round(diff / (1000 * 60 * 60));
  if (h < 24) {
    return `${h} 時間前`;
  }
  const d = Math.round(diff / (1000 * 60 * 60 * 24));
  return `${d} 日前`;
}
