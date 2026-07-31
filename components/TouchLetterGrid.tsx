"use client";

import { useState } from "react";
import { Grid3x3, X } from "lucide-react";
import { arabicLetters, type ArabicLetter } from "@/lib/arabicMap";
import { useLocale } from "next-intl";

/**
 * On-screen Arabic letter bar for touch devices. Tapping a tile shows THAT letter
 * (intentional learning) instead of the random letter a blank-screen tap produces.
 * Tiles carry data-parent-ui so the global random-tap handler ignores them.
 * ponytail: horizontal scroll strip — the play surface locks page scroll, so a
 * self-contained scrollable bar is the simplest way to fit 28 letters on a phone.
 */
export function TouchLetterGrid({ onPick }: { onPick: (letter: ArabicLetter) => void }) {
  const [open, setOpen] = useState(true);
  const isAr = useLocale() === "ar";

  return (
    <div
      data-parent-ui="true"
      dir="rtl"
      className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 safe-bottom"
    >
      <div className="mx-auto flex max-w-3xl items-end justify-between gap-2 px-2 pb-2">
        <button
          data-parent-ui="true"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={isAr ? (open ? "إخفاء الحروف" : "إظهار الحروف") : open ? "Hide letters" : "Show letters"}
          className="stage-chip stage-chip-hover mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition active:scale-95"
        >
          {open ? <X className="h-5 w-5" /> : <Grid3x3 className="h-5 w-5" />}
        </button>

        {open && (
          <div
            className="stage-chip flex flex-1 gap-2 overflow-x-auto rounded-3xl p-2"
            style={{ touchAction: "pan-x", scrollbarWidth: "none" }}
          >
            {arabicLetters.map((letter) => (
              <button
                key={letter.ar}
                data-parent-ui="true"
                type="button"
                onClick={() => onPick(letter)}
                aria-label={isAr ? letter.arName : letter.enName}
                className="stage-tile flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl transition active:scale-90"
              >
                <span className="font-arabic-display text-2xl leading-none">{letter.ar}</span>
                <span className="mt-0.5 text-[10px] font-bold opacity-60">{letter.en}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
