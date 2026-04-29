"use client";

import { Download, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __pwaPrompt: BeforeInstallPromptEvent | null;
  }
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

  useEffect(() => {
    if (isStandalone()) {
      setHidden(true);
      return;
    }

    // Check if the head script already captured the event
    if (window.__pwaPrompt) {
      setHasNativePrompt(true);
    }

    // Listen for future events too
    function onBeforeInstall(e: Event) {
      e.preventDefault();
      window.__pwaPrompt = e as BeforeInstallPromptEvent;
      setHasNativePrompt(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // Poll briefly in case the event fired between head script and this effect
    const poll = setInterval(() => {
      if (window.__pwaPrompt) {
        setHasNativePrompt(true);
        clearInterval(poll);
      }
    }, 500);

    const stopPoll = setTimeout(() => clearInterval(poll), 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      clearInterval(poll);
      clearTimeout(stopPoll);
    };
  }, []);

  async function handleClick() {
    if (hasNativePrompt && window.__pwaPrompt) {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          // Small delay to let the browser exit fullscreen visually before prompting
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        await window.__pwaPrompt.prompt();
        const { outcome } = await window.__pwaPrompt.userChoice;
        if (outcome === "accepted") setHidden(true);
      } catch (err) {
        // prompt failed
        console.error("Install prompt failed:", err);
      }
      window.__pwaPrompt = null;
      setHasNativePrompt(false);
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
