"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

type PinGateProps = {
  onUnlock: () => void;
};

export function PinGate({ onUnlock }: PinGateProps) {
  const t = useTranslations();
  const parentPin = useAppStore((state) => state.parentPin);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError(false);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (index === 3 && value) {
      const pin = next.join("");
      if (pin === parentPin) {
        onUnlock();
      } else {
        setError(true);
        setDigits(["", "", "", ""]);
        setTimeout(() => inputsRef.current[0]?.focus(), 150);
      }
    }
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
      <div className="text-lg font-semibold text-white">{t("pinPrompt")}</div>
      <div className="flex gap-3">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            data-parent-ui="true"
            autoFocus={i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e.key)}
            className={`h-14 w-12 rounded-lg border bg-white/5 text-center text-2xl font-semibold text-white outline-none transition ${
              error ? "border-red-400/70 animate-shake" : "border-white/15 focus:border-white/40"
            }`}
          />
        ))}
      </div>
      {error && (
        <div className="text-sm text-red-400">{t("pinWrong")}</div>
      )}
    </div>
  );
}
