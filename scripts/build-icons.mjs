// Raster app icons, rendered from scripts/assets/icon-source.png (Gemini artwork,
// cut to a transparent rounded square).
//
// The site once shipped with only an SVG icon. Chrome tolerates that, but iOS/Safari
// ignores SVG icons outright — "Add to Home Screen" on an iPhone was giving a
// screenshot of the page instead of the logo, on a toddler app that parents
// install on phones. Android also wants a maskable variant, or the launcher
// letterboxes the icon inside a white circle.
//
// Re-run with `npm run icons` after replacing that file.

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const source = await readFile(join(root, "scripts/assets/icon-source.png"));

// The artwork's green, so the maskable padding is invisible against it.
const BG = "#2f5f47";

const render = (size) => sharp(source).resize(size, size);

const outputs = [
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  // 180 is what iOS actually asks for via <link rel="apple-touch-icon">. iOS
  // applies its own corner mask and does not honour alpha, so flatten onto BG —
  // left transparent, the artwork's rounded corners come out black on the
  // home screen.
  ["apple-touch-icon.png", 180, true],
];

for (const [name, size, flatten] of outputs) {
  const img = render(size);
  const buf = await (flatten ? img.flatten({ background: BG }) : img).png().toBuffer();
  await writeFile(join(pub, name), buf);
  console.log(`${name.padEnd(24)} ${size}x${size}  ${(buf.length / 1024).toFixed(1)} kB`);
}

// Maskable: Android crops to a circle/squircle and only the inner ~80% is
// guaranteed visible, so inset the artwork and let BG bleed to the edges.
const MASK = 512;
const inner = Math.round(MASK * 0.8);
const pad = Math.round((MASK - inner) / 2);
const maskable = await sharp({
  create: { width: MASK, height: MASK, channels: 4, background: BG },
})
  .composite([{ input: await render(inner).png().toBuffer(), top: pad, left: pad }])
  .png()
  .toBuffer();
await writeFile(join(pub, "icon-maskable-512.png"), maskable);
console.log(`${"icon-maskable-512.png".padEnd(24)} ${MASK}x${MASK}  ${(maskable.length / 1024).toFixed(1)} kB`);
