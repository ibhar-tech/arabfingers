import { blogPosts } from "@/lib/blog-data";
import { learnArticles } from "@/lib/related";

export const dynamic = "force-static";

export async function GET() {
  const SITE_URL = "https://www.arabfingers.site";

  // Combine and sort all articles by date
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
      // Learn articles don't have explicit dates in related.ts, so we'll use a fixed date or today.
      // In a real app we'd fetch the actual date, but for now we'll set a static one to avoid spamming.
      date: new Date("2026-06-12"),
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
