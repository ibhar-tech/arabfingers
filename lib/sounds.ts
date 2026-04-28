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
