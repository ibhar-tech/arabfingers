"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Apple, Check, RotateCcw, Volume2 } from "lucide-react";

const ROUNDS = { first: [3, 1, 5, 2, 4], next: [7, 10, 6, 9, 8] };
const NUMBER_NAMES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const ARABIC_NAMES = ["صِفْر", "وَاحِد", "اِثْنَان", "ثَلَاثَة", "أَرْبَعَة", "خَمْسَة", "سِتَّة", "سَبْعَة", "ثَمَانِيَة", "تِسْعَة", "عَشَرَة"];

export function CountingGame({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const [level, setLevel] = useState<keyof typeof ROUNDS>("first");
  const [round, setRound] = useState(0);
  const [counted, setCounted] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [audioError, setAudioError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const sound = useRef<HTMLAudioElement | null>(null);
  useEffect(() => () => { sound.current?.pause(); }, []);
  const finished = round === ROUNDS[level].length;
  const target = ROUNDS[level][Math.min(round, ROUNDS[level].length - 1)];
  const correct = answer === target;
  const min = level === "first" ? 1 : 6;
  const options = [target, min + ((target - min + 1) % 5), min + ((target - min + 3) % 5)].sort((a, b) => a - b);
  const number = (n: number) => n.toLocaleString(ar ? "ar-u-nu-latn" : "en");

  function reset(nextLevel: keyof typeof ROUNDS) {
    sound.current?.pause();
    setLevel(nextLevel); setRound(0); setAnswer(null); setCounted([]); setAudioError(false);
  }

  function advance() {
    sound.current?.pause();
    setRound(round + 1); setAnswer(null); setCounted([]); setAudioError(false);
    heading.current?.focus();
  }

  async function hearNumber() {
    sound.current?.pause();
    setAudioError(false);
    const audio = new Audio(`/sounds/numbers/${NUMBER_NAMES[target]}.mp3`);
    sound.current = audio;
    try { await audio.play(); }
    catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setAudioError(true);
    }
  }

  return (
    <section className="counting-game" aria-label={ar ? "لعبة العدّ" : "Counting game"}>
      <div className="counting-toolbar"><div role="group" aria-label={ar ? "مستوى الأرقام" : "Number range"}>
        <button aria-pressed={level === "first"} onClick={() => reset("first")}>{ar ? "1–5" : "1–5"}</button>
        <button aria-pressed={level === "next"} onClick={() => reset("next")}>{ar ? "6–10" : "6–10"}</button>
      </div><span>{ar ? `أكملت ${number(round)} من ${number(5)}` : `${round} of 5 completed`}</span></div>
      <div className="counting-progress" role="progressbar" aria-label={ar ? "التقدّم" : "Progress"} aria-valuemin={0} aria-valuemax={5} aria-valuenow={round}><span style={{ width: `${round * 20}%` }} /></div>
      <h2 ref={heading} tabIndex={-1}>{finished ? (ar ? "خمسة اكتشافات رائعة!" : "Five lovely discoveries!") : (ar ? "كم تفّاحة في الحديقة؟" : "How many apples in the garden?")}</h2>
      {finished ? <div className="counting-complete"><span aria-hidden>🌱</span><p>{ar ? "أحسنت! واصل التدريب على الورق أو جرّب مجموعة أرقام أخرى." : "You did it! Take your counting to paper, or explore another set of numbers."}</p><div className="hero-actions"><button className="discovery-button" onClick={() => reset(level === "first" ? "next" : "first")}>{ar ? "جرّب الأرقام الأخرى" : "Try the other numbers"}</button><button className="discovery-button secondary" onClick={() => reset(level)}><RotateCcw size={18} />{ar ? "العب مجدّداً" : "Play again"}</button><Link className="discovery-button secondary" href={`/${locale}/printables/arabic-numbers-tracing`}>{ar ? "أوراق الأرقام للطباعة" : "Print number worksheets"}</Link></div></div> : <>
        <p className="counting-instruction">{ar ? "المس كل تفّاحة مرّة، ثم اختر الرقم المطابق." : "Tap each apple once, then choose the matching number."}</p>
        <div className="apple-garden" role="group" aria-label={ar ? "تفّاح للعدّ" : "Apples to count"}>
          {Array.from({ length: target }, (_, index) => <button key={`${round}-${index}`} aria-label={ar ? `تفّاحة ${number(index + 1)}` : `Apple ${index + 1}`} aria-pressed={counted.includes(index)} onClick={() => { if (!counted.includes(index)) setCounted([...counted, index]); }}><Apple size={48} fill="currentColor" aria-hidden />{counted.includes(index) && <span>{number(counted.indexOf(index) + 1)}</span>}</button>)}
        </div>
        <p className="counted-total" aria-live="polite">{ar ? `عَدَدْتَ: ${number(counted.length)}` : `You've counted: ${counted.length}`}</p>
        <div className="counting-answers" role="group" aria-label={ar ? "اختر العدد" : "Choose the number"}>
          {options.map((option) => <button key={option} disabled={correct} aria-label={ar ? `اختر ${option.toLocaleString("ar-u-nu-latn")}` : `Choose ${option}`} className={answer === option ? (correct ? "answer-correct" : "answer-retry") : ""} onClick={() => setAnswer(option)}><strong dir="ltr">{option}</strong>{correct && option === target && <Check size={18} aria-hidden />}</button>)}
        </div>
        <div className="counting-feedback" role="status">{answer === null ? (ar ? "خذ وقتك، لا توجد ساعة توقيت." : "Take your time. There is no timer.") : correct ? (ar ? `أحسنت! العدد هو ${ARABIC_NAMES[target]}.` : `That's right! ${target} — ${ARABIC_NAMES[target]}.`) : (ar ? "لنعدّ التفّاح مرّة أخرى. يمكنك المحاولة مجدّداً." : "Let's count the apples again. You can try again.")}</div>
        {correct && <div className="counting-next"><button className="discovery-button secondary" onClick={() => void hearNumber()}><Volume2 size={19} aria-hidden />{ar ? "استمع إلى العدد" : "Hear it in Arabic"}</button><button className="discovery-button" onClick={advance}>{round === 4 ? (ar ? "أكمل النشاط" : "Finish activity") : (ar ? "الاكتشاف التالي" : "Next discovery")}</button></div>}
        {audioError && <p role="status">{ar ? "تعذّر تشغيل الصوت. حاول مجدّداً." : "Sound couldn't play. Please try again."}</p>}
      </>}
    </section>
  );
}
