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
  // Science interactive lessons (expanded into full articles 2026-06-11)
  "/learn/states-of-matter": "2026-06-11",
  "/learn/water-cycle": "2026-06-11",
  "/learn/solar-system": "2026-06-11",
  "/learn/gravity": "2026-06-11",

  // Learning guides (readability + localization pass June 2026)
  "/learn/arabic-alphabet-guide": "2026-08-22",
  "/learn/teaching-arabic-to-kids": "2026-06-12",
  "/learn/teaching-arabic-non-speakers": "2026-08-22",
  "/learn/arabic-numbers": "2026-06-12",
  "/learn/arabic-colors": "2026-08-22",
  "/learn/first-arabic-words": "2026-06-12",
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
    "arabic-complete-workbook",
  ].map((id) => [`/printables/${id}`, "2026-09-05"])),

  // Original illustrated stories (stories launch, Sept 2026)
  "/stories": "2026-09-05",
  ...Object.fromEntries(
    [
      "al-arnab-al-saeed", "al-fanoos-al-sagheer", "rihla-ila-l-qamar",
      "al-huut-al-sagheer", "iidun-saeed", "al-ghuraabu-aldhakiy",
    ].map(
      (slug) => [`/stories/${slug}`, "2026-09-05"],
    ),
  ),

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
