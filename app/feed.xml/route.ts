import { blogPosts } from "@/lib/blog-data";
import { learnArticles } from "@/lib/related";
import { lastUpdatedFor } from "@/lib/contentDates";
import { stories } from "@/lib/stories";

export const dynamic = "force-static";

const LEARN_DATE_FALLBACK = "2026-06-12";

export async function GET() {
  const SITE_URL = "https://www.arabfingers.site";

  // Combine and sort all articles by date. Learn-article dates come from
  // lib/contentDates — the same source the sitemap uses — so refreshing an
  // article updates both with one edit.
  const allArticles = [
    ...blogPosts.map((post) => ({
      title: post.titleEn,
      description: post.descEn,
      url: `${SITE_URL}/en/blog/${post.slug}`,
      date: new Date(post.datePublished),
    })),
    ...learnArticles.map((article) => ({
      title: article.titleEn,
      description: article.descEn,
      url: `${SITE_URL}/en/learn/${article.slug}`,
      date: new Date(lastUpdatedFor(`/learn/${article.slug}`, LEARN_DATE_FALLBACK)),
    })),
    ...stories.map((story) => ({
      title: `${story.titleEn} — Arabic story for kids`,
      description: story.introEn,
      url: `${SITE_URL}/en/stories/${story.slug}`,
      date: new Date(lastUpdatedFor(`/stories/${story.slug}`, "2026-09-05")),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ArabFingers Blog &amp; Learning Guides</title>
    <link>${SITE_URL}</link>
    <description>Research-backed insights on teaching young children Arabic and comprehensive learning guides.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${allArticles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.url}</link>
      <guid isPermaLink="true">${article.url}</guid>
      <pubDate>${article.date.toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
