"use client";

import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { EmojiBlast } from "@/components/EmojiBlast";
import { KeyCounter } from "@/components/KeyCounter";
import { LetterDisplay } from "@/components/LetterDisplay";
import { MilestoneMessage } from "@/components/MilestoneMessage";
import { ParentPanel } from "@/components/ParentPanel";
import { ParentPanelTrigger } from "@/components/ParentPanelTrigger";
import { SessionSummary } from "@/components/SessionSummary";
import { ThreeDErrorBoundary } from "@/components/ThreeDErrorBoundary";
import {
  findArabicLetterByArabicChar,
  findArabicLetterByKey,
  getRandomArabicLetter,
  isArabicCharacter,
  isMappedKey,
} from "@/lib/arabicMap";
import type { AppLocale } from "@/lib/locales";
import { playChime, playConfetti, playSmash, primeSounds } from "@/lib/sounds";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

const ThreeDBackground = dynamic(() => import("@/components/ThreeDBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" />,
});

function getPoint(clientX: number, clientY: number) {
  return {
    x: clientX,
    y: clientY,
    normalizedX: clientX / window.innerWidth,
    normalizedY: clientY / window.innerHeight,
  };
}

function isParentUiTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      '[data-parent-ui="true"], input, select, textarea, button, [contenteditable="true"]',
    ),
  );
}

export default function LocalePage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations();
  const theme = useAppStore((state) => state.theme);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const milestone = useAppStore((state) => state.milestone);
  const setLocale = useAppStore((state) => state.setLocale);
  const registerInteraction = useAppStore((state) => state.registerInteraction);
  const clearMilestone = useAppStore((state) => state.clearMilestone);
  const setParentPanelOpen = useAppStore((state) => state.setParentPanelOpen);
  const ttsSpeed = useAppStore((state) => state.ttsSpeed);
  const keyboardLayout = useAppStore((state) => state.keyboardLayout);
  const sequenceRef = useRef("");
  const pointerRef = useRef({ x: 0, y: 0 });
  const fullscreenAttemptedRef = useRef(false);

  async function ensureFullscreen() {
    if (fullscreenAttemptedRef.current || document.fullscreenElement) {
      return;
    }

    fullscreenAttemptedRef.current = true;

    if (typeof document.documentElement.requestFullscreen !== "function") {
      return;
    }

    try {
      await document.documentElement.requestFullscreen();
    } catch {
      return;
    }
  }

  useEffect(() => {
    setLocale(locale);
    primeSounds();
    primeLetterSounds();
    void ensureFullscreen();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      useAppStore.getState().setReduceMotion(true);
    }

    function onMotionChange(event: MediaQueryListEvent) {
      useAppStore.getState().setReduceMotion(event.matches);
    }

    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [locale, setLocale]);

  useEffect(() => {
    function updateParentSequence(value: string) {
      if (value.length !== 1) {
        return;
      }

      sequenceRef.current = `${sequenceRef.current}${value.toLowerCase()}`.slice(-16);

      if (
        sequenceRef.current.endsWith("parent") ||
        sequenceRef.current.endsWith("والدين")
      ) {
        setParentPanelOpen(true);
        sequenceRef.current = "";
      }
    }

    function handleInput(
      pressed: string,
      source: "keyboard" | "touch",
      point: ReturnType<typeof getPoint>,
    ) {
      void ensureFullscreen();

      const currentTheme = themes[theme];

      playSmash(soundEnabled);

      if (source === "touch") {
        const letter = getRandomArabicLetter();

        registerInteraction({
          kind: "letter",
          letter,
          pressed: letter.ar,
          source,
          ...point,
        });
        if (soundEnabled) playLetterSound(letter.soundId, ttsSpeed);
        return;
      }

      updateParentSequence(pressed);

      if (isArabicCharacter(pressed)) {
        const letter = findArabicLetterByArabicChar(pressed);

        if (letter) {
          registerInteraction({
            kind: "letter",
            letter,
            pressed,
            source,
            ...point,
          });
          if (soundEnabled) playLetterSound(letter.soundId, ttsSpeed);
          return;
        }
      }

      if (isMappedKey(pressed, keyboardLayout)) {
        const letter = findArabicLetterByKey(pressed, keyboardLayout);

        if (letter) {
          registerInteraction({
            kind: "letter",
            letter,
            pressed,
            source,
            ...point,
          });
          if (soundEnabled) playLetterSound(letter.soundId, ttsSpeed);
          return;
        }
      }

      const emoji =
        currentTheme.emojis[Math.floor(Math.random() * currentTheme.emojis.length)];

      registerInteraction({
        kind: "fun",
        emoji,
        pressed,
        source,
        ...point,
      });
      playChime(soundEnabled);
    }

    const trappedKeys = new Set([
      "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
      "Tab", "Escape", "BrowserBack", "BrowserForward", "BrowserHome",
    ]);

    const onKeyDown = (event: KeyboardEvent) => {
      if (isParentUiTarget(event.target)) {
        return;
      }

      if (trappedKeys.has(event.key) || event.altKey || event.metaKey || event.ctrlKey) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      const fallbackPoint =
        pointerRef.current.x > 0 && pointerRef.current.y > 0
          ? getPoint(pointerRef.current.x, pointerRef.current.y)
          : getPoint(window.innerWidth / 2, window.innerHeight / 2);

      handleInput(event.key, "keyboard", fallbackPoint);
    };
    const onTouchStart = (event: TouchEvent) => {
      if (isParentUiTarget(event.target)) {
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      handleInput(
        touch.identifier.toString(),
        "touch",
        getPoint(touch.clientX, touch.clientY),
      );
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [registerInteraction, setParentPanelOpen, soundEnabled, theme, ttsSpeed, keyboardLayout]);

  useEffect(() => {
    if (!milestone) {
      return;
    }

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
    playConfetti(soundEnabled);

    const timeout = window.setTimeout(() => {
      clearMilestone();
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [clearMilestone, milestone, soundEnabled]);

  return (
    <main
      aria-label={t("screenLabel")}
      className="relative h-dvh w-screen overflow-hidden"
      style={{ background: themes[theme].background }}
    >
      <div
        className="absolute inset-0"
        style={{ background: themes[theme].veil }}
      />
      <ThreeDErrorBoundary>
        <ThreeDBackground />
      </ThreeDErrorBoundary>
      <LetterDisplay />
      <EmojiBlast />
      <KeyCounter />
      <ParentPanelTrigger />
      <MilestoneMessage />
      <ParentPanel />
      <SessionSummary />
    </main>
  );
}
