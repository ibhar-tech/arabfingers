import { describe, expect, it } from "vitest";
import {
  arabicLetters,
  findArabicLetterByArabicChar,
  findArabicLetterByKey,
  getRandomArabicLetter,
  isArabicCharacter,
  isMappedKey,
} from "@/lib/arabicMap";
import { keyboardLayouts } from "@/lib/keyboardLayouts";

describe("arabicLetters", () => {
  it("contains exactly the 28 letters with unique glyphs and sound ids", () => {
    expect(arabicLetters).toHaveLength(28);
    expect(new Set(arabicLetters.map((l) => l.ar)).size).toBe(28);
    expect(new Set(arabicLetters.map((l) => l.soundId)).size).toBe(28);
    for (const l of arabicLetters) {
      expect(l.ar).toMatch(/^[\u0600-\u06ff]$/u);
      expect(l.enName.length).toBeGreaterThan(0);
    }
  });
});

describe("isArabicCharacter", () => {
  it("accepts single Arabic letters only", () => {
    expect(isArabicCharacter("ب")).toBe(true);
    expect(isArabicCharacter("a")).toBe(false);
    expect(isArabicCharacter("1")).toBe(false);
  });
});

describe("findArabicLetterByArabicChar aliases", () => {
  it("resolves hamza forms to their base letters", () => {
    expect(findArabicLetterByArabicChar("أ")?.ar).toBe("ا");
    expect(findArabicLetterByArabicChar("إ")?.ar).toBe("ا");
    expect(findArabicLetterByArabicChar("ء")?.ar).toBe("ا");
    expect(findArabicLetterByArabicChar("ئ")?.ar).toBe("ي");
    expect(findArabicLetterByArabicChar("ؤ")?.ar).toBe("و");
    expect(findArabicLetterByArabicChar("ة")?.ar).toBe("ت");
  });

  it("returns undefined for non-letters", () => {
    expect(findArabicLetterByArabicChar("x")).toBeUndefined();
  });
});

describe("keyboard layouts reach every letter", () => {
  // The store defaults to the phonetic layout because its mapping is claimed to
  // cover all 28 letters. This invariant is why that claim holds — if someone
  // edits lib/keyboardLayouts.ts and drops a letter, this fails.
  it("phonetic layout maps a key for each of the 28 letters", () => {
    const reached = new Set(
      arabicLetters
        .map((letter) =>
          [...Array(36).keys()]
            .map((i) => (i < 26 ? String.fromCharCode(97 + i) : [",", ";", ".", "/"][i - 26]))
            .find((key) => findArabicLetterByKey(key, "arabic-phonetic") === letter),
        ),
    );
    expect(reached.size).toBe(28);
  });

  it("every declared layout resolves mapped keys through the alias table without collisions", () => {
    for (const layout of keyboardLayouts) {
      for (const [key, arChar] of Object.entries(layout.mapping)) {
        // A mapping value must resolve either directly or via an alias; "لا"
        // (lam-alef ligature) is the known exception on standard/AZERTY.
        if (arChar === "لا") continue;
        expect(isMappedKey(key, layout.id), `${layout.id}:${key}`).toBe(true);
      }
    }
  });

  it("is case-insensitive on latin keys", () => {
    expect(findArabicLetterByKey("B", "arabic-phonetic")?.ar).toBe("ب");
  });
});

describe("getRandomArabicLetter", () => {
  it("always returns one of the 28", () => {
    for (let i = 0; i < 200; i++) {
      expect(arabicLetters).toContain(getRandomArabicLetter());
    }
  });
});
