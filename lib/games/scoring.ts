/**
 * Pure scoring rule for the trace game, extracted from TraceClient so the game's
 * central contract is unit-testable without a canvas.
 *
 * Coverage alone rewarded scribbling over the whole sheet with a perfect score,
 * because only pixels inside the glyph were counted (fixed after it shipped —
 * commit f52e57f). The score is therefore coverage INSIDE the letter minus the
 * fraction of the background that got painted, clamped at zero: following the
 * letter costs almost nothing since overshoot is a small share of a large
 * background, while filling the page drives the ratio toward zero.
 */

/** Portion of the glyph that must be covered before the star is awarded. */
export const TRACE_DONE_AT = 0.7;

export type TraceSampleCounts = {
  /** Sampled glyph pixels with paint on them. */
  paintedInside: number;
  /** Total sampled pixels inside the glyph. */
  insideTotal: number;
  /** Sampled background pixels with paint on them. */
  paintedOutside: number;
  /** Total sampled background pixels. */
  outsideTotal: number;
};

/** Returns the effective coverage as a 0..1 fraction. */
export function traceCoverage({
  paintedInside,
  insideTotal,
  paintedOutside,
  outsideTotal,
}: TraceSampleCounts): number {
  if (insideTotal <= 0) return 0;
  const covered = paintedInside / insideTotal;
  const spill = outsideTotal > 0 ? paintedOutside / outsideTotal : 0;
  return Math.max(0, covered - spill);
}

/** A traced letter earns its star once coverage reaches DONE_AT. */
export function isTraceComplete(ratio: number): boolean {
  return ratio >= TRACE_DONE_AT;
}
