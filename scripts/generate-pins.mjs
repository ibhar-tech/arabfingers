#!/usr/bin/env node
// Generates 1000x1500 (2:3) Pinterest pins into public/pins/ from the PINS array
// below. Renders an HTML template with headless Chrome — same approach as the
// og-image. Add a pin = add one entry to PINS, then `node scripts/generate-pins.mjs`.
//
// ponytail: chrome screenshot, not a puppeteer dep — google-chrome is already on the box.

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public", "pins");
const TMP = join(ROOT, ".pin-tmp");

const SITE = "arabfingers.site";

// Each pin: file name, the destination path shown on the pin, a headline (one word
// can be wrapped in *stars* to get the teal highlight), a value subline, the letter
// chips along the bottom, an optional big hero glyph, and an accent color.
const PINS = [
  {
    file: "home",
    url: SITE,
    badge: "Free forever · Ages 1–6",
    headline: "Teach your kids the Arabic alphabet by *playing*",
    sub: "All 28 letters · real pronunciation · bilingual · free printables",
    chips: ["ا", "ب", "ت", "ج", "ح"],
    glyph: "ا",
    accent: "#10a39a",
  },
  {
    file: "play",
    url: `${SITE}/en/play`,
    badge: "Free online game",
    headline: "The free Arabic *letters game* for kids",
    sub: "Tap a letter or press a key — hear it, see it, learn it",
    chips: ["ل", "ع", "ب"],
    glyph: "ع",
    accent: "#8b3df5",
  },
  {
    file: "alphabet-guide",
    url: `${SITE}/en/learn/arabic-alphabet-guide`,
    badge: "Complete parent guide",
    headline: "All *28* Arabic letters with pronunciation",
    sub: "Every sound, example words, and the mistakes kids make",
    chips: ["ث", "خ", "ذ", "ض", "ظ"],
    glyph: "ض",
    accent: "#ffb22e",
  },
  {
    file: "colors",
    url: `${SITE}/en/learn/arabic-colors`,
    badge: "Vocabulary for kids",
    headline: "12 *colors* in Arabic for kids",
    sub: "With pronunciation, nature examples & a color-hunt game",
    chips: ["🔴", "🔵", "🟢", "🟡", "🟣"],
    glyph: "🎨",
    accent: "#f4607d",
  },
  {
    file: "first-words",
    url: `${SITE}/en/learn/first-arabic-words`,
    badge: "Vocabulary for kids",
    headline: "25 *first words* every Arabic learner needs",
    sub: "Family, animals, food & everyday words — by theme",
    chips: ["ماما", "بابا", "ماء"],
    glyph: "🧸",
    accent: "#10a39a",
  },
  {
    file: "printables",
    url: `${SITE}/en/printables`,
    badge: "Free printable · PDF",
    headline: "Free Arabic alphabet *tracing* worksheets",
    sub: "Print all 28 letters at home — no signup, just print",
    chips: ["ا", "ب", "ت", "ث"],
    glyph: "✏️",
    accent: "#8b3df5",
  },
  {
    file: "coloring-animals",
    url: `${SITE}/en/printables/arabic-animals-coloring`,
    badge: "Free coloring book · PDF",
    headline: "Arabic *animals* coloring book — 8 pages",
    sub: "Colour the lion, trace أسد — Arabic & English names on every page",
    chips: ["أسد", "أرنب", "فيل"],
    glyph: "🦁",
    accent: "#f4607d",
  },
  {
    file: "coloring-fruits-vegetables",
    url: `${SITE}/en/printables/arabic-fruits-vegetables-coloring`,
    badge: "Free coloring book · PDF",
    headline: "Fruits & vegetables *coloring* book in Arabic",
    sub: "8 pages — colour the apple, trace تفاحة. Print at home, free",
    chips: ["تفاحة", "موز", "عنب"],
    glyph: "🍎",
    accent: "#e07b26",
  },
  {
    file: "coloring-transport",
    url: `${SITE}/en/printables/arabic-transport-coloring`,
    badge: "Free coloring book · PDF",
    headline: "Cars, trains & *planes* — in Arabic",
    sub: "6 vehicles to colour with bilingual name tracing. Free PDF",
    chips: ["سيارة", "قطار", "طائرة"],
    glyph: "🚌",
    accent: "#2f6fd0",
  },
  {
    file: "coloring-solar-system",
    url: `${SITE}/en/printables/arabic-solar-system-coloring`,
    badge: "Free coloring book · PDF",
    headline: "The *solar system* in Arabic — colour it",
    sub: "Sun, moon, Saturn & a rocket — Arabic names to trace. Free",
    chips: ["شمس", "قمر", "زحل"],
    glyph: "🪐",
    accent: "#8b3df5",
  },
  {
    file: "coloring-alphabet",
    url: `${SITE}/en/printables/arabic-alphabet-coloring`,
    badge: "Free coloring book · PDF",
    headline: "28 *bubble letters* to colour — Arabic alphabet",
    sub: "One giant letter per page with example words + tracing. Free",
    chips: ["ا", "ب", "م", "ف"],
    glyph: "ب",
    accent: "#10a39a",
  },
  {
    file: "coloring-ramadan",
    url: `${SITE}/en/printables/arabic-ramadan-coloring`,
    badge: "Free coloring book · PDF",
    headline: "*Ramadan* coloring pages in Arabic — free PDF",
    sub: "Lantern, mosque, crescent & more — with names to trace",
    chips: ["فانوس", "مسجد", "هلال"],
    glyph: "🏮",
    accent: "#b18a3d",
  },
  {
    file: "coloring-sea-animals",
    url: `${SITE}/en/printables/arabic-sea-animals-coloring`,
    badge: "Free coloring book · PDF",
    headline: "Sea *animals* coloring book in Arabic",
    sub: "Whale, octopus, crab, turtle — colour & trace the names",
    chips: ["حوت", "أخطبوط", "سلحفاة"],
    glyph: "🐙",
    accent: "#2f9dd0",
  },
  {
    file: "coloring-body-parts",
    url: `${SITE}/en/printables/arabic-body-parts-coloring`,
    badge: "Free coloring book · PDF",
    headline: "My *body* in Arabic — colour & learn",
    sub: "Head, eye, hand, foot — colour it, trace it, touch it. Free PDF",
    chips: ["رأس", "عين", "يد"],
    glyph: "🖐️",
    accent: "#f4607d",
  },
  {
    file: "coloring-seasons",
    url: `${SITE}/en/printables/arabic-seasons-coloring`,
    badge: "Free coloring book · PDF",
    headline: "The *four seasons* in Arabic — colour the tree",
    sub: "One tree through spring, summer, autumn & winter. Free PDF",
    chips: ["ربيع", "صيف", "خريف", "شتاء"],
    glyph: "🍂",
    accent: "#e07b26",
  },
  {
    file: "coloring-opposites",
    url: `${SITE}/en/printables/arabic-opposites-coloring`,
    badge: "Free coloring book · PDF",
    headline: "Arabic *opposites* — big & small, to colour",
    sub: "5 opposite pairs side by side, both words to trace. Free",
    chips: ["كبير", "صغير"],
    glyph: "🔁",
    accent: "#8b3df5",
  },
  {
    file: "stories",
    url: `${SITE}/en/stories`,
    badge: "Original stories · free PDF",
    headline: "Arabic *bedtime stories* with English translation",
    sub: "Fully vocalised Arabic, scene by scene — read online or print",
    chips: ["🐰", "🏮", "🚀"],
    glyph: "📖",
    accent: "#b18a3d",
  },
];

function highlight(headline, accent) {
  // *word* → teal/accent span
  return headline.replace(/\*([^*]+)\*/g, `<span style="color:${accent}">$1</span>`);
}

function html(pin) {
  const isEmojiChips = /\p{Extended_Pictographic}/u.test(pin.chips.join(""));
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Baloo+Bhaijaan+2:wght@700;800&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1000px;height:1500px;overflow:hidden;position:relative;
    font-family:'Nunito',sans-serif;color:#2a1d4e;
    background:
      radial-gradient(circle at 12% 12%, rgba(255,178,46,.34), transparent 32%),
      radial-gradient(circle at 90% 14%, rgba(139,61,245,.20), transparent 32%),
      radial-gradient(circle at 78% 92%, rgba(16,163,154,.20), transparent 38%),
      linear-gradient(180deg,#fff7ec 0%,#ffe7d4 58%,#ffd9c4 100%);
    padding:70px 64px;display:flex;flex-direction:column}
  .badge{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;background:#fff;
    border:4px solid #2a1d4e;border-radius:999px;padding:12px 26px;font-family:'Baloo 2';
    font-weight:800;font-size:30px;box-shadow:6px 6px 0 0 #2a1d4e}
  h1{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:96px;line-height:1.02;
    letter-spacing:-1.5px;margin:48px 0 28px}
  .sub{font-size:38px;font-weight:700;opacity:.74;line-height:1.28;max-width:840px}
  .hero{flex:1;display:flex;align-items:center;justify-content:center;margin:24px 0}
  .slate{width:520px;height:520px;background:#fff;border:7px solid #2a1d4e;border-radius:56px;
    box-shadow:16px 16px 0 0 ${pin.accent};display:flex;align-items:center;justify-content:center;position:relative}
  .glyph{font-family:'Baloo Bhaijaan 2';font-weight:800;font-size:${pin.glyphEmoji ? "300px" : "380px"};color:#243456;line-height:1}
  .dot{position:absolute;border-radius:50%}
  .d1{width:64px;height:64px;background:#ffb22e;top:60px;right:78px}
  .d2{width:52px;height:52px;background:#10a39a;top:230px;right:40px}
  .d3{width:46px;height:46px;background:#f4607d;bottom:90px;left:54px}
  .chips{display:flex;gap:18px;justify-content:center;margin-bottom:34px;flex-wrap:wrap}
  .chip{min-width:104px;height:104px;padding:0 18px;border:5px solid #2a1d4e;border-radius:26px;
    display:flex;align-items:center;justify-content:center;font-family:${isEmojiChips ? "'Nunito'" : "'Baloo Bhaijaan 2'"};
    font-weight:800;font-size:${isEmojiChips ? "52px" : "56px"};box-shadow:7px 7px 0 0 #2a1d4e}
  .c0{background:#ffe9c7}.c1{background:#d4f3ef}.c2{background:#ffdfe7}.c3{background:#ede0ff}.c4{background:#dbf0d8}
  .brand{display:flex;align-items:center;justify-content:center;gap:16px;font-family:'Baloo 2';font-weight:800;font-size:40px}
  .logo{width:64px;height:64px;border-radius:50%;background:#2a1d4e;color:#ffb22e;
    display:flex;align-items:center;justify-content:center;font-family:'Baloo Bhaijaan 2';font-size:40px}
  .url{text-align:center;font-weight:800;font-size:30px;color:${pin.accent};margin-top:8px}
</style></head><body>
  <span class="badge">✨ ${pin.badge}</span>
  <h1>${highlight(pin.headline, pin.accent)}</h1>
  <div class="sub">${pin.sub}</div>
  <div class="hero">
    <div class="slate">
      <span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span>
      <div class="glyph">${pin.glyph}</div>
    </div>
  </div>
  <div class="chips">
    ${pin.chips.map((c, i) => `<div class="chip c${i % 5}">${c}</div>`).join("")}
  </div>
  <div class="brand"><span class="logo">ا</span> Arab Fingers</div>
  <div class="url">${pin.url}</div>
</body></html>`;
}

function chromeShot(htmlPath, outPath) {
  execFileSync("google-chrome", [
    "--headless=new",
    "--no-sandbox",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1000,1500",
    "--default-background-color=00000000",
    `--screenshot=${outPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(TMP, { recursive: true });
  let ok = 0;
  for (const pin of PINS) {
    const htmlPath = join(TMP, `${pin.file}.html`);
    const rawPath = join(TMP, `${pin.file}.raw.png`);
    const outPath = join(OUT, `${pin.file}.png`);
    writeFileSync(htmlPath, html({ ...pin, glyphEmoji: /\p{Extended_Pictographic}/u.test(pin.glyph) }));
    chromeShot(htmlPath, rawPath);
    // Chrome can emit a slightly off size; normalize to exactly 1000x1500.
    await sharp(rawPath).resize(1000, 1500, { fit: "cover", position: "top" }).png().toFile(outPath);
    const meta = await sharp(outPath).metadata();
    if (meta.width !== 1000 || meta.height !== 1500) {
      throw new Error(`${pin.file}: expected 1000x1500, got ${meta.width}x${meta.height}`);
    }
    ok++;
    console.log(`✓ ${pin.file}.png  (${pin.url})`);
  }
  rmSync(TMP, { recursive: true, force: true });
  console.log(`\nGenerated ${ok}/${PINS.length} pins → public/pins/`);
  if (ok !== PINS.length) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
