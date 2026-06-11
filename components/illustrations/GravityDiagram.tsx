// components/illustrations/GravityDiagram.tsx
// Static SVG: Earth pulling an apple, an astronaut floating in space,
// and heavy Jupiter — the three gravity scenarios from the lesson.

export function GravityDiagram({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const L = {
    earth: isAr ? "الأرض تسحب التفاحة" : "Earth pulls the apple",
    space: isAr ? "في الفضاء: انعدام الوزن" : "Deep space: weightless",
    jupiter: isAr ? "المشتري: جاذبية قوية" : "Jupiter: heavy gravity",
    title: isAr ? "ثلاثة عوالم للجاذبية" : "Three worlds of gravity",
  };
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={L.title} className="w-full h-auto">
      <rect width="640" height="360" rx="24" fill="#0b1020" />
      {/* stars */}
      {[[60, 40], [180, 25], [320, 50], [470, 30], [590, 55], [540, 130], [80, 140]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#ffffff66" />
      ))}
      <text x="320" y="34" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">{L.title}</text>

      {/* Panel 1 — Earth + falling apple */}
      <circle cx="110" cy="330" r="120" fill="#1d4ed8" />
      <circle cx="80" cy="300" r="22" fill="#16a34a" />
      <circle cx="150" cy="320" r="16" fill="#16a34a" />
      <circle cx="110" cy="180" r="14" fill="#ef4444" />
      <rect x="108" y="162" width="4" height="10" rx="2" fill="#854d0e" />
      {/* pull arrows */}
      <path d="M110 205 L110 245" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <path d="M98 233 L110 250 L122 233" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="110" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fbbf24">{L.earth}</text>

      {/* Panel 2 — floating astronaut */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="4s" repeatCount="indefinite" />
        <g transform="translate(320 190)">
          {/* backpack */}
          <rect x="-20" y="14" width="40" height="34" rx="14" fill="#cbd5e1" />
          {/* body / suit */}
          <rect x="-18" y="18" width="36" height="40" rx="14" fill="#f1f5f9" />
          {/* left arm */}
          <rect x="-36" y="22" width="20" height="11" rx="5.5" fill="#f1f5f9" transform="rotate(-22 -26 27)" />
          {/* right arm */}
          <rect x="16" y="22" width="20" height="11" rx="5.5" fill="#f1f5f9" transform="rotate(22 26 27)" />
          {/* left leg */}
          <rect x="-15" y="52" width="13" height="20" rx="6" fill="#f1f5f9" />
          {/* right leg */}
          <rect x="2" y="52" width="13" height="20" rx="6" fill="#f1f5f9" />
          {/* helmet */}
          <circle r="27" fill="#e2e8f0" />
          {/* visor */}
          <circle r="19" fill="#0ea5e9" />
          {/* visor shine */}
          <ellipse cx="-7" cy="-7" rx="6" ry="4" fill="#ffffff" opacity="0.6" transform="rotate(-30 -7 -7)" />
        </g>
      </g>
      <text x="320" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7dd3fc">{L.space}</text>

      {/* Panel 3 — Jupiter squashing weight */}
      <circle cx="530" cy="350" r="130" fill="#b45309" />
      <ellipse cx="530" cy="300" rx="118" ry="14" fill="#92400e" />
      <ellipse cx="530" cy="330" rx="126" ry="12" fill="#d97706" />
      <ellipse cx="530" cy="225" rx="26" ry="14" fill="#94a3b8" />
      <path d="M505 215 L515 195 M555 215 L545 195" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      <path d="M495 240 L495 260 M565 240 L565 260" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <text x="530" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fcd34d">{L.jupiter}</text>
    </svg>
  );
}
