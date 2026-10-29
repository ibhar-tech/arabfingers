# Generative AI Search performance — 29 September 2026

## Conclusion

Arab Fingers already receives visibility in Google's generative AI Search features, and that reported visibility is growing. AI impressions rose from **2,343 to 7,001 across matching 28-day periods**, an increase of **198.8%**. The latest seven days also increased, from **1,790 to 2,117 (+18.3%)**.

The strongest resource is again **`/en/printables`**, which accounts for **72.4% of exported AI page impressions**. Together with the standard Web report, this supports preserving the successful printable hub and developing useful related learning resources. It does not support treating the entire site as excluded from AI results or replacing its working content with generic “AI SEO” material.

The export measures impressions, not AI clicks or visits. We cannot calculate AI CTR, AI-attributed revenue, or how many of the site's Web clicks came from AI. No part of the observed growth can be attributed to the undeployed redesign.

## Sources and checks

Primary workbook: `arabfingers.site-Performance-on-Search-Generative-AI-Features-2026-09-29.xlsx`.
Comparison workbook: `arabfingers.site-Performance-on-Search-2026-09-29.xlsx`.
Both files were read without modification.

Both Filters sheets say Web and “Last 16 months”. The AI daily chart actually covers **18 May–27 September 2026**, 133 consecutive dates. The standard Web chart begins earlier, on 27 April. Comparisons below align dates explicitly.

- AI daily total: **10,330 impressions**, `Chart!A2:B134`.
- Countries and Devices independently sum to the same **10,330**.
- Pages sum to **10,477 impressions** across 108 URLs. Page aggregation can differ from property aggregation, so page shares use **10,477** as their denominator.
- No duplicate dates or dimension keys were found. Impression cells are numeric and dates are contiguous.
- No separate AI Overviews versus AI Mode breakdown, query table, clicks, CTR or position columns are present.
- The first non-zero date in this export is 9 June, with one impression. This is an observation about the supplied data, not a claim about the site's first-ever AI appearance.

Google's [Generative AI report documentation](https://support.google.com/webmasters/answer/16984139?hl=en) explains the supported features, impression measurement, page/property aggregation differences and inclusion within Web reporting.

## Matched-period comparison

| Metric | 3–30 August | 31 August–27 September | Change |
| --- | ---: | ---: | ---: |
| AI impressions | 2,343 | 7,001 | +198.8% |
| Average AI impressions per day | 83.7 | 250.0 | +198.8% |
| Web impressions, including AI | 13,442 | 31,301 | +132.9% |
| Reported AI impressions ÷ Web impressions | 17.43% | 22.37% | +4.94 percentage points |
| Total Web clicks | 1,141 | 2,910 | +155.0% |

Sources: AI `Chart!A79:B106` and `A107:B134`; Web `Chart!A100:E127` and `A128:E155`.

The AI/Web ratio is a comparison of reported impression metrics. It is **not** the share of visitors arriving through AI, the probability that a searcher sees AI, or a way to calculate AI clicks. Do not add AI impressions to Web impressions; the AI data is already included in Web reporting. Do not assume that subtracting these reports produces a fully deduplicated non-AI search audience.

Across the exact overlapping date range, 18 May–27 September, there are 10,330 AI impressions and 52,693 Web impressions, a ratio of **19.60%**. Using the earlier Web export's full 53,401-impression total would mix date ranges.

### Recent movement

The latest week, 21–27 September, has **2,117 AI impressions**, versus **1,790** on 14–20 September. Sources: AI `Chart!A121:B127` and `A128:B134`.

The peak daily value is 366 on 22 September. The last exported day, 27 September, has 276. That daily decrease does not establish a sustained decline, given the positive week-on-week change.

The earlier Web analysis found an impression drop between 1–7 and 8–14 September. Over those same windows, **AI impressions increased from 1,526 to 1,623 (+6.4%)**, while Web impressions fell from 10,946 to 5,744. The observed Web impression dip therefore did not coincide with a drop in AI impressions. These aggregate exports still cannot identify which queries or features caused the Web change, nor establish click cannibalisation.

### Monthly history

| Month | AI impressions |
| --- | ---: |
| May 18–31 | 0 |
| June | 110 |
| July | 818 |
| August | 2,574 |
| September 1–27 | 6,828 |

May and September are partial periods. Use the equal-length comparison above to judge recent growth.

## Pages receiving AI visibility

All figures below are whole-export totals; they are not last-28-day page figures.

| Page | AI impressions | Share of exported AI page impressions |
| --- | ---: | ---: |
| `/en/printables` | 7,587 | 72.42% |
| `/en/play` | 325 | 3.10% |
| `/ar/printables/letters/zah` | 265 | 2.53% |
| `/en/learn/arabic-alphabet-guide` | 239 | 2.28% |
| `/en/learn/arabic-colors` | 171 | 1.63% |
| `/en` | 169 | 1.61% |
| `/ar` | 123 | 1.17% |
| `/en/learn/first-arabic-words` | 99 | 0.94% |
| `/en/printables/arabic-numbers-tracing` | 96 | 0.92% |
| `/en/printables/arabic-alphabet-tracing` | 92 | 0.88% |
| `/en/printables/arabic-harakat` | 81 | 0.77% |

Source: `Pages!A2:B12`, with denominator `SUM(Pages!B2:B109)`.

English locale URLs receive **9,628 AI page impressions (91.9%)**, Arabic locale URLs 820 (7.8%), and other URL forms 29 (0.3%). Locale is classified using the first URL path segment. These figures describe page language, not visitors' nationality or language.

There are no story URLs or the four interactive science lesson URLs in this AI Pages table. Their absence is a discovery/indexing question to investigate, not proof of exclusion or a reason to delete the content.

The existing English complete workbook page has just nine AI impressions (`Pages!A65:B65`). It is a candidate for clearer linking from the proven hub, but not yet a demonstrated AI winner. The Arabic workbook page has one impression (`Pages!A100:B100`).

## Audience

| Device | AI impressions | Share |
| --- | ---: | ---: |
| Mobile | 5,550 | 53.7% |
| Desktop | 4,503 | 43.6% |
| Tablet | 277 | 2.7% |

Source: `Devices!A2:B4`.

Test both phone and desktop workflows. A successful AI impression still needs a clear landing page, usable preview and direct download when a visitor chooses to click.

The largest country totals are the United States (1,764), UAE (902), UK (716), India (696) and Saudi Arabia (691), followed by the Philippines (423), Pakistan (402) and Canada (384). Source: `Countries!A2:B9`. This is international demand; it does not justify dropping English content or assuming an exclusively Arabic-speaking audience.

## What to do next

1. **Protect the printable hub.** Preserve `/en/printables`, its current H1, useful explanations, PDF URLs, indexability and pack links. Improve the presentation without discarding the content already attracting both Web clicks and AI impressions. The prepared redesign retains those elements.
2. **Make existing resources easier to choose.** Put the complete workbook and the most useful individual packs within easy reach. Keep preview, page count, skill, suggested age and direct PDF download clear. Avoid forcing a download funnel or email registration.
3. **Develop the topics already receiving AI exposure.** Prioritise the alphabet guide, colours, first words, numbers and harakat. Link explanation → practice → printable where it helps a parent. Make age/skill guidance and claims accurate; adding generic question-and-answer sections or special markup is not a substitute for usefulness.
4. **Check story discovery before adding more stories.** Inspect the hub and one representative story in Search Console for indexing, Google-selected canonical and rendered internal links. Both supplied exports lack story page rows.
5. **Measure page-level changes after deployment.** Record the deployment date. Compare matched periods for Web clicks, AI impressions, and actual download/activity outcomes. The current page tables cannot identify recent individual winners or losers because they contain only whole-period totals.

Google's [AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) emphasises useful original content, crawlability and page experience rather than special AI files or markup. The workbook already establishes historical AI visibility, so enabling AI inclusion is not the primary problem shown here. Current Search Console controls were not inspected or changed.

## Remaining uncertainty

The AI visibility question is now answered at site level: reported impressions are growing, and the printable hub dominates. Remaining inputs are **page/query comparison data** for recent Web changes, and **Page indexing/URL Inspection** for pages such as stories. AI-attributed clicks and CTR are not supplied by this report and should not be invented or requested as if they were existing export columns.

The source workbooks remain unchanged. Only analysis documents were updated during this step; nothing was deployed.
