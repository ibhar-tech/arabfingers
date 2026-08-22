import type { MetadataRoute } from "next";
import { worksheetSets } from "@/lib/worksheets";
import { lastUpdatedFor } from "@/lib/contentDates";
import { learnArticles } from "@/lib/related";
import { blogPosts } from "@/lib/blog-data";

// Always use www to match canonical domain — avoids redirect chains in Google's index
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site";
const siteUrl = rawUrl.replace("://arabfingers.site", "://www.arabfingers.site");

const locales = ["en", "ar"] as const;

// Fallback for pages whose freshness is the site's, not an article's.
const DEFAULT_LASTMOD = "2026-07-07";

const d = (s: string) => new Date(s);

function localizedUrls(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
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
    lastModified: d(lastUpdatedFor(path, DEFAULT_LASTMOD)),
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
    ...localizedUrls("/games", 0.9),
    ...localizedUrls("/games/trace", 0.8),
    ...localizedUrls("/games/tap", 0.8),
    ...localizedUrls("/play", 0.9),
    ...localizedUrls("/learn", 0.9),
    ...localizedUrls("/coloring", 0.8),
    ...localizedUrls("/printables", 0.9),
    // One landing page per pack — these are the highest-intent pages on the site,
    // so they get the top priority the hub used to hold alone. Dates come from
    // lib/contentDates via localizedUrls.
    ...worksheetSets.flatMap((s) => localizedUrls(`/printables/${s.id}`, 0.9)),

    // Science interactive lessons (expanded into full articles 2026-06-11)
    ...localizedUrls("/learn/states-of-matter", 0.8),
    ...localizedUrls("/learn/water-cycle", 0.8),
    ...localizedUrls("/learn/solar-system", 0.8),
    ...localizedUrls("/learn/gravity", 0.8),

    // Bilingual glossary (linked from the footer; was missing from the map)
    ...localizedUrls("/glossary", 0.6),

    // Blog (real last-updated dates live in lib/blog-data.ts)
    ...localizedUrls("/blog", 0.9, "weekly"),
    ...blogUrls(),

    // Learn articles (dates from lib/contentDates)
    ...learnUrls(),

    // The worksheet PDFs themselves. Google indexes PDFs, and the query that
    // already earns most of this site's clicks is literally "...pdf free
    // download" — so the files deserve to be findable directly, not only via
    // the page that links them.
    ...worksheetSets.map((s) => ({
      url: `${siteUrl}/printables/${s.id}.pdf`,
      lastModified: d(lastUpdatedFor(`/printables/${s.id}`, DEFAULT_LASTMOD)),
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

/** Blog article URLs with their real modification dates from blog-data. */
function blogUrls(): MetadataRoute.Sitemap {
  return blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: d(post.dateModified || post.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}/blog/${post.slug}`])),
          "x-default": `${siteUrl}/en/blog/${post.slug}`,
        },
      },
    })),
  );
}

/** Learning-guide URLs; dates come from lib/contentDates (single source). */
function learnUrls(): MetadataRoute.Sitemap {
  return learnArticles.flatMap((article) => {
    const path = `/learn/${article.slug}`;
    return localizedUrls(path, 0.8);
  });
}
