import { describe, expect, it } from "vitest";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import { themeNames } from "@/lib/themes";
import { keyboardLayouts } from "@/lib/keyboardLayouts";

/**
 * next-intl falls back to the key name when a translation is missing, so a key
 * that exists in en.json but not ar.json silently renders English text inside
 * the Arabic UI — the exact class of bug only a reader of both languages would
 * catch. This test makes key drift impossible to merge.
 */
describe("translation files", () => {
  function flatten(obj: Record<string, unknown>, prefix = ""): string[] {
    return Object.entries(obj).flatMap(([k, v]) =>
      typeof v === "object" && v !== null ? flatten(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`],
    );
  }

  it("en and ar expose exactly the same keys", () => {
    const enKeys = flatten(en).sort();
    const arKeys = flatten(ar).sort();
    expect(arKeys).toEqual(enKeys);
  });

  it("has no empty translations", () => {
    for (const [file, msgs] of [["en", en], ["ar", ar]] as const) {
      for (const value of Object.values(msgs)) {
        if (typeof value === "string") {
          expect(value.trim().length, `${file}: empty value found`).toBeGreaterThan(0);
        }
      }
    }
  });

  // en↔ar parity cannot catch a key missing from BOTH files — that happened
  // with theme_daylight, which rendered the literal key in the theme selector
  // for the default theme. Cross-check code-derived key families instead.
  it("has a translation for every theme name", () => {
    for (const name of themeNames) {
      expect(en, `en: missing theme_${name}`).toHaveProperty(`theme_${name}`);
      expect(ar, `ar: missing theme_${name}`).toHaveProperty(`theme_${name}`);
    }
  });

  it("has a translation for every keyboard layout label", () => {
    for (const layout of keyboardLayouts) {
      expect(en, `en: missing ${layout.labelKey}`).toHaveProperty(layout.labelKey);
      expect(ar, `ar: missing ${layout.labelKey}`).toHaveProperty(layout.labelKey);
    }
  });
});
