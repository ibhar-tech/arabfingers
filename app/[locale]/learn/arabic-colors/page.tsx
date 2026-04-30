import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Arabic Colors for Kids | الألوان بالعربية للأطفال",
  description: "Learn colors in Arabic with pronunciation and visual examples. A fun guide for kids learning Arabic vocabulary with English translations.",
};

const colors = [
  { ar: "أحمر", en: "Red", pron: "Ahmar", hex: "#EF4444", desc: "The color of strawberries, fire trucks, and hearts. One of the first colors children learn to recognize." },
  { ar: "أزرق", en: "Blue", pron: "Azraq", hex: "#3B82F6", desc: "The color of the sky and the sea. Arabic has different words for light blue (سماوي) and dark blue (كحلي)." },
  { ar: "أخضر", en: "Green", pron: "Akhdar", hex: "#22C55E", desc: "The color of nature, trees, and grass. Green holds special significance in Arab and Islamic culture." },
  { ar: "أصفر", en: "Yellow", pron: "Asfar", hex: "#EAB308", desc: "The color of the sun, bananas, and desert sand. A bright, cheerful color that children love." },
  { ar: "برتقالي", en: "Orange", pron: "Burtuqaali", hex: "#F97316", desc: "Named after the fruit! The Arabic word for orange (the fruit) is برتقال, and the color takes the same name." },
  { ar: "بنفسجي", en: "Purple", pron: "Banafsaji", hex: "#A855F7", desc: "Named after the violet flower (بنفسج). A royal color associated with luxury in many cultures." },
  { ar: "وردي", en: "Pink", pron: "Wardi", hex: "#EC4899", desc: "Derived from ورد (ward) meaning 'rose'. Literally means 'rose-colored' in Arabic." },
  { ar: "أبيض", en: "White", pron: "Abyad", hex: "#F8FAFC", desc: "The color of clouds, snow, and milk. In Arabic culture, white symbolizes purity and peace." },
  { ar: "أسود", en: "Black", pron: "Aswad", hex: "#1E293B", desc: "The color of night and the pupil of the eye. The Arabic word for pupil is إنسان العين (the person of the eye)." },
  { ar: "بني", en: "Brown", pron: "Bunni", hex: "#92400E", desc: "The color of chocolate, coffee, and earth. Derived from بن (bunn) meaning 'coffee beans'." },
  { ar: "رمادي", en: "Gray", pron: "Ramaadi", hex: "#6B7280", desc: "The color of clouds on a rainy day and elephants. Derived from رماد (ramaad) meaning 'ash'." },
  { ar: "ذهبي", en: "Gold", pron: "Dhahabi", hex: "#D97706", desc: "The color of gold and treasure. Derived from ذهب (dhahab) meaning 'gold' — one of the most beautiful Arabic words." },
];

export default async function ArabicColorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "الألوان بالعربية للأطفال" : "Arabic Colors for Kids"}
      </h1>
      <p className="text-sm text-white/50 mb-8">
        {isAr ? "تعلم أسماء الألوان بالعربية مع النطق والأمثلة" : "Learn color names in Arabic with pronunciation and examples"}
      </p>

      <div className="text-sm leading-relaxed text-white/70 mb-8 space-y-3">
        <p>
          {isAr
            ? "تعلم الألوان هو من أوائل المهارات اللغوية التي يكتسبها الأطفال. الألوان موجودة في كل مكان — في الطعام والملابس والطبيعة والألعاب. تعليم طفلك أسماء الألوان بالعربية يفتح باباً واسعاً لبناء المفردات، لأن الألوان تُستخدم لوصف كل شيء تقريباً."
            : "Learning colors is one of the first vocabulary skills children acquire. Colors are everywhere — in food, clothes, nature, and toys. Teaching your child color names in Arabic opens a wide door to vocabulary building, because colors are used to describe almost everything."}
        </p>
        <p>
          {isAr
            ? "في العربية، تتغير أسماء الألوان حسب جنس الاسم الموصوف (مذكر أو مؤنث). الأسماء المذكورة هنا هي الشكل المذكر الأساسي الذي يتعلمه الأطفال أولاً."
            : "In Arabic, color names change based on the gender of the noun they describe (masculine or feminine). The names listed here are the basic masculine form that children learn first."}
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {colors.map((c) => (
          <div key={c.en} className="rounded-xl border border-white/8 bg-white/5 p-4 flex gap-4 items-start">
            <div
              className="shrink-0 w-14 h-14 rounded-xl border border-white/10"
              style={{ backgroundColor: c.hex }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                  {c.ar}
                </span>
                <span className="text-white/30">—</span>
                <span className="text-sm text-white/70">{c.en}</span>
                <span className="text-xs text-accent/60 italic">({c.pron})</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">
          {isAr ? "أنشطة ممتعة لتعلم الألوان" : "Fun Activities to Learn Colors"}
        </h2>
        <div className="space-y-3 text-sm text-white/70 leading-relaxed">
          <div className="rounded-xl border border-white/8 bg-white/5 p-4">
            <h3 className="font-semibold text-white mb-1">{isAr ? "🎨 لعبة 'أنا أرى'" : "🎨 'I Spy' Game"}</h3>
            <p className="text-white/60">{isAr ? "قل 'أنا أرى شيئاً أحمر!' ودع طفلك يبحث عن أشياء حمراء في الغرفة." : "Say 'I spy something ahmar (red)!' and let your child find red objects in the room."}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/5 p-4">
            <h3 className="font-semibold text-white mb-1">{isAr ? "🖍️ التلوين بالعربية" : "🖍️ Coloring in Arabic"}</h3>
            <p className="text-white/60">{isAr ? "أثناء التلوين، سمّ كل لون بالعربية. 'هيا نستخدم الأزرق للسماء!'" : "While coloring, name each color in Arabic. 'Let's use azraq for the sky!'"}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/5 p-4">
            <h3 className="font-semibold text-white mb-1">{isAr ? "🍎 ألوان الطعام" : "🍎 Food Colors"}</h3>
            <p className="text-white/60">{isAr ? "أثناء الوجبات، تحدث عن ألوان الطعام بالعربية. 'الموز أصفر! التفاحة حمراء!'" : "During meals, talk about food colors in Arabic. 'The banana is asfar! The apple is ahmar!'"}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-numbers`} className="text-xs text-accent underline">
          {isAr ? "← الأرقام العربية" : "← Arabic Numbers"}
        </Link>
        <Link href={`/${locale}/learn/first-arabic-words`} className="text-xs text-accent underline">
          {isAr ? "أول كلمات عربية →" : "First Arabic Words →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "العب في عرب فنجرز" : "Play ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
