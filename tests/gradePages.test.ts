import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { gradePages } from "@/lib/gradePages";
import { worksheetSets } from "@/lib/worksheets";
import sitemap from "@/app/sitemap";

describe("grade-level pages", () => {
  const packIds = new Set(worksheetSets.map((s) => s.id));

  it("never shares a slug with a pack, since both live under /printables/[slug]", () => {
    for (const g of gradePages) expect(packIds.has(g.slug), g.slug).toBe(false);
    expect(new Set(gradePages.map((g) => g.slug)).size).toBe(gradePages.length);
  });

  it("lists only packs that exist, each with a preview, without repeats", () => {
    for (const g of gradePages) {
      const ids = g.packs.map((p) => p.id);
      expect(new Set(ids).size, g.slug).toBe(ids.length);
      for (const id of ids) {
        expect(packIds.has(id), `${g.slug} → ${id}`).toBe(true);
        expect(existsSync(`public/printables/previews/${id}.png`), id).toBe(true);
      }
    }
  });

  it("carries both languages for every visible string", () => {
    for (const g of gradePages) {
      expect(g.introAr).toHaveLength(g.introEn.length);
      expect(g.canDoAr).toHaveLength(g.canDoEn.length);
      for (const p of g.packs) expect(p.whyEn && p.whyAr, p.id).toBeTruthy();
      for (const w of g.plan) expect(w.en && w.ar).toBeTruthy();
      for (const f of g.faq) expect(f.qEn && f.qAr && f.aEn && f.aAr).toBeTruthy();
    }
  });

  it("is in the sitemap in both locales", () => {
    const urls = new Set(sitemap().map((e) => e.url));
    for (const g of gradePages) {
      for (const l of ["en", "ar"]) expect(urls.has(`https://www.arabfingers.site/${l}/printables/${g.slug}`), `${l}/${g.slug}`).toBe(true);
    }
  });
});
