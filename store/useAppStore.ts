"use client";

import { create } from "zustand";
import type { AppLocale } from "@/lib/locales";
import type { ThemeName } from "@/lib/themes";
import type { ArabicLetter } from "@/lib/arabicMap";
import type { KeyboardLayoutId } from "@/lib/keyboardLayouts";

export type DisplayMode = "both" | "arabic" | "english";
export type InteractionKind = "letter" | "fun";
export type SpecialMilestone = 10 | 25 | 50 | 100;

type BaseInteraction = {
  id: number;
  kind: InteractionKind;
  pressed: string;
  source: "keyboard" | "touch";
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  timestamp: number;
};

export type LetterInteraction = BaseInteraction & {
  kind: "letter";
  letter: ArabicLetter;
};

export type FunInteraction = BaseInteraction & {
  kind: "fun";
  emoji: string;
};

export type KeyInteraction = LetterInteraction | FunInteraction;

type MilestoneState = {
  count: number;
  id: number;
};

type IncomingInteraction =
  | Omit<LetterInteraction, "id" | "timestamp">
  | Omit<FunInteraction, "id" | "timestamp">;

type AppState = {
  currentKey: KeyInteraction | null;
  keyCount: number;
  theme: ThemeName;
  locale: AppLocale;
  soundEnabled: boolean;
  reduceMotion: boolean;
  showCounter: boolean;
  displayMode: DisplayMode;
  parentPanelOpen: boolean;
  keyboardLayout: KeyboardLayoutId;
  ttsSpeed: number;
  parentPin: string | null;
  sessionSummaryOpen: boolean;
  milestone: MilestoneState | null;
  interactionId: number;
  letterStats: Record<string, number>;
  uniqueLetters: Set<string>;
  sessionStartTime: number;
  setLocale: (locale: AppLocale) => void;
  setTheme: (theme: ThemeName) => void;
  setSoundEnabled: (soundEnabled: boolean) => void;
  setReduceMotion: (reduceMotion: boolean) => void;
  setShowCounter: (showCounter: boolean) => void;
  setDisplayMode: (displayMode: DisplayMode) => void;
  setParentPanelOpen: (parentPanelOpen: boolean) => void;
  setKeyboardLayout: (layout: KeyboardLayoutId) => void;
  setTtsSpeed: (ttsSpeed: number) => void;
  setParentPin: (pin: string | null) => void;
  setSessionSummaryOpen: (open: boolean) => void;
  resetSession: () => void;
  registerInteraction: (payload: IncomingInteraction) => void;
  clearMilestone: () => void;
};

const specialMilestones = new Set<SpecialMilestone>([10, 25, 50, 100]);

function isMilestone(count: number): boolean {
  return count > 0 && (count % 10 === 0 || specialMilestones.has(count as SpecialMilestone));
}

export const useAppStore = create<AppState>((set) => ({
  currentKey: null,
  keyCount: 0,
  theme: "space",
  locale: "en",
  soundEnabled: true,
  reduceMotion: false,
  showCounter: true,
  displayMode: "both",
  parentPanelOpen: false,
  keyboardLayout: "arabic-standard",
  ttsSpeed: 0.9,
  parentPin: null,
  sessionSummaryOpen: false,
  milestone: null,
  interactionId: 0,
  letterStats: {},
  uniqueLetters: new Set<string>(),
  sessionStartTime: Date.now(),
  setLocale: (locale) => set({ locale }),
  setTheme: (theme) => set({ theme }),
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  setShowCounter: (showCounter) => set({ showCounter }),
  setDisplayMode: (displayMode) => set({ displayMode }),
  setParentPanelOpen: (parentPanelOpen) => set({ parentPanelOpen }),
  setKeyboardLayout: (keyboardLayout) => set({ keyboardLayout }),
  setTtsSpeed: (ttsSpeed) => set({ ttsSpeed }),
  setParentPin: (parentPin) => set({ parentPin }),
  setSessionSummaryOpen: (sessionSummaryOpen) => set({ sessionSummaryOpen }),
  resetSession: () => set({ keyCount: 0, currentKey: null, milestone: null, sessionSummaryOpen: false, interactionId: 0, letterStats: {}, uniqueLetters: new Set(), sessionStartTime: Date.now() }),
  registerInteraction: (payload) =>
    set((state) => {
      const id = state.interactionId + 1;
      const keyCount = state.keyCount + 1;
      const milestone = isMilestone(keyCount)
        ? { count: keyCount, id }
        : state.milestone;

      // Track letter stats
      const letterStats = { ...state.letterStats };
      const uniqueLetters = new Set(state.uniqueLetters);
      if (payload.kind === "letter") {
        const ar = payload.letter.ar;
        letterStats[ar] = (letterStats[ar] ?? 0) + 1;
        uniqueLetters.add(ar);
      }

      return {
        interactionId: id,
        keyCount,
        milestone,
        letterStats,
        uniqueLetters,
        currentKey: {
          ...payload,
          id,
          timestamp: Date.now(),
        } as KeyInteraction,
      };
    }),
  clearMilestone: () => set({ milestone: null }),
}));
