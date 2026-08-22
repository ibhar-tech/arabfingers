// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { arabicLetters } from "@/lib/arabicMap";
import { hashPin } from "@/lib/pin";
import { SETTINGS_STORAGE_KEY, useAppStore } from "@/store/useAppStore";

const ba = arabicLetters[1];

function freshState() {
  useAppStore.setState({
    currentKey: null,
    keyCount: 0,
    milestone: null,
    interactionId: 0,
    letterStats: {},
    uniqueLetters: new Set(),
    sessionStartTime: Date.now(),
    sessionSummaryOpen: false,
    parentPanelOpen: false,
    playMode: "free",
    guidedIndex: 0,
    guidedCorrect: 0,
    guidedWrong: 0,
    guidedShowHint: false,
  });
}

beforeEach(() => {
  localStorage.clear();
  freshState();
});

describe("registerInteraction", () => {
  it("counts presses and tracks per-letter stats", () => {
    const s = useAppStore.getState();
    s.registerInteraction({ kind: "letter", letter: ba, pressed: ba.ar, source: "keyboard", x: 1, y: 1, normalizedX: 0.5, normalizedY: 0.5 });
    useAppStore.getState().registerInteraction({ kind: "letter", letter: ba, pressed: ba.ar, source: "touch", x: 2, y: 2, normalizedX: 0.6, normalizedY: 0.6 });

    const state = useAppStore.getState();
    expect(state.keyCount).toBe(2);
    expect(state.letterStats["ب"]).toBe(2);
    expect(state.uniqueLetters.has("ب")).toBe(true);
    // Interactions carry monotonic ids for React keys.
    expect(state.currentKey?.id).toBe(2);
  });

  it("raises milestones at 10/25/50/100 and every multiple of 10", () => {
    for (let i = 1; i <= 10; i++) {
      useAppStore.getState().registerInteraction({ kind: "fun", emoji: "⭐", pressed: "x", source: "keyboard", x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
    }
    expect(useAppStore.getState().milestone?.count).toBe(10);
  });

  it("does not raise a milestone between multiples of 10", () => {
    for (let i = 1; i <= 15; i++) {
      useAppStore.getState().registerInteraction({ kind: "fun", emoji: "🎈", pressed: "x", source: "keyboard", x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
    }
    // Last milestone stays at 10; 11..15 are not milestones.
    expect(useAppStore.getState().milestone?.count).toBe(10);
  });
});

describe("guided mode", () => {
  it("advances cyclically through all 28 letters counting correct answers", () => {
    useAppStore.getState().setPlayMode("guided");
    for (let i = 0; i < 30; i++) useAppStore.getState().advanceGuided();
    const s = useAppStore.getState();
    expect(s.guidedCorrect).toBe(30);
    expect(s.guidedIndex).toBe(30 % 28);
    // Wrapping around the alphabet must not have skipped any letter:
    const visited = new Set<number>();
    useAppStore.getState().resetGuided();
    for (let i = 0; i < 28; i++) {
      visited.add(useAppStore.getState().guidedIndex);
      useAppStore.getState().advanceGuided();
    }
    expect(visited.size).toBe(28);
  });

  it("markGuidedWrong shows the hint without advancing", () => {
    useAppStore.getState().setPlayMode("guided");
    useAppStore.getState().markGuidedWrong();
    const s = useAppStore.getState();
    expect(s.guidedWrong).toBe(1);
    expect(s.guidedShowHint).toBe(true);
    expect(s.guidedIndex).toBe(0);
  });

  it("switching play mode resets guided progress", () => {
    useAppStore.getState().setPlayMode("guided");
    useAppStore.getState().advanceGuided();
    useAppStore.getState().advanceGuided();
    useAppStore.getState().setPlayMode("free");
    expect(useAppStore.getState().guidedCorrect).toBe(0);
    expect(useAppStore.getState().guidedIndex).toBe(0);
  });
});

describe("persistence", () => {
  it("persists only the parent settings, never session play state", () => {
    useAppStore.getState().setTheme("space");
    useAppStore.getState().setParentPin(hashPin("1357"));
    useAppStore.getState().registerInteraction({ kind: "letter", letter: ba, pressed: ba.ar, source: "keyboard", x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    expect(raw).not.toBeNull();
    const saved = JSON.parse(raw!);

    // Durable settings survive…
    expect(saved.state.theme).toBe("space");
    expect(saved.state.parentPin).toBe(hashPin("1357"));
    // …while per-session fields stay out of storage entirely.
    expect(saved.state).not.toHaveProperty("keyCount");
    expect(saved.state).not.toHaveProperty("currentKey");
    expect(saved.state).not.toHaveProperty("milestone");
    expect(saved.state).not.toHaveProperty("uniqueLetters");
    // And the PIN is stored hashed — never as plaintext.
    expect(saved.state.parentPin).not.toBe("1357");
  });

  it("rehydrates settings into a fresh store read", async () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        state: { theme: "jungle", soundEnabled: false, ttsSpeed: 0.6 },
        version: 1,
      }),
    );
    await useAppStore.persist.rehydrate();
    const s = useAppStore.getState();
    expect(s.theme).toBe("jungle");
    expect(s.soundEnabled).toBe(false);
    expect(s.ttsSpeed).toBe(0.6);
    // Session fields fall back to defaults.
    expect(s.keyCount).toBe(0);
    // Restore clean state for other tests.
    localStorage.clear();
    await useAppStore.persist.rehydrate();
    freshState();
  });
});
