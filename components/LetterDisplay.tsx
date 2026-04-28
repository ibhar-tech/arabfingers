"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function LetterDisplay() {
  const currentKey = useAppStore((state) => state.currentKey);
  const displayMode = useAppStore((state) => state.displayMode);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const theme = useAppStore((state) => state.theme);
  const t = useTranslations();
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.2 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: reduceMotion ? 0.18 : 0.52,
                scale: { type: "spring", stiffness: 220, damping: 16 },
              }}
              className="flex items-end justify-center gap-3 sm:gap-5 rounded-2xl border border-white/12 bg-white/8 px-6 py-6 sm:px-10 sm:py-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md"
            >
              {currentKey.kind === "letter" ? (
                <>
                  {displayMode !== "english" ? (
                    <div
                      className="leading-none text-white"
                      style={{
                        fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif",
                        fontSize: showBoth
                          ? "clamp(4rem, 18vw, 10rem)"
                          : "clamp(5rem, 24vw, 14rem)",
                      }}
                    >
                      {currentKey.letter.ar}
                    </div>
                  ) : null}
                  {displayMode !== "arabic" ? (
                    <div
                      className="leading-none font-semibold pb-[0.1em]"
                      style={{
                        color: accent,
                        fontSize: showBoth
                          ? "clamp(2.5rem, 10vw, 5.5rem)"
                          : "clamp(4rem, 18vw, 10rem)",
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
          ) : null}
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
    </>
  );
}
