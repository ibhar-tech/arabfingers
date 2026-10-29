"use client";

import dynamic from "next/dynamic";
import type { MemoryPair } from "./MemoryGame";

// Client-only: the deal is shuffled on mount, which must not differ between
// the server render and hydration.
const MemoryGame = dynamic(() => import("./MemoryGame").then((m) => m.MemoryGame), {
  ssr: false,
  loading: () => <div className="counting-game" aria-busy="true"><div className="text-6xl" aria-hidden>🃏</div></div>,
});

export function MemoryLoader({ locale, pairs }: { locale: string; pairs: MemoryPair[] }) {
  return <MemoryGame locale={locale} pairs={pairs} />;
}
