/**
 * One picture per Arabic letter for image search:
 *   public/images/letters/<slug>-letter-shapes-words.webp  (1200x800)
 *
 *   node scripts/build-letter-images.mjs [--only tha,jeem]
 *
 * Arabic single-letter searches ("ث", "أشكال حرف الجيم", "صور بحرف الجيم") come
 * back mostly as image results, and the letter pages had no image of the
 * letter itself, only the worksheet preview. Each picture shows the letter,
 * its four joined shapes and the picture words from lib/letterWords.ts.
 *
 * Needs Chrome with Noto Naskh Arabic (TTF) and Noto Color Emoji installed as
 * system fonts — same requirement as build-worksheets.mjs.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { letterGuide } from "../lib/letterGuide.ts";
import { letterPositions } from "../lib/letterWords.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "images", "letters");
const W = 1200;
const H = 800;

// Mirrors scripts/build-worksheets.mjs: Chrome shapes a letter into its joined
// form when it sits next to a zero-width joiner.
const ZWJ = "‍";
const RIGHT_JOINING_ONLY = new Set(["ا", "د", "ذ", "ر", "ز", "و"]);
const forms = (ch) => {
  const only = RIGHT_JOINING_ONLY.has(ch);
  return [
    { ar: "منفرد", glyph: ch },
    { ar: "أول", glyph: only ? ch : ch + ZWJ },
    { ar: "وسط", glyph: only ? ZWJ + ch : ZWJ + ch + ZWJ },
    { ar: "آخر", glyph: ZWJ + ch },
  ];
};

// Same slug rule as lib/letterWorksheets.ts.
const slugFor = (entry) => entry.enName.toLowerCase();

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

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function html(entry, index) {
  const pos = letterPositions(entry);
  const row = (label, words) => `
    <div class="row">
      <div class="label">${label}</div>
      <div class="words">${words.slice(0, 3).map((w) => `<div class="word"><span class="emoji">${w.emoji}</span><span>${esc(w.word)}</span></div>`).join("")}</div>
    </div>`;
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; }
    body { width: ${W}px; height: ${H}px; background: #fbf7ef; font-family: "Noto Naskh Arabic", "DejaVu Sans", sans-serif; color: #1f2d3d; padding: 40px 48px; display: flex; flex-direction: column; gap: 22px; }
    .top { display: flex; gap: 36px; align-items: stretch; }
    .big { width: 270px; height: 270px; flex: none; border-radius: 28px; background: #fff; border: 4px solid #1f2d3d; display: flex; align-items: center; justify-content: center; font-size: 190px; line-height: 1; padding-bottom: 30px; }
    .head { flex: 1; display: flex; flex-direction: column; gap: 14px; }
    h1 { font-size: 58px; font-weight: 700; line-height: 1.25; }
    .sub { font-size: 26px; color: #4a5a52; }
    .forms { display: flex; gap: 12px; margin-top: auto; }
    .form { flex: 1; background: #fff; border: 2px solid #d9d3c4; border-radius: 18px; text-align: center; padding: 4px 0 8px; }
    .form b { display: block; font-size: 66px; font-weight: 400; line-height: 1.35; }
    .form small { font-size: 22px; color: #4a5a52; }
    .row { display: flex; align-items: center; gap: 18px; }
    .label { width: 230px; flex: none; font-size: 27px; font-weight: 700; }
    .words { flex: 1; display: flex; gap: 12px; }
    .word { flex: 1; display: flex; align-items: center; gap: 14px; background: #fff; border: 2px solid #e4ddcc; border-radius: 18px; padding: 10px 16px; font-size: 46px; }
    .emoji { font-family: "Noto Color Emoji"; font-size: 44px; }
    .foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 22px; color: #4a5a52; font-family: sans-serif; direction: ltr; }
  </style></head><body>
    <div class="top">
      <div class="big">${entry.ar}</div>
      <div class="head">
        <h1>حرف ال${entry.arName} (${entry.ar}) بأشكاله الأربعة</h1>
        <div class="sub">الحرف ${index + 1} من ${letterGuide.length} · Arabic letter ${entry.enName}</div>
        <div class="forms">${forms(entry.ar).map((f) => `<div class="form"><b>${f.glyph}</b><small>${f.ar}</small></div>`).join("")}</div>
      </div>
    </div>
    ${row(`تبدأ بحرف ال${entry.arName}`, pos.start)}
    ${row("في وسط الكلمة", pos.middle)}
    ${row("في آخر الكلمة", pos.end)}
    <div class="foot"><span>arabfingers.site</span><span>Free worksheet: arabfingers.site/ar/printables/letters/${slugFor(entry)}</span></div>
  </body></html>`;
}

const onlyArg = process.argv.indexOf("--only");
const only = onlyArg > -1 ? new Set(process.argv[onlyArg + 1].split(",")) : null;

mkdirSync(OUT_DIR, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "letter-images-"));
try {
  for (const [i, entry] of letterGuide.entries()) {
    const slug = slugFor(entry);
    if (only && !only.has(slug)) continue;
    const page = join(tmp, `${slug}.html`);
    const png = join(tmp, `${slug}.png`);
    writeFileSync(page, html(entry, i));
    execFileSync(CHROME, ["--headless", "--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1", `--window-size=${W},${H}`, `--screenshot=${png}`, `file://${page}`], { stdio: "ignore" });
    const out = join(OUT_DIR, `${slug}-letter-shapes-words.webp`);
    await sharp(png).webp({ quality: 82 }).toFile(out);
    console.log(`  ${out.replace(ROOT + "/", "")}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
