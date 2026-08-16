export type HeroLetter = {
  id: string;
  ar: string;
  en: string;
  name: string;
  nameAr: string;
  color: string;
  secondaryColor: string;
  tint: string;
  dots: {
    count: number;
    position: "above" | "below" | "center" | "none";
  };
};

export const HERO_LETTERS: HeroLetter[] = [
  { id: "alef", ar: "أ", en: "A", name: "Alef", nameAr: "ألف", color: "#FFB22E", secondaryColor: "#F4607D", tint: "bg-saffron-soft", dots: { count: 1, position: "above" } },
  { id: "ba", ar: "ب", en: "B", name: "Ba", nameAr: "باء", color: "#0F8C8C", secondaryColor: "#FFB22E", tint: "bg-qalam-soft", dots: { count: 1, position: "below" } },
  { id: "ta", ar: "ت", en: "T", name: "Ta", nameAr: "تاء", color: "#F4607D", secondaryColor: "#FFB22E", tint: "bg-rose-soft", dots: { count: 2, position: "above" } },
  { id: "tha", ar: "ث", en: "TH", name: "Tha", nameAr: "ثاء", color: "#8B5CF6", secondaryColor: "#38BDF8", tint: "bg-purple-100", dots: { count: 3, position: "above" } },
  { id: "jeem", ar: "ج", en: "J", name: "Jeem", nameAr: "جيم", color: "#FFB22E", secondaryColor: "#0F8C8C", tint: "bg-saffron-soft", dots: { count: 1, position: "center" } },
  { id: "hha", ar: "ح", en: "H", name: "Hha", nameAr: "حاء", color: "#0F8C8C", secondaryColor: "#F4607D", tint: "bg-qalam-soft", dots: { count: 0, position: "none" } },
  { id: "kha", ar: "خ", en: "KH", name: "Kha", nameAr: "خاء", color: "#EC4899", secondaryColor: "#FFB22E", tint: "bg-pink-100", dots: { count: 1, position: "above" } },
  { id: "dal", ar: "د", en: "D", name: "Dal", nameAr: "دال", color: "#3B82F6", secondaryColor: "#F4607D", tint: "bg-blue-100", dots: { count: 0, position: "none" } },
  { id: "thal", ar: "ذ", en: "DH", name: "Thal", nameAr: "ذال", color: "#8B5CF6", secondaryColor: "#FFB22E", tint: "bg-purple-100", dots: { count: 1, position: "above" } },
  { id: "ra", ar: "ر", en: "R", name: "Ra", nameAr: "راء", color: "#10B981", secondaryColor: "#FFB22E", tint: "bg-emerald-100", dots: { count: 0, position: "none" } },
  { id: "zay", ar: "ز", en: "Z", name: "Zay", nameAr: "زاي", color: "#F59E0B", secondaryColor: "#0F8C8C", tint: "bg-amber-100", dots: { count: 1, position: "above" } },
  { id: "seen", ar: "س", en: "S", name: "Seen", nameAr: "سين", color: "#F4607D", secondaryColor: "#0F8C8C", tint: "bg-rose-soft", dots: { count: 0, position: "none" } },
  { id: "sheen", ar: "ش", en: "SH", name: "Sheen", nameAr: "شين", color: "#0F8C8C", secondaryColor: "#F4607D", tint: "bg-qalam-soft", dots: { count: 3, position: "above" } },
  { id: "sad", ar: "ص", en: "S", name: "Sad", nameAr: "صاد", color: "#FFB22E", secondaryColor: "#8B5CF6", tint: "bg-saffron-soft", dots: { count: 0, position: "none" } },
  { id: "dad", ar: "ض", en: "D", name: "Dad", nameAr: "ضاد", color: "#6366F1", secondaryColor: "#FFB22E", tint: "bg-indigo-100", dots: { count: 1, position: "above" } },
  { id: "tah", ar: "ط", en: "T", name: "Tah", nameAr: "طاء", color: "#14B8A6", secondaryColor: "#F4607D", tint: "bg-teal-100", dots: { count: 0, position: "none" } },
  { id: "zah", ar: "ظ", en: "Z", name: "Zah", nameAr: "ظاء", color: "#EC4899", secondaryColor: "#FFB22E", tint: "bg-pink-100", dots: { count: 1, position: "above" } },
  { id: "ain", ar: "ع", en: "A'", name: "Ain", nameAr: "عين", color: "#3B82F6", secondaryColor: "#F59E0B", tint: "bg-blue-100", dots: { count: 0, position: "none" } },
  { id: "ghain", ar: "غ", en: "GH", name: "Ghain", nameAr: "غين", color: "#8B5CF6", secondaryColor: "#10B981", tint: "bg-purple-100", dots: { count: 1, position: "above" } },
  { id: "fa", ar: "ف", en: "F", name: "Fa", nameAr: "فاء", color: "#F4607D", secondaryColor: "#0F8C8C", tint: "bg-rose-soft", dots: { count: 1, position: "above" } },
  { id: "qaf", ar: "ق", en: "Q", name: "Qaf", nameAr: "قاف", color: "#0F8C8C", secondaryColor: "#FFB22E", tint: "bg-qalam-soft", dots: { count: 2, position: "above" } },
  { id: "kaf", ar: "ك", en: "K", name: "Kaf", nameAr: "كاف", color: "#FFB22E", secondaryColor: "#3B82F6", tint: "bg-saffron-soft", dots: { count: 1, position: "center" } },
  { id: "lam", ar: "ل", en: "L", name: "Lam", nameAr: "لام", color: "#10B981", secondaryColor: "#F4607D", tint: "bg-emerald-100", dots: { count: 0, position: "none" } },
  { id: "meem", ar: "م", en: "M", name: "Meem", nameAr: "ميم", color: "#F59E0B", secondaryColor: "#8B5CF6", tint: "bg-amber-100", dots: { count: 0, position: "none" } },
  { id: "noon", ar: "ن", en: "N", name: "Noon", nameAr: "نون", color: "#EC4899", secondaryColor: "#0F8C8C", tint: "bg-pink-100", dots: { count: 1, position: "above" } },
  { id: "ha", ar: "هـ", en: "H", name: "Ha", nameAr: "هاء", color: "#6366F1", secondaryColor: "#FFB22E", tint: "bg-indigo-100", dots: { count: 0, position: "none" } },
  { id: "waw", ar: "و", en: "W", name: "Waw", nameAr: "واو", color: "#0F8C8C", secondaryColor: "#F4607D", tint: "bg-qalam-soft", dots: { count: 0, position: "none" } },
  { id: "ya", ar: "ي", en: "Y", name: "Ya", nameAr: "ياء", color: "#F4607D", secondaryColor: "#FFB22E", tint: "bg-rose-soft", dots: { count: 2, position: "below" } },
];
