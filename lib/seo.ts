import type { Metadata } from "next";

const siteUrl = "https://www.arabfingers.site";

/**
 * Generates locale-aware metadata with proper canonical, hreflang alternates,
 * and Open Graph for any page. Every page should use this instead of static
 * `export const metadata` to ensure correct SEO signals.
 *
 * @param locale - "en" or "ar"
 * @param path - The path after locale, e.g. "/play", "/learn/arabic-alphabet-guide". Use "" for homepage.
 * @param options - Page-specific title, description, and optional overrides.
 */
export function generatePageMetadata(
  locale: string,
  path: string,
  options: {
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
    /** Override OG image path (relative to public). Defaults to /og-image.png */
    ogImage?: string;
    /** Additional keywords for this page */
    keywords?: string[];
    /** Article-specific: publication date */
    publishedTime?: string;
    /** Article-specific: modification date */
    modifiedTime?: string;
    /** Set to "article" for blog/learn pages */
    ogType?: "website" | "article";
  },
): Metadata {
  const isAr = locale === "ar";
  const canonicalPath = path ? `/${locale}${path}` : `/${locale}`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const title = isAr ? options.titleAr : options.titleEn;
  const description = isAr ? options.descriptionAr : options.descriptionEn;
  const ogImage = options.ogImage ?? "/og-image.png";

  return {
    title,
    description,
    ...(options.keywords && { keywords: options.keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteUrl}/en${path || ""}`,
        ar: `${siteUrl}/ar${path || ""}`,
        "x-default": `${siteUrl}/en${path || ""}`,
      },
    },
    openGraph: {
      type: options.ogType ?? "website",
      title,
      description,
      url: canonicalUrl,
      siteName: "Arab Fingers",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: [isAr ? "en_US" : "ar_SA"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: isAr ? "عرب فنجرز — لعبة الحروف العربية للأطفال" : "Arab Fingers — Arabic Learning for Kids",
        },
      ],
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
