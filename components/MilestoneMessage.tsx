"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

const specialCounts = new Set([10, 25, 50, 100]);

export function MilestoneMessage() {
  const t = useTranslations();
  const milestone = useAppStore((state) => state.milestone);
  const theme = useAppStore((state) => state.theme);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  const label = milestone
    ? specialCounts.has(milestone.count)
      ? t(`milestone_${milestone.count}`)
      : t("milestone_generic")
    : "";

  return (
    <div className="pointer-events-none absolute left-0 right-0 bottom-12 sm:bottom-16 z-40 flex justify-center px-4">
      <AnimatePresence>
        {milestone ? (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{
              duration: reduceMotion ? 0.18 : 0.32,
              ease: "easeOut",
            }}
            className="rounded-2xl border border-white/14 bg-black/50 px-8 py-5 sm:px-12 sm:py-6 text-center shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-md"
          >
            <div
              className="text-4xl sm:text-6xl font-semibold"
              style={{ color: themes[theme].palette[4] }}
            >
              {label}
            </div>
            <div className="mt-2 text-base sm:text-lg text-white/55">🎉 {milestone.count}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
