# Story discovery audit — 29 September 2026

The live story library is reachable and linked. No missing story page, missing PDF, incorrect declared canonical, or `noindex` directive was found in the checked story HTML. Both supplied GSC performance exports lack story rows; this does **not** establish that the stories are unindexed. Google-selected canonicals and indexing status remain unverified.

## Evidence

Public checks used an isolated Chromium session named `arabfingers-story-audit`, not the user's Firefox session. No authenticated Search Console inspection was performed.

| Check | Observed result |
| --- | --- |
| Live `/robots.txt` | HTTP 200; `User-Agent: *`, `Allow: /`; points to the canonical sitemap |
| Live `/sitemap.xml` | HTTP 200; contains both story hubs, all 24 localised story pages, and all 12 story PDFs |
| All 38 story URLs in the live sitemap | HTTP 200 through browser-origin fetch |
| All 26 story HTML URLs | Each declares its own `https://www.arabfingers.site/...` canonical; no `noindex` found in the robots meta |
| Both hubs and both Happy Rabbit language versions | `index, follow`; reciprocal English/Arabic and English `x-default` alternates; no `X-Robots-Tag` response header |
| Both hubs | Response HTML contains the 12 story-page links and 12 direct PDF links, before hydration |
| Happy Rabbit in English and Arabic | Story sentences are present in the response HTML, not only inserted after JavaScript runs |
| All 12 live PDFs | Download responses begin with `%PDF-`; representative Happy Rabbit response is `application/pdf` |
| All 12 local PDF assets | Present under `public/stories/`, nonempty, with `%PDF-` signatures; no PDF visual or linguistic validation performed in this audit |
| Live English hub navigation | Browser snapshot shows a Stories header link, Kids' Stories footer link, and links to all 12 stories |

Source paths checked: `lib/stories.ts`, `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts`, both story page components, and shared navigation. The catalog has 12 stories, including six letter tales. The existing homepage redesign also links directly to Happy Rabbit and exposes stories through activity discovery.

Python `urllib` requests to the same representative endpoints returned HTTP 403, while the browser requests above returned 200. This is a client-dependent access difference; it does not identify the blocking layer or prove that Googlebot is blocked. A GSC live test is needed before changing any firewall rules.

## Changes prepared locally

- Story titles now link directly to their reading pages, and each Read/PDF action has a story-specific accessible name.
- Every story card displays age guidance, including letter tales; the hub displays its count from the catalog.
- Letter-tale wording no longer suggests that all alphabet letters already have a story. The second collection is labelled “More mini-stories”, since it excludes letter tales.
- The alphabet coloring book mentioned by the hub now has a direct link in its practice section.
- Secondary titles use the correct English/Arabic language and text direction. Story sentences, transliterations and translations declare their own language and direction instead of inheriting the page's language.
- On small screens, scene illustrations sit above the reading text so long Arabic sentences get the full card width. Transliteration contrast is increased.

Story slugs, PDF paths, story text and metadata canonicals are preserved. These changes improve reading and navigation; no traffic gain is established by this audit.

## Editorial issue to resolve before expanding the catalog

The existing source has Arabic mistakes that also require checking in the generated PDFs. Examples include `عقّق` in the Lantern introduction, the sentence `جَلَسَ الْعَائِلَةُ` in that story, and `بِمِنْقَارِهِ` (“with his beak”) describing the crocodile's snout. These are content-quality problems in a resource teaching Arabic, not evidence of a specific Google ranking penalty.

The catalog and PDFs were left unchanged in this scoped discovery pass. Review all 12 existing stories with an Arabic editor, reconcile the Arabic/translation/transliteration, then regenerate and visually verify the PDFs together. Do this before creating more stories.

## Small remaining Search Console check

Inspect these four exact URLs in the existing `arabfingers.site` property:

1. `https://www.arabfingers.site/en/stories`
2. `https://www.arabfingers.site/ar/stories`
3. `https://www.arabfingers.site/en/stories/al-arnab-al-saeed`
4. `https://www.arabfingers.site/ar/stories/al-arnab-al-saeed`

For each, record the indexed/not-indexed reason, last crawl, page fetch, indexing allowed, and Google-selected canonical. Then run **Test live URL** for the English hub and Arabic story; check **View tested page** for story links/text and any fetch error. The indexed result supplies Google's canonical choice; the live test cannot predict it. See [Google's URL Inspection documentation](https://support.google.com/webmasters/answer/9012289?hl=en).

In **Sitemaps**, confirm that `https://www.arabfingers.site/sitemap.xml` was read successfully. If inspection identifies an unfetched or excluded page, act on its actual reason. After a relevant fix is deployed, request indexing for the affected sample once; repeated submissions do not speed crawling or guarantee inclusion. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

If all four are indexed with the intended canonicals, the next question is demand/content performance. Compare story-filtered Web clicks and AI impressions after publication without treating missing rows as a crawl failure.

## Validation

Focused ESLint passed for the two edited story routes. The existing sitemap test suite passed all four tests. The live checks above cover the currently deployed site; the parent integration task owns production build, final local/mobile preview and release verification. No deployment or Search Console change was made in this audit.
