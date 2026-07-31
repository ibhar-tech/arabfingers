import type { MetadataRoute } from "next";
import { worksheetSets } from "@/lib/worksheets";

// Always use www to match canonical domain — avoids redirect chains in Google's index
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site";
const siteUrl = rawUrl.replace("://arabfingers.site", "://www.arabfingers.site");

const locales = ["en", "ar"] as const;

const d = (s: string) => new Date(s);
const defaultDate = d("2026-07-07");

function localizedUrls(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified: Date = defaultDate,
) {
  // hreflang must be reciprocal AND self-referencing — a set that omits the
  // page's own language is invalid and Google drops the whole cluster. x-default
  // points at English, which is what the non-Arabic majority of visitors want.
  const languages = {
    ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
    "x-default": `${siteUrl}/en${path}`,
  };

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // The bare root is deliberately absent: it 308s to /en, and listing a
    // redirecting URL is what produced "Page with redirect" in Search Console.

    // Core pages
    ...localizedUrls("", 1),
    ...localizedUrls("/play", 0.9),
    ...localizedUrls("/learn", 0.9),
    ...localizedUrls("/coloring", 0.8),
    ...localizedUrls("/printables", 0.8),

    // Science interactive lessons (expanded into full articles 2026-06-11)
    ...localizedUrls("/learn/states-of-matter", 0.8, "monthly", d("2026-06-11")),
    ...localizedUrls("/learn/water-cycle", 0.8, "monthly", d("2026-06-11")),
    ...localizedUrls("/learn/solar-system", 0.8, "monthly", d("2026-06-11")),
    ...localizedUrls("/learn/gravity", 0.8, "monthly", d("2026-06-11")),

    // Blog (real last-updated dates — localization & readability pass 2026-06-12)
    ...localizedUrls("/blog", 0.9, "weekly"),
    ...localizedUrls("/blog/how-we-built-arabfingers", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/blog/screen-time-guidelines-arabic-learning", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/blog/arabic-alphabet-vs-latin-deep-dive", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/blog/arabic-calligraphy-for-kids", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/blog/ramadan-activities-arabic-learning", 0.8, "monthly", d("2026-06-12")),

    // Learn articles (real last-updated dates — content deepening pass June 2026)
    ...localizedUrls("/learn/arabic-alphabet-guide", 0.8, "monthly", d("2026-06-11")),
    ...localizedUrls("/learn/teaching-arabic-to-kids", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/arabic-numbers", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/arabic-colors", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/first-arabic-words", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/arabic-letter-forms", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/arabic-vs-english", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/best-age-to-learn-arabic", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/bilingual-children-benefits", 0.8, "monthly", d("2026-06-12")),
    ...localizedUrls("/learn/arabic-activities-at-home", 0.8, "monthly", d("2026-06-12")),

    // The worksheet PDFs themselves. Google indexes PDFs, and the query that
    // already earns most of this site's clicks is literally "...pdf free
    // download" — so the files deserve to be findable directly, not only via
    // the page that links them.
    ...worksheetSets.map((s) => ({
      url: `${siteUrl}/printables/${s.id}.pdf`,
      lastModified: d("2026-07-31"),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),

    // Info pages
    ...localizedUrls("/about", 0.7),
    ...localizedUrls("/author", 0.6),
    ...localizedUrls("/resources", 0.7),
    ...localizedUrls("/contact", 0.5, "yearly"),
    ...localizedUrls("/privacy", 0.4, "yearly"),
    ...localizedUrls("/terms", 0.4, "yearly"),
  ];
}
