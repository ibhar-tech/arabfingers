import { getKeyboardLayout, type KeyboardLayoutId } from "./keyboardLayouts";

export type ArabicLetter = {
  ar: string;
  en: string;
  arName: string;
  enName: string;
};

export const arabicLetters: ArabicLetter[] = [
  { ar: "ا", en: "A", arName: "ألف", enName: "Alef" },
  { ar: "ب", en: "B", arName: "باء", enName: "Ba" },
  { ar: "ت", en: "T", arName: "تاء", enName: "Ta" },
  { ar: "ث", en: "TH", arName: "ثاء", enName: "Tha" },
  { ar: "ج", en: "J", arName: "جيم", enName: "Jeem" },
  { ar: "ح", en: "H", arName: "حاء", enName: "Hha" },
  { ar: "خ", en: "KH", arName: "خاء", enName: "Kha" },
  { ar: "د", en: "D", arName: "دال", enName: "Dal" },
  { ar: "ذ", en: "DH", arName: "ذال", enName: "Thal" },
  { ar: "ر", en: "R", arName: "راء", enName: "Ra" },
  { ar: "ز", en: "Z", arName: "زاي", enName: "Zay" },
  { ar: "س", en: "S", arName: "سين", enName: "Seen" },
  { ar: "ش", en: "SH", arName: "شين", enName: "Sheen" },
  { ar: "ص", en: "SS", arName: "صاد", enName: "Sad" },
  { ar: "ض", en: "DD", arName: "ضاد", enName: "Dad" },
  { ar: "ط", en: "TT", arName: "طاء", enName: "Tah" },
  { ar: "ظ", en: "ZZ", arName: "ظاء", enName: "Zah" },
  { ar: "ع", en: "A'", arName: "عين", enName: "Ain" },
  { ar: "غ", en: "GH", arName: "غين", enName: "Ghain" },
  { ar: "ف", en: "F", arName: "فاء", enName: "Fa" },
  { ar: "ق", en: "Q", arName: "قاف", enName: "Qaf" },
  { ar: "ك", en: "K", arName: "كاف", enName: "Kaf" },
  { ar: "ل", en: "L", arName: "لام", enName: "Lam" },
  { ar: "م", en: "M", arName: "ميم", enName: "Meem" },
  { ar: "ن", en: "N", arName: "نون", enName: "Noon" },
  { ar: "ه", en: "Ha", arName: "هاء", enName: "Ha" },
  { ar: "و", en: "W", arName: "واو", enName: "Waw" },
  { ar: "ي", en: "Y", arName: "ياء", enName: "Ya" },
];

// Arabic character aliases (different forms of the same letter)
const arabicAliases: Record<string, string> = {
  "أ": "ا", "إ": "ا", "آ": "ا", "ى": "ي", "ة": "ت",
  "ئ": "ي", "ؤ": "و", "ء": "ا",
};

// Build the Arabic character → ArabicLetter index (static, layout-independent)
const arabicIndex = new Map<string, ArabicLetter>();

for (const letter of arabicLetters) {
  arabicIndex.set(letter.ar, letter);
}

for (const [alias, canonical] of Object.entries(arabicAliases)) {
  const letter = arabicIndex.get(canonical);
  if (letter) {
    arabicIndex.set(alias, letter);
  }
}

// Build a latin key → ArabicLetter index for a given keyboard layout
function buildLatinIndex(layoutId: KeyboardLayoutId): Map<string, ArabicLetter> {
  const layout = getKeyboardLayout(layoutId);
  const index = new Map<string, ArabicLetter>();

  for (const [key, arChar] of Object.entries(layout.mapping)) {
    // Try direct match first, then alias
    const letter = arabicIndex.get(arChar);
    if (letter && !index.has(key)) {
      index.set(key, letter);
    }
  }

  return index;
}

// Cache built indexes
const latinIndexCache = new Map<KeyboardLayoutId, Map<string, ArabicLetter>>();

function getLatinIndex(layoutId: KeyboardLayoutId): Map<string, ArabicLetter> {
  let index = latinIndexCache.get(layoutId);
  if (!index) {
    index = buildLatinIndex(layoutId);
    latinIndexCache.set(layoutId, index);
  }
  return index;
}

export function isArabicCharacter(value: string) {
  return /^[\u0600-\u06ff]$/u.test(value);
}

export function isMappedKey(value: string, layoutId: KeyboardLayoutId) {
  return getLatinIndex(layoutId).has(value.toLowerCase());
}

export function findArabicLetterByArabicChar(value: string) {
  return arabicIndex.get(value);
}

export function findArabicLetterByKey(value: string, layoutId: KeyboardLayoutId) {
  return getLatinIndex(layoutId).get(value.toLowerCase());
}

export function getRandomArabicLetter() {
  return arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
}
