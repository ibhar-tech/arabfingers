// components/illustrations/SolarSystemDiagram.tsx
// Static SVG: the Sun at the left edge with its 8 planets in order,
// faint orbit arcs, and a bilingual name under each planet.

export function SolarSystemDiagram({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const title = isAr ? "عائلة الشمس" : "The Sun's family";

  // Planets laid out left → right. Centers spaced ~60px so labels never collide.
  const planets: { cx: number; r: number; name: string }[] = [
    { cx: 150, r: 7, name: isAr ? "عطارد" : "Mercury" },
    { cx: 210, r: 11, name: isAr ? "الزهرة" : "Venus" },
    { cx: 270, r: 12, name: isAr ? "الأرض" : "Earth" },
    { cx: 328, r: 10, name: isAr ? "المريخ" : "Mars" },
    { cx: 400, r: 26, name: isAr ? "المشتري" : "Jupiter" },
    { cx: 480, r: 21, name: isAr ? "زحل" : "Saturn" },
    { cx: 548, r: 14, name: isAr ? "أورانوس" : "Uranus" },
    { cx: 604, r: 13, name: isAr ? "نبتون" : "Neptune" },
  ];

  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={title} className="w-full h-auto">
      <defs>
        <radialGradient id="ss-sunglow" cx="0%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="1" />
          <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ss-earth" cx="35%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>

      <rect width="640" height="360" rx="24" fill="#070b18" />
      {/* stars */}
      {[[120, 300], [240, 320], [360, 290], [500, 320], [600, 300], [330, 60], [560, 70], [430, 50]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#ffffff55" />
      ))}
      <text x="332" y="36" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">{title}</text>

      {/* Faint orbit arcs behind the planets (centered on the Sun at the left edge) */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1.5">
        {planets.map((p) => (
          <path key={`orbit-${p.cx}`} d={`M ${p.cx} 60 A ${p.cx} 130 0 0 0 ${p.cx} 300`} />
        ))}
      </g>

      {/* Sun — half visible at the left edge with radial glow */}
      <circle cx="0" cy="180" r="150" fill="url(#ss-sunglow)" />
      <circle cx="0" cy="180" r="78" fill="#fbbf24" />
      <circle cx="0" cy="180" r="78" fill="none" stroke="#fde68a" strokeWidth="4" opacity="0.7" />

      {/* Planets */}
      {/* Mercury */}
      <circle cx="150" cy="180" r="7" fill="#9ca3af" />
      {/* Venus */}
      <circle cx="210" cy="180" r="11" fill="#f5deb3" />
      {/* Earth */}
      <g>
        <circle cx="270" cy="180" r="12" fill="url(#ss-earth)" />
        <path d="M262 174 q6 -3 10 2 q5 3 2 7 q-4 4 -9 1 q-6 -2 -3 -10 Z" fill="#16a34a" />
        <path d="M270 188 q4 -1 7 2" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="5s" repeatCount="indefinite" />
      </g>
      {/* Mars */}
      <circle cx="328" cy="180" r="10" fill="#dc2626" />
      <circle cx="324" cy="177" r="3" fill="#991b1b" opacity="0.7" />
      {/* Jupiter — banded, largest */}
      <g>
        <circle cx="400" cy="180" r="26" fill="#d97706" />
        <ellipse cx="400" cy="170" rx="25" ry="4" fill="#b45309" />
        <ellipse cx="400" cy="182" rx="26" ry="5" fill="#f59e0b" />
        <ellipse cx="400" cy="193" rx="23" ry="4" fill="#b45309" />
        <circle cx="392" cy="186" r="4" fill="#fca5a5" />
      </g>
      {/* Saturn — tilted ring */}
      <g transform="rotate(-18 480 180)">
        <ellipse cx="480" cy="180" rx="36" ry="11" fill="none" stroke="#d6c7a1" strokeWidth="5" />
        <circle cx="480" cy="180" r="21" fill="#e9d8a6" />
        <ellipse cx="480" cy="180" rx="36" ry="11" fill="none" stroke="#d6c7a1" strokeWidth="5" strokeDasharray="56 200" strokeDashoffset="28" />
      </g>
      {/* Uranus — pale cyan */}
      <circle cx="548" cy="180" r="14" fill="#a5f3fc" />
      <ellipse cx="548" cy="180" rx="18" ry="5" fill="none" stroke="#cffafe" strokeWidth="2.5" opacity="0.7" transform="rotate(70 548 180)" />
      {/* Neptune — deep blue */}
      <circle cx="604" cy="180" r="13" fill="#3b5bdb" />
      <circle cx="600" cy="176" r="4" fill="#748ffc" opacity="0.8" />

      {/* Labels — alternate above/below so neighbouring names never collide */}
      {planets.map((p, i) => {
        const below = i % 2 === 0;
        const y = below ? 180 + p.r + 22 : 180 - p.r - 12;
        return (
          <text
            key={`label-${p.cx}`}
            x={p.cx}
            y={y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#e2e8f0"
          >
            {p.name}
          </text>
        );
      })}
    </svg>
  );
}
