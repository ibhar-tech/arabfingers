import { describe, expect, it } from "vitest";
import { letterGuide } from "@/lib/letterGuide";
import { bare, letterPositions, startsWithLetter } from "@/lib/letterWords";

describe("letter picture words by position", () => {
  for (const entry of letterGuide) {
    const { start, middle, end } = letterPositions(entry);

    it(`${entry.enName}: three or more words in each position`, () => {
      expect(start.length).toBeGreaterThanOrEqual(3);
      expect(middle.length).toBeGreaterThanOrEqual(3);
      expect(end.length).toBeGreaterThanOrEqual(3);
    });

    it(`${entry.enName}: each word has the letter where it claims`, () => {
      for (const x of start) expect(startsWithLetter(x.word, entry.ar), x.word).toBe(true);
      for (const x of middle) {
        const inner = bare(x.word).slice(1, -1);
        expect(inner.includes(entry.ar), x.word).toBe(true);
      }
      for (const x of end) expect(bare(x.word).at(-1), x.word).toBe(entry.ar);
    });

    it(`${entry.enName}: every word has a picture and an English meaning`, () => {
      for (const x of [...start, ...middle, ...end]) {
        expect(x.emoji.length, x.word).toBeGreaterThan(0);
        expect(x.en.length, x.word).toBeGreaterThan(0);
      }
    });
  }
});
