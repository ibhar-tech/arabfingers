import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Arabic Alphabet Complete Guide | دليل الأبجدية العربية",
  description: "Learn all 28 Arabic letters with pronunciation, English equivalents, and writing tips. A complete guide for beginners and kids.",
};

const letters = [
  { ar: "ا", name: "Alef", arName: "ألف", sound: "A as in 'apple'", desc: "The first letter of the Arabic alphabet. It represents a glottal stop or a long 'a' vowel sound." },
  { ar: "ب", name: "Ba", arName: "باء", sound: "B as in 'ball'", desc: "Pronounced like the English 'B'. One of the easiest letters for children to learn." },
  { ar: "ت", name: "Ta", arName: "تاء", sound: "T as in 'table'", desc: "Similar to the English 'T'. Distinguished from ث (Tha) by having no dots above." },
  { ar: "ث", name: "Tha", arName: "ثاء", sound: "TH as in 'think'", desc: "The 'th' sound as in 'think' or 'three'. This sound doesn't exist in many languages." },
  { ar: "ج", name: "Jeem", arName: "جيم", sound: "J as in 'jump'", desc: "Pronounced like 'J' in most Arabic dialects. In Egyptian Arabic, it sounds like a hard 'G'." },
  { ar: "ح", name: "Hha", arName: "حاء", sound: "H (deep throat)", desc: "A deep, breathy 'H' sound from the throat. No exact English equivalent — unique to Arabic." },
  { ar: "خ", name: "Kha", arName: "خاء", sound: "KH (like Scottish 'loch')", desc: "A guttural sound similar to the 'ch' in Scottish 'loch' or German 'Bach'." },
  { ar: "د", name: "Dal", arName: "دال", sound: "D as in 'door'", desc: "Pronounced like the English 'D'. A simple, familiar sound for most children." },
  { ar: "ذ", name: "Thal", arName: "ذال", sound: "TH as in 'this'", desc: "The voiced 'th' sound as in 'this' or 'that'. Different from ث which is unvoiced." },
  { ar: "ر", name: "Ra", arName: "راء", sound: "R (rolled)", desc: "A rolled or trilled 'R', similar to the Spanish 'R'. Produced by vibrating the tongue tip." },
  { ar: "ز", name: "Zay", arName: "زاي", sound: "Z as in 'zoo'", desc: "Pronounced like the English 'Z'. Easy for children who speak English." },
  { ar: "س", name: "Seen", arName: "سين", sound: "S as in 'sun'", desc: "Pronounced like the English 'S'. One of the most recognizable Arabic letters." },
  { ar: "ش", name: "Sheen", arName: "شين", sound: "SH as in 'ship'", desc: "The 'sh' sound as in 'ship' or 'shoe'. Distinguished from س by three dots above." },
  { ar: "ص", name: "Sad", arName: "صاد", sound: "S (emphatic)", desc: "An emphatic 'S' sound, heavier and deeper than س. The tongue presses against the palate." },
  { ar: "ض", name: "Dad", arName: "ضاد", sound: "D (emphatic)", desc: "An emphatic 'D' unique to Arabic. Arabic is sometimes called 'the language of Dad' (لغة الضاد)." },
  { ar: "ط", name: "Tah", arName: "طاء", sound: "T (emphatic)", desc: "An emphatic 'T', heavier than ت. Produced with the tongue pressed firmly against the palate." },
  { ar: "ظ", name: "Zah", arName: "ظاء", sound: "Z (emphatic)", desc: "An emphatic version of ذ. A heavy, deep 'th' or 'z' sound." },
  { ar: "ع", name: "Ain", arName: "عين", sound: "A (deep throat)", desc: "A unique Arabic sound produced deep in the throat. No English equivalent — one of the hardest for non-native speakers." },
  { ar: "غ", name: "Ghain", arName: "غين", sound: "GH (like French R)", desc: "Similar to the French 'R' or a gargling sound. Produced in the back of the throat." },
  { ar: "ف", name: "Fa", arName: "فاء", sound: "F as in 'fish'", desc: "Pronounced like the English 'F'. Simple and familiar for most children." },
  { ar: "ق", name: "Qaf", arName: "قاف", sound: "Q (deep K)", desc: "A deep 'K' sound produced at the back of the throat. Deeper than the English 'K'." },
  { ar: "ك", name: "Kaf", arName: "كاف", sound: "K as in 'kite'", desc: "Pronounced like the English 'K'. Lighter than ق." },
  { ar: "ل", name: "Lam", arName: "لام", sound: "L as in 'lamp'", desc: "Pronounced like the English 'L'. Appears in many common Arabic words." },
  { ar: "م", name: "Meem", arName: "ميم", sound: "M as in 'moon'", desc: "Pronounced like the English 'M'. One of the first sounds babies make." },
  { ar: "ن", name: "Noon", arName: "نون", sound: "N as in 'noon'", desc: "Pronounced like the English 'N'. Easy and familiar for all children." },
  { ar: "ه", name: "Ha", arName: "هاء", sound: "H as in 'hat'", desc: "A light 'H' sound, like the English 'H'. Lighter than ح." },
  { ar: "و", name: "Waw", arName: "واو", sound: "W as in 'water'", desc: "Pronounced like the English 'W'. Also serves as a long 'oo' vowel." },
  { ar: "ي", name: "Ya", arName: "ياء", sound: "Y as in 'yes'", desc: "Pronounced like the English 'Y'. Also serves as a long 'ee' vowel. The last letter of the alphabet." },
];

export default async function ArabicAlphabetGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "دليل الأبجدية العربية الكامل" : "The Arabic Alphabet: A Complete Guide"}
      </h1>
      <p className="text-sm text-white/50 mb-8">
        {isAr ? "تعلم جميع الحروف العربية الـ ٢٨ مع النطق والأمثلة" : "Learn all 28 Arabic letters with pronunciation and examples"}
      </p>

      <div className="text-sm leading-relaxed text-white/70 mb-8 space-y-3">
        <p>
          {isAr
            ? "الأبجدية العربية هي واحدة من أكثر أنظمة الكتابة استخداماً في العالم. تتكون من ٢٨ حرفاً تُكتب من اليمين إلى اليسار. على عكس الأبجدية اللاتينية، تتغير أشكال الحروف العربية حسب موقعها في الكلمة — بداية أو وسط أو نهاية."
            : "The Arabic alphabet is one of the most widely used writing systems in the world. It consists of 28 letters written from right to left. Unlike the Latin alphabet, Arabic letter shapes change depending on their position in a word — beginning, middle, or end."}
        </p>
        <p>
          {isAr
            ? "في هذا الدليل، سنستعرض كل حرف بشكله المنفصل — وهو الشكل الأساسي الذي يتعلمه الأطفال أولاً. هذا هو نفس الشكل الذي يعرضه تطبيق عرب فنجرز عندما يضغط طفلك على المفاتيح."
            : "In this guide, we'll cover each letter in its isolated form — the basic shape that children learn first. This is the same form that ArabFingers displays when your child presses keys."}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {letters.map((l, i) => (
          <div key={l.ar} className="rounded-xl border border-white/8 bg-white/5 p-4 flex gap-4 items-start">
            <div className="shrink-0 flex flex-col items-center w-16">
              <span className="text-4xl text-white" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.ar}</span>
              <span className="text-[10px] text-white/30 mt-1">#{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">
                {isAr ? l.arName : l.name} <span className="text-white/40 font-normal">— {l.sound}</span>
              </h3>
              <p className="text-xs text-white/55 leading-relaxed mt-1">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105"
        >
          🚀 {isAr ? "تدرب على الحروف في عرب فنجرز" : "Practice Letters in ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
