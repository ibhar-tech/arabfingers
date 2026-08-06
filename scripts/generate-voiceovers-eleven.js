/**
 * ElevenLabs voiceover generator for Arab Fingers.
 *
 * Regenerates the spoken words the site says most — 28 letter names in Arabic and
 * English, 11 numbers, 12 colours — and encodes them to the MP3s the app already
 * loads. Nothing about the runtime changes: this writes files, and they get committed.
 *
 * Scope is deliberate. Letters, numbers and colours total ~692 characters, about 7%
 * of a free month, and they are the clips that sound most robotic because a lone word
 * gives a TTS engine no sentence to put a melody on. The four course narrations are
 * ~9,400 characters — 93% of the budget for the audio that already sounds best. They
 * are excluded unless you ask for them with --only=courses.
 *
 * Resumable and interrupt-safe, sharing scripts/.tts-manifest.json with the Gemini
 * generator: each clip is recorded with the engine, voice and exact text that made it,
 * so re-running skips finished work, switching engines regenerates, and a killed run
 * loses at most the clip in flight.
 *
 * Usage:
 *   export ELEVEN_API_KEY="..."
 *   node scripts/generate-voiceovers-eleven.js --dry-run
 *   node scripts/generate-voiceovers-eleven.js
 *
 * Flags:
 *   --dry-run          list the work and the character cost, call nothing
 *   --only=a,b         any of: letters, numbers, colors, courses
 *   --course=NAME      one course at a time: states-of-matter, water-cycle,
 *                      solar-system, gravity. Implies --only=courses.
 *   --limit=N          stop after N clips
 *   --force            regenerate even if the manifest says it is done
 *   --voice=NAME       voice name as it appears on the account, default Alice
 *   --voice-id=ID      skip the name lookup (for keys without Voices:Read)
 *   --model=ID         default eleven_multilingual_v2; eleven_flash_v2_5 is half price
 *   --budget=N         refuse to start if the run exceeds N characters, default 1500
 *   --self-check       exercise the encode path, no API key needed
 *
 * Rolling back is `git checkout -- public/sounds`; the previous recordings are committed.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { courses, colors, numbers, letters } = require("./tts-content");

// ---------------------------------------------------------------- configuration

const ENGINE = "elevenlabs";

/**
 * Voice settings are the ones the approved samples were generated with. Do not tune
 * them without re-listening — the whole point of picking by ear is that the shipped
 * audio matches what was judged.
 */
const VOICE_SETTINGS = { stability: 0.45, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true };

/**
 * «حرف ألف» rather than a bare «ألف». ElevenLabs takes no style instructions the way
 * Gemini does, so the wording is the only prosody lever available — and a two-word
 * phrase is what stops a lone letter name reading as a flat beep.
 */
const LETTER_STYLE = "phrase";

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
const BUDGET = Number(flag("budget", 1500));
const MODEL = flag("model", "eleven_multilingual_v2");
const VOICE_NAME = flag("voice", "Alice");
const VOICE_ID = flag("voice-id");
const COURSE = flag("course");
const ONLY = COURSE
  ? ["courses"]
  : (flag("only") || "letters,numbers,colors").split(",").map((s) => s.trim());

if (COURSE && !Object.keys(courses).includes(COURSE)) {
  console.error(`No course "${COURSE}". Available: ${Object.keys(courses).join(", ")}`);
  process.exit(1);
}

const API_KEY = process.env.ELEVEN_API_KEY;
if (!API_KEY && !DRY && !has("self-check")) {
  console.error("ELEVEN_API_KEY is not set.");
  process.exit(1);
}

const PUBLIC = path.join(__dirname, "..", "public");
const MANIFEST_PATH = path.join(__dirname, ".tts-manifest.json");

// ---------------------------------------------------------------- the work list

function buildJobs() {
  const jobs = [];
  const add = (file, text) => jobs.push({ file, text });

  if (ONLY.includes("letters")) {
    for (const l of letters) {
      add(`sounds/letters/${l.id}-ar.mp3`, LETTER_STYLE === "phrase" ? `حرف ${l.ar}` : l.ar);
      add(`sounds/letters/${l.id}-en.mp3`, LETTER_STYLE === "phrase" ? `The letter ${l.en}` : l.en);
    }
  }
  if (ONLY.includes("numbers")) for (const n of numbers) add(`sounds/numbers/${n.id}.mp3`, n.text);
  if (ONLY.includes("colors")) for (const c of colors) add(`sounds/colors/${c.id}.mp3`, c.text);
  if (ONLY.includes("courses")) {
    // Courses are ~2,200 characters each, so they are worth running one at a time:
    // a batch that overruns the remaining credits fails the whole run, not one clip.
    for (const [course, scenes] of Object.entries(courses)) {
      if (COURSE && course !== COURSE) continue;
      for (const scene of scenes) {
        add(`audio/${course}/scene_${scene.id}_ar.mp3`, scene.ar);
        add(`audio/${course}/scene_${scene.id}_en.mp3`, scene.en);
      }
    }
  }
  return jobs;
}

// ---------------------------------------------------------------- manifest

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

function isDone(manifest, job, voiceId) {
  if (FORCE) return false;
  const e = manifest[job.file];
  if (!e) return false;
  if (e.engine !== ENGINE || e.model !== MODEL || e.voice !== voiceId || e.text !== job.text) return false;
  const abs = path.join(PUBLIC, job.file);
  return fs.existsSync(abs) && fs.statSync(abs).size > 0;
}

// ---------------------------------------------------------------- api

const api = (route, init = {}) =>
  fetch(`https://api.elevenlabs.io/v1${route}`, {
    ...init,
    headers: { "xi-api-key": API_KEY, "Content-Type": "application/json", ...init.headers },
  });

/** Resolve a voice name to an id. Stock voices are named "Alice - Clear, Engaging Educator". */
async function resolveVoice(name) {
  const res = await api("/voices");
  if (!res.ok) {
    throw new Error(`GET /voices returned ${res.status}. If the key lacks Voices:Read, pass --voice-id=`);
  }
  const { voices } = await res.json();
  const want = name.toLowerCase().trim();
  const hit = voices.find((v) => {
    const full = v.name.toLowerCase().trim();
    return full === want || full.split(" - ")[0].trim() === want;
  });
  if (!hit) {
    throw new Error(`No voice named "${name}". Available: ${voices.map((v) => v.name.split(" - ")[0]).join(", ")}`);
  }
  return hit.voice_id;
}

// ---------------------------------------------------------------- audio

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function probeDuration(file) {
  return parseFloat(execFileSync("ffprobe",
    ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
}

function encode(src, dest) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-af", FILTERS,
    "-codec:a", "libmp3lame", "-b:a", BITRATE, "-ac", "1", "-f", "mp3", dest]);
}

async function generate(job, voiceId) {
  const abs = path.join(PUBLIC, job.file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });

  for (let attempt = 1; attempt <= 5; attempt++) {
    const res = await api(`/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: "POST",
      body: JSON.stringify({ text: job.text, model_id: MODEL, voice_settings: VOICE_SETTINGS }),
    });

    if (res.status === 429) {
      const wait = 5000 * attempt;
      console.log(`      rate limited — waiting ${wait / 1000}s (attempt ${attempt}/5)`);
      await sleep(wait);
      continue;
    }
    if (res.status === 401) throw new Error("401 — key rejected. Check it, or its Text to Speech permission.");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 240)}`);

    const raw = `${abs}.raw`;
    const partial = `${abs}.part`;
    fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
    try {
      encode(raw, partial);
    } finally {
      fs.rmSync(raw, { force: true });
    }

    // ~14 characters a second is normal speech; well outside that is a bad take.
    const seconds = probeDuration(partial);
    const expected = job.text.length / 14;
    if (seconds < Math.max(0.4, expected * 0.35) || seconds > Math.max(4, expected * 3)) {
      fs.rmSync(partial, { force: true });
      console.log(`      ${seconds.toFixed(2)}s for ${job.text.length} chars looks wrong, retrying (${attempt}/5)`);
      await sleep(1000);
      continue;
    }

    // Rename last: until here there is no file at the real path to mistake for done.
    fs.renameSync(partial, abs);
    return { bytes: fs.statSync(abs).size, seconds };
  }
  throw new Error("gave up after 5 attempts");
}

// ---------------------------------------------------------------- self-check

function selfCheck() {
  const rate = 24000, seconds = 0.5;
  const pcm = Buffer.alloc(rate * seconds * 2);
  for (let i = 0; i < rate * seconds; i++) {
    pcm.writeInt16LE(Math.round(Math.sin((2 * Math.PI * 440 * i) / rate) * 12000), i * 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(pcm.length + 36, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);

  const tmp = path.join(require("os").tmpdir(), `eleven-selfcheck-${process.pid}`);
  fs.writeFileSync(`${tmp}.wav`, Buffer.concat([h, pcm]));
  encode(`${tmp}.wav`, `${tmp}.mp3.part`);
  const wavDur = probeDuration(`${tmp}.wav`), mp3Dur = probeDuration(`${tmp}.mp3.part`);
  fs.rmSync(`${tmp}.wav`, { force: true });
  fs.rmSync(`${tmp}.mp3.part`, { force: true });

  const ok = Math.abs(mp3Dur - seconds) < 0.1;
  console.log(`wav ${wavDur.toFixed(3)}s, mp3 ${mp3Dur.toFixed(3)}s, expected ${seconds}s`);
  console.log(ok ? "PASS  trim + loudness + encode preserves the audio"
                 : "FAIL  the filter chain is eating the signal");
  if (!ok) process.exit(1);
}

// ---------------------------------------------------------------- run

async function main() {
  if (has("self-check")) return selfCheck();

  const jobs = buildJobs();
  const voiceId = DRY ? (VOICE_ID || "(resolved at run time)") : (VOICE_ID || await resolveVoice(VOICE_NAME));
  const manifest = loadManifest();
  const pending = jobs.filter((j) => !isDone(manifest, j, voiceId));
  const todo = pending.slice(0, LIMIT);
  const chars = todo.reduce((n, j) => n + j.text.length, 0);

  console.log(`Engine   ElevenLabs · ${MODEL}`);
  console.log(`Voice    ${VOICE_NAME} (${voiceId})`);
  console.log(`Letters  ${LETTER_STYLE === "phrase" ? "phrase form («حرف ألف»)" : "bare word («ألف»)"}`);
  console.log(`Sections ${COURSE ? `course: ${COURSE}` : ONLY.join(", ")}`);
  console.log(`Work     ${todo.length} clips, ${chars} characters, ${jobs.length - pending.length} already done`);

  if (DRY) {
    for (const j of todo) console.log(`  ${j.file.padEnd(42)} ${j.text.slice(0, 60)}`);
    console.log("\nDry run — nothing was generated.");
    return;
  }
  if (!todo.length) return console.log("\nNothing to do.");

  // Credits are the scarce thing here, so make an oversized run say so rather than spend.
  // Naming one course is already a deliberate, bounded choice — the guard exists to
  // catch an accidental "everything" run, not to second-guess an explicit one.
  if (!COURSE && chars > BUDGET) {
    console.error(`\nRefusing to start: ${chars} characters exceeds the ${BUDGET} budget.`);
    console.error("Raise it with --budget=N if that is genuinely what you want.");
    process.exit(1);
  }

  let stopping = false;
  process.on("SIGINT", () => {
    if (stopping) process.exit(130);
    stopping = true;
    console.log("\nFinishing the current clip, then stopping. Re-run to resume.");
  });

  let done = 0, failed = 0, spent = 0;
  for (const [i, job] of todo.entries()) {
    if (stopping) break;
    const label = `[${String(i + 1).padStart(3)}/${todo.length}] ${job.file}`;
    try {
      const { bytes, seconds } = await generate(job, voiceId);
      manifest[job.file] = {
        engine: ENGINE, model: MODEL, voice: voiceId, text: job.text, at: new Date().toISOString(),
      };
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      done++; spent += job.text.length;
      console.log(`${label}  ${seconds.toFixed(2)}s  ${String(bytes).padStart(6)}b`);
    } catch (err) {
      failed++;
      console.error(`${label}  FAILED — ${err.message}`);
      if (/401/.test(err.message)) break;
    }
    if (!stopping && i < todo.length - 1) await sleep(300);
  }

  console.log(`\nGenerated ${done}, failed ${failed}, about ${spent} characters spent.`);
  if (failed || stopping) console.log("Re-run the same command to pick up what is left.");
}

main().catch((err) => {
  console.error("Crashed:", err.message);
  process.exit(1);
});
