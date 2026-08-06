"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import { arabicLetters, type ArabicLetter } from "@/lib/arabicMap";
import { useLocale } from "next-intl";

/**
 * On-screen Arabic letter bar for touch devices. Tapping a tile shows THAT letter
 * (intentional learning) instead of the random letter a blank-screen tap produces.
 * Tiles carry data-parent-ui so the global random-tap handler ignores them.
 *
 * Only about a third of the 28 letters fit at once, so the strip scrolls. It used to
 * hide its scrollbar, which made it look like the alphabet simply stopped at ز —
 * there was no way to tell the rest existed. Now the ends fade, arrows appear on
 * whichever side has more letters, and a slim scrollbar shows the position.
 */

const SCROLL_STEP = 240; // ~4 tiles, so a tap moves a useful distance without losing your place

export function TouchLetterGrid({ onPick }: { onPick: (letter: ArabicLetter) => void }) {
  const [open, setOpen] = useState(true);
  const isAr = useLocale() === "ar";

  const stripRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  /** Which ends still have letters past them. RTL makes scrollLeft negative in most
   *  browsers, so compare against the magnitude rather than assuming a direction. */
  const measure = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setEdges({ start: pos > 4, end: max - pos > 4 });
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !open) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [open, measure]);

  const scrollBy = (dir: -1 | 1) => {
    // The strip is dir="rtl", so a visual "next" is a negative scrollLeft delta.
    stripRef.current?.scrollBy({ left: dir * SCROLL_STEP * -1, behavior: "smooth" });
  };

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
          <div className="relative flex-1 min-w-0">
            {/* Edge fades: the cheapest honest signal that the alphabet continues. */}
            {edges.start && (
              <div className="letter-strip-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-10 rounded-r-3xl" />
            )}
            {edges.end && (
              <div className="letter-strip-fade-end pointer-events-none absolute inset-y-0 left-0 z-10 w-10 rounded-l-3xl" />
            )}

            {edges.start && (
              <button
                data-parent-ui="true"
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label={isAr ? "الحروف السابقة" : "Previous letters"}
                className="stage-chip absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition active:scale-90"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            {edges.end && (
              <button
                data-parent-ui="true"
                type="button"
                onClick={() => scrollBy(1)}
                aria-label={isAr ? "الحروف التالية" : "More letters"}
                className="stage-chip absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition active:scale-90"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <div
              ref={stripRef}
              // Pad the ends only while an arrow is floating there, so no tile ever
              // sits under one — a child aiming for a letter must not hit a control.
              className={`stage-chip letter-strip flex gap-2 overflow-x-auto rounded-3xl p-2 ${
                edges.start ? "pr-11" : ""
              } ${edges.end ? "pl-11" : ""}`}
              style={{ touchAction: "pan-x" }}
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
          </div>
        )}
      </div>
    </div>
  );
}
