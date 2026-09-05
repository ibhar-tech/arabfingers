#!/usr/bin/env node
/**
 * Builds the real, downloadable worksheet PDFs into public/printables/.
 *
 *   node scripts/build-worksheets.mjs
 *
 * Renders HTML with headless Chrome and prints it to PDF. Chrome is used
 * deliberately: it is the only thing on this machine that shapes Arabic
 * correctly (contextual forms + RTL), which a JS PDF library would not do.
 *
 * ponytail: no new npm dependency — Chrome is already installed, and the
 * letter/number/colour/animal data is imported straight from the TypeScript
 * sources via Node's native type stripping (Node >= 22.6).
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "qrcode";

import { letterGuide } from "../lib/letterGuide.ts";
import {
  numbersData, numbers11to20Data, colorsData, animalsData, harakatData,
  fruitsVegData, transportData, solarData, ramadanData, seaData,
  bodyPartsData, seasonsData, oppositesData,
} from "../lib/worksheets.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "printables");
const LETTER_DIR = join(OUT_DIR, "letters");
const THUMB_DIR = join(OUT_DIR, "previews");
const LETTER_THUMB_DIR = join(THUMB_DIR, "letters");
const SITE = "arabfingers.site";

/** Chrome shapes these into their contextual forms when wrapped in ZWJ. */
const ZWJ = "‍";

/**
 * Letters that only ever join to the letter before them. They have no initial
 * or medial form — showing four distinct cells for them would teach a shape
 * that does not exist, so those cells are labelled as "does not join".
 */
const RIGHT_JOINING_ONLY = new Set(["ا", "د", "ذ", "ر", "ز", "و"]);

const CHROME =
  ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
    .map((b) => {
      try {
        return execFileSync("command", ["-v", b], { shell: "/bin/bash", encoding: "utf8" }).trim();
      } catch {
        return "";
      }
    })
    .find(Boolean) || "google-chrome";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------------------------------------------------------------------------
// Shared page furniture
// ---------------------------------------------------------------------------

const CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Nunito", "DejaVu Sans", sans-serif;
    color: #1b1b1b;
  }
  .ar { font-family: "Noto Naskh Arabic", "Noto Sans Arabic", serif; }
  .sheet {
    position: relative;
    width: 210mm; height: 297mm;
    padding: 11mm 12mm 10mm;
    page-break-after: always;
    display: flex; flex-direction: column;
  }
  .sheet:last-child { page-break-after: auto; }

  /* Everything between the title and the footer, so leftover vertical space is
     absorbed by the practice areas instead of pooling as dead space above the
     footer. Anything marked .grow shares that slack. */
  .body { flex: 1; display: flex; flex-direction: column; min-height: 0; }
  .grow { flex: 1 1 0; min-height: 0; }

  .head {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2px solid #1b1b1b; padding-bottom: 2.5mm;
  }
  .brand { font-size: 10pt; font-weight: 800; letter-spacing: .02em; }
  .brand span { font-weight: 600; color: #666; }
  .fields { font-size: 8.5pt; color: #555; display: flex; gap: 7mm; }

  .title { margin-top: 5mm; display: flex; align-items: baseline; gap: 4mm; }
  .title h1 { margin: 0; font-size: 17pt; font-weight: 800; }
  .title .sub { font-size: 10pt; color: #666; }
  .title .arname { font-size: 16pt; font-weight: 700; }

  .instruction {
    margin-top: 1.5mm; font-size: 9pt; color: #444; line-height: 1.45;
  }
  .instruction .rtl { display: block; direction: rtl; margin-top: .8mm; }

  .box { border: 1.5px solid #cfcfcf; border-radius: 3mm; }
  .label {
    font-size: 7.5pt; font-weight: 800; text-transform: uppercase;
    letter-spacing: .08em; color: #8a8a8a;
  }

  /* The three tracing weights: solid grey guide → hollow outline → empty. */
  .g-solid  { color: #c9c9c9; }
  .g-light  { color: #e4e4e4; }
  .g-hollow { color: transparent; -webkit-text-stroke: 1.1px #c4c4c4; }

  .foot {
    margin-top: auto; padding-top: 3mm; border-top: 1px solid #dcdcdc;
    display: flex; justify-content: space-between;
    font-size: 7.5pt; color: #8a8a8a;
  }

  /* dotted writing baseline */
  .rule { border-bottom: 1px dashed #d5d5d5; }
`;

function sheet(inner) {
  return `<section class="sheet">${inner}</section>`;
}

function head(kicker) {
  return `<div class="head">
    <div class="brand">Arab Fingers <span>· ${esc(kicker)}</span></div>
    <div class="fields"><span>Name / الاسم: ____________</span><span>Date / التاريخ: __________</span></div>
  </div>`;
}

function foot(n, total, qr = "") {
  return `<div class="foot">
    <span style="display:flex;align-items:center;gap:2.5mm;">
      ${qr}
      <span>${SITE}</span>
    </span>
    <span>Page ${n} of ${total}</span>
  </div>`;
}

// ---------------------------------------------------------------------------
// Print → screen loop
//
// The worksheets are how most families find this site (Search Console: ~90% of
// clicks land on /printables), yet a printed sheet is a dead end — the child's
// next step is hearing the letter said aloud, which paper cannot do. Every page
// footer therefore carries a small QR code to the on-site activity that pairs
// with that pack: tracing pages link to the letter game, the chart to the
// alphabet guide, and so on.
//
// QRs render as plain <img> data URLs — no network fetch at print time, so
// headless Chrome needs no network access and the sheets stay reproducible.
// ---------------------------------------------------------------------------

const PACK_LINKS = {
  "arabic-alphabet-chart": {
    url: `${SITE}/en/learn/arabic-alphabet-guide`,
    captionEn: "Hear every letter:",
    captionAr: "استمع لكل حرف:",
  },
  "arabic-alphabet-tracing": {
    url: `${SITE}/en/play`,
    captionEn: "Play & hear it:",
    captionAr: "العب واسمع:",
  },
  "arabic-numbers-tracing": {
    url: `${SITE}/en/learn/arabic-numbers`,
    captionEn: "More numbers:",
    captionAr: "المزيد عن الأرقام:",
  },
  "arabic-numbers-11-20": {
    url: `${SITE}/en/learn/arabic-numbers`,
    captionEn: "Numbers guide:",
    captionAr: "دليل الأرقام:",
  },
  "arabic-harakat": {
    url: `${SITE}/en/learn/arabic-alphabet-guide`,
    captionEn: "Hear the letters:",
    captionAr: "استمع للحروف:",
  },
  "arabic-colors": {
    url: `${SITE}/en/learn/arabic-colors`,
    captionEn: "Colours to hear:",
    captionAr: "الألوان بالنطق:",
  },
  "arabic-animals-coloring": {
    url: `${SITE}/en/glossary`,
    captionEn: "More words:",
    captionAr: "كلمات أكثر:",
  },
};

/** Small footer QR for one pack; empty string when the pack has no link. */
async function qrBlock(setId) {
  let link = PACK_LINKS[setId];
  if (!link && setId.startsWith("letters/")) {
    // Every per-letter sheet links to its own landing page, which carries the
    // audio button — paper can't say the letter out loud, the page can.
    link = {
      url: `${SITE}/en/printables/${setId}`,
      captionEn: "Hear this letter:",
      captionAr: "اسمع هذا الحرف:",
    };
  }
  if (!link) return "";
  const png = await QRCode.toDataURL(link.url, { margin: 0, width: 96 });
  return `<img src="${png}" width="42" height="42" alt="" aria-hidden="true"/>
    <span>Scan · امسح<br/>${esc(link.captionEn)}<br/>${esc(link.captionAr)}</span>`;
}

function doc(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(title)}</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

// ---------------------------------------------------------------------------
// Vector outlines (stroke-only so children colour inside them)
// ---------------------------------------------------------------------------

const SHAPES = {
  heart: `<path d="M100 168 C40 128 22 98 22 72 C22 46 42 30 64 30 C80 30 92 39 100 52 C108 39 120 30 136 30 C158 30 178 46 178 72 C178 98 160 128 100 168Z"/>`,
  droplet: `<path d="M100 24 C100 24 168 100 168 130 C168 163 137 182 100 182 C63 182 32 163 32 130 C32 100 100 24 100 24Z"/>`,
  leaf: `<path d="M40 168 C40 100 76 40 164 32 C172 120 116 168 60 166"/><path d="M40 168 C72 136 108 106 152 60"/>`,
  star: `<path d="M100 22 L124 78 L184 84 L139 124 L152 184 L100 153 L48 184 L61 124 L16 84 L76 78Z"/>`,
  circle: `<circle cx="100" cy="100" r="76"/>`,
  diamond: `<path d="M100 20 L178 100 L100 180 L22 100Z"/>`,

  lion: `<path d="M100 26 l14 16 20 -8 4 22 22 6 -8 20 16 16 -16 16 8 20 -22 6 -4 22 -20 -8 -14 16 -14 -16 -20 8 -4 -22 -22 -6 8 -20 -16 -16 16 -16 -8 -20 22 -6 4 -22 20 8Z"/>
    <circle cx="100" cy="100" r="46"/>
    <circle cx="84" cy="92" r="4.5"/><circle cx="116" cy="92" r="4.5"/>
    <path d="M100 106 l-8 8 h16Z"/><path d="M100 114 v8"/>
    <path d="M92 122 q8 8 16 0"/>
    <path d="M62 104 h-16 M62 112 h-16 M138 104 h16 M138 112 h16"/>`,
  rabbit: `<path d="M76 84 C64 56 62 24 76 18 C90 12 96 44 96 76"/>
    <path d="M124 84 C136 56 138 24 124 18 C110 12 104 44 104 76"/>
    <circle cx="100" cy="112" r="44"/>
    <circle cx="86" cy="104" r="4.5"/><circle cx="114" cy="104" r="4.5"/>
    <path d="M100 118 q-7 0 -7 5 q0 5 7 5 q7 0 7 -5 q0 -5 -7 -5Z"/>
    <path d="M100 128 v8 M100 136 q-9 8 -18 2 M100 136 q9 8 18 2"/>
    <path d="M66 118 h-18 M66 126 h-18 M134 118 h18 M134 126 h18"/>`,
  elephant: `<path d="M46 96 C46 62 72 40 104 40 C140 40 164 64 164 98 v42 a12 12 0 0 1 -12 12 h-92 a12 12 0 0 1 -12 -12Z"/>
    <path d="M46 78 C22 70 14 92 22 112 C30 132 48 132 52 122"/>
    <path d="M164 78 C188 70 196 92 188 112 C180 132 162 132 158 122"/>
    <path d="M92 150 C92 172 78 186 78 186 M108 150 c0 22 14 36 14 36"/>
    <path d="M100 150 v18 q0 14 12 14 q12 0 12 -14"/>
    <circle cx="82" cy="94" r="4.5"/><circle cx="124" cy="94" r="4.5"/>`,
  monkey: `<circle cx="56" cy="98" r="18"/><circle cx="144" cy="98" r="18"/>
    <circle cx="100" cy="100" r="48"/>
    <ellipse cx="100" cy="118" rx="32" ry="26"/>
    <circle cx="86" cy="92" r="4.5"/><circle cx="114" cy="92" r="4.5"/>
    <circle cx="94" cy="112" r="3"/><circle cx="106" cy="112" r="3"/>
    <path d="M86 128 q14 12 28 0"/>`,
  cat: `<path d="M62 74 L56 34 L92 56"/><path d="M138 74 L144 34 L108 56"/>
    <circle cx="100" cy="98" r="44"/>
    <path d="M84 92 a5 6 0 1 0 .1 0Z"/><path d="M116 92 a5 6 0 1 0 .1 0Z"/>
    <path d="M100 106 l-7 7 h14Z"/>
    <path d="M100 113 v6 M100 119 q-9 8 -17 1 M100 119 q9 8 17 1"/>
    <path d="M58 100 h-20 M58 110 h-20 M142 100 h20 M142 110 h20"/>
    <path d="M64 138 C64 172 136 172 136 138"/>
    <path d="M136 156 c26 6 30 -18 18 -28"/>`,
  dog: `<circle cx="100" cy="102" r="42"/>
    <path d="M62 78 C40 74 32 100 38 124 C43 144 60 146 66 136"/>
    <path d="M138 78 C160 74 168 100 162 124 C157 144 140 146 134 136"/>
    <circle cx="86" cy="96" r="4.5"/><circle cx="114" cy="96" r="4.5"/>
    <ellipse cx="100" cy="114" rx="9" ry="7"/>
    <path d="M100 121 v7 M100 128 q-10 9 -19 1 M100 128 q10 9 19 1"/>
    <path d="M92 138 q8 16 16 0"/>`,
  bird: `<ellipse cx="98" cy="106" rx="52" ry="42"/>
    <circle cx="140" cy="72" r="24"/>
    <path d="M162 66 l24 8 -24 10Z"/>
    <circle cx="146" cy="66" r="4"/>
    <path d="M80 96 C60 108 60 132 84 138 C104 142 116 124 110 108"/>
    <path d="M46 106 L14 88 M46 114 L14 118"/>
    <path d="M92 148 v22 M112 148 v22 M84 170 h16 M104 170 h16"/>`,
  fish: `<path d="M132 100 C132 132 108 152 76 152 C44 152 22 130 22 100 C22 70 44 48 76 48 C108 48 132 68 132 100Z"/>
    <path d="M132 100 L182 66 V134Z"/>
    <path d="M64 52 C74 70 74 130 64 148"/>
    <circle cx="46" cy="88" r="5"/>
    <path d="M86 76 q22 6 22 24 q0 18 -22 24"/>
    <circle cx="160" cy="36" r="8"/><circle cx="178" cy="18" r="5"/>`,

  // --- fruits & vegetables (drawn for the themed colouring books) ---
  apple: `<path d="M100 60 C78 42 44 56 44 94 C44 130 70 164 100 158 C130 164 156 130 156 94 C156 56 122 42 100 60Z"/>
    <path d="M100 58 C100 46 104 38 112 30"/>
    <path d="M112 44 C124 30 142 30 150 36 C146 48 128 54 112 44Z"/>
    <path d="M70 80 C64 88 62 98 64 108"/>`,
  banana: `<path d="M50 54 C40 64 42 78 50 92 C66 124 100 150 140 152 C154 152 162 142 154 136 C114 132 76 104 62 64 C58 52 56 48 50 54Z"/>
    <path d="M50 54 L44 46 M154 136 L164 140"/>
    <path d="M72 92 C90 118 116 134 144 140"/>`,
  grapes: `<circle cx="84" cy="82" r="17"/><circle cx="116" cy="82" r="17"/>
    <circle cx="68" cy="112" r="17"/><circle cx="100" cy="112" r="17"/><circle cx="132" cy="112" r="17"/>
    <circle cx="84" cy="142" r="17"/><circle cx="116" cy="142" r="17"/>
    <path d="M100 64 C100 48 104 40 112 34"/>
    <path d="M112 46 C126 34 142 34 150 40 C144 52 126 56 112 46Z"/>`,
  watermelon: `<path d="M26 96 A74 74 0 0 0 174 96 Z"/>
    <path d="M42 96 A58 58 0 0 0 158 96"/>
    <path d="M70 108 l4 10 4 -10Z M96 116 l4 10 4 -10Z M122 108 l4 10 4 -10Z M84 130 l4 10 4 -10Z M110 132 l4 10 4 -10Z"/>
    <path d="M60 44 C70 56 70 66 62 74 M140 44 C130 56 130 66 138 74"/>`,
  carrot: `<path d="M86 66 C84 58 116 58 114 66 L126 148 C128 162 72 162 74 148 Z"/>
    <path d="M94 84 L106 88 M96 104 L108 108 M96 126 L108 128"/>
    <path d="M92 58 C84 44 70 40 58 44 C66 54 80 58 92 58Z M100 56 C102 42 112 32 126 30 C124 44 112 54 100 56Z M104 60 C114 52 128 52 136 58 C128 66 114 66 104 60Z"/>`,
  tomato: `<circle cx="100" cy="112" r="56"/>
    <path d="M100 52 L92 70 M100 52 L108 70 M100 52 L80 64 M100 52 L120 64 M100 52 L100 72"/>
    <path d="M100 52 C100 42 104 36 110 30"/>
    <path d="M64 96 C60 104 60 114 62 122"/>`,
  orange: `<circle cx="100" cy="112" r="56"/>
    <path d="M100 58 C100 48 104 42 110 36"/>
    <path d="M110 48 C124 36 140 36 148 42 C142 54 124 58 110 48Z"/>
    <circle cx="100" cy="112" r="4"/>
    <path d="M70 84 C64 92 62 102 62 112"/>`,
  strawberry: `<path d="M100 70 C128 62 156 74 154 100 C152 130 124 160 100 166 C76 160 48 130 46 100 C44 74 72 62 100 70Z"/>
    <path d="M100 68 L86 52 M100 68 L100 48 M100 68 L114 52 M100 68 L78 60 M100 68 L122 60"/>
    <path d="M80 96 l3 6 3 -6Z M114 92 l3 6 3 -6Z M96 118 l3 6 3 -6Z M72 118 l3 6 3 -6Z M124 120 l3 6 3 -6Z"/>`,

  // --- transport ---
  car: `<path d="M28 122 C28 110 38 102 52 100 L68 76 C72 70 78 66 86 66 L126 66 C134 66 140 70 144 76 L158 100 C170 102 178 110 178 120 L176 130 C176 136 172 140 166 140 H40 C34 140 30 136 30 130 Z"/>
    <path d="M76 98 L86 74 H118 V98 Z M126 98 V74 H128 L146 98 Z"/>
    <circle cx="62" cy="140" r="15"/><circle cx="146" cy="140" r="15"/>
    <circle cx="62" cy="140" r="6"/><circle cx="146" cy="140" r="6"/>
    <path d="M36 112 h10"/>`,
  bus: `<rect x="26" y="54" width="154" height="84" rx="10"/>
    <rect x="38" y="66" width="26" height="22" rx="3"/><rect x="72" y="66" width="26" height="22" rx="3"/>
    <rect x="106" y="66" width="26" height="22" rx="3"/><rect x="140" y="66" width="26" height="22" rx="3"/>
    <path d="M26 100 H180"/>
    <circle cx="58" cy="140" r="15"/><circle cx="148" cy="140" r="15"/>
    <circle cx="58" cy="140" r="6"/><circle cx="148" cy="140" r="6"/>
    <path d="M170 88 v10"/>`,
  train: `<rect x="34" y="72" width="120" height="60" rx="8"/>
    <rect x="120" y="46" width="34" height="26" rx="4"/>
    <rect x="128" y="84" width="18" height="20" rx="2"/>
    <path d="M46 72 V54 H62 V72"/>
    <circle cx="58" cy="146" r="13"/><circle cx="96" cy="146" r="13"/><circle cx="134" cy="146" r="13"/>
    <path d="M20 166 H184"/>
    <path d="M20 166 l10 -8 M56 166 l10 -8 M92 166 l10 -8 M128 166 l10 -8 M164 166 l10 -8"/>
    <circle cx="52" cy="36" r="8"/><circle cx="70" cy="24" r="6"/>`,
  airplane: `<path d="M28 104 C40 96 58 92 78 92 L102 60 C104 57 108 57 109 60 L112 92 L146 84 L156 92 L118 108 L114 132 L124 144 L112 148 L100 128 L88 148 L76 144 L86 132 L82 116 C62 116 42 112 28 104 Z"/>
    <circle cx="98" cy="86" r="4"/><circle cx="110" cy="88" r="4"/><circle cx="122" cy="90" r="4"/>
    <path d="M40 140 C52 132 66 128 80 128 M160 52 C154 62 148 68 140 72"/>`,
  ship: `<path d="M22 118 H178 L162 148 C160 152 156 154 152 154 H48 C44 154 40 152 38 148 Z"/>
    <rect x="58" y="92" width="84" height="26"/>
    <rect x="74" y="70" width="52" height="22"/>
    <path d="M100 70 V40 L128 48 L100 56"/>
    <path d="M14 168 C26 160 38 160 50 168 C62 176 74 176 86 168 C98 160 110 160 122 168 C134 176 146 176 158 168 C170 160 180 160 188 166"/>`,
  bicycle: `<circle cx="56" cy="130" r="34"/><circle cx="148" cy="130" r="34"/>
    <circle cx="56" cy="130" r="5"/><circle cx="148" cy="130" r="5"/>
    <path d="M56 130 L84 74 H122 L148 130 M84 74 L106 130 H56 M122 74 L112 58 H128"/>
    <path d="M78 68 H96 M56 130 L100 76"/>
    <path d="M98 130 h16"/>`,

  // --- solar system ---
  sun: `<circle cx="100" cy="100" r="42"/>
    <path d="M100 34 V14 M100 166 V186 M34 100 H14 M166 100 H186 M53 53 L39 39 M147 147 L161 161 M53 147 L39 161 M147 53 L161 39"/>
    <path d="M62 76 C74 66 88 62 100 62 M156 118 C144 130 130 136 116 138"/>`,
  moon: `<path d="M124 36 A72 72 0 1 0 124 164 A58 58 0 1 1 124 36Z"/>
    <path d="M150 60 l4 10 10 2 -8 7 2 11 -8 -6 -9 5 3 -11 -7 -8 10 -1Z"/>
    <circle cx="160" cy="120" r="5"/><circle cx="136" cy="150" r="3.5"/>`,
  earth: `<circle cx="100" cy="100" r="60"/>
    <path d="M60 62 C74 54 92 56 100 66 C108 76 100 88 88 90 C76 92 70 102 74 112 C78 122 70 130 58 128 M124 52 C132 60 132 72 124 78 C116 84 118 96 128 100 C138 104 138 116 132 124 C126 132 128 142 136 146 M40 116 C50 114 58 118 60 128"/>
    <path d="M44 76 C52 72 60 72 66 76"/>`,
  saturn: `<circle cx="100" cy="100" r="44"/>
    <path d="M30 122 C10 116 6 104 22 94 C36 85 66 78 100 78 C136 78 168 86 178 96 C186 104 180 114 164 119 M44 66 C60 56 82 50 104 50 M60 148 C76 156 100 158 122 152"/>
    <path d="M76 84 C82 80 90 78 98 78"/>`,
  star: `<path d="M100 22 L121 76 L178 80 L134 117 L148 172 L100 142 L52 172 L66 117 L22 80 L79 76 Z"/>
    <path d="M168 140 l3 8 8 2 -6 5 1 9 -6 -5 -8 4 2 -9 -5 -6 8 -1Z"/>
    <circle cx="42" cy="34" r="4"/><circle cx="178" cy="34" r="3.5"/>`,
  rocket: `<path d="M100 20 C122 42 130 76 126 110 H74 C70 76 78 42 100 20Z"/>
    <circle cx="100" cy="66" r="13"/>
    <path d="M74 110 L52 142 L74 134 M126 110 L148 142 L126 134"/>
    <path d="M86 142 C88 158 94 168 100 178 C106 168 112 158 114 142 Z"/>
    <path d="M40 60 l3 7 7 2 -5 5 1 8 -6 -4 -6 3 1 -8 -5 -4 7 -2Z"/>
    <circle cx="164" cy="44" r="4"/>`,

  // --- Ramadan & Eid ---
  lantern: `<path d="M100 14 v10"/>
    <path d="M92 24 h16"/>
    <path d="M84 30 C90 26 110 26 116 30 L110 40 H90 Z"/>
    <path d="M84 40 H116 L124 60 L120 138 H80 L76 60 Z"/>
    <path d="M92 60 L88 138 M108 60 L112 138 M100 60 V138"/>
    <path d="M76 60 H124 M80 138 H120"/>
    <path d="M84 138 L80 152 H120 L116 138"/>
    <path d="M96 152 h8 v8 h-8 Z"/>`,
  mosque: `<path d="M60 160 V96 C60 70 84 54 100 54 C116 54 140 70 140 96 V160"/>
    <path d="M48 160 V100 M152 160 V100"/>
    <path d="M44 100 c-4 -18 4 -30 4 -30 s8 12 4 30 M148 100 c-4 -18 4 -30 4 -30 s8 12 4 30"/>
    <circle cx="48" cy="62" r="5"/><circle cx="152" cy="62" r="5"/>
    <path d="M100 54 V42 M94 44 L100 34 L106 44 Z"/>
    <path d="M86 160 V128 a14 14 0 0 1 28 0 V160"/>
    <path d="M40 160 H160"/>`,
  crescent: `<path d="M128 30 A80 80 0 1 0 128 170 A62 62 0 1 1 128 30Z"/>
    <path d="M158 74 l5 13 13 3 -10 9 3 14 -11 -8 -12 6 4 -13 -9 -10 13 -1Z"/>
    <path d="M164 128 l3 8 8 2 -6 6 1 9 -6 -4 -8 4 2 -9 -6 -5 8 -2Z"/>
    <circle cx="140" cy="150" r="4"/>`,
  dates: `<path d="M96 176 C92 140 92 104 98 68 L106 68 C102 104 102 140 106 176 Z"/>
    <path d="M96 128 l-12 4 M106 128 l12 4 M94 148 l-12 4 M108 148 l12 4 M97 108 l-11 3 M105 108 l11 3"/>
    <path d="M100 66 C86 46 64 38 44 40 C58 54 82 62 100 66Z M102 66 C116 44 140 36 162 40 C146 56 120 62 102 66Z M101 64 C96 44 100 26 110 14 C118 30 114 50 101 64Z"/>
    <circle cx="82" cy="142" r="6"/><circle cx="92" cy="154" r="6"/>
    <circle cx="114" cy="142" r="6"/><circle cx="104" cy="156" r="6"/>`,
  gift: `<rect x="38" y="92" width="124" height="76" rx="6"/>
    <rect x="30" y="70" width="140" height="24" rx="5"/>
    <path d="M100 70 V168 M100 70 V46"/>
    <path d="M100 46 C84 46 76 34 82 26 C90 18 100 28 100 46 C100 28 110 18 118 26 C124 34 116 46 100 46Z"/>
    <path d="M52 118 l4 10 10 -4 M136 128 l-4 10 -10 -4"/>`,
  balloon: `<path d="M100 24 C128 24 146 46 146 74 C146 104 124 126 100 126 C76 126 54 104 54 74 C54 46 72 24 100 24Z"/>
    <path d="M93 126 L100 138 L107 126"/>
    <path d="M100 138 C94 150 106 158 100 172 C96 180 90 184 84 186"/>
    <path d="M84 60 C82 70 82 80 86 90"/>
    <path d="M150 150 l4 9 9 2 -7 6 2 10 -8 -5 -8 4 2 -9 -6 -6 9 -2Z"/>
    <circle cx="52" cy="140" r="4"/>`,

  // --- sea animals ---
  whale: `<path d="M28 110 C28 78 56 58 96 58 C140 58 168 82 168 112 C168 126 158 136 144 136 H50 C36 136 28 126 28 112 Z"/>
    <path d="M168 108 C176 96 190 92 196 96 C192 104 192 114 196 122 C188 126 176 122 168 114"/>
    <path d="M76 136 C76 148 66 154 56 152 M116 136 C118 146 128 150 138 146"/>
    <path d="M96 58 C98 46 104 38 114 32 M114 32 C112 40 114 46 120 50 M114 32 C120 28 128 28 134 32"/>
    <circle cx="58" cy="92" r="4.5"/>
    <path d="M44 106 C50 110 56 110 62 108"/>`,
  octopus: `<path d="M64 84 C64 52 80 32 100 32 C120 32 136 52 136 84 C136 96 130 104 120 106 H80 C70 104 64 96 64 84Z"/>
    <circle cx="86" cy="70" r="5.5"/><circle cx="114" cy="70" r="5.5"/>
    <path d="M92 88 q8 7 16 0"/>
    <path d="M80 106 C76 126 66 136 52 142 C60 146 72 144 80 136 M96 106 C96 128 92 144 84 156 C94 154 102 144 104 130 M112 106 C116 126 124 136 136 140 C130 146 118 146 110 138 M124 102 C132 118 144 126 158 128 C150 136 138 134 128 126 M68 102 C58 112 48 116 36 114 C42 124 56 126 66 120"/>
    <circle cx="160" cy="48" r="6"/><circle cx="176" cy="66" r="4"/>`,
  crab: `<ellipse cx="100" cy="112" rx="52" ry="38"/>
    <path d="M86 74 V58 M114 74 V58"/>
    <circle cx="86" cy="52" r="7"/><circle cx="114" cy="52" r="7"/>
    <circle cx="86" cy="52" r="2.5"/><circle cx="114" cy="52" r="2.5"/>
    <path d="M62 88 C44 78 32 64 34 50 C46 48 60 58 68 72"/>
    <path d="M138 88 C156 78 168 64 166 50 C154 48 140 58 132 72"/>
    <path d="M34 50 c-6 -10 4 -18 12 -14 M166 50 c6 -10 -4 -18 -12 -14"/>
    <path d="M58 132 L36 148 M72 144 L58 162 M128 132 L150 148 M144 144 L158 162 M100 150 V170"/>
    <path d="M88 108 q12 10 24 0"/>`,
  turtle: `<path d="M56 96 C56 68 76 48 100 48 C124 48 144 68 144 96 C144 118 126 134 100 134 C74 134 56 118 56 96Z"/>
    <path d="M56 96 H144 M72 70 C84 82 84 108 72 122 M128 70 C116 82 116 108 128 122"/>
    <path d="M60 104 C52 104 42 108 38 116 C46 122 56 120 62 114 M140 104 C148 104 158 108 162 116 C154 122 144 120 138 114"/>
    <path d="M136 60 C144 52 154 50 162 54 C160 64 152 70 142 70"/>
    <circle cx="150" cy="58" r="2.5"/>
    <path d="M66 128 L58 142 M134 128 L142 142"/>`,
  dolphin: `<path d="M30 122 C34 92 56 64 92 56 C118 50 142 56 158 70 L178 62 C174 72 172 80 174 90 C170 106 156 118 136 122 L104 126 C78 130 50 130 30 122 Z"/>
    <path d="M96 58 C102 46 112 40 122 38 C120 46 118 52 118 58"/>
    <path d="M110 92 C114 82 122 76 132 74 C130 84 126 90 120 94"/>
    <circle cx="146" cy="74" r="4"/>
    <path d="M46 118 C60 122 76 122 90 120"/>
    <path d="M20 146 C32 138 44 138 56 146 C68 154 80 154 92 146 C104 138 116 138 128 146 C140 154 152 154 164 146"/>`,
  starfish: `<path d="M100 24 C108 24 114 44 118 62 C134 54 152 48 158 56 C164 64 152 80 140 92 C154 100 168 112 164 124 C160 134 140 130 124 124 C122 142 116 160 100 160 C84 160 78 142 76 124 C60 130 40 134 36 124 C32 112 46 100 60 92 C48 80 36 64 42 56 C48 48 66 54 82 62 C86 44 92 24 100 24Z"/>
    <circle cx="100" cy="58" r="4"/><circle cx="66" cy="88" r="4"/><circle cx="134" cy="88" r="4"/><circle cx="82" cy="130" r="4"/><circle cx="118" cy="130" r="4"/>
    <circle cx="30" cy="36" r="5"/><circle cx="176" cy="160" r="6"/><circle cx="162" cy="30" r="3.5"/>`,

  // --- body parts ---
  head: `<circle cx="100" cy="100" r="62"/>
    <path d="M58 66 C70 46 86 38 104 38 C90 48 84 58 84 66"/>
    <path d="M46 96 a7 9 0 1 0 0.1 0Z M154 96 a7 9 0 1 0 0.1 0Z"/>
    <path d="M78 88 a7 10 0 1 0 0.1 0Z M122 88 a7 10 0 1 0 0.1 0Z"/>
    <circle cx="80" cy="92" r="3"/><circle cx="124" cy="92" r="3"/>
    <path d="M100 100 l-6 10 h12Z"/>
    <path d="M78 128 q22 16 44 0"/>`,
  eye: `<path d="M24 100 C48 58 152 58 176 100 C152 142 48 142 24 100Z"/>
    <circle cx="100" cy="100" r="30"/>
    <circle cx="100" cy="100" r="14"/>
    <circle cx="106" cy="92" r="4"/>
    <path d="M56 52 C74 40 126 40 144 52"/>
    <path d="M70 150 l-4 10 M100 156 v10 M130 150 l4 10 M42 138 l-6 9 M158 138 l6 9"/>`,
  ear: `<path d="M78 22 C40 22 24 58 30 96 C36 136 56 172 92 178 C114 182 126 168 118 154 C112 144 100 142 96 132"/>
    <path d="M78 44 C58 46 48 66 52 92 C56 120 68 148 88 156"/>
    <path d="M74 70 C64 74 62 88 68 98 M88 118 C96 122 104 118 106 110"/>
    <path d="M132 60 C150 56 164 66 166 84 M136 96 C150 96 160 106 160 120"/>`,
  mouth: `<path d="M28 96 C56 68 84 60 100 60 C116 60 144 68 172 96 C144 136 116 154 100 154 C84 154 56 136 28 96Z"/>
    <path d="M40 100 C64 108 136 108 160 100"/>
    <path d="M70 84 C80 78 92 76 100 78 M130 84 C120 78 108 76 100 78"/>
    <path d="M62 92 C54 96 48 100 44 104 M138 92 C146 96 152 100 156 104"/>`,
  hand: `<path d="M70 178 C60 160 54 140 56 116 L56 92 C56 84 66 84 67 92 L69 116 M69 116 L67 60 C67 50 78 50 79 60 L81 108 M81 108 L80 46 C80 36 92 36 93 46 L94 106 M94 106 L95 52 C95 42 106 42 107 52 L107 108 M107 108 L110 66 C111 56 122 57 121 67 L118 122 C116 146 110 162 100 178 Z"/>
    <path d="M70 178 C82 186 96 186 100 178"/>
    <path d="M100 178 C108 168 114 158 118 148"/>`,
  foot: `<path d="M58 176 C40 176 32 164 36 150 C42 132 58 120 66 100 C74 78 80 48 102 42 C130 34 152 54 158 82 C164 110 160 140 148 160 C140 172 126 176 112 176 Z"/>
    <path d="M66 100 C80 106 96 106 110 100"/>
    <path d="M58 168 a5 5 0 1 0 0.1 0Z M76 172 a5 5 0 1 0 0.1 0Z M96 174 a5 5 0 1 0 0.1 0Z"/>
    <path d="M128 60 C138 68 144 80 146 92"/>`,

  // --- seasons: the same tree through the year ---
  spring: `<path d="M94 176 C96 150 96 130 94 112 M106 176 C104 150 104 130 106 112 M94 130 C88 122 82 118 74 116 M106 130 C112 122 118 118 126 116"/>
    <path d="M100 112 C64 112 44 92 48 68 C52 46 74 32 100 34 C126 32 148 46 152 68 C156 92 136 112 100 112Z"/>
    <path d="M74 58 l3 7 7 1 -5 5 1 8 -6 -4 -7 3 2 -8 -5 -4 8 -1Z M126 56 l3 7 7 1 -5 5 1 8 -6 -4 -7 3 2 -8 -5 -4 8 -1Z M100 80 l3 7 7 1 -5 5 1 8 -6 -4 -7 3 2 -8 -5 -4 8 -1Z"/>
    <circle cx="164" cy="30" r="14"/>
    <path d="M164 10 v-6 M164 50 v6 M144 30 h-6 M184 30 h6"/>
    <path d="M28 168 h144"/>`,
  summer: `<path d="M94 176 C96 150 96 130 94 112 M106 176 C104 150 104 130 106 112 M94 130 C88 122 82 118 74 116 M106 130 C112 122 118 118 126 116"/>
    <path d="M100 112 C64 112 44 92 48 68 C52 46 74 32 100 34 C126 32 148 46 152 68 C156 92 136 112 100 112Z"/>
    <circle cx="166" cy="28" r="20"/>
    <path d="M166 2 v-4 M166 58 v4 M140 28 h-4 M192 28 h4 M148 10 l-3 -3 M184 46 l3 3 M148 46 l-3 3 M184 10 l3 -3"/>
    <path d="M34 44 l6 4 -2 7 7 -2 4 6 M28 168 h144"/>
    <path d="M56 66 C70 56 90 52 100 54"/>`,
  autumn: `<path d="M94 176 C96 150 96 130 94 112 M106 176 C104 150 104 130 106 112 M94 130 C88 122 82 118 74 116 M106 130 C112 122 118 118 126 116"/>
    <path d="M100 112 C64 112 44 92 48 68 C52 46 74 32 100 34 C126 32 148 46 152 68 C156 92 136 112 100 112Z"/>
    <path d="M72 70 l4 8 8 2 -6 6 1 9 -7 -5 -8 4 2 -9 -6 -5 8 -2Z M128 66 l4 8 8 2 -6 6 1 9 -7 -5 -8 4 2 -9 -6 -5 8 -2Z"/>
    <path d="M40 140 l5 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z M158 132 l5 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z M100 156 l5 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z"/>
    <path d="M62 44 C78 36 96 34 112 38 M28 168 h144"/>`,
  winter: `<path d="M94 176 C96 150 96 130 94 112 M106 176 C104 150 104 130 106 112 M94 130 C88 122 82 118 74 116 M106 130 C112 122 118 118 126 116"/>
    <path d="M100 112 C64 112 44 92 48 68 C52 46 74 32 100 34 C126 32 148 46 152 68 C156 92 136 112 100 112Z"/>
    <path d="M60 62 l24 10 M140 62 l-24 10 M76 44 l14 14 M124 44 l-14 14"/>
    <path d="M42 26 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z M160 24 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z M118 20 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z"/>
    <path d="M20 168 C40 158 60 162 76 168 C96 174 116 174 136 168 C152 163 168 162 180 166"/>
    <circle cx="70" cy="26" r="3"/><circle cx="140" cy="40" r="3"/>`,

  // --- opposites: the partners the sun/moon/elephant/turtle/rocket reuse ---
  mouse: `<path d="M36 114 C32 102 44 92 60 92 C66 80 80 74 94 78 C98 68 112 62 126 68 C142 76 150 94 148 112 C146 132 128 144 104 144 C82 144 58 136 44 124 C40 121 37 117 36 114Z"/>
    <path d="M60 92 C58 78 66 64 82 62 C86 74 82 86 74 92"/>
    <circle cx="52" cy="106" r="3.5"/>
    <path d="M36 114 L24 108 M36 114 L26 120 M36 114 L28 128"/>
    <path d="M148 114 C168 108 178 92 176 74 C175 66 170 60 163 60"/>
    <path d="M78 144 L76 158 M104 145 L104 159"/>
    <path d="M56 128 C70 134 90 136 108 134"/>`,
  campfire: `<path d="M46 168 L154 146 M154 168 L46 146"/>
    <path d="M100 28 C116 52 132 66 130 92 C128 116 114 130 100 132 C86 130 72 116 70 92 C68 66 84 52 100 28Z"/>
    <path d="M100 62 C108 74 116 82 115 96 C114 110 106 118 100 119 C94 118 86 110 85 96 C84 82 92 74 100 62Z"/>
    <path d="M100 96 v14"/>
    <path d="M36 44 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z M168 52 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z"/>`,
  snowman: `<circle cx="100" cy="136" r="40"/>
    <circle cx="100" cy="72" r="30"/>
    <path d="M72 54 H128 L122 34 H78 Z"/>
    <path d="M78 34 H122 M86 34 V20 M114 34 V20 M86 20 H114"/>
    <circle cx="90" cy="66" r="3.5"/><circle cx="110" cy="66" r="3.5"/>
    <path d="M100 78 v8 M100 86 l-7 6 h14Z"/>
    <circle cx="100" cy="122" r="4"/><circle cx="100" cy="140" r="4"/>
    <path d="M60 128 L30 108 M140 128 L170 108"/>
    <path d="M20 176 C40 168 60 170 76 176 C96 182 116 182 136 176 C152 171 168 170 180 174"/>`,
  "glass-full": `<path d="M56 40 H144 L134 172 C133 180 127 186 119 186 H81 C73 186 67 180 66 172 Z"/>
    <path d="M62 92 L69 172 H131 L138 92"/>
    <path d="M64 110 L70 170 H130 L136 110"/>
    <path d="M56 40 L50 24 M144 40 L150 24"/>
    <path d="M74 120 C84 126 116 126 126 120"/>`,
  "glass-empty": `<path d="M56 40 H144 L134 172 C133 180 127 186 119 186 H81 C73 186 67 180 66 172 Z"/>
    <path d="M62 92 L69 172 H131 L138 92"/>
    <path d="M56 40 L50 24 M144 40 L150 24"/>
    <path d="M78 120 C88 116 112 116 122 120"/>
    <path d="M40 140 l4 9 9 2 -6 7 1 10 -8 -6 -9 5 2 -10 -6 -6 9 -2Z"/>`,
};

function outline(name, size, stroke = 2.6) {
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" fill="none"
    stroke="#3a3a3a" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${SHAPES[name]}</svg>`;
}

// ---------------------------------------------------------------------------
// Reusable worksheet rows
// ---------------------------------------------------------------------------

/**
 * A tracing row: `n` glyphs at `size`, first cells solid-grey to follow, later
 * cells hollow, last cells empty for unassisted writing.
 */
function traceRow(glyph, { n = 5, size = "34pt", solid = 2, hollow = 2, height = "20mm", grow = false }) {
  const cells = Array.from({ length: n }, (_, i) => {
    const cls = i < solid ? "g-solid" : i < solid + hollow ? "g-hollow" : "";
    const ch = i < solid + hollow ? esc(glyph) : "&nbsp;";
    return `<div style="flex:1;display:flex;align-items:center;justify-content:center;
      border-inline-end:1px dashed #e0e0e0;font-size:${size};line-height:1;"
      class="ar ${cls}">${ch}</div>`;
  }).join("");
  const sizing = grow ? `min-height:${height}` : `height:${height}`;
  return `<div class="box ${grow ? "grow" : ""}" style="display:flex;${sizing};overflow:hidden;">${cells}</div>`;
}

/** A single dashed line to copy a word onto, with a faded model at the start. */
function wordLine(word, { size = "20pt", height = "15mm" } = {}) {
  return `<div class="box" style="display:flex;align-items:center;height:${height};padding:0 4mm;gap:6mm;">
    <span class="ar g-solid" dir="rtl" style="font-size:${size};line-height:1;">${esc(word)}</span>
    <span class="ar g-hollow" dir="rtl" style="font-size:${size};line-height:1;">${esc(word)}</span>
    <span style="flex:1;border-bottom:1px dashed #d5d5d5;height:1px;"></span>
  </div>`;
}

function sectionLabel(en, ar) {
  return `<div style="display:flex;justify-content:space-between;align-items:baseline;margin:4mm 0 1.5mm;">
    <span class="label">${esc(en)}</span><span class="label ar" dir="rtl">${esc(ar)}</span>
  </div>`;
}

// ---------------------------------------------------------------------------
// Set 1 — alphabet tracing, one sheet per letter
// ---------------------------------------------------------------------------

function letterForms(ch) {
  const only = RIGHT_JOINING_ONLY.has(ch);
  return [
    { en: "Alone", ar: "منفرد", glyph: ch, note: "" },
    { en: "Start", ar: "أول", glyph: only ? ch : ch + ZWJ, note: only ? "does not join" : "" },
    { en: "Middle", ar: "وسط", glyph: only ? ZWJ + ch : ZWJ + ch + ZWJ, note: only ? "does not join" : "" },
    { en: "End", ar: "آخر", glyph: ZWJ + ch, note: "" },
  ];
}

function alphabetSheet(entry, i, total, qr) {
  const forms = letterForms(entry.ar)
    .map(
      (f) => `<div style="flex:1;text-align:center;padding:2mm 0;border-inline-end:1px solid #ececec;">
        <div class="ar" style="font-size:30pt;line-height:1.15;">${esc(f.glyph)}</div>
        <div class="label" style="margin-top:1mm;">${esc(f.en)}</div>
        <div class="label ar" dir="rtl" style="font-weight:600;">${esc(f.ar)}</div>
        ${f.note ? `<div style="font-size:6.5pt;color:#b0b0b0;margin-top:.5mm;">${esc(f.note)}</div>` : ""}
      </div>`,
    )
    .join("");

  const words = entry.examples
    .slice(0, 3)
    .map(
      (ex) => `<div style="margin-bottom:2.5mm;">
        <div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#555;margin-bottom:1mm;">
          <span><b class="ar" dir="rtl">${esc(ex.word)}</b> — ${esc(ex.translit)} — ${esc(ex.meaningEn)}</span>
        </div>
        ${wordLine(ex.word)}
      </div>`,
    )
    .join("");

  return sheet(`
    ${head("Arabic Alphabet Tracing")}
    <div class="title">
      <h1>${esc(entry.enName)}</h1>
      <span class="arname ar" dir="rtl">${esc(entry.arName)}</span>
      <span class="sub">${esc(entry.translit)} · letter ${i + 1} of ${total}</span>
    </div>
    <div class="instruction">
      Trace the grey letters, then write ${esc(entry.enName)} on your own in the empty boxes.
      <span class="rtl ar">تتبّع الحروف الرمادية، ثم اكتب حرف ${esc(entry.arName)} بنفسك في المربّعات الفارغة.</span>
    </div>

    <div class="body">
      <div style="display:flex;gap:5mm;margin-top:4mm;align-items:stretch;height:56mm;">
        <div class="box" style="width:56mm;display:flex;align-items:center;justify-content:center;">
          <span class="ar" style="font-size:110pt;line-height:1;color:#2b2b2b;">${esc(entry.ar)}</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;">
          <div class="label" style="margin-bottom:1.5mm;">The four forms · الأشكال الأربعة</div>
          <div class="box" style="flex:1;display:flex;overflow:hidden;">${forms}</div>
        </div>
      </div>

      ${sectionLabel("Trace the letter", "تتبّع الحرف")}
      ${traceRow(entry.ar, { n: 5, size: "40pt", solid: 2, hollow: 2, height: "24mm", grow: true })}
      <div style="height:3mm;"></div>
      ${traceRow(entry.ar, { n: 6, size: "30pt", solid: 2, hollow: 2, height: "20mm", grow: true })}
      <div style="height:3mm;"></div>
      ${traceRow(entry.ar, { n: 8, size: "24pt", solid: 1, hollow: 2, height: "17mm", grow: true })}

      ${sectionLabel("Words with this letter", "كلمات بهذا الحرف")}
      ${words}
    </div>

    ${foot(i + 1, total, qr)}
  `);
}

function buildAlphabet(qr) {
  const total = letterGuide.length;
  return doc(
    "Arabic Alphabet Tracing Worksheets",
    letterGuide.map((e, i) => alphabetSheet(e, i, total, qr)).join(""),
  );
}

// ---------------------------------------------------------------------------
// Set 2 — one-page alphabet chart
// ---------------------------------------------------------------------------

function buildChart(qr) {
  const cells = letterGuide
    .map(
      (e) => `<div style="border:1px solid #ddd;border-radius:2mm;padding:2mm 1mm;text-align:center;">
        <div class="ar" style="font-size:26pt;line-height:1.1;">${esc(e.ar)}</div>
        <div class="ar" dir="rtl" style="font-size:8.5pt;font-weight:700;">${esc(e.arName)}</div>
        <div style="font-size:7.5pt;color:#777;">${esc(e.enName)} · ${esc(e.translit)}</div>
      </div>`,
    )
    .join("");

  return doc(
    "Arabic Alphabet Chart",
    sheet(`
      ${head("Arabic Alphabet Chart")}
      <div class="title"><h1>The 28 Arabic Letters</h1><span class="arname ar" dir="rtl">حروف الهجاء العربية</span></div>
      <div class="instruction">
        Pin this sheet where your child works. Letters read right to left, the same direction Arabic is written.
        <span class="rtl ar">علّق هذه الورقة في مكان عمل طفلك. تُقرأ الحروف من اليمين إلى اليسار، وهو اتجاه الكتابة العربية.</span>
      </div>
      <div class="body">
        <div style="margin-top:5mm;flex:1;display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;gap:3mm;" dir="rtl">${cells}</div>
      </div>
      ${foot(1, 1, qr)}
    `),
  );
}

// ---------------------------------------------------------------------------
// Set 3 — numbers 1-10
// ---------------------------------------------------------------------------

function buildNumbers(qr) {
  return buildNumbersPack(numbersData, "Arabic Numbers 1–10", qr);
}

function buildNumbers11to20(qr) {
  return buildNumbersPack(numbers11to20Data, "Arabic Numbers 11–20", qr);
}

/** Shared sheet format for both number decades; dots cap at 20 to fit A4. */
function buildNumbersPack(data, kicker, _qr) {
  const total = data.length;
  const sheets = data
    .map((n, i) => {
      const count = Number(n.en);
      const dots = count <= 20
        ? Array.from(
            { length: count },
            () => `<span style="display:inline-block;width:${count > 10 ? 14 : 17}mm;height:${count > 10 ? 14 : 17}mm;border:2px solid #cfcfcf;border-radius:50%;margin:1.5mm;"></span>`,
          ).join("")
        : "";

      return sheet(`
        ${head(kicker)}
        <div class="title">
          <h1>${esc(n.enName)}</h1>
          <span class="arname ar" dir="rtl">${esc(n.arName)}</span>
          <span class="sub">${esc(n.translit)} · ${esc(n.ar)} / ${esc(n.en)}</span>
        </div>
        <div class="instruction">
          ${dots ? `Colour in ${count} circle${count === 1 ? "" : "s"}, then trace the number and its name.` : `Trace the number and its name.`}
          <span class="rtl ar">${dots ? `لوّن ${esc(n.ar)} من الدوائر، ثم تتبّع الرقم واسمه.` : `تتبّع الرقم واسمه.`}</span>
        </div>

        <div class="body">
          <div style="display:flex;gap:5mm;margin-top:4mm;${dots ? "height:62mm;" : ""}">
            <div class="box" style="width:56mm;display:flex;align-items:center;justify-content:center;">
              <span class="ar" style="font-size:110pt;line-height:1;">${esc(n.ar)}</span>
            </div>
            ${dots ? `<div class="box" style="flex:1;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;padding:4mm;">
              ${dots}
            </div>` : `<div class="box" style="flex:1;display:flex;align-items:center;justify-content:center;">
              <span class="ar g-hollow" style="font-size:64pt;">${esc(n.ar)} ${esc(n.en)}</span>
            </div>`}
          </div>

          ${sectionLabel("Trace the Arabic numeral", "تتبّع الرقم العربي")}
          ${traceRow(n.ar, { n: 5, size: "40pt", solid: 2, hollow: 2, height: "24mm", grow: true })}

          ${sectionLabel("Trace the Western digit", "تتبّع الرقم الغربي")}
          ${traceRow(n.en, { n: 5, size: "36pt", solid: 2, hollow: 2, height: "22mm", grow: true })}

          ${sectionLabel("Trace the name", "تتبّع الاسم")}
          ${wordLine(n.arName, { size: "24pt", height: "22mm" })}

          ${sectionLabel(`Draw ${count} thing${count === 1 ? "" : "s"} you can count`, "ارسم أشياء بالعدد نفسه")}
          <div class="box grow" style="min-height:34mm;"></div>
        </div>

        ${foot(i + 1, total, _qr)}
      `);
    })
    .join("");

  return doc(`${kicker} Tracing Worksheets`, sheets);
}

// ---------------------------------------------------------------------------
// Set 3b — harakat (short vowels)
// ---------------------------------------------------------------------------

function harakatSheet(item, i, total, qr) {
  // Three letters the child already knows, each carrying the mark, so the
  // sheet shows the mark as something that sits ON letters rather than a
  // floating symbol.
  const demoLetters = ["ب", "ت", "ج"];
  const demos = demoLetters
    .map(
      (l) => `<div style="flex:1;text-align:center;padding:2mm 0;border-inline-end:1px solid #ececec;">
        <div class="ar" style="font-size:40pt;line-height:1.2;">${esc(l + item.mark)}</div>
        <div style="font-size:8pt;color:#777;margin-top:1mm;">${esc(l === "ب" ? "b" : l === "ت" ? "t" : "j")}${esc(item.translit === "—" ? "" : item.translit)}</div>
      </div>`,
    )
    .join("");

  return sheet(`
    ${head("Arabic Harakat — Short Vowels")}
    <div class="title">
      <h1>${esc(item.nameEn)}</h1>
      <span class="arname ar" dir="rtl">${esc(item.nameAr)}</span>
      <span class="sub">mark ${i + 1} of ${total}</span>
    </div>
    <div class="instruction">
      ${esc(item.soundEn)}
      <span class="rtl ar">${esc(item.soundAr)}</span>
    </div>

    <div class="body">
      <div style="display:flex;gap:5mm;margin-top:4mm;align-items:stretch;height:52mm;">
        <div class="box" style="width:56mm;display:flex;align-items:center;justify-content:center;">
          <span class="ar" style="font-size:110pt;line-height:1;color:#2b2b2b;">${esc("ب" + item.mark)}</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;">
          <div class="label" style="margin-bottom:1.5mm;">The mark on three letters · الحركة على ثلاثة حروف</div>
          <div class="box" style="flex:1;display:flex;overflow:hidden;">${demos}</div>
        </div>
      </div>

      ${sectionLabel("Trace the mark on the letter", "تتبّع الحركة على الحرف")}
      ${traceRow("ب" + item.mark, { n: 5, size: "40pt", solid: 2, hollow: 2, height: "24mm", grow: true })}
      <div style="height:3mm;"></div>
      ${traceRow("ت" + item.mark, { n: 6, size: "30pt", solid: 2, hollow: 2, height: "20mm", grow: true })}
      <div style="height:3mm;"></div>
      ${traceRow("ج" + item.mark, { n: 8, size: "24pt", solid: 1, hollow: 2, height: "17mm", grow: true })}

      ${sectionLabel("A word with this mark", "كلمة بهذه الحركة")}
      <div style="margin-bottom:2.5mm;">
        <div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#555;margin-bottom:1mm;">
          <span><b class="ar" dir="rtl">${esc(item.word)}</b> — ${esc(item.wordTranslit)} — ${esc(item.wordMeaningEn)}</span>
        </div>
        ${wordLine(item.word)}
      </div>
    </div>

    ${foot(i + 1, total, qr)}
  `);
}

function buildHarakat(qr) {
  const total = harakatData.length;
  return doc(
    "Arabic Short Vowels (Harakat) Worksheets",
    harakatData.map((item, i) => harakatSheet(item, i, total, qr)).join(""),
  );
}

// ---------------------------------------------------------------------------
// Set 4 — colours & shapes
// ---------------------------------------------------------------------------

function buildColors(qr) {
  const total = colorsData.length;
  const sheets = colorsData
    .map((c, i) =>
      sheet(`
        ${head("Arabic Colours & Shapes")}
        <div class="title">
          <h1>${esc(c.en)}</h1>
          <span class="arname ar" dir="rtl">${esc(c.ar)}</span>
          <span class="sub">${esc(c.translit)} · ${esc(c.shapeEn)}</span>
        </div>
        <div class="instruction">
          Colour the ${esc(c.shapeEn.toLowerCase())} in ${esc(c.en.toLowerCase())}, then trace the word in Arabic and English.
          <span class="rtl ar">لوّن ${esc(c.shapeAr)} باللون ${esc(c.ar)}، ثم تتبّع الكلمة بالعربية والإنجليزية.</span>
        </div>

        <div class="body">
          <div class="box grow" style="margin-top:4mm;min-height:96mm;display:flex;align-items:center;justify-content:center;">
            ${outline(c.shape, 340, 2.2)}
          </div>

          ${sectionLabel("Trace in Arabic", "تتبّع بالعربية")}
          ${traceRow(c.ar, { n: 3, size: "32pt", solid: 1, hollow: 1, height: "26mm", grow: true })}

          ${sectionLabel("Trace in English", "تتبّع بالإنجليزية")}
          ${traceRow(c.en, { n: 3, size: "30pt", solid: 1, hollow: 1, height: "26mm", grow: true })}

          ${sectionLabel("Find something this colour and draw it", "ابحث عن شيء بهذا اللون وارسمه")}
          <div class="box grow" style="min-height:34mm;"></div>
        </div>

        ${foot(i + 1, total, qr)}
      `),
    )
    .join("");

  return doc("Arabic Colours & Shapes Worksheets", sheets);
}

// ---------------------------------------------------------------------------
// Set 5 — animals colouring
// ---------------------------------------------------------------------------

function buildAnimals(qr) {
  const total = animalsData.length;
  const sheets = animalsData
    .map((a, i) =>
      sheet(`
        ${head("Arabic Animals Colouring")}
        <div class="title">
          <h1>${esc(a.en)}</h1>
          <span class="arname ar" dir="rtl">${esc(a.ar)}</span>
          <span class="sub">${esc(a.translit)}</span>
        </div>
        <div class="instruction">
          ${esc(a.factEn)}
          <span class="rtl ar">${esc(a.factAr)}</span>
        </div>

        <div class="body">
          <div class="box grow" style="margin-top:4mm;min-height:120mm;display:flex;align-items:center;justify-content:center;">
            ${outline(a.shape, 420, 2.2)}
          </div>

          ${sectionLabel("Trace the Arabic name", "تتبّع الاسم بالعربية")}
          ${wordLine(a.ar, { size: "28pt", height: "24mm" })}

          ${sectionLabel("Trace the English name", "تتبّع الاسم بالإنجليزية")}
          ${wordLine(a.en, { size: "26pt", height: "24mm" })}

          ${sectionLabel("Draw where this animal lives", "ارسم المكان الذي يعيش فيه")}
          <div class="box grow" style="min-height:30mm;"></div>
        </div>

        ${foot(i + 1, total, qr)}
      `),
    )
    .join("");

  return doc("Arabic Animals Colouring & Word Tracing", sheets);
}

// ---------------------------------------------------------------------------
// Sets 6–8 — themed colouring books (fruits & vegetables, transport, solar)
// ---------------------------------------------------------------------------

/** Shared layout for the themed colouring books — same proven shape as animals. */
function themedColouringSheet({ kicker, item, i, total, qr, drawEn, drawAr }) {
  return sheet(`
    ${head(kicker)}
    <div class="title">
      <h1>${esc(item.en)}</h1>
      <span class="arname ar" dir="rtl">${esc(item.ar)}</span>
      <span class="sub">${esc(item.translit)}</span>
    </div>
    <div class="instruction">
      ${esc(item.factEn)}
      <span class="rtl ar">${esc(item.factAr)}</span>
    </div>

    <div class="body">
      <div class="box grow" style="margin-top:4mm;min-height:120mm;display:flex;align-items:center;justify-content:center;">
        ${outline(item.shape, 420, 2.2)}
      </div>

      ${sectionLabel("Trace the Arabic name", "تتبّع الاسم بالعربية")}
      ${wordLine(item.ar, { size: "28pt", height: "24mm" })}

      ${sectionLabel("Trace the English name", "تتبّع الاسم بالإنجليزية")}
      ${wordLine(item.en, { size: "26pt", height: "24mm" })}

      ${sectionLabel(drawEn, drawAr)}
      <div class="box grow" style="min-height:30mm;"></div>
    </div>

    ${foot(i + 1, total, qr)}
  `);
}

function themedColouringDoc({ title, kicker, data, qr, drawEn, drawAr }) {
  const sheets = data
    .map((item, i) => themedColouringSheet({ kicker, item, i, total: data.length, qr, drawEn, drawAr }))
    .join("");
  return doc(title, sheets);
}

function buildFruitsVeg(qr) {
  return themedColouringDoc({
    title: "Arabic Fruits & Vegetables Coloring Book",
    kicker: "Arabic Fruits & Vegetables Colouring",
    data: fruitsVegData,
    qr,
    drawEn: "Draw your favourite fruit or vegetable", drawAr: "ارسم فاكهتك أو خضرواتك المفضّلة",
  });
}

function buildTransport(qr) {
  return themedColouringDoc({
    title: "Arabic Transport Coloring Book",
    kicker: "Arabic Transport Colouring",
    data: transportData,
    qr,
    drawEn: "Draw where this vehicle is going", drawAr: "ارسم إلى أين تتّجه هذه الآلية",
  });
}

function buildSolar(qr) {
  return themedColouringDoc({
    title: "Arabic Solar System Coloring Book",
    kicker: "Arabic Solar System Colouring",
    data: solarData,
    qr,
    drawEn: "Draw your own planet — what lives on it?", drawAr: "ارسم كوكبك الخاص — مَن يسكن فيه؟",
  });
}

function buildRamadan(qr) {
  return themedColouringDoc({
    title: "Ramadan & Eid Coloring Book in Arabic",
    kicker: "Ramadan & Eid Colouring",
    data: ramadanData,
    qr,
    drawEn: "Draw how your family celebrates Eid", drawAr: "ارسم كيف يحتفل أهلك بالعيد",
  });
}

function buildSea(qr) {
  return themedColouringDoc({
    title: "Arabic Sea Animals Coloring Book",
    kicker: "Arabic Sea Animals Colouring",
    data: seaData,
    qr,
    drawEn: "Draw the sea home of this animal", drawAr: "ارسم بيت هذا الحيوان في البحر",
  });
}

function buildBodyParts(qr) {
  return themedColouringDoc({
    title: "My Body in Arabic — Coloring Book",
    kicker: "My Body in Arabic Colouring",
    data: bodyPartsData,
    qr,
    drawEn: "Touch this part on your body, then draw how you use it", drawAr: "المس هذا الجزء من جسمك، ثم ارسم كيف تستعمله",
  });
}

function buildSeasons(qr) {
  const total = seasonsData.length;
  const sheets = seasonsData
    .map((s, i) =>
      sheet(`
        ${head("The Four Seasons in Arabic")}
        <div class="title">
          <h1>${esc(s.en)}</h1>
          <span class="arname ar" dir="rtl">${esc(s.ar)}</span>
          <span class="sub">${esc(s.translit)}</span>
        </div>
        <div class="instruction">
          ${esc(s.factEn)}
          <span class="rtl ar">${esc(s.factAr)}</span>
        </div>

        <div class="body">
          <div class="box grow" style="margin-top:4mm;min-height:120mm;display:flex;align-items:center;justify-content:center;">
            ${outline(s.shape, 420, 2.2)}
          </div>

          ${sectionLabel("Trace the season in Arabic", "تتبّع اسم الفصل بالعربية")}
          ${wordLine(s.ar, { size: "28pt", height: "24mm" })}

          ${sectionLabel("Trace the season in English", "تتبّع اسم الفصل بالإنجليزية")}
          ${wordLine(s.en, { size: "26pt", height: "24mm" })}

          ${sectionLabel("Draw your favourite thing in this season", "ارسم شيئك المفضّل في هذا الفصل")}
          <div class="box grow" style="min-height:30mm;"></div>
        </div>

        ${foot(i + 1, total, qr)}
      `),
    )
    .join("");

  return doc("The Four Seasons in Arabic — Coloring Book", sheets);
}

function buildOpposites(qr) {
  const total = oppositesData.length;
  const sheets = oppositesData
    .map((pair, i) =>
      sheet(`
        ${head("Arabic Opposites")}
        <div class="title">
          <h1>${esc(pair.en1)} &amp; ${esc(pair.en2)}</h1>
          <span class="arname ar" dir="rtl">${esc(pair.ar1)} — ${esc(pair.ar2)}</span>
        </div>
        <div class="instruction">
          ${esc(pair.factEn)}
          <span class="rtl ar">${esc(pair.factAr)}</span>
        </div>

        <div class="body">
          <div style="display:flex;gap:5mm;margin-top:4mm;">
            <div class="box grow" style="min-height:104mm;display:flex;align-items:center;justify-content:center;">
              ${outline(pair.shape1, 240, 2.2)}
            </div>
            <div class="box grow" style="min-height:104mm;display:flex;align-items:center;justify-content:center;">
              ${outline(pair.shape2, 240, 2.2)}
            </div>
          </div>

          ${sectionLabel(`Trace both words — ${pair.en1} and ${pair.en2}`, "تتبّع الكلمتين بالعربية")}
          <div class="box" style="display:flex;align-items:center;height:22mm;padding:0 4mm;gap:6mm;">
            <span class="ar g-solid" dir="rtl" style="font-size:22pt;">${esc(pair.ar1)}</span>
            <span class="ar g-hollow" dir="rtl" style="font-size:22pt;">${esc(pair.ar1)}</span>
            <span style="flex:1;border-bottom:1px dashed #d5d5d5;height:1px;"></span>
            <span class="ar g-solid" dir="rtl" style="font-size:22pt;">${esc(pair.ar2)}</span>
            <span class="ar g-hollow" dir="rtl" style="font-size:22pt;">${esc(pair.ar2)}</span>
            <span style="flex:1;border-bottom:1px dashed #d5d5d5;height:1px;"></span>
          </div>

          ${sectionLabel("Trace in English", "تتبّع بالإنجليزية")}
          <div class="box" style="display:flex;align-items:center;height:20mm;padding:0 4mm;gap:5mm;">
            <span class="g-solid" style="font-size:20pt;">${esc(pair.en1)}</span>
            <span class="g-hollow" style="font-size:20pt;">${esc(pair.en1)}</span>
            <span style="flex:1;border-bottom:1px dashed #d5d5d5;height:1px;"></span>
            <span class="g-solid" style="font-size:20pt;">${esc(pair.en2)}</span>
            <span class="g-hollow" style="font-size:20pt;">${esc(pair.en2)}</span>
            <span style="flex:1;border-bottom:1px dashed #d5d5d5;height:1px;"></span>
          </div>
        </div>

        ${foot(i + 1, total, qr)}
      `),
    )
    .join("");

  return doc("Arabic Opposites Coloring Book", sheets);
}

/**
 * A huge outlined "bubble" letter: SVG text with fill=none and a stroke, so a
 * child colours inside the letterform itself. SVG is used rather than
 * -webkit-text-stroke because the stroke width scales with the glyph and the
 * result prints reliably.
 */
function bubbleLetter(ch, size = 380) {
  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" role="img" aria-label="${esc(ch)}">
    <text x="100" y="112" text-anchor="middle" dominant-baseline="middle"
      font-family="'Noto Naskh Arabic','Noto Sans Arabic',serif"
      font-size="150" fill="none" stroke="#3a3a3a" stroke-width="2.4"
      stroke-linejoin="round">${esc(ch)}</text>
  </svg>`;
}

function buildAlphabetColoring(qr) {
  const total = letterGuide.length;
  const sheets = letterGuide
    .map((entry, i) => {
      const examples = entry.examples
        .slice(0, 2)
        .map(
          (ex) => `<div class="box" style="flex:1;display:flex;align-items:center;gap:4mm;padding:2mm 4mm;">
            <span style="font-size:20pt;line-height:1;">${ex.emoji}</span>
            <div>
              <div class="ar" dir="rtl" style="font-size:16pt;font-weight:700;">${esc(ex.word)}</div>
              <div style="font-size:8.5pt;color:#666;">${esc(ex.translit)} · ${esc(ex.meaningEn)}</div>
            </div>
          </div>`,
        )
        .join("");

      return sheet(`
        ${head("Arabic Alphabet Colouring")}
        <div class="title">
          <h1>${esc(entry.enName)}</h1>
          <span class="arname ar" dir="rtl">${esc(entry.arName)} — ${esc(entry.ar)}</span>
          <span class="sub">${esc(entry.translit)}</span>
        </div>
        <div class="instruction">
          Colour the big letter, then say its sound and trace it. Can you find it inside the words below?
          <span class="rtl ar">لوّن الحرف الكبير، ثم انطق صوته وتتبّعه. هل تجده داخل الكلمتين؟</span>
        </div>

        <div class="body">
          <div class="box grow" style="margin-top:4mm;min-height:104mm;display:flex;align-items:center;justify-content:center;">
            ${bubbleLetter(entry.ar)}
          </div>

          ${sectionLabel("Words that start with this letter", "كلمات تبدأ بهذا الحرف")}
          <div style="display:flex;gap:4mm;margin-top:1mm;">${examples}</div>

          ${sectionLabel("Trace the letter", "تتبّع الحرف")}
          ${traceRow(entry.ar, { n: 5, size: "30pt", solid: 1, hollow: 2, height: "20mm" })}
        </div>

        ${foot(i + 1, total, qr)}
      `);
    })
    .join("");

  return doc("Arabic Alphabet Coloring Book — Big Bubble Letters", sheets);
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const SETS = [
  { id: "arabic-alphabet-chart", html: buildChart },
  { id: "arabic-alphabet-tracing", html: buildAlphabet },
  { id: "arabic-numbers-tracing", html: buildNumbers },
  { id: "arabic-numbers-11-20", html: buildNumbers11to20 },
  { id: "arabic-harakat", html: buildHarakat },
  { id: "arabic-colors", html: buildColors },
  { id: "arabic-animals-coloring", html: buildAnimals },
  { id: "arabic-fruits-vegetables-coloring", html: buildFruitsVeg },
  { id: "arabic-transport-coloring", html: buildTransport },
  { id: "arabic-solar-system-coloring", html: buildSolar },
  { id: "arabic-alphabet-coloring", html: buildAlphabetColoring },
  { id: "arabic-ramadan-coloring", html: buildRamadan },
  { id: "arabic-sea-animals-coloring", html: buildSea },
  { id: "arabic-body-parts-coloring", html: buildBodyParts },
  { id: "arabic-seasons-coloring", html: buildSeasons },
  { id: "arabic-opposites-coloring", html: buildOpposites },
];

function renderPdf(tmp, id, html) {
  const htmlPath = join(tmp, `${id.replace(/\//g, "_")}.html`);
  const pdfPath = join(OUT_DIR, `${id}.pdf`);
  writeFileSync(htmlPath, html, "utf8");

  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--generate-pdf-document-outline",
      `--print-to-pdf=${pdfPath}`,
      `--virtual-time-budget=10000`,
      `file://${htmlPath}`,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  if (!existsSync(pdfPath)) throw new Error(`Chrome produced no PDF for ${id}`);
  return { pdfPath, bytes: statSync(pdfPath).size };
}

/**
 * First page of each pack as a small PNG, so the download cards can show what is
 * actually inside instead of asking for a click on faith.
 *
 * The window is one A4 sheet at 96dpi (210mm x 297mm = 794 x 1123 CSS px) so the
 * capture lands exactly on sheet one; the device scale factor shrinks the bitmap
 * without changing the layout, which keeps each thumbnail well under 100 KB.
 */
function renderThumb(tmp, id, html, outDir = THUMB_DIR) {
  const htmlPath = join(tmp, `${id.replace(/\//g, "_")}-thumb.html`);
  const pngPath = join(outDir, `${id.includes("/") ? id.split("/")[1] : id}.png`);
  writeFileSync(htmlPath, html, "utf8");

  execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--window-size=794,1123",
      "--force-device-scale-factor=0.44",
      `--screenshot=${pngPath}`,
      `--virtual-time-budget=10000`,
      `file://${htmlPath}`,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  if (!existsSync(pngPath)) throw new Error(`Chrome produced no preview for ${id}`);
  return statSync(pngPath).size;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(THUMB_DIR, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), "arabfingers-worksheets-"));
  const manifest = {};

  try {
    const parts = [];
    for (const set of SETS) {
      const html = await set.html(await qrBlock(set.id));
      parts.push(html);
      const { bytes } = renderPdf(tmp, set.id, html);
      const thumb = renderThumb(tmp, set.id, html);
      manifest[set.id] = bytes;
      console.log(
        `  ✓ ${set.id}.pdf  (${(bytes / 1024).toFixed(0)} KB, preview ${(thumb / 1024).toFixed(0)} KB)`,
      );
    }

    // The complete workbook is every sheet in teaching order, rendered in one
    // pass — cheaper and more reliable than merging five finished PDFs.
    const bodies = parts.map((h) => h.slice(h.indexOf("<body>") + 6, h.lastIndexOf("</body>"))).join("");
    const workbook = doc("Complete Arabic Workbook", bodies);
    const { bytes } = renderPdf(tmp, "arabic-complete-workbook", workbook);
    renderThumb(tmp, "arabic-complete-workbook", workbook);
    manifest["arabic-complete-workbook"] = bytes;
    console.log(`  ✓ arabic-complete-workbook.pdf  (${(bytes / 1024).toFixed(0)} KB)`);

    // One standalone PDF + preview per letter — the letter-by-letter landing
    // pages (/printables/letters/<slug>) each need their own download. Same
    // sheet as inside the alphabet pack, but the footer QR points at that
    // letter's own page (which carries the audio button) instead of /play.
    // Slug rule mirrors lib/letterWorksheets.ts: the letter's English name.
    mkdirSync(LETTER_DIR, { recursive: true });
    mkdirSync(LETTER_THUMB_DIR, { recursive: true });
    const total = letterGuide.length;
    for (const [index, entry] of letterGuide.entries()) {
      const slug = entry.enName.toLowerCase();
      const qr = await qrBlock(`letters/${slug}`);
      const html = doc(
        `Arabic Letter ${entry.enName} Worksheet`,
        alphabetSheet(entry, index, total, qr),
      );
      const { bytes } = renderPdf(tmp, `letters/${slug}`, html);
      renderThumb(tmp, `letters/${slug}`, html, LETTER_THUMB_DIR);
      manifest[`letters/${slug}`] = bytes;
      console.log(`  ✓ letters/${slug}.pdf  (${(bytes / 1024).toFixed(0)} KB)`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  // Byte sizes are shown on the download cards, so the page can promise an
  // accurate size before the click. Generated, never hand-edited.
  writeFileSync(
    join(ROOT, "lib", "worksheet-files.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );

  console.log(`\nWorksheets written to public/printables/ (manifest: lib/worksheet-files.json)`);
}

await main();
