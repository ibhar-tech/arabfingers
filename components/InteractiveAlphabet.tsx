"use client";

import { useEffect, useState } from "react";
import { arabicLetters } from "@/lib/arabicMap";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";

/**
 * Original interactive widget: a tappable grid of all 28 Arabic letters that plays
 * natural Arabic + English pronunciation on click. Reuses the app's existing audio
 * pipeline (lib/letterSounds + lib/arabicMap) so the learning guide is hands-on,
 * not just text. Embedded in the Arabic alphabet guide.
 */
export function InteractiveAlphabet({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const [active, setActive] = useState<string | null>(null);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    // Prime a couple of sounds on first interaction so the first tap is instant.
    if (!primed) return;
    primeLetterSounds();
  }, [primed]);

  const handlePlay = (soundId: string) => {
    if (!primed) setPrimed(true);
    setActive(soundId);
    playLetterSound(soundId);
    window.setTimeout(() => setActive((cur) => (cur === soundId ? null : cur)), 900);
  };

  return (
    <section className="my-8" aria-label={isAr ? "الأبجدية التفاعلية" : "Interactive alphabet"}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-xl font-semibold text-white">
          {isAr ? "جرّبها: اضغط أي حرف لسماع نطقه" : "Try it: tap any letter to hear it"}
        </h2>
        <span className="text-xs text-white/40">
          {isAr ? "🔊 صوت عربي + إنجليزي" : "🔊 Arabic + English audio"}
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {arabicLetters.map((letter) => {
          const isActive = active === letter.soundId;
          return (
            <button
              key={letter.soundId}
              type="button"
              onClick={() => handlePlay(letter.soundId)}
              aria-label={`${isAr ? letter.arName : letter.enName} — ${isAr ? "اضغط للاستماع" : "tap to listen"}`}
              className={`group flex flex-col items-center justify-center rounded-xl border p-3 transition focus:outline-none focus:ring-2 focus:ring-accent ${
                isActive
                  ? "border-accent bg-accent/15 scale-105"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <span className="text-3xl font-bold text-white leading-none mb-1.5" lang="ar">
                {letter.ar}
              </span>
              <span className="text-[11px] font-medium text-white/70">{letter.enName}</span>
              <span className="text-[10px] text-white/40">{letter.en}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-white/40">
        {isAr
          ? "الأصوات مسجّلة بنطق طبيعي. شغّل الصوت على جهازك."
          : "Sounds use natural recorded pronunciation. Make sure your device audio is on."}
      </p>
    </section>
  );
}
