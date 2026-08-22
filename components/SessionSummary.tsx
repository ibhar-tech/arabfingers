"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function SessionSummary() {
  const t = useTranslations();
  const open = useAppStore((state) => state.sessionSummaryOpen);
  const keyCount = useAppStore((state) => state.keyCount);
  const theme = useAppStore((state) => state.theme);
  const resetSession = useAppStore((state) => state.resetSession);
  const setSessionSummaryOpen = useAppStore((state) => state.setSessionSummaryOpen);
  const accent = themes[theme].palette[4];

  // The summary must be dismissable without resetting: a parent opening it
  // from the panel should not be forced to wipe the session just to close it.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSessionSummaryOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setSessionSummaryOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          data-parent-ui="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSessionSummaryOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label={t("sessionSummary")}
            className="relative mx-4 sm:mx-6 w-full max-w-sm rounded-2xl sm:rounded-xl border border-white/12 bg-[#07101d]/95 px-6 py-6 sm:px-8 sm:py-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
          >
            <button
              type="button"
              aria-label={t("sessionClose")}
              onClick={() => setSessionSummaryOpen(false)}
              className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-2 text-base sm:text-lg font-semibold text-white">
              {t("sessionSummary")}
            </div>
            <div
              className="my-4 sm:my-6 text-5xl sm:text-6xl font-semibold"
              style={{ color: accent }}
            >
              {keyCount}
            </div>
            <div className="mb-6 text-sm text-white/60">
              {t("totalKeys")}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSessionSummaryOpen(false)}
                className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {t("sessionClose")}
              </button>
              <button
                type="button"
                onClick={resetSession}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                {t("sessionReset")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
