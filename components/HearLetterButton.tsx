"use client";

import { Volume2 } from "lucide-react";
import { playLetterSound } from "@/lib/letterSounds";
import { useAppStore } from "@/store/useAppStore";

/**
 * Says a letter aloud on click (Arabic name, then the English name — the same
 * recording pair the games use). Used on the worksheet pages because paper
 * can't pronounce; the parent panel's Sound setting is honoured imperatively,
 * like the game clients do.
 */
export function HearLetterButton({
  soundId,
  labelEn,
  labelAr,
  locale,
}: {
  soundId: string;
  labelEn: string;
  labelAr: string;
  locale: string;
}) {
  const isAr = locale === "ar";
  return (
    <button
      type="button"
      onClick={() => {
        if (useAppStore.getState().soundEnabled) playLetterSound(soundId);
      }}
      className="btn-chunky inline-flex items-center gap-2 text-sm"
    >
      <Volume2 className="h-4 w-4" aria-hidden />
      {isAr ? labelAr : labelEn}
    </button>
  );
}
