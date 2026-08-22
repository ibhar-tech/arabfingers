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
  "/learn/arabic-alphabet-guide": "2026-06-11",
  "/learn/teaching-arabic-to-kids": "2026-06-12",
  "/learn/arabic-numbers": "2026-06-12",
  "/learn/arabic-colors": "2026-06-12",
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
    "arabic-colors",
    "arabic-animals-coloring",
    "arabic-complete-workbook",
  ].map((id) => [`/printables/${id}`, "2026-08-20"])),
};

/** Date for a path, falling back to the given default when unlisted. */
export function lastUpdatedFor(path: string, fallback: string): string {
  return CONTENT_LAST_UPDATED[path] ?? fallback;
}
