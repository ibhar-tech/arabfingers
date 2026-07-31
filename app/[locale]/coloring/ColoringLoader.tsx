"use client";

import dynamic from "next/dynamic";

const ColoringClient = dynamic(() => import("./ColoringClient"), {
  ssr: false,
  loading: () => (
    <div className="relative h-dvh w-full overflow-hidden bg-[#050816] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl sm:text-8xl animate-bounce">🎨</div>
        <div className="text-xl sm:text-2xl font-semibold text-white/80 mt-4">Loading Canvas...</div>
      </div>
    </div>
  ),
});

export function ColoringLoader() {
  return <ColoringClient />;
}
