// components/illustrations/WaterCycleDiagram.tsx
// Static SVG: a single coherent circular-flow water-cycle scene —
// sun, sea, evaporation, cloud + condensation, rain, mountain + collection.

export function WaterCycleDiagram({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const L = {
    title: isAr ? "رحلة قطرة الماء" : "A water drop's journey",
    evaporation: isAr ? "التبخر" : "Evaporation",
    condensation: isAr ? "التكاثف" : "Condensation",
    precipitation: isAr ? "الهطول" : "Precipitation",
    collection: isAr ? "التجمع" : "Collection",
  };
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={L.title} className="w-full h-auto">
      <defs>
        <linearGradient id="wc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="55%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id="wc-sunglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="360" rx="24" fill="url(#wc-sky)" />
      <text x="320" y="34" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">{L.title}</text>

      {/* Sun top-right with glow + rays */}
      <circle cx="560" cy="70" r="78" fill="url(#wc-sunglow)" />
      <g stroke="#fcd34d" strokeWidth="6" strokeLinecap="round">
        <line x1="560" y1="14" x2="560" y2="2" />
        <line x1="612" y1="70" x2="626" y2="70" />
        <line x1="598" y1="32" x2="608" y2="22" />
        <line x1="598" y1="108" x2="608" y2="118" />
        <line x1="522" y1="32" x2="512" y2="22" />
      </g>
      <circle cx="560" cy="70" r="34" fill="#fbbf24" />
      <circle cx="550" cy="60" r="10" fill="#fde68a" opacity="0.7" />

      {/* Sea across the bottom — layered wave shapes */}
      <path d="M0 300 Q80 286 160 300 T320 300 T480 300 T640 300 L640 360 L0 360 Z" fill="#1d4ed8" />
      <path d="M0 318 Q80 306 160 318 T320 318 T480 318 T640 318 L640 360 L0 360 Z" fill="#2563eb" />
      <path d="M0 336 Q80 326 160 336 T320 336 T480 336 T640 336 L640 360 L0 360 Z" fill="#3b82f6" />

      {/* Mountain mid-left with a river returning to the sea */}
      <path d="M70 300 L150 150 L230 300 Z" fill="#475569" />
      <path d="M120 225 L150 150 L182 225 L165 230 L150 210 L136 230 Z" fill="#f8fafc" />
      {/* river */}
      <path d="M150 235 Q140 270 130 300" fill="none" stroke="#7dd3fc" strokeWidth="7" strokeLinecap="round" />
      <text x="150" y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e0f2fe">{L.collection}</text>

      {/* Cloud top-left — fluffy overlapping circles */}
      <g>
        <circle cx="130" cy="92" r="30" fill="#f8fafc" />
        <circle cx="168" cy="80" r="36" fill="#f8fafc" />
        <circle cx="208" cy="92" r="30" fill="#f8fafc" />
        <circle cx="168" cy="108" r="34" fill="#f1f5f9" />
        <rect x="125" y="100" width="92" height="22" rx="11" fill="#f1f5f9" />
      </g>
      <text x="168" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff" stroke="#0b1d3a" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">{L.condensation}</text>

      {/* Rain — drops falling from the cloud, animated */}
      <g fill="#bae6fd">
        <path d="M138 132 q-4 8 0 11 q4 3 4 -2 q0 -5 -4 -9 Z">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.6s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 26; 0 0" dur="1.6s" repeatCount="indefinite" />
        </path>
        <path d="M168 132 q-4 8 0 11 q4 3 4 -2 q0 -5 -4 -9 Z">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 26; 0 0" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
        </path>
        <path d="M198 132 q-4 8 0 11 q4 3 4 -2 q0 -5 -4 -9 Z">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 26; 0 0" dur="1.6s" begin="0.8s" repeatCount="indefinite" />
        </path>
      </g>
      <text x="168" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#bae6fd" stroke="#0b1d3a" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">{L.precipitation}</text>

      {/* Evaporation — 3 wavy dashed arrows rising from sea toward the cloud */}
      <g stroke="#a5f3fc" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" fill="none">
        <path d="M400 295 q-12 -40 -28 -78 q-8 -22 4 -36" />
        <path d="M440 296 q-8 -42 -20 -82 q-7 -24 6 -38" />
        <path d="M480 295 q-4 -44 -12 -86 q-5 -26 10 -40" />
      </g>
      {/* solid arrowheads at the top of the evaporation streams */}
      <g stroke="#a5f3fc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M369 188 L376 180 L385 184" />
        <path d="M420 184 L428 177 L437 181" />
        <path d="M470 182 L478 175 L487 179" />
      </g>
      <text x="448" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a5f3fc">{L.evaporation}</text>

      {/* Circular flow arrow: continues the rising vapour (right) over the top to the cloud (left) */}
      <path d="M478 168 Q420 96 250 96" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" opacity="0.7" />
      <path d="M260 88 L250 96 L260 104" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}
