import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-vs-english", {
    titleEn: "Arabic vs English Alphabet: 7 Key Differences (and What Transfers)",
    titleAr: "الفرق بين الأبجدية العربية والإنجليزية: ٧ فروق وما الذي ينتقل بسهولة",
    descriptionEn:
      "A side-by-side comparison of Arabic and English writing — direction, letter count, shapes, capitals, vowels, and dots — plus what transfers easily for bilingual kids, what needs extra practice, and three myths debunked.",
    descriptionAr:
      "مقارنة بين الكتابة العربية والإنجليزية: الاتجاه وعدد الحروف وتغيّر الأشكال والحركات والنقاط، مع شرح ما الذي ينتقل بسهولة للطفل ثنائي اللغة وما يحتاج تدريباً إضافياً، وثلاث خرافات شائعة نصحّحها.",
    ogType: "article",
    publishedTime: "2026-04-09",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic vs english alphabet", "الفرق بين العربية والإنجليزية",
      "arabic writing system", "نظام الكتابة العربي",
      "bilingual reading", "القراءة ثنائية اللغة",
    ],
  });
}

export default async function ArabicVsEnglishPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Arabic vs English Alphabet: Key Differences"
        description="The key differences between the Arabic and English alphabets — direction, letter shapes, sounds, and how they connect."
        slug="learn/arabic-vs-english"
        datePublished="2026-04-09"
        dateModified="2026-06-12"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "عربي مقابل إنجليزي" : "Arabic vs English" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}
      <div className="text-center py-8">
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          📖 {isAr ? "تعلم الحروف العربية" : "Learn the Arabic Alphabet"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">Arabic vs English Alphabet: Key Differences</h1>
      <p className="text-sm text-ink/55 mb-8">A parent-friendly comparison to help you understand both writing systems</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Overview</h2>
          <p className="mb-3">If you&apos;re raising a bilingual child who&apos;s learning both Arabic and English, understanding the key differences between these two writing systems will help you support their learning journey. While the two alphabets are fundamentally different, knowing what those differences are makes it easier to explain them to children and anticipate common challenges.</p>
          <p>The good news: children&apos;s brains are remarkably adaptable. Children who learn two different writing systems develop strong cognitive flexibility, and the differences between Arabic and English writing are features, not bugs — they exercise different parts of the brain. Below you&apos;ll find a quick comparison table, the seven differences explained, what transfers easily versus what needs extra practice, three common myths, and a short FAQ.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Quick Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-ink/10"><th className="py-2 px-3 text-left text-ink/70 font-medium">Feature</th><th className="py-2 px-3 text-left text-ink/70 font-medium">Arabic</th><th className="py-2 px-3 text-left text-ink/70 font-medium">English</th></tr></thead>
              <tbody className="text-ink/75">
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Direction</td><td className="py-2 px-3">Right to left (RTL)</td><td className="py-2 px-3">Left to right (LTR)</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Letters</td><td className="py-2 px-3">28 letters</td><td className="py-2 px-3">26 letters</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Do shapes change?</td><td className="py-2 px-3">Yes — up to 4 forms per letter</td><td className="py-2 px-3">No — same shape everywhere</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Capital letters</td><td className="py-2 px-3">None</td><td className="py-2 px-3">Uppercase + lowercase</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Script style</td><td className="py-2 px-3">Always cursive (connected)</td><td className="py-2 px-3">Print or cursive</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Vowels</td><td className="py-2 px-3">3 long-vowel letters + optional marks</td><td className="py-2 px-3">5 vowel letters (A, E, I, O, U)</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">Dots</td><td className="py-2 px-3">Dots distinguish many letters</td><td className="py-2 px-3">Only i and j have dots</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">1. Writing Direction: Right to Left</h2>
          <p className="mb-3">The most immediately obvious difference is that Arabic is written from right to left. This means books open from what English readers would consider the &quot;back,&quot; and text flows in the opposite direction. For bilingual children, this is rarely confusing — they naturally adapt to the direction of whichever language they&apos;re using, just as they switch between languages in speech.</p>
          <p>Interestingly, Arabic numbers are written left to right within the text, even though the surrounding text flows right to left. This is one of the quirks that children pick up naturally through exposure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">2. Number of Letters</h2>
          <p>The Arabic alphabet has 28 letters; the English alphabet has 26. They are close in count, but they don&apos;t line up one-to-one. Some Arabic sounds simply don&apos;t exist in English, and a few English sounds (like the &quot;p&quot; and &quot;v&quot; sounds) don&apos;t exist in standard Arabic. So learning Arabic is not a matter of swapping one set of symbols for another — it&apos;s learning a new set of sounds and the shapes that carry them.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">3. Letter Shapes Change with Position</h2>
          <p className="mb-3">In English, the letter &quot;b&quot; looks the same whether it sits at the start, middle, or end of a word. In Arabic, most letters change shape depending on their position — they have an isolated form, an initial form, a medial form, and a final form. This sounds intimidating, but the forms are clearly related: they share a core skeleton and the differences are small connecting strokes.</p>
          <p>For young children learning through ArabFingers, we start with the isolated form of each letter — the basic shape. This is like learning print letters in English before learning cursive. Children naturally progress to recognizing connected forms as they meet Arabic in books and signs.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">4. No Capital Letters</h2>
          <p>English has two alphabets to learn in a sense — uppercase (A, B, C) and lowercase (a, b, c) — and rules about when to use each. Arabic has none of this. There is no uppercase or lowercase, and no capitalisation at the start of sentences or for names. For a child, that&apos;s one fewer set of rules to memorise: each Arabic letter has its forms, but no separate &quot;big&quot; version.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">5. Vowels Work Differently</h2>
          <p className="mb-3">English has five dedicated vowel letters (A, E, I, O, U) that appear inline with consonants. Arabic handles vowels differently — it has three long-vowel letters (ا for &quot;aa&quot;, و for &quot;oo&quot;, ي for &quot;ee&quot;) and uses small marks above or below consonants, called diacritics (harakat), to show short vowels.</p>
          <p className="mb-3">In everyday Arabic writing — newspapers, books, signs — short-vowel marks are usually left off. Readers infer the right vowels from context, just as English readers know &quot;rd&quot; could be &quot;read&quot; or &quot;red&quot; from context. Children&apos;s books and the Quran include full marks to help learners.</p>
          <p>This is actually an advantage for early learners — children using ArabFingers don&apos;t need to worry about vowels at all. They focus purely on recognising consonant shapes and sounds, which is the foundation for reading.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">6. The Role of Dots</h2>
          <p className="mb-3">Many Arabic letters share the same basic shape and are told apart only by the number and placement of dots. For example, ب (Ba) has one dot below, ت (Ta) has two dots above, and ث (Tha) has three dots above — but the base shape is identical. This dot system means that once a child learns one shape, they effectively know several related letters.</p>
          <p>In English, only the letters &quot;i&quot; and &quot;j&quot; use dots (called tittles). In Arabic, dots are a core part of the system — about half of the 28 letters use dots to set themselves apart from their dot-free cousins.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">7. Unique Sounds</h2>
          <p className="mb-3">Arabic contains several sounds that don&apos;t exist in English — the deep throat sounds ح (Hha), ع (Ain), and غ (Ghain), the emphatic consonants ص (Sad), ض (Dad), ط (Tah), and ظ (Zah), and the uvular ق (Qaf). These sounds are one of the beauties of Arabic and give the language its distinctive character.</p>
          <p>Young children are exceptionally good at learning unfamiliar sounds. The earlier they&apos;re exposed to Arabic pronunciation through tools like ArabFingers, the more natural these sounds will feel to them.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What Transfers Easily — and What Needs Extra Practice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-ink/15 bg-qalam-soft p-4">
              <h3 className="font-semibold text-qalam mb-2">✓ Transfers easily</h3>
              <ul className="list-disc list-inside space-y-1.5 text-ink/80">
                <li>The idea that letters stand for sounds — a child who &quot;gets&quot; this in English applies it instantly to Arabic.</li>
                <li>Many shared sounds: b, t, d, s, z, m, n, l, k, f, h, w, y all exist in both languages.</li>
                <li>Left-to-right numbers: Arabic numerals run the same direction as English, so counting feels familiar.</li>
                <li>Book and reading habits — turning pages, following a line, listening to a story.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-ink/15 bg-saffron-soft p-4">
              <h3 className="font-semibold text-saffron-ink mb-2">◐ Needs extra practice</h3>
              <ul className="list-disc list-inside space-y-1.5 text-ink/80">
                <li>Reading direction: right-to-left takes a little getting used to at first.</li>
                <li>The throat and emphatic sounds (ع، ح، ق، ص، ض) that English mouths don&apos;t use.</li>
                <li>Letters that change shape when connected — best learned gradually after the isolated forms.</li>
                <li>Telling apart letters that differ only by dots (ب، ت، ث) — slow and steady wins here.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Three Myths, Debunked</h2>
          <div className="space-y-3">
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">Myth: &quot;Arabic is too hard for young children.&quot;</h3>
              <p className="text-ink/80">Children don&apos;t experience Arabic as &quot;hard&quot; — that&apos;s an adult feeling about an unfamiliar script. To a toddler, an Arabic letter is just another interesting shape with a sound attached, no harder than the Latin letters they also haven&apos;t learned yet. Early, playful exposure is what makes it feel easy.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">Myth: &quot;Two scripts will confuse my child.&quot;</h3>
              <p className="text-ink/80">Bilingual children build separate &quot;tracks&quot; for each language and switch between them naturally. A little temporary mixing is normal and passes. Two scripts don&apos;t cause confusion — they build flexibility.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">Myth: &quot;You must learn all the diacritics before you can read.&quot;</h3>
              <p className="text-ink/80">Early readers start with the letters themselves. Diacritics are added later, and fluent readers drop most of them entirely. A child can recognise and enjoy Arabic letters long before any vowel marks enter the picture.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What This Means for Your Child</h2>
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
      <h1 className="text-3xl font-semibold text-ink mb-2">الفرق بين الأبجدية العربية والإنجليزية</h1>
      <p className="text-sm text-ink/55 mb-8">مقارنة مبسّطة تعينك على فهم نظامَي الكتابة ودعم طفلك</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">نظرة عامة</h2>
          <p className="mb-3">إن كنت تربّي طفلاً يتعلّم العربية والإنجليزية معاً، فإنّ معرفتك بالفروق بين نظامَي الكتابة تعينك على دعم رحلته. والأبجديتان مختلفتان في جوهرهما، لكنّ فهم هذه الفروق يسهّل عليك شرحها لطفلك وتوقّع ما قد يحتاج فيه إلى وقت أطول.</p>
          <p>والخبر السارّ أنّ عقل الطفل مرن إلى حدّ مذهل. فالطفل الذي يتعلّم نظامَي كتابة مختلفين تنمو لديه مرونة ذهنية أقوى، والفروق بين العربية والإنجليزية ليست عيوباً بل ميزات تدرّب مناطق مختلفة من الدماغ. وفيما يلي جدول مقارنة سريع، ثمّ الفروق السبعة بالتفصيل، فما الذي ينتقل بسهولة وما يحتاج تدريباً، فثلاث خرافات نصحّحها، وأسئلة شائعة للوالدين.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">جدول المقارنة السريع</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-ink/10"><th className="py-2 px-3 text-right text-ink/70 font-medium">الميزة</th><th className="py-2 px-3 text-right text-ink/70 font-medium">العربية</th><th className="py-2 px-3 text-right text-ink/70 font-medium">الإنجليزية</th></tr></thead>
              <tbody className="text-ink/75">
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">الاتجاه</td><td className="py-2 px-3">من اليمين إلى اليسار</td><td className="py-2 px-3">من اليسار إلى اليمين</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">عدد الحروف</td><td className="py-2 px-3">٢٨ حرفاً</td><td className="py-2 px-3">٢٦ حرفاً</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">هل تتغيّر الأشكال؟</td><td className="py-2 px-3">نعم — حتى أربعة أشكال للحرف</td><td className="py-2 px-3">لا — شكل واحد في كل موضع</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">الحرف الكبير</td><td className="py-2 px-3">لا يوجد</td><td className="py-2 px-3">كبير + صغير</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">نوع الخط</td><td className="py-2 px-3">متّصل دائماً</td><td className="py-2 px-3">مطبوع أو متّصل</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">الحركات</td><td className="py-2 px-3">٣ حروف مدّ + حركات اختيارية</td><td className="py-2 px-3">٥ أحرف علّة</td></tr>
                <tr className="border-b border-ink/10"><td className="py-2 px-3 text-ink/85 font-medium">النقاط</td><td className="py-2 px-3">تميّز كثيراً من الحروف</td><td className="py-2 px-3">في i وj فقط</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">١. اتجاه الكتابة: من اليمين إلى اليسار</h2>
          <p className="mb-3">أوضح الفروق وأسرعها إلى الانتباه أنّ العربية تُكتب من اليمين إلى اليسار. ولهذا تُفتح الكتب من الجهة التي يعدّها قارئ الإنجليزية &quot;الخلف&quot;، ويتدفّق النصّ في الاتجاه المعاكس. وقلّما يربك هذا الأطفال ثنائيي اللغة، فهم يتكيّفون تلقائياً مع اتجاه أيّ لغة يستعملونها، كما ينتقلون بين اللغتين في الكلام.</p>
          <p>والطريف أنّ الأرقام داخل النصّ العربي تُكتب من اليسار إلى اليمين، مع أنّ النصّ المحيط بها يسير من اليمين إلى اليسار. وهذه من اللطائف التي يلتقطها الطفل تلقائياً بالممارسة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٢. عدد الحروف</h2>
          <p>في العربية ٢٨ حرفاً، وفي الإنجليزية ٢٦ حرفاً. والعدد متقارب، لكنّ الحروف لا تتقابل واحداً بواحد. ففي العربية أصوات لا وجود لها في الإنجليزية، وفي الإنجليزية صوتان (مثل صوت P وصوت V) لا وجود لهما في العربية الفصحى. ولذلك فتعلّم العربية ليس مجرّد استبدال رموز برموز، بل تعلّم أصوات جديدة والأشكال التي تحملها.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٣. الحروف تتغيّر بتغيّر موضعها</h2>
          <p className="mb-3">في الإنجليزية يبقى الحرف b على شكله سواء أوّل الكلمة أو وسطها أو آخرها. أمّا في العربية فأكثر الحروف تتغيّر صورتها بحسب موضعها: لها شكل منفصل، وشكل في أوّل الكلمة، وشكل في وسطها، وشكل في آخرها. وقد يبدو هذا مخيفاً، لكنّ الأشكال متقاربة، يجمعها هيكل واحد، وما يفرّق بينها إلا وصلات يسيرة.</p>
          <p>ونحن في عرب فنجرز نبدأ بالشكل المنفصل لكلّ حرف، وهو الشكل الأساس الذي يتعلّمه الطفل أوّلاً، تماماً كما يتعلّم الإنجليزية بالحرف المطبوع قبل المتّصل. ثمّ ينتقل تدريجياً إلى الأشكال المتّصلة كلّما رأى العربية في الكتب واللافتات.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٤. لا حرف كبير في العربية</h2>
          <p>في الإنجليزية أبجديتان في معنى ما: الحروف الكبيرة (A, B, C) والصغيرة (a, b, c)، وقواعد تحدّد متى تُستعمل كلٌّ منها. والعربية خالية من هذا كلّه؛ فلا حرف كبير ولا صغير، ولا تبدأ الجملة ولا الأسماء بحرف كبير. وهذا يخفّف عن الطفل مجموعة قواعد كاملة، فلكلّ حرف عربيّ أشكاله، وليس له نسخة &quot;كبيرة&quot; منفصلة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٥. الحركات تعمل بطريقة مختلفة</h2>
          <p className="mb-3">في الإنجليزية خمسة أحرف علّة (A, E, I, O, U) تظهر بين الحروف الساكنة. وتتعامل العربية مع الحركات على نحو آخر؛ فلها ثلاثة حروف مدّ (ا للألف، و للواو، ي للياء)، وتستعمل علامات صغيرة فوق الحرف أو تحته تُسمّى الحركات لتدلّ على أصوات العلّة القصيرة.</p>
          <p className="mb-3">وفي الكتابة العربية اليومية — الصحف والكتب واللافتات — تُحذف الحركات غالباً، ويستنتج القارئ الصواب من السياق، كما يدرك قارئ الإنجليزية أنّ &quot;rd&quot; قد تكون &quot;read&quot; أو &quot;red&quot; بحسب السياق. أمّا كتب الأطفال والمصحف فتُضبط بالحركات كاملة إعانةً للمتعلّم.</p>
          <p>وهذا في الحقيقة مكسب للمتعلّم المبتدئ؛ فالطفل في عرب فنجرز لا يشغل باله بالحركات أصلاً، بل يركّز على معرفة أشكال الحروف وأصواتها، وهي أساس القراءة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٦. دور النقاط</h2>
          <p className="mb-3">كثير من الحروف العربية يشترك في الهيكل نفسه، ولا يميّزه إلا عدد النقاط وموضعها. فالباء ب نقطة واحدة تحتها، والتاء ت نقطتان فوقها، والثاء ث ثلاث نقاط فوقها، والهيكل في الثلاثة واحد. ومعنى هذا أنّ الطفل متى أتقن شكلاً واحداً، عرف معه حروفاً عدّة قريبة منه.</p>
          <p>وفي الإنجليزية لا نقطة إلا في الحرفين i وj. أمّا في العربية فالنقاط ركن من نظام الكتابة، إذ يستعملها نحو نصف الحروف الثمانية والعشرين لتتميّز عن أخواتها غير المنقوطة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٧. أصوات تنفرد بها العربية</h2>
          <p className="mb-3">في العربية أصوات لا توجد في الإنجليزية، منها الأصوات الحلقية كالحاء ح والعين ع والغين غ، والحروف المفخّمة كالصاد ص والضاد ض والطاء ط والظاء ظ، والقاف ق التي تخرج من أقصى الحلق. وهذه الأصوات من جمال العربية وما يمنحها طابعها المميّز، وقد سُمّيت العربية &quot;لغة الضاد&quot; لأجل الضاد التي تكاد تنفرد بها.</p>
          <p>والأطفال بارعون إلى حدّ بعيد في تعلّم الأصوات غير المألوفة. وكلّما بكّرنا في تعريضهم لنطق العربية بأدوات مثل عرب فنجرز، صارت هذه الأصوات أيسر على ألسنتهم وأقرب إلى طبعهم.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ما الذي ينتقل بسهولة وما يحتاج تدريباً</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-ink/15 bg-qalam-soft p-4">
              <h3 className="font-semibold text-qalam mb-2">✓ ينتقل بسهولة</h3>
              <ul className="list-disc list-inside space-y-1.5 text-ink/80">
                <li>فكرة أنّ الحرف يدلّ على صوت؛ فالطفل الذي أدركها في الإنجليزية يطبّقها فوراً على العربية.</li>
                <li>أصوات مشتركة كثيرة: ب، ت، د، س، ز، م، ن، ل، ك، ف، ه، و، ي موجودة في اللغتين.</li>
                <li>اتجاه الأرقام؛ فأرقام العربية تسير كأرقام الإنجليزية، فيألف العدّ بسرعة.</li>
                <li>عادات القراءة: تقليب الصفحات ومتابعة السطر والإصغاء إلى القصة.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-ink/15 bg-saffron-soft p-4">
              <h3 className="font-semibold text-saffron-ink mb-2">◐ يحتاج تدريباً</h3>
              <ul className="list-disc list-inside space-y-1.5 text-ink/80">
                <li>اتجاه القراءة من اليمين إلى اليسار يحتاج إلى شيء من الألفة أوّل الأمر.</li>
                <li>الأصوات الحلقية والمفخّمة (ع، ح، ق، ص، ض) التي لا يعتادها لسان الإنجليزية.</li>
                <li>الحروف التي تتغيّر عند الاتّصال؛ يحسن تعلّمها بالتدرّج بعد الأشكال المنفصلة.</li>
                <li>التمييز بين الحروف التي لا يفرّقها إلا النقط (ب، ت، ث)؛ والتأنّي هنا هو الطريق.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ثلاث خرافات نصحّحها</h2>
          <div className="space-y-3">
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">خرافة: &quot;العربية أصعب من أن يتعلّمها الصغار.&quot;</h3>
              <p className="text-ink/80">الطفل لا يشعر بأنّ العربية &quot;صعبة&quot;؛ هذا إحساس الكبار تجاه خطٍّ غير مألوف لهم. أمّا الصغير فالحرف العربيّ عنده شكل لطيف له صوت، لا يزيد صعوبةً على الحروف اللاتينية التي لم يتعلّمها بعد. والتعريض المبكّر باللعب هو ما يجعلها سهلة.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">خرافة: &quot;الخطّان سيربكان طفلي.&quot;</h3>
              <p className="text-ink/80">يبني الطفل ثنائيّ اللغة &quot;مساراً&quot; مستقلاً لكلّ لغة وينتقل بينهما تلقائياً. والخلط اليسير في البداية أمر طبيعيّ يزول من نفسه. فالخطّان لا يسبّبان الارتباك، بل يبنيان المرونة.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">خرافة: &quot;لا قراءة قبل إتقان الحركات كلّها.&quot;</h3>
              <p className="text-ink/80">يبدأ المبتدئ بالحروف نفسها، والحركات تأتي لاحقاً، والقارئ المتمكّن يستغني عن أكثرها. والطفل يعرف الحروف العربية ويأنس بها قبل أن تدخل الحركات في حسابه بزمن.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ماذا يعني هذا لطفلك</h2>
          <p className="mb-3">قد تبدو الفروق بين العربية والإنجليزية مخيفة للكبار، لكنّ الأطفال يتعاملون معها بطبعهم. فالطفل الذي ينشأ سامعاً راءياً للّغتين يعاملهما نظامين متوازيين؛ لا يرتبك بهما، بل يزداد بهما قوّةً في الذهن.</p>
          <p>والمفتاح هو التعريض المبكّر بلا ضغط. دع طفلك يلعب بالحروف العربية في عرب فنجرز، واقرآ الكتب ثنائية اللغة معاً، وأشِر إلى العربية حيثما ظهرت من حولكما. فالألفة التي يبنيها اليوم تثمر يوم يبدأ تعليم القراءة النظاميّ.</p>
        </section>
      </div>
    </>
  );
}
