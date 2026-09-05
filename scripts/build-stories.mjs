#!/usr/bin/env node
/**
 * Builds the downloadable story PDFs into public/stories/.
 *
 *   node scripts/build-stories.mjs
 *
 * Same approach as scripts/build-worksheets.mjs: render HTML with headless
 * Chrome (the only thing on this machine that shapes Arabic correctly) and
 * print to PDF. The stories themselves are the original bilingual texts in
 * lib/stories.ts — one file per story.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { stories } from "../lib/stories.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "stories");
const SITE = "arabfingers.site";

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

// Same print stylesheet family as the worksheets: A4, ink-friendly, big type.
const CSS = `
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Nunito", "Segoe UI", Arial, sans-serif; color: #26262b; }
  .ar { font-family: "Amiri", "Scheherazade New", "Traditional Arabic", serif; }
  .sheet { page-break-after: always; width: 210mm; height: 297mm; padding: 14mm 16mm;
    display: flex; flex-direction: column; position: relative; }
  .sheet:last-child { page-break-after: auto; }
  .kicker { display: flex; justify-content: space-between; font-size: 8.5pt; letter-spacing: .12em;
    text-transform: uppercase; color: #9a9aa2; border-bottom: 2px solid #efe9df; padding-bottom: 3mm; }
  .kicker .ar { text-transform: none; letter-spacing: 0; }
  .scene { display: flex; flex-direction: column; align-items: center; justify-content: center;
    flex: 1; text-align: center; gap: 8mm; }
  .emoji { font-size: 64pt; line-height: 1; }
  .scene .arline { font-size: 30pt; line-height: 1.9; max-width: 165mm; }
  .scene .translit { font-size: 12pt; color: #8a8a92; font-style: italic; }
  .scene .enline { font-size: 15pt; color: #55555c; max-width: 150mm; }
  .pageno { position: absolute; bottom: 8mm; left: 0; right: 0; text-align: center;
    font-size: 8.5pt; color: #b8b8bf; }
  .cover { justify-content: center; align-items: center; text-align: center; gap: 10mm;
    background: #fdf6ee; }
  .cover .emoji { font-size: 90pt; }
  .cover h1 { font-size: 34pt; line-height: 1.25; }
  .cover .artitle { font-size: 30pt; }
  .cover .ages { font-size: 12pt; color: #8a8a92; }
  .cover .brand { font-size: 10pt; letter-spacing: .18em; text-transform: uppercase; color: #b18a3d; }
  .moralpage { justify-content: center; align-items: center; text-align: center; gap: 10mm;
    background: #fdf6ee; }
  .moralpage .label { font-size: 9pt; letter-spacing: .18em; text-transform: uppercase; color: #b18a3d; }
  .moralpage .en { font-size: 19pt; max-width: 150mm; line-height: 1.6; }
  .moralpage .ar { font-size: 24pt; max-width: 160mm; line-height: 2; }
  .moralpage .cta { font-size: 10pt; color: #8a8a92; border: 1.5px dashed #d8c9a8; border-radius: 6mm;
    padding: 5mm 9mm; }
`;

function sheet(inner, pageNo, total) {
  return `<div class="sheet">${inner}<div class="pageno">${pageNo} / ${total} · arabfingers.site</div></div>`;
}

function storyHtml(story) {
  const total = story.scenes.length + 3; // cover + scenes + moral
  let n = 0;

  const cover = sheet(
    `
    <div class="kicker"><span>Arab Fingers · Original Stories</span>
      <span class="ar" dir="rtl">قَصَصٌ عَرَبِيَّةٌ أَصْلِيَّةٌ</span></div>
    <div class="cover">
      <div class="brand">Arab Fingers Stories</div>
      <div class="emoji">${story.emoji}</div>
      <h1>${esc(story.titleEn)}</h1>
      <h1 class="artitle ar" dir="rtl">${esc(story.titleAr)}</h1>
      <div class="ages">${esc(story.agesEn)} · ${esc(story.agesAr)}</div>
      <div class="cta" style="font-size:10pt;color:#8a8a92;">${esc(story.introEn)}</div>
    </div>
  `,
    ++n,
    total,
  );

  const sceneSheets = story.scenes.map((s) =>
    sheet(
      `
      <div class="kicker"><span>${esc(story.titleEn)}</span>
        <span class="ar" dir="rtl">${esc(story.titleAr)}</span></div>
      <div class="scene">
        <div class="emoji">${s.emoji}</div>
        <div class="arline ar" dir="rtl">${esc(s.ar)}</div>
        <div class="translit">${esc(s.translit)}</div>
        <div class="enline">${esc(s.en)}</div>
      </div>
    `,
      ++n,
      total,
    ),
  );

  const moral = sheet(
    `
    <div class="kicker"><span>${esc(story.titleEn)}</span>
      <span class="ar" dir="rtl">${esc(story.titleAr)}</span></div>
    <div class="moralpage">
      <div class="label">The lesson · الْعِبْرَة</div>
      <div class="en">${esc(story.moralEn)}</div>
      <div class="ar ar" dir="rtl">${esc(story.moralAr)}</div>
      <div class="cta">
        More free stories, worksheets and games — arabfingers.site/stories
      </div>
    </div>
  `,
    ++n,
    total,
  );

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>${CSS}</style></head>
<body>${cover}${sceneSheets.join("")}${moral}</body></html>`;
}

function renderPdf(tmp, slug, html) {
  const htmlPath = join(tmp, `${slug}.html`);
  const pdfPath = join(OUT_DIR, `${slug}.pdf`);
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
      "--virtual-time-budget=10000",
      `file://${htmlPath}`,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  if (!existsSync(pdfPath)) throw new Error(`Chrome produced no PDF for ${slug}`);
  return statSync(pdfPath).size;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const tmp = mkdtempSync(join(tmpdir(), "arabfingers-stories-"));
  try {
    for (const story of stories) {
      const bytes = renderPdf(tmp, story.slug, storyHtml(story));
      console.log(`  ✓ stories/${story.slug}.pdf  (${(bytes / 1024).toFixed(0)} KB)`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  console.log(`\nStories written to public/stories/`);
}

await main();
