/**
 * Single source of truth for "when did this content last meaningfully change".
 *
 * Both app/sitemap.ts and app/feed.xml/route.ts derive their dates from here,
 * so adding or refreshing an article is ONE edit instead of two that drift
 * apart (the RSS feed previously stamped every learn article with a fixed
 * placeholder date).
 *
 * Keys are paths after the locale segment. Dates are ISO YYYY-MM-DD.
 */
export const CONTENT_LAST_UPDATED: Record<string, string> = {
  "": "2026-09-29",
  "/coloring": "2026-09-29",
  "/resources": "2026-09-29",
  "/printables": "2026-09-29",
  "/games": "2026-09-29",
  "/games/count": "2026-09-29",
  // Science interactive lessons (expanded into full articles 2026-06-11)
  "/learn/states-of-matter": "2026-06-11",
  "/learn/water-cycle": "2026-06-11",
  "/learn/solar-system": "2026-06-11",
  "/learn/gravity": "2026-06-11",

  // Learning guides (readability + localization pass June 2026)
  "/learn/arabic-alphabet-guide": "2026-08-22",
  "/learn/teaching-arabic-to-kids": "2026-06-12",
  "/learn/teaching-arabic-non-speakers": "2026-08-22",
  "/learn/arabic-numbers": "2026-09-29",
  "/learn/arabic-colors": "2026-09-29",
  "/learn/first-arabic-words": "2026-09-29",
  "/learn/arabic-letter-forms": "2026-06-12",
  "/learn/arabic-vs-english": "2026-06-12",
  "/learn/best-age-to-learn-arabic": "2026-06-12",
  "/learn/bilingual-children-benefits": "2026-06-12",
  "/learn/arabic-activities-at-home": "2026-06-12",
  "/learn/arabic-keyboard-layout-for-kids": "2026-08-20",
  "/learn/hardest-arabic-letters": "2026-08-20",
  "/glossary": "2026-08-20",

  // Worksheet pack landing pages (per-pack PDF generation pass)
  ...Object.fromEntries([
    "arabic-alphabet-tracing",
    "arabic-alphabet-chart",
    "arabic-numbers-tracing",
    "arabic-numbers-11-20",
    "arabic-harakat",
    "arabic-colors",
    "arabic-animals-coloring",
    "arabic-fruits-vegetables-coloring",
    "arabic-transport-coloring",
    "arabic-solar-system-coloring",
    "arabic-alphabet-coloring",
    "arabic-ramadan-coloring",
    "arabic-sea-animals-coloring",
    "arabic-body-parts-coloring",
    "arabic-seasons-coloring",
    "arabic-opposites-coloring",
    "arabic-complete-workbook",
  ].map((id) => [`/printables/${id}`, "2026-09-05"])),

  // Original illustrated stories (stories launch, Sept 2026)
  "/stories": "2026-09-29",
  ...Object.fromEntries(
    [
      "al-arnab-al-saeed", "al-fanoos-al-sagheer", "rihla-ila-l-qamar",
      "al-huut-al-sagheer", "iidun-saeed", "al-ghuraabu-aldhakiy",
      "yawmun-maa-baba", "al-mataru-fi-l-madrasa", "al-fiilu-wal-faraasha",
      "suadu-wal-sahab", "nuura-wan-nujuum", "tuffaahatu-t-timsaah",
      "yawmun-maa-baba", "al-mataru-fi-l-madrasa", "al-fiilu-wal-faraasha",
    ].map(
      (slug) => [`/stories/${slug}`, "2026-09-05"],
    ),
  ),

  // The numeral sheets and collected workbook were regenerated with 0–9 digits.
  "/printables/arabic-numbers-tracing": "2026-09-29",
  "/printables/arabic-numbers-11-20": "2026-09-29",
  "/printables/arabic-complete-workbook": "2026-10-29",

  // Arabic Language Day (18 December) pack and guide
  "/printables/arabic-language-day": "2026-10-29",
  "/printables/arabic-letters-harakat": "2026-10-29",
  "/printables/arabic-tanween": "2026-10-29",
  "/printables/arabic-alphabet-flashcards": "2026-10-29",
  "/printables/arabic-4-line-copybook": "2026-10-29",
  "/printables/preschool": "2026-10-29",
  "/printables/kindergarten": "2026-10-29",
  "/printables/grade-1": "2026-10-29",
  // Fixed the spelling of بَطَّة (duck) on the fatha sheet
  "/printables/arabic-harakat": "2026-10-29",
  "/learn/arabic-language-day": "2026-10-29",

  // Per-letter worksheet pages (letter-by-letter launch, Aug 2026)
  ...Object.fromEntries(
    [
      "alef", "ba", "ta", "tha", "jeem", "hha", "kha", "dal", "thal", "ra",
      "zay", "seen", "sheen", "sad", "dad", "tah", "zah", "ain", "ghain", "fa",
      "qaf", "kaf", "lam", "meem", "noon", "ha", "waw", "ya",
    ].map((slug) => [`/printables/letters/${slug}`, "2026-08-22"]),
  ),
};

/** Date for a path, falling back to the given default when unlisted. */
export function lastUpdatedFor(path: string, fallback: string): string {
  return CONTENT_LAST_UPDATED[path] ?? fallback;
}
