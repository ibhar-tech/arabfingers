"use client";

import { useEffect, useState } from "react";

/**
 * Small progressive-enhancement button that speaks an Arabic word aloud using the
 * browser's Web Speech API. Renders nothing if speech synthesis is unavailable, so
 * server-rendered content stays intact and accessible without it.
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
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  if (!supported) return null;

  const speak = () => {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ar-SA";
      utter.rate = 0.85;
      const arVoice = window.speechSynthesis
        .getVoices()
        .find((v) => v.lang?.toLowerCase().startsWith("ar"));
      if (arVoice) utter.voice = arVoice;
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utter);
    } catch {
      setSpeaking(false);
    }
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label ?? `Listen: ${text}`}
      title={label ?? "Listen"}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent ${
        speaking ? "bg-accent/20 border-accent" : ""
      } ${className}`}
    >
      🔊
    </button>
  );
}
