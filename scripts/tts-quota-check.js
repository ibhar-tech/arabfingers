/**
 * Prints exactly which Gemini quota is blocking a TTS run, and when it resets.
 *
 *   export GEMINI_API_KEY="..."
 *   node scripts/tts-quota-check.js
 *   node scripts/tts-quota-check.js gemini-2.5-flash-preview-tts
 *
 * A PerMinute violation means slow down. A PerDay violation means stop until the
 * quota rolls over at midnight Pacific — no amount of backoff will get past it.
 */

const MODEL = process.argv[2] || "gemini-3.1-flash-tts-preview";
const KEY = process.env.GEMINI_API_KEY;

if (!KEY) {
  console.error("GEMINI_API_KEY is not set.");
  process.exit(1);
}

(async () => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Say clearly: ألف" }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } },
        },
      }),
    },
  );

  console.log(`model   ${MODEL}`);
  console.log(`status  ${res.status} ${res.statusText}`);

  const text = await res.text();
  if (res.ok) {
    const parts = JSON.parse(text).candidates?.[0]?.content?.parts || [];
    const audio = parts.find((p) => p.inlineData?.mimeType?.startsWith("audio/"));
    console.log(audio
      ? `\nOK — quota is available. Audio returned (${audio.inlineData.mimeType}).`
      : `\nOdd — 200 but no audio. Parts: ${JSON.stringify(parts).slice(0, 300)}`);
    return;
  }

  let err;
  try { err = JSON.parse(text).error; } catch { console.log(text.slice(0, 800)); return; }

  console.log(`message ${err.message}\n`);
  for (const d of err.details || []) {
    const type = (d["@type"] || "").split("/").pop();
    if (type === "QuotaFailure") {
      for (const v of d.violations || []) {
        console.log("QUOTA   " + (v.quotaId || v.subject));
        if (v.quotaValue) console.log(`        limit ${v.quotaValue}`);
        if (v.quotaDimensions) console.log(`        ${JSON.stringify(v.quotaDimensions)}`);
        console.log(`        ${/PerDay/i.test(v.quotaId || "")
          ? "DAILY cap — resets at midnight US Pacific. Backoff cannot help."
          : /PerMinute/i.test(v.quotaId || "")
            ? "Per-minute cap — slowing down will get past this."
            : "unclassified"}`);
      }
    }
    if (type === "RetryInfo") console.log(`RETRY   in ${d.retryDelay}`);
    if (type === "Help") for (const l of d.links || []) console.log(`HELP    ${l.url}`);
  }
})();
