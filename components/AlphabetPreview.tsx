"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { HERO_LETTERS } from "@/lib/heroLetters";

export function AlphabetPreview({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const [selected, setSelected] = useState(0);
  const [audioFailed, setAudioFailed] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  useEffect(() => () => { audio.current?.pause(); }, []);
  const letter = HERO_LETTERS[selected];

  async function playLetter(index: number) {
    setSelected(index);
    setAudioFailed(false);
    audio.current?.pause();
    const sound = new Audio(`/sounds/letters/${HERO_LETTERS[index].id}-ar.mp3`);
    audio.current = sound;
    try { await sound.play(); }
    catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setAudioFailed(true);
    }
  }

  return (
    <div className="alphabet-scene">
      <span className="scene-sun" aria-hidden>☀</span><span className="scene-spark" aria-hidden>✦</span>
      <div className="scene-note">{ar ? "ابدأ بلمسة صغيرة" : "It starts with a little tap"}<span aria-hidden>↘</span></div>
      <div className="alphabet-board">
        <div className="board-top"><span>{ar ? "لنلتقِ بالحروف" : "MEET THE LETTERS"}</span><span aria-hidden>✧ ✧ ✧</span></div>
        <button className="hero-letter" onClick={() => void playLetter(selected)} aria-label={ar ? `استمع إلى ${letter.nameAr}` : `Hear ${letter.name}`}><span lang="ar" className="font-arabic-display">{letter.ar}</span><span className="letter-eyes" aria-hidden><i /><i /></span></button>
        <div className="letter-caption"><span>{letter.nameAr}</span><span aria-hidden>·</span><span>{letter.name}</span><Volume2 size={19} aria-hidden /></div>
        <div className="preview-letters" dir="rtl">
          {HERO_LETTERS.slice(0, 6).map((entry, index) => <button key={entry.id} onClick={() => void playLetter(index)} aria-label={ar ? `اسمع حرف ${entry.nameAr}` : `Listen to ${entry.name}`} aria-pressed={selected === index} className="font-arabic-display">{entry.ar}</button>)}
        </div>
        <p className="board-hint" role="status">{audioFailed ? (ar ? "تعذّر تشغيل الصوت. حاول مرّة أخرى." : "Sound couldn't play. Please try again.") : (ar ? "المس حرفاً واستمع إلى اسمه" : "Tap a letter. Hear a new beginning.")}</p>
      </div>
      <span className="scene-sticker"><span aria-hidden>♡</span>{ar ? "نلعب. نتعلّم. نكبر." : "play. learn. grow."}</span>
    </div>
  );
}
