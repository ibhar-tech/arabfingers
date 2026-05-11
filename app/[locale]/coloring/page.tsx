import type { Metadata } from "next";
import { ColoringLoader } from "./ColoringLoader";

export const metadata: Metadata = {
  title: "Coloring & Tracing — Learn Arabic Letters | تلوين وتتبع الحروف",
  description:
    "Free interactive coloring and tracing game for Arabic letters. Let your kids paint, trace, and color the Arabic alphabet with this fun educational tool.",
};

export default function ColoringPage() {
  return (
    <>
      <ColoringLoader />
      {/* SEO content hidden from UI */}
      <div className="sr-only" aria-hidden="true">
        <h1>Arabic Letters Coloring and Tracing Game</h1>
        <p>
          Welcome to the ArabFingers Coloring and Tracing Game! This free interactive canvas allows children to 
          practice their fine motor skills while learning the shapes of Arabic letters. 
        </p>
        <h2>Interactive Painting</h2>
        <p>
          Select a color from the vibrant palette and use your finger or mouse to paint directly on the screen. 
          Each of the 28 Arabic letters is displayed as a large outline, encouraging children to trace along the 
          paths and learn how the letters are formed.
        </p>
        <h2>Educational Benefits</h2>
        <ul>
          <li>Develops fine motor skills essential for writing.</li>
          <li>Reinforces Arabic letter recognition and shape memorization.</li>
          <li>Provides a creative, pressure-free environment for kids.</li>
          <li>Works smoothly on tablets, phones, and desktop computers.</li>
        </ul>
        <p>
          Letters included: Alef, Ba, Ta, Tha, Jeem, Hha, Kha, Dal, Thal, Ra, Zay, Seen, Sheen, Sad, Dad, Tah, Zah, Ain, Ghain, Fa, Qaf, Kaf, Lam, Meem, Noon, Ha, Waw, Ya.
        </p>
      </div>
    </>
  );
}
