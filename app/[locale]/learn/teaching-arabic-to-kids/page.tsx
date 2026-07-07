import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

// Targets parent-intent GSC queries: "how to learn arabic for kids",
// "how to structure arabic lessons for kids", "teaching arabic to a child",
// "arabic tips for toddlers", "how old is the arabic language".
const teachFaqEn = [
  { q: "How do I start teaching my child Arabic at home?", a: "Start with sounds, not writing. Speak simple Arabic words during daily routines, play letter games, and read short books together. Move from sounds to letters to words to short phrases, a little every day. You do not need to be fluent yourself to give your child a strong start." },
  { q: "How should I structure Arabic lessons for kids?", a: "Keep each session to about 10 minutes and follow a simple weekly rhythm: a couple of days on letter sounds, a couple on new words, one on a song or story, and one on review. Short, frequent, playful sessions beat long lessons. End while your child is still enjoying it." },
  { q: "What is the best age to start teaching a child Arabic?", a: "The earlier the exposure the better, even from infancy through speech and songs. Between 2 and 6, children absorb sounds and letter shapes naturally through play. Older children can start too; they just rely a little more on structured practice." },
  { q: "How can I teach Arabic if I don't speak it well myself?", a: "Learn alongside your child. Use audio so they hear correct native pronunciation, focus on a handful of words at a time, and keep it playful. Tools like the Arab Fingers letter game and printable worksheets carry the pronunciation so you can simply join in and encourage." },
  { q: "How much Arabic practice does a young child need each day?", a: "Around 10 minutes a day, most days, is plenty for young children — far more effective than an occasional long session. Consistency and warmth matter more than duration. Weave Arabic into things you already do: meals, bath time, the drive home." },
];

const teachFaqAr = [
  { q: "كيف أبدأ بتعليم طفلي العربية في البيت؟", a: "ابدأ بالأصوات لا بالكتابة. تحدّث بكلمات عربية بسيطة أثناء الروتين اليومي، والعب ألعاب الحروف، واقرآ كتباً قصيرة معاً. انتقل من الأصوات إلى الحروف إلى الكلمات إلى الجمل القصيرة، قليلاً كل يوم. ولست بحاجة لأن تكون متقناً بنفسك لتمنح طفلك بداية قوية." },
  { q: "كيف أنظّم دروس العربية للأطفال؟", a: "اجعل كل جلسة نحو ١٠ دقائق، واتبع إيقاعاً أسبوعياً بسيطاً: يومان لأصوات الحروف، ويومان لكلمات جديدة، ويوم لأغنية أو قصة، ويوم للمراجعة. الجلسات القصيرة المتكرّرة الممتعة أفضل من الدروس الطويلة، وأنهِ الجلسة والطفل لا يزال مستمتعاً." },
  { q: "ما أفضل عمر لبدء تعليم الطفل العربية؟", a: "كلما كان التعرّض أبكر كان أفضل، حتى من الرضاعة عبر الكلام والأغاني. وبين سنتين وستّ سنوات يلتقط الأطفال الأصوات وأشكال الحروف تلقائياً باللعب. والأكبر يمكنهم البدء أيضاً، لكنّهم يعتمدون قليلاً أكثر على التدريب المنظّم." },
  { q: "كيف أعلّم العربية إن لم أكن أتقنها جيداً؟", a: "تعلّم مع طفلك. استخدم الصوت ليسمع النطق الصحيح من ناطق أصلي، وركّز على بضع كلمات في كل مرة، وحافظ على المرح. أدوات مثل لعبة عرب فنجرز وأوراق العمل تحمل النطق عنك، فيكفي أن تشارك وتشجّع." },
  { q: "كم يحتاج الطفل الصغير من تدريب العربية يومياً؟", a: "نحو ١٠ دقائق يومياً في معظم الأيام تكفي تماماً للصغار، وهي أنجع بكثير من جلسة طويلة متفرّقة. الاستمرارية والدفء أهمّ من المدّة. ادمج العربية فيما تفعلونه أصلاً: الوجبات، ووقت الحمّام، والطريق إلى البيت." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/teaching-arabic-to-kids", {
    titleEn: "Teaching Arabic to Kids: A Step-by-Step Starter Plan for Parents",
    titleAr: "تعليم العربية للأطفال: خطة بدءٍ خطوة بخطوة للوالدين",
    descriptionEn:
      "A practical parent's guide to teaching Arabic to young children: a four-step starter plan (sounds → letters → words → phrases), a 10-minute-a-day weekly routine, and a clear do's and don'ts list.",
    descriptionAr:
      "دليل عمليّ للوالدين في تعليم العربية للصغار: خطة بدءٍ من أربع خطوات (الأصوات ثمّ الحروف ثمّ الكلمات ثمّ الجمل)، وروتين أسبوعيّ عشر دقائق يومياً، وقائمة واضحة بما يُفعل وما يُجتنب.",
    ogType: "article",
    publishedTime: "2026-04-16",
    modifiedTime: "2026-06-12",
    keywords: [
      "teaching arabic to kids", "تعليم العربية للأطفال",
      "how to teach arabic", "كيف نعلم العربية",
      "arabic for toddlers", "العربية للأطفال الصغار",
    ],
  });
}

const steps = [
  {
    n: 1, titleEn: "Sounds first", titleAr: "الأصوات أوّلاً",
    bodyEn: "Before any letter, let your child hear Arabic — speech, songs, and recitation. Play and chat in Arabic so the ear tunes to its rhythm and unique sounds. This is the soil everything else grows in.",
    bodyAr: "قبل أيّ حرف، أسمِع طفلك العربية: كلاماً وأناشيد وتلاوة. العب وتحدّث بالعربية حتى تألف أذنه إيقاعها وأصواتها المميّزة. هذه هي التربة التي ينبت فيها كلّ ما بعدها.",
  },
  {
    n: 2, titleEn: "Then letters", titleAr: "ثمّ الحروف",
    bodyEn: "Introduce letter shapes through play — start with the isolated forms. Tap them in ArabFingers, trace them in salt, and name them casually. Aim for recognition, not perfect writing, at this stage.",
    bodyAr: "قدّم أشكال الحروف باللعب، وابدأ بالأشكال المنفصلة. اضغطوها في عرب فنجرز، وتتبّعوها في الملح، وسمّوها عَرَضاً. والمراد في هذه المرحلة المعرفة لا إتقان الكتابة.",
  },
  {
    n: 3, titleEn: "Then short words", titleAr: "ثمّ الكلمات القصيرة",
    bodyEn: "Move to familiar two- and three-letter words your child loves: ماما (mama), بابا (baba), ماء (water), قطّة (cat). Tie each word to a real object or picture so the letters carry meaning.",
    bodyAr: "انتقلوا إلى كلمات مألوفة من حرفين أو ثلاثة يحبّها طفلك: ماما، بابا، ماء، قطّة. واربطوا كلّ كلمة بشيءٍ أو صورةٍ حتى تحمل الحروف معنى.",
  },
  {
    n: 4, titleEn: "Then everyday phrases", titleAr: "ثمّ الجمل اليومية",
    bodyEn: "Weave short Arabic phrases into daily life: a greeting, a please and thank you, a bedtime line. Used in real moments, phrases stick far better than drilled lists.",
    bodyAr: "اغرسوا جملاً عربية قصيرة في اليوم: تحيّةً، و&quot;من فضلك&quot; و&quot;شكراً&quot;، وكلمةً عند النوم. فالجمل في مواقفها الحقيقية أرسخ بكثير من قوائم تُحفظ.",
  },
];

const week = [
  { dayEn: "Mon", dayAr: "الاثنين", actEn: "Tap & name 3 letters in ArabFingers", actAr: "اضغطوا وسمّوا ٣ حروف في عرب فنجرز" },
  { dayEn: "Tue", dayAr: "الثلاثاء", actEn: "Trace those letters in a salt tray", actAr: "تتبّعوا تلك الحروف في صينية ملح" },
  { dayEn: "Wed", dayAr: "الأربعاء", actEn: "Letter hunt around the house", actAr: "بحثٌ عن الحروف في أرجاء البيت" },
  { dayEn: "Thu", dayAr: "الخميس", actEn: "Sing the alphabet song together", actAr: "غنّوا نشيد الأبجدية معاً" },
  { dayEn: "Fri", dayAr: "الجمعة", actEn: "Read one short Arabic picture book", actAr: "اقرآ كتاباً مصوّراً عربياً قصيراً" },
  { dayEn: "Sat", dayAr: "السبت", actEn: "Make a letter from playdough", actAr: "شكّلوا حرفاً من المعجون" },
  { dayEn: "Sun", dayAr: "الأحد", actEn: "Free play + review the week's letters", actAr: "لعبٌ حرٌّ ومراجعةٌ لحروف الأسبوع" },
];

const dos = [
  { en: "Keep sessions short — a few minutes, often.", ar: "اجعل الجلسات قصيرة: دقائق معدودة، ومتكرّرة." },
  { en: "Praise effort and celebrate small wins.", ar: "امدح الجهد واحتفِ بالنجاحات الصغيرة." },
  { en: "Follow your child's interest and energy.", ar: "اتبع ميل طفلك ونشاطه." },
  { en: "Model the right name gently after a mistake.", ar: "اعرض الاسم الصحيح بلطفٍ بعد الخطأ." },
  { en: "Use Arabic in real moments, not just lessons.", ar: "استعمل العربية في المواقف الحقيقية لا في الدرس وحده." },
];

const donts = [
  { en: "Don't quiz or test a reluctant child.", ar: "لا تختبر طفلاً متردّداً." },
  { en: "Don't say \"no\" or \"wrong\" — it dampens motivation.", ar: "لا تقل \"لا\" أو \"خطأ\"؛ فذلك يطفئ الحماس." },
  { en: "Don't push past the point of fun into frustration.", ar: "لا تتجاوز حدّ المتعة إلى الإحباط." },
  { en: "Don't compare your child to siblings or others.", ar: "لا تقارن طفلك بإخوته أو بغيرهم." },
  { en: "Don't expect a straight line — progress comes in waves.", ar: "لا تنتظر خطّاً مستقيماً؛ فالتقدّم يأتي موجاتٍ." },
];

export default async function TeachingArabicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Teaching Arabic to Kids: A Step-by-Step Starter Plan"
        description="A practical parent's guide to teaching Arabic to young children: a four-step starter plan, a weekly routine, and a do's and don'ts list."
        slug="learn/teaching-arabic-to-kids"
        datePublished="2026-04-16"
        dateModified="2026-06-12"
        section="Parenting"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "للوالدين" : "For Parents" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink mb-2">{isAr ? "خطة البدء: أربع خطوات" : "Your Starter Plan: Four Steps"}</h2>
        <p className="text-sm text-ink/80 leading-relaxed mb-4">
          {isAr
            ? "تسير العربية أيسر ما تكون حين تُبنى على هذا الترتيب: من الصوت إلى الحرف إلى الكلمة إلى الجملة. لا تتعجّل الانتقال؛ فكلّ خطوة تثبّت ما قبلها."
            : "Arabic comes easiest when it's built in this order: from sound, to letter, to word, to phrase. Don't rush the jump — each step anchors the one before it."}
        </p>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.n} className="card-stock card-stock-saffron p-4 flex gap-4">
              <div className="shrink-0 w-9 h-9 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center">{s.n}</div>
              <div>
                <h3 className="font-semibold text-ink mb-1">{isAr ? s.titleAr : s.titleEn}</h3>
                <p className="text-sm text-ink/80 leading-relaxed">{isAr ? s.bodyAr : s.bodyEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink mb-2">{isAr ? "روتين أسبوعيّ: عشر دقائق في اليوم" : "A Weekly Routine: 10 Minutes a Day"}</h2>
        <p className="text-sm text-ink/80 leading-relaxed mb-4">
          {isAr
            ? "لا تحتاج إلى أكثر من عشر دقائق يومياً. اختر حرفاً أو اثنين للأسبوع، ونوّع النشاط حتى لا يملّ. وإليك نموذجاً تبدّله كما تشاء."
            : "You need no more than ten minutes a day. Pick one or two letters for the week and vary the activity so it never gets stale. Here's a sample you can adapt freely."}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "اليوم" : "Day"}</th>
                <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "النشاط (≈ ١٠ دقائق)" : "Activity (≈10 min)"}</th>
              </tr>
            </thead>
            <tbody className="text-ink/80">
              {week.map((d) => (
                <tr key={d.dayEn} className="border-b border-ink/10">
                  <td className="py-2.5 px-3 text-ink/85 font-medium whitespace-nowrap">{isAr ? d.dayAr : d.dayEn}</td>
                  <td className="py-2.5 px-3">{isAr ? d.actAr : d.actEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">{isAr ? "للتحفيز: ما يُفعل وما يُجتنب" : "Motivation: Do's &amp; Don'ts"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-ink/15 bg-qalam-soft p-4">
            <h3 className="font-semibold text-qalam mb-2">{isAr ? "✓ افعل" : "✓ Do"}</h3>
            <ul className="list-disc list-inside space-y-1.5 text-ink/80">
              {dos.map((d, i) => <li key={i}>{isAr ? d.ar : d.en}</li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-ink/15 bg-rose-soft p-4">
            <h3 className="font-semibold text-rose mb-2">{isAr ? "✕ تجنّب" : "✕ Don't"}</h3>
            <ul className="list-disc list-inside space-y-1.5 text-ink/80">
              {donts.map((d, i) => <li key={i}>{isAr ? d.ar : d.en}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection
        locale={locale}
        title={isAr ? "أسئلة شائعة عن تعليم العربية للأطفال" : "Frequently Asked Questions About Teaching Arabic to Kids"}
        items={isAr ? teachFaqAr : teachFaqEn}
      />

      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "teaching-arabic-to-kids")} />

      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="btn-chunky">
          🚀 {isAr ? "جرب عرب فنجرز الآن" : "Try ArabFingers Now"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">Teaching Arabic to Kids: A Parent&apos;s Guide</h1>
      <p className="text-base text-ink/75 mb-8">Practical, step-by-step ways to introduce Arabic to toddlers and pre-schoolers</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Why Start Early?</h2>
          <p className="mb-3">Children between ages 1 and 6 are in a sensitive period for language. Their brains absorb new sounds, shapes, and patterns at an extraordinary rate. Introducing Arabic during this window — even casually through play — lays down pathways that make formal reading much easier later.</p>
          <p>Children exposed to more than one writing system tend to develop stronger mental flexibility and memory. For bilingual families, meeting Arabic script alongside English early helps a child see both languages as natural parts of their world.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">The Play-First Approach</h2>
          <p className="mb-3">The most effective way to teach young children Arabic letters is through play, not formal drills. Here&apos;s why:</p>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li><strong className="text-ink/90">No pressure</strong> — when learning feels like play, children engage more and remember more.</li>
            <li><strong className="text-ink/90">Repetition without boredom</strong> — kids replay what they enjoy, and each repeat reinforces recognition.</li>
            <li><strong className="text-ink/90">Multi-sensory learning</strong> — seeing the letter, hearing the name, and pressing keys together build stronger memories.</li>
            <li><strong className="text-ink/90">Positive associations</strong> — children who link Arabic with fun stay motivated as they grow.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Five Practical Tips</h2>
          <div className="space-y-4">
            <div className="card-stock card-stock-saffron p-4">
              <h3 className="font-semibold text-ink mb-1">1. Keep sessions short</h3>
              <p className="text-ink/80">Toddlers focus for only 2–5 minutes. Let them play with ArabFingers briefly, several times a day. Short, frequent exposure beats long sessions.</p>
            </div>
            <div className="card-stock card-stock-qalam p-4">
              <h3 className="font-semibold text-ink mb-1">2. Name the letters together</h3>
              <p className="text-ink/80">When a letter appears, say its name with your child: &quot;Look, that&apos;s Ba — باء!&quot; This shared moment reinforces learning far more than the app alone.</p>
            </div>
            <div className="card-stock card-stock-rose p-4">
              <h3 className="font-semibold text-ink mb-1">3. Connect letters to real life</h3>
              <p className="text-ink/80">Spot a letter your child knows on a sign, a book, or a food package, and point it out: &quot;There&apos;s the ب we saw in ArabFingers!&quot;</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">4. Celebrate progress</h3>
              <p className="text-ink/80">When your child recognises a letter or says its name, celebrate. Positive reinforcement builds confidence and keeps them coming back.</p>
            </div>
            <div className="card-stock card-stock-saffron p-4">
              <h3 className="font-semibold text-ink mb-1">5. Don&apos;t correct harshly</h3>
              <p className="text-ink/80">If your child names a letter wrongly, model the right name gently: &quot;That&apos;s تاء — Ta!&quot; rather than &quot;No, that&apos;s not Ba.&quot;</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Age-Appropriate Expectations</h2>
          <div className="space-y-3">
            <div className="card-stock card-stock-qalam p-4">
              <h3 className="font-semibold text-ink mb-1">Ages 1–2: Sensory exploration</h3>
              <p className="text-ink/80">Children enjoy the cause-and-effect of pressing keys and seeing colourful responses. They&apos;re not learning names yet — they&apos;re building familiarity with Arabic shapes and sounds.</p>
            </div>
            <div className="card-stock card-stock-rose p-4">
              <h3 className="font-semibold text-ink mb-1">Ages 2–4: Recognition begins</h3>
              <p className="text-ink/80">Children start recognising familiar letters and may say some names. They might have favourites — &quot;I want to find the ب!&quot; — a wonderful sign of emerging literacy.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">Ages 4–6: Active learning</h3>
              <p className="text-ink/80">Pre-schoolers can name most letters, grasp that letters carry sounds, and start connecting letters into words — ready for gentle, structured Arabic alongside play.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">تعليم العربية للأطفال: دليل الوالدين</h1>
      <p className="text-base text-ink/75 mb-8">طرائق عملية خطوةً خطوة لتعريف الصغار بالعربية</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">لماذا نبدأ مبكّراً؟</h2>
          <p className="mb-3">الطفل بين السنة والسادسة في مرحلة حسّاسة لاكتساب اللغة؛ يمتصّ دماغه الأصوات والأشكال والأنماط الجديدة بسرعةٍ عجيبة. وتعريضه للعربية في هذه النافذة — ولو عَرَضاً باللعب — يُرسي مساراتٍ تجعل القراءة النظامية أيسر بكثير فيما بعد.</p>
          <p>والطفل الذي يُعرّض لأكثر من نظام كتابةٍ تنمو لديه مرونة ذهنية وذاكرة أقوى. وفي الأسر ثنائية اللغة، يعين لقاءُ الخطّ العربيّ بجانب الإنجليزيّ مبكّراً الطفلَ على أن يرى اللغتين جزأين طبيعيّين من عالمه.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">نهج اللعب أوّلاً</h2>
          <p className="mb-3">أنجع طريقةٍ لتعليم الصغار الحروف العربية هي اللعب لا التلقين. وبيان ذلك:</p>
          <ul className="list-disc list-inside space-y-2 text-ink/80">
            <li><strong className="text-ink/90">بلا ضغط</strong> — حين يكون التعلّم لعباً، ينخرط الطفل أكثر ويحفظ أكثر.</li>
            <li><strong className="text-ink/90">تكرارٌ بلا ملل</strong> — يعيد الطفل ما يحبّ، وكلّ إعادةٍ تثبّت المعرفة.</li>
            <li><strong className="text-ink/90">تعلّمٌ بالحواسّ</strong> — رؤية الحرف وسماع اسمه وضغط المفاتيح معاً تبني ذكرياتٍ أرسخ.</li>
            <li><strong className="text-ink/90">ارتباطاتٌ سارّة</strong> — من ربط العربية بالمرح بقي محفَّزاً وهو يكبر.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">خمس نصائح عملية</h2>
          <div className="space-y-4">
            <div className="card-stock card-stock-saffron p-4">
              <h3 className="font-semibold text-ink mb-1">١. اجعل الجلسات قصيرة</h3>
              <p className="text-ink/80">انتباه الصغير لا يتعدّى دقيقتين إلى خمسٍ. دعه يلعب بعرب فنجرز قليلاً، مرّاتٍ في اليوم؛ فالتعريض القصير المتكرّر خيرٌ من الجلسات الطويلة.</p>
            </div>
            <div className="card-stock card-stock-qalam p-4">
              <h3 className="font-semibold text-ink mb-1">٢. سمّوا الحروف معاً</h3>
              <p className="text-ink/80">حين يظهر الحرف، قل اسمه مع طفلك: &quot;انظر، هذه باء!&quot;. هذه اللحظة المشتركة تثبّت التعلّم أكثر من التطبيق وحده.</p>
            </div>
            <div className="card-stock card-stock-rose p-4">
              <h3 className="font-semibold text-ink mb-1">٣. اربط الحروف بالواقع</h3>
              <p className="text-ink/80">إذا رأيت حرفاً يعرفه طفلك على لافتةٍ أو كتابٍ أو عبوة طعام، فأشِر إليه: &quot;هذه الباء التي رأيناها في عرب فنجرز!&quot;.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">٤. احتفِ بالتقدّم</h3>
              <p className="text-ink/80">حين يعرف طفلك حرفاً أو يقول اسمه، احتفِ به. فالتعزيز الإيجابيّ يبني الثقة ويرغّبه في العودة.</p>
            </div>
            <div className="card-stock card-stock-saffron p-4">
              <h3 className="font-semibold text-ink mb-1">٥. لا تصحّح بقسوة</h3>
              <p className="text-ink/80">إن سمّى طفلك حرفاً خطأً، فاعرض الصواب بلطفٍ: &quot;هذه تاء!&quot; بدل &quot;لا، ليست باء&quot;.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">توقّعاتٌ تناسب كلّ عمر</h2>
          <div className="space-y-3">
            <div className="card-stock card-stock-qalam p-4">
              <h3 className="font-semibold text-ink mb-1">١–٢ سنة: استكشافٌ حسّيّ</h3>
              <p className="text-ink/80">يستمتع الطفل بالسبب والنتيجة في ضغط المفاتيح ورؤية الاستجابات الملوّنة. لا يتعلّم الأسماء بعد، بل يبني ألفةً بأشكال العربية وأصواتها.</p>
            </div>
            <div className="card-stock card-stock-rose p-4">
              <h3 className="font-semibold text-ink mb-1">٢–٤ سنوات: بدء التعرّف</h3>
              <p className="text-ink/80">يبدأ الطفل في معرفة الحروف المألوفة، وقد يقول بعض الأسماء، وربّما صار له حرفٌ مفضّل: &quot;أريد أن أجد الباء!&quot;، وهي بشارةٌ لبدء القراءة.</p>
            </div>
            <div className="card-stock card-stock-violet p-4">
              <h3 className="font-semibold text-ink mb-1">٤–٦ سنوات: تعلّمٌ نشط</h3>
              <p className="text-ink/80">يسمّي أطفال الروضة أكثر الحروف، ويدركون أنّ الحرف يحمل صوتاً، ويبدأون بوصل الحروف كلماتٍ، فيكونون مهيّئين لعربيةٍ منظّمةٍ لطيفةٍ بجانب اللعب.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
