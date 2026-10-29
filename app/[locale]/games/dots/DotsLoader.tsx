"use client";

import dynamic from "next/dynamic";

// Client-only: rounds are shuffled on mount, which must not differ between
// the server render and hydration.
const DotsGame = dynamic(() => import("./DotsGame").then((m) => m.DotsGame), {
  ssr: false,
  loading: () => <div className="counting-game" aria-busy="true"><div className="text-6xl" aria-hidden>🔍</div></div>,
});

export function DotsLoader({ locale }: { locale: string }) {
  return <DotsGame locale={locale} />;
}
