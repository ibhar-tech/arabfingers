import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/blog/arabic-alphabet-vs-latin-deep-dive", {
    titleEn: "Arabic vs Latin Alphabet: A Linguistic Deep Dive",
    titleAr: "الأبجدية العربية مقابل اللاتينية: غوص لغوي عميق",
    descriptionEn:
      "A comprehensive comparison of Arabic and Latin writing systems. Explore letter connectivity, diacritics, morphology, and how these differences affect language learning.",
    descriptionAr:
      "مقارنة شاملة بين نظامي الكتابة العربي واللاتيني. استكشف اتصال الحروف والتشكيل والصرف، وكيف تؤثر هذه الفروقات على تعلم اللغة لدى الأطفال ثنائيي اللغة.",
    ogType: "article",
    publishedTime: "2026-05-05",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic vs latin alphabet", "الأبجدية العربية مقابل اللاتينية",
      "arabic writing system", "نظام الكتابة العربية",
      "arabic letter forms", "أشكال الحروف العربية",
      "arabic diacritics tashkeel", "التشكيل في اللغة العربية",
    ],
  });
}

export default async function ArabicVsLatinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <ArticleStructuredData
        title="Arabic vs Latin Alphabet: A Linguistic Deep Dive"
        description="A comprehensive comparison of Arabic and Latin writing systems."
        slug="blog/arabic-alphabet-vs-latin-deep-dive"
        locale={locale}
        datePublished="2026-05-05"
        dateModified="2026-06-12"
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: locale === "ar" ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: locale === "ar" ? "عربي مقابل لاتيني" : "Arabic vs Latin" },
        ]}
      />
      {locale === "ar" ? <ContentAr /> : <ContentEn />}
    </PageLayout>
  );
}

function AuthorBlock({ isAr }: { isAr?: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-2 mb-8 text-xs text-ink/40">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">A</div>
      <div>
        <Link href={`/${isAr ? "ar" : "en"}/author`} className="text-ink/70 font-medium hover:text-accent transition">Aissa Trad</Link>
        <span className="mx-2">·</span>
        <time dateTime="2026-05-05">{isAr ? "٥ مايو ٢٠٢٦" : "May 5, 2026"}</time>
        <span className="mx-2">·</span>
        <span>{isAr ? "١٢ دقيقة قراءة" : "12 min read"}</span>
      </div>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">Arabic vs Latin Alphabet: A Linguistic Deep Dive</h1>
      <p className="text-base text-ink/75">Understanding what makes Arabic unique — and why it matters for learning</p>
      <AuthorBlock />

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Two of the World&apos;s Most Important Scripts</h2>
          <p className="mb-3">
            The Arabic and Latin alphabets are, by usage, two of the most significant writing systems in human history. The Latin alphabet (used by English, French, Spanish, German, and dozens of other languages) is used by approximately 3.6 billion people. The Arabic script (used by Arabic, Persian, Urdu, Pashto, and others) serves approximately 1.4 billion people across 28 countries.
          </p>
          <p className="mb-3">
            Both descended from the same ancient Phoenician alphabet, yet they evolved in radically different directions over millennia. Understanding these differences isn&apos;t just academically interesting — it&apos;s practically essential for anyone teaching Arabic to a child who already knows English, or vice versa.
          </p>
          <p>
            In this article, we&apos;ll explore the fundamental structural, visual, and phonetic differences between these two writing systems, and discuss what these differences mean for bilingual learners and their parents.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Direction: Right-to-Left vs. Left-to-Right</h2>
          <p className="mb-3">
            The most immediately obvious difference is reading direction. English and other Latin-script languages read left-to-right (LTR). Arabic reads right-to-left (RTL). This isn&apos;t just a cosmetic difference — it affects everything from page layout to how children scan text to how books are bound.
          </p>
          <p className="mb-3">
            Interestingly, the Phoenician alphabet (ancestor of both) was originally written right-to-left. The Greeks reversed the direction when they adapted the Phoenician script, and this LTR convention was inherited by Latin. Arabic maintained the original RTL direction.
          </p>
          <p>
            For bilingual children, this means their brains must become comfortable scanning in both directions — an exercise that actually strengthens visual processing and spatial reasoning. Some researchers have called this &quot;bidirectional processing advantage&quot; — biliteracy in RTL and LTR scripts gives children more flexible visual attention systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Letter Connectivity: Cursive by Default</h2>
          <p className="mb-3">
            In English, letters are typically printed as separate, disconnected units: C-A-T. Cursive writing connects them, but this is considered a separate skill. In Arabic, <strong className="text-ink/90">letters are always connected in their natural form</strong>. Printing Arabic in disconnected letters would be like writing English in all capitals with spaces between each letter — technically readable but unnatural.
          </p>
          <p className="mb-3">
            This means each Arabic letter has up to four forms depending on its position: isolated, initial (beginning of word), medial (middle), and final (end). For example, the letter ع (Ain) looks different in each position:
          </p>
          <div className="grid grid-cols-4 gap-3 my-4">
            {[
              { pos: "Isolated", form: "ع" },
              { pos: "Initial", form: "عـ" },
              { pos: "Medial", form: "ـعـ" },
              { pos: "Final", form: "ـع" },
            ].map((f) => (
              <div key={f.pos} className="rounded-lg border border-ink/8 bg-card p-3 text-center">
                <span className="text-2xl text-ink block mb-1" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{f.form}</span>
                <span className="text-[10px] text-ink/40">{f.pos}</span>
              </div>
            ))}
          </div>
          <p>
            This is why ArabFingers teaches the <strong className="text-ink/90">isolated form</strong> first — it&apos;s the base shape that children need to recognize before learning the connected variations. Once a child knows what ع looks like in isolation, they can learn to spot it inside words.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Vowels: Explicit vs. Implicit</h2>
          <p className="mb-3">
            English uses 5 vowel letters (A, E, I, O, U) that are always present in written text. You cannot read &quot;cat&quot; if it&apos;s written as &quot;ct&quot; — the vowel is essential for decoding.
          </p>
          <p className="mb-3">
            Arabic works very differently. The Arabic alphabet is technically an <strong className="text-ink/90">abjad</strong> — a writing system where consonants are primary and vowels are optional. In everyday Arabic text (newspapers, books, signs), short vowels are <em>not written</em>. Readers infer them from context. The word for &quot;book&quot; (kitāb) might be written as كتاب — with no explicit indication of where the &quot;i&quot; and &quot;ā&quot; sounds go.
          </p>
          <p className="mb-3">
            When vowels are explicitly written, they appear as small marks called <strong className="text-ink/90">diacritics</strong> (tashkīl / تشكيل) above or below the letters:
          </p>
          <div className="grid grid-cols-3 gap-3 my-4">
            {[
              { name: "Fatha (a)", mark: "كَ" },
              { name: "Damma (u)", mark: "كُ" },
              { name: "Kasra (i)", mark: "كِ" },
            ].map((v) => (
              <div key={v.name} className="rounded-lg border border-ink/8 bg-card p-3 text-center">
                <span className="text-3xl text-ink block mb-1" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{v.mark}</span>
                <span className="text-[10px] text-ink/40">{v.name}</span>
              </div>
            ))}
          </div>
          <p>
            For children&apos;s learning materials and the Quran, vowels are always written. For beginners, diacritics are essential guides. As fluency develops, readers naturally transition to vowel-less text — a process similar to how fluent English readers can understand abbreviated text.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Phonetic Inventory: Sounds That Don&apos;t Exist in English</h2>
          <p className="mb-3">
            Arabic contains several consonant sounds that have no English equivalent. These include guttural and pharyngeal sounds produced deep in the throat — sounds that English speakers have never needed to make:
          </p>
          <div className="space-y-2 my-4">
            {[
              { letter: "ع", name: "Ain", desc: "A voiced pharyngeal fricative — no English equivalent. Produced by constricting the throat muscles." },
              { letter: "ح", name: "Hha", desc: "A voiceless pharyngeal fricative — deeper than the English 'H'. Like a heavy, breathy sigh from the back of the throat." },
              { letter: "خ", name: "Kha", desc: "Like the 'ch' in Scottish 'loch' or German 'Bach'. A uvular fricative." },
              { letter: "غ", name: "Ghain", desc: "Similar to the French 'R' or a gargling sound. A voiced uvular fricative." },
              { letter: "ق", name: "Qaf", desc: "A deep 'K' produced much further back in the throat than the English 'K'. A voiceless uvular stop." },
            ].map((s) => (
              <div key={s.letter} className="rounded-xl border border-ink/8 bg-card p-4 flex gap-3 items-start">
                <span className="text-2xl text-accent shrink-0" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{s.letter}</span>
                <div>
                  <span className="font-semibold text-ink text-sm">{s.name}</span>
                  <p className="text-sm text-ink/75 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            Conversely, English has sounds that don&apos;t exist in standard Arabic, such as the &apos;P&apos; sound (Arabic has no &apos;P&apos; — it&apos;s replaced with &apos;B&apos;), the &apos;V&apos; sound, and the hard &apos;G&apos; as in &quot;go&quot; (though some Arabic dialects have these sounds). This phonetic asymmetry is important for parents to understand: their child will need to learn sounds that neither language alone provides.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What This Means for Your Child</h2>
          <p className="mb-3">
            If your child is learning both Arabic and English, they&apos;re doing something remarkable: mastering two fundamentally different writing systems simultaneously. This is harder than learning two languages that share the same script (like English and Spanish), but the cognitive benefits are also greater.
          </p>
          <p className="mb-3">
            Tools like ArabFingers simplify this by presenting Arabic letters in their most basic form — isolated, with clear pronunciation, alongside their English phonetic equivalents. By seeing both scripts side by side, children build cross-linguistic connections that accelerate learning in both languages.
          </p>
          <p>
            The key takeaway: Arabic and English are different, but those differences are features, not bugs. Every difference your child navigates builds stronger cognitive architecture for a lifetime.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/en/blog/screen-time-guidelines-arabic-learning" className="text-xs text-accent underline">← Screen Time Guide</Link>
        <Link href="/en/blog/arabic-calligraphy-for-kids" className="text-xs text-accent underline">Arabic Calligraphy →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 Try ArabFingers Now
        </Link>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">الأبجدية العربية مقابل اللاتينية: غوص لغوي عميق</h1>
      <p className="text-base text-ink/75">فهم ما يجعل العربية فريدة — ولماذا يهم ذلك للتعلم</p>
      <AuthorBlock isAr />

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">نظامان من أهم أنظمة الكتابة في العالم</h2>
          <p className="mb-3">
            الأبجديتان العربية واللاتينية هما، من حيث الاستخدام، من أهم أنظمة الكتابة في تاريخ البشرية. الأبجدية اللاتينية يستخدمها حوالي ٣.٦ مليار شخص. الخط العربي يخدم حوالي ١.٤ مليار شخص عبر ٢٨ دولة.
          </p>
          <p>
            كلاهما انحدر من نفس الأبجدية الفينيقية القديمة، لكنهما تطورا في اتجاهات مختلفة جذرياً عبر آلاف السنين. فهم هذه الفروقات ضروري عملياً لأي شخص يعلم العربية لطفل يعرف الإنجليزية مسبقاً.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">الاتجاه: من اليمين لليسار مقابل اليسار لليمين</h2>
          <p className="mb-3">
            الفرق الأكثر وضوحاً هو اتجاه القراءة. الإنجليزية تُقرأ من اليسار لليمين. العربية تُقرأ من اليمين لليسار. هذا ليس فرقاً شكلياً فحسب — إنه يؤثر على كل شيء من تخطيط الصفحة إلى كيفية مسح الأطفال للنص.
          </p>
          <p>
            بالنسبة للأطفال ثنائيي اللغة، هذا يعني أن أدمغتهم يجب أن تصبح مرتاحة للمسح في كلا الاتجاهين — تمرين يقوي فعلاً المعالجة البصرية والتفكير المكاني. بعض الباحثين أسموا هذا &quot;ميزة المعالجة ثنائية الاتجاه&quot;.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">اتصال الحروف: متصل بطبيعته</h2>
          <p className="mb-3">
            في الإنجليزية، تُطبع الحروف عادة كوحدات منفصلة ومنقطعة، والكتابة المتصلة تربطها لكنها تُعتبر مهارة منفصلة. في العربية، <strong className="text-ink/90">الحروف متصلة دائماً في شكلها الطبيعي</strong>؛ فكتابة العربية بحروف منفصلة أشبه بكتابة الإنجليزية بأحرف كبيرة مع فراغ بين كل حرف وآخر — مقروءة تقنياً لكنها غير طبيعية.
          </p>
          <p className="mb-3">
            هذا يعني أن كل حرف عربي له حتى أربعة أشكال حسب موقعه: منفصل، وأول الكلمة، ووسطها، وآخرها. خذ مثلاً حرف العين (ع) كيف يتغير شكله في كل موضع:
          </p>
          <div className="grid grid-cols-4 gap-3 my-4">
            {[
              { pos: "منفصل", form: "ع" },
              { pos: "أول", form: "عـ" },
              { pos: "وسط", form: "ـعـ" },
              { pos: "آخر", form: "ـع" },
            ].map((f) => (
              <div key={f.pos} className="rounded-lg border border-ink/8 bg-card p-3 text-center">
                <span className="text-2xl text-ink block mb-1" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{f.form}</span>
                <span className="text-[10px] text-ink/40">{f.pos}</span>
              </div>
            ))}
          </div>
          <p>
            لهذا يُعلّم عرب فنجرز الشكل المنفصل أولاً — إنه الشكل الأساسي الذي يحتاج الأطفال للتعرف عليه قبل تعلم الأشكال المتصلة. ما إن يعرف الطفل شكل العين منفصلاً، حتى يبدأ في رصده داخل الكلمات.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">الحروف الصوتية: صريحة مقابل ضمنية</h2>
          <p className="mb-3">
            الإنجليزية تستخدم خمسة أحرف صوتية موجودة دائماً في النص المكتوب؛ فلا يمكنك قراءة كلمة &quot;cat&quot; لو كُتبت &quot;ct&quot; لأن الحرف الصوتي ضروري لفك الرمز. العربية تعمل بشكل مختلف تماماً. الأبجدية العربية هي تقنياً <strong className="text-ink/90">أبجد</strong> — نظام كتابة فيه الحروف الساكنة أساسية والحركات الصوتية اختيارية.
          </p>
          <p className="mb-3">
            في النص العربي اليومي (الصحف والكتب واللافتات)، لا تُكتب الحركات القصيرة، ويستنتجها القراء من السياق. فكلمة &quot;كتاب&quot; تُكتب دون أي إشارة صريحة لمواضع الحركات. وعندما تُكتب الحركات صراحة، تظهر كعلامات صغيرة تُسمى <strong className="text-ink/90">التشكيل</strong> فوق الحروف أو تحتها:
          </p>
          <div className="grid grid-cols-3 gap-3 my-4">
            {[
              { name: "فتحة", mark: "كَ" },
              { name: "ضمة", mark: "كُ" },
              { name: "كسرة", mark: "كِ" },
            ].map((v) => (
              <div key={v.name} className="rounded-lg border border-ink/8 bg-card p-3 text-center">
                <span className="text-3xl text-ink block mb-1" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{v.mark}</span>
                <span className="text-[10px] text-ink/40">{v.name}</span>
              </div>
            ))}
          </div>
          <p>
            في مواد تعلم الأطفال والمصحف الشريف، تُكتب الحركات دائماً، فهي للمبتدئين دليل ضروري. ومع نمو الطلاقة ينتقل القارئ تلقائياً إلى النص الخالي من الحركات — تماماً كما يفهم القارئ المتمرّس النص المختصر.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">المخزون الصوتي: أصوات لا وجود لها في الإنجليزية</h2>
          <p className="mb-3">
            تحتوي العربية على عدة أصوات ساكنة لا مقابل لها في الإنجليزية، منها أصوات حلقية وبلعومية تُنطق من أعماق الحلق — أصوات لم يحتج الناطق بالإنجليزية يوماً لإخراجها:
          </p>
          <div className="space-y-2 my-4">
            {[
              { letter: "ع", name: "العين", desc: "صوت احتكاكي بلعومي مجهور لا مقابل له في الإنجليزية، يُنطق بقبض عضلات الحلق." },
              { letter: "ح", name: "الحاء", desc: "صوت احتكاكي بلعومي مهموس، أعمق من الـ H الإنجليزية، كزفير ثقيل من مؤخرة الحلق." },
              { letter: "خ", name: "الخاء", desc: "صوت احتكاكي لهوي، يشبه نطق ch في الكلمة الاسكتلندية loch." },
              { letter: "غ", name: "الغين", desc: "صوت احتكاكي لهوي مجهور، قريب من الراء الفرنسية أو صوت الغرغرة." },
              { letter: "ق", name: "القاف", desc: "صوت انفجاري لهوي مهموس، كالكاف لكن من موضع أعمق في الحلق." },
            ].map((s) => (
              <div key={s.letter} className="rounded-xl border border-ink/8 bg-card p-4 flex gap-3 items-start">
                <span className="text-2xl text-accent shrink-0" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{s.letter}</span>
                <div>
                  <span className="font-semibold text-ink text-sm">{s.name}</span>
                  <p className="text-sm text-ink/75 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            وفي المقابل، للإنجليزية أصوات لا توجد في العربية الفصحى، مثل صوت P (تستبدله العربية بالباء)، وصوت V، والجيم القاهرية الصلبة (وإن وُجدت بعضها في لهجات عربية). هذا التباين الصوتي مهم أن يدركه الوالدان: فطفلهما سيتعلم أصواتاً لا توفرها أيٌّ من اللغتين بمفردها.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ماذا يعني هذا لطفلك</h2>
          <p className="mb-3">
            إذا كان طفلك يتعلم العربية والإنجليزية معاً، فهو يفعل شيئاً مذهلاً: إتقان نظامي كتابة مختلفين جذرياً في وقت واحد. هذا أصعب من تعلم لغتين تشتركان في نفس الخط (مثل الإنجليزية والإسبانية)، لكن الفوائد المعرفية أكبر أيضاً.
          </p>
          <p className="mb-3">
            أدوات مثل عرب فنجرز تبسّط هذه الرحلة بعرض الحروف العربية في أبسط صورها — منفصلة، مع نطق واضح، إلى جانب مقابلها الصوتي الإنجليزي. وبرؤية الخطّين جنباً إلى جنب، يبني الأطفال روابط بين اللغتين تسرّع التعلم في كلتيهما.
          </p>
          <p>
            النقطة الرئيسية: العربية والإنجليزية مختلفتان، لكن تلك الفروقات ميزات وليست عيوباً. فكل مرة ينتقل فيها دماغ طفلك بين اتجاه الكتابة، وبين الحروف المتصلة والمنفصلة، وبين الأصوات الحلقية والأصوات اللاتينية، يدرّب مرونته الذهنية. وقد أظهرت أبحاث ثنائية اللغة أن هذه المرونة تنعكس على مهارات أخرى تماماً، من حل المشكلات إلى التركيز. كل فرق يتنقل فيه طفلك يبني بنية إدراكية أقوى تبقى معه مدى الحياة.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/ar/blog/screen-time-guidelines-arabic-learning" className="text-xs text-accent underline">← دليل وقت الشاشة</Link>
        <Link href="/ar/blog/arabic-calligraphy-for-kids" className="text-xs text-accent underline">الخط العربي للأطفال →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 جرب عرب فنجرز الآن
        </Link>
      </div>
    </>
  );
}
