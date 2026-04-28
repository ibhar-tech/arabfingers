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

export function playLetterSound(soundId: string, rate: number = 0.9) {
  // Stop any currently playing letter sounds
  for (const howl of cache.values()) {
    howl.stop();
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    const arSound = getLetterSound(soundId, "ar");
    arSound.rate(rate);
    arSound.play();

    // Play English after Arabic finishes
    arSound.once("end", () => {
      const enSound = getLetterSound(soundId, "en");
      enSound.rate(rate);
      enSound.play();
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
