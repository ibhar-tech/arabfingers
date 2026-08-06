/**
 * Gemini TTS voiceover generator for Arab Fingers.
 *
 * Regenerates every spoken clip the site ships — 28 letter names (Arabic + English),
 * 12 colours, 11 numbers and the four course storyboards — using Gemini's steerable
 * text-to-speech, then encodes them to the MP3s the app already loads. Nothing about
 * the runtime changes: this writes files, and the files get committed.
 *
 * Preview models are rate-limited hard — brutally so on the free tier, where the cap
 * is a few clips a day and no amount of backoff gets past it. The run is therefore
 * paced, resumable and interrupt-safe rather than fast:
 *   - a manifest records what has been generated, so a second run picks up where the
 *     first stopped instead of re-billing work that is already done;
 *   - clips are written to a .part file and renamed only once ffmpeg succeeds, so a
 *     kill -9 can never leave a truncated MP3 that a later run mistakes for finished;
 *   - the gap between requests widens on every 429 and relaxes after a clean streak,
 *     so the script finds a sustainable pace instead of hammering a closed door.
 *
 * Usage:
 *   export GEMINI_API_KEY="..."                 # aistudio.google.com/apikey
 *   node scripts/generate-voiceovers-gemini.js --dry-run
 *   node scripts/generate-voiceovers-gemini.js --only=letters
 *   node scripts/generate-voiceovers-gemini.js
 *
 * Flags:
 *   --dry-run          list what would be generated, call nothing
 *   --only=a,b         any of: letters, numbers, colors, courses
 *   --limit=N          stop after N clips (handy for a first taste)
 *   --force            regenerate even if the manifest says it is done
 *   --gap=MS           starting pace, default 1200ms (free tier wants ~20000)
 *
 * Rolling back is `git checkout -- public/sounds public/audio`; the previous
 * recordings are all committed.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { courses, colors, numbers, letters } = require("./tts-content");

// ---------------------------------------------------------------- configuration

const MODEL = "gemini-3.1-flash-tts-preview";

/** Voice for letters, numbers and colours — the sounds a child hears most. */
const WORD_VOICE = "Kore";

/** Course narration keeps its three-character cast. */
const COURSE_VOICES = { hakim: "Fenrir", anas: "Puck", narrator: "Aoede" };

/**
 * "phrase" says «حرف ألف» instead of a bare «ألف». A lone word gives the model no
 * sentence to put a melody on, which is most of why single letters sound robotic;
 * a two-word phrase fixes that and reads more naturally to a child anyway.
 */
const LETTER_STYLE = "phrase";

const DIRECTION = {
  word:
    "You are a warm, patient kindergarten teacher introducing a sound to a three-year-old. " +
    "Say it clearly and unhurriedly, with gentle rising warmth, as if smiling. " +
    "Articulate every consonant distinctly — a child is learning to tell this sound apart " +
    "from ones that resemble it. Speak only the text, add nothing.",
  course:
    "You are an excited children's science presenter telling a story to five-year-olds. " +
    "Bright, playful, full of wonder. Speak only the text, add nothing.",
};

/**
 * Post-processing applied to every clip. Two of these matter more than the voice:
 *  - trimming leading/trailing silence, because Gemini pads its output and that pad
 *    reads as lag when a child taps a letter and waits for a sound;
 *  - loudness normalising to a common target, because clips generated in separate
 *    requests drift in level, and a child clicking through the alphabet would
 *    otherwise hear the volume jump letter to letter.
 */
const TRIM = "silenceremove=start_periods=1:start_duration=0:start_threshold=-45dB:detection=peak";
const FILTERS = `${TRIM},areverse,${TRIM},areverse,loudnorm=I=-16:TP=-1.5:LRA=11`;
const BITRATE = "96k";

// ---------------------------------------------------------------- arg parsing

const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const DRY = has("dry-run");
const FORCE = has("force");
const LIMIT = Number(flag("limit", Infinity));
const BASE_GAP = Number(flag("gap", 1200));
const ONLY = (flag("only") || "letters,numbers,colors,courses").split(",").map((s) => s.trim());

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY && !DRY && !has("self-check")) {
  console.error("GEMINI_API_KEY is not set. Get a key at https://aistudio.google.com/apikey");
  process.exit(1);
}

const PUBLIC = path.join(__dirname, "..", "public");
const MANIFEST_PATH = path.join(__dirname, ".tts-manifest.json");

// ---------------------------------------------------------------- the work list

/** Every clip the site needs: where it goes, what is said, and who says it. */
function buildJobs() {
  const jobs = [];
  const add = (file, text, voice, direction) =>
    jobs.push({ file, text, voice, direction });

  if (ONLY.includes("letters")) {
    for (const l of letters) {
      const ar = LETTER_STYLE === "phrase" ? `حرف ${l.ar}` : l.ar;
      const en = LETTER_STYLE === "phrase" ? `The letter ${l.en}` : l.en;
      add(`sounds/letters/${l.id}-ar.mp3`, ar, WORD_VOICE, DIRECTION.word);
      add(`sounds/letters/${l.id}-en.mp3`, en, WORD_VOICE, DIRECTION.word);
    }
  }
  if (ONLY.includes("numbers")) {
    for (const n of numbers) add(`sounds/numbers/${n.id}.mp3`, n.text, WORD_VOICE, DIRECTION.word);
  }
  if (ONLY.includes("colors")) {
    for (const c of colors) add(`sounds/colors/${c.id}.mp3`, c.text, WORD_VOICE, DIRECTION.word);
  }
  if (ONLY.includes("courses")) {
    for (const [course, scenes] of Object.entries(courses)) {
      for (const scene of scenes) {
        const voice = COURSE_VOICES[scene.speaker] || COURSE_VOICES.narrator;
        add(`audio/${course}/scene_${scene.id}_ar.mp3`, scene.ar, voice, DIRECTION.course);
        add(`audio/${course}/scene_${scene.id}_en.mp3`, scene.en, voice, DIRECTION.course);
      }
    }
  }
  return jobs;
}

// ---------------------------------------------------------------- manifest

/**
 * Records which clips this generator produced and with what settings. Without it a
 * resume could not tell an already-regenerated file apart from the older recording
 * sitting at the same path, and would skip work it still needs to do.
 */
function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

function isDone(manifest, job) {
  if (FORCE) return false;
  const entry = manifest[job.file];
  if (!entry) return false;
  if (entry.model !== MODEL || entry.voice !== job.voice || entry.text !== job.text) return false;
  const abs = path.join(PUBLIC, job.file);
  return fs.existsSync(abs) && fs.statSync(abs).size > 0;
}

// ---------------------------------------------------------------- audio helpers

/** Gemini returns raw signed 16-bit PCM; give it a WAV header so ffmpeg can read it. */
function wavHeader(pcm, rate) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(pcm.length + 36, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // mono
  h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function probeDuration(file) {
  return parseFloat(execFileSync("ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
}

// ---------------------------------------------------------------- pacing

/**
 * Free-tier limits on preview models are not published and move around, so rather
 * than encode a guess the script measures: widen the gap whenever the API pushes
 * back, ease it down once a streak of clips lands cleanly.
 */
const pace = {
  gap: BASE_GAP,
  streak: 0,
  penalise() {
    this.gap = Math.min(Math.round(this.gap * 1.8), 90_000);
    this.streak = 0;
  },
  reward() {
    if (++this.streak >= 5 && this.gap > BASE_GAP) {
      this.gap = Math.max(BASE_GAP, Math.round(this.gap * 0.85));
      this.streak = 0;
    }
  },
};

/** Google puts the wait it wants in the error body; honour it rather than guessing. */
function retryDelayFrom(body) {
  try {
    const err = JSON.parse(body).error;
    const field = err?.details?.find((d) => d.retryDelay)?.retryDelay;
    if (field) return (parseFloat(field) + 1) * 1000;
    const m = (err?.message || "").match(/retry in ([\d.]+)/i);
    if (m) return (parseFloat(m[1]) + 1) * 1000;
  } catch {
    /* fall through to the adaptive gap */
  }
  return null;
}

// ---------------------------------------------------------------- generation

async function generate(job) {
  const abs = path.join(PUBLIC, job.file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  const body = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: `${job.direction}\n\n${job.text}` }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: job.voice } } },
    },
  });

  for (let attempt = 1; attempt <= 8; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY }, body },
    );

    if (res.status === 429) {
      const text = await res.text();
      const wait = retryDelayFrom(text) ?? pace.gap;
      pace.penalise();
      console.log(`      rate limited — waiting ${Math.round(wait / 1000)}s (attempt ${attempt}/8)`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    }

    const json = await res.json();
    const part = json.candidates?.[0]?.content?.parts?.find((p) =>
      p.inlineData?.mimeType?.startsWith("audio/"));

    // The model sometimes replies with text instead of audio. That is a retry.
    if (!part) {
      console.log(`      no audio in response, retrying (attempt ${attempt}/8)`);
      await sleep(2000);
      continue;
    }

    const rate = Number(part.inlineData.mimeType.match(/rate=(\d+)/)?.[1] ?? 24000);
    const wav = `${abs}.part.wav`;
    const partial = `${abs}.part`;
    fs.writeFileSync(wav, wavHeader(Buffer.from(part.inlineData.data, "base64"), rate));
    try {
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-af", FILTERS,
        "-codec:a", "libmp3lame", "-b:a", BITRATE, "-ac", "1", "-f", "mp3", partial]);
    } finally {
      fs.rmSync(wav, { force: true });
    }

    // The model occasionally truncates or rambles. Roughly 14 characters a second is
    // normal speech; anything wildly outside that is a bad take, not a bad estimate.
    const seconds = probeDuration(partial);
    const expected = job.text.length / 14;
    if (seconds < Math.max(0.4, expected * 0.35) || seconds > Math.max(4, expected * 3)) {
      fs.rmSync(partial, { force: true });
      console.log(`      ${seconds.toFixed(2)}s for ${job.text.length} chars looks wrong, retrying (attempt ${attempt}/8)`);
      await sleep(1500);
      continue;
    }

    // Rename last: until this line there is no file at the real path to mistake for done.
    fs.renameSync(partial, abs);
    pace.reward();
    return { bytes: fs.statSync(abs).size, seconds };
  }

  throw new Error("gave up after 8 attempts");
}

// ---------------------------------------------------------------- run

/**
 * Exercises the PCM -> WAV -> MP3 path on a synthetic tone, which is the part that
 * fails silently: a wrong WAV header does not error, it just makes ffmpeg encode
 * noise or the wrong duration. Run with --self-check; needs no API key.
 */
function selfCheck() {
  const rate = 24000, seconds = 0.5;
  const pcm = Buffer.alloc(rate * seconds * 2);
  for (let i = 0; i < rate * seconds; i++) {
    pcm.writeInt16LE(Math.round(Math.sin((2 * Math.PI * 440 * i) / rate) * 12000), i * 2);
  }

  const tmp = path.join(require("os").tmpdir(), `tts-selfcheck-${process.pid}`);
  fs.writeFileSync(`${tmp}.wav`, wavHeader(pcm, rate));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", `${tmp}.wav`, "-af", FILTERS,
    "-codec:a", "libmp3lame", "-b:a", BITRATE, "-ac", "1", "-f", "mp3", `${tmp}.mp3.part`]);

  const wavDur = probeDuration(`${tmp}.wav`), mp3Dur = probeDuration(`${tmp}.mp3.part`);
  fs.rmSync(`${tmp}.wav`, { force: true });
  fs.rmSync(`${tmp}.mp3.part`, { force: true });

  const ok = Math.abs(wavDur - seconds) < 0.02 && Math.abs(mp3Dur - seconds) < 0.1;
  console.log(`wav ${wavDur.toFixed(3)}s, mp3 ${mp3Dur.toFixed(3)}s, expected ${seconds}s`);
  console.log(ok ? "PASS  PCM -> WAV -> MP3 round-trips at the right duration"
                 : "FAIL  encoded duration does not match the PCM length");
  if (!ok) process.exit(1);
}

async function main() {
  if (has("self-check")) return selfCheck();

  const jobs = buildJobs();
  const manifest = loadManifest();
  const pending = jobs.filter((j) => !isDone(manifest, j));
  const todo = pending.slice(0, LIMIT);

  console.log(`Model    ${MODEL}`);
  console.log(`Voices   words: ${WORD_VOICE} · courses: ${Object.entries(COURSE_VOICES)
    .map(([k, v]) => `${k}=${v}`).join(" ")}`);
  console.log(`Letters  ${LETTER_STYLE === "phrase" ? "phrase form («حرف ألف»)" : "bare word («ألف»)"}`);
  console.log(`Sections ${ONLY.join(", ")}`);
  console.log(`Work     ${todo.length} to generate, ${jobs.length - pending.length} already done`);

  if (DRY) {
    for (const j of todo) console.log(`  ${j.file.padEnd(42)} ${j.voice.padEnd(8)} ${j.text.slice(0, 60)}`);
    console.log("\nDry run — nothing was generated.");
    return;
  }
  if (!todo.length) {
    console.log("\nNothing to do.");
    return;
  }

  // Ctrl-C should stop after the current clip, not mid-encode.
  let stopping = false;
  process.on("SIGINT", () => {
    if (stopping) process.exit(130);
    stopping = true;
    console.log("\nFinishing the current clip, then stopping. Re-run to resume.");
  });

  const started = Date.now();
  let done = 0, failed = 0;

  for (const [i, job] of todo.entries()) {
    if (stopping) break;
    const label = `[${String(i + 1).padStart(3)}/${todo.length}] ${job.file}`;
    try {
      const { bytes, seconds } = await generate(job);
      manifest[job.file] = { model: MODEL, voice: job.voice, text: job.text, at: new Date().toISOString() };
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      done++;
      const elapsed = (Date.now() - started) / 1000;
      const eta = Math.round((elapsed / done) * (todo.length - done));
      console.log(`${label}  ${seconds.toFixed(2)}s  ${String(bytes).padStart(6)}b  eta ${Math.floor(eta / 60)}m${eta % 60}s`);
    } catch (err) {
      failed++;
      console.error(`${label}  FAILED — ${err.message}`);
    }
    if (!stopping && i < todo.length - 1) await sleep(pace.gap);
  }

  console.log(`\nGenerated ${done}, failed ${failed}, pace settled at ${Math.round(pace.gap / 1000)}s.`);
  if (failed || stopping) console.log("Re-run the same command to pick up what is left.");
}

main().catch((err) => {
  console.error("Crashed:", err);
  process.exit(1);
});
