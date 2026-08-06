/**
 * Discovery helper for the ElevenLabs generators: what models exist, which voices
 * the account has, and which Arabic voices are available to add from the public
 * Voice Library.
 *
 *   export ELEVEN_API_KEY="..."
 *   node scripts/tts-voices.js models      # model ids, newest first, with quality notes
 *   node scripts/tts-voices.js mine        # voices already on the account
 *   node scripts/tts-voices.js arabic      # Arabic voices in the shared library
 *
 * "arabic" needs no extra key permission; adding a voice to the account is done in
 * the web UI, after which it shows up under "mine" and can be passed as --voice=.
 */

const KEY = process.env.ELEVEN_API_KEY;
if (!KEY) {
  console.error("ELEVEN_API_KEY is not set.");
  process.exit(1);
}

const api = (route) =>
  fetch(`https://api.elevenlabs.io/v1${route}`, { headers: { "xi-api-key": KEY } });

async function json(route) {
  const res = await api(route);
  if (!res.ok) throw new Error(`GET ${route} -> ${res.status} ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

const cmd = process.argv[2] || "models";

(async () => {
  if (cmd === "models") {
    const models = await json("/models");
    for (const m of models) {
      const langs = (m.languages || []).map((l) => l.language_id);
      const arabic = langs.includes("ar") ? "arabic YES" : "arabic no ";
      console.log(
        `${(m.model_id || "").padEnd(30)} ${arabic}  ${String(m.name || "").slice(0, 34).padEnd(36)}` +
        `${m.can_do_text_to_speech ? "tts" : "   "}`,
      );
    }
    console.log("\nPick the newest model whose 'arabic' column says YES and pass it as --model=");
    return;
  }

  if (cmd === "mine") {
    const { voices } = await json("/voices");
    for (const v of voices) {
      const labels = Object.entries(v.labels || {}).map(([k, val]) => `${k}=${val}`).join(" ");
      console.log(`${v.name.split(" - ")[0].padEnd(14)} ${v.voice_id}  ${labels}`);
    }
    console.log(`\n${voices.length} voices. Pass a name as --voice=Name`);
    return;
  }

  if (cmd === "arabic") {
    // The shared library is where native Arabic voices live; the default account
    // cast is English-only, which is audible the moment it reads Arabic.
    const { voices } = await json("/shared-voices?page_size=60&language=ar");
    if (!voices?.length) {
      console.log("No Arabic voices returned. Browse elevenlabs.io/voice-library and filter by Arabic.");
      return;
    }
    for (const v of voices) {
      console.log(
        `${String(v.name).slice(0, 22).padEnd(24)} ${v.voice_id}  ` +
        `${String(v.gender || "").padEnd(8)} ${String(v.age || "").padEnd(12)} ` +
        `${String(v.accent || "").padEnd(14)} ${String(v.descriptive || v.use_case || "").slice(0, 24)}`,
      );
    }
    console.log(`\n${voices.length} Arabic voices. Add one at elevenlabs.io/voice-library, then it`);
    console.log("appears under `mine` and can be used as --voice=<name>.");
    return;
  }

  console.error(`Unknown command "${cmd}". Use: models | mine | arabic`);
  process.exit(1);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
