// lib/progress.ts
// Local-only stars/progress for the /games activities. No account, no backend —
// everything lives in one localStorage object, which is the right call for a free,
// COPPA-friendly toddler site.

export type GameKind = "traced" | "tapped";

export type Progress = { traced: string[]; tapped: string[] };

const KEY = "arab_fingers_progress";
// The coloring sheet predates this file and keeps its own key; we read it so the
// hub's star total reflects that activity too.
const COLORING_KEY = "arab_fingers_colored_letters";

const empty = (): Progress => ({ traced: [], tapped: [] });

function read(): Progress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    const p = raw ? JSON.parse(raw) : {};
    return {
      traced: Array.isArray(p.traced) ? p.traced : [],
      tapped: Array.isArray(p.tapped) ? p.tapped : [],
    };
  } catch {
    // Blocked or corrupt storage just means no saved stars; not worth surfacing.
    return empty();
  }
}

export function getProgress(): Progress {
  return read();
}

/** Record a letter as completed for a game. Deduped per game, so a letter's star
 *  can be earned once. Returns the updated progress. */
export function award(kind: GameKind, ar: string): Progress {
  const p = read();
  if (!p[kind].includes(ar)) {
    p[kind] = [...p[kind], ar];
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      // Nothing to do — the star simply will not survive a reload.
    }
  }
  return p;
}

export function coloredCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(COLORING_KEY);
    const a = raw ? JSON.parse(raw) : [];
    return Array.isArray(a) ? a.length : 0;
  } catch {
    return 0;
  }
}

/** Stars across every activity. A sum, not a set-union: tracing ب and tapping ب are
 *  two separate accomplishments, and children count stars earned, not distinct letters. */
export function totalStars(): number {
  const p = read();
  return p.traced.length + p.tapped.length + coloredCount();
}
