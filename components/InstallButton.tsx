"use client";

import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches
  );
}

function getBrowserName(): string {
  if (typeof navigator === "undefined") return "browser";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "firefox";
  if (ua.includes("Edg")) return "edge";
  if (ua.includes("Chrome")) return "chrome";
  if (ua.includes("Safari")) return "safari";
  return "browser";
}

export function InstallButton() {
  const t = useTranslations();
  const [hasNativePrompt, setHasNativePrompt] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hidden, setHidden] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isStandalone()) {
      setHidden(true);
      return;
    }

    function onBeforeInstall(e: Event) {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setHasNativePrompt(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  async function handleClick() {
    if (hasNativePrompt && deferredPrompt.current) {
      await deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") setHidden(true);
      deferredPrompt.current = null;
      return;
    }

    setShowHint((v) => !v);
  }

  if (hidden) return null;

  const browser = getBrowserName();
  const hintKey =
    browser === "firefox"
      ? "installFirefox"
      : browser === "safari"
        ? "installSafari"
        : "installGeneric";

  return (
    <>
      <button
        type="button"
        data-parent-ui="true"
        aria-label={t("install")}
        title={t("install")}
        onClick={handleClick}
        className="group flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3 py-2.5 text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-black/45 hover:text-white/95"
      >
        <Download className="h-5 w-5" strokeWidth={2} />
        <span className="text-xs font-medium hidden sm:inline">
          {t("install")}
        </span>
      </button>

      {showHint ? (
        <div
          data-parent-ui="true"
          className="absolute left-0 top-full mt-2 z-40 w-72 rounded-xl border border-white/15 bg-[#0a1225]/95 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <button
            type="button"
            data-parent-ui="true"
            onClick={() => { setShowHint(false); setHidden(true); }}
            className="absolute right-2.5 top-2.5 text-white/40 hover:text-white/70"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="text-xs leading-relaxed text-white/75 pr-5">
            {t(hintKey)}
          </p>
        </div>
      ) : null}
    </>
  );
}
