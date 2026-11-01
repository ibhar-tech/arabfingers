import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { vocabCount, vocabTopics } from "@/lib/vocabTopics";
import { worksheetSets } from "@/lib/worksheets";

describe("vocabulary pages", () => {
  it("do not share a slug with a hand-written /learn page", () => {
    const folders = new Set(readdirSync("app/[locale]/learn"));
    for (const t of vocabTopics) expect(folders.has(t.slug), t.slug).toBe(false);
  });

  it("link only to colouring packs that exist", () => {
    for (const t of vocabTopics) {
      if (t.packId) expect(worksheetSets.some((s) => s.id === t.packId), t.packId).toBe(true);
    }
  });

  for (const t of vocabTopics) {
    it(`${t.slug}: every word is complete and listed once`, () => {
      const seen = new Set<string>();
      for (const g of t.groups) {
        for (const x of g.words) {
          expect(x.ar && x.en && x.tr && x.emoji, `${t.slug}/${x.ar}`).toBeTruthy();
          expect(seen.has(`${g.id}:${x.ar}`), `${t.slug}: ${x.ar} twice in ${g.id}`).toBe(false);
          seen.add(`${g.id}:${x.ar}`);
        }
      }
      expect(vocabCount(t)).toBeGreaterThan(10);
      expect(t.faq.length).toBeGreaterThanOrEqual(3);
    });
  }
});
