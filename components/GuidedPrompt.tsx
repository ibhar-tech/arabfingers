"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { arabicLetters } from "@/lib/arabicMap";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function GuidedPrompt() {
  const t = useTranslations();
  const playMode = useAppStore((s) => s.playMode);
  const guidedIndex = useAppStore((s) => s.guidedIndex);
  const guidedCorrect = useAppStore((s) => s.guidedCorrect);
  const guidedShowHint = useAppStore((s) => s.guidedShowHint);
  const theme = useAppStore((s) => s.theme);
  const accent = themes[theme].palette[2];

  if (playMode !== "guided") return null;

  const targetLetter = arabicLetters[guidedIndex];

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-3 sm:top-5 z-20 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-black/50 px-5 py-3 backdrop-blur-md">
        {/* Progress */}
        <div className="text-xs text-white/40">
          {guidedCorrect}/28
        </div>

        {/* Prompt */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">{t("findLetter")}</span>
          <span
            className="text-3xl font-bold"
            style={{ color: accent, fontFamily: "var(--font-noto-naskh), sans-serif" }}
          >
            {targetLetter.ar}
          </span>
        </div>

        {/* Hint on wrong press */}
        <AnimatePresence>
          {guidedShowHint ? (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/50"
            >
              ({targetLetter.enName})
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
