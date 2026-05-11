import type { Metadata } from "next";
import PlayLoader from "./PlayLoader";

export const metadata: Metadata = {
  title: "Play — Learn Arabic Letters | العب وتعلم الحروف العربية",
  description:
    "Press any key or tap the screen to see animated Arabic letters with natural pronunciation. A free, interactive keyboard smash toy for toddlers aged 1–6. All 28 Arabic letters with bilingual display.",
};

export default function PlayPage() {
  return (
    <>
      <PlayLoader />
      {/* SEO content — visible to crawlers, hidden from interactive play UI */}
      <div className="sr-only" aria-hidden="true">
        <h1>ArabFingers — Interactive Arabic Letter Learning Game</h1>
        <p>
          ArabFingers is a free, bilingual Arabic and English keyboard smash toy designed for
          toddlers and pre-schoolers aged 1 to 6 years old. Press any key on the keyboard or
          tap anywhere on the screen to see beautiful, large Arabic letters appear with their
          English equivalents displayed side by side.
        </p>
        <h2>How to Play</h2>
        <p>
          Simply press any key on your keyboard or tap the screen. Each keypress reveals one of
          the 28 Arabic letters with natural-sounding pronunciation in both Arabic and English.
          Children learn through repetition — the more they play, the more familiar they become
          with Arabic letter shapes and sounds.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Full 28-letter Arabic alphabet with natural pronunciation</li>
          <li>Bilingual display showing Arabic and English letters side by side</li>
          <li>High-quality neural text-to-speech voice pronunciation</li>
          <li>3D animated floating objects in themed backgrounds</li>
          <li>5 visual themes: Space, Desert, Jungle, Underwater, and Ramadan</li>
          <li>Keyboard and touch screen support for all devices</li>
          <li>Multiple keyboard layout support: Standard QWERTY, Phonetic, and AZERTY</li>
          <li>Parent control panel with optional PIN lock</li>
          <li>Milestone celebrations with confetti at 10, 25, 50, and 100 key presses</li>
          <li>Guided mode to learn letters in alphabetical order</li>
          <li>Session summary showing all letters practiced</li>
          <li>Works offline as an installable Progressive Web App</li>
          <li>Child-safe with zero data collection and no tracking</li>
        </ul>
        <h2>The Arabic Alphabet</h2>
        <p>
          The Arabic alphabet consists of 28 letters written from right to left. Each letter in
          ArabFingers is displayed in its isolated form — the foundational shape that children
          learn first. The letters are: Alef (ا), Ba (ب), Ta (ت), Tha (ث), Jeem (ج), Hha (ح),
          Kha (خ), Dal (د), Thal (ذ), Ra (ر), Zay (ز), Seen (س), Sheen (ش), Sad (ص), Dad (ض),
          Tah (ط), Zah (ظ), Ain (ع), Ghain (غ), Fa (ف), Qaf (ق), Kaf (ك), Lam (ل), Meem (م),
          Noon (ن), Ha (ه), Waw (و), and Ya (ي).
        </p>
        <h2>Who Is This For?</h2>
        <p>
          ArabFingers is perfect for toddlers aged 1 to 3 who enjoy the sensory experience of
          pressing keys and seeing colorful responses, pre-schoolers aged 4 to 6 who are ready
          to start recognizing and naming Arabic letters, bilingual Arab families who want their
          children exposed to Arabic script in a fun environment, and parents looking for a safe,
          ad-free play area with parental controls.
        </p>
      </div>
    </>
  );
}
