"use client";

import { useTranslations } from "next-intl";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

export function KeyCounter() {
  const keyCount = useAppStore((state) => state.keyCount);
  const showCounter = useAppStore((state) => state.showCounter);
  const theme = useAppStore((state) => state.theme);
  const t = useTranslations();

  if (!showCounter) {
    return null;
  }

  return (
    <div className="stage-chip absolute right-2 top-2 sm:right-4 sm:top-4 z-30 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-right">
      <div
        className="text-xl sm:text-3xl font-extrabold leading-none tabular-nums"
        style={{ color: themes[theme].palette[4] }}
      >
        {keyCount}
      </div>
      <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-semibold opacity-65">
        {t("counter")}
      </div>
    </div>
  );
}
