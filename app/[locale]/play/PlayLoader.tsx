"use client";

import dynamic from "next/dynamic";

const PlayClient = dynamic(() => import("./PlayClient"), {
  ssr: false,
  loading: () => (
    <div className="relative h-dvh w-full overflow-hidden bg-canvas flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl sm:text-8xl animate-bounce">🎈</div>
        <div className="text-xl sm:text-2xl font-extrabold text-ink mt-4">Loading…</div>
      </div>
    </div>
  ),
});

export default function PlayLoader() {
  return <PlayClient />;
}
