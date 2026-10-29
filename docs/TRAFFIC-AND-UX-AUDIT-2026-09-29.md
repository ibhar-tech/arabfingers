# Arab Fingers: traffic, discovery and UX audit

Date: 29 September 2026. Status: implementation deployed and verified on 29 September 2026 at 19:40:37 UTC. See [the release record](RELEASE-2026-09-29.md). Both Web and Generative AI workbooks have been analysed. Web clicks grew 155.0% and AI impressions 198.8% over matching 28-day periods. Page/query comparisons and indexing checks remain outstanding. See [the Web analysis](GSC-ANALYSIS-2026-09-29.md) and [AI analysis](GSC-AI-ANALYSIS-2026-09-29.md).

## What the evidence supports

**Update after receiving the 29 September export:** clicks grew from 1,141 to 2,910 across matching 28-day periods (+155.0%). The export covers 27 April–27 September, despite its “Last 16 months” filter. `/en/printables` contributes 85.2% of exported page clicks. This confirms that preserving and improving the printable learning path should take priority. These exports predate the release, so none of their growth can be attributed to the redesign. A separate AI workbook was subsequently supplied: AI impressions grew from 2,343 to 7,001 over those same periods, and the printable hub holds 72.4% of exported AI page impressions. Full calculations and limitations are in the [Web analysis](GSC-ANALYSIS-2026-09-29.md) and [AI analysis](GSC-AI-ANALYSIS-2026-09-29.md).

The supplied Search Console screenshot shows **121 clicks, 1.03K impressions and 11.7% CTR over 24 hours**, with a 5.5-hour reporting delay. It does not establish whether traffic has fallen or identify which pages need improvement. The average-position value is partly obscured. Do not compare this partial day with complete days.

The computer-use inventory was checked twice and returned no apps or browsers. The existing Firefox login was therefore unavailable. An isolated browser successfully inspected the public site; it did not access the private GSC property. The June export and older strategy document in this repository are historical, not evidence of September performance.

Public browser checks confirmed:

- `/robots.txt` returns 200, allows crawling, and links the canonical sitemap.
- `/sitemap.xml` returns 200 and contains 249 unique URLs before this change.
- `/ar` and `/en/printables` return 200, have matching www HTTPS canonical URLs, and did not contain `noindex` in the sampled HTML.
- `/printables/arabic-complete-workbook.pdf` returns 200 with PDF content type.

These are sample checks, not proof that Google indexed every URL or that Cloudflare never challenges a crawler. URL Inspection and the Page indexing report remain necessary. A separate terminal HTTP client returned 403; the real browser requests succeeded. This discrepancy alone cannot establish that Googlebot is blocked.

## Confirmed issues and changes

| Issue | Evidence | Local change |
| --- | --- | --- |
| Stale worksheet counts | Homepage advertised 53 pages; printable metadata advertised 68; current non-bundle catalogue totals 143 | Calculate homepage and printable metadata counts from the catalogue |
| Content difficult to discover | Homepage had long feature and marketing sections before many actual resources; no cross-content search | Shorter homepage with an activity library, Arabic/English search, age filters, activity filters and clear resource cards |
| Weak return path | No shared saved-resource library | Browser-local bookmarks with clear storage limitations; bookmarks survive navigating between homepage and worksheets |
| Worksheets on phones lose previews | Old library hid preview images below the small breakpoint | Show real worksheet previews on mobile as well as desktop; retain direct PDF downloads and all 17 initial worksheet links |
| Navigation accessibility | No active-page state; phone language switch required opening a menu; large homepage letter used a clickable div | Active links, visible language switch, keyboard buttons, skip link, Escape handling and visible focus styles |
| Ads shift content | ReadingAds moved containers into different positions after page load; requested multiple formats | One labelled 300×250 slot at the end of reading pages with reserved space and near-viewport loading; no ad slot on the four interactive science lessons |
| Low-contrast learning content | Alphabet widget used white labels on a light page; letter explanations used pale success/error colours; footer and worksheet labels were too faint | Correct the alphabet widget and guide colours, shared breadcrumbs/byline/footer, and worksheet labels |
| Narrow game offering | Existing activities focus on letters | `/en/games/count` and `/ar/games/count`: counting 1–10, two ranges, repeatable practice, number audio, visual counting and worksheet follow-up |
| New activity needs discovery | New route otherwise would be isolated | Links from homepage, games hub and footer; bilingual canonical/hreflang metadata and sitemap entries |

The ad change deliberately reduces placements, so revenue per page could fall. The slot remains on parent reading routes. Actual ad fill and revenue require checking after deployment; they are not demonstrated by local layout checks.

## The new AI report: what to measure

Google's [Generative AI report documentation](https://support.google.com/webmasters/answer/16984139?hl=en) describes impressions for AI Overviews and AI Mode, with page, country and device breakdowns. These impressions are also included in overall Web reporting. Do not add the AI total to the Web total or interpret AI impressions as clicks. The [launch announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) records worldwide rollout by 31 August 2026.

Check **Settings → Search generative AI** for this domain and any relevant URL-prefix properties. Inclusion is the default, but child properties can inherit or override a parent. We have not inspected this property's setting and have not changed it. See [Google's control documentation](https://support.google.com/webmasters/answer/16908024?hl=en).

Google recorded an AI Search logging problem for 13–17 August, but its 21 August update says the missing data was restored. Do not explain a current decline with that resolved incident without further evidence. See [Search Console data anomalies](https://support.google.com/webmasters/answer/6211453?hl=en).

Google says indexed, snippet-eligible pages and normal SEO fundamentals remain the basis for AI visibility: useful text, internal links, accessible media and accurate structured data. There is no special AI schema or required AI text file. See [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) and [Google’s 2026 AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Prioritise useful, original learning resources rather than generating large quantities of near-identical pages.

The older SEO plan recommends FAQ markup as a rich-result opportunity. That is outdated: Google's [documentation updates](https://developers.google.com/search/updates) record FAQ rich-result retirement in May 2026. Keep helpful visible questions and answers, but do not promise FAQ search enhancements.

### Reports needed to complete the diagnosis

1. Standard Web Performance export: **received and analysed**. The daily chart supplies the overall 28-day comparison.
2. Page and query tables comparing 31 August–27 September with 3–30 August. The supplied workbook only has whole-period page/query totals. No prior-year data is present.
3. Generative AI export: **received and analysed**, including matching date windows and page/country/device totals. No AI click or CTR fields are provided.
4. Page indexing exclusion reasons and sample affected URLs; sitemap status; Core Web Vitals groups; any manual-action or security notifications.

Then rank opportunities by actual evidence: pages losing clicks, high-impression queries at positions 4–20, low CTR relative to similarly positioned pages, mobile-only problems, and useful pages absent from AI visibility. Compare like-for-like locale and country segments. Do not derive a global CTR target from unrelated sites.

## Competitive research and product decisions

These are observed product patterns, not a verified traffic league table. Public pages do not establish monthly visits or growth rates. No paid competitive-traffic data was available.

| Reference | Observed pattern | Application to Arab Fingers |
| --- | --- | --- |
| [Math is Fun](https://www.mathsisfun.com/) and its [kindergarten worksheets](https://www.mathsisfun.com/worksheets/kindergarten.html) | Topic indexes connect explanations, interactives and printable practice | New counting game connects directly to the existing number guide and worksheets |
| [Korkortoon Arabic learning colouring books](https://korkortoon.com/ar/free-printables-ar/coloring-books/arabic-learning-coloring-books/) | Themed collections and two learning levels, including animals, numbers, seasons and space | Surface existing themed packs instead of creating duplicate content; retain preview-first resource browsing |
| [Flash Toons PDF stories](https://stories.flash-toons.com/قصص-اطفال-pdf/) | Clearly named story collections with explicit PDF intent | Promote the 12 existing original stories through the shared finder and a reading step after play |
| [Topmarks](https://www.topmarks.co.uk/) | Prominent resource search and subject/age browsing | Search and age/type filters on the homepage; clearer routes to science activities |
| [Education.com worksheets](https://www.education.com/resources/worksheets/) | Filtered resource listings with previews and grade/subject information | Real worksheet previews, ages, page counts and direct downloads in the redesigned library |
| [Wordwall](https://wordwall.net/) | Reusable learning material across interactive and printable formats | Connect game → explanation → printable; prioritise shared content before adding a large activity-builder system |
| [Belaraby Apps](https://www.belarabyapps.com/) | Arabic-first story/worksheet collections and recurring featured content | Arabic labels and RTL treatment throughout; curated paths using existing materials |

ABCya and Twinkl were also investigated, but the accessible responses were insufficient for a detailed product comparison; no feature or traffic claims are based on them.

## Next features, in priority order

The following research-based ideas predate analysis of the supplied workbook. The [revised priorities](GSC-ANALYSIS-2026-09-29.md#revised-implementation-priorities) favour printable learning paths and existing near-page-one pages; validate story indexing before expanding story or science content.

1. **Letter learning journeys:** for each existing letter page, link pronunciation, tracing, the matching story where one exists, and its printable. Measure progression and PDF use before expanding the content library.
2. **Printable practice builder:** allow a parent to select letters or numbers and generate a compact practice set. Keep generated personal sheets out of the index; publish useful curated landing pages separately. This is a next phase, not implemented here.
3. **Story comprehension:** add a few carefully edited questions and vocabulary cards to existing stories. Have Arabic grammar, diacritics and pronunciation reviewed before publishing new reading material.
4. **Themed activity collections:** animals, space, colours and seasonal learning. Combine existing resources with a short, original parent guide and a clear age range. Avoid thin doorway pages differing only by keyword.
5. **Privacy-conscious outcome measurement:** decide whether to add aggregate events for PDF downloads, activity starts/completions and next-resource navigation. No new analytics collection was introduced in this change.

## Measurement after deployment

Record the deployment date and annotate it in the analysis workbook. First check downloads, indexing signals, mobile layout, audio, ad fill and console errors. Then compare matching 28-day periods by landing page, country and device. Track organic clicks separately from AI impressions and learning outcomes. Improvements in traffic cannot be guaranteed by a redesign alone.

## Initial local validation before the later production release

- `npx next build`: passed; 201 static pages generated, including both new counting routes. Cloudflare deployment was not run.
- `npm run typecheck`, `npm run lint`, `npm run knip`, `git diff --check`: passed. Knip prints two existing configuration hints but no unused code errors.
- `npm test`: all 53 unit tests passed.
- `npm run test:e2e`: all 66 tests passed in Chromium and WebKit after the final changes. Covers existing routes and tracing plus Arabic search, age filtering, saved-resource persistence, both counting ranges, retries, mobile menu keyboard behaviour, and mobile homepage accessibility/overflow.
- The final automated accessibility run emitted no violations for its scanned pages. This is not a full manual accessibility certification or a substitute for testing with children and assistive-technology users.
- Filesystem check: all 56 referenced pack PDFs/previews, story PDFs and number audio files exist. The complete workbook was also verified over HTTP on production.
- Desktop English, mobile Arabic homepage and mobile Arabic counting UI were inspected visually in the isolated browser.

The earlier local validation above was followed by the release and 82-test integration pass documented in the release record. Nothing was submitted for indexing or changed in Search Console.
