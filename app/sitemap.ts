import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages: { ar: `${siteUrl}/ar` } } },
    { url: `${siteUrl}/ar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${siteUrl}/en` } } },
    { url: `${siteUrl}/en/play`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages: { ar: `${siteUrl}/ar/play` } } },
    { url: `${siteUrl}/en/learn/arabic-alphabet-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages: { ar: `${siteUrl}/ar/learn/arabic-alphabet-guide` } } },
    { url: `${siteUrl}/en/learn/teaching-arabic-to-kids`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages: { ar: `${siteUrl}/ar/learn/teaching-arabic-to-kids` } } },
    { url: `${siteUrl}/en/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7, alternates: { languages: { ar: `${siteUrl}/ar/about` } } },
    { url: `${siteUrl}/en/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6, alternates: { languages: { ar: `${siteUrl}/ar/contact` } } },
    { url: `${siteUrl}/en/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5, alternates: { languages: { ar: `${siteUrl}/ar/privacy` } } },
    { url: `${siteUrl}/en/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5, alternates: { languages: { ar: `${siteUrl}/ar/terms` } } },
  ];
}
