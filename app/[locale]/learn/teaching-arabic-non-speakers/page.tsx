import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { RelatedArticles } from "@/components/RelatedArticles";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { getRelatedArticles } from "@/lib/related";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/* The site's core audience, straight from Search Console: English-searching
   parents and teachers (US, PH, IN, UK, AE) who do NOT read Arabic and are
   teaching a child who should. No page on the site — and few on the whole
   web — answers their actual first question: "can I even do this?" This one
   does, and routes them to the audio-first tools that make it possible. */

const faqEn = [
  { q: "Can I teach my child Arabic if I don't speak it myself?", a: "Yes — with one condition: your child needs to hear the letters from a native source, not from you. Use recorded audio (every letter page here has a Hear button), follow along, and let the recording carry the pronunciation while you carry the routine. Parents provide consistency; the audio provides accuracy." },
  { q: "Will my accent ruin my child's Arabic?", a: "No, as long as recordings do the heavy lifting. Children build pronunciation from the dominant input they hear, and a few minutes of your accented practice alongside clear audio does more good than harm — it models trying, which is what keeps a child willing to speak." },
  { q: "How much Arabic do I need to learn alongside my child?", a: "Learn to recognise the 28 letters and say their names — about what a four-week plan asks of the child. You do not need vocabulary, grammar or script fluency. Knowing the letters is enough to run every session, check every worksheet, and celebrate every win." },
  { q: "Which letters should a non-Arabic family start with?", a: "Start with the letters that already exist in English — ب (b), ت (t), ج (j), د (d), ر (r), س (s), ف (f), ك (k), ل (l), م (m), ن (n), و (w), ي (y). Save the sounds English lacks — ح، خ، ص، ض، ط، ظ، ع، غ، ق — for week three, with the pronunciation guide open beside you." },
  { q: "How long does it take to teach the Arabic alphabet this way?", a: "One letter per day, five minutes per session, takes most families through all 28 letters in five to six weeks, with recognition solid enough to start reading short words. Faster is possible; slower is fine. The alphabet is not a race." },
  { q: "Do worksheets work if the parent can't read Arabic script?", a: "Yes — that is exactly what they are for. The worksheet shows the letter and the graded tracing rows; the matching letter page provides the sound at a click and a transliteration you can read. You never have to produce Arabic from memory to run the session." },
];

const faqAr = [
  { q: "هل أستطيع تعليم طفلي العربية إن كنت لا أتحدثها؟", a: "نعم، بشرط واحد: أن يسمع الطفل الحروف من مصدر أصلي لا منك. استعمل التسجيلات الصوتية — لكل حرف صفحة فيها زر استماع — وتابع معه، ودع التسجيل يحمل النطق بينما تحمل أنت الروتين. أنت توفّر الاستمرار، والصوت يوفّر الدقة." },
  { q: "هل لهجتي تفسد عربية طفلي؟", a: "لا، ما دامت التسجيلات تقوم بالدور الأكبر. يبني الطفل نطقه من المدخل الصوتي الغالب،ودقائق من نطقك غير المتقن إلى جانب صوت واضح ينفع أكثر مما يضر — فهي تعلّمه المحاولة، وهذا ما يجعله يجرؤ على الكلام." },
  { q: "كم من العربية أحتاج أن أتعلّم مع طفلي؟", a: "يكفي أن تميّز الحروف الـ٢٨ وتنطق أسماءها — وهو نحو ما تطلبه خطة أسابيع أربعة من الطفل نفسه. لا تحتاج مفردات ولا قواعد ولا إتقان الخط. معرفة الحروف تكفي لإدارة كل جلسة ومراجعة كل ورقة والاحتفال بكل إنجاز." },
  { q: "بأي الحروف نبدأ في عائلة لا تتحدث العربية؟", a: "ابدأ بالحروف الموجودة أصلاً في الإنجليزية: ب ت ج د ر س ف ك ل م ن و ي. وأجّل الأصوات التي لا مقابل لها في الإنجليزية — ح خ ص ض ط ظ ع غ ق — إلى الأسبوع الثالث مع فتح صفحة النطق بجانبك." },
  { q: "كم يستغرق تعليم الأبجدية بهذه الطريقة؟", a: "حرف واحد يومياً، خمس دقائق في الجلسة، يوصل معظم العائلات إلى الحروف الـ٢٨ في خمسة إلى ستة أسابيع بتمييز يكفي لبدء قراءة كلمات قصيرة. الزيادة ممكنة والتباطؤ مقبول — الأبجدية ليست سباقاً." },
  { q: "هل تنفع أوراق العمل إن كان الوالد لا يقرأ العربية؟", a: "نعم، فهي لهذا صُنعت. الورقة تعرض الحرف وصفوف التتبّع المتدرّجة، وصفحة الحرف توفر الصوت بضغطة زر ونطقاً بالحروف اللاتينية تستطيع قراءته. لن تحتاج أبداً إلى استحضار العربية من ذاكرتك لإدارة الجلسة." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/teaching-arabic-non-speakers", {
    titleEn: "Teaching Arabic When You Don't Speak It — A Parent's Plan",
    titleAr: "تعليم العربية لطفلك وأنت لا تتحدثها — خطة للوالدين",
    descriptionEn:
      "You don't need to speak Arabic to teach it. A realistic 6-week plan for non-Arabic parents: audio-first letters, 5-minute sessions, worksheets you can check without reading the script, and the sounds English lacks.",
    descriptionAr:
      "لا تحتاج إلى التحدث بالعربية لتعلّمها لطفلك. خطة واقعية في ستة أسابيع للوالدين غير الناطقين بالعربية: الحروف بالصوت أولاً، وجلسات من خمس دقائق، وأوراق عمل تراجعها دون قراءة الخط.",
    ogType: "article",
    publishedTime: "2026-08-22",
    keywords: [
      "teach arabic without speaking it",
      "teach child arabic non arabic speaker",
      "learn arabic alphabet for parents",
      "arabic for non arabic parents",
      "teach kids arabic at home",
    ],
  });
}

export default async function TeachingArabicNonSpeakers({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={tt("How to Teach Arabic When You Don't Speak It", "تعليم العربية وأنت لا تتحدثها")}
        description={tt(
          "A realistic plan for non-Arabic-speaking parents teaching a child the Arabic alphabet at home.",
          "خطة واقعية للوالدين غير الناطقين بالعربية لتعليم طفلهم الأبجدية في البيت.",
        )}
        slug="learn/teaching-arabic-non-speakers"
        datePublished="2026-08-22"
        dateModified="2026-08-22"
        section="Education"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("Non-Arabic parents", "للوالدين غير الناطقين") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {tt(
          "How to Teach Your Child Arabic When You Don't Speak It",
          "كيف تعلّم طفلك العربية وأنت لا تتحدثها",
        )}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {tt(
          "A realistic six-week plan for parents starting from zero — built around audio, not your own pronunciation.",
          "خطة واقعية في ستة أسابيع للوالدين الذين يبدأون من الصفر — مبنية على الصوت المسجّل لا على نطقك أنت.",
        )}
      </p>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-4">
        <p>
          {tt(
            "Most advice about teaching kids Arabic quietly assumes the parent already reads it. Yours doesn't — and that is fine. Families in exactly your situation raise Arabic-literate children all the time: diaspora households, converts, teachers in international and weekend schools, parents who simply want their child to read the Quran or speak with grandparents. The method that works for all of them is the same, and it does not require you to become an Arabic speaker.",
            "معظم النصائح حول تعليم الأطفال العربية تفترض بصمت أن الوالد يقرأها أصلاً. أنت لا تقرأها — ولا بأس. عائلات في وضعك بالضبط تربّي أطفالاً يجيدون العربية دوماً: أسر المهاجرين، والمعتنقون، ومعلمو المدارس الدولية ومدارس نهاية الأسبوع، وآباء يريدون فقط أن يقرأ طفلهم القرآن أو يتحدث مع جدّيه. والطريقة التي تنجح معهم جميعاً واحدة، ولا تتطلب منك أن تصبح متحدثاً بالعربية.",
          )}
        </p>
        <p>
          {tt(
            "The rule this whole plan rests on: the recording carries the pronunciation, you carry the routine. Children acquire accent from the input they hear most. A few minutes of clear native audio per letter — while you handle schedules, praise, stickers and printing — gives your child accurate Arabic and gives you a job you can actually do.",
            "القاعدة التي تقوم عليها هذه الخطة كلها: التسجيل يحمل النطق، وأنت تحمل الروتين. يكتسب الطفل لكنته من المدخل الصوتي الغالب. دقائق قليلة من صوت أصلي واضح لكل حرف — بينما تتولى أنت المواعيد والمديح والملصقات والطباعة — تمنح طفلك عربية دقيقة وتمنحك دوراً تستطيع أداءه فعلاً.",
          )}
        </p>
      </div>

      {/* ---------- the plan ---------- */}
      <h2 className="text-2xl font-semibold text-ink mb-4">
        {tt("The six-week plan", "خطة الأسابيع الستة")}
      </h2>
      <div className="space-y-4 mb-10">
        {[
          {
            t: tt("Week 1 — Train your own ear first", "الأسبوع ١ — درّب أذنك أنت أولاً"),
            d: tt(
              "Before any lesson with your child, spend twenty minutes on the interactive alphabet in our letter guide: tap each letter, hear the Arabic name followed by the English one, repeat it badly, tap again. You are not learning to speak; you are learning to recognise. By the end you should be able to point at any letter and know its name — which is the whole skill this plan asks of you.",
              "قبل أي درس مع طفلك، اقضِ عشرين دقيقة على الأبجدية التفاعلية في دليل الحروف: اضغط كل حرف، واسمع اسمه بالعربية ثم بالإنجليزية، وأعده — ولو بنطق رديء — ثم اضغط ثانية. أنت لا تتعلم الكلام، بل تتعلم التمييز. في النهاية ينبغي أن تشير إلى أي حرف فتعرف اسمه، وهذه هي كل المهارة التي تطلبها منك الخطة.",
            ),
          },
          {
            t: tt("Weeks 2–3 — Letters that English already has", "الأسبوعان ٢–٣ — الحروف الموجودة في الإنجليزية"),
            d: tt(
              "One letter per day, five minutes per day. Start with the fifteen letters whose sounds exist in English (ب ت ج د ر ز س ش ف ك ل م ن ه و ي) so every early win feels easy for both of you. Each session: press Hear on the letter's worksheet page, trace the grey letters with a finger while the audio plays, then pencil on the sheet. Fifteen days, fifteen letters.",
              "حرف واحد كل يوم، خمس دقائق كل يوم. ابدأ بالخمسة عشر حرفاً التي أصواتها موجودة في الإنجليزية (ب ت ج د ر ز س ش ف ك ل م ن ه و ي) ليشعر كل نجاح مبكر بالسهولة عليكما معاً. كل جلسة: اضغط زر الاستماع في صفحة الحرف، وتتبّع الحروف الرمادية بالإصبع مع تشغيل الصوت، ثم بالقلم على الورقة. خمسة عشر يوماً، خمسة عشر حرفاً.",
            ),
          },
          {
            t: tt("Week 4 — The sounds English doesn't have", "الأسبوع ٤ — الأصوات التي لا تملكها الإنجليزية"),
            d: tt(
              "Now the famous ones: ح and ه, خ and ج, the four \"emphatic\" letters ص ض ط ظ, the throat pair ع and غ, and ق. These are where your child genuinely needs the audio and you genuinely can't model them — so lean on it. Every letter page explains the mouth position in plain English for you, and the recording demonstrates it for your child. You are the coach, not the demonstration.",
              "الآن المشاهير: ح و ه، وخ و ج، والحروف الأربعة المفخّمة ص ض ط ظ، وثنائية الحلق ع و غ، ثم ق. هنا يحتاج طفلك الصوت فعلاً ولا تستطيع أنت النمذجة — فاعتمد عليه. كل صفحة حرف تشرح مخارج الحروف بالإنجليزية الواضحة لك، والتسجيل يعرضها لطفلك. أنت المدرب لا العرض.",
            ),
          },
          {
            t: tt("Week 5 — Join the letters into words", "الأسبوع ٥ — صل الحروف في كلمات"),
            d: tt(
              "Arabic letters change shape when they connect, which surprises children and parents alike. Show the four forms on each worksheet (they're printed on every sheet), then trace the example words at the bottom of the page together — with audio, always. Our guide to why letters change shape makes the logic plain in five minutes of reading.",
              "تتغير أشكال الحروف عند اتصالها، وهذا يفاجئ الأطفال والوالدين سواء. اعرض الأشكال الأربعة على كل ورقة (مطبوعة في كل واحدة)، ثم تتبّعا الكلمات في أسفل الصفحة معاً — وبالصوت دائماً. ودليلنا عن تغيّر أشكال الحروف يشرح المنطق في خمس دقائق قراءة.",
            ),
          },
          {
            t: tt("Week 6 — Readiness check and what comes next", "الأسبوع ٦ — فحص الجاهزية وما بعدها"),
            d: tt(
              "Print the one-page alphabet chart, point at letters in random order, and let your child name them — audio off, this is the test. Twenty-five or more correct means you move on to first words and short-vowel marks (harakat). Under twenty is not failure; it means two more weeks at five minutes a day. Then the numbers 1–10, colours, and the free games on this site keep the momentum going without any new skills from you.",
              "اطبع لوحة الحروف ذات الصفحة الواحدة، وأشر إلى الحروف بترتيب عشوائي، ودع طفلك يسمّيها — بإيقاف الصوت، فهذا هو الاختبار. خمسة وعشرون صحيحاً أو أكثر تعني الانتقال إلى الكلمات الأولى والحركات. وأقل من عشرين ليست فشلاً بل تعني أسبوعين إضافيين بخمس دقائق يومياً. ثم الأرقام ١–١٠ والألوان والألعاب المجانية في هذا الموقع تحفظ الزخم دون مهارات جديدة منك.",
            ),
          },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl border border-ink/10 bg-card p-5">
            <h3 className="text-lg font-bold text-ink mb-1.5">{s.t}</h3>
            <p className="text-sm leading-relaxed text-ink/80">{s.d}</p>
          </div>
        ))}
      </div>

      <WorksheetCrossLink
        locale={locale}
        titleEn="The worksheets this plan is built on"
        titleAr="أوراق العمل التي بُنيت عليها هذه الخطة"
        textEn="A tracing sheet for every letter — with the four forms and example words — plus the wall chart for week 6's readiness check. Free PDFs, no signup."
        textAr="ورقة تتبّع لكل حرف — مع الأشكال الأربعة والكلمات — ولوحة الجدار لفحص الأسبوع السادس. ملفات PDF مجانية بلا تسجيل."
      />

      {/* ---------- what you need ---------- */}
      <h2 className="text-2xl font-semibold text-ink mb-4">
        {tt("What you need (and what you don't)", "ما تحتاجه (وما لا تحتاجه)")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
        <div className="card-stock p-5">
          <h3 className="font-display text-sm font-extrabold text-ink mb-2">
            {tt("You need", "تحتاج")}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-ink/75">
            <li>◆ {tt("Five uninterrupted minutes a day — same time, same place", "خمس دقائق يومياً بلا مقاطعة — الوقت نفسه والمكان نفسه")}</li>
            <li>◆ {tt("A phone or laptop speaker, for the letter audio", "سماعة هاتف أو حاسوب لصوت الحروف")}</li>
            <li>◆ {tt("Printed worksheets and a pencil (a dry-wipe sleeve makes them reusable)", "أوراق عمل مطبوعة وقلم (جيب بلاستيكي وقلم يُمحى يجعلها قابلة لإعادة الاستعمال)")}</li>
            <li>◆ {tt("A wall for the alphabet chart", "جدار للوحة الحروف")}</li>
            <li>◆ {tt("Consistency — the single biggest factor in every study of home language learning", "الاستمرارية — العامل الأكبر في كل دراسات تعلم اللغات في البيت")}</li>
          </ul>
        </div>
        <div className="card-stock p-5">
          <h3 className="font-display text-sm font-extrabold text-ink mb-2">
            {tt("You do NOT need", "لا تحتاج")}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-ink/75">
            <li>◆ {tt("To speak, read, or write Arabic yourself", "أن تتحدث العربية أو تقرأها أو تكتبها بنفسك")}</li>
            <li>◆ {tt("A tutor (a bonus later, not a requirement now)", "معلّماً (إضافة لاحقاً لا شرطاً الآن)")}</li>
            <li>◆ {tt("Any paid app or subscription", "أي تطبيق مدفوع أو اشتراك")}</li>
            <li>◆ {tt("Perfect pronunciation — that's the recording's job", "نطقاً مثالياً — هذه مهمة التسجيل")}</li>
            <li>◆ {tt("More than 15 minutes a day; longer sessions measurably hurt retention at ages 3–6", "أكثر من ربع ساعة يومياً؛ الجلسات الأطول تضرّ بالتثبيت في أعمار ٣–٦ سنوات")}</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105"
        >
          🎮 {tt("Try the audio-first letter game", "جرّب لعبة الحروف بالصوت")}
        </Link>
      </div>

      <FaqSection
        locale={locale}
        title={tt("Questions non-Arabic parents ask", "أسئلة الوالدين غير الناطقين بالعربية")}
        items={isAr ? faqAr : faqEn}
      />
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "teaching-arabic-non-speakers")} />
    </PageLayout>
  );
}
