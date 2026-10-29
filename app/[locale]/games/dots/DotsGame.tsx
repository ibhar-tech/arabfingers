"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, RotateCcw, Volume2 } from "lucide-react";
import { arabicLetters } from "@/lib/arabicMap";
import { DOT_FAMILIES, dotsPhrase } from "@/lib/letterDots";
import { playLetterSound } from "@/lib/letterSounds";
import { playChime } from "@/lib/sounds";
import { useAppStore } from "@/store/useAppStore";

/**
 * "How many dots?" — a family of look-alike letters (ب ت ث) and one
 * description ("two dots above"); the child taps the letter it describes.
 * Reading the dots is exactly the skill that separates these letters, and it
 * is visual, so it works before a child can read words. Ten rounds, no timer,
 * no penalty for a wrong tap.
 */

const ROUNDS = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Round = { target: string; choices: string[] };

function buildRounds(): Round[] {
  const targets = shuffle(DOT_FAMILIES.flatMap((f) => f.map((ch) => ({ ch, family: f })))).slice(0, ROUNDS);
  return targets.map(({ ch, family }) => ({ target: ch, choices: shuffle(family) }));
}

const letterInfo = (ch: string) => arabicLetters.find((l) => l.ar === ch)!;

export function DotsGame({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const [rounds, setRounds] = useState<Round[]>(buildRounds);
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const soundEnabled = () => useAppStore.getState().soundEnabled;

  const finished = round === rounds.length;
  const current = rounds[Math.min(round, rounds.length - 1)];
  const correct = picked === current.target;
  const phrase = dotsPhrase(current.target);
  const info = letterInfo(current.target);

  function choose(ch: string) {
    if (correct) return;
    setPicked(ch);
    if (ch === current.target) {
      playChime(soundEnabled());
      if (soundEnabled()) playLetterSound(info.soundId);
    }
  }

  function next() {
    setRound(round + 1);
    setPicked(null);
  }

  function restart() {
    setRounds(buildRounds());
    setRound(0);
    setPicked(null);
  }

  return (
    <section className="counting-game" aria-label={ar ? "لعبة كم نقطة؟" : "How many dots? game"}>
      <div className="counting-toolbar">
        <span>{ar ? `السؤال ${Math.min(round + 1, ROUNDS)} من ${ROUNDS}` : `Question ${Math.min(round + 1, ROUNDS)} of ${ROUNDS}`}</span>
        <button onClick={restart}><RotateCcw size={16} aria-hidden /> {ar ? "من جديد" : "Start again"}</button>
      </div>
      <div className="counting-progress" role="progressbar" aria-label={ar ? "التقدّم" : "Progress"} aria-valuemin={0} aria-valuemax={ROUNDS} aria-valuenow={round}>
        <span style={{ width: `${(round / ROUNDS) * 100}%` }} />
      </div>

      {finished ? (
        <div className="counting-complete">
          <span aria-hidden>🌟</span>
          <h2>{ar ? "عشر إجابات! عيناك حادّتان." : "Ten out of ten! Sharp eyes."}</h2>
          <p>{ar ? "النقاط هي ما يفرّق بين الحروف المتشابهة. جرّب الجولة مرّة أخرى، أو تتبّع هذه الحروف على الورق." : "Dots are what tell these letters apart. Play another round, or trace the same letters on paper."}</p>
          <div className="hero-actions">
            <button className="discovery-button" onClick={restart}><RotateCcw size={18} aria-hidden />{ar ? "جولة جديدة" : "New round"}</button>
            <Link className="discovery-button secondary" href={`/${locale}/printables/arabic-alphabet-tracing`}>{ar ? "أوراق تتبّع الحروف" : "Letter tracing sheets"}</Link>
          </div>
        </div>
      ) : (
        <>
          <h2>{ar ? `انقر الحرف الذي ${phrase.ar}` : `Tap the letter with ${phrase.en}`}</h2>
          <p className="counting-instruction">{ar ? "انظر إلى النقاط: كم عددها؟ وهل هي فوق الحرف أم تحته؟" : "Look at the dots: how many, and are they above or below?"}</p>
          <div className="counting-answers dots-choices" role="group" aria-label={ar ? "اختر الحرف" : "Choose the letter"}>
            {current.choices.map((ch) => {
              const state = picked === ch ? (ch === current.target ? "answer-correct" : "answer-retry") : "";
              return (
                <button
                  key={`${round}-${ch}`}
                  className={state}
                  disabled={correct}
                  aria-label={letterInfo(ch).enName}
                  data-target={ch === current.target ? "true" : undefined}
                  onClick={() => choose(ch)}
                >
                  <strong lang="ar">{ch}</strong>
                  {correct && ch === current.target && <Check size={18} aria-hidden />}
                </button>
              );
            })}
          </div>
          <div className="counting-feedback" role="status">
            {picked === null
              ? (ar ? "خذ وقتك، لا توجد ساعة توقيت." : "Take your time. There is no timer.")
              : correct
                ? (ar ? `أحسنت! هذا حرف ${info.arName} (${info.ar}).` : `Yes! That's ${info.enName} (${info.ar}).`)
                : (ar ? "عُدّ النقاط مرّة أخرى، يمكنك المحاولة من جديد." : "Count the dots again — you can try another one.")}
          </div>
          {correct && (
            <div className="counting-next">
              <button className="discovery-button secondary" onClick={() => playLetterSound(info.soundId)}>
                <Volume2 size={19} aria-hidden />{ar ? "استمع إلى الحرف" : "Hear the letter"}
              </button>
              <button className="discovery-button" onClick={next}>
                {round === ROUNDS - 1 ? (ar ? "أنهِ الجولة" : "Finish") : (ar ? "السؤال التالي" : "Next question")}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
