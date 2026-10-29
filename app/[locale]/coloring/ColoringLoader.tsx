"use client";

import dynamic from "next/dynamic";

const ColoringClient = dynamic(() => import("./ColoringClient"), {
  ssr: false,
  loading: () => (
    <div className="relative flex min-h-[650px] w-full items-center justify-center overflow-hidden bg-canvas">
      <div className="text-center">
        <div className="animate-bounce text-6xl sm:text-8xl">🎨</div>
        <div className="mt-4 font-display text-xl font-extrabold text-ink/70 sm:text-2xl">
          Loading… / جارٍ التحميل…
        </div>
      </div>
    </div>
  ),
});

export function ColoringLoader() {
  return <ColoringClient />;
}
