/**
 * Estimasi waktu baca berdasarkan jumlah kata
 * Rata-rata pembaca Bahasa Indonesia: ~200 kata/menit untuk bacaan fiksi
 */
export function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export function formatReadingTime(minutes) {
  if (minutes < 1) return '< 1 menit';
  if (minutes === 1) return '1 menit';
  return `${minutes} menit`;
}
