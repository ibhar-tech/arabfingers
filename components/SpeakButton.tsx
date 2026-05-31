"use client";
 
import { useEffect, useState, useRef } from "react";
 
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
  "واحد": "/sounds/numbers/one.mp3",
  "اثنان": "/sounds/numbers/two.mp3",
  "ثلاثة": "/sounds/numbers/three.mp3",
  "أربعة": "/sounds/numbers/four.mp3",
  "خمسة": "/sounds/numbers/five.mp3",
  "ستة": "/sounds/numbers/six.mp3",
  "سبعة": "/sounds/numbers/seven.mp3",
  "ثمانية": "/sounds/numbers/eight.mp3",
  "تسعة": "/sounds/numbers/nine.mp3",
  "عشرة": "/sounds/numbers/ten.mp3"
};
 
/**
 * Small progressive-enhancement button that speaks an Arabic word aloud using
 * high-quality pre-recorded studio files, falling back to Web Speech API.
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
 
  useEffect(() => {
    setSupported(typeof window !== "undefined" && ("speechSynthesis" in window || "Audio" in window));
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
 
  if (!supported) return null;
 
  const speak = () => {
    // 1. Stop any currently active audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
 
    const speakFallback = () => {
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
 
    const mappedAudioSrc = AUDIO_MAPPING[text.trim()];
    if (mappedAudioSrc) {
      const audio = new Audio(mappedAudioSrc);
      audioRef.current = audio;
      
      audio.addEventListener("canplaythrough", () => {
        setSpeaking(true);
        audio.play().catch(() => {
          speakFallback();
        });
      });
 
      audio.addEventListener("ended", () => {
        setSpeaking(false);
      });
 
      audio.addEventListener("error", () => {
        speakFallback();
      });
    } else {
      speakFallback();
    }
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
