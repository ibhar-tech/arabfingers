export type KeyboardLayoutId = "arabic-standard" | "arabic-phonetic" | "arabic-azerty";

export type KeyboardLayout = {
  id: KeyboardLayoutId;
  labelKey: string;
  mapping: Record<string, string>;
};

// Standard Arabic QWERTY layout (Windows/Linux)
// Physical key → Arabic character
const arabicStandard: KeyboardLayout = {
  id: "arabic-standard",
  labelKey: "layout_standard",
  mapping: {
    q: "ض", w: "ص", e: "ث", r: "ق", t: "ف", y: "غ", u: "ع", i: "ه", o: "خ", p: "ح",
    "[": "ج", "]": "د",
    a: "ش", s: "س", d: "ي", f: "ب", g: "ل", h: "ا", j: "ت", k: "ن", l: "م",
    ";": "ك", "'": "ط",
    z: "ئ", x: "ء", c: "ؤ", v: "ر", b: "لا", n: "ى", m: "ة",
    ",": "و", ".": "ز", "/": "ظ", "`": "ذ",
  },
};

// Phonetic layout — Latin letter maps to its phonetic Arabic equivalent
// Intuitive for English speakers learning Arabic
const arabicPhonetic: KeyboardLayout = {
  id: "arabic-phonetic",
  labelKey: "layout_phonetic",
  mapping: {
    a: "ا", b: "ب", t: "ت", c: "ث", j: "ج", h: "ح", x: "خ",
    d: "د", v: "ذ", r: "ر", z: "ز", s: "س", e: "ش", p: "ص",
    u: "ض", i: "ط", y: "ظ", o: "ع", g: "غ", f: "ف", q: "ق",
    k: "ك", l: "ل", m: "م", n: "ن", w: "ه", ",": "و", ";": "ي",
  },
};

// AZERTY-based Arabic layout (common in North Africa / France)
const arabicAzerty: KeyboardLayout = {
  id: "arabic-azerty",
  labelKey: "layout_azerty",
  mapping: {
    a: "ض", z: "ص", e: "ث", r: "ق", t: "ف", y: "غ", u: "ع", i: "ه", o: "خ", p: "ح",
    q: "ش", s: "س", d: "ي", f: "ب", g: "ل", h: "ا", j: "ت", k: "ن", l: "م",
    m: "ك",
    w: "ئ", x: "ء", c: "ؤ", v: "ر", b: "لا", n: "ى",
    ",": "و", ";": "ة", ".": "ز", "/": "ظ",
  },
};

export const keyboardLayouts: KeyboardLayout[] = [
  arabicStandard,
  arabicPhonetic,
  arabicAzerty,
];

export const keyboardLayoutIds = keyboardLayouts.map((l) => l.id);

export function getKeyboardLayout(id: KeyboardLayoutId): KeyboardLayout {
  return keyboardLayouts.find((l) => l.id === id) ?? arabicStandard;
}
