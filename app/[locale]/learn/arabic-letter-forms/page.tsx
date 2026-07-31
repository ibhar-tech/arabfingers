import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-letter-forms", {
    titleEn: "How Arabic Letters Change Shape: All 4 Forms Explained for Parents",
    titleAr: "كيف تتغير أشكال الحروف العربية: الأشكال الأربعة بشرح مبسّط للوالدين",
    descriptionEn:
      "Why Arabic letters change shape, the six non-connecting letters, worked examples for ب ع ك showing all four forms, how shapes build into words, and practice tips.",
    descriptionAr:
      "لماذا تتغيّر أشكال الحروف العربية، والحروف الستة غير المتّصلة، وأمثلة عملية على ب وع وك بأشكالها الأربعة، وكيف تتركّب الأشكال في الكلمات، ونصائح للتدريب.",
    ogType: "article",
    publishedTime: "2026-04-02",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic letter forms", "أشكال الحروف العربية",
      "arabic connected letters", "الحروف المتصلة العربية",
      "how arabic letters change shape", "كيف تتغير الحروف العربية",
    ],
  });
}

const letterForms = [
  { name: "Alef", arName: "ألف", isolated: "ا", initial: "ا", medial: "ـا", final: "ـا" },
  { name: "Ba", arName: "باء", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" },
  { name: "Ta", arName: "تاء", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" },
  { name: "Tha", arName: "ثاء", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" },
  { name: "Jeem", arName: "جيم", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" },
  { name: "Hha", arName: "حاء", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" },
  { name: "Kha", arName: "خاء", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" },
  { name: "Dal", arName: "دال", isolated: "د", initial: "د", medial: "ـد", final: "ـد" },
  { name: "Thal", arName: "ذال", isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" },
  { name: "Ra", arName: "راء", isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" },
  { name: "Zay", arName: "زاي", isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" },
  { name: "Seen", arName: "سين", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" },
  { name: "Sheen", arName: "شين", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" },
  { name: "Sad", arName: "صاد", isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" },
  { name: "Dad", arName: "ضاد", isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" },
  { name: "Tah", arName: "طاء", isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط" },
  { name: "Zah", arName: "ظاء", isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ" },
  { name: "Ain", arName: "عين", isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" },
  { name: "Ghain", arName: "غين", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" },
  { name: "Fa", arName: "فاء", isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" },
  { name: "Qaf", arName: "قاف", isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" },
  { name: "Kaf", arName: "كاف", isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" },
  { name: "Lam", arName: "لام", isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" },
  { name: "Meem", arName: "ميم", isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" },
  { name: "Noon", arName: "نون", isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" },
  { name: "Ha", arName: "هاء", isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه" },
  { name: "Waw", arName: "واو", isolated: "و", initial: "و", medial: "ـو", final: "ـو" },
  { name: "Ya", arName: "ياء", isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" },
];

const sampleLetters = [
  {
    name: "Ba",
    arName: "باء",
    isolated: "ب",
    initial: "بـ",
    medial: "ـبـ",
    final: "ـب",
    wordAr: "بَاب",
    wordEn: "door",
    noteEn: "In بَاب (door), the first ب is initial and the last ب is final — same letter, two shapes.",
    noteAr: "في كلمة بَاب، الباء الأولى في البداية والثانية في النهاية — حرف واحد بشكلين.",
  },
  {
    name: "Ain",
    arName: "عين",
    isolated: "ع",
    initial: "عـ",
    medial: "ـعـ",
    final: "ـع",
    wordAr: "نَعَم",
    wordEn: "yes",
    noteEn: "ع changes a lot. In نَعَم (yes) it sits in the middle and takes its rounded medial shape ـعـ.",
    noteAr: "العين كثيرة التغيّر. في كلمة نَعَم تأتي في الوسط فتأخذ شكلها المستدير ـعـ.",
  },
  {
    name: "Kaf",
    arName: "كاف",
    isolated: "ك",
    initial: "كـ",
    medial: "ـكـ",
    final: "ـك",
    wordAr: "كِتَاب",
    wordEn: "book",
    noteEn: "In كِتَاب (book), ك is initial and takes the tall ـ shape كـ before joining the next letter.",
    noteAr: "في كلمة كِتَاب، الكاف في البداية فتأخذ شكلها الطويل كـ قبل أن تتّصل بما بعدها.",
  },
];

export default async function ArabicLetterFormsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="How Arabic Letters Change Shape"
        description="A visual guide to how Arabic letters change shape depending on their position in a word — isolated, initial, medial, and final."
        slug="learn/arabic-letter-forms"
        datePublished="2026-04-02"
        dateModified="2026-06-12"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "أشكال الحروف" : "Letter Forms" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "كيف تتغير أشكال الحروف العربية" : "How Arabic Letters Change Shape"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "دليل بصري لأشكال الحروف في بداية ووسط ونهاية الكلمة" : "A visual guide to letter forms at the beginning, middle, and end of words"}
      </p>

      <div className="mb-10 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-card shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/learn/learn_letter_forms.png"
          alt={isAr ? "دليل أشكال الحروف" : "Letter forms guide"}
          width={1200}
          height={630}
          className="w-full object-cover"
        />
      </div>

      <div className="space-y-6 text-base leading-relaxed text-ink/80 mb-10">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            {isAr ? "لماذا تتغير أشكال الحروف؟" : "Why Do Arabic Letters Change Shape?"}
          </h2>
          <p className="mb-3">
            {isAr
              ? "على عكس الحروف اللاتينية التي تحتفظ بنفس الشكل بغض النظر عن موقعها، تتغير الحروف العربية في شكلها حسب مكانها في الكلمة. هذا لأن الكتابة العربية هي كتابة متصلة — تتصل الحروف ببعضها البعض لتشكل كلمات، تماماً كالكتابة المتصلة في الإنجليزية."
              : "Unlike Latin letters that keep the same shape regardless of position, Arabic letters change form depending on where they appear in a word. This is because Arabic is a cursive script — letters connect to each other to form words, much like cursive handwriting in English."}
          </p>
          <p className="mb-3">
            {isAr
              ? "لكل حرف عربي حتى أربعة أشكال مختلفة: الشكل المنفصل (عندما يكون الحرف وحده)، الشكل في البداية (في بداية الكلمة)، الشكل في الوسط (بين حرفين آخرين)، والشكل في النهاية (في آخر الكلمة). لا تقلق — التغييرات عادة ما تكون بسيطة وتتبع أنماطاً يمكن التنبؤ بها."
              : "Each Arabic letter has up to four different forms: isolated (when standing alone), initial (at the beginning of a word), medial (between two other letters), and final (at the end of a word). Don't worry — the changes are usually subtle and follow predictable patterns."}
          </p>
          <p>
            {isAr
              ? "هناك صورة لطيفة يفهمها الأطفال: الحروف العربية وكأنها تمسك بأيدي بعضها. عندما يقف الحرف وحده يكون مرتاحاً بشكله الكامل، أمّا حين يأتي حرف بعده فإنه يمدّ يده ليمسك به، فيقصر طرفه قليلاً ليتّصل. لهذا يبدو الحرف في أول الكلمة أو وسطها أقصر من شكله المنفصل — إنه ببساطة يمسك بيد جاره."
              : "Here's a picture children grasp easily: Arabic letters are like friends holding hands. When a letter stands alone it relaxes into its full shape, but when another letter follows it reaches out a hand to hold on, trimming its tail a little to connect. That's why a letter at the start or middle of a word looks shorter than its isolated form — it is simply holding its neighbour's hand."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            {isAr ? "الحروف غير المتصلة" : "Non-Connecting Letters"}
          </h2>
          <p className="mb-3">
            {isAr
              ? "ستة حروف في الأبجدية العربية لا تتصل بالحرف الذي يليها. هذه الحروف هي: ا (ألف)، د (دال)، ذ (ذال)، ر (راء)، ز (زاي)، و (واو). هذه الحروف لها شكلان فقط: منفصل ونهائي. عندما يأتي أحد هذه الحروف في وسط الكلمة، فإنه يكسر الاتصال والحرف التالي يبدأ كما لو كان في بداية كلمة جديدة."
              : "Six letters in the Arabic alphabet don't connect to the letter that follows them. These letters are: ا (Alef), د (Dal), ذ (Thal), ر (Ra), ز (Zay), and و (Waw). These letters only have two forms: isolated and final. When one of these letters appears in the middle of a word, it breaks the connection and the next letter starts as if it were at the beginning of a new word."}
          </p>
          <p>
            {isAr
              ? "معرفة هذه الحروف الستة هي أسرع طريقة لتبسيط تعلم أشكال الحروف — فبدلاً من تعلم أربعة أشكال لكل حرف، تحتاج فقط لتعلم شكلين لهذه الحروف الستة."
              : "Knowing these six letters is the fastest shortcut to simplifying letter form learning — instead of learning four forms for each letter, you only need two forms for these six letters."}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">
            {isAr ? "نصائح لتعلم أشكال الحروف" : "Tips for Learning Letter Forms"}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-ink/75">
            <li><strong className="text-ink/80">{isAr ? "ابدأ بالشكل المنفصل" : "Start with isolated forms"}</strong> — {isAr ? "هذا هو ما يعلمه عرب فنجرز. بمجرد أن يتعرف طفلك على الأشكال الأساسية، سيتعرف عليها داخل الكلمات." : "This is what ArabFingers teaches. Once your child recognizes the basic shapes, they'll spot them inside words."}</li>
            <li><strong className="text-ink/80">{isAr ? "ابحث عن الأنماط" : "Look for patterns"}</strong> — {isAr ? "كثير من الحروف تتغير بنفس الطريقة. حروف مثل ب ت ث تتبع نفس النمط مع اختلاف النقاط فقط." : "Many letters change in the same way. Letters like ب ت ث follow the same pattern with only the dots changing."}</li>
            <li><strong className="text-ink/80">{isAr ? "لا تتعجل" : "Don't rush"}</strong> — {isAr ? "الأطفال يتعلمون الأشكال المنفصلة أولاً (عمر ٣-٥)، ثم الأشكال المتصلة لاحقاً (عمر ٥-٧). هذا تطور طبيعي." : "Children learn isolated forms first (ages 3-5), then connected forms later (ages 5-7). This is a natural progression."}</li>
            <li><strong className="text-ink/80">{isAr ? "استخدم كلمات حقيقية" : "Use real words"}</strong> — {isAr ? "عندما يكون طفلك مستعداً، أره كيف تبدو الحروف التي يعرفها داخل كلمات بسيطة مثل بَاب (باب) أو كِتَاب (كتاب)." : "When your child is ready, show them how letters they know look inside simple words like بَاب (door) or كِتَاب (book)."}</li>
          </ul>
        </section>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-3">
        {isAr ? "أمثلة عملية: ثلاثة حروف بأشكالها الأربعة" : "Worked Examples: Three Letters in All Four Forms"}
      </h2>
      <p className="text-base text-ink/80 leading-relaxed mb-4">
        {isAr
          ? "قبل الجدول الكامل، لنرَ ثلاثة حروف شائعة عن قرب: الباء، والعين، والكاف. لاحظ كيف يبقى \"جسم\" الحرف معروفاً في كل أشكاله، وكيف يظهر داخل كلمة بسيطة يعرفها طفلك."
            : "Before the full table, let's look closely at three common letters: Ba, Ain, and Kaf. Notice how the \"body\" of each letter stays recognizable across all its forms, and how it appears inside a simple word your child knows."}
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "الحرف" : "Letter"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "منفصل" : "Isolated"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "بداية" : "Initial"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "وسط" : "Medial"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "نهاية" : "Final"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "في كلمة" : "In a word"}</th>
            </tr>
          </thead>
          <tbody>
            {sampleLetters.map((l) => (
              <tr key={l.name} className="border-b border-ink/10 hover:bg-white/5 transition">
                <td className="py-2.5 px-3 text-start text-sm text-ink/80">{isAr ? l.arName : l.name}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.isolated}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.initial}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.medial}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.final}</td>
                <td className="py-2.5 px-3 text-center text-xl text-accent" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.wordAr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-2 mb-10">
        {sampleLetters.map((l) => (
          <p key={l.name} className="text-sm text-ink/75 leading-relaxed">
            <span className="text-accent" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.wordAr}</span>
            <span className="text-ink/65"> ({l.wordEn})</span> — {isAr ? l.noteAr : l.noteEn}
          </p>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "جميع أشكال الحروف العربية الـ ٢٨" : "All 28 Arabic Letter Forms"}
      </h2>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-2 px-3 text-left text-ink/60 font-medium">{isAr ? "الاسم" : "Name"}</th>
              <th className="py-2 px-3 text-center text-ink/60 font-medium">{isAr ? "منفصل" : "Isolated"}</th>
              <th className="py-2 px-3 text-center text-ink/60 font-medium">{isAr ? "بداية" : "Initial"}</th>
              <th className="py-2 px-3 text-center text-ink/60 font-medium">{isAr ? "وسط" : "Medial"}</th>
              <th className="py-2 px-3 text-center text-ink/60 font-medium">{isAr ? "نهاية" : "Final"}</th>
            </tr>
          </thead>
          <tbody>
            {letterForms.map((l) => (
              <tr key={l.name} className="border-b border-ink/10 hover:bg-white/5 transition">
                <td className="py-2.5 px-3 text-ink/80 text-sm">{isAr ? l.arName : l.name}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.isolated}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.initial}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.medial}</td>
                <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          🚀 {isAr ? "تدرب على الحروف في عرب فنجرز" : "Practice Letters in ArabFingers"}
        </Link>
      </div>
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "arabic-letter-forms")} />
    </PageLayout>
  );
}
