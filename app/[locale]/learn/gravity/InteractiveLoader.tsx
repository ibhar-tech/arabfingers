"use client";

import dynamic from "next/dynamic";

// The interactive (canvas simulator + bilingual storyboard + confetti) is the
// heaviest client code in the site: statically imported it added ~90 KB of JS
// to this route and hydrated on load, competing with the article's LCP. The
// same dynamic()+ssr:false pattern /play uses keeps it off the critical path.
const GravityInteractive = dynamic(() => import("@/components/StatesOfMatter/GravityInteractive"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-video w-full items-center justify-center rounded-3xl border-4 border-slate-800 bg-slate-950">
      <div className="animate-bounce text-5xl">🍎</div>
    </div>
  ),
});

export default function InteractiveLoader({ locale }: { locale: string }) {
  return <GravityInteractive locale={locale} />;
}
