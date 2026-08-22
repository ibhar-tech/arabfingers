"use client";

import dynamic from "next/dynamic";

// Loaded on hydration, not in the page bundle — see gravity/InteractiveLoader.
const StatesOfMatterInteractive = dynamic(() => import("@/components/StatesOfMatter/StatesOfMatterInteractive"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-video w-full items-center justify-center rounded-3xl border-4 border-slate-800 bg-slate-950">
      <div className="animate-bounce text-5xl">🧊</div>
    </div>
  ),
});

export default function InteractiveLoader({ locale }: { locale: string }) {
  return <StatesOfMatterInteractive locale={locale} />;
}
