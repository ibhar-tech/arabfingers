import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { FaqSection } from "@/components/FaqSection";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { PrintablesClient } from "@/components/PrintablesClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/printables", {
    titleEn: "Free Printable Arabic Alphabet Tracing Worksheets (PDF) for Kids",
    titleAr: "أوراق عمل مجانية لتتبّع الحروف العربية للأطفال (PDF)",
    descriptionEn:
      "Free printable Arabic worksheets for kids: trace all 28 alphabet letters, plus numbers, colors, and animals. High-contrast practice sheets you can print at home — no signup.",
    descriptionAr:
      "أوراق عمل عربية مجانية للطباعة للأطفال: تتبّع الحروف الـ٢٨، مع الأرقام والألوان والحيوانات. صفحات تدريب واضحة تطبعها في البيت — بلا تسجيل.",
    keywords: [
      "arabic alphabet tracing", "arabic letter tracing worksheets pdf",
      "trace arabic alphabet", "arabic tracing letters", "تتبع الحروف العربية",
      "free arabic printables for kids", "تلوين الحروف", "أوراق عمل الحروف العربية",
      "arabic worksheets for kids", "arabic alphabet dotted tracing practice pdf",
    ],
  });
}

const printFaqEn = [
  { q: "Are these Arabic tracing worksheets really free?", a: "Yes, every worksheet is free to print with no signup, account, or payment. Just open the page, choose a set (letters, numbers, colors, or animals), and press print." },
  { q: "How do I print the Arabic alphabet worksheets?", a: "Pick the set you want, then press the print button (or Ctrl/Cmd+P). The sheets are designed in high contrast so the letters print clearly in black and white to save ink, and children can trace right on the page." },
  { q: "Can my child trace the letters on a tablet?", a: "Yes. You can print the sheets for pencil practice, or open them on a tablet and let your child trace over the letters with a stylus or finger. Printing is best for building handwriting control." },
  { q: "What ages are the Arabic worksheets for?", a: "They suit toddlers and pre-schoolers from about age 3 to 7 who are starting to recognize and write Arabic letters. Younger children can scribble over the shapes; older ones trace the dotted guides neatly." },
  { q: "What's the best way to use tracing sheets to teach the Arabic alphabet?", a: "Pair tracing with sound. Say the letter, have your child hear it in the Arab Fingers letter game, then trace it on the worksheet. Seeing, hearing, and writing the same letter together helps it stick far faster than tracing alone." },
];

const printFaqAr = [
  { q: "هل أوراق تتبّع الحروف العربية مجانية فعلاً؟", a: "نعم، كل ورقة مجانية للطباعة بلا تسجيل ولا حساب ولا دفع. افتح الصفحة، واختر مجموعة (حروف أو أرقام أو ألوان أو حيوانات)، ثمّ اضغط طباعة." },
  { q: "كيف أطبع أوراق عمل الحروف العربية؟", a: "اختر المجموعة التي تريدها ثمّ اضغط زرّ الطباعة (أو Ctrl/Cmd+P). صُمّمت الصفحات بتباين عالٍ لتظهر الحروف بوضوح بالأبيض والأسود وتوفّر الحبر، ويستطيع الطفل التتبّع عليها مباشرة." },
  { q: "هل يمكن لطفلي التتبّع على جهاز لوحي؟", a: "نعم، يمكنك طباعة الصفحات للتدريب بالقلم، أو فتحها على جهاز لوحي ليتتبّع الطفل الحروف بقلم رقمي أو بإصبعه. والطباعة أفضل لبناء التحكّم في الكتابة اليدوية." },
  { q: "ما الأعمار المناسبة لأوراق العمل العربية؟", a: "تناسب الأطفال من نحو ٣ إلى ٧ سنوات ممّن يبدؤون بتمييز الحروف العربية وكتابتها. الصغار يخربشون فوق الأشكال، والأكبر يتتبّعون الخطوط المنقّطة بإتقان." },
  { q: "ما أفضل طريقة لاستخدام أوراق التتبّع لتعليم الأبجدية؟", a: "اجمع بين التتبّع والصوت: انطق الحرف، ودع طفلك يسمعه في لعبة عرب فنجرز، ثمّ يتتبّعه على الورقة. رؤية الحرف وسماعه وكتابته معاً تثبّته أسرع بكثير من التتبّع وحده." },
];

export default async function PrintablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <PrintablesClient locale={locale} />
      <div className="print:hidden">
        <FaqSection
          locale={locale}
          title={isAr ? "أسئلة شائعة عن أوراق العمل" : "Frequently Asked Questions About the Worksheets"}
          items={isAr ? printFaqAr : printFaqEn}
        />
      </div>
    </PageLayout>
  );
}
