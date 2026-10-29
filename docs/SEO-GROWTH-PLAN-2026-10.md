# Arab Fingers — Growth Plan, October 2026

_Built from the GSC export of 2026-09-30 → 2026-10-27 (28 days, web search), plus a crawl of the live site on 2026-10-29. Supersedes the "what to do next" parts of [SEO-GROWTH-PLAN.md](SEO-GROWTH-PLAN.md); that file's June baseline is kept for comparison._

---

## 1. Where you are

| Metric | June 2026 (3 months) | Oct 2026 (28 days) |
|---|---|---|
| Clicks | 11 | **5,531** |
| Impressions | ~1,983 | **43,400** |
| CTR | 0.55% | **12.7%** |
| Avg position | ~50 | **5.3** |

The June plan worked: printables pages plus per-letter pages took the site from page 5 to page 1. Daily impressions rose about 60% inside this window (≈1,150/day on 30 Sep → ≈1,850/day in the last week). Clicks rose more slowly (≈140 → ≈220/day), so **CTR is the lever now, not rankings alone.**

What the export says:

1. **One page carries the site.** `/en/printables` = 3,703 of 5,531 clicks (67%). That is a concentration risk: one core update or one competitor and two-thirds of the traffic moves. The next pages need to earn traffic on their own.
2. **The brand is a real channel.** "arab fingers" / "arabfingers" / "عرب فنجرز" / "arab finger" = 858 clicks at ~85% CTR. People are told about the site (school WhatsApp groups, teachers) and then search for it. The click spikes on 6–7 Oct and 13–14 Oct (CTR 18–20%, impressions flat) look like this: a burst of brand searches, not a ranking change. Make the site easy to share (section 4E).
3. **Desktop ≈ mobile** (2,584 vs 2,778 clicks). That is unusual and it means printing: parents and teachers at a computer. Keep the PDF path one click on desktop.
4. **Two audiences you are not writing for yet:**
   - **South and Southeast Asian Muslim families** (India 200, Pakistan 120, Philippines 99, Malaysia 99, Sri Lanka 75, Bangladesh 61, Maldives 40, Indonesia 32): **726 clicks, 13% of the total.** They learn the Arabic letters to read the Qur'an, and they search in English with Qaida/Quran words.
   - **Gulf school families** (UAE 499, Saudi 268, Qatar 144, Oman 114, Kuwait 65, Bahrain 46): homework help, KG1/KG2/Grade 1 terms, often in Arabic script.

---

## 2. Biggest gaps in the data, and what this branch already changes

| Query / page | Impr. (28d) | Pos | CTR | Diagnosis | Status |
|---|---|---|---|---|---|
| "arabic letters for kids" + "arabic alphabet for kids" + "arabic alphabets for kids" | 1,075 | 7–8 | ~0.8% | Page 1 bottom; title said "Alphabet" only, H1 was "A Complete Guide" with no "for kids" | ✅ Title + H1 of `/learn/arabic-alphabet-guide` now say "Arabic Alphabet for Kids: All 28 Letters" |
| `/en/learn/first-arabic-words` | 987 | 5.8 | 1.9% | 80-char title truncated, never led with "arabic words for kids" | ✅ New title "Arabic Words for Kids: 25 Easy First Words, by Theme" |
| `/ar/printables/letters/*` (tha 387, ha 196, jeem 190, kha 182…) | ~2,000 | 7–9 | ~1% | Arabic searchers type the bare letter ("ظ", "ث ٤", "ظً") and want **its shapes** and **how to write it**; the Arabic title only said "tracing sheet" | ✅ Arabic titles now "حرف الثاء (ث) بأشكاله الأربعة — ورقة كتابة وتتبّع PDF مجانية" |
| "نقطة حرف الجيم" | 79 | 7.5 | 0% | No page stated how many dots a letter has | ✅ Every letter page now states its dots (visible FAQ + description), and llms.txt lists them |
| "جميع الألوان واسمائها بالعربي" | 72 | 8.5 | 0% | Arabic colours title didn't match the phrasing | ✅ Arabic title now leads with it |
| Homepage + 2 other places said "53 pages" | — | — | — | Stale: the library is 143 pages. Under-selling the main promise on the brand landing page | ✅ Count now computed from `lib/worksheets.ts` everywhere |
| `/en/blog/arabic-alphabet-vs-latin-deep-dive` | 702 | 7.7 | 0.14% | Ranks for something, converts nobody. **Check which queries** (GSC → Pages → this URL → Queries), then retitle to match them | ⬜ you: 2 minutes in GSC |
| `/en/learn/hardest-arabic-letters` | 215 | 6.3 | 0.5% | Same: see its queries, then retitle | ⬜ |
| `/en/learn/arabic-colors` | 317 | 8.0 | 0.3% | Page 1 bottom. Add a colour table near the top, which Google can lift into a snippet | ⬜ |
| "arabic alphabet" / "arabic letters" (head terms) | 361 | 52–56 | 0% | Authority play, 6–12 months. Don't chase directly. The "for kids" variants above are the realistic win | — |
| `/en/printables/arabic-alphabet-tracing` vs `/en/printables` | 678 vs 27,809 | 11.6 vs 3.7 | | The hub outranks its own tracing pack for tracing queries. Fine for now. Make the pack page clearly *the 28-page pack* and the hub *the library*, so they stop competing | ⬜ |

**Technical fixes in this branch**

- **Removed a site-wide FAQPage** that was rendered invisibly on every page. It doubled each page's real FAQ and broke Google's rule that markup must match visible content. Pages with real FAQs keep theirs.
- **Fixed the WebSite JSON-LD**: removed app-only properties (`applicationCategory`, `offers`, `browserRequirements`…, which are invalid on WebSite), linked it to the Organization by `@id`, and gave the Organization a `logo`.
- **Image sitemap**: every worksheet and letter page now lists its preview PNG. Worksheet searches show a lot of image results, and Google Images is a big source of discovery for printables. A test checks that every listed image exists.
- **`/llms.txt` is now generated** from the same data as the sitemap. The hand-kept file listed none of the 17 packs or 28 letter pages, which are what earn the traffic. See section 5.

---

## 3. Content brainstorm, ranked by evidence

Rule: build what the query data already asks for first, audience-driven ideas second, speculative ideas last. Each item = one landing page + one PDF + one Pinterest pin, the same pattern that already works.

### A. Demand already visible in your queries (build first)

| Idea | Evidence (28d) | Format |
|---|---|---|
| **Tanween worksheets** (ـً ـٍ ـٌ) | "ثً", "ظً", "ظُ", "ظَ", "ثًـ" ≈ 90 impressions of letter + vowel-mark searches | New pack; extends the harakat pack, which already converts at 10% |
| **Letters with harakat, per letter** (بَ بِ بُ بْ) | "arabic letters with harakat pdf free download" 32 impr, **41% CTR** | One page per letter, or one 28-page pack |
| **Long vowels / madd, sukoon, shadda** | Natural next step after harakat; teachers search for it | Pack |
| **4-line copybook format** | "arabic letters in 4 line copy" 18 impr, 0 clicks | Pack: same letters on 4-line ruled paper (common in South Asian schools) |
| **Mixed-letter recognition** ("find the letter", "circle all the ب") | "mixed arabic alphabet" 11, "alef ba ta homework" 14 | Pack + an online game of the same |
| **Cut-out letters and flashcards** | "arabic alphabet cut out" 9, "arabic alphabet print out" 9 (pos 2–3) | Printable flashcards (letter + picture + word), 28 cards, 8 per page |
| **Grade/age landing pages** | "free arabic worksheets for grade 1 pdf" 64, "kindergarten" 70, "أوراق عمل للاطفال عمر 5 سنوات" | `/printables/kindergarten`, `/grade-1` (+ KG1/KG2 wording for the Gulf). These are curated views of existing packs, so cheap to build |
| **Arabic handwriting for adult beginners** | "free arabic writing exercises for beginners pdf" 72, "arabic handwriting practice pdf" 83 (pos 4.9), "arabic worksheets for beginners pdf" 134 (pos 5.4) | A non-childish "Arabic handwriting workbook for beginners". A new audience with high intent, and parents who are learning alongside their child |
| **Alphabet chart variants** | "arabic alphabet chart pdf" 45 (pos 8), "chart for kids" 19 + 12 + 6 | Charts with pictures, with all 4 forms, with transliteration, A3 poster |
| **More games, each on its own URL** | Games cluster ≈ 630 impr at pos 4–6: "arabic alphabet games free online", "arabic letter games for kids" | Memory match, letter-sound bingo, "which letter has 3 dots?", word builder (join letters). Each game is a new page that ranks for "arabic ___ game" |
| **Arabic words by letter** ("words that start with ب", "كلمات تبدأ بحرف الظاء") | Huge Arabic-script query family. Your letter data already has example words | Expand each letter page with 8–10 picture words, or a sister page per letter |

### B. Driven by audience (the countries data)

- **Qur'an-reading track for non-Arab Muslim kids** (13% of clicks). Noorani-Qaida-style lesson sequence: single letters → joined letters → harakat → tanween → madd → sukoon → shadda. Plus a makharij (articulation points) chart for kids and "Arabic letters for Quran reading". It reuses packs you already have, re-sequenced, with landing copy that uses the vocabulary these families search with. Get it reviewed by a qualified teacher before publishing.
- **Islamic-life vocabulary sets**: days of the week, Hijri months, prayer words, wudu steps, a Ramadan calendar, "99 Names" colouring, everyday duas for kids (bilingual + transliteration). Seasonal and very shareable.
- **Vocabulary themes Gulf schools teach**: family, school objects, feelings, weather, food, my house, jobs. Coloring + word-tracing format (your existing coloring-book pipeline).

### C. Calendar (publish 4–8 weeks before the date: indexing takes time)

| Date | Event | Publish by |
|---|---|---|
| **18 Dec 2026** | UN Arabic Language Day | **Now (early Nov)**: "Arabic Language Day activities for kids" + a printable certificate/poster. Schools look for this every year |
| ~8 Feb 2027 | Ramadan 1448 begins | Early Jan: Ramadan calendar, daily good-deeds chart, story PDF, lantern craft |
| ~10 Mar 2027 | Eid al-Fitr | Feb: Eid cards to colour, "Eid Mubarak" tracing |
| ~16 May 2027 | Eid al-Adha / Hajj | Apr: Hajj steps for kids printable |
| Aug–Sep 2027 | Back to school | Jul: KG1/KG2/Grade 1 starter packs |

### D. Formats that reach people outside Google web search

- **YouTube Shorts / TikTok: one letter a day** (28-day series × 2 languages). For "arabic letters for kids", Google shows video carousels above position 7. You already have the audio; a short is the letter animating plus its sound and a word.
- **Pinterest**: keep going. Every new pack ships with its pin (`public/pins/` pipeline).
- **Teacher marketplaces** (TpT free listings, Twinkl-style communities, Facebook teacher groups): free listings that link back = backlinks + referrals.
- **Printable "share card"**: a QR-code card at the end of every PDF ("More free sheets: arabfingers.site"). The PDFs get passed around WhatsApp groups; make each one bring people back. (`qrcode` is already a devDependency.)

### E. Make the brand channel easier to use

- Add a "Share with your class / WhatsApp" button on pack pages (a pre-filled `wa.me` link, with no tracking).
- Footer of every PDF: site name + QR code (above).
- A one-page "For teachers" landing page: what is free, how to use it in class, how to credit the site, and a printable letter home to parents.

---

## 4. Technical / on-page backlog (not in this branch)

1. **Bing Webmaster Tools.** Verify (import from GSC takes 2 minutes) and submit the sitemap. ChatGPT search and Copilot draw on Bing's index, so this is AI visibility too.
2. **IndexNow.** Turn on Cloudflare → Caching → Configuration → **Crawler Hints**. Bing/Yandex then learn about new pages within minutes instead of weeks.
3. **Core Web Vitals with ads.** Check the CWV report after the Adsterra rollout. Ad slots without reserved height cause CLS. Make sure the frames reserve space.
4. **Answer-first intros.** On every learn page, the first 2 sentences should answer the query directly ("The Arabic alphabet has 28 letters, written right to left…"). Google snippets and AI answers both lift the first clear answer they find.
5. **Pack vs hub cannibalization** (table in section 2).
6. **PDF metadata.** The PDF title comes from the HTML `<title>` in `scripts/build-worksheets.mjs`. Make sure it reads like a search result ("Arabic Letter Ba Tracing Worksheet — Arab Fingers"), because Google shows it for PDF results (`ra.pdf` alone earned 474 impressions).

---

## 5. Agentic / AI-search SEO (GEO)

### 🔴 First: you are blocking the AI crawlers

`robots.txt` on the live site is prefixed with a **Cloudflare-managed block**:

- `Disallow: /` for **GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, meta-externalagent, CCBot, GoogleOther**, plus ~20 more.
- `Content-Signal: search=yes, ai-train=no`.
- The edge returns **HTTP 403** to the GPTBot and ClaudeBot user agents (tested 2026-10-29). OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot and Bingbot get **200**.

What this means: live AI *search* can still fetch you. But the models' own knowledge, Gemini app grounding (Google-Extended), Apple Intelligence (Applebot-Extended) and Meta AI will not learn that "Arab Fingers" exists. For a free resource whose goal is reach, that costs more than it protects.

**Your decision** (Cloudflare dashboard → AI Crawl Control / Security → Bots):
- Recommended: **allow** GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot and meta-externalagent. Keep blocking the scrapers you don't want (Bytespider, etc.).
- Turn off "Manage robots.txt", or change the signal to `ai-train=yes`. Then the `robots.ts` in this repo (allow all) is the only policy.
- If you deliberately want no training, keep it. But know it caps how often assistants recommend you unprompted.

Google AI Overviews use normal Googlebot, so they are not affected by any of this.

### What makes assistants cite and recommend you

1. **`/llms.txt`** (done in this branch). A generated map of every pack, every letter (name, transliteration, dots, page + PDF URL), the games, stories and guides. Agents that look for it get the whole catalogue in one fetch.
2. **Extractable facts.** Short, declarative, true statements in the page HTML: "Jeem (ج) has one dot below it." "The Arabic alphabet has 28 letters." Tables of letter / name / sound / forms. Models quote sentences like these. The new dots FAQ is an example. Do the same for numbers, colours and harakat.
3. **Consistent entity.** ✅ Done 29 Oct: IBHAR TECH LEARNING (Organization) everywhere; founder named on /author and /about. Was: the site credited "Aissa Trad" (llms.txt), "IBHAR TECH LEARNING" (bylines, and as a `Person` in JSON-LD) and "Arab Fingers". Pick one publisher and one person. Make the Organization/Person `sameAs` point at real profiles: Pinterest, YouTube, GitHub, and a Wikidata item once there are press mentions.
4. **Third-party mentions.** Assistants recommend what "best free Arabic resources for kids" lists, Reddit threads (r/homeschool, r/learn_arabic, r/MuslimParents) and Quora answers mention. One honest, helpful post in those places is worth more to an LLM than ten on-site pages.
5. **Markdown twins (next step).** Serve `/en/learn/arabic-alphabet-guide.md` (and the pack pages) as clean Markdown, linked from llms.txt. Agents then fetch your content without the JS, ads and navigation.
6. **An MCP server for the site (the "agent-ready" move).** The site already runs on a Cloudflare Worker. A small remote MCP endpoint (`/mcp`) with tools such as `find_worksheet({letter | topic | age})`, `get_letter({letter})` → facts + audio + PDF URL, and `list_stories()` lets Claude, ChatGPT and other agents *use* Arab Fingers when a parent asks "make me an Arabic worksheet plan for my 5-year-old". Listing it in the public MCP registries is a new discovery channel few competitors have. Your data modules (`letterGuide`, `worksheets`, `stories`) are already typed, so this is mostly glue code.
7. **Measure it.** In Cloudflare Web Analytics, watch referrers `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`. Once a month, ask each assistant 5 fixed prompts ("free arabic alphabet worksheets pdf", "arabic letter games for kids", "how to teach my child arabic if I don't speak it", …) and log whether you are cited.

---

## 6. 30 / 60 / 90

**Next 30 days**
- [x] Merge this branch; resubmit the sitemap in GSC; request indexing for the alphabet guide, first words and 3–4 `/ar/printables/letters/*` pages
- [x] Decide on the AI-crawler block (section 5) and change it in Cloudflare — training allowed, Bot Preference Sync off
- [ ] Bing Webmaster Tools + Crawler Hints (IndexNow)
- [x] Retitle the 702-impression blog post and the hardest-letters page (matched to export queries; confirm with per-page Queries when available)
- [x] Ship the **Arabic Language Day** page + printable (deadline: indexed before 18 Dec)
- [x] Ship **tanween** + **letters-with-harakat** packs

**Day 30–60**
- [x] Preschool / Kindergarten / Grade 1 landing pages; flashcards pack; 4-line copybook pack
- [x] Two new games on their own URLs (memory match, "how many dots?")
- [ ] QR "more free sheets" footer on every PDF; WhatsApp share button
- [ ] Start the 28-day letter Shorts series
- [ ] Ramadan 1448 content live by early January

**Day 60–90**
- [ ] Qur'an-reading track (Qaida-style sequence), reviewed by a qualified teacher
- [x] Adult-beginner handwriting workbook
- [ ] Markdown twins + MCP endpoint
- [ ] Re-export GSC and compare with this baseline: 5,531 clicks / 43.4K impressions / 12.7% CTR / pos 5.3, and `/printables` at 67% of clicks (goal: under 50% because other pages grew, not because it shrank)

---

## 7. Progress log — 29 Oct 2026 (one working session)

Everything below is live on www.arabfingers.site and on `main`.

**Technical**
- Next.js 15 → **16.4.3** (Turbopack), React 19.2.9, OpenNext 1.20.14, wrangler 4.155, next-intl 4.14. The `--dangerouslyUseUnsupportedNextVersion` override is gone. `middleware.ts` kept (edge runtime) instead of `proxy.ts` (Node-only, experimental on Workers).
- ESLint flat config; four react-hooks v7 rules downgraded to warn (29 old patterns in the interactives) — refactor queued as a separate task.
- Site-wide invisible FAQPage removed; WebSite/Organization JSON-LD fixed; author of record = IBHAR TECH LEARNING (Organization).
- `/llms.txt` generated from data; sitemap lists every preview PNG as an image entry.
- Locale-less section URLs (`/games/count`, `/stories`…) now 308 to `/en/…` (were 10 GSC 404s).
- Contrast fixes on all pack pages and the Arabic-vs-Latin post; phone a11y e2e covers the new pages.
- Production had been deployed from uncommitted local code (Wrangler tags discovery/studio-ads/science-controls, Sep 29–30); it was committed as `cba32f6`. Rule since then: production = `main` (see CLAUDE.md).

**Content shipped**
- Titles/H1s: alphabet guide ("for kids"), first words, Arabic letter pages ("بأشكاله الأربعة"), Arabic colours, Arabic-vs-Latin post (+ at-a-glance table), hardest letters.
- Letter dots on every letter page (FAQ + description); `lib/letterDots.ts`.
- Printable packs (library now **176 pages**, complete workbook rebuilt): Arabic Language Day (4), letters with harakat (4), tanween (3), alphabet flashcards (4), 4-line copybook (8), handwriting for beginners — teens & adults (10). Fixed بَطَّة on the fatha sheet.
- Pages: `/learn/arabic-language-day`; `/printables/preschool`, `/kindergarten` (KG1/KG2), `/grade-1`.
- Games: `/games/dots` ("How many dots?"), `/games/memory` (letter ↔ picture word).

**Settings changed outside the repo**
- Cloudflare: AI Crawl Control — Training allowed, Bot Preference Sync off (robots.txt is the repo's own); Workers Builds — non-production branches run `npx wrangler versions upload`, exclude paths `docs/**`, `*.md`.
- Search Console: sitemap resubmitted; 404 and Redirect-error rows sent for validation; daily request-indexing list (115 URLs + the new pages).

**Still open — owner**
- Request indexing, 10 URLs/day (list from the session + every new page above).
- Cloudflare: block Bytespider and TikTok Spider again (optional).
- Bing Webmaster Tools (import from GSC) and Cloudflare Crawler Hints (IndexNow).
- Send the Search Console Queries tab for the blog post and hardest-letters page to confirm the new titles.
- In 2–4 weeks: re-export GSC Performance and compare with §1.

**Still open — next build work**
- Qur'an-reading track (Qaida-style), needs review by a qualified teacher.
- Markdown twins of key pages + a `/mcp` endpoint for agents.
- Shareability: QR "more free sheets" card in PDFs, WhatsApp share button.
- Refactor the 29 react-hooks warnings and restore the rules to errors.
- Ramadan 1448 content (Ramadan starts ~8 Feb 2027): live by early January.
