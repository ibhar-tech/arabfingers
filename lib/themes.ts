export type ThemeName =
  | "space"
  | "desert"
  | "jungle"
  | "underwater"
  | "ramadan";

type ThemeConfig = {
  palette: string[];
  emojis: string[];
  background: string;
  veil: string;
};

export const themes: Record<ThemeName, ThemeConfig> = {
  space: {
    palette: ["#7F77DD", "#534AB7", "#9FE1CB", "#1D9E75", "#FAC775"],
    emojis: ["🚀", "⭐", "🌟", "🪐", "✨"],
    background:
      "radial-gradient(circle at 20% 20%, rgba(127,119,221,0.28), transparent 30%), radial-gradient(circle at 80% 10%, rgba(250,199,117,0.2), transparent 28%), linear-gradient(180deg, #050816 0%, #0a1331 44%, #03040d 100%)",
    veil:
      "linear-gradient(180deg, rgba(5,8,22,0.08), rgba(5,8,22,0.45) 48%, rgba(2,4,12,0.8) 100%)",
  },
  desert: {
    palette: ["#EF9F27", "#BA7517", "#F0997B", "#D85A30", "#FAC775"],
    emojis: ["🌵", "🐪", "🌙", "⭐", "🏜️"],
    background:
      "radial-gradient(circle at 18% 18%, rgba(250,199,117,0.18), transparent 26%), radial-gradient(circle at 85% 14%, rgba(240,153,123,0.18), transparent 28%), linear-gradient(180deg, #120c08 0%, #2b190d 46%, #090604 100%)",
    veil:
      "linear-gradient(180deg, rgba(10,6,4,0.06), rgba(10,6,4,0.42) 42%, rgba(10,6,4,0.78) 100%)",
  },
  jungle: {
    palette: ["#639922", "#3B6D11", "#1D9E75", "#5DCAA5", "#97C459"],
    emojis: ["🦜", "🌿", "🍃", "🐒", "✨"],
    background:
      "radial-gradient(circle at 22% 20%, rgba(151,196,89,0.2), transparent 30%), radial-gradient(circle at 78% 18%, rgba(29,158,117,0.18), transparent 28%), linear-gradient(180deg, #04120a 0%, #082415 48%, #020906 100%)",
    veil:
      "linear-gradient(180deg, rgba(3,12,7,0.06), rgba(3,12,7,0.44) 44%, rgba(3,12,7,0.8) 100%)",
  },
  underwater: {
    palette: ["#185FA5", "#378ADD", "#5DCAA5", "#0F6E56", "#85B7EB"],
    emojis: ["🐠", "🐬", "🫧", "🌊", "✨"],
    background:
      "radial-gradient(circle at 18% 16%, rgba(133,183,235,0.18), transparent 28%), radial-gradient(circle at 80% 14%, rgba(93,202,165,0.16), transparent 26%), linear-gradient(180deg, #020b16 0%, #082642 46%, #031019 100%)",
    veil:
      "linear-gradient(180deg, rgba(3,8,15,0.08), rgba(3,8,15,0.4) 44%, rgba(3,8,15,0.82) 100%)",
  },
  ramadan: {
    palette: ["#7F77DD", "#FAC775", "#EF9F27", "#534AB7", "#EEEDFE"],
    emojis: ["🌙", "🕌", "⭐", "✨", "🪔"],
    background:
      "radial-gradient(circle at 20% 16%, rgba(250,199,117,0.18), transparent 28%), radial-gradient(circle at 82% 14%, rgba(127,119,221,0.2), transparent 26%), linear-gradient(180deg, #07050f 0%, #170d34 48%, #04020b 100%)",
    veil:
      "linear-gradient(180deg, rgba(6,4,12,0.06), rgba(6,4,12,0.4) 42%, rgba(6,4,12,0.82) 100%)",
  },
};

export const themeNames = Object.keys(themes) as ThemeName[];
