// components/illustrations/LetterCard.tsx
// Server component — pure SVG, no hooks. Renders a kid-friendly
// illustrated card for one Arabic letter. Used in the alphabet guide.

import type { LetterGuideEntry } from "@/lib/letterGuide";

// Soft card palettes cycled by index — rounded, friendly, consistent
// with the Dr. Hakim / Anas cartoon world.
const PALETTES = [
  { bg: "#0f2e2a", ring: "#34d399", glow: "#34d39922" }, // emerald
  { bg: "#172554", ring: "#60a5fa", glow: "#60a5fa22" }, // blue
  { bg: "#3b1d4f", ring: "#c084fc", glow: "#c084fc22" }, // purple
  { bg: "#42210b", ring: "#fbbf24", glow: "#fbbf2422" }, // amber
  { bg: "#431a2d", ring: "#fb7185", glow: "#fb718522" }, // rose
  { bg: "#0c3245", ring: "#22d3ee", glow: "#22d3ee22" }, // cyan
];

export function LetterCard({
  entry,
  index,
  locale,
}: {
  entry: LetterGuideEntry;
  index: number;
  locale: string;
}) {
  const p = PALETTES[index % PALETTES.length];
  const isAr = locale === "ar";
  const firstExample = entry.examples[0];

  return (
    <svg
      viewBox="0 0 200 230"
      role="img"
      aria-label={`${isAr ? entry.arName : entry.enName} — ${firstExample.word}`}
      className="w-full h-auto select-none"
    >
      {/* Card body */}
      <rect x="4" y="4" width="192" height="222" rx="24" fill={p.bg} stroke={p.ring} strokeWidth="2.5" />
      <rect x="4" y="4" width="192" height="222" rx="24" fill={p.glow} />
      {/* Letter number badge */}
      <circle cx="32" cy="32" r="16" fill={p.ring} />
      <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="800" fill={p.bg}>
        {index + 1}
      </text>
      {/* Big letter glyph */}
      <text
        x="100"
        y="105"
        textAnchor="middle"
        fontSize="84"
        fontWeight="700"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-noto-naskh), serif" }}
      >
        {entry.ar}
      </text>
      {/* Letter name */}
      <text x="100" y="142" textAnchor="middle" fontSize="17" fontWeight="700" fill={p.ring}>
        {isAr ? entry.arName : `${entry.enName} · ${entry.arName}`}
      </text>
      {/* Example word pill */}
      <rect x="25" y="160" width="150" height="48" rx="16" fill="#ffffff10" stroke="#ffffff20" />
      <text x="100" y="181" textAnchor="middle" fontSize="17" fontWeight="700" fill="#ffffff" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
        {firstExample.emoji} {firstExample.word}
      </text>
      <text x="100" y="200" textAnchor="middle" fontSize="11" fill="#ffffffaa">
        {isAr ? firstExample.meaningAr : `${firstExample.translit} — ${firstExample.meaningEn}`}
      </text>
    </svg>
  );
}
