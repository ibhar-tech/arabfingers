import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { PageLayout } from "@/components/PageLayout";
import { RelatedArticles } from "@/components/RelatedArticles";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { letterGuide } from "@/lib/letterGuide";
import { isLocale } from "@/lib/locales";
import { getRelatedArticles } from "@/lib/related";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

const PATH = "/learn/arabic-alphabet-for-adults";
const PUBLISHED = "2026-11-08";
const NASKH = { fontFamily: "var(--font-noto-naskh), sans-serif" };

// Letters that share a body and differ mainly in their dots.
const SHAPE_GROUPS = ["ب ت ث", "ج ح خ", "د ذ", "ر ز", "س ش", "ص ض", "ط ظ", "ع غ", "ف ق"];
const groupedLetters = SHAPE_GROUPS.join(" ").split(" ").length;
const hardLetters = letterGuide.filter((l) => l.difficulty === "hard").length;
const DIFFICULTY = {
  easy: { en: "Easy", ar: "سهل" },
  medium: { en: "Medium", ar: "متوسط" },
  hard: { en: "Hard", ar: "صعب" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, PATH, {
    titleEn: "Arabic Alphabet for Adult Beginners: What to Learn First",
    titleAr: "الحروف العربية للكبار المبتدئين: بماذا تبدأ؟",
    descriptionEn: `Learning Arabic as an adult? The ${letterGuide.length} letters, the shape groups that make them easier, a simple study order and a free handwriting workbook for adults.`,
    descriptionAr: `تتعلّم الكتابة العربية في الكبر؟ الحروف الـ${letterGuide.length}، والمجموعات التي تسهّل حفظها، وترتيب بسيط للدراسة، وكرّاسة خطّ مجانية للكبار.`,
    ogType: "article",
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    keywords: [
      "arabic alphabet for adults",
      "learn arabic alphabet adult beginners",
      "arabic writing worksheets for adults",
      "تعلم الحروف العربية للكبار",
      "تحسين الخط العربي للكبار",
    ],
  });
}

export default async function ArabicAlphabetForAdultsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const total = letterGuide.length;

  const faq = [
    {
      q: tt("How long does it take an adult to learn the Arabic alphabet?", "كم يحتاج الكبير ليتعلّم الحروف العربية؟"),
      a: tt(
        "It depends on how regularly you practise. At one page a day, the letter pages in the workbook take a week, but that is a first pass. Expect several more weeks of short, regular practice before recognising the letters feels easy.",
        "يتوقّف ذلك على انتظامك. بصفحة في اليوم تنهي صفحات الحروف في الكرّاسة في أسبوع، لكنّها جولة أولى فقط، وستحتاج بعدها إلى أسابيع من التدرّب القصير المنتظم حتى يسهل عليك تمييز الحروف.",
      ),
    },
    {
      q: tt("Is the Arabic alphabet hard for English speakers?", "هل الحروف العربية صعبة على الناطقين بالإنجليزية؟"),
      a: tt(
        `The writing is more approachable than it looks, because ${groupedLetters} of the ${total} letters fall into ${SHAPE_GROUPS.length} shape groups. The harder part is sound: ${hardLetters} letters have no close English equivalent and need listening and practice.`,
        `الكتابة أيسر ممّا تبدو، لأنّ ${groupedLetters} حرفاً من الـ${total} تقع في ${SHAPE_GROUPS.length} مجموعات متشابهة الشكل. أمّا الأصعب فهو النطق: ${hardLetters} حروف لا نظير قريباً لها في الإنجليزية.`,
      ),
    },
    {
      q: tt("Should I learn to read Arabic or speak it first?", "هل أبدأ بالقراءة أم بالمحادثة؟"),
      a: tt(
        "It depends on your goal. Learn the script first if you want to read, write or study the language. If you only want everyday conversation, you can start with spoken phrases in one dialect, though the script still helps with pronunciation.",
        "يتوقّف ذلك على هدفك. ابدأ بالكتابة إن أردت القراءة والدراسة. وإن كان هدفك الحديث اليومي فقط، فيمكنك البدء بعبارات منطوقة بلهجة واحدة، مع أنّ معرفة الحروف تعين على النطق.",
      ),
    },
    {
      q: tt("Is the alphabet the same in every Arabic dialect?", "هل الحروف نفسها في كلّ اللهجات؟"),
      a: tt(
        "Yes. Dialects differ in vocabulary and pronunciation, but the same alphabet is used to write Arabic across the Arab world, so the letters you learn here carry over.",
        "نعم. تختلف اللهجات في المفردات والنطق، لكنّ الحروف نفسها تُستعمل في كتابة العربية في أنحاء العالم العربي.",
      ),
    },
  ];

  const steps = [
    tt(`Learn the names and shapes in the table below, one shape group at a time.`, "احفظ أسماء الحروف وأشكالها من الجدول أدناه، مجموعة بعد مجموعة."),
    tt("Write each letter in its four forms. The workbook's letter pages cover four letters each; one page a day takes about ten minutes.", "اكتب كلّ حرف بأشكاله الأربعة. تضمّ كلّ صفحة حروف في الكرّاسة أربعة أحرف، وتحتاج الصفحة إلى نحو عشر دقائق في اليوم."),
    tt("Learn the six letters that never join to the next letter: ا د ذ ر ز و.", "احفظ الحروف الستّة التي لا تتّصل بما بعدها: ا د ذ ر ز و."),
    tt("Add the three short vowels: fatha (بَ ba), damma (بُ bu) and kasra (بِ bi). Everyday Arabic usually leaves them out, but learner texts show them.", "أضف الحركات الثلاث: الفتحة (بَ) والضمّة (بُ) والكسرة (بِ). وغالباً ما تُحذف في الكتابة اليومية، لكنّها تظهر في نصوص المتعلّمين."),
    tt("Read and write whole words, starting with common ones such as سلام (salaam, peace) and كتاب (kitaab, book).", "اقرأ كلمات كاملة واكتبها، وابدأ بكلمات شائعة مثل سلام وكتاب."),
    tt("Work on the sounds English does not have. Do this alongside the writing and keep at it; it takes longer than the shapes.", "اعتنِ بمخارج الحروف الصعبة بالتوازي مع الكتابة، فإتقانها يستغرق وقتاً أطول من حفظ الأشكال."),
  ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={tt("Arabic Alphabet for Adult Beginners", "الحروف العربية للكبار المبتدئين")}
        description={tt("What adults should learn first when starting the Arabic script, and how to practise it.", "بماذا يبدأ الكبير حين يتعلّم الكتابة العربية، وكيف يتدرّب عليها.")}
        slug="learn/arabic-alphabet-for-adults"
        datePublished={PUBLISHED}
        dateModified={PUBLISHED}
        section="Education"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("Alphabet for Adults", "الحروف للكبار") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">{tt("Arabic Alphabet for Adult Beginners", "الحروف العربية للكبار المبتدئين")}</h1>
      <p className="text-base text-ink/75 mb-8">
        {tt("What to learn first, in what order, and how to practise on paper.", "بماذا تبدأ، وبأيّ ترتيب، وكيف تتدرّب على الورق.")}
      </p>

      <div className="space-y-8 text-base leading-relaxed text-ink/80 mb-10">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("What makes the script different", "ما الذي يميّز الكتابة العربية")}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{tt(`It has ${total} letters, written from right to left, with no capitals.`, `فيها ${total} حرفاً تُكتب من اليمين إلى اليسار، ولا حروف كبيرة فيها.`)}</li>
            <li>{tt("It is joined writing, so most letters change shape depending on their place in a word.", "وهي كتابة متّصلة، فيتغيّر شكل معظم الحروف بحسب موضعها في الكلمة.")}</li>
            <li>{tt("Short vowels are usually not written. Long vowels are written with ا و ي.", "والحركات القصيرة لا تُكتب غالباً، أمّا الطويلة فتُكتب بالألف والواو والياء.")}</li>
            <li>{tt(`${hardLetters} letters have no close English equivalent.`, `و${hardLetters} حروف لا نظير قريباً لها في الإنجليزية.`)}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("Learn the letters in shape groups", "احفظ الحروف في مجموعات")}</h2>
          <p className="mb-4">
            {tt(
              `${groupedLetters} of the ${total} letters fall into ${SHAPE_GROUPS.length} groups that share a basic shape and differ mainly in their dots. Learning them together is less to remember than going through the alphabet one letter at a time.`,
              `${groupedLetters} حرفاً من الـ${total} تقع في ${SHAPE_GROUPS.length} مجموعات متشابهة الشكل، يفرّق بينها النقط في الغالب. وحفظها معاً أيسر من المرور على الحروف واحداً واحداً.`,
            )}
          </p>
          <ul className="flex flex-wrap gap-3" dir="rtl" lang="ar">
            {SHAPE_GROUPS.map((group) => (
              <li key={group} className="rounded-xl border-2 border-ink bg-card px-4 py-2 text-2xl text-ink" style={NASKH}>{group}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("A simple order to study", "ترتيب بسيط للدراسة")}</h2>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-4">
            <Link href={`/${locale}/learn/arabic-letter-forms`} className="font-semibold underline underline-offset-4">{tt("See all four letter forms", "شاهد أشكال الحروف الأربعة")}</Link>
            {" · "}
            <Link href={`/${locale}/learn/hardest-arabic-letters`} className="font-semibold underline underline-offset-4">{tt("The hardest letters to pronounce", "أصعب الحروف نطقاً")}</Link>
          </p>
        </section>
      </div>

      <WorksheetCrossLink
        locale={locale}
        packId="arabic-handwriting-beginners"
        titleEn="Free handwriting workbook for adults"
        titleAr="كرّاسة خطّ مجانية للكبار"
        textEn="A plain PDF with no cartoons: the rules of the script, every letter in its four forms to trace and copy, and everyday words for joining practice."
        textAr="ملف PDF بسيط بلا رسوم: قواعد الكتابة، وكلّ حرف بأشكاله الأربعة للتتبّع والنسخ، وكلمات يومية للتدرّب على الوصل."
      />

      <h2 className="text-xl font-semibold text-ink mb-4">{tt(`All ${total} Arabic letters`, `الحروف العربية الـ${total}`)}</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{tt("Letter", "الحرف")}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Name", "الاسم")}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Transliteration", "النقل اللاتيني")}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Difficulty for English speakers", "الصعوبة للناطقين بالإنجليزية")}</th>
            </tr>
          </thead>
          <tbody>
            {letterGuide.map((l) => (
              <tr key={l.enName} className="border-b border-ink/10">
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={NASKH} lang="ar">{l.ar}</td>
                <td className="py-2.5 px-3 text-ink/80">{isAr ? l.arName : l.enName}</td>
                <td className="py-2.5 px-3 text-ink/80" dir="ltr">{l.translit}</td>
                <td className="py-2.5 px-3 text-ink/80">{isAr ? DIFFICULTY[l.difficulty].ar : DIFFICULTY[l.difficulty].en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FaqSection locale={locale} title={tt("Common questions", "أسئلة شائعة")} items={faq} />
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "arabic-alphabet-for-adults")} />
    </PageLayout>
  );
}
