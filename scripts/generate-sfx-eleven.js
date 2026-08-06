/**
 * ElevenLabs sound-effect generator for the three UI sounds: chime, confetti, smash.
 *
 * These are the only audio files on the site that are not speech. They predate the
 * ElevenLabs work and their levels are all over the place (-4.9, -7.6 and -1.8 dBFS),
 * which is audible when a child triggers two of them in quick succession.
 *
 * Sound effects bill at 40 credits per second of requested duration, so each variant
 * set below costs about 108 credits — cheap enough to generate several and choose by
 * ear, which is the point: you cannot prompt your way to the right sound blind.
 *
 * Usage:
 *   export ELEVEN_API_KEY="..."             # needs Sound Effects: Access on the key
 *   node scripts/generate-sfx-eleven.js --dry-run
 *   node scripts/generate-sfx-eleven.js                    # 3 variants of each
 *   node scripts/generate-sfx-eleven.js --install=chime:2  # promote a variant
 *
 * Variants land in public/sounds/_preview/ (git-ignored). Nothing touches the live
 * files until --install, so listening costs you nothing but credits already spent.
 *
 * Flags:
 *   --dry-run          show the prompts and the credit cost, call nothing
 *   --variants=N       how many takes per sound, default 3
 *   --only=a,b         any of: chime, confetti, smash
 *   --install=NAME:N   copy variant N of NAME over the live file
 *   --renormalise      re-apply the level chain to existing previews, no credits
 *   --self-check       exercise the encode path, no API key needed
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

// ---------------------------------------------------------------- configuration

/**
 * Duration is requested explicitly rather than left to the model: it is what the
 * billing is based on, and a UI sound that outlives the interaction that triggered
 * it feels broken. These match what the current files do, rounded to the 0.5s floor.
 */
const SOUNDS = {
  chime: {
    seconds: 1.0,
    prompt:
      "A short, bright, cheerful two-note ascending chime. Clean bell tone, warm and " +
      "rewarding, the sound of a correct answer in a friendly game for very young " +
      "children. No music bed, no reverb tail, no voice.",
  },
  confetti: {
    seconds: 1.2,
    prompt:
      "A joyful celebration burst: a soft party popper followed by light sparkling " +
      "confetti falling. Playful and warm, not harsh or explosive. For a small child's " +
      "app. No music, no voice.",
  },
  smash: {
    seconds: 0.5,
    prompt:
      "A soft playful cartoon pop with a light bouncy thud, like a friendly bubble " +
      "bursting. Gentle and round, never sharp or startling — a toddler triggers this " +
      "hundreds of times. No music, no voice.",
  },
};

/**
 * Effects are normalised two decibels below the speech target so a chime never
 * competes with the letter it is celebrating. The speech set sits at I=-16.
 */
const TRIM = "silenceremove=start_periods=1:start_duration=0:start_threshold=-50dB:detection=peak";
const LIMIT_DB = -2;
const CEILING = (10 ** (LIMIT_DB / 20)).toFixed(4); // -2 dBFS as linear amplitude
const FILTERS =
  `${TRIM},areverse,${TRIM},areverse,loudnorm=I=-18:TP=${LIMIT_DB}:LRA=9,` +
  `alimiter=limit=${CEILING}:level=disabled`;
const BITRATE = "96k";

/**
 * Re-levelling an existing take must not re-trim it. The trim already ran when the
 * clip was generated, and running it again eats a little more of the decay each
 * pass — on a chime that tail is the ring-out, not silence. Levels alone are
 * idempotent; the trim is not.
 */
const RELEVEL_FILTERS = `loudnorm=I=-18:TP=${LIMIT_DB}:LRA=9,alimiter=limit=${CEILING}:level=disabled`;

// ---------------------------------------------------------------- arg parsing

const argv = process.argv.slice(2);
const flag = (n, d = null) => {
  const hit = argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};
const has = (n) => argv.includes(`--${n}`);

const DRY = has("dry-run");
const VARIANTS = Number(flag("variants", 3));
const INSTALL = flag("install");
const ONLY = (flag("only") || Object.keys(SOUNDS).join(",")).split(",").map((s) => s.trim());

const PUBLIC = path.join(__dirname, "..", "public");
const SOUNDS_DIR = path.join(PUBLIC, "sounds");
const PREVIEW_DIR = path.join(SOUNDS_DIR, "_preview");

// ---------------------------------------------------------------- audio helpers

function probeDuration(file) {
  return parseFloat(execFileSync("ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
}

function encode(src, dest, filters = FILTERS) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-af", filters,
    "-codec:a", "libmp3lame", "-b:a", BITRATE, "-ac", "1", "-f", "mp3", dest]);
}

// ---------------------------------------------------------------- install

function install(spec) {
  const [name, n] = spec.split(":");
  if (!SOUNDS[name]) {
    console.error(`Unknown sound "${name}". Use one of: ${Object.keys(SOUNDS).join(", ")}`);
    process.exit(1);
  }
  const from = path.join(PREVIEW_DIR, `${name}-${n}.mp3`);
  if (!fs.existsSync(from)) {
    const available = fs.existsSync(PREVIEW_DIR)
      ? fs.readdirSync(PREVIEW_DIR).filter((f) => f.startsWith(name)).join(", ") : "none";
    console.error(`No variant at ${from}. Available for ${name}: ${available || "none"}`);
    process.exit(1);
  }
  const to = path.join(SOUNDS_DIR, `${name}.mp3`);
  fs.copyFileSync(from, to);
  console.log(`Installed ${path.basename(from)} -> sounds/${name}.mp3  (${probeDuration(to).toFixed(2)}s)`);
  console.log("Roll back with: git checkout -- public/sounds/" + name + ".mp3");
}

// ---------------------------------------------------------------- self-check

function selfCheck() {
  const rate = 24000, seconds = 0.6;
  const pcm = Buffer.alloc(Math.round(rate * seconds) * 2);
  for (let i = 0; i < Math.round(rate * seconds); i++) {
    pcm.writeInt16LE(Math.round(Math.sin((2 * Math.PI * 880 * i) / rate) * 11000), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(pcm.length + 36, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);

  const tmp = path.join(require("os").tmpdir(), `sfx-selfcheck-${process.pid}`);
  fs.writeFileSync(`${tmp}.wav`, Buffer.concat([h, pcm]));
  encode(`${tmp}.wav`, `${tmp}.mp3.part`);
  const out = probeDuration(`${tmp}.mp3.part`);
  fs.rmSync(`${tmp}.wav`, { force: true });
  fs.rmSync(`${tmp}.mp3.part`, { force: true });

  const ok = Math.abs(out - seconds) < 0.12;
  console.log(`in ${seconds}s -> out ${out.toFixed(3)}s`);
  console.log(ok ? "PASS  trim + normalise + encode preserves the effect"
                 : "FAIL  the filter chain is eating the sound");
  if (!ok) process.exit(1);
}

// ---------------------------------------------------------------- run

async function main() {
  if (has("self-check")) return selfCheck();
  if (INSTALL) return install(INSTALL);

  if (has("renormalise")) {
    if (!fs.existsSync(PREVIEW_DIR)) return console.log("No previews to re-process.");
    for (const f of fs.readdirSync(PREVIEW_DIR).filter((f) => f.endsWith(".mp3"))) {
      const abs = path.join(PREVIEW_DIR, f);
      const before = probeDuration(abs);
      encode(abs, `${abs}.part`, RELEVEL_FILTERS);
      fs.renameSync(`${abs}.part`, abs);
      const after = probeDuration(abs);
      console.log(`  ${f.padEnd(16)} ${after.toFixed(2)}s` +
        (Math.abs(after - before) > 0.02 ? `  (was ${before.toFixed(2)}s)` : ""));
    }
    return console.log("\nRe-processed with the corrected level chain. No credits spent.");
  }

  const chosen = ONLY.filter((n) => SOUNDS[n]);
  if (!chosen.length) {
    console.error(`Nothing to do. Valid sounds: ${Object.keys(SOUNDS).join(", ")}`);
    process.exit(1);
  }

  // Count only what will actually be generated: existing previews are skipped and
  // cost nothing, so including them quotes a price the run will never charge.
  const pending = [];
  for (const name of chosen) {
    for (let v = 1; v <= VARIANTS; v++) {
      if (!fs.existsSync(path.join(PREVIEW_DIR, `${name}-${v}.mp3`))) pending.push(name);
    }
  }
  const cost = pending.reduce((n, k) => n + Math.ceil(SOUNDS[k].seconds * 40), 0);
  const skipped = chosen.length * VARIANTS - pending.length;
  console.log(`Sounds    ${chosen.join(", ")}`);
  console.log(`Variants  ${VARIANTS} each`);
  console.log(`To make   ${pending.length}${skipped ? `, ${skipped} already on disk` : ""}`);
  console.log(`Cost      ~${cost} credits (40 per second of requested duration)`);

  if (DRY) {
    for (const name of chosen) {
      console.log(`\n${name} (${SOUNDS[name].seconds}s)\n  ${SOUNDS[name].prompt}`);
    }
    console.log("\nDry run — nothing was generated.");
    return;
  }

  const API_KEY = process.env.ELEVEN_API_KEY;
  if (!API_KEY) {
    console.error("ELEVEN_API_KEY is not set.");
    process.exit(1);
  }

  fs.mkdirSync(PREVIEW_DIR, { recursive: true });

  for (const name of chosen) {
    const { seconds, prompt } = SOUNDS[name];
    for (let v = 1; v <= VARIANTS; v++) {
      const dest = path.join(PREVIEW_DIR, `${name}-${v}.mp3`);
      if (fs.existsSync(dest)) { console.log(`  ${name}-${v}  skipped (exists)`); continue; }

      let res;
      for (let attempt = 1; attempt <= 5; attempt++) {
        res = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
          method: "POST",
          headers: { "xi-api-key": API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ text: prompt, duration_seconds: seconds, prompt_influence: 0.4 }),
        });
        // "system_busy" is transient and not a quota problem — waiting clears it.
        if (res.status !== 429) break;
        const wait = 5000 * attempt;
        console.log(`  ${name}-${v}  busy, waiting ${wait / 1000}s (attempt ${attempt}/5)`);
        await new Promise((r) => setTimeout(r, wait));
      }

      if (res.status === 401) {
        console.error("\n401 — the key is missing the Sound Effects permission.");
        console.error("Add it in the ElevenLabs key settings and re-run.");
        process.exit(1);
      }
      if (!res.ok) {
        console.error(`  ${name}-${v}  HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        continue;
      }

      const raw = `${dest}.raw`;
      fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
      try {
        encode(raw, `${dest}.part`);
      } finally {
        fs.rmSync(raw, { force: true });
      }
      fs.renameSync(`${dest}.part`, dest);
      console.log(`  ${name}-${v}  ${probeDuration(dest).toFixed(2)}s  ${fs.statSync(dest).size}b`);
    }
  }

  console.log(`\nVariants in public/sounds/_preview/`);
  console.log("Listen, then install the ones you want:");
  for (const name of chosen) console.log(`  node scripts/generate-sfx-eleven.js --install=${name}:1`);
}

main().catch((err) => {
  console.error("Crashed:", err.message);
  process.exit(1);
});
