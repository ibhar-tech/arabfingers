# Arab Fingers — SEO & Growth Strategy

_Built from the GSC export 2026-04-27 → 2026-06-20. Decision: double down (keep brand/niche/Next.js), grow via printables → Pinterest._

---

## 1. Diagnosis: what the data actually says

| Metric (3 mo) | Value | Meaning |
|---|---|---|
| Impressions | ~1,983 | Google shows you for the **right** searches |
| Clicks | 11 | Almost none reach the user |
| Avg position | **~50** (page 5–6) | The entire problem in one number |
| CTR | 0.55% | Math, not quality — nobody scrolls to page 5 |

**The niche is validated, not broken.** "arabic alphabet" = 232 impressions; the alphabet-guide page alone pulled **1,152 impressions (58% of all traffic)** at position 59. Demand is huge; you're just buried.

**Three facts that set the strategy:**

1. **You already rank PAGE 1 for the "for kids" cluster and still get 0 clicks** — these need snippet/CTR work, not authority:
   - `arabic colors for kids` → pos **5**
   - `colours in arabic for kids` → pos **7**
   - `easy arabic words for kids` → pos **7.7**
   - `burtuqaali meaning` → pos **9.8**
   - `arabic words for kids` → pos **19** · `/play` → pos **17** · `/first-arabic-words` → pos **17**
2. **Product is fine.** Homepage `arabfingers.site/` ranks pos **6, 13.5% CTR, 7 of 11 clicks**. When you rank, people click.
3. **Audience = English-speaking diaspora/homeschool parents** (US 449 imp, UK 275, CA 94, AU 89, DE/NL/SE; UAE 142, EG 70). English content earns the impressions; native-Arabic-script queries are a smaller slice. This audience lives on **Pinterest** — hence the growth engine.

**Root cause of position 50:** zero-authority 2-month-old domain (few/no backlinks, no topical depth signal yet). Fixable by authority + distribution + time — **not** by a rewrite or a new stack. Next.js/Vercel is already great for SEO.

---

## 2. Strategy in one line

> Harvest the page-1 long-tails we already own **now**, pump out free printables that double as SEO pages **and** Pinterest pins to build links + traffic, and deepen the alphabet cluster so the 1,152-impression page climbs.

---

## 3. Phase 0 — Stop the bleeding (technical, ~1 day) — **DO FIRST**

| Task | Why | Status |
|---|---|---|
| Change all redirects 307 → **308 permanent** (non-www→www, `/`→`/en`) | 307 = "temporary," blocks equity consolidation. Confirmed live. | ⬜ |
| Confirm GSC has a **Domain property** (not just URL-prefix) | Consolidates www + non-www + http into one view | ⬜ |
| Re-submit sitemap; "Request indexing" on the 6 money pages | Speed re-crawl after canonical change | ⬜ |
| Verify the non-www homepage (pos 6) didn't drop after www-canonical switch | Protect the one page earning clicks | ⬜ |

---

## 4. Phase 1 — Harvest the close-position cluster (on-site, week 1) — fastest ROI

These already rank page 1–2. Goal = clicks in **weeks**, no authority required.

- **Colors page** (`/learn/arabic-colors`): it ranks pos 5–9 for "…for kids" but pos 35 for the head term. Add a **color table** built to win the featured snippet, one definitional line per color (capture `burtuqaali meaning` pos 9.8 + each color word), and **FAQ schema**. Tune H1/meta toward "colors in arabic for kids."
- **First words page** (pos 17): meta/snippet for `arabic words for kids`, `easy/basic/baby arabic words for kids`.
- **Play page** (pos 17): title toward `arabic letters game for kids`.
- **Add FAQ/HowTo structured data** answering the parent-intent queries (`how to learn arabic for kids`, `teaching arabic to a child`, `how to structure arabic lessons for kids`) — high intent, future-proofing, snippet-eligible.
- Add internal links from these pages into the alphabet hub (Phase 3).

---

## 5. Phase 2 — Printables → Pinterest engine (weeks 1–4) — **the growth lever**

Demand is explicit in your data: `arabic alphabet tracing`, `arabic letter tracing worksheets pdf`, `trace arabic alphabet`, `تلوين الحروف`. Each printable does **double duty**: an indexable SEO landing page **and** a shareable pin that earns backlinks.

1. **Build a printables library** (PDF + landing page each):
   - 28 letter tracing sheets (isolated + 4 forms, dotted-guide).
   - Color flashcards / coloring pages.
   - "First words" picture flashcards.
   - Bundles ("Arabic Alphabet Starter Pack PDF") — bundles are the most-pinned, most-linked unit.
2. **Auto-generate 1000×1500 vertical pin images** from each printable (same headless-Chrome render pipeline used for og-image — I script this).
3. **Pinterest setup:** business account, claim the domain, enable **Rich Pins**, board structure ("Learn Arabic for Kids," "Arabic Alphabet Printables," "Arabic Colors"). One-time setup with you.
4. **Cadence:** steady pinning (you post, or we wire a scheduler). Printables get downloaded → embedded by homeschool/Muslim-parenting blogs → **backlinks = the authority that lifts everything else.**

_Split:_ I build all printables, pages, and pin images. You own the Pinterest account actions (claim, post) — I'll give you a ready-to-paste pin queue.

---

## 6. Phase 3 — Topical authority on the alphabet cluster (weeks 2–8)

Lifts the 1,152-impression page from pos 59.

- Make the guide **the definitive resource**: every letter with all forms (isolated/initial/medial/final — `arabic alphabet in all forms`, `beginning middle and end`), audio, an example word, a mnemonic, and a link to its tracing printable.
- **Hub-and-spoke:** guide → 28 letter sections/pages → colors / words / tracing. Internal links concentrate authority on the hub.
- Target the indexed long-tails you already get impressions for: `in order`, `a to z`, `letter names`, `how many letters`.

---

## 7. Phase 4 — Links & distribution (continuous)

- Pitch the free interactive play/coloring tools + printables to "best resources to teach kids Arabic" roundups, homeschool resource lists, Muslim-parenting blogs.
- Value-first posts in r/homeschool, language/parenting communities when genuinely relevant.
- Goal: a handful of real editorial backlinks/quarter — that's what moves a new domain off page 5.

---

## 8. Reality check — timeline & KPIs

| Horizon | Expect |
|---|---|
| 2–6 weeks | First sustained click growth from Phase 1 long-tails + early printables/Pinterest traffic |
| 2–3 months | Colors/words "for kids" cluster on page 1 top-5; printables pages indexed & getting Pinterest referrals; first backlinks |
| 6–12 months | Alphabet guide breaks page 1 for the head term (it's competitive — Wikipedia, Busuu, Madinah Arabic) |

**Track monthly in GSC:** position of `/learn/arabic-alphabet-guide`, CTR of the colors cluster, total clicks, # referring domains. Re-export and compare to this baseline (11 clicks / ~1,983 impressions / pos ~50).

**Honest expectations:** the head term "arabic alphabet" is a 6–12 month authority play — don't judge success by it early. Judge by the long-tail clicks and Pinterest referrals, which should move fast.

---

## 9. Decisions locked

- ✅ Keep brand **Arab Fingers**, niche (Arabic-for-kids), and **Next.js/Vercel** stack — no rebuild, no pivot.
- ✅ Growth engine = **printables → Pinterest**.
