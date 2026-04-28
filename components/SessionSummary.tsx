"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function SessionSummary() {
  const t = useTranslations();
  const open = useAppStore((state) => state.sessionSummaryOpen);
  const keyCount = useAppStore((state) => state.keyCount);
  const theme = useAppStore((state) => state.theme);
  const resetSession = useAppStore((state) => state.resetSession);
  const accent = themes[theme].palette[4];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          data-parent-ui="true"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-4 sm:mx-6 w-full max-w-sm rounded-2xl sm:rounded-xl border border-white/12 bg-[#07101d]/95 px-6 py-6 sm:px-8 sm:py-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-2 text-base sm:text-lg font-semibold text-white">
              {t("sessionSummary")}
            </div>
            <div
              className="my-4 sm:my-6 text-5xl sm:text-6xl font-semibold"
              style={{ color: accent }}
            >
              {keyCount}
            </div>
            <div className="mb-8 text-sm text-white/60">
              {t("totalKeys")}
            </div>
            <button
              type="button"
              onClick={resetSession}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
            >
              {t("sessionReset")}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
