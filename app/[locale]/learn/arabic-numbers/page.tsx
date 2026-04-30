import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Arabic Numbers for Kids (1-10) | الأرقام العربية للأطفال",
  description: "Learn Arabic numbers 1 to 10 with pronunciation, English equivalents, and fun facts. A complete guide for kids and parents learning Arabic numerals.",
};

const numbers = [
  { ar: "١", arWord: "واحد", en: "1", enWord: "One", enPron: "Waahid", fact: "The Arabic numeral system (0-9) that the whole world uses today was originally developed by Arab mathematicians." },
  { ar: "٢", arWord: "اثنان", en: "2", enWord: "Two", enPron: "Ithnaan", fact: "In Arabic, the number 2 has a special grammatical form called the 'dual' — unique among world languages." },
  { ar: "٣", arWord: "ثلاثة", en: "3", enWord: "Three", enPron: "Thalaatha", fact: "The Arabic word for 3 starts with the letter ث (Tha), which makes the 'th' sound." },
  { ar: "٤", arWord: "أربعة", en: "4", enWord: "Four", enPron: "Arba'a", fact: "The word for 4 in Arabic contains the letter ع (Ain), one of the unique Arabic sounds." },
  { ar: "٥", arWord: "خمسة", en: "5", enWord: "Five", enPron: "Khamsa", fact: "The 'Khamsa' (hand with 5 fingers) is a famous symbol in Arab culture representing protection." },
  { ar: "٦", arWord: "ستة", en: "6", enWord: "Six", enPron: "Sitta", fact: "Arabic numbers are written left-to-right, even though Arabic text is written right-to-left!" },
  { ar: "٧", arWord: "سبعة", en: "7", enWord: "Seven", enPron: "Sab'a", fact: "The number 7 is considered special in many Arab traditions and appears frequently in the Quran." },
  { ar: "٨", arWord: "ثمانية", en: "8", enWord: "Eight", enPron: "Thamaaniya", fact: "The Arabic word for 8 is one of the longer number words, with 6 letters." },
  { ar: "٩", arWord: "تسعة", en: "9", enWord: "Nine", enPron: "Tis'a", fact: "The Eastern Arabic numeral ٩ looks quite different from the Western Arabic 9 we use in English." },
  { ar: "١٠", arWord: "عشرة", en: "10", enWord: "Ten", enPron: "Ashara", fact: "After 10, Arabic numbers combine — 11 is أحد عشر (ahada ashar), literally 'one ten'." },
];

export default async function ArabicNumbersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "الأرقام العربية للأطفال (١-١٠)" : "Arabic Numbers for Kids (1-10)"}
      </h1>
      <p className="text-sm text-white/50 mb-8">
        {isAr ? "تعلم الأرقام العربية من ١ إلى ١٠ مع النطق والحقائق الممتعة" : "Learn to count in Arabic with pronunciation and fun facts"}
      </p>

      <div className="text-sm leading-relaxed text-white/70 mb-8 space-y-3">
        <p>
          {isAr
            ? "الأرقام العربية هي من أهم الأشياء التي يمكن أن يتعلمها طفلك مبكراً. النظام العددي العربي (٠-٩) هو الأساس الذي يستخدمه العالم بأسره اليوم. في هذا الدليل، سنتعلم الأرقام من ١ إلى ١٠ بالعربية مع النطق الصحيح وحقائق ممتعة لكل رقم."
            : "Arabic numbers are one of the most important things your child can learn early. The Arabic numeral system (0-9) is the foundation used by the entire world today. In this guide, we'll learn numbers 1 through 10 in Arabic with correct pronunciation and fun facts for each number."}
        </p>
        <p>
          {isAr
            ? "ملاحظة مهمة: الأرقام التي نستخدمها في الإنجليزية (1, 2, 3...) تُسمى 'الأرقام العربية الغربية' لأنها جاءت أصلاً من العالم العربي. الأرقام المستخدمة في النصوص العربية (١، ٢، ٣...) تُسمى 'الأرقام العربية الشرقية'."
            : "Important note: The numerals we use in English (1, 2, 3...) are called 'Western Arabic numerals' because they originally came from the Arab world. The numerals used in Arabic text (١، ٢، ٣...) are called 'Eastern Arabic numerals'."}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {numbers.map((n) => (
          <div key={n.en} className="rounded-xl border border-white/8 bg-white/5 p-5">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-accent">{n.ar}</span>
                <span className="text-2xl text-white/30">/</span>
                <span className="text-3xl font-bold text-white/80">{n.en}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="text-base font-semibold text-white">{isAr ? n.arWord : n.enWord}</span>
              <span className="text-white/40 mx-2">—</span>
              <span className="text-sm text-white/60">{isAr ? n.enWord : n.arWord}</span>
              <span className="text-white/30 mx-2">·</span>
              <span className="text-xs text-accent/70 italic">{n.enPron}</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">{n.fact}</p>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">
          {isAr ? "نصائح لتعليم الأرقام" : "Tips for Teaching Numbers"}
        </h2>
        <div className="space-y-2 text-sm text-white/70 leading-relaxed">
          <p>{isAr ? "• عدّ الأشياء اليومية بالعربية — أصابع، فواكه، ألعاب" : "• Count everyday objects in Arabic — fingers, fruits, toys"}</p>
          <p>{isAr ? "• غنّ أغاني العد بالعربية مع طفلك" : "• Sing counting songs in Arabic with your child"}</p>
          <p>{isAr ? "• استخدم الأرقام في الروتين اليومي — 'أعطني ٣ تفاحات'" : "• Use numbers in daily routines — 'give me 3 apples'"}</p>
          <p>{isAr ? "• اجعل العد لعبة — من يستطيع العد إلى ١٠ أسرع؟" : "• Make counting a game — who can count to 10 fastest?"}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-xs text-accent underline">
          {isAr ? "← دليل الأبجدية العربية" : "← Arabic Alphabet Guide"}
        </Link>
        <Link href={`/${locale}/learn/arabic-colors`} className="text-xs text-accent underline">
          {isAr ? "الألوان بالعربية →" : "Arabic Colors →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "تدرب في عرب فنجرز" : "Practice in ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
