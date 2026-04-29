"use client";

import { Maximize, Minimize } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function FullscreenButton() {
  const t = useTranslations();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  async function toggle() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen not supported or denied
    }
  }

  return (
    <button
      type="button"
      data-parent-ui="true"
      aria-label={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
      title={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
      onClick={toggle}
      className="group flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-black/45 hover:text-white/95"
    >
      {isFullscreen ? (
        <Minimize className="h-5 w-5" strokeWidth={2} />
      ) : (
        <Maximize className="h-5 w-5" strokeWidth={2} />
      )}
    </button>
  );
}
