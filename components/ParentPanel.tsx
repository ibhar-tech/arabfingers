"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Hash,
  Keyboard,
  Languages,
  LockKeyhole,
  Mic,
  Minimize,
  PaintBucket,
  Turtle,
  Volume2,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState, type ReactNode } from "react";
import { themeNames, type ThemeName } from "@/lib/themes";
import { keyboardLayouts, type KeyboardLayoutId } from "@/lib/keyboardLayouts";
import { useAppStore, type DisplayMode } from "@/store/useAppStore";
import { PinGate } from "@/components/PinGate";

type ToggleRowProps = {
  label: string;
  icon: ReactNode;
  enabled: boolean;
  onToggle: () => void;
};

type SegmentedOptionProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function ToggleRow({ label, icon, enabled, onToggle }: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/8"
    >
      <span className="flex items-center gap-3 text-sm text-white">
        <span className="text-white/78">{icon}</span>
        {label}
      </span>
      <span
        className={`flex h-7 w-12 items-center rounded-full border px-1 transition ${
          enabled
            ? "justify-end border-transparent bg-white/85"
            : "justify-start border-white/10 bg-black/30"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full ${
            enabled ? "bg-[#08101d]" : "bg-white/55"
          }`}
        />
      </span>
    </button>
  );
}

function SegmentedOption({
  label,
  selected,
  onClick,
}: SegmentedOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-sm transition ${
        selected
          ? "border-transparent bg-white/88 text-[#07111f]"
          : "border-white/10 bg-white/5 text-white/72 hover:bg-white/8"
      }`}
    >
      {label}
    </button>
  );
}

export function ParentPanel() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const parentPanelOpen = useAppStore((state) => state.parentPanelOpen);
  const setParentPanelOpen = useAppStore((state) => state.setParentPanelOpen);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const showCounter = useAppStore((state) => state.showCounter);
  const displayMode = useAppStore((state) => state.displayMode);
  const theme = useAppStore((state) => state.theme);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);
  const setReduceMotion = useAppStore((state) => state.setReduceMotion);
  const setShowCounter = useAppStore((state) => state.setShowCounter);
  const setDisplayMode = useAppStore((state) => state.setDisplayMode);
  const setTheme = useAppStore((state) => state.setTheme);
  const setLocale = useAppStore((state) => state.setLocale);
  const ttsSpeed = useAppStore((state) => state.ttsSpeed);
  const setTtsSpeed = useAppStore((state) => state.setTtsSpeed);
  const parentPin = useAppStore((state) => state.parentPin);
  const setParentPin = useAppStore((state) => state.setParentPin);
  const setSessionSummaryOpen = useAppStore((state) => state.setSessionSummaryOpen);
  const keyboardLayout = useAppStore((state) => state.keyboardLayout);
  const setKeyboardLayout = useAppStore((state) => state.setKeyboardLayout);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");

  function switchLocale(nextLocale: "ar" | "en") {
    const nextPath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);

    startTransition(() => {
      setLocale(nextLocale);
      router.replace(nextPath);
    });
  }

  function exitFullscreen() {
    if (!document.fullscreenElement) {
      return;
    }

    void document.exitFullscreen().catch(() => undefined);
  }

  function renderDisplayOptions(value: DisplayMode, label: string) {
    return (
      <SegmentedOption
        key={value}
        label={label}
        selected={displayMode === value}
        onClick={() => setDisplayMode(value)}
      />
    );
  }

  return (
    <AnimatePresence>
      {parentPanelOpen ? (
        <div
          className="absolute inset-0 z-50"
          data-parent-ui="true"
          onClick={() => { setParentPanelOpen(false); setPinUnlocked(false); }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/44 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: locale === "ar" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === "ar" ? "100%" : "-100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            data-parent-ui="true"
            onClick={(event) => event.stopPropagation()}
            className={`absolute inset-y-0 flex w-[min(92vw,26rem)] flex-col border-white/12 bg-[#07101d]/94 px-5 py-5 shadow-[0_28px_90px_rgba(0,0,0,0.45)] ${
              locale === "ar" ? "right-0 border-l" : "left-0 border-r"
            }`}
          >
            {parentPin && !pinUnlocked ? (
              <PinGate onUnlock={() => setPinUnlocked(true)} />
            ) : (
            <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="text-xl font-semibold text-white">{t("panelTitle")}</div>
              <button
                type="button"
                aria-label={t("close")}
                onClick={() => { setParentPanelOpen(false); setPinUnlocked(false); }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/8"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto pb-8">
              <section className="space-y-3">
                <ToggleRow
                  label={t("sound")}
                  enabled={soundEnabled}
                  onToggle={() => setSoundEnabled(!soundEnabled)}
                  icon={<Volume2 className="h-4 w-4" />}
                />
                <ToggleRow
                  label={t("reduceMotion")}
                  enabled={reduceMotion}
                  onToggle={() => setReduceMotion(!reduceMotion)}
                  icon={<Turtle className="h-4 w-4" />}
                />
                <ToggleRow
                  label={t("showCounter")}
                  enabled={showCounter}
                  onToggle={() => setShowCounter(!showCounter)}
                  icon={<Hash className="h-4 w-4" />}
                />
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <Languages className="h-4 w-4" />
                  {t("languageDisplay")}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {renderDisplayOptions("arabic", t("arabicOnly"))}
                  {renderDisplayOptions("english", t("englishOnly"))}
                  {renderDisplayOptions("both", t("both"))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <Languages className="h-4 w-4" />
                  {t("uiLanguage")}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <SegmentedOption
                    label={t("arabicLabel")}
                    selected={locale === "ar"}
                    onClick={() => switchLocale("ar")}
                  />
                  <SegmentedOption
                    label={t("englishLabel")}
                    selected={locale === "en"}
                    onClick={() => switchLocale("en")}
                  />
                </div>
              </section>

              <section className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-white/68">
                  <PaintBucket className="h-4 w-4" />
                  {t("theme")}
                </label>
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <select
                    data-parent-ui="true"
                    value={theme}
                    onChange={(event) => setTheme(event.target.value as ThemeName)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  >
                    {themeNames.map((themeName) => (
                      <option
                        key={themeName}
                        value={themeName}
                        className="bg-[#091321] text-white"
                      >
                        {t(`theme_${themeName}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-white/68">
                  <Keyboard className="h-4 w-4" />
                  {t("keyboardLayout")}
                </label>
                <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <select
                    data-parent-ui="true"
                    value={keyboardLayout}
                    onChange={(event) => setKeyboardLayout(event.target.value as KeyboardLayoutId)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  >
                    {keyboardLayouts.map((layout) => (
                      <option
                        key={layout.id}
                        value={layout.id}
                        className="bg-[#091321] text-white"
                      >
                        {t(layout.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <Mic className="h-4 w-4" />
                  {t("ttsSpeed")}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <SegmentedOption
                    label={t("ttsSpeedSlow")}
                    selected={ttsSpeed === 0.6}
                    onClick={() => setTtsSpeed(0.6)}
                  />
                  <SegmentedOption
                    label={t("ttsSpeedNormal")}
                    selected={ttsSpeed === 0.9}
                    onClick={() => setTtsSpeed(0.9)}
                  />
                  <SegmentedOption
                    label={t("ttsSpeedFast")}
                    selected={ttsSpeed === 1.2}
                    onClick={() => setTtsSpeed(1.2)}
                  />
                </div>
              </section>

              {/* Session Stats */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <BarChart3 className="h-4 w-4" />
                  {t("sessionStats")}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-white/8 bg-white/5 p-3 text-center">
                    <div className="text-lg font-semibold text-accent">{useAppStore.getState().keyCount}</div>
                    <div className="text-[10px] text-white/40">{t("totalPresses")}</div>
                  </div>
                  <div className="rounded-lg border border-white/8 bg-white/5 p-3 text-center">
                    <div className="text-lg font-semibold text-accent">{useAppStore.getState().uniqueLetters.size}/28</div>
                    <div className="text-[10px] text-white/40">{t("lettersFound")}</div>
                  </div>
                  <div className="rounded-lg border border-white/8 bg-white/5 p-3 text-center">
                    <div className="text-lg font-semibold text-accent">
                      {Math.floor((Date.now() - useAppStore.getState().sessionStartTime) / 60000)}m
                    </div>
                    <div className="text-[10px] text-white/40">{t("sessionTime")}</div>
                  </div>
                </div>
              </section>

              <button
                type="button"
                onClick={() => { setSessionSummaryOpen(true); setParentPanelOpen(false); setPinUnlocked(false); }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/8"
              >
                <BarChart3 className="h-4 w-4" />
                {t("viewSummary")}
              </button>

              <button
                type="button"
                onClick={exitFullscreen}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/8"
              >
                <Minimize className="h-4 w-4" />
                {t("exitFullscreen")}
              </button>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/68">
                  <LockKeyhole className="h-4 w-4" />
                  {t("pinLock")}
                </div>
                {parentPin ? (
                  <button
                    type="button"
                    onClick={() => setParentPin(null)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/8"
                  >
                    {t("pinRemove")}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder={t("pinPlaceholder")}
                      data-parent-ui="true"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                    />
                    <button
                      type="button"
                      disabled={pinInput.length !== 4}
                      onClick={() => { setParentPin(pinInput); setPinInput(""); }}
                      className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15 disabled:opacity-40"
                    >
                      {t("pinSet")}
                    </button>
                  </div>
                )}
              </section>
            </div>
            </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
