#!/usr/bin/env node
/**
 * Builds the real, downloadable worksheet PDFs into public/printables/.
 *
 *   node scripts/build-worksheets.mjs
 *   node scripts/build-worksheets.mjs --numbers-only
 *   node scripts/build-worksheets.mjs --only arabic-language-day[,another-pack]
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
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import QRCode from "qrcode";

import { letterGuide } from "../lib/letterGuide.ts";
import { coloringShapes as SHAPES } from "../lib/coloringShapes.ts";
import {
  numbersData, numbers11to20Data, colorsData, animalsData, harakatData, tanweenData,
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
  "arabic-letters-harakat": {
    url: `${SITE}/en/learn/arabic-alphabet-guide`,
    captionEn: "Hear the letters:",
    captionAr: "استمع للحروف:",
  },
  "arabic-alphabet-flashcards": {
    url: `${SITE}/en/play`,
    captionEn: "Hear each letter:",
    captionAr: "اسمع كلّ حرف:",
  },
  "arabic-4-line-copybook": {
    url: `${SITE}/en/printables/letters/alef`,
    captionEn: "One letter per page:",
    captionAr: "حرف في كلّ صفحة:",
  },
  "arabic-handwriting-beginners": {
    url: `${SITE}/en/learn/teaching-arabic-non-speakers`,
    captionEn: "Learning alongside a child?",
    captionAr: "تتعلّم مع طفلك؟",
  },
  "arabic-tanween": {
    url: `${SITE}/en/printables/arabic-harakat`,
    captionEn: "More vowel sheets:",
    captionAr: "أوراق الحركات:",
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
  "arabic-language-day": {
    url: `${SITE}/en/learn/arabic-language-day`,
    captionEn: "10 activities:",
    captionAr: "عشرة أنشطة:",
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
function buildNumbersPack(numberItems, kicker, qr) {
  const sheets = numberItems.map((number, index) => {
    const count = Number(number.en);
    const dots = Array.from({ length: count }, () =>
      '<span style="width:10mm;height:10mm;border:2px solid #b8b8b8;border-radius:50%;"></span>',
    ).join("");
    return sheet(`
      ${head(kicker)}
      <div class="title">
        <h1>${esc(number.enName)}</h1>
        <span class="arname ar" dir="rtl">${esc(number.arName)}</span>
        <span class="sub">${esc(number.translit)}</span>
      </div>
      <div class="instruction">
        Colour ${count} circle${count === 1 ? "" : "s"}, say the Arabic name, then practise writing.
        <span class="rtl ar">لوّن ${count} من الدوائر، وانطق اسم العدد بالعربية، ثم تدرّب على الكتابة.</span>
      </div>
      <div class="body">
        <div style="display:flex;gap:5mm;margin-top:4mm;height:62mm;">
          <div class="box" style="width:56mm;display:flex;align-items:center;justify-content:center;">
            <span dir="ltr" style="font-size:100pt;line-height:1;">${esc(number.en)}</span>
          </div>
          <div class="box" style="flex:1;display:flex;align-items:center;justify-content:center;padding:4mm;">
            <div style="display:grid;grid-template-columns:repeat(5,10mm);gap:3mm;">${dots}</div>
          </div>
        </div>
        ${sectionLabel("Trace the number", "تتبّع الرقم")}
        ${traceRow(number.en, { n: 5, size: "40pt", solid: 2, hollow: 2, height: "24mm", grow: true })}
        ${sectionLabel("Write the number", "اكتب الرقم")}
        ${traceRow(number.en, { n: 5, size: "36pt", solid: 1, hollow: 0, height: "22mm", grow: true })}
        ${sectionLabel("Trace the Arabic name", "تتبّع الاسم العربي")}
        ${wordLine(number.arName, { size: "24pt", height: "22mm" })}
        ${sectionLabel(`Draw ${count} thing${count === 1 ? "" : "s"} you can count`, "ارسم أشياء بالعدد نفسه")}
        <div class="box grow" style="min-height:34mm;"></div>
      </div>
      ${foot(index + 1, numberItems.length, qr)}
    `);
  }).join("");
  return doc(`${kicker} Tracing Worksheets`, sheets);
}

// ---------------------------------------------------------------------------
// Set 3b — harakat (short vowels)
// ---------------------------------------------------------------------------

function harakatSheet(item, i, total, qr, kicker = "Arabic Harakat — Short Vowels") {
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
    ${head(kicker)}
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

function buildTanween(qr) {
  const total = tanweenData.length;
  return doc(
    "Arabic Tanween Worksheets",
    tanweenData.map((item, i) => harakatSheet(item, i, total, qr, "Arabic Tanween")).join(""),
  );
}

// ---------------------------------------------------------------------------
// Set 3c — every letter with fatha, kasra, damma and sukoon
// ---------------------------------------------------------------------------

/** Plain consonant romanisation for the syllable labels (ba, bi, bu, b). */
const CONSONANT = {
  "ا": "ʾ", "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "ḥ", "خ": "kh", "د": "d",
  "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "ṣ", "ض": "ḍ", "ط": "ṭ",
  "ظ": "ẓ", "ع": "ʿ", "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m",
  "ن": "n", "ه": "h", "و": "w", "ي": "y",
};

const VOWELS = [
  { mark: "\u064E", en: "Fatha", ar: "فتحة", v: "a" },
  { mark: "\u0650", en: "Kasra", ar: "كسرة", v: "i" },
  { mark: "\u064F", en: "Damma", ar: "ضمة", v: "u" },
  { mark: "\u0652", en: "Sukoon", ar: "سكون", v: "" },
];

/** Alif cannot carry a vowel itself; with harakat it is written as hamza. */
function seat(ch, vowel) {
  if (ch !== "ا") return ch;
  return vowel.v === "i" ? "إ" : "أ";
}

function harakatGrid(entries, { hollow }) {
  const headCells = VOWELS
    .map((v) => `<div style="text-align:center;"><div class="label">${esc(v.en)}</div><div class="label ar" dir="rtl" style="font-weight:600;">${esc(v.ar)}</div></div>`)
    .join("");
  const rows = entries
    .map((e) => {
      const cells = VOWELS
        .map((v) => {
          const syllable = seat(e.ar, v) + v.mark;
          return `<div class="box" style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <span class="ar ${hollow ? "g-hollow" : ""}" style="font-size:${hollow ? "26pt" : "24pt"};line-height:1.1;">${esc(syllable)}</span>
            ${hollow ? "" : `<span style="font-size:7.5pt;color:#777;">${esc(CONSONANT[e.ar] + v.v)}</span>`}
          </div>`;
        })
        .join("");
      return `<div style="display:grid;grid-template-columns:24mm repeat(4,1fr);gap:2mm;flex:1;min-height:0;">
        <div style="display:flex;flex-direction:column;justify-content:center;">
          <span class="ar" style="font-size:18pt;line-height:1;">${esc(e.ar)}</span>
          <span style="font-size:7.5pt;color:#777;">${esc(e.enName)}</span>
        </div>
        ${cells}
      </div>`;
    })
    .join("");
  return `<div style="display:grid;grid-template-columns:24mm repeat(4,1fr);gap:2mm;margin-top:4mm;"><div></div>${headCells}</div>
    <div class="grow" style="display:flex;flex-direction:column;gap:2mm;margin-top:2mm;">${rows}</div>`;
}

function buildLettersHarakat(qr) {
  const halves = [letterGuide.slice(0, 14), letterGuide.slice(14)];
  const total = 4;
  const chart = halves.map((part, i) => sheet(`
    ${head("Letters with Harakat")}
    <div class="title"><h1>Read the letters with harakat</h1><span class="arname ar" dir="rtl">الحروف بالحركات</span><span class="sub">letters ${i * 14 + 1}–${i * 14 + part.length}</span></div>
    <div class="instruction">
      Read each row aloud from right to left: ba, bi, bu, b. The small mark above or below the letter tells you the sound.
      <span class="rtl ar">اقرأ كلّ صفّ بصوت عالٍ: بَ، بِ، بُ، بْ. الحركة الصغيرة فوق الحرف أو تحته تخبرك بصوته.</span>
    </div>
    <div class="body">${harakatGrid(part, { hollow: false })}</div>
    ${foot(i + 1, total, qr)}
  `));
  const trace = halves.map((part, i) => sheet(`
    ${head("Letters with Harakat")}
    <div class="title"><h1>Trace the letters with harakat</h1><span class="arname ar" dir="rtl">تتبّع الحروف بالحركات</span><span class="sub">letters ${i * 14 + 1}–${i * 14 + part.length}</span></div>
    <div class="instruction">
      Trace each letter and its mark, saying the sound as you go.
      <span class="rtl ar">تتبّع كلّ حرف وحركته، وانطق الصوت وأنت تكتب.</span>
    </div>
    <div class="body">${harakatGrid(part, { hollow: true })}</div>
    ${foot(i + 3, total, qr)}
  `));
  return doc("Arabic Letters with Harakat — Chart and Tracing", [...chart, ...trace].join(""));
}

// ---------------------------------------------------------------------------
// Set 3d — alphabet flashcards, 8 cut-out cards per page
// ---------------------------------------------------------------------------

function buildFlashcards(qr) {
  const perPage = 8;
  const pages = [];
  for (let start = 0; start < letterGuide.length; start += perPage) {
    const chunk = letterGuide.slice(start, start + perPage);
    const cards = chunk
      .map((e) => {
        const ex = e.examples[0];
        return `<div style="border:1.5px dashed #9a9a9a;border-radius:3mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2.5mm;min-height:0;overflow:hidden;">
          <div class="ar" style="font-size:48pt;line-height:1.25;">${esc(e.ar)}</div>
          <div class="ar" dir="rtl" style="font-size:12pt;font-weight:700;margin-top:1mm;">${esc(e.arName)}</div>
          <div style="font-size:9pt;color:#666;">${esc(e.enName)} · ${esc(e.translit)}</div>
          <div style="margin-top:2.5mm;display:flex;align-items:center;gap:2mm;">
            <span style="font-size:18pt;line-height:1;">${ex.emoji}</span>
            <span class="ar" dir="rtl" style="font-size:15pt;">${esc(ex.word)}</span>
          </div>
          <div style="font-size:8pt;color:#777;">${esc(ex.translit)} — ${esc(ex.meaningEn)}</div>
        </div>`;
      })
      .join("");
    // The last page has room left over: blank cards for the child's own words.
    const blanks = Array.from({ length: perPage - chunk.length }, () =>
      `<div style="border:1.5px dashed #9a9a9a;border-radius:3mm;display:flex;align-items:flex-end;justify-content:center;padding:3mm;font-size:8pt;color:#999;">Make your own card · <span class="ar">اصنع بطاقتك</span></div>`,
    ).join("");
    pages.push(sheet(`
      ${head("Arabic Alphabet Flashcards")}
      <div class="title"><h1>Alphabet flashcards</h1><span class="arname ar" dir="rtl">بطاقات الحروف</span><span class="sub">cards ${start + 1}–${start + chunk.length} of 28</span></div>
      <div class="instruction">
        Print on card or thick paper and cut along the dashed lines. Hold up a card, say the sound, find something that starts with it.
        <span class="rtl ar">اطبعها على ورق مقوّى وقصّها على الخطوط المتقطّعة. ارفع بطاقة، وانطق الصوت، وابحث عن شيء يبدأ به.</span>
      </div>
      <div class="body">
        <div class="grow" dir="rtl" style="margin-top:4mm;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,minmax(0,1fr));gap:3mm;">${cards}${blanks}</div>
      </div>
      ${foot(pages.length + 1, Math.ceil(letterGuide.length / perPage), qr)}
    `));
  }
  return doc("Arabic Alphabet Flashcards", pages.join(""));
}

// ---------------------------------------------------------------------------
// Set 3e — 4-line copybook ("4 line copy"), the ruled format South Asian
// schools use: letters sit on the red baseline, tall letters reach the top
// line, and tails drop to the bottom one.
// ---------------------------------------------------------------------------

/**
 * One 4-line row as SVG, so glyphs sit on a true alphabetic baseline. `slots`
 * are placed right to left, `step` viewBox units apart; solid ones are models,
 * the rest hollow outlines to trace. Whatever is left of the row is free space.
 */
function ruledRow(slots, { height = 21, step = 100, fontSize = 66, inset = 50 } = {}) {
  // viewBox in the row's real proportions (186 mm wide on A4), so the letters
  // are never stretched.
  const H = 100, W = Math.round((186 / height) * H);
  const lines = [
    { y: 14, stroke: "#bdbdbd", dash: "" },
    { y: 40, stroke: "#d0d0d0", dash: "6 6" },
    { y: 68, stroke: "#e06060", dash: "" },
    { y: 90, stroke: "#bdbdbd", dash: "" },
  ]
    .map((l) => `<line x1="0" x2="${W}" y1="${l.y}" y2="${l.y}" stroke="${l.stroke}" stroke-width="1.2" ${l.dash ? `stroke-dasharray="${l.dash}"` : ""}/>`)
    .join("");
  const texts = slots.map((slot, i) => `<text x="${W - inset - i * step}" y="68" text-anchor="middle" dominant-baseline="alphabetic"
      font-family="'Noto Naskh Arabic',serif" font-size="${fontSize}"
      fill="${slot.solid ? "#2b2b2b" : "none"}" stroke="${slot.solid ? "none" : "#b5b5b5"}" stroke-width="1.3">${esc(slot.text)}</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${height}mm" style="display:block;">${lines}${texts.join("")}</svg>`;
}

/** A model plus `traces` hollow copies of one glyph, or an empty row. */
function fourLineRow(glyph, { model = true, traces = 3, height = 21 } = {}) {
  const slots = glyph
    ? Array.from({ length: (model ? 1 : 0) + traces }, (_, i) => ({ text: glyph, solid: model && i === 0 }))
    : [];
  return ruledRow(slots, { height });
}

function buildFourLineCopybook(qr) {
  const perPage = 4;
  const total = Math.ceil(letterGuide.length / perPage) + 1;
  const pages = [];
  for (let start = 0; start < letterGuide.length; start += perPage) {
    const chunk = letterGuide.slice(start, start + perPage);
    const rows = chunk
      .map((e) => `<div>
        <div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#555;margin:2.5mm 0 1mm;">
          <span>${esc(e.enName)} · ${esc(e.translit)}</span><span class="ar" dir="rtl" style="font-weight:700;">${esc(e.arName)} ${esc(e.ar)}</span>
        </div>
        ${fourLineRow(e.ar, { model: true, traces: 3 })}
        ${fourLineRow("", { model: false, traces: 0 })}
      </div>`)
      .join("");
    pages.push(sheet(`
      ${head("Arabic 4-Line Copybook")}
      <div class="title"><h1>4-line copybook</h1><span class="arname ar" dir="rtl">كرّاسة الأسطر الأربعة</span><span class="sub">letters ${start + 1}–${start + chunk.length}</span></div>
      <div class="instruction">
        Sit each letter on the red line. Tall letters (ا ل ك ط) reach the top line; tails (ر و ي ن ع) drop towards the bottom line. Trace the grey letters, then fill the empty line.
        <span class="rtl ar">أجلس كلّ حرف على السطر الأحمر. الحروف الطويلة (ا ل ك ط) تصل إلى السطر العلويّ، والذيول (ر و ي ن ع) تنزل نحو السطر السفليّ. تتبّع الحروف الرمادية، ثمّ املأ السطر الفارغ.</span>
      </div>
      <div class="body">${rows}</div>
      ${foot(pages.length + 1, total, qr)}
    `));
  }
  const blankRows = Array.from({ length: 8 }, () => `<div style="margin-top:3mm;">${fourLineRow("", { model: false, traces: 0 })}</div>`).join("");
  pages.push(sheet(`
    ${head("Arabic 4-Line Copybook")}
    <div class="title"><h1>Blank 4-line page</h1><span class="arname ar" dir="rtl">صفحة أسطر أربعة فارغة</span></div>
    <div class="instruction">
      Print as many as you need for words, names and dictation.
      <span class="rtl ar">اطبع منها ما تحتاج للكلمات والأسماء والإملاء.</span>
    </div>
    <div class="body">${blankRows}</div>
    ${foot(total, total, qr)}
  `));
  return doc("Arabic 4-Line Copybook", pages.join(""));
}

// ---------------------------------------------------------------------------
// Set 3f — handwriting workbook for teens and adult beginners. Plain, grown-up
// layout: how the script works, every letter in its four forms on 4-line
// ruling, then joining practice with everyday words.
// ---------------------------------------------------------------------------

const BEGINNER_WORDS = [
  { ar: "سلام", translit: "salaam", en: "peace / hello" },
  { ar: "شكرا", translit: "shukran", en: "thank you" },
  { ar: "مرحبا", translit: "marhaban", en: "welcome" },
  { ar: "كتاب", translit: "kitaab", en: "book" },
  { ar: "قلم", translit: "qalam", en: "pen" },
  { ar: "باب", translit: "baab", en: "door" },
  { ar: "بيت", translit: "bayt", en: "house" },
  { ar: "ماء", translit: "maa'", en: "water" },
  { ar: "نور", translit: "nuur", en: "light" },
  { ar: "شمس", translit: "shams", en: "sun" },
  { ar: "قمر", translit: "qamar", en: "moon" },
  { ar: "عربي", translit: "ʿarabi", en: "Arabic" },
];

function buildBeginnerHandwriting(qr) {
  const letterPages = Math.ceil(letterGuide.length / 4);
  const wordPages = Math.ceil(BEGINNER_WORDS.length / 6);
  const total = 1 + letterPages + wordPages;
  const kicker = "Arabic Handwriting for Beginners";
  const pages = [];

  const rules = [
    { en: "Right to left. Start every line at the right margin; words and letters run leftwards.", ar: "من اليمين إلى اليسار: ابدأ كلّ سطر من الهامش الأيمن." },
    { en: "Letters join. Most letters connect to the next one, so each has up to four forms: alone, start, middle and end.", ar: "الحروف تتّصل: يتّصل أكثرها بما بعده، فلكلّ حرف حتى أربعة أشكال: منفرد وأوّل ووسط وآخر." },
    { en: "Six letters never join to the left: ا د ذ ر ز و. After them the next letter starts fresh, in its start form.", ar: "ستّة حروف لا تتّصل بما بعدها: ا د ذ ر ز و، فيبدأ الحرف التالي بشكله الأوّل." },
    { en: "Sit on the red line. Letter bodies rest on the baseline; tall strokes (ا ل ك ط) rise to the top line, tails (ر و ي ن ع) drop below it.", ar: "اجلس على السطر الأحمر: أجسام الحروف على السطر، والخطوط الطويلة (ا ل ك ط) ترتفع، والذيول (ر و ي ن ع) تنزل تحته." },
    { en: "Body first, dots last. Write the whole word's shape, then add the dots and any marks — the way Arabic hands write naturally.", ar: "الجسم أوّلاً والنقاط أخيراً: اكتب شكل الكلمة كلّه ثمّ ضع النقاط والعلامات." },
    { en: "Hold the pen loosely, and move from the wrist, not the fingers. Slow and even beats fast and neat-looking.", ar: "أمسك القلم برفق، وحرّكه من الرسغ لا من الأصابع. البطء والانتظام خير من السرعة." },
  ];
  pages.push(sheet(`
    ${head(kicker)}
    <div class="title"><h1>How Arabic handwriting works</h1><span class="arname ar" dir="rtl">كيف تُكتب العربية</span></div>
    <div class="instruction">Six rules cover almost everything a beginner gets wrong. Read them once, then keep this page beside you for the letter pages.
      <span class="rtl ar">ستّ قواعد تغطّي أكثر أخطاء المبتدئين. اقرأها مرّة، واحتفظ بالصفحة بجانبك وأنت تكتب.</span></div>
    <div class="body">
      <ol style="margin:5mm 0 0;padding-inline-start:6mm;display:flex;flex-direction:column;gap:3.5mm;">
        ${rules.map((r) => `<li style="font-size:10.5pt;line-height:1.5;">${esc(r.en)}<div class="ar" dir="rtl" style="font-size:11pt;color:#555;">${esc(r.ar)}</div></li>`).join("")}
      </ol>
      ${sectionLabel("One letter, four forms: ه", "حرف واحد بأربعة أشكال: ه")}
      ${ruledRow(letterForms("ه").map((f) => ({ text: f.glyph, solid: true })), { height: 22, step: 140, inset: 90 })}
      ${sectionLabel("Practise the six non-joiners", "تدرّب على الحروف الستّة التي لا تتّصل بما بعدها")}
      ${ruledRow(["ا", "د", "ذ", "ر", "ز", "و"].map((t) => ({ text: t, solid: false })), { height: 22, step: 130, inset: 80 })}
    </div>
    ${foot(1, total, qr)}
  `));

  for (let start = 0; start < letterGuide.length; start += 4) {
    const chunk = letterGuide.slice(start, start + 4);
    const blocks = chunk
      .map((e) => {
        const forms = letterForms(e.ar);
        const joinsNote = RIGHT_JOINING_ONLY.has(e.ar) ? "joins on the right only" : "joins both sides";
        const slots = [...forms.map((f) => ({ text: f.glyph, solid: true })), ...forms.map((f) => ({ text: f.glyph, solid: false }))];
        return `<div>
          <div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#555;margin:3mm 0 1mm;">
            <span><b>${esc(e.enName)}</b> · ${esc(e.translit)} · alone, start, middle, end · ${joinsNote}</span>
            <span class="ar" dir="rtl" style="font-weight:700;">${esc(e.arName)} ${esc(e.ar)}</span>
          </div>
          ${ruledRow(slots, { height: 19, step: 108, fontSize: 60, inset: 50 })}
          ${ruledRow([], { height: 19 })}
        </div>`;
      })
      .join("");
    pages.push(sheet(`
      ${head(kicker)}
      <div class="title"><h1>The letters in their four forms</h1><span class="arname ar" dir="rtl">الحروف بأشكالها الأربعة</span><span class="sub">letters ${start + 1}–${start + chunk.length}</span></div>
      <div class="instruction">Read each row right to left: alone, start, middle, end — then trace the grey set and write all four forms on the empty line.
        <span class="rtl ar">اقرأ كلّ صفّ من اليمين: منفرد، أوّل، وسط، آخر — ثمّ تتبّع الأشكال الرمادية واكتب الأربعة على السطر الفارغ.</span></div>
      <div class="body">${blocks}</div>
      ${foot(pages.length + 1, total, qr)}
    `));
  }

  for (let start = 0; start < BEGINNER_WORDS.length; start += 6) {
    const chunk = BEGINNER_WORDS.slice(start, start + 6);
    const rows = chunk
      .map((w) => `<div>
        <div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#555;margin:3mm 0 1mm;">
          <span><b>${esc(w.translit)}</b> — ${esc(w.en)}</span><span class="ar" dir="rtl" style="font-weight:700;">${esc(w.ar)}</span>
        </div>
        ${ruledRow([{ text: w.ar, solid: true }, { text: w.ar, solid: false }, { text: w.ar, solid: false }], { height: 21, step: 190, fontSize: 54, inset: 95 })}
      </div>`)
      .join("");
    pages.push(sheet(`
      ${head(kicker)}
      <div class="title"><h1>Joining letters into words</h1><span class="arname ar" dir="rtl">وصل الحروف كلمات</span></div>
      <div class="instruction">Write each word without lifting the pen inside it, except after a non-joiner (ا د ذ ر ز و). Add the dots at the end. Copy the model, trace twice, then write it on your own to the left.
        <span class="rtl ar">اكتب الكلمة دون رفع القلم إلّا بعد حرف لا يتّصل بما بعده (ا د ذ ر ز و)، وضع النقاط في الآخر. انسخ النموذج وتتبّعه مرّتين ثمّ اكتبه وحدك إلى اليسار.</span></div>
      <div class="body">${rows}</div>
      ${foot(pages.length + 1, total, qr)}
    `));
  }

  return doc("Arabic Handwriting for Beginners — Workbook", pages.join(""));
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
// Arabic Language Day (18 December) — certificate, poster, name & letter hunt,
// words & facts. A seasonal pack: schools look for it every December.
// ---------------------------------------------------------------------------

/** Outlined text to colour in, the multi-letter cousin of bubbleLetter(). */
function bubbleText(text, { width = 640, height = 330, fontSize = 150, stroke = 2.6 } = {}) {
  // Tall viewBox with the text centred: Naskh puts dots and kasra well below
  // the baseline, and a tight box clips them off the letters.
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height * 0.6}" role="img" aria-label="${esc(text)}">
    <text x="${width / 2}" y="${height * 0.45}" text-anchor="middle" dominant-baseline="middle" direction="rtl"
      font-family="'Noto Naskh Arabic','Noto Sans Arabic',serif" font-weight="700"
      font-size="${fontSize}" fill="none" stroke="#3a3a3a" stroke-width="${stroke}"
      stroke-linejoin="round">${esc(text)}</text>
  </svg>`;
}

const LANGUAGE_DAY_FACTS = [
  { en: "Arabic has 28 letters.", ar: "للعربية 28 حرفاً." },
  { en: "Arabic is written from right to left.", ar: "تُكتب العربية من اليمين إلى اليسار." },
  { en: "Most Arabic letters join the letter next to them.", ar: "تتّصل أكثر الحروف العربية بما يجاورها." },
  { en: "Arabic is one of the six official languages of the United Nations.", ar: "العربية إحدى اللغات الرسمية الستّ في الأمم المتحدة." },
];

const LANGUAGE_DAY_WORDS = [
  { ar: "لُغَة", translit: "lugha", en: "language" },
  { ar: "مَرْحَبًا", translit: "marhaban", en: "hello" },
  { ar: "شُكْرًا", translit: "shukran", en: "thank you" },
];

/** A fixed letter grid for the hunt: 10 of the 48 cells are ب. */
const HUNT_GRID = "بتثنيبثتيبنثنتبيتثنبيثبتينثنبتيتثبنيثتبينثنتبيتث";
if ([...HUNT_GRID].length !== 48 || [...HUNT_GRID].filter((c) => c === "ب").length !== 10) throw new Error("HUNT_GRID must be 48 cells with 10 ب");

function buildLanguageDay(qr) {
  const total = 4;
  const kicker = "Arabic Language Day";

  const certificate = sheet(`
    <div style="flex:1;display:flex;flex-direction:column;border:3px solid #1b1b1b;border-radius:5mm;padding:4mm;">
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;border:1.5px dashed #9a9a9a;border-radius:3.5mm;padding:12mm 10mm;">
        <div style="display:flex;gap:10mm;">${outline("star", 70, 3)}${outline("star", 90, 3)}${outline("star", 70, 3)}</div>
        <div class="label" style="margin-top:6mm;font-size:10pt;">Certificate · شهادة</div>
        <h1 style="margin:3mm 0 0;font-size:26pt;font-weight:800;">World Arabic Language Day</h1>
        <div class="ar" dir="rtl" style="font-size:24pt;font-weight:700;margin-top:2mm;">اليوم العالمي للغة العربية</div>
        <div style="font-size:12pt;color:#555;margin-top:2mm;">18 December · <span class="ar">18 ديسمبر</span></div>

        <div style="margin-top:14mm;font-size:12pt;color:#444;">This certificate is proudly given to</div>
        <div class="ar" dir="rtl" style="font-size:13pt;color:#444;">تُمنح هذه الشهادة بكلّ فخر إلى</div>
        <div style="width:80%;height:18mm;border-bottom:2px solid #1b1b1b;"></div>

        <div style="margin-top:10mm;font-size:12pt;color:#444;line-height:1.5;">
          for celebrating Arabic Language Day and writing their name in Arabic:
          <div class="ar" dir="rtl">لاحتفاله باليوم العالمي للغة العربية وكتابة اسمه بالعربية:</div>
        </div>
        <div class="box" style="width:80%;height:26mm;margin-top:4mm;"></div>

        <div style="margin-top:auto;width:100%;display:flex;justify-content:space-between;gap:12mm;font-size:10pt;color:#555;">
          <div style="flex:1;border-top:1.5px solid #1b1b1b;padding-top:2mm;">Signed · <span class="ar">التوقيع</span></div>
          <div style="flex:1;border-top:1.5px solid #1b1b1b;padding-top:2mm;">Date · <span class="ar">التاريخ</span></div>
        </div>
      </div>
    </div>
    ${foot(1, total, qr)}
  `);

  const poster = sheet(`
    ${head(kicker)}
    <div class="title"><h1>I love Arabic</h1><span class="arname ar" dir="rtl">أُحِبُّ العَرَبِيَّة</span></div>
    <div class="instruction">
      Colour the big words, then decorate the stars. Hang your poster up on 18 December.
      <span class="rtl ar">لوّن الكلمات الكبيرة، ثم زيّن النجوم. علّق ملصقك يوم 18 ديسمبر.</span>
    </div>
    <div class="body">
      <div class="box grow" style="margin-top:4mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm;padding:4mm;">
        <div style="display:flex;gap:16mm;">${outline("star", 80, 2.6)}${outline("crescent", 80, 2.6)}${outline("star", 80, 2.6)}</div>
        ${bubbleText("أُحِبُّ", { fontSize: 170 })}
        ${bubbleText("العَرَبِيَّة", { fontSize: 170 })}
        <div style="display:flex;gap:16mm;">${outline("heart", 80, 2.6)}${outline("star", 80, 2.6)}${outline("heart", 80, 2.6)}</div>
      </div>
      ${sectionLabel("Trace: I love Arabic", "تتبّع: أحبّ العربية")}
      ${wordLine("أحبّ العربية", { size: "26pt", height: "22mm" })}
    </div>
    ${foot(2, total, qr)}
  `);

  const cells = [...HUNT_GRID]
    .map((ch) => `<div class="ar" style="display:flex;align-items:center;justify-content:center;font-size:24pt;border:1px solid #e2e2e2;border-radius:2mm;">${esc(ch)}</div>`)
    .join("");
  const nameAndHunt = sheet(`
    ${head(kicker)}
    <div class="title"><h1>My name in Arabic</h1><span class="arname ar" dir="rtl">اسمي بالعربية</span></div>
    <div class="instruction">
      Ask a grown-up to write your name in Arabic in the first box. Trace it, then write it on your own.
      <span class="rtl ar">اطلب من شخص كبير أن يكتب اسمك بالعربية في المربّع الأول. تتبّعه، ثم اكتبه وحدك.</span>
    </div>
    <div class="body">
      ${sectionLabel("A grown-up writes it", "يكتبه شخص كبير")}
      <div class="box" style="height:26mm;"></div>
      ${sectionLabel("I trace it", "أتتبّعه")}
      <div class="box" style="height:22mm;"></div>
      ${sectionLabel("I write it on my own", "أكتبه وحدي")}
      <div class="box" style="height:22mm;"></div>

      ${sectionLabel("Letter hunt: circle every ب (ba)", "ابحث عن الحرف: ضع دائرة حول كلّ ب")}
      <div class="grow" dir="rtl" style="display:grid;grid-template-columns:repeat(8,1fr);grid-auto-rows:1fr;gap:2mm;min-height:60mm;">${cells}</div>
      <div style="margin-top:3mm;font-size:10pt;color:#444;display:flex;justify-content:space-between;">
        <span>How many did you find? ______</span><span class="ar" dir="rtl">كم باءً وجدت؟ ______</span>
      </div>
    </div>
    ${foot(3, total, qr)}
  `);

  const facts = LANGUAGE_DAY_FACTS
    .map((f) => `<div class="box" style="padding:3mm 4mm;">
      <div style="font-size:10.5pt;font-weight:700;">${esc(f.en)}</div>
      <div class="ar" dir="rtl" style="font-size:12pt;margin-top:1mm;">${esc(f.ar)}</div>
    </div>`)
    .join("");
  const words = LANGUAGE_DAY_WORDS
    .map((w) => `<div style="margin-bottom:2.5mm;">
      <div style="font-size:8.5pt;color:#555;margin-bottom:1mm;"><b class="ar" dir="rtl">${esc(w.ar)}</b> — ${esc(w.translit)} — ${esc(w.en)}</div>
      ${wordLine(w.ar, { size: "22pt", height: "17mm" })}
    </div>`)
    .join("");
  const wordsAndFacts = sheet(`
    ${head(kicker)}
    <div class="title"><h1>Arabic words &amp; facts</h1><span class="arname ar" dir="rtl">كلمات ومعلومات عن العربية</span></div>
    <div class="instruction">
      Read the facts together, trace three Arabic words, then draw your favourite Arabic word.
      <span class="rtl ar">اقرأوا المعلومات معاً، وتتبّعوا ثلاث كلمات عربية، ثم ارسم كلمتك العربية المفضّلة.</span>
    </div>
    <div class="body">
      ${sectionLabel("Did you know?", "هل تعلم؟")}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3mm;">${facts}</div>
      ${sectionLabel("Trace the words", "تتبّع الكلمات")}
      ${words}
      ${sectionLabel("My favourite Arabic word — draw it and write it", "كلمتي العربية المفضّلة — ارسمها واكتبها")}
      <div class="box grow" style="min-height:40mm;"></div>
      <div class="rule" style="height:12mm;"></div>
    </div>
    ${foot(4, total, qr)}
  `);

  return doc("Arabic Language Day Pack — 18 December", certificate + poster + nameAndHunt + wordsAndFacts);
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
  { id: "arabic-letters-harakat", html: buildLettersHarakat },
  { id: "arabic-tanween", html: buildTanween },
  { id: "arabic-alphabet-flashcards", html: buildFlashcards },
  { id: "arabic-4-line-copybook", html: buildFourLineCopybook },
  { id: "arabic-handwriting-beginners", html: buildBeginnerHandwriting },
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
  { id: "arabic-language-day", html: buildLanguageDay },
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
  const numbersOnly = process.argv.includes("--numbers-only");
  const onlyIndex = process.argv.indexOf("--only");
  const onlyIds = onlyIndex > -1 ? process.argv[onlyIndex + 1].split(",") : null;
  for (const id of onlyIds ?? []) {
    if (!SETS.some((s) => s.id === id)) throw new Error(`--only: no pack "${id}"`);
  }
  // A targeted rebuild renders only the named packs (plus the workbook, which
  // contains them) and keeps every other PDF and manifest entry as it is.
  const targeted = onlyIds
    ? new Set(onlyIds)
    : numbersOnly ? new Set(["arabic-numbers-tracing", "arabic-numbers-11-20"]) : null;
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(THUMB_DIR, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), "arabfingers-worksheets-"));
  const manifestPath = join(ROOT, "lib", "worksheet-files.json");
  const manifest = targeted ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

  try {
    const parts = [];
    for (const set of SETS) {
      const html = await set.html(await qrBlock(set.id));
      parts.push(html);
      if (targeted && !targeted.has(set.id)) continue;
      const { bytes } = renderPdf(tmp, set.id, html);
      const thumb = renderThumb(tmp, set.id, html);
      manifest[set.id] = bytes;
      console.log(
        `  ✓ ${set.id}.pdf  (${(bytes / 1024).toFixed(0)} KB, preview ${(thumb / 1024).toFixed(0)} KB)`,
      );
    }

    // The complete workbook is every sheet in teaching order, rendered in one
    // pass, including updated number pages in a targeted rebuild.
    const bodies = parts.map((h) => h.slice(h.indexOf("<body>") + 6, h.lastIndexOf("</body>"))).join("");
    const workbook = doc("Complete Arabic Workbook", bodies);
    const { bytes } = renderPdf(tmp, "arabic-complete-workbook", workbook);
    renderThumb(tmp, "arabic-complete-workbook", workbook);
    manifest["arabic-complete-workbook"] = bytes;
    console.log(`  ✓ arabic-complete-workbook.pdf  (${(bytes / 1024).toFixed(0)} KB)`);

    if (!targeted) {
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
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  // Byte sizes are shown on the download cards, so the page can promise an
  // accurate size before the click. Generated, never hand-edited.
  writeFileSync(
    manifestPath,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );

  console.log(`\nWorksheets written to public/printables/ (manifest: lib/worksheet-files.json)`);
}

await main();
