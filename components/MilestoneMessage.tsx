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
    <AnimatePresence>
      {milestone ? (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, scale: 0.84, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -12 }}
          transition={{
            duration: reduceMotion ? 0.18 : 0.32,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-4 sm:px-6"
        >
          <div className="rounded-2xl sm:rounded-lg border border-white/14 bg-black/48 px-5 py-4 sm:px-8 sm:py-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-md">
            <div
              className="text-[clamp(1.5rem,5vw,4.4rem)] font-semibold"
              style={{ color: themes[theme].palette[4] }}
            >
              {label}
            </div>
            <div className="mt-2 text-sm text-white/65">{milestone.count}</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
