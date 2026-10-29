import { blogPosts } from "@/lib/blog-data";
import { learnArticles } from "@/lib/related";
import { letterGuide } from "@/lib/letterGuide";
import { letterDotsOf, letterWorksheetPages } from "@/lib/letterWorksheets";
import { stories } from "@/lib/stories";
import { totalWorksheetPages, worksheetSets } from "@/lib/worksheets";

/* /llms.txt — the site map written for language models and AI agents
   (https://llmstxt.org). It used to be a hand-kept file in public/ that had
   drifted: it listed none of the worksheet packs or letter pages, which earn
   most of the site's search clicks. Generating it from the same data modules
   the sitemap reads keeps the two from disagreeing again. */

export const dynamic = "force-static";

const SITE = "https://www.arabfingers.site";

export function GET() {
  const packs = worksheetSets.map(
    (s) =>
      `- [${s.titleEn}](${SITE}/en/printables/${s.id}): ${s.pages} page${s.pages === 1 ? "" : "s"}, ${s.ageEn}. Direct PDF: ${SITE}/printables/${s.id}.pdf`,
  );

  const letters = letterWorksheetPages.map((p) => {
    const e = letterGuide[p.index];
    return `- ${p.index + 1}. ${e.enName} (${e.ar}, ${e.arName}, "${e.translit}"): ${letterDotsOf(e).en} Worksheet: ${SITE}/en/printables/letters/${p.slug} · PDF: ${SITE}/printables/letters/${p.slug}.pdf`;
  });

  const tales = stories.filter((s) => s.letter);
  const storyLine = (s: (typeof stories)[number]) =>
    `- [${s.titleEn}](${SITE}/en/stories/${s.slug})${s.letter ? ` (letter ${s.letter})` : ""}: ${s.agesEn}. PDF: ${SITE}/stories/${s.slug}.pdf`;

  const body = `# Arab Fingers

> Arab Fingers (عرب فنجرز) is a free bilingual (English/Arabic) website that helps
> families and teachers teach the Arabic alphabet to children aged 1–6: ${totalWorksheetPages} pages of
> printable Arabic worksheets (PDF), letter games with recorded pronunciation,
> original illustrated stories, and guides for parents — including parents who do
> not speak Arabic themselves.

Key facts:
- Everything is free. No account, no email, no watermark; every PDF downloads directly.
- Languages: English (/en) and Arabic (/ar). Base URL: ${SITE}
- Advertising appears on parent-facing reading pages only, never on the games a child plays.
- Maintained by Aissa Trad. Contact: ibhartech39@gmail.com

## Printable worksheets (PDF)
- [All worksheets](${SITE}/en/printables): every pack below, browsable by age
${packs.join("\n")}

## The 28 Arabic letters — one worksheet page and PDF per letter
${letters.join("\n")}

## Games (free, in the browser, no install)
- [Letter game](${SITE}/en/play): press any key or tap the screen to see and hear an Arabic letter
- [Trace the letters](${SITE}/en/games/trace): follow the dotted shape with a finger and earn a star
- [Tap the letter](${SITE}/en/games/tap): hear a letter and tap the shape that matches
- [Colour the letters](${SITE}/en/coloring): paint each letter with colours and stickers
- [All games](${SITE}/en/games)

## Original illustrated stories (bilingual, free PDF per story)
- [All stories](${SITE}/en/stories)
${stories.filter((s) => !s.letter).map(storyLine).join("\n")}

## Letter Tales — one story per letter
${tales.map(storyLine).join("\n")}

## Guides for parents
${learnArticles.map((a) => `- [${a.titleEn}](${SITE}/en/learn/${a.slug}): ${a.descEn}`).join("\n")}
- [The States of Matter for kids (interactive)](${SITE}/en/learn/states-of-matter)
- [The Water Cycle for kids (interactive)](${SITE}/en/learn/water-cycle)
- [The Solar System for kids (interactive)](${SITE}/en/learn/solar-system)
- [How Gravity Works for kids (interactive)](${SITE}/en/learn/gravity)
- [English–Arabic glossary](${SITE}/en/glossary)

## Blog
${blogPosts.map((p) => `- [${p.titleEn}](${SITE}/en/blog/${p.slug})`).join("\n")}

## Optional
- [About the project](${SITE}/en/about)
- [Author](${SITE}/en/author)
- [Privacy](${SITE}/en/privacy)
- [Sitemap](${SITE}/sitemap.xml)
- [RSS feed](${SITE}/feed.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
