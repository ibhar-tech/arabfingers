"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function LetterDisplay() {
  const currentKey = useAppStore((state) => state.currentKey);
  const displayMode = useAppStore((state) => state.displayMode);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const theme = useAppStore((state) => state.theme);
  const t = useTranslations();
  const locale = useLocale();
  const accent = themes[theme].palette[2];
  const showBoth = displayMode === "both";

  return (
    <>
      {/* Main letter card — centered */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {currentKey ? (
            <motion.div
              key={currentKey.id}
              initial={{ opacity: 0, scale: 0.4, y: 35 }}
              animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.15, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: -35 }}
              transition={{
                duration: reduceMotion ? 0.18 : 0.45,
                scale: { type: "spring", stiffness: 280, damping: 13 },
                y: { type: "spring", stiffness: 240, damping: 14 },
              }}
              style={{
                boxShadow: reduceMotion
                  ? "0 20px 60px rgba(0,0,0,0.4)"
                  : `0 0 60px 15px ${accent}30, 0 30px 100px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.25)`,
                border: `3.5px solid ${accent}60`,
                background: "rgba(255, 255, 255, 0.16)",
              }}
              className="relative flex items-end justify-center gap-4 sm:gap-6 rounded-3xl px-8 py-8 sm:px-12 sm:py-10 backdrop-blur-lg overflow-hidden"
            >
              {/* Glossy shine and halo glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

              {currentKey.kind === "letter" ? (
                <>
                  {displayMode !== "english" ? (
                    <div
                      className="leading-none text-white font-bold"
                      style={{
                        fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif",
                        fontSize: showBoth
                          ? "clamp(4.5rem, 20vw, 11rem)"
                          : "clamp(5.5rem, 26vw, 15rem)",
                        textShadow: reduceMotion ? "none" : `0 0 45px ${accent}50, 0 10px 20px rgba(0,0,0,0.35)`,
                      }}
                    >
                      {currentKey.letter.ar}
                    </div>
                  ) : null}
                  {displayMode !== "arabic" ? (
                    <div
                      className="leading-none font-extrabold pb-[0.1em]"
                      style={{
                        color: accent,
                        fontSize: showBoth
                          ? "clamp(3rem, 11vw, 6rem)"
                          : "clamp(4.5rem, 20vw, 11rem)",
                        textShadow: reduceMotion ? "none" : `0 0 55px ${accent}75, 0 10px 20px rgba(0,0,0,0.35)`,
                      }}
                    >
                      {currentKey.letter.en}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    className="leading-none"
                    style={{ fontSize: "clamp(4rem, 20vw, 10rem)" }}
                  >
                    {currentKey.emoji}
                  </div>
                  <div className="mt-3 space-y-0.5 text-center">
                    <div className="text-xl sm:text-3xl font-semibold text-white">
                      {t("freePlayTitle")}
                    </div>
                    <div className="text-xs sm:text-sm text-white/65">
                      {t("freePlaySubtitle")}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div
              key="idle-hint"
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="text-6xl sm:text-8xl animate-bounce">🎹</div>
              <div className="text-xl sm:text-2xl font-semibold text-white/80">
                {t("startHint")}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Letter name badge — bottom-right corner, outside the card */}
      <div className="pointer-events-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <AnimatePresence mode="wait">
          {currentKey && currentKey.kind === "letter" ? (
            <motion.div
              key={`name-${currentKey.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-5 py-3 sm:px-6 sm:py-3.5 backdrop-blur-md"
            >
              {displayMode !== "english" ? (
                <span
                  className="text-lg sm:text-2xl text-white/85"
                  style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}
                >
                  {currentKey.letter.arName}
                </span>
              ) : null}
              {showBoth ? (
                <span className="text-white/25 text-lg">·</span>
              ) : null}
              {displayMode !== "arabic" ? (
                <span className="text-base sm:text-xl text-white/65">
                  {currentKey.letter.enName}
                </span>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Accessibility (a11y) screen-reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {currentKey ? (
          currentKey.kind === "letter" ? (
            locale === "ar"
              ? `تم الضغط على حرف ${currentKey.letter.arName}، ويعادل حرف ${currentKey.letter.enName} بالإنجليزية`
              : `Pressed letter ${currentKey.letter.enName}, Arabic equivalent ${currentKey.letter.arName}`
          ) : (
            locale === "ar"
              ? `تم تفجير رمز تعبيري`
              : `Burst emoji`
          )
        ) : (
          locale === "ar"
            ? "لوحة المفاتيح جاهزة للعب"
            : "Keyboard is ready to play"
        )}
      </div>
    </>
  );
}
