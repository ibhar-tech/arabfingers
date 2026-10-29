# Footer, colouring, numerals, resources and advertising refinements

Requested by the owner after reviewing the first release. Prepared in parallel by footer/numeral, colouring and ad/resource agents, then integrated and tested. Deployment details are recorded below after verification.

## Changes

- Compact server-rendered footer: branded section, two short navigation groups, one about/legal row. Desktop height measured at 267.5px at a 1440px viewport. Removed the expanding accordion and long article-link columns.
- Shared paper/teal theme with lighter borders, softer shadows and clearer controls.
- All on-site literal numeric glyphs and Arabic number formatting use 0–9. Counting answers display one number, not duplicate Eastern/Western numerals. The number lesson and worksheet descriptions match that choice.
- Regenerated numbers 1–10 PDF (10 pages, 332,422 bytes), numbers 11–20 PDF (10 pages, 381,743 bytes), and complete workbook (143 pages, 3,898,338 bytes). All workbook pages rendered for review; number-page samples inspected. Other individual PDFs retained unchanged.
- Colouring studio: 10 topics, 84 selectable letters/pictures, bounded white canvas, solid outlines, brush/fill/eraser/stickers, undo and PNG saving. Reuses the site's original worksheet SVG artwork through shared `coloringShapes`, rather than copying external illustrations.
- Five credited external publisher cards on Printables and Resources. Links go to original HTML resource pages in a new tab; PDFs/images are not copied or embedded.
- Restored responsive top banner on reading pages and a near-viewport bottom rectangle. Homepage includes an early banner after its hero/facts. Hands-on games and colouring remain free of ad placements around their controls.

## External sources and credits

- [Korkortoon Arabic learning books](https://korkortoon.com/ar/free-printables-ar/coloring-books/arabic-learning-coloring-books/). [Publisher terms](https://korkortoon.com/ar/copyrights-terms-of-use/) encourage links to their pages, while prohibiting PDF direct links, copies, rehosting and screenshots.
- [Arabic Seeds — My Pet Animal](https://www.arabicseeds.com/my-pet-animal-free-arabic-printable-worksheets/). [Terms](https://www.arabicseeds.com/terms-of-use/) permit personal/classroom printing and direct readers to the publisher's website; no online redistribution.
- [Arabic Playground free catalogue](https://www.arabicplayground.com/free-products). Publisher account may be required; individual sellers own their resources. No redistribution licence was established.
- [Arriqaaq — My Arabic Alphabets](https://arriqaaq.com/my-arabic-alphabets/). Card credits illustrator Zara Ilyas and curator Zahra Venkat as identified by the publisher. Signup conditions are noted; no rehosting licence was established.
- [Sesame Workshop — Kindness Saves the Day, Arabic](https://sesameworkshop.org/resources/kindness-saves-the-day-ar/). [Terms](https://sesameworkshop.org/about-us/legal/terms-of-use/) allow new-window links to complete HTML pages, not image embedding or unlicensed redistribution.

Credits do not substitute for permission to redistribute. This release provides discovery links and original descriptions only.

## Ad diagnosis and integration

The previous release placed only one lazy rectangle at the end of reading pages; on the printable hub it was approximately 6,759px down. The homepage had no ad placement. That design explains poor visibility of the placements and has been corrected.

The earlier custom srcDoc iframe wrapper has been removed. Adsterra's [publisher terms, section 4.7](https://adsterra.com/publishers-terms-managed/) require prior written consent for wrapping its tag in an iframe. The current integration places the tag directly and lets the vendor create its own banner iframe. The inspected provider source supports dynamic script injection and consumes the shared options object synchronously; a queue prevents different banner sizes racing over those options. No provider clicks or forced ad rendering were used during validation.

Existing ad unit keys are preserved: desktop 728×90, mobile 320×50, and bottom 300×250. Placements reserve their dimensions. Normal origin referrer policy is retained. The main script CSP was not broadened speculatively. The service worker now ignores cross-origin responses instead of caching third-party ad scripts; its cache version was bumped for replacement assets.

The provider returned empty HTTP 200 scripts to automated/headless browser requests. This does not prove a human visitor receives no ad, and no successful paid creative fill is claimed. Browser tests use a provider-boundary fixture to avoid generating paid impressions. Real-user fill and revenue must be checked in a normal visitor session and the publisher dashboard; ad blockers and inventory remain outside the application tests.

## Validation

- Production Next.js/OpenNext packaging, TypeScript, ESLint and unused-code checks.
- 53 unit tests.
- 92 cross-browser tests, including colour fill containment, undo, PNG saving, compact footer height, Arabic decimal digits, original publisher links and direct responsive ad-tag loading.
- Final contrast recheck for the printable hub after tightening muted labels.
- PDF text/geometry checks and sample renders for regenerated number sheets, plus page-level review of the workbook.

No conversion/revenue result is asserted from deployment or test success. Continue the matched-period review in [POST-LAUNCH-MEASUREMENT.md](POST-LAUNCH-MEASUREMENT.md).

## Verified production release

- Final version: `eee8d5f6-bba4-4e45-be3d-fcc4b2faa7f2`.
- Deployment: `a9e3b0a9-eadb-456c-b1ce-abc8abb099d9`, serving 100% of production traffic.
- Final release time: **29 September 2026, 20:30:27 UTC** (21:30 Algeria, 13:30 Pacific).
- Worker/account: existing `arabfingers` under `informatiquedz1239@gmail.com`.
- Pre-refinement rollback version: `36eecefb-0cb4-4a32-82d8-3082ba802666`.
- The intermediate studio version was `5e30ee1f-e187-4b15-9180-350aa57bb588`; the final version also aligns the EN/AR privacy disclosure with homepage and resource-page advertising.

Live public checks confirmed 10 colouring topics, 84 selectable pages, 5 credited external publisher cards, a 267.5px desktop footer, no Eastern-digit text on the Arabic printable hub, the correct direct desktop ad script and no srcDoc wrapper. All three regenerated PDFs returned 200/application/pdf with the expected updated byte sizes. The new service-worker version and updated ad disclosure are live.

Final functional suite: **92/92 browser tests** in Chromium/WebKit, **53/53 unit tests**. Production packaging, type checking, lint, unused-code and whitespace checks passed. The final privacy-copy alignment was rebuilt and its live text verified. Automated ad tests verify loading/placement, not advertiser fill or revenue.

## Science player layout follow-up — 30 September 2026

All four narrated science lessons now group their canvas and playback controls into one frame, with narration below. Shared scoped styles restore a bright accent and legible controls on the dark player surface. Lesson scripts and audio were not changed.

Production version: `f7e712a1-f38f-4dca-acc3-f2febb927760`. Previous version: `eee8d5f6-bba4-4e45-be3d-fcc4b2faa7f2`.

Validation: production Next.js/OpenNext build, targeted ESLint/type checking, and 16 Chromium/WebKit checks across four lessons and both locales. Each check verifies canvas/control adjacency at 1280px and 390px and exercises play, pause and next-scene controls. Live Arabic States of Matter verified with a 0px gap and narration below the controls. No new Search Console, advertising-revenue or conversion measurements were obtained.
