# ArabFingers Quality Overhaul for AdSense Re-Review — Design

**Date:** 2026-06-11
**Status:** Approved by user
**Context:** Second AdSense rejection for "Low value content" (June 2026), after the May 2026
fixes (cloaking removal, EEAT, content-first homepage). Search Console is verified, the
sitemap is submitted, and most pages are indexed — the rejection was issued against the
fully deployed current site, so the problem is genuine perceived content value, not
indexing or stale snapshots.

## Diagnosis (live-site audit, June 2026)

1. **Interactive lessons render as dead space without JavaScript.** The science players
   show empty chrome ("Scene 1/9", "0:00") at first paint. The site's core value is
   invisible to a reviewer/crawler, leaving ~400–500 words of text per science page.
2. **Content is template-shallow.** The alphabet guide gives each letter 2–3 generic
   sentences ("Pronounced like English B"); no pronunciation depth, examples, mistakes,
   or parent guidance.
3. **/ar pages are partial translations.** Letter descriptions and other teaching content
   remain in English on Arabic routes — roughly half of the ~62 indexed URLs look
   thin/duplicate.
4. **Emoji used as illustrations** across pages; no real graphics besides the Dr. Hakim /
   Anas SVG cartoon characters inside the players.
5. Article body text is small and low-contrast (`text-xs text-white/50` patterns).

## Approach decision

**Quality-first overhaul of existing pages only.** No new URLs until after approval —
AdSense judges what exists, and ~31 deep, polished, fully bilingual pages beat more
average ones. New-content expansion is a post-approval follow-up.

Rejected alternatives:
- *Overhaul + new content*: slower; new pages start unindexed and don't help the review.
- *Minimal mechanical fix* (SSR + translations only): reviewer explicitly cited content
  value; high risk of a third rejection.

## Pillar 1 — Simulations visible instantly

The 4 players (`GravityInteractive`, `WaterCycleInteractive`, `SolarSystemInteractive`,
`StatesOfMatterInteractive` in `components/StatesOfMatter/`) must render a complete
**poster scene** on the server's initial HTML: Dr. Hakim + Anas characters, scene-1 title
and dialogue, and a prominent play button. No mounted-gate may return blank/skeleton
space. Loading states show the poster, not bare chrome.

**Acceptance:** `curl` (no-JS HTML) of each science page in both locales contains the
characters' SVG, scene-1 dialogue text, and the full transcript.

## Pillar 2 — Content depth

- **Alphabet guide:** new structured data module `lib/letterGuide.ts`. Per letter, in
  BOTH languages: how to produce the sound (mouth position), nearest English sound and
  how it differs, 2–3 example words (Arabic script + transliteration + meaning), one
  common learner mistake, one parent tip. ~+2,500 words per locale of real teaching
  content. The guide page renders from this module.
- **4 science pages:** standalone article below each player: kid-level explainer,
  "see it in your home" real-world examples, a safe home experiment, a 4–6 question FAQ,
  and a mini-glossary. Target 900–1,200 words per locale per page.
  **Constraint: recorded voiceover transcripts must not be edited** — they are synced to
  the premium generated audio. Expand around them.
- **Remaining 9 learn guides + 5 blog posts:** audit each; deepen the weakest sections.
- **Readability pass:** article body text to `text-sm`/`text-base` with `white/80`+
  contrast on dark backgrounds.

## Pillar 3 — Genuinely Arabic /ar pages

All teaching content gets real Arabic-medium fields (the `letterGuide` module carries
both languages; science articles and guide sections are authored in both). Then a full
sweep of every `/ar` route for English leakage — Arabic pages must teach in Arabic.

## Pillar 4 — SVG illustration system

Design language: the existing Dr. Hakim / Anas cartoon style (rounded, kid-friendly).

- **Science diagrams** (also used as Pillar-1 posters): labeled water-cycle circle,
  solar-system lineup, states-of-matter particle trio, gravity falling-objects.
- **28 letter cards:** consistent SVG card per letter — big letter, name, example word
  with a simple icon.
- **Category icons** for the homepage and learn hub where emoji currently serves as the
  illustration. Small emoji accents remain where tasteful.

## Explicitly unchanged

- `components/AdSlot.tsx` keeps rendering nothing until post-approval slot IDs.
- `/play`, `/coloring`, `/printables` stay ad-free; their toys are untouched.
- Recorded voiceover audio and their transcripts.
- No new URLs / sitemap entries.

## Verification & post-deploy steps

1. Production build passes; no-JS `curl` audit of every changed page in `en` and `ar`.
2. Deploy to www.arabfingers.site.
3. Search Console: request recrawl of key pages.
4. Wait ~1–2 weeks for re-indexing, then re-request AdSense review.
