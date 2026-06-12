// components/illustrations/HubIcons.tsx
// Server components — pure SVG, no hooks. Small category icons for the
// /learn hub cards, replacing the plain emoji illustrations. Palette
// matches LetterCard.tsx (the Dr. Hakim / Anas cartoon world).
//
// Each icon: viewBox 0 0 48 48, rounded shapes, strokeWidth 2–2.5,
// no text except the Arabic glyphs (ب / ٣). Sized via className.

const EMERALD = "#34d399";
const BLUE = "#60a5fa";
const PURPLE = "#c084fc";
const AMBER = "#fbbf24";
const ROSE = "#fb7185";
const CYAN = "#22d3ee";

type IconProps = { className?: string };

// Alphabet — rounded tile with the Arabic letter ب centered, emerald ring.
export function AlphabetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Arabic alphabet" className={className}>
      <rect x="6" y="6" width="36" height="36" rx="11" fill={`${EMERALD}1f`} stroke={EMERALD} strokeWidth="2.5" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-noto-naskh), serif" }}
      >
        ب
      </text>
    </svg>
  );
}

// Numbers — rounded tile with the Arabic numeral ٣, blue accent.
export function NumbersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Arabic numbers" className={className}>
      <rect x="6" y="6" width="36" height="36" rx="11" fill={`${BLUE}1f`} stroke={BLUE} strokeWidth="2.5" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-noto-naskh), serif" }}
      >
        ٣
      </text>
    </svg>
  );
}

// Colors — 3 overlapping translucent circles (rose / amber / cyan).
export function ColorsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Colors" className={className}>
      <circle cx="19" cy="20" r="12" fill={ROSE} fillOpacity="0.55" stroke={ROSE} strokeWidth="2" />
      <circle cx="29" cy="20" r="12" fill={AMBER} fillOpacity="0.55" stroke={AMBER} strokeWidth="2" />
      <circle cx="24" cy="29" r="12" fill={CYAN} fillOpacity="0.55" stroke={CYAN} strokeWidth="2" />
    </svg>
  );
}

// Words — rounded speech bubble with three dots, purple accent.
export function WordsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="First words" className={className}>
      <path
        d="M9 12 h30 a6 6 0 0 1 6 6 v12 a6 6 0 0 1 -6 6 H22 l-8 7 v-7 H9 a6 6 0 0 1 -6 -6 V18 a6 6 0 0 1 6 -6 z"
        fill={`${PURPLE}26`}
        stroke={PURPLE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="24" r="2.4" fill="#ffffff" />
      <circle cx="24" cy="24" r="2.4" fill="#ffffff" />
      <circle cx="32" cy="24" r="2.4" fill="#ffffff" />
    </svg>
  );
}

// Science — round-bottom flask with 2 bubbles, cyan accent.
export function ScienceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Science lesson" className={className}>
      {/* flask outline: neck + round bottom */}
      <path
        d="M20 7 v11 L11 35 a7 7 0 0 0 6 11 h14 a7 7 0 0 0 6 -11 L28 18 V7"
        fill={`${CYAN}26`}
        stroke={CYAN}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* mouth */}
      <line x1="17" y1="7" x2="31" y2="7" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
      {/* liquid line */}
      <path d="M14.5 31 h19" stroke={CYAN} strokeWidth="2" strokeLinecap="round" />
      {/* bubbles */}
      <circle cx="22" cy="38" r="2.6" fill="#ffffff" />
      <circle cx="29" cy="40" r="1.8" fill="#ffffff" />
    </svg>
  );
}

// Parenting — large heart with a small heart nested inside, rose accent.
export function ParentingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="Parenting guide" className={className}>
      <path
        d="M24 41 C8 30 6 19 13 14 c4 -3 9 -1 11 3 c2 -4 7 -6 11 -3 c7 5 5 16 -11 27 z"
        fill={`${ROSE}26`}
        stroke={ROSE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 33 c-7 -5 -8 -10 -4.5 -12 c2 -1.2 4.5 -0.3 4.5 1.6 c0 -1.9 2.5 -2.8 4.5 -1.6 c3.5 2 2.5 7 -4.5 12 z"
        fill={ROSE}
        stroke={ROSE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
