import { Howl, Howler } from "howler";

type SoundKey = "smash" | "chime" | "confetti";

const soundBank: Partial<Record<SoundKey, Howl>> = {};

function getSound(key: SoundKey) {
  if (typeof window === "undefined") {
    return null;
  }

  if (!soundBank[key]) {
    Howler.autoUnlock = true;

    soundBank[key] = new Howl({
      src: [`/sounds/${key}.mp3`],
      preload: true,
      html5: false,
      volume: key === "smash" ? 0.45 : key === "chime" ? 0.4 : 0.55,
    });
  }

  return soundBank[key] ?? null;
}

export function primeSounds() {
  getSound("smash");
  getSound("chime");
  getSound("confetti");
}

function play(key: SoundKey, enabled: boolean) {
  if (!enabled) {
    return;
  }

  getSound(key)?.play();
}

export function playSmash(enabled: boolean) {
  play("smash", enabled);
}

export function playChime(enabled: boolean) {
  play("chime", enabled);
}

export function playConfetti(enabled: boolean) {
  play("confetti", enabled);
}

const wordBank = new Map<string, Howl>();

/**
 * Play a short pre-recorded clip from /public by URL, reusing one decoded Howl per
 * file. Web Audio here (not `new Audio()`): the clip is decoded once instead of on
 * every tap, and Howler's autoUnlock handles the mobile first-touch gate for us.
 *
 * ponytail: only for short words/letters. Long narration streams via <audio> so we
 * don't hold minutes of decoded PCM in memory.
 */
export function playWord(src: string): Howl | null {
  if (typeof window === "undefined") return null;

  for (const howl of wordBank.values()) {
    howl.stop();
  }

  let howl = wordBank.get(src);
  if (!howl) {
    Howler.autoUnlock = true;
    howl = new Howl({ src: [src], preload: true, html5: false, volume: 0.85 });
    wordBank.set(src, howl);
  }

  howl.play();
  return howl;
}
