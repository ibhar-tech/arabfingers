"use client";

import { Volume2 } from "lucide-react";
import { playWord } from "@/lib/sounds";
import { useAppStore } from "@/store/useAppStore";

/** Plays a letter's name and its sound with three long vowels; the games use the shorter name-only clips. */
export function LetterSoundsButton({ soundId, label }: { soundId: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (useAppStore.getState().soundEnabled) playWord(`/sounds/letters/${soundId}-sounds.mp3`);
      }}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-card text-ink transition hover:bg-saffron-soft"
    >
      <Volume2 className="h-4 w-4" aria-hidden />
    </button>
  );
}
