import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Learn Arabic — Guides & Resources | تعلم العربية",
  description:
    "Free Arabic learning resources for kids and parents. Alphabet guides, pronunciation tips, numbers, colors, first words, and teaching strategies for bilingual families.",
};

const articles = [
  {
    slug: "arabic-alphabet-guide",
    icon: "📖",
    titleEn: "Arabic Alphabet Complete Guide",
    titleAr: "دليل الأبجدية العربية الكامل",
    descEn: "Learn all 28 Arabic letters with pronunciation, English equivalents, and descriptions.",
    descAr: "تعلم جميع الحروف العربية الـ ٢٨ مع النطق والمعادلات الإنجليزية.",
  },
  {
    slug: "teaching-arabic-to-kids",
    icon: "👶",
    titleEn: "Teaching Arabic to Kids: A Parent's Guide",
    titleAr: "تعليم العربية للأطفال: دليل الوالدين",
    descEn: "Practical tips and age-appropriate strategies for introducing Arabic to toddlers and pre-schoolers.",
    descAr: "نصائح عملية واستراتيجيات مناسبة لتعريف الأطفال الصغار بالعربية.",
  },
  {
    slug: "arabic-numbers",
    icon: "🔢",
    titleEn: "Arabic Numbers 0–10 for Kids",
    titleAr: "الأرقام العربية ٠–١٠ للأطفال",
    descEn: "Learn to count in Arabic with Eastern Arabic-Indic numerals used across the Arab world.",
    descAr: "تعلم العد بالعربية مع الأرقام العربية الشرقية.",
  },
  {
    slug: "arabic-colors",
    icon: "🎨",
    titleEn: "Arabic Colors for Kids",
    titleAr: "الألوان بالعربية للأطفال",
    descEn: "Learn color names in Arabic with pronunciation and cultural context.",
    descAr: "تعلم أسماء الألوان بالعربية مع النطق والسياق الثقافي.",
  },
  {
    slug: "first-arabic-words",
    icon: "💬",
    titleEn: "First Arabic Words for Kids",
    titleAr: "أول كلمات عربية للأطفال",
    descEn: "Essential Arabic vocabulary for toddlers — family, animals, food, and everyday words.",
    descAr: "مفردات عربية أساسية للأطفال — العائلة والحيوانات والطعام والكلمات اليومية.",
  },
  {
    slug: "arabic-letter-forms",
    icon: "✍️",
    titleEn: "How Arabic Letters Change Shape",
    titleAr: "كيف تتغير أشكال الحروف العربية",
    descEn: "Visual guide to Arabic letter forms — how each letter looks at the beginning, middle, and end of a word.",
    descAr: "دليل بصري لأشكال الحروف العربية — كيف يبدو كل حرف في بداية ووسط ونهاية الكلمة.",
  },
  {
    slug: "arabic-vs-english",
    icon: "🔄",
    titleEn: "Arabic vs English Alphabet: Key Differences",
    titleAr: "الأبجدية العربية مقابل الإنجليزية: الفروقات الرئيسية",
    descEn: "Side-by-side comparison of Arabic and English writing systems for parents and educators.",
    descAr: "مقارنة جنباً إلى جنب بين نظامي الكتابة العربية والإنجليزية.",
  },
  {
    slug: "best-age-to-learn-arabic",
    icon: "🧒",
    titleEn: "What's the Best Age to Start Teaching Arabic?",
    titleAr: "ما هو أفضل عمر لبدء تعليم العربية؟",
    descEn: "Research-backed guidance on when and how to introduce Arabic to children.",
    descAr: "إرشادات مدعومة بالأبحاث حول متى وكيف يتم تعريف الأطفال بالعربية.",
  },
  {
    slug: "bilingual-children-benefits",
    icon: "🌍",
    titleEn: "Benefits of Raising Bilingual Arabic-English Children",
    titleAr: "فوائد تربية أطفال ثنائيي اللغة عربي-إنجليزي",
    descEn: "Cognitive, social, and cultural benefits of bilingualism backed by child development research.",
    descAr: "الفوائد المعرفية والاجتماعية والثقافية لثنائية اللغة.",
  },
  {
    slug: "arabic-activities-at-home",
    icon: "🏠",
    titleEn: "10 Fun Activities to Practice Arabic Letters at Home",
    titleAr: "١٠ أنشطة ممتعة لممارسة الحروف العربية في المنزل",
    descEn: "Creative, screen-free and digital activities to reinforce Arabic letter learning at home.",
    descAr: "أنشطة إبداعية لتعزيز تعلم الحروف العربية في المنزل.",
  },
];

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "تعلم العربية — أدلة وموارد" : "Learn Arabic — Guides & Resources"}
      </h1>
      <p className="text-sm text-white/50 mb-8">
        {isAr
          ? "موارد مجانية لتعلم العربية للأطفال والوالدين. أدلة الأبجدية، نصائح النطق، الأرقام، الألوان، والكلمات الأولى."
          : "Free Arabic learning resources for kids and parents. Alphabet guides, pronunciation tips, numbers, colors, first words, and teaching strategies."}
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70 mb-10">
        <p>
          {isAr
            ? "تعلم اللغة العربية يبدأ بالأساسيات — الحروف والأصوات والكلمات البسيطة. سواء كنت والداً يريد تعريف طفله بالعربية أو معلماً يبحث عن موارد، فإن هذه الأدلة المجانية تغطي كل ما تحتاج لمعرفته. كل دليل متاح باللغتين العربية والإنجليزية ومصمم ليكون عملياً ومناسباً للعمر."
            : "Learning Arabic starts with the fundamentals — letters, sounds, and simple words. Whether you're a parent wanting to introduce your child to Arabic or an educator looking for resources, these free guides cover everything you need to know. Each guide is available in both Arabic and English and designed to be practical and age-appropriate."}
        </p>
        <p>
          {isAr
            ? "نوصي بالبدء بدليل الأبجدية العربية لتعلم الحروف الأساسية، ثم استخدام تطبيق عرب فنجرز للتدريب التفاعلي. الجمع بين القراءة واللعب هو أفضل طريقة للأطفال الصغار لتعلم العربية."
            : "We recommend starting with the Arabic Alphabet Guide to learn the basic letters, then using the ArabFingers app for interactive practice. Combining reading with play is the best way for young children to learn Arabic."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale}/learn/${article.slug}`}
            className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/8 hover:border-white/15"
          >
            <div className="text-2xl mb-2">{article.icon}</div>
            <h2 className="text-sm font-semibold text-white mb-1 group-hover:text-accent transition-colors">
              {isAr ? article.titleAr : article.titleEn}
            </h2>
            <p className="text-xs text-white/50 leading-relaxed">
              {isAr ? article.descAr : article.descEn}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105"
        >
          🚀 {isAr ? "جرب عرب فنجرز الآن" : "Try ArabFingers Now"}
        </Link>
      </div>
    </PageLayout>
  );
}
