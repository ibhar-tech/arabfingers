"use client";

import dynamic from "next/dynamic";

const TapClient = dynamic(() => import("./TapClient"), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-[calc(100dvh-var(--header-h))] w-full items-center justify-center overflow-hidden bg-canvas">
      <div className="text-center">
        <div className="animate-bounce text-6xl sm:text-8xl">👂</div>
        <div className="mt-4 font-display text-xl font-extrabold text-ink/70 sm:text-2xl">Loading…</div>
      </div>
    </div>
  ),
});

export function TapLoader() {
  return <TapClient />;
}
