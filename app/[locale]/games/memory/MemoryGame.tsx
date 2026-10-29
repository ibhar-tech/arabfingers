"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { playLetterSound } from "@/lib/letterSounds";
import { playChime } from "@/lib/sounds";
import { useAppStore } from "@/store/useAppStore";

/**
 * Memory match: each letter is paired with a picture word that starts with it
 * (ب ↔ 🚪 باب). Turning a letter card says the letter, so the game is a
 * letter-sound-word drill disguised as pairs. Two sizes: 4 pairs or 6 pairs.
 */

export type MemoryPair = { ar: string; soundId: string; word: string; emoji: string; meaningEn: string; meaningAr: string };
type Card = { key: string; pair: string; kind: "letter" | "word"; data: MemoryPair };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function deal(pairs: MemoryPair[], size: number): Card[] {
  const chosen = shuffle(pairs).slice(0, size);
  return shuffle(chosen.flatMap((p) => [
    { key: `${p.ar}-l`, pair: p.ar, kind: "letter" as const, data: p },
    { key: `${p.ar}-w`, pair: p.ar, kind: "word" as const, data: p },
  ]));
}

export function MemoryGame({ locale, pairs }: { locale: string; pairs: MemoryPair[] }) {
  const ar = locale === "ar";
  const [size, setSize] = useState<4 | 6>(4);
  const [cards, setCards] = useState<Card[]>(() => deal(pairs, 4));
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState("");
  const flipBack = useRef<number | null>(null);
  const soundEnabled = () => useAppStore.getState().soundEnabled;
  const finished = matched.length === size;

  function restart(nextSize: 4 | 6 = size) {
    if (flipBack.current) window.clearTimeout(flipBack.current);
    setSize(nextSize);
    setCards(deal(pairs, nextSize));
    setOpen([]); setMatched([]); setMoves(0); setMessage("");
  }

  function flip(card: Card) {
    if (open.length === 2 || open.includes(card.key) || matched.includes(card.pair)) return;
    if (card.kind === "letter" && soundEnabled()) playLetterSound(card.data.soundId);
    const nowOpen = [...open, card.key];
    setOpen(nowOpen);
    if (nowOpen.length < 2) return;

    setMoves(moves + 1);
    const [a, b] = nowOpen.map((k) => cards.find((c) => c.key === k)!);
    if (a.pair === b.pair) {
      playChime(soundEnabled());
      setMatched([...matched, a.pair]);
      setOpen([]);
      setMessage(ar ? `زوج! ${a.data.ar} — ${a.data.word}` : `A pair! ${a.data.ar} — ${a.data.word} (${a.data.meaningEn})`);
    } else {
      setMessage(ar ? "ليسا زوجاً. تذكّر مكانهما!" : "Not a pair. Remember where they are!");
      flipBack.current = window.setTimeout(() => setOpen([]), 1100);
    }
  }

  const label = (c: Card, up: boolean) => {
    if (!up) return ar ? "بطاقة مقلوبة" : "Face-down card";
    return c.kind === "letter" ? (ar ? `الحرف ${c.data.ar}` : `Letter ${c.data.ar}`) : `${c.data.word} — ${ar ? c.data.meaningAr : c.data.meaningEn}`;
  };

  return (
    <section className="counting-game" aria-label={ar ? "لعبة الذاكرة" : "Memory game"}>
      <div className="counting-toolbar">
        <div role="group" aria-label={ar ? "عدد الأزواج" : "Number of pairs"}>
          <button aria-pressed={size === 4} onClick={() => restart(4)}>{ar ? "4 أزواج" : "4 pairs"}</button>
          <button aria-pressed={size === 6} onClick={() => restart(6)}>{ar ? "6 أزواج" : "6 pairs"}</button>
        </div>
        <span>{ar ? `المحاولات: ${moves}` : `Moves: ${moves}`}</span>
      </div>

      {finished ? (
        <div className="counting-complete">
          <span aria-hidden>🎉</span>
          <h2>{ar ? `وجدت الأزواج كلّها في ${moves} محاولة!` : `All pairs found in ${moves} moves!`}</h2>
          <p>{ar ? "كلّ حرف مع كلمة تبدأ به. جرّب لعبة أكبر، أو اطبع بطاقات الحروف لتلعبوها على الطاولة." : "Every letter with a word that starts with it. Try a bigger board, or print the flashcards and play on the table."}</p>
          <div className="hero-actions">
            <button className="discovery-button" onClick={() => restart(size === 4 ? 6 : 4)}>{size === 4 ? (ar ? "جرّب 6 أزواج" : "Try 6 pairs") : (ar ? "جرّب 4 أزواج" : "Try 4 pairs")}</button>
            <button className="discovery-button secondary" onClick={() => restart()}><RotateCcw size={18} aria-hidden />{ar ? "العب مجدّداً" : "Play again"}</button>
            <Link className="discovery-button secondary" href={`/${locale}/printables/arabic-alphabet-flashcards`}>{ar ? "بطاقات الحروف للطباعة" : "Printable flashcards"}</Link>
          </div>
        </div>
      ) : (
        <>
          <h2>{ar ? "طابق الحرف مع كلمته" : "Match each letter to its word"}</h2>
          <p className="counting-instruction">{ar ? "اقلب بطاقتين. الحرف يُنطق حين تقلبه." : "Turn over two cards. Letters say their sound when they turn."}</p>
          <div className="memory-grid" >
            {cards.map((c) => {
              const isMatched = matched.includes(c.pair);
              const up = isMatched || open.includes(c.key);
              return (
                <button
                  key={c.key}
                  data-face={up ? "up" : "down"}
                  data-matched={isMatched ? "true" : undefined}
                  data-pair={c.pair}
                  aria-label={label(c, up)}
                  disabled={isMatched}
                  onClick={() => flip(c)}
                >
                  {!up ? <span aria-hidden>؟</span> : c.kind === "letter" ? (
                    <span className="memory-letter" lang="ar">{c.data.ar}</span>
                  ) : (
                    <>
                      <span className="memory-emoji" aria-hidden>{c.data.emoji}</span>
                      <span className="memory-word" lang="ar">{c.data.word}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <div className="counting-feedback" role="status">{message || (ar ? "خذ وقتك، لا توجد ساعة توقيت." : "Take your time. There is no timer.")}</div>
        </>
      )}
    </section>
  );
}
