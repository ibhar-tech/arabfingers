// components/illustrations/StatesOfMatterDiagram.tsx
// Static SVG: three jars showing solid, liquid and gas particle arrangements,
// with melting and evaporation arrows between them.

export function StatesOfMatterDiagram({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const L = {
    title: isAr ? "حالات المادة الثلاث" : "The three states of matter",
    solid: isAr ? "صلب — الجزيئات متماسكة" : "Solid — particles hold hands",
    liquid: isAr ? "سائل — الجزيئات تنزلق" : "Liquid — particles slide",
    gas: isAr ? "غاز — الجزيئات تطير بحرية" : "Gas — particles fly free",
    melting: isAr ? "الانصهار" : "Melting",
    evaporation: isAr ? "التبخر" : "Evaporation",
  };

  // A reusable rounded jar outline.
  const Jar = ({ x }: { x: number }) => (
    <g>
      {/* jar body */}
      <rect x={x} y="120" width="130" height="150" rx="22" fill="#0f172a" stroke="#7dd3fc" strokeWidth="4" />
      {/* jar neck / rim */}
      <rect x={x + 18} y="106" width="94" height="22" rx="11" fill="#0f172a" stroke="#7dd3fc" strokeWidth="4" />
      {/* glass shine */}
      <rect x={x + 12} y="134" width="10" height="120" rx="5" fill="#ffffff" opacity="0.12" />
    </g>
  );

  // Jar inner x-origins (jars 130 wide).
  const j1 = 40;
  const j2 = 255;
  const j3 = 470;

  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={L.title} className="w-full h-auto">
      <rect width="640" height="360" rx="24" fill="#111827" />
      <text x="320" y="34" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">{L.title}</text>

      <Jar x={j1} />
      <Jar x={j2} />
      <Jar x={j3} />

      {/* Jar 1 — SOLID: tight 3×3 grid of touching particles */}
      <g fill="#f97316" stroke="#fb923c" strokeWidth="2">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`solid-${row}-${col}`}
              cx={j1 + 43 + col * 22}
              cy={170 + row * 22}
              r="11"
            />
          ))
        )}
      </g>
      <text x={j1 + 65} y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fdba74">{L.solid}</text>

      {/* Jar 2 — LIQUID: loose particles filling the lower half */}
      <g fill="#38bdf8" stroke="#7dd3fc" strokeWidth="2">
        {[
          [25, 205], [55, 212], [85, 204], [110, 214],
          [38, 232], [70, 238], [100, 230],
          [25, 256], [58, 260], [90, 256], [112, 252],
        ].map(([dx, cy]) => (
          <circle key={`liquid-${dx}-${cy}`} cx={j2 + dx} cy={cy} r="10" />
        ))}
      </g>
      <text x={j2 + 65} y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7dd3fc">{L.liquid}</text>

      {/* Jar 3 — GAS: 5 scattered drifting particles with motion ticks */}
      <g fill="#c084fc" stroke="#d8b4fe" strokeWidth="2">
        {[
          [30, 150], [95, 165], [55, 200], [108, 215], [40, 245],
        ].map(([dx, cy], i) => (
          <g key={`gas-${dx}-${cy}`}>
            {/* motion ticks */}
            <path d={`M${j3 + dx - 16} ${cy - 6} l-7 -4 M${j3 + dx - 16} ${cy + 6} l-7 4`} stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx={j3 + dx} cy={cy} r="10">
              <animateTransform
                attributeName="transform"
                type="translate"
                values={i % 2 === 0 ? "0 0; 8 -7; -6 5; 0 0" : "0 0; -7 6; 6 -5; 0 0"}
                dur={`${5 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </g>
      <text x={j3 + 65} y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d8b4fe">{L.gas}</text>

      {/* Arrow jar1 → jar2 : Melting */}
      <g>
        <path d="M178 188 L248 188" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
        <path d="M238 180 L250 188 L238 196" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="213" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fcd34d">{L.melting}</text>
      </g>

      {/* Arrow jar2 → jar3 : Evaporation */}
      <g>
        <path d="M393 188 L463 188" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
        <path d="M453 180 L465 188 L453 196" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="428" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6ee7b7">{L.evaporation}</text>
      </g>
    </svg>
  );
}
