import { describe, expect, it } from "vitest";
import { isTraceComplete, traceCoverage, TRACE_DONE_AT } from "@/lib/games/scoring";

describe("traceCoverage", () => {
  it("returns plain coverage when nothing is painted outside the glyph", () => {
    expect(traceCoverage({ paintedInside: 70, insideTotal: 100, paintedOutside: 0, outsideTotal: 10_000 })).toBe(0.7);
  });

  it("subtracts background spill — a full-sheet scribble must not score 100%", () => {
    // 100% of the glyph covered but the whole sheet painted too:
    const ratio = traceCoverage({ paintedInside: 100, insideTotal: 100, paintedOutside: 10_000, outsideTotal: 10_000 });
    expect(ratio).toBe(0);
    expect(isTraceComplete(ratio)).toBe(false);
  });

  it("never goes negative", () => {
    const ratio = traceCoverage({ paintedInside: 0, insideTotal: 100, paintedOutside: 500, outsideTotal: 1_000 });
    expect(ratio).toBe(0);
  });

  it("treats modest overshoot as negligible (small share of a large background)", () => {
    const ratio = traceCoverage({ paintedInside: 80, insideTotal: 100, paintedOutside: 200, outsideTotal: 20_000 });
    expect(ratio).toBeCloseTo(0.8 - 0.01, 5);
    expect(isTraceComplete(ratio)).toBe(true);
  });

  it("handles degenerate masks defensively", () => {
    expect(traceCoverage({ paintedInside: 5, insideTotal: 0, paintedOutside: 0, outsideTotal: 0 })).toBe(0);
    expect(traceCoverage({ paintedInside: 5, insideTotal: 10, paintedOutside: 3, outsideTotal: 0 })).toBe(0.5);
  });
});

describe("isTraceComplete", () => {
  it("awards the star at exactly DONE_AT and above", () => {
    expect(isTraceComplete(TRACE_DONE_AT)).toBe(true);
    expect(isTraceComplete(TRACE_DONE_AT - 0.001)).toBe(false);
  });
});
