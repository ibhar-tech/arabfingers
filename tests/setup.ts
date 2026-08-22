import { Window } from "happy-dom";

// Why this exists: under Node >= 22 the host runtime defines its own
// experimental `localStorage` accessor on globalThis (undefined unless run with
// --localstorage-file). Vitest's happy-dom environment copies window properties
// onto globalThis but cannot override that native accessor, so every bare
// `localStorage` reference — including inside lib/progress.ts and zustand's
// persist middleware — hits Node's stub instead of DOM storage. Browsers always
// resolve bare localStorage to DOM storage, so we restore exactly that
// behaviour here by installing a fresh happy-dom storage instance.
const domStorage = new Window().localStorage;
Object.defineProperty(globalThis, "localStorage", {
  value: domStorage,
  configurable: true,
  writable: true,
});
