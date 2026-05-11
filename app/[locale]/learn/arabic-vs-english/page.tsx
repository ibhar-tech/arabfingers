import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Arabic vs English Alphabet: Key Differences | الأبجدية العربية مقابل الإنجليزية",
  description:
    "A side-by-side comparison of Arabic and English writing systems. Learn the key differences in direction, letter count, vowels, and script style to help your child learn both.",
};

export default async function ArabicVsEnglishPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      {isAr ? <ContentAr /> : <ContentEn />}
      <div className="text-center py-8">
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          📖 {isAr ? "تعلم الحروف العربية" : "Learn the Arabic Alphabet"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">Arabic vs English Alphabet: Key Differences</h1>
      <p className="text-sm text-white/50 mb-8">A parent-friendly comparison to help you understand both writing systems</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
          <p className="mb-3">If you&apos;re raising a bilingual child who&apos;s learning both Arabic and English, understanding the key differences between these two writing systems will help you support their learning journey. While the two alphabets are fundamentally different, knowing what those differences are makes it easier to explain them to children and anticipate common challenges.</p>
          <p>The good news: children&apos;s brains are remarkably adaptable. Research shows that children who learn two different writing systems actually develop stronger cognitive flexibility than monolingual children. The differences between Arabic and English writing are features, not bugs — they exercise different parts of the brain.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Quick Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="py-2 px-3 text-left text-white/60">Feature</th><th className="py-2 px-3 text-left text-white/60">Arabic</th><th className="py-2 px-3 text-left text-white/60">English</th></tr></thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Direction</td><td className="py-2 px-3">Right to left (RTL)</td><td className="py-2 px-3">Left to right (LTR)</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Letters</td><td className="py-2 px-3">28 letters</td><td className="py-2 px-3">26 letters</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Letter case</td><td className="py-2 px-3">No uppercase/lowercase</td><td className="py-2 px-3">Uppercase + lowercase</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Script style</td><td className="py-2 px-3">Always cursive (connected)</td><td className="py-2 px-3">Print or cursive</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Vowels</td><td className="py-2 px-3">3 long vowels + optional diacritics</td><td className="py-2 px-3">5 vowel letters (A, E, I, O, U)</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Letter forms</td><td className="py-2 px-3">Up to 4 forms per letter</td><td className="py-2 px-3">2 forms (upper/lower)</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">Dots</td><td className="py-2 px-3">Dots distinguish many letters</td><td className="py-2 px-3">Only i and j have dots</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Writing Direction: Right to Left</h2>
          <p className="mb-3">The most immediately obvious difference is that Arabic is written from right to left. This means books open from what English readers would consider the &quot;back,&quot; and text flows in the opposite direction. For bilingual children, this is rarely confusing — they naturally adapt to the direction of whichever language they&apos;re using, just as they switch between languages in speech.</p>
          <p>Interestingly, Arabic numbers are written left to right within the text, even though the surrounding text flows right to left. This is one of the quirks that children pick up naturally through exposure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Connected vs Separated Letters</h2>
          <p className="mb-3">Arabic is always written in a cursive style — letters within a word connect to each other. There is no &quot;print&quot; version of Arabic the way there is for English. This means each letter can look different depending on whether it appears at the beginning, middle, or end of a word, or stands alone.</p>
          <p>For young children learning through ArabFingers, we start with the isolated form of each letter — the basic shape. This is equivalent to learning print letters in English before learning cursive. Children naturally progress to recognizing connected forms as they encounter Arabic text in books and signs.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Vowels Work Differently</h2>
          <p className="mb-3">English has five dedicated vowel letters (A, E, I, O, U) that appear inline with consonants. Arabic handles vowels differently — it has three long vowel letters (ا for &quot;aa&quot;, و for &quot;oo&quot;, ي for &quot;ee&quot;) and uses small marks above or below consonants called diacritics to indicate short vowels.</p>
          <p className="mb-3">In everyday Arabic writing (newspapers, books, signs), short vowel diacritics are usually omitted. Readers infer the correct vowels from context, just as English readers can understand &quot;rd&quot; means &quot;read&quot; or &quot;red&quot; from context. Children&apos;s books and the Quran include full diacritics to help learners.</p>
          <p>This is actually an advantage for early learners — children using ArabFingers don&apos;t need to worry about vowels at all. They focus purely on recognizing consonant letter shapes and sounds, which is the foundation for reading.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. The Role of Dots</h2>
          <p className="mb-3">Many Arabic letters share the same basic shape and are distinguished only by the number and placement of dots. For example, ب (Ba) has one dot below, ت (Ta) has two dots above, and ث (Tha) has three dots above — but the base shape is identical. This dot system means that once a child learns one letter shape, they effectively know several related letters.</p>
          <p>In English, only the letters &quot;i&quot; and &quot;j&quot; use dots (called tittles). In Arabic, dots are a core part of the writing system — 15 of the 28 letters use dots to distinguish themselves from their dot-free counterparts.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Unique Sounds</h2>
          <p className="mb-3">Arabic contains several sounds that don&apos;t exist in English — the deep throat sounds ح (Hha), ع (Ain), and غ (Ghain), the emphatic consonants ص (Sad), ض (Dad), ط (Tah), and ظ (Zah), and the uvular ق (Qaf). These sounds are one of the beauties of Arabic and give the language its distinctive character.</p>
          <p>Young children are exceptionally good at learning unfamiliar sounds. The earlier they&apos;re exposed to Arabic pronunciation through tools like ArabFingers, the more natural these sounds will feel to them.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What This Means for Your Child</h2>
          <p className="mb-3">The differences between Arabic and English may seem daunting to adults, but children handle them naturally. A child who grows up hearing and seeing both languages treats them as two parallel systems — they don&apos;t get confused, they get cognitively stronger.</p>
          <p>The key is early, pressure-free exposure. Let your child play with Arabic letters through ArabFingers, read bilingual books together, and point out Arabic text in the environment. The familiarity they build now will pay dividends when they begin formal reading instruction.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">الأبجدية العربية مقابل الإنجليزية: الفروقات الرئيسية</h1>
      <p className="text-sm text-white/50 mb-8">مقارنة مبسطة للوالدين لفهم نظامي الكتابة</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">نظرة عامة</h2>
          <p className="mb-3">إذا كنت تربي طفلاً ثنائي اللغة يتعلم العربية والإنجليزية معاً، فإن فهم الفروقات الرئيسية بين نظامي الكتابة سيساعدك في دعم رحلة تعلمه. على الرغم من أن الأبجديتين مختلفتان جوهرياً، إلا أن معرفة هذه الاختلافات يسهّل شرحها للأطفال وتوقع التحديات الشائعة.</p>
          <p>الخبر السار: أدمغة الأطفال قابلة للتكيف بشكل مذهل. تُظهر الأبحاث أن الأطفال الذين يتعلمون نظامي كتابة مختلفين يطورون مرونة إدراكية أقوى من الأطفال أحاديي اللغة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">جدول المقارنة السريع</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="py-2 px-3 text-right text-white/60">الميزة</th><th className="py-2 px-3 text-right text-white/60">العربية</th><th className="py-2 px-3 text-right text-white/60">الإنجليزية</th></tr></thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">الاتجاه</td><td className="py-2 px-3">من اليمين لليسار</td><td className="py-2 px-3">من اليسار لليمين</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">الحروف</td><td className="py-2 px-3">٢٨ حرفاً</td><td className="py-2 px-3">٢٦ حرفاً</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">الحالة</td><td className="py-2 px-3">لا يوجد كبير/صغير</td><td className="py-2 px-3">أحرف كبيرة + صغيرة</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">نوع الخط</td><td className="py-2 px-3">دائماً متصل</td><td className="py-2 px-3">مطبوع أو متصل</td></tr>
                <tr className="border-b border-white/5"><td className="py-2 px-3 text-white/80">الحركات</td><td className="py-2 px-3">٣ حروف علة + حركات اختيارية</td><td className="py-2 px-3">٥ أحرف علة</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">١. اتجاه الكتابة: من اليمين لليسار</h2>
          <p className="mb-3">الفرق الأكثر وضوحاً هو أن العربية تُكتب من اليمين إلى اليسار. هذا يعني أن الكتب تُفتح مما يعتبره قراء الإنجليزية &quot;الخلف&quot;، والنص يتدفق في الاتجاه المعاكس. بالنسبة للأطفال ثنائيي اللغة، نادراً ما يكون هذا محيراً — فهم يتكيفون بشكل طبيعي مع اتجاه أي لغة يستخدمونها.</p>
          <p>من المثير للاهتمام أن الأرقام العربية تُكتب من اليسار إلى اليمين داخل النص، حتى لو كان النص المحيط يتدفق من اليمين إلى اليسار.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">٢. الحروف المتصلة مقابل المنفصلة</h2>
          <p className="mb-3">العربية تُكتب دائماً بأسلوب متصل — تتصل الحروف داخل الكلمة ببعضها البعض. لا يوجد نسخة &quot;مطبوعة&quot; من العربية كما هو الحال في الإنجليزية. هذا يعني أن كل حرف يمكن أن يبدو مختلفاً حسب ما إذا كان في بداية الكلمة أو وسطها أو نهايتها أو منفصلاً.</p>
          <p>في عرب فنجرز، نبدأ بالشكل المنفصل لكل حرف — الشكل الأساسي. هذا يعادل تعلم الحروف المطبوعة في الإنجليزية قبل تعلم الكتابة المتصلة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">٣. الحركات تعمل بشكل مختلف</h2>
          <p className="mb-3">الإنجليزية لديها خمسة أحرف علة مخصصة (A, E, I, O, U) تظهر بين الحروف الساكنة. العربية تتعامل مع الحركات بشكل مختلف — لديها ثلاثة أحرف علة طويلة (ا للألف الممدودة، و للواو، ي للياء) وتستخدم علامات صغيرة فوق أو تحت الحروف تسمى الحركات للإشارة إلى حروف العلة القصيرة.</p>
          <p>في الكتابة العربية اليومية (الصحف والكتب واللافتات)، عادة ما يتم حذف الحركات القصيرة. يستنتج القراء الحركات الصحيحة من السياق.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">٤. دور النقاط</h2>
          <p className="mb-3">كثير من الحروف العربية تتشارك نفس الشكل الأساسي وتتميز فقط بعدد النقاط وموضعها. على سبيل المثال، ب (باء) لديها نقطة واحدة تحت، ت (تاء) لديها نقطتان فوق، وث (ثاء) لديها ثلاث نقاط فوق — لكن الشكل الأساسي متطابق. هذا النظام يعني أنه بمجرد أن يتعلم الطفل شكل حرف واحد، فإنه يعرف فعلياً عدة حروف مرتبطة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">ماذا يعني هذا لطفلك</h2>
          <p className="mb-3">الاختلافات بين العربية والإنجليزية قد تبدو مخيفة للكبار، لكن الأطفال يتعاملون معها بشكل طبيعي. الطفل الذي ينشأ وهو يسمع ويرى كلتا اللغتين يعاملهما كنظامين متوازيين — لا يشعرون بالارتباك بل يصبحون أقوى إدراكياً.</p>
          <p>المفتاح هو التعرض المبكر بدون ضغط. دع طفلك يلعب مع الحروف العربية من خلال عرب فنجرز، واقرأوا الكتب ثنائية اللغة معاً، وأشر إلى النص العربي في البيئة المحيطة.</p>
        </section>
      </div>
    </>
  );
}
