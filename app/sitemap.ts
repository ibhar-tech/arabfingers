import type { MetadataRoute } from "next";

// Always use www to match canonical domain — avoids redirect chains in Google's index
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site";
const siteUrl = rawUrl.replace("://arabfingers.site", "://www.arabfingers.site");

const locales = ["en", "ar"] as const;

function localizedUrls(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified: Date = new Date(),
) {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.filter((l) => l !== locale).map((l) => [l, `${siteUrl}/${l}${path}`]),
      ),
    },
  }));
}

const d = (s: string) => new Date(s);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },

    // Core pages
    ...localizedUrls("", 1),
    ...localizedUrls("/play", 0.9),
    ...localizedUrls("/learn", 0.9),
    ...localizedUrls("/coloring", 0.8),
    ...localizedUrls("/printables", 0.8),

    // Science interactive lessons
    ...localizedUrls("/learn/states-of-matter", 0.8, "monthly", d("2026-05-31")),
    ...localizedUrls("/learn/water-cycle", 0.8, "monthly", d("2026-05-31")),
    ...localizedUrls("/learn/solar-system", 0.8, "monthly", d("2026-05-31")),
    ...localizedUrls("/learn/gravity", 0.8, "monthly", d("2026-05-31")),

    // Blog (real last-updated dates)
    ...localizedUrls("/blog", 0.9, "weekly"),
    ...localizedUrls("/blog/how-we-built-arabfingers", 0.8, "monthly", d("2026-05-20")),
    ...localizedUrls("/blog/screen-time-guidelines-arabic-learning", 0.8, "monthly", d("2026-05-18")),
    ...localizedUrls("/blog/arabic-alphabet-vs-latin-deep-dive", 0.8, "monthly", d("2026-05-22")),
    ...localizedUrls("/blog/arabic-calligraphy-for-kids", 0.8, "monthly", d("2026-05-25")),
    ...localizedUrls("/blog/ramadan-activities-arabic-learning", 0.8, "monthly", d("2026-05-25")),

    // Learn articles (real last-updated dates)
    ...localizedUrls("/learn/arabic-alphabet-guide", 0.8, "monthly", d("2026-05-12")),
    ...localizedUrls("/learn/teaching-arabic-to-kids", 0.8, "monthly", d("2026-05-20")),
    ...localizedUrls("/learn/arabic-numbers", 0.8, "monthly", d("2026-05-08")),
    ...localizedUrls("/learn/arabic-colors", 0.8, "monthly", d("2026-04-30")),
    ...localizedUrls("/learn/first-arabic-words", 0.8, "monthly", d("2026-05-02")),
    ...localizedUrls("/learn/arabic-letter-forms", 0.8, "monthly", d("2026-05-15")),
    ...localizedUrls("/learn/arabic-vs-english", 0.8, "monthly", d("2026-05-18")),
    ...localizedUrls("/learn/best-age-to-learn-arabic", 0.8, "monthly", d("2026-05-22")),
    ...localizedUrls("/learn/bilingual-children-benefits", 0.8, "monthly", d("2026-05-24")),
    ...localizedUrls("/learn/arabic-activities-at-home", 0.8, "monthly", d("2026-05-26")),

    // Info pages
    ...localizedUrls("/about", 0.7),
    ...localizedUrls("/author", 0.6),
    ...localizedUrls("/resources", 0.7),
    ...localizedUrls("/contact", 0.5, "yearly"),
    ...localizedUrls("/privacy", 0.4, "yearly"),
    ...localizedUrls("/terms", 0.4, "yearly"),
  ];
}
