"use client";

import { useEffect, useState } from "react";
import { playWord } from "@/lib/sounds";

const AUDIO_MAPPING: Record<string, string> = {
  // Colors
  "أحمر": "/sounds/colors/red.mp3",
  "أزرق": "/sounds/colors/blue.mp3",
  "أخضر": "/sounds/colors/green.mp3",
  "أصفر": "/sounds/colors/yellow.mp3",
  "برتقالي": "/sounds/colors/orange.mp3",
  "بنفسجي": "/sounds/colors/purple.mp3",
  "وردي": "/sounds/colors/pink.mp3",
  "أبيض": "/sounds/colors/white.mp3",
  "أسود": "/sounds/colors/black.mp3",
  "بني": "/sounds/colors/brown.mp3",
  "رمادي": "/sounds/colors/gray.mp3",
  "ذهبي": "/sounds/colors/gold.mp3",

  // Numbers
  "صفر": "/sounds/numbers/zero.mp3",
  "واحد": "/sounds/numbers/one.mp3",
  "اثنان": "/sounds/numbers/two.mp3",
  "ثلاثة": "/sounds/numbers/three.mp3",
  "أربعة": "/sounds/numbers/four.mp3",
  "خمسة": "/sounds/numbers/five.mp3",
  "ستة": "/sounds/numbers/six.mp3",
  "سبعة": "/sounds/numbers/seven.mp3",
  "ثمانية": "/sounds/numbers/eight.mp3",
  "تسعة": "/sounds/numbers/nine.mp3",
  "عشرة": "/sounds/numbers/ten.mp3",
};

/**
 * Speaks an Arabic word using the pre-recorded neural clips we ship ourselves.
 *
 * No runtime TTS: browser speechSynthesis has no Arabic voice on most Androids and
 * sounds robotic where it does, and hotlinking a third-party TTS endpoint from a
 * children's page is both unreliable and a privacy leak. Words we have no recording
 * for simply don't get a button — see scripts/generate-voiceovers-google.js to add one.
 */
export function SpeakButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [speaking, setSpeaking] = useState(false);
  const src = AUDIO_MAPPING[text.trim()];

  useEffect(() => {
    if (!speaking) return;
    const timer = window.setTimeout(() => setSpeaking(false), 1500);
    return () => window.clearTimeout(timer);
  }, [speaking]);

  if (!src) return null;

  const speak = () => {
    setSpeaking(true);
    playWord(src)?.once("end", () => setSpeaking(false));
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label ?? `Listen: ${text}`}
      title={label ?? "Listen"}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent ${
        speaking ? "bg-accent/20 border-accent animate-pulse" : ""
      } ${className}`}
    >
      🔊
    </button>
  );
}
