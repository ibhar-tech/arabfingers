import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site";

const locales = ["en", "ar"] as const;

function localizedUrls(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.filter((l) => l !== locale).map((l) => [l, `${siteUrl}/${l}${path}`]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },

    // Core pages
    ...localizedUrls("", 1),
    ...localizedUrls("/play", 0.9),
    ...localizedUrls("/learn", 0.9),

    // Learn articles
    ...localizedUrls("/learn/arabic-alphabet-guide", 0.8),
    ...localizedUrls("/learn/teaching-arabic-to-kids", 0.8),
    ...localizedUrls("/learn/arabic-numbers", 0.8),
    ...localizedUrls("/learn/arabic-colors", 0.8),
    ...localizedUrls("/learn/first-arabic-words", 0.8),
    ...localizedUrls("/learn/arabic-letter-forms", 0.8),
    ...localizedUrls("/learn/arabic-vs-english", 0.8),
    ...localizedUrls("/learn/best-age-to-learn-arabic", 0.8),
    ...localizedUrls("/learn/bilingual-children-benefits", 0.8),
    ...localizedUrls("/learn/arabic-activities-at-home", 0.8),

    // Info pages
    ...localizedUrls("/about", 0.7),
    ...localizedUrls("/contact", 0.6, "yearly"),
    ...localizedUrls("/privacy", 0.5, "yearly"),
    ...localizedUrls("/terms", 0.5, "yearly"),
  ];
}
