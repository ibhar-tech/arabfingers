import { Howl } from "howler";

const cache = new Map<string, Howl>();

function getLetterSound(soundId: string, lang: "ar" | "en"): Howl {
  const key = `${soundId}-${lang}`;
  let howl = cache.get(key);

  if (!howl) {
    howl = new Howl({
      src: [`/sounds/letters/${soundId}-${lang}.mp3`],
      preload: true,
      html5: false,
      volume: 0.85,
    });
    cache.set(key, howl);
  }

  return howl;
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let gapTimer: ReturnType<typeof setTimeout> | null = null;

/** Pause between the Arabic letter name and the English one. */
const AR_EN_GAP_MS = 450;

// Default rate 1.0 = the recording's natural pitch; slowing it (0.9) pitch-shifts
// the audio and makes it sound more robotic.
export function playLetterSound(soundId: string, rate: number = 1.0) {
  // Stop any currently playing letter sounds
  for (const howl of cache.values()) {
    howl.stop();
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  if (gapTimer) {
    clearTimeout(gapTimer);
    gapTimer = null;
  }

  debounceTimer = setTimeout(() => {
    const arSound = getLetterSound(soundId, "ar");
    arSound.rate(rate);
    arSound.play();

    // Play English after Arabic finishes, with a beat in between. Back to back the
    // two names ran together as one word; the pause lets a child register that they
    // heard the Arabic letter before the English name lands on top of it.
    arSound.once("end", () => {
      gapTimer = setTimeout(() => {
        const enSound = getLetterSound(soundId, "en");
        enSound.rate(rate);
        enSound.play();
      }, AR_EN_GAP_MS);
    });
  }, 60);
}

export function primeLetterSounds() {
  // Preload a few common letters
  getLetterSound("alef", "ar");
  getLetterSound("alef", "en");
  getLetterSound("ba", "ar");
  getLetterSound("ba", "en");
}
