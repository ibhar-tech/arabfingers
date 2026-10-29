// lib/letterWorksheets.ts
//
// Per-letter worksheet landing pages: /printables/letters/[letter] (28 URLs x 2
// locales). Everything here derives from letterGuide so the teaching content
// has exactly one source of truth.
//
// Why these pages exist (Search Console, May–Aug 2026): 91% of clicks land on
// /printables for pack-level queries, while letter-level queries ("arabic
// letter ba worksheet", "letter thaa tracing") have no URL to answer them.
// Competitors (belarabyapps ~60 posts, iqragames 28 numbered PDFs) rank with
// exactly this one-page-per-letter structure. Our audience is English-first —
// titles and metadata target English-speaking parents/teachers, with the Arabic
// name and transliteration always visible on the page.
//
// Imported by the app AND scripts/build-worksheets.mjs (Node TS stripping):
// keep it plain data over letterGuide and letterDots — no other imports.

import { letterGuide, type LetterGuideEntry } from "./letterGuide";
import { dotsPhrase, letterDots } from "./letterDots";

/** Letters that only join to the letter before them (no initial/medial form). */
const RIGHT_JOINING_ONLY = new Set(["ا", "د", "ذ", "ر", "ز", "و"]);

/** Mirrors the ZWJ shaping logic in the PDF generator's letterForms(). */
export function letterFormsOf(entry: LetterGuideEntry) {
  const ch = entry.ar;
  const only = RIGHT_JOINING_ONLY.has(ch);
  // ZWJ makes Chrome/the browser shape the glyph into its contextual form.
  const ZWJ = "‍";
  return [
    { en: "Alone", ar: "منفرد", glyph: ch, joins: true },
    { en: "Start", ar: "أول", glyph: only ? ch : ch + ZWJ, joins: !only },
    { en: "Middle", ar: "وسط", glyph: only ? ZWJ + ch : ZWJ + ch + ZWJ, joins: !only },
    { en: "End", ar: "آخر", glyph: ZWJ + ch, joins: true },
  ];
}

/** One sentence on the letter's dots, in each language ("نقطة حرف الجيم"
    had impressions in Oct 2026 with no page stating the answer). */
export function letterDotsOf(entry: LetterGuideEntry) {
  const p = dotsPhrase(entry.ar);
  return letterDots(entry.ar)
    ? { en: `${entry.enName} (${entry.ar}) has ${p.en} it.`, ar: `حرف ال${entry.arName} (${entry.ar}) ${p.ar}.` }
    : { en: `${entry.enName} (${entry.ar}) has no dots.`, ar: `حرف ال${entry.arName} (${entry.ar}) ليس له نقاط.` };
}

export type LetterWorksheetPage = {
  /** URL segment + PDF basename: "ba" → /printables/letters/ba. */
  slug: string;
  /** Index in the alphabet, 0-based. */
  index: number;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescEn: string;
  seoDescAr: string;
  keywords: string[];
  faq: { qEn: string; aEn: string; qAr: string; aAr: string }[];
};

function letterPage(entry: LetterGuideEntry, index: number): LetterWorksheetPage {
  const dots = letterDotsOf(entry);
  return {
    slug: slugFor(entry),
    index,
    seoTitleEn: `Arabic Letter ${entry.enName} (${entry.ar}) Worksheet — Free Tracing PDF`,
    seoTitleAr: `حرف ال${entry.arName} (${entry.ar}) بأشكاله الأربعة — ورقة كتابة وتتبّع PDF مجانية`,
    seoDescEn:
      `Free one-page ${entry.enName} (${entry.ar}) tracing worksheet: the letter large in Naskh, ` +
      `its four joined forms, graded tracing rows and ${entry.examples.length} words to trace. ` +
      `Pronounced "${entry.translit}". No email, no signup.`,
    seoDescAr:
      `ورقة مجانية لكتابة وتتبّع حرف ${entry.arName} (${entry.ar}): الحرف كبيراً بخط النسخ، وأشكاله الأربعة ` +
      `(أول ووسط وآخر ومنفرد)، وصفوف تتبّع متدرّجة، وكلمات للتتبّع. ${dots.ar} بلا بريد إلكتروني وبلا تسجيل.`,
    keywords: [
      `arabic letter ${entry.enName.toLowerCase()} worksheet`,
      `${entry.enName.toLowerCase()} arabic letter tracing`,
      `arabic letter ${entry.ar} worksheet pdf`,
      `how to write ${entry.enName.toLowerCase()} in arabic`,
      `arabic ${entry.enName.toLowerCase()} tracing sheet`,
    ],
    faq: [
      {
        qEn: `How do you pronounce the Arabic letter ${entry.enName} (${entry.ar})?`,
        aEn: `${entry.soundHowToEn} ${entry.comparisonEn}`,
        qAr: `كيف يُنطق حرف ${entry.arName}؟`,
        aAr: entry.soundHowToAr,
      },
      {
        qEn: `How many dots does the Arabic letter ${entry.enName} (${entry.ar}) have?`,
        aEn: dots.en,
        qAr: `كم نقطة في حرف ال${entry.arName}؟`,
        aAr: dots.ar,
      },
      {
        qEn: `What is the most common mistake with ${entry.enName}?`,
        aEn: entry.mistakeEn,
        qAr: `ما الخطأ الشائع في حرف ${entry.arName}؟`,
        aAr: entry.mistakeAr,
      },
      {
        qEn: `How should I use this ${entry.enName} worksheet with my child?`,
        aEn:
          `Start by tracing the grey letters with a finger — saying "${entry.translit}" out loud each time — ` +
          `then move to pencil on the dotted row, and finish with the empty boxes. ${entry.parentTipEn}`,
        qAr: `كيف أستعمل ورقة حرف ${entry.arName} مع طفلي؟`,
        aAr: `ابدأ بالتتبّع بالإصبع مع نطق اسم الحرف في كل مرّة، ثم بالقلم على الصف المنقّط، وأنهِ بالمربّعات الفارغة. ${entry.parentTipAr}`,
      },
    ],
  };
}

function slugFor(entry: LetterGuideEntry) {
  return entry.enName.toLowerCase();
}

export const letterWorksheetPages: LetterWorksheetPage[] = letterGuide.map((entry, index) =>
  letterPage(entry, index),
);

export function getLetterWorksheetPage(slug: string) {
  return letterWorksheetPages.find((p) => p.slug === slug);
}
