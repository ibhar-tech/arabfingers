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

  return (
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
            className="flex w-[min(92vw,28rem)] flex-col items-center rounded-2xl sm:rounded-lg border border-white/12 bg-white/8 px-5 py-5 sm:px-8 sm:py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md"
          >
            {currentKey.kind === "letter" ? (
              <>
                {displayMode !== "english" ? (
                  <div
                    className="leading-[1.1] text-white"
                    style={{
                      fontFamily: "var(--font-ibm-plex-arabic), sans-serif",
                      fontSize: "clamp(3.5rem, 18vw, 10rem)",
                    }}
                  >
                    {currentKey.letter.ar}
                  </div>
                ) : null}

                {displayMode !== "arabic" ? (
                  <div
                    className="mt-1 sm:mt-2 leading-[1.1] font-semibold"
                    style={{
                      color: accent,
                      fontSize: "clamp(1.8rem, 7vw, 4rem)",
                    }}
                  >
                    {currentKey.letter.en}
                  </div>
                ) : null}

                <div className="mt-3 sm:mt-4 flex flex-col gap-0.5">
                  {displayMode !== "english" ? (
                    <div
                      className="text-sm sm:text-base text-white/72"
                      style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}
                    >
                      {currentKey.letter.arName}
                    </div>
                  ) : null}
                  {displayMode !== "arabic" ? (
                    <div className="text-xs sm:text-sm text-white/60">
                      {currentKey.letter.enName}
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div
                  className="leading-[1.1]"
                  style={{ fontSize: "clamp(3rem, 18vw, 8rem)" }}
                >
                  {currentKey.emoji}
                </div>
                <div className="mt-3 space-y-0.5">
                  <div className="text-xl sm:text-3xl font-semibold text-white">
                    {t("freePlayTitle")}
                  </div>
                  <div className="text-xs sm:text-sm text-white/65">
                    {t("freePlaySubtitle")}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
