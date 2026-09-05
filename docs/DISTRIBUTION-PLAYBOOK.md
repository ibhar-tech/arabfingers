# Arab Fingers — Distribution Playbook (Phase 2 + 4)

_The off-site engine. Code can't earn backlinks or shares — this is the part **you** run. Ready-made pins live in `public/pins/`. Regenerate/extend with `node scripts/generate-pins.mjs`._

Your audience (from GSC): **English-speaking parents in the US, UK, Canada, Australia, Germany, Netherlands, Sweden** plus the Gulf (UAE, Saudi). They are homeschoolers, diaspora Muslim/Arab families, and converts. **They live on Pinterest.** That is the lever.

---

## 1. Pinterest setup (one-time, ~30 min)

1. Create a **Pinterest Business account** (free) at pinterest.com/business/create.
2. **Claim your website** (Settings → Claimed accounts → claim `arabfingers.site`). This unlocks analytics and attributes every pin's link to you — critical for the backlink/authority signal.
3. Enable **Rich Pins** (validate any article URL at the Rich Pin Validator; your pages already have Open Graph tags so this works out of the box).
4. Create these **boards** (keyword-named — Pinterest is a search engine):

| Board name | Description (paste in) |
|---|---|
| Learn Arabic for Kids | Free, playful ways to teach children the Arabic alphabet, words, colors and numbers. |
| Arabic Alphabet Printables | Free printable Arabic letter tracing worksheets and practice sheets for kids. |
| Arabic for Toddlers | Simple first Arabic words, sounds and activities for ages 1–6. |
| Arabic Colors & Numbers | Teach colors and numbers in Arabic with pronunciation and games. |
| Homeschool Arabic | Resources, routines and tips for teaching Arabic at home. |
| Arabic Coloring Pages | Free printable Arabic coloring books for kids — animals, fruits, Ramadan, alphabet bubbles. New PDF every month. |
| Arabic Kids Stories | Original illustrated Arabic stories with English translation — read online or download the free PDF. |

---

## 2. Pins — what to post

6 ready pins are in `public/pins/` (`home`, `play`, `alphabet-guide`, `colors`, `first-words`, `printables`). Each is 1000×1500, links to the matching page.

**Pin inventory:** 17 ready pins in `public/pins/` (1000×1500, each linking to its page). Regenerate any time with `node scripts/generate-pins.mjs`.

**Pin description formula** (keyword-rich — the only SEO that matters on Pinterest) — title + value + keywords + link CTA. Descriptions per pin:

| Pin | Board | Paste this description |
|---|---|---|
| `home.png` | Learn Arabic for Kids | Teach your kids the Arabic alphabet the fun way! Free bilingual game — all 28 Arabic letters with real pronunciation, ages 1–6. ▶ arabfingers.site #arabicforkids #learnarabic #homeschool #muslimkids |
| `play.png` | Arabic for Toddlers | Free online Arabic letters game for kids. Tap a letter, hear it, learn it — toddlers love it. #arabicalphabet #toddlerlearning #arabicforkids |
| `alphabet-guide.png` | Learn Arabic for Kids | All 28 Arabic letters with pronunciation, example words, and the mistakes kids make — a complete free parent guide. #arabicalphabet #learnarabic #homeschoolarabic |
| `colors.png` | Arabic Colors & Numbers | Learn 12 colors in Arabic for kids — pronunciation, nature examples and a color-hunt game. #arabicforkids #arabicvocabulary |
| `first-words.png` | Arabic for Toddlers | 25 first Arabic words every child should know — family, animals, food & everyday words. #arabicforkids #toddlerarabic #bilingualkids |
| `printables.png` | Arabic Alphabet Printables | FREE printable Arabic alphabet tracing worksheets (PDF). All 28 letters, no signup. #arabicprintables #tracingworksheets #homeschool |
| `coloring-animals.png` | Arabic Coloring Pages | Free Arabic animals coloring book PDF — 8 animals to colour with names to trace in Arabic & English. #arabiccoloringpages #muslimkidsactivities #arabicforkids |
| `coloring-fruits-vegetables.png` | Arabic Coloring Pages | Fruits & vegetables coloring pages with Arabic names — free printable PDF for kids. #arabiccoloringpages #fruitcoloring #homeschoolarabic |
| `coloring-transport.png` | Arabic Coloring Pages | Cars, trains & planes coloring pages with Arabic names — free printable PDF. #vehiclescoloring #arabicforkids #coloringpages |
| `coloring-solar-system.png` | Arabic Coloring Pages | Solar system coloring pages in Arabic — sun, moon, Saturn & rocket. Free printable PDF. #solarsystem #spacecoloring #arabicforkids |
| `coloring-alphabet.png` | Arabic Alphabet Printables | 28 bubble-letter coloring pages — one giant Arabic letter per page with example words. Free PDF. #alphabetcoloring #arabicalphabet #bubbleletters |
| `coloring-ramadan.png` | Arabic Coloring Pages (+ Ramadan boards) | FREE Ramadan coloring pages in Arabic — lantern, mosque, crescent, dates. Printable PDF for kids. #ramadancrafts #ramadanforkids #ramadanactivities |
| `coloring-sea-animals.png` | Arabic Coloring Pages | Sea animals coloring pages with Arabic names — whale, octopus, turtle. Free printable PDF. #oceananimals #seacoloring #arabicforkids |
| `coloring-body-parts.png` | Arabic for Toddlers | My Body in Arabic — coloring pages for head, eye, hand & foot with name tracing. Free PDF. #bodyparts #arabicvocabulary #toddleractivities |
| `coloring-seasons.png` | Arabic Coloring Pages | The four seasons in Arabic — one tree through spring, summer, autumn & winter. Free coloring PDF. #fourseasons #seasonscrafts #arabicforkids |
| `coloring-opposites.png` | Arabic for Toddlers | Arabic opposites coloring pages — big & small, day & night, side by side. Free printable PDF. #opposites #arabicworksheets #earlylearning |
| `stories.png` | Arabic Kids Stories | Original illustrated Arabic bedtime stories with full English translation — read online or download the free PDF. #arabicstories #bedtimestories #muslimkids |

**Priority order for a new account:** start with the coloring-book pins (`coloring-*`) — printable coloring content is the strongest-performing niche on family Pinterest — then `stories.png`, then the older six.

**Cadence:** 3–5 pins/week. Re-pin the same pin to different boards over time, and make seasonal variants (Ramadan, back-to-school, Eid) by adding entries to `PINS` in `scripts/generate-pins.mjs`. Consistency > volume. A free scheduler (Pinterest's native scheduler, or Tailwind) lets you queue a month in 20 min.

**Idea pins / video:** a 5–10s screen capture of the play page (tap a letter → it animates + speaks) posted as an Idea Pin reaches far more people than static pins. Optional, high upside.

---

## 3. Backlinks — the authority lever (do ~1–2/month)

A backlink from a real parenting/homeschool site is worth more than 1,000 pins for ranking. Targets that publish "best resources" roundups and accept submissions/pitches:

- **Homeschool resource roundups:** search `"learn arabic" "for kids" (resources OR apps OR websites)` and `homeschool arabic curriculum free` — most listicles have a "submit your resource" link or an author to email.
- **Muslim parenting blogs & directories** (e.g. sites listing kids' Islamic/Arabic apps). Pitch the free game + free printables.
- **Free-printables aggregators** (these link generously to free PDF resources).
- **"Best apps to learn Arabic for kids"** listicles — email the author; you're a genuine free option they're missing.
- **HARO / Help a B2B Writer / Qwoted:** answer journalist queries about kids' language learning; earns editorial links.

**Pitch template (email):**

> Subject: Free Arabic-alphabet resource for your [topic] list
>
> Hi [name], I built Arab Fingers (arabfingers.site) — a free, no-ads game + printable worksheets that teach kids the Arabic alphabet (all 28 letters, real pronunciation, bilingual). It's genuinely free with no signup, so it might be a useful addition to your [article title]. Happy to send printables or a quick demo. Thanks for considering!

---

## 4. Communities (value-first, never spammy)

Post helpful answers; link only when it genuinely helps. Sporadic, not daily.

- Reddit: r/homeschool, r/Muslim, r/islamparenting, r/arabs (language threads), r/languagelearning (kids).
- Facebook groups: "Homeschooling Muslims", "Raising Bilingual Children", diaspora-Arabic parenting groups.
- When someone asks "how do I teach my kid the Arabic alphabet?" — answer properly, then mention the free tool.

---

## 5. 30-day starter checklist

- [ ] Phase 0 dashboard tasks: Vercel apex→www **308**; GSC **Domain property**; Request Indexing on home/colors/first-words/alphabet-guide/play/printables.
- [ ] Pinterest business account + claim site + Rich Pins + 5 boards.
- [ ] Pin all 6 starter pins with the descriptions above; schedule 3–5/week.
- [ ] Record one 8-second play-page clip → Idea Pin.
- [ ] Send 4 backlink pitches (roundups/blogs).
- [ ] Answer 3 relevant community questions.
- [ ] Re-export GSC after 30 days; compare clicks/impressions/position to the baseline in `SEO-GROWTH-PLAN.md` (11 clicks / ~1,983 imp / pos ~50).

---

## 6. Future on-site upgrades (when traffic justifies the effort)

- Individual letter pages (`/learn/letters/alef` …) — only if the single guide plateaus; thin pages can hurt, so split sparingly and keep each genuinely rich.
- Real downloadable PDFs (vs print-the-screen) so aggregators can host/link the file directly.
- Seasonal printable packs (Ramadan, Eid, back-to-school) — each is a fresh pin + indexable page.
