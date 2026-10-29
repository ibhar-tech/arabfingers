# Post-launch measurement

Prepared 29 September 2026. **Verified launch: 29 September 2026 at 19:40:37 UTC (12:40 Pacific).** Initial Worker version `36eecefb-0cb4-4a32-82d8-3082ba802666`. Same-day refinements are live as `eee8d5f6-bba4-4e45-be3d-fcc4b2faa7f2` at 20:30:27 UTC; see [the refinement record](REFINEMENTS-2026-09-29.md). All changes fall within the excluded release date. Changed routes and completed smoke checks are recorded in [the release record](RELEASE-2026-09-29.md). No monitoring tasks have been scheduled and no new tracking has been enabled.

Deployment target was verified: the existing `arabfingers` Worker in the owner-confirmed account serves `www.arabfingers.site`. The project uses its separate `arabfingers-production` Wrangler auth profile; the unrelated default account login remains intact.

## Historical baseline

Both supplied workbooks end on **27 September 2026**. These are historical prelaunch figures, not necessarily the 28 days immediately before the eventual release. Use the exported daily dates without converting them to Algerian time.

| Site metric | 3–30 August 2026 | 31 August–27 September 2026 |
| --- | ---: | ---: |
| Web clicks | 1,141 | 2,910 |
| Web impressions, including AI | 13,442 | 31,301 |
| Web CTR | 8.49% | 9.30% |
| Web average position, approximate | 7.41 | 6.12 |
| Generative AI impressions | 2,343 | 7,001 |

Web source: [Web analysis](GSC-ANALYSIS-2026-09-29.md), workbook `Chart!A100:E127` and `Chart!A128:E155`. AI source: [AI analysis](GSC-AI-ANALYSIS-2026-09-29.md), workbook `Chart!A79:B106` and `Chart!A107:B134`. CTR is total clicks divided by total impressions, not the mean of daily CTRs. Position is weighted by daily impressions from rounded exported positions, so remains approximate.

For a historical weekly reference, 21–27 September had **960 Web clicks and 2,117 AI impressions**, versus **766 and 1,790** on 14–20 September. Growth was already occurring before the redesign.

The hub's **3,838 / 4,503 = 85.2% of exported page clicks** and **7,587 / 10,477 = 72.4% of exported AI page impressions** describe whole-export page tables, not the latest 28 days. Web daily coverage is 27 April–27 September; AI daily coverage is 18 May–27 September. Do not compare those shares to a shorter postlaunch window or use site chart totals as their denominators. The supplied exports cannot establish recent page-level winners and losers.

AI impressions already contribute to Web reporting. Do not add them to Web impressions, interpret their ratio as visitor share, or infer AI clicks, CTR or revenue from them. See [Google's AI report documentation](https://support.google.com/webmasters/answer/16984139?hl=en).

## Release day and first 24 hours

- Check production `/en`, `/ar`, both `/printables` hubs, the complete-workbook landing pages, changed learning guides, `/en/stories`, one story and both `/games/count` pages. Confirm successful loads and the intended release content on desktop and a narrow phone viewport; exercise navigation, filters and one full counting round.
- Download `/printables/arabic-complete-workbook.pdf` from the hub and one individual pack from the library. Open both files; confirm the workbook has 143 pages and the advertised A4 format. Test keyboard access and verify that Arabic layout and download controls remain usable.
- Check HTTPS and canonical-host redirects, canonical/hreflang links, no accidental `noindex` or blocking `X-Robots-Tag`, plus production `/robots.txt` and `/sitemap.xml`. In GSC URL Inspection, record indexed status, Google-selected canonical and live-test results for `/en/printables`, its workbook landing page, `/en/stories` and a representative story. Save the exact inspected URLs and dates. A successful live test does not prove indexing.
- Record broken URLs, runtime errors and visible layout shifts with device and reproduction steps. Check the reduced ad placement on parent-facing pages; if an existing revenue dashboard is available, record its baseline separately. Fix reproducible release regressions promptly rather than waiting for search metrics.

Completed public/runtime checks are recorded in the release record. GSC URL Inspection and private revenue/analytics checks remain unperformed. The first day's incomplete Search Console figures cannot establish a traffic win or loss.

## Seven-day and 28-day review

For this release: compare **30 September–6 October** with **22–28 September**, then **30 September–27 October** with **1–28 September**. Refresh the prelaunch export to include 28 September, missing from the original supplied files.

Let **D** be the release's Pacific Time calendar date. Exclude D because it mixes old and new versions. Compare the first seven complete postlaunch dates **D+1 through D+7** with **D−7 through D−1**. For the main review, compare **D+1 through D+28** with **D−28 through D−1**. Each period includes whole weeks. Wait until all requested dates are available beyond preliminary reporting; a calendar deadline alone does not make an export complete. Google documents preliminary data and report configuration in its [Performance overview](https://support.google.com/webmasters/answer/7576553?hl=en).

Record Web clicks, impressions, CTR and position at site level and for the printable hub, workbook and changed guides. For AI, record impressions at site and page level. Compare mobile/desktop and English/Arabic separately; keep country and search-type filters consistent. Report absolute differences as well as percentage changes. When a baseline is zero, report the new count without a percentage increase.

At seven days, look for broken discovery paths or sustained losses that warrant investigation. At 28 days, assess whether the hub remains healthy and supporting pages gain visibility. For a declining page, compare its own query and device mix before changing titles or content. Seasonal demand, the pre-existing growth trend and ranking changes remain alternative explanations; a before/after comparison does not isolate the redesign's effect. Absence of story rows still requires URL Inspection, not an assumption that the stories are unindexed.

## Export instructions

1. Open the `arabfingers.site` property in GSC. In Web Performance, record the search type and filters, choose **custom comparison dates** for the review windows, and export Excel. Include the Pages and Queries tables. Keep an unfiltered site export; use separate exports with an **exact page URL** filter for `/en/printables`, the workbook and any changed guide needing query analysis. Preserve the Filters sheet and identify the selected URL in each filename.
2. In the Generative AI Search report, use the same date windows and search type; export its daily chart and Pages, Devices and Countries tables. If the interface does not offer the desired comparison export, export each exact period separately. This report supplies impressions; do not request AI clicks or CTR.
3. Save exports with their start/end dates, report type and filters. Check that both windows contain all dates before calculating changes. Retain the original files. Page totals can differ from property totals, and exported query rows are incomplete; keep each denominator attached to its metric.

For a page-level baseline available now, export **31 August–27 September versus 3–30 August 2026**. Refresh the immediate prelaunch windows once the actual release date is known. Do not substitute the existing whole-period Pages or Queries sheets for these comparisons.

## Measurement limits

[`WebAnalytics`](../components/WebAnalytics.tsx) only injects the Cloudflare beacon when `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` is present at build time. The current live browser check did not observe the optional beacon; no usable analytics baseline has been established. Verify actual beacon loading and dashboard data before claiming measurement is active.

There are **no custom PDF-download or game-completion analytics events installed**. Manual download/game checks establish functionality, not conversion counts. GSC clicks are search clicks, not PDF downloads; saved activities and local game progress are not aggregate analytics. Report downloads, activity starts/completions and conversion rates as **unmeasured** until a separate implementation is agreed and verified. Do not infer them from page views or treat missing data as zero.
