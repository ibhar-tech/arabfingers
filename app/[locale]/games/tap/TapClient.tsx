"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Volume2 } from "lucide-react";
import { arabicLetters, type ArabicLetter } from "@/lib/arabicMap";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";
import { playChime } from "@/lib/sounds";
import { award, getProgress } from "@/lib/progress";

/**
 * Tap-the-letter game. The child hears a letter's sound (and sees its name) and taps
 * the matching glyph among four choices. Correct → chime, confetti, a star, next
 * question. Wrong → the tile shakes and the child tries again.
 *
 * Audio-first so it works for pre-readers; all content is our own 28 letters and the
 * neural recordings we already ship (lib/letterSounds).
 */

const CHOICES = 4;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Question = { target: ArabicLetter; choices: ArabicLetter[] };

function buildQuestion(targetIndex: number): Question {
  const target = arabicLetters[targetIndex];
  const distractors = shuffle(arabicLetters.filter((l) => l.ar !== target.ar)).slice(0, CHOICES - 1);
  return { target, choices: shuffle([target, ...distractors]) };
}

export default function TapClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAr = locale === "ar";

  // A shuffled deck of all 28 so every letter is asked before any repeats.
  const deck = useRef<number[]>([]);
  const cursor = useRef(0);

  const [question, setQuestion] = useState<Question | null>(null);
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState(false);
  const [tapped, setTapped] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    if (cursor.current >= deck.current.length) {
      deck.current = shuffle(arabicLetters.map((_, i) => i));
      cursor.current = 0;
    }
    const q = buildQuestion(deck.current[cursor.current]);
    cursor.current += 1;
    setWrong(new Set());
    setSolved(false);
    setQuestion(q);
    playLetterSound(q.target.soundId);
  }, []);

  useEffect(() => {
    primeLetterSounds();
    setTapped(getProgress().tapped);
    deck.current = shuffle(arabicLetters.map((_, i) => i));
    cursor.current = 0;
    nextQuestion();
  }, [nextQuestion]);

  const onPick = (letter: ArabicLetter) => {
    if (!question || solved || wrong.has(letter.ar)) return;

    if (letter.ar === question.target.ar) {
      setSolved(true);
      setStreak((s) => s + 1);
      playChime(true);
      confetti({ particleCount: 140, spread: 70, origin: { y: 0.55 }, colors: ["#10a39a", "#ffb22e", "#ff5da2"] });
      setTapped(award("tapped", letter.ar).tapped);
      window.setTimeout(nextQuestion, 950);
    } else {
      setWrong((prev) => new Set(prev).add(letter.ar));
      setStreak(0);
    }
  };

  if (!question) {
    return (
      <div className="flex h-[calc(100dvh-var(--header-h))] w-full items-center justify-center bg-canvas">
        <div className="animate-bounce text-6xl">👂</div>
      </div>
    );
  }

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative flex h-[calc(100dvh-var(--header-h))] w-full select-none flex-col overflow-hidden bg-canvas"
    >
      {/* soft blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -start-16 -top-10 h-72 w-72 rounded-full bg-saffron/15 blur-[90px]" />
        <div className="absolute -end-16 bottom-1/4 h-80 w-80 rounded-full bg-violet/15 blur-[100px]" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-start justify-between gap-2 p-3">
        <div className="card-stock flex items-center gap-1.5 px-3 py-2 text-sm font-extrabold text-ink/70">
          🔥 {streak}
        </div>
        <div className="card-stock flex items-center gap-1.5 px-3 py-2 text-sm font-extrabold text-ink/70">
          ⭐ {tapped.length}/{arabicLetters.length}
        </div>
      </div>

      {/* Prompt */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-extrabold text-ink/55">
            {isAr ? "أين هذا الحرف؟" : "Where is this letter?"}
          </p>
          <button
            type="button"
            onClick={() => playLetterSound(question.target.soundId)}
            className="btn-chunky flex items-center gap-3 rounded-full px-6 py-4"
            aria-label={isAr ? "استمع مرة أخرى" : "Listen again"}
          >
            <Volume2 className="h-7 w-7" />
            <span className="font-display text-xl font-extrabold">
              {isAr ? question.target.arName : question.target.enName}
            </span>
          </button>
        </div>

        {/* Choices */}
        <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4">
          {question.choices.map((choice) => {
            const isWrong = wrong.has(choice.ar);
            const isSolvedTile = solved && choice.ar === question.target.ar;
            return (
              <button
                key={choice.ar}
                type="button"
                onClick={() => onPick(choice)}
                disabled={isWrong || solved}
                aria-label={isAr ? choice.arName : choice.enName}
                className={`flex aspect-[4/3] items-center justify-center rounded-3xl border-[3px] border-ink font-arabic-display text-6xl transition sm:text-7xl ${
                  isSolvedTile
                    ? "bg-qalam text-card shadow-[4px_4px_0_0_var(--ink)]"
                    : isWrong
                      ? "wrong-shake border-ink/20 bg-ink/5 text-ink/30"
                      : "bg-card text-ink shadow-[4px_4px_0_0_var(--ink)] hover:bg-saffron-soft active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--ink)]"
                }`}
              >
                {choice.ar}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-5">
        <p className="text-xs font-extrabold text-ink/45">
          {isAr ? "اسمع الصوت ثم انقر الحرف الصحيح" : "Listen, then tap the right letter"}
        </p>
        <Link href={`/${locale}/games`} className="text-xs font-bold text-ink/50 underline hover:text-ink">
          {isAr ? "كل الألعاب" : "All games"}
        </Link>
      </div>
    </div>
  );
}
