import { describe, expect, it } from "vitest";
import { animalsData, colorsData, numbersData, worksheetSets } from "@/lib/worksheets";

describe("worksheet pack data", () => {
  it("has unique, URL-safe ids", () => {
    const ids = worksheetSets.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("declares exactly one bundle whose page count equals the sum of the others", () => {
    const bundles = worksheetSets.filter((s) => s.bundle);
    expect(bundles).toHaveLength(1);
    const others = worksheetSets.filter((s) => !s.bundle);
    expect(bundles[0].pages).toBe(others.reduce((sum, s) => sum + s.pages, 0));
  });

  it("carries both languages everywhere users see copy", () => {
    for (const s of worksheetSets) {
      expect(s.titleEn.length).toBeGreaterThan(0);
      expect(s.titleAr.length).toBeGreaterThan(0);
      expect(s.descAr.length).toBeGreaterThan(0);
      expect(s.ageAr.length).toBeGreaterThan(0);
    }
  });
});

describe("teaching datasets", () => {
  it("numbers run 1–10 with matching eastern/western digits", () => {
    expect(numbersData.map((n) => n.en)).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(numbersData.every((n) => n.arName && n.translit)).toBe(true);
  });

  it("colors cover six distinct shapes", () => {
    expect(colorsData).toHaveLength(6);
    expect(new Set(colorsData.map((c) => c.shape)).size).toBe(6);
  });

  it("animals ship a bilingual fact per animal", () => {
    expect(animalsData).toHaveLength(8);
    expect(animalsData.every((a) => a.factEn && a.factAr)).toBe(true);
    expect(new Set(animalsData.map((a) => a.shape)).size).toBe(8);
  });
});
