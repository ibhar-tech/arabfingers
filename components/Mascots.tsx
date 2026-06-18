/* Hand-drawn-style mascots built from the Arabic/kids world (a smiling letter-buddy,
   a sun, a star, a crescent) — Bloomly's charm without Bloomly's garden theme.
   Thick ink strokes, candy fills, gentle motion via the .mascot-* classes. */

type MascotProps = { className?: string };

const ink = "var(--ink)";
const stroke = { stroke: ink, strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Face({ cx = 50, cy = 52, mouth = "smile" }: { cx?: number; cy?: number; mouth?: "smile" | "o" }) {
  return (
    <>
      <circle cx={cx - 9} cy={cy - 4} r="3.4" fill={ink} />
      <circle cx={cx + 9} cy={cy - 4} r="3.4" fill={ink} />
      <circle cx={cx - 15} cy={cy + 4} r="3" fill="var(--rose)" opacity="0.55" />
      <circle cx={cx + 15} cy={cy + 4} r="3" fill="var(--rose)" opacity="0.55" />
      {mouth === "smile" ? (
        <path d={`M${cx - 7} ${cy + 6} Q${cx} ${cy + 13} ${cx + 7} ${cy + 6}`} fill="none" {...stroke} strokeWidth={4} />
      ) : (
        <circle cx={cx} cy={cy + 8} r="3.5" fill={ink} />
      )}
    </>
  );
}

/** A rounded alef "buddy" — the brand's first letter, given a face. */
export function LetterBuddy({ className }: MascotProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="35" y="14" width="30" height="74" rx="15" fill="var(--saffron)" {...stroke} />
      <Face cx={50} cy={46} />
      {/* little waving arm */}
      <path d="M65 58 Q78 54 76 42" fill="none" {...stroke} />
    </svg>
  );
}

export function Sun({ className }: MascotProps) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = 50 + Math.cos(a) * 30, y1 = 50 + Math.sin(a) * 30;
    const x2 = 50 + Math.cos(a) * 42, y2 = 50 + Math.sin(a) * 42;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />;
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {rays}
      <circle cx="50" cy="50" r="26" fill="var(--saffron)" {...stroke} />
      <Face cx={50} cy={52} />
    </svg>
  );
}

export function StarMascot({ className }: MascotProps) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? 40 : 18;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points={pts} fill="var(--bubblegum)" {...stroke} />
      <Face cx={50} cy={50} />
    </svg>
  );
}

export function Crescent({ className }: MascotProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M68 18 A36 36 0 1 0 68 82 A28 28 0 1 1 68 18 Z" fill="var(--violet)" {...stroke} />
      <circle cx="44" cy="44" r="3.2" fill="var(--canvas)" />
      <circle cx="44" cy="56" r="3.2" fill="var(--canvas)" />
      <path d="M40 64 Q46 69 52 63" fill="none" stroke="var(--canvas)" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}
