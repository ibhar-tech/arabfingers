// lib/letterDots.ts
//
// How many dots each letter has, and where. Dots are how children tell
// look-alike letters apart (ب ت ث, ح ج خ), so this is shared by the letter
// worksheet pages and the "How many dots?" game. Kept tiny and import-free so
// the game can ship it to the browser without the full letter guide.

export type Dots = { n: 1 | 2 | 3; below: boolean };

/** Letters not listed have no dots. */
const DOTS: Record<string, Dots> = {
  "ب": { n: 1, below: true }, "ت": { n: 2, below: false }, "ث": { n: 3, below: false },
  "ج": { n: 1, below: true }, "خ": { n: 1, below: false }, "ذ": { n: 1, below: false },
  "ز": { n: 1, below: false }, "ش": { n: 3, below: false }, "ض": { n: 1, below: false },
  "ظ": { n: 1, below: false }, "غ": { n: 1, below: false }, "ف": { n: 1, below: false },
  "ق": { n: 2, below: false }, "ن": { n: 1, below: false }, "ي": { n: 2, below: true },
};

export function letterDots(ch: string): Dots | null {
  return DOTS[ch] ?? null;
}

/** "two dots above" / "نقطتان فوقه" — the dots part of a sentence, both languages. */
export function dotsPhrase(ch: string) {
  const d = letterDots(ch);
  if (!d) return { en: "no dots", ar: "ليس له نقاط" };
  return {
    en: `${["", "one dot", "two dots", "three dots"][d.n]} ${d.below ? "below" : "above"}`,
    ar: `له ${["", "نقطة واحدة", "نقطتان", "ثلاث نقاط"][d.n]} ${d.below ? "تحته" : "فوقه"}`,
  };
}

/** Families of letters that share a shape and differ only by their dots. */
export const DOT_FAMILIES: string[][] = [
  ["ب", "ت", "ث"], ["ج", "ح", "خ"], ["د", "ذ"], ["ر", "ز"], ["س", "ش"],
  ["ص", "ض"], ["ط", "ظ"], ["ع", "غ"], ["ف", "ق"],
];
