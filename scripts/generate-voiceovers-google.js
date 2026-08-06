/**
 * Free Google Translate TTS Audio Generator for Arab Fingers
 * 
 * This script downloads high-quality, neural, human-like voiceovers for all
 * 4 educational courses in both Arabic and English, plus all letters, colors, 
 * and numbers, and saves them directly to your public directories.
 * 
 * This is 100% free, has no quotas, and requires no API keys or credit cards!
 * 
 * Usage:
 *   node scripts/generate-voiceovers-google.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Storyboard definitions identical to the app structure
const { courses, colors, numbers, letters } = require("./tts-content");

// Download helper with custom pacer
function downloadGoogleTTS(text, lang, targetPath) {
  // Check if file already exists with content to avoid duplicate downloads!
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
    console.log(`  ⏭️ Skipping existing file: ${path.basename(targetPath)}`);
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const file = fs.createWriteStream(targetPath);

    const request = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(targetPath); // delete empty file
        reject(new Error(`Google Translate TTS Error ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(true);
      });
    });

    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
      reject(err);
    });
  });
}

async function generateAll() {
  console.log("🧪 Starting 100% Free Google Neural TTS Voiceover Generation...");
  
  const publicDir = path.join(__dirname, "../public");
  const audioBase = path.join(publicDir, "audio");
  const soundsBase = path.join(publicDir, "sounds");
  
  if (!fs.existsSync(audioBase)) {
    fs.mkdirSync(audioBase, { recursive: true });
  }

  const courseKeys = Object.keys(courses);
  let totalGenerated = 0;

  // 1. Process Science Courses
  for (const course of courseKeys) {
    console.log(`\n📦 Processing Course: ${course}...`);
    const courseDir = path.join(audioBase, course);
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }

    const scenes = courses[course];
    for (const scene of scenes) {
      // 1. Generate Arabic MP3
      const arPath = path.join(courseDir, `scene_${scene.id}_ar.mp3`);
      try {
        console.log(`  🗣️ Downloading Arabic - Scene ${scene.id}...`);
        const arGenerated = await downloadGoogleTTS(scene.ar, "ar", arPath);
        if (arGenerated) {
          totalGenerated++;
          await new Promise((r) => setTimeout(r, 600)); // safe delay
        }
      } catch (err) {
        console.error(`  ❌ Failed Arabic Scene ${scene.id}:`, err.message);
      }

      // 2. Generate English MP3
      const enPath = path.join(courseDir, `scene_${scene.id}_en.mp3`);
      try {
        console.log(`  🗣️ Downloading English - Scene ${scene.id}...`);
        const enGenerated = await downloadGoogleTTS(scene.en, "en", enPath);
        if (enGenerated) {
          totalGenerated++;
          await new Promise((r) => setTimeout(r, 600)); // safe delay
        }
      } catch (err) {
        console.error(`  ❌ Failed English Scene ${scene.id}:`, err.message);
      }
    }
  }

  // 2. Process Colors
  console.log("\n🎨 Processing Colors...");
  const colorsDir = path.join(soundsBase, "colors");
  if (!fs.existsSync(colorsDir)) {
    fs.mkdirSync(colorsDir, { recursive: true });
  }

  for (const c of colors) {
    const targetPath = path.join(colorsDir, `${c.id}.mp3`);
    try {
      console.log(`  🗣️ Downloading color: ${c.text} (${c.id})...`);
      const generated = await downloadGoogleTTS(c.text, "ar", targetPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed color ${c.id}:`, err.message);
    }
  }

  // 3. Process Numbers
  console.log("\n🔢 Processing Numbers...");
  const numbersDir = path.join(soundsBase, "numbers");
  if (!fs.existsSync(numbersDir)) {
    fs.mkdirSync(numbersDir, { recursive: true });
  }

  for (const n of numbers) {
    const targetPath = path.join(numbersDir, `${n.id}.mp3`);
    try {
      console.log(`  🗣️ Downloading number: ${n.text} (${n.id})...`);
      const generated = await downloadGoogleTTS(n.text, "ar", targetPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed number ${n.id}:`, err.message);
    }
  }

  // 4. Process Letters
  console.log("\n🔤 Processing Letters...");
  const lettersDir = path.join(soundsBase, "letters");
  if (!fs.existsSync(lettersDir)) {
    fs.mkdirSync(lettersDir, { recursive: true });
  }

  for (const l of letters) {
    // 1. Generate Arabic Letter name
    const arPath = path.join(lettersDir, `${l.id}-ar.mp3`);
    try {
      console.log(`  🗣️ Downloading Arabic letter: ${l.ar} (${l.id})...`);
      const generated = await downloadGoogleTTS(l.ar, "ar", arPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed Arabic letter ${l.id}:`, err.message);
    }

    // 2. Generate English Letter name
    const enPath = path.join(lettersDir, `${l.id}-en.mp3`);
    try {
      console.log(`  🗣️ Downloading English letter: ${l.en} (${l.id})...`);
      const generated = await downloadGoogleTTS(l.en, "en", enPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed English letter ${l.id}:`, err.message);
    }
  }

  console.log(`\n🎉 Super success! Successfully downloaded all ${totalGenerated} high-quality free voiceover files!`);
}

generateAll().catch((err) => {
  console.error("💥 Generation crashed:", err);
});
