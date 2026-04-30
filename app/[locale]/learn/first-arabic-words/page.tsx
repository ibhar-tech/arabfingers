import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "First Arabic Words for Kids | أول كلمات عربية للأطفال",
  description: "20 essential first Arabic words for toddlers and kids. Learn family words, animals, food, and everyday vocabulary with pronunciation.",
};

const categories = [
  {
    titleEn: "👨‍👩‍👧 Family",
    titleAr: "👨‍👩‍👧 العائلة",
    words: [
      { ar: "ماما", en: "Mama", pron: "Maama", note: "Usually the first word babies say in Arabic" },
      { ar: "بابا", en: "Papa/Dad", pron: "Baaba", note: "The second word most Arabic-speaking babies learn" },
      { ar: "أخ", en: "Brother", pron: "Akh", note: "Starts with the letter أ (Alef)" },
      { ar: "أخت", en: "Sister", pron: "Ukht", note: "Same root as 'brother' with a feminine ending" },
      { ar: "جدّو", en: "Grandpa", pron: "Jiddo", note: "An affectionate informal term" },
      { ar: "تيتا", en: "Grandma", pron: "Teeta", note: "Informal, used in Levantine Arabic" },
    ],
  },
  {
    titleEn: "🐾 Animals",
    titleAr: "🐾 الحيوانات",
    words: [
      { ar: "قطة", en: "Cat", pron: "Qitta", note: "Cats are beloved in Arab culture" },
      { ar: "كلب", en: "Dog", pron: "Kalb", note: "Starts with the letter ك (Kaf)" },
      { ar: "سمكة", en: "Fish", pron: "Samaka", note: "From the root س-م-ك" },
      { ar: "طير", en: "Bird", pron: "Tayr", note: "Starts with the emphatic letter ط (Tah)" },
      { ar: "أرنب", en: "Rabbit", pron: "Arnab", note: "Often used to teach the letter أ" },
    ],
  },
  {
    titleEn: "🍎 Food",
    titleAr: "🍎 الطعام",
    words: [
      { ar: "ماء", en: "Water", pron: "Maa'", note: "One of the most important words to learn" },
      { ar: "حليب", en: "Milk", pron: "Haleeb", note: "Starts with ح (Hha)" },
      { ar: "تفاحة", en: "Apple", pron: "Tuffaaha", note: "Starts with ت (Ta)" },
      { ar: "موز", en: "Banana", pron: "Mawz", note: "Short and easy to remember" },
      { ar: "خبز", en: "Bread", pron: "Khubz", note: "A staple food in Arab culture" },
    ],
  },
  {
    titleEn: "💬 Everyday Words",
    titleAr: "💬 كلمات يومية",
    words: [
      { ar: "نعم", en: "Yes", pron: "Na'am", note: "Formal. Kids often say 'أيوا' (aywa) informally" },
      { ar: "لا", en: "No", pron: "Laa", note: "One of the shortest and most powerful Arabic words" },
      { ar: "شكراً", en: "Thank you", pron: "Shukran", note: "Essential polite word" },
      { ar: "مرحباً", en: "Hello", pron: "Marhaba", note: "A universal Arabic greeting" },
    ],
  },
];

export default async function FirstArabicWordsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "أول ٢٠ كلمة عربية لطفلك" : "First 20 Arabic Words for Your Child"}
      </h1>
      <p className="text-sm text-white/50 mb-8">
        {isAr ? "الكلمات الأساسية التي يحتاجها كل طفل يتعلم العربية" : "Essential vocabulary every child learning Arabic needs"}
      </p>

      <div className="text-sm leading-relaxed text-white/70 mb-8 space-y-3">
        <p>
          {isAr
            ? "بعد أن يتعلم طفلك الحروف العربية، الخطوة التالية هي بناء المفردات. هذه القائمة تحتوي على ٢٠ كلمة عربية أساسية مقسمة إلى فئات يسهل على الأطفال فهمها — العائلة، الحيوانات، الطعام، والكلمات اليومية."
            : "After your child learns the Arabic letters, the next step is building vocabulary. This list contains 20 essential Arabic words organized into categories that children easily understand — family, animals, food, and everyday words."}
        </p>
        <p>
          {isAr
            ? "كل كلمة مصحوبة بالنطق الإنجليزي التقريبي وملاحظة تساعد في التذكر. حاول استخدام هذه الكلمات في الحياة اليومية مع طفلك — التكرار في السياق الطبيعي هو أفضل طريقة للتعلم."
            : "Each word comes with approximate English pronunciation and a memory tip. Try using these words in daily life with your child — repetition in natural context is the best way to learn."}
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.titleEn} className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">{isAr ? cat.titleAr : cat.titleEn}</h2>
          <div className="space-y-3">
            {cat.words.map((w) => (
              <div key={w.ar} className="rounded-xl border border-white/8 bg-white/5 p-4 flex items-start gap-4">
                <div className="shrink-0 text-center w-16">
                  <span className="text-2xl text-white font-semibold" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>
                    {w.ar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-white">{w.en}</span>
                    <span className="text-xs text-accent/60 italic">({w.pron})</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">{w.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">
          {isAr ? "كيف تعلم هذه الكلمات" : "How to Teach These Words"}
        </h2>
        <div className="space-y-2 text-sm text-white/70 leading-relaxed">
          <p>• {isAr ? "ابدأ بـ ٣-٥ كلمات فقط في الأسبوع" : "Start with just 3-5 words per week"}</p>
          <p>• {isAr ? "استخدم الكلمات في مواقف حقيقية — أشر إلى القطة وقل 'قطة!'" : "Use words in real situations — point to the cat and say 'qitta!'"}</p>
          <p>• {isAr ? "اقرأ كتب أطفال بالعربية تحتوي على هذه الكلمات" : "Read Arabic children's books that contain these words"}</p>
          <p>• {isAr ? "غنّ أغاني أطفال عربية — الموسيقى تساعد على الحفظ" : "Sing Arabic children's songs — music helps memorization"}</p>
          <p>• {isAr ? "لا تصحح — كرر الكلمة الصحيحة بلطف" : "Don't correct — gently repeat the correct word"}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-colors`} className="text-xs text-accent underline">
          {isAr ? "← الألوان بالعربية" : "← Arabic Colors"}
        </Link>
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-xs text-accent underline">
          {isAr ? "دليل الأبجدية →" : "Alphabet Guide →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "تدرب على الحروف في عرب فنجرز" : "Practice Letters in ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
