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

import { letterGuide } from "../lib/letterGuide.ts";
import { numbersData, colorsData, animalsData } from "../lib/worksheets.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "printables");
const THUMB_DIR = join(OUT_DIR, "previews");
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

function foot(n, total) {
  return `<div class="foot"><span>${SITE}</span><span>Page ${n} of ${total}</span></div>`;
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

function alphabetSheet(entry, i, total) {
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

    ${foot(i + 1, total)}
  `);
}

function buildAlphabet() {
  const total = letterGuide.length;
  return doc(
    "Arabic Alphabet Tracing Worksheets",
    letterGuide.map((e, i) => alphabetSheet(e, i, total)).join(""),
  );
}

// ---------------------------------------------------------------------------
// Set 2 — one-page alphabet chart
// ---------------------------------------------------------------------------

function buildChart() {
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
      ${foot(1, 1)}
    `),
  );
}

// ---------------------------------------------------------------------------
// Set 3 — numbers 1-10
// ---------------------------------------------------------------------------

function buildNumbers() {
  const total = numbersData.length;
  const sheets = numbersData
    .map((n, i) => {
      const count = Number(n.en);
      const dots = Array.from(
        { length: count },
        () => `<span style="display:inline-block;width:17mm;height:17mm;border:2px solid #cfcfcf;border-radius:50%;margin:2mm;"></span>`,
      ).join("");

      return sheet(`
        ${head("Arabic Numbers 1–10")}
        <div class="title">
          <h1>${esc(n.enName)}</h1>
          <span class="arname ar" dir="rtl">${esc(n.arName)}</span>
          <span class="sub">${esc(n.translit)} · ${esc(n.ar)} / ${esc(n.en)}</span>
        </div>
        <div class="instruction">
          Colour in ${count} circle${count === 1 ? "" : "s"}, then trace the number and its name.
          <span class="rtl ar">لوّن ${esc(n.ar)} من الدوائر، ثم تتبّع الرقم واسمه.</span>
        </div>

        <div class="body">
          <div style="display:flex;gap:5mm;margin-top:4mm;height:62mm;">
            <div class="box" style="width:56mm;display:flex;align-items:center;justify-content:center;">
              <span class="ar" style="font-size:110pt;line-height:1;">${esc(n.ar)}</span>
            </div>
            <div class="box" style="flex:1;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;padding:4mm;">
              ${dots}
            </div>
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

        ${foot(i + 1, total)}
      `);
    })
    .join("");

  return doc("Arabic Numbers 1–10 Tracing Worksheets", sheets);
}

// ---------------------------------------------------------------------------
// Set 4 — colours & shapes
// ---------------------------------------------------------------------------

function buildColors() {
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

        ${foot(i + 1, total)}
      `),
    )
    .join("");

  return doc("Arabic Colours & Shapes Worksheets", sheets);
}

// ---------------------------------------------------------------------------
// Set 5 — animals colouring
// ---------------------------------------------------------------------------

function buildAnimals() {
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

        ${foot(i + 1, total)}
      `),
    )
    .join("");

  return doc("Arabic Animals Colouring & Word Tracing", sheets);
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const SETS = [
  { id: "arabic-alphabet-chart", html: buildChart },
  { id: "arabic-alphabet-tracing", html: buildAlphabet },
  { id: "arabic-numbers-tracing", html: buildNumbers },
  { id: "arabic-colors", html: buildColors },
  { id: "arabic-animals-coloring", html: buildAnimals },
];

function renderPdf(tmp, id, html) {
  const htmlPath = join(tmp, `${id}.html`);
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
function renderThumb(tmp, id, html) {
  const htmlPath = join(tmp, `${id}-thumb.html`);
  const pngPath = join(THUMB_DIR, `${id}.png`);
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

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(THUMB_DIR, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), "arabfingers-worksheets-"));
  const manifest = {};

  try {
    const parts = [];
    for (const set of SETS) {
      const html = set.html();
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

main();
