"use client";

import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { InstallButton } from "@/components/InstallButton";
import { InfoMenu } from "@/components/InfoMenu";

const HOLD_MS = 1500;

export function ParentPanelTrigger() {
  const t = useTranslations();
  const setParentPanelOpen = useAppStore((state) => state.setParentPanelOpen);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  function reset() {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = null;
    startRef.current = null;
    setProgress(0);
  }

  function tick() {
    if (startRef.current === null) return;
    const elapsed = performance.now() - startRef.current;
    const nextProgress = Math.min(elapsed / HOLD_MS, 1);
    setProgress(nextProgress);
    if (nextProgress >= 1) {
      setParentPanelOpen(true);
      reset();
      return;
    }
    rafRef.current = window.requestAnimationFrame(tick);
  }

  function beginHold() {
    if (startRef.current !== null) return;
    startRef.current = performance.now();
    rafRef.current = window.requestAnimationFrame(tick);
  }

  const isHolding = progress > 0;

  return (
    <div className="absolute left-2 top-2 sm:left-3 sm:top-3 z-30 safe-top safe-left flex items-center gap-2">
      {/* Settings button */}
      <button
        type="button"
        data-parent-ui="true"
        data-parent-trigger="true"
        aria-label={t("parentHint")}
        title={t("parentHint")}
        onPointerDown={beginHold}
        onPointerUp={reset}
        onPointerLeave={reset}
        onPointerCancel={reset}
        className="group relative flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/35 px-3.5 py-2.5 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-black/45 hover:text-white/95"
      >
        <span
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background: isHolding
              ? `linear-gradient(90deg, rgba(159,225,203,0.3) ${progress * 100}%, transparent ${progress * 100}%)`
              : "none",
          }}
        />
        <Settings
          className={`relative h-5 w-5 transition-transform duration-300 ${isHolding ? "animate-spin" : "group-hover:rotate-45"}`}
          style={{ animationDuration: "1.5s" }}
          strokeWidth={2}
        />
        <span className="relative text-xs font-medium hidden sm:inline">
          {t("parentHint")}
        </span>
      </button>

      {/* Install button */}
      <InstallButton />

      {/* Info / pages menu */}
      <InfoMenu />
    </div>
  );
}
