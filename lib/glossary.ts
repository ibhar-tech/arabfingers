// lib/glossary.ts
//
// One assembled word list, derived from data the site already holds — the letter
// guide's example words, plus the colours, numbers and animals used in the
// worksheets. Nothing here is authored twice: change a word in letterGuide.ts and
// the glossary changes with it.
//
// Why it exists: in the three months to 18 Aug 2026, Search Console recorded 154
// queries asking what an Arabic word means — "burtuqaali meaning" alone drew 44
// impressions at position 7.1 — and every one of them returned ZERO clicks. The
// site was ranking for those questions without answering them anywhere.
//
// Deliberately ONE page rather than a page per word. ~100 pages of 150 words each
// is the scaled-thin-content pattern, and this site has already been refused
// AdSense once for "low value content". A single dense reference page is both
// safer and more useful to a parent scanning for a word.

import { letterGuide } from "./letterGuide";
import { colorsData, numbersData, animalsData } from "./worksheets";

export type GlossaryEntry = {
  /** Arabic script. */
  ar: string;
  /** Latin transliteration — the form people actually type into Google. */
  translit: string;
  meaningEn: string;
  meaningAr: string;
  emoji: string;
  category: "colours" | "numbers" | "animals" | "everyday";
  /** Stable anchor id, e.g. "burtuqaali". */
  slug: string;
};

export type GlossaryCategory = {
  id: GlossaryEntry["category"];
  titleEn: string;
  titleAr: string;
  blurbEn: string;
  blurbAr: string;
  entries: GlossaryEntry[];
};

/** Latin-safe anchor from a transliteration ("ʿusfuur" -> "usfuur"). */
function toSlug(translit: string): string {
  return translit
    .toLowerCase()
    .replace(/[ʿʾ'’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* The letter guide's meanings carry teaching notes in brackets — "door (alif in
   the middle)" — which belong on that page and not in a word list. Strip only the
   notes that are about letter position, keep genuine disambiguation like
   "orange (fruit)". */
const NOTE = /\((?=[^)]*\b(?:alif|alef|letter|middle|end|beginning|initial|medial|final|form|shape|sound)\b)[^)]*\)/gi;
function cleanMeaning(m: string): string {
  return m.replace(NOTE, "").replace(/\s{2,}/g, " ").trim();
}

const everyday: GlossaryEntry[] = (() => {
  const seen = new Set<string>();
  const out: GlossaryEntry[] = [];
  for (const letter of letterGuide) {
    for (const ex of letter.examples) {
      if (seen.has(ex.word)) continue;
      seen.add(ex.word);
      out.push({
        ar: ex.word,
        translit: ex.translit,
        meaningEn: cleanMeaning(ex.meaningEn),
        meaningAr: ex.meaningAr,
        emoji: ex.emoji,
        category: "everyday",
        slug: toSlug(ex.translit),
      });
    }
  }
  return out;
})();

const colours: GlossaryEntry[] = colorsData.map((c) => ({
  ar: c.ar,
  translit: c.translit,
  meaningEn: c.en.toLowerCase(),
  meaningAr: c.ar,
  emoji: "🎨",
  category: "colours",
  slug: toSlug(c.translit),
}));

const numbers: GlossaryEntry[] = numbersData.map((n) => ({
  ar: n.arName,
  translit: n.translit,
  meaningEn: `${n.enName.toLowerCase()} (${n.en})`,
  meaningAr: `${n.arName} (${n.ar})`,
  emoji: "🔢",
  category: "numbers",
  slug: toSlug(n.translit),
}));

const animals: GlossaryEntry[] = animalsData.map((a) => ({
  ar: a.ar,
  translit: a.translit,
  meaningEn: a.en.toLowerCase(),
  meaningAr: a.ar,
  emoji: "🐾",
  category: "animals",
  slug: toSlug(a.translit),
}));

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "colours",
    titleEn: "Colours",
    titleAr: "الألوان",
    blurbEn:
      "Arabic colour words are adjectives, so they change ending to match what they describe — أحمر for a masculine noun, حمراء for a feminine one. The form below is the one a child learns first and the one they will hear pointed at a red car.",
    blurbAr:
      "أسماء الألوان في العربية صفات، فتتغيّر نهايتها بحسب الموصوف: أحمر للمذكّر وحمراء للمؤنّث. والصيغة أدناه هي التي يتعلّمها الطفل أوّلاً ويسمعها مشاراً بها إلى سيّارة حمراء.",
    entries: colours,
  },
  {
    id: "numbers",
    titleEn: "Numbers 1–10",
    titleAr: "الأرقام ١–١٠",
    blurbEn:
      "The numeral and the word for it are two separate things to learn. ٣ is the shape; ثلاثة (thalaatha) is what you say. Children usually get the words long before the shapes.",
    blurbAr:
      "الرقم واسمه شيئان يُتعلَّمان على انفصال: ٣ هو الشكل، و«ثلاثة» هو ما تقوله. والأطفال يتقنون الأسماء قبل الأشكال بمدّة عادةً.",
    entries: numbers,
  },
  {
    id: "animals",
    titleEn: "Animals",
    titleAr: "الحيوانات",
    blurbEn:
      "Animal names are the fastest vocabulary to make stick, because a child already knows the thing and is only learning a second label for it.",
    blurbAr:
      "أسماء الحيوانات أسرع المفردات ثباتاً، لأنّ الطفل يعرف المسمّى أصلاً وإنّما يتعلّم له اسماً ثانياً.",
    entries: animals,
  },
  {
    id: "everyday",
    titleEn: "Everyday words",
    titleAr: "كلمات يومية",
    blurbEn:
      "The example words from the alphabet guide — one or two for every letter, chosen so that each letter arrives attached to something a child can picture rather than as an abstract shape.",
    blurbAr:
      "كلمات الأمثلة من دليل الأبجدية — كلمة أو كلمتان لكلّ حرف، اختيرت ليأتي الحرف مقترناً بشيء يتصوّره الطفل لا شكلاً مجرّداً.",
    entries: everyday,
  },
];

export const glossaryCount = glossaryCategories.reduce(
  (n, c) => n + c.entries.length,
  0,
);
