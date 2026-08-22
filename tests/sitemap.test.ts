import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { worksheetSets } from "@/lib/worksheets";
import { letterWorksheetPages } from "@/lib/letterWorksheets";

const SITE = "https://www.arabfingers.site";

describe("sitemap", () => {
  const entries = sitemap();
  const pages = entries.filter((e) => e.url.startsWith(`${SITE}/en`) || e.url.startsWith(`${SITE}/ar`));
  const pdfs = entries.filter((e) => e.url.endsWith(".pdf"));

  it("emits locale-prefixed page URLs plus the bare worksheet PDFs", () => {
    expect(entries.length).toBeGreaterThan(20);
    for (const e of pages) {
      expect(e.url.startsWith(`${SITE}/en`) || e.url.startsWith(`${SITE}/ar`)).toBe(true);
    }
    expect(pdfs).toHaveLength(worksheetSets.length + letterWorksheetPages.length);
  });

  it("never lists the bare root (it 308-redirects to /en)", () => {
    expect(entries.some((e) => e.url === SITE)).toBe(false);
  });

  it("keeps hreflang clusters complete and reciprocal", () => {
    const byUrl = new Map(entries.map((e) => [e.url, e]));
    for (const entry of pages) {
      if (!entry.alternates?.languages) continue;
      const langs = entry.alternates.languages as Record<string, string>;
      // Self-referencing: this URL must appear in its own alternates.
      expect(Object.values(langs)).toContain(entry.url);
      // Reciprocal: every listed alternate exists as a sitemap entry…
      for (const alt of Object.values(langs)) {
        expect(byUrl.has(alt), `${entry.url} lists missing alternate ${alt}`).toBe(true);
        // …and that alternate points back.
        const other = byUrl.get(alt)!;
        expect(Object.values(other.alternates!.languages as Record<string, string>)).toContain(entry.url);
      }
      // x-default resolves to the English copy of the same path. Derive the
      // path by stripping the full locale prefix — a naive replace("/ar", …)
      // corrupts paths like /learn/arabic-alphabet-guide.
      const path = entry.url.slice(`${SITE}/en`.length);
      expect(langs["x-default"]).toBe(`${SITE}/en${path}`);
      expect(langs.en).toBe(`${SITE}/en${path}`);
      expect(langs.ar).toBe(`${SITE}/ar${path}`);
    }
  });

  it("indexes every worksheet PDF directly", () => {
    for (const set of worksheetSets) {
      const pdf = pdfs.find((e) => e.url === `${SITE}/printables/${set.id}.pdf`);
      expect(pdf, `${set.id}.pdf missing`).toBeTruthy();
    }
    for (const p of letterWorksheetPages) {
      const pdf = pdfs.find((e) => e.url === `${SITE}/printables/letters/${p.slug}.pdf`);
      expect(pdf, `letters/${p.slug}.pdf missing`).toBeTruthy();
      // …and each letter has both locale page URLs.
      expect(pages.some((e) => e.url === `${SITE}/en/printables/letters/${p.slug}`), `en letters/${p.slug} page missing`).toBe(true);
      expect(pages.some((e) => e.url === `${SITE}/ar/printables/letters/${p.slug}`), `ar letters/${p.slug} page missing`).toBe(true);
    }
  });
});
