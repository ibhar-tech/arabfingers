import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ShareWhatsApp } from "@/components/ShareWhatsApp";
import { getRelatedArticles } from "@/lib/related";
import { letterGuide } from "@/lib/letterGuide";
import { letterWorksheetPages } from "@/lib/letterWorksheets";
import { letterPositions } from "@/lib/letterWords";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/* "حرف الأسبوع": kindergartens in Arab countries teach one letter a week, and
   in Nov 2026 Search Console showed their searches arriving — single letters
   ("ث", "حرف الجيم") from Iraq, Egypt, Syria and Saudi on phones. This page is
   the plan that ties each week's letter page, PDF and game together, so a
   teacher or parent can follow the whole year from one URL. */

const PUBLISHED = "2026-11-01";
const WEEKS = letterWorksheetPages.length;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/letter-of-the-week", {
    titleEn: `Arabic Letter of the Week: a ${WEEKS}-Week Plan with Free Worksheets`,
    titleAr: `حرف الأسبوع: خطة ${WEEKS} أسبوعاً لتعليم الحروف العربية مع أوراق عمل مجانية`,
    descriptionEn:
      `One Arabic letter a week, ten minutes a day: a ${WEEKS}-week plan for kindergarten and home, with a free tracing worksheet, picture words and a game for every letter.`,
    descriptionAr:
      `حرف واحد كل أسبوع، وعشر دقائق في اليوم: خطة ${WEEKS} أسبوعاً للروضة والبيت، لكل حرف ورقة تتبّع مجانية وكلمات بالصور ولعبة.`,
    ogType: "article",
    publishedTime: PUBLISHED,
    keywords: [
      "arabic letter of the week", "حرف الأسبوع",
      "arabic alphabet lesson plan kindergarten", "خطة تعليم الحروف العربية للروضة",
      "teach arabic letters one a week", "تعليم الحروف الهجائية للأطفال",
    ],
  });
}

const days = [
  {
    en: "Meet the letter", ar: "تعرّف على الحرف",
    textEn: "Hear it in the letter game, say its name and sound together, and count its dots.",
    textAr: "اسمعه في لعبة الحروف، وانطقا اسمه وصوته معاً، وعُدّا نقاطه.",
  },
  {
    en: "Trace it", ar: "تتبّعه",
    textEn: "The worksheet's big letter and first tracing rows: finger first, then pencil.",
    textAr: "الحرف الكبير وصفوف التتبّع الأولى في الورقة: بالإصبع أولاً ثم بالقلم.",
  },
  {
    en: "Find its four shapes", ar: "اكتشف أشكاله الأربعة",
    textEn: "Look at the picture words on the letter page: is the letter at the start, in the middle or at the end?",
    textAr: "انظرا إلى الكلمات بالصور في صفحة الحرف: هل الحرف في أول الكلمة أم وسطها أم آخرها؟",
  },
  {
    en: "Play", ar: "العب",
    textEn: "Trace it on screen in the tracing game, or tell it apart from its look-alikes in the dots game.",
    textAr: "تتبّعه على الشاشة في لعبة التتبّع، أو ميّزه من الحروف التي تشبهه في لعبة النقاط.",
  },
  {
    en: "Review", ar: "راجع",
    textEn: "Finish the empty boxes on the sheet, hunt for the letter around the house, and add it to the alphabet wall.",
    textAr: "أكملا المربّعات الفارغة في الورقة، وابحثا عن الحرف في البيت، وأضيفاه إلى جدار الحروف.",
  },
];

const faqEn = [
  { q: "What is 'letter of the week'?", a: `A way of teaching the alphabet one letter at a time: the whole week is about one letter — its sound, its shapes, words that start with it. With 28 Arabic letters it takes ${WEEKS} weeks, which fits inside a school year with time left for review.` },
  { q: "In what order should I teach the Arabic letters?", a: "Most schools follow the alphabet order (alif, ba, ta, tha…), which is what this plan uses, because it matches the alphabet song and the books children see. It also groups letters that share a shape: ب ت ث come in three weeks running, so the only new thing is the dots." },
  { q: "How long should each session be?", a: "Ten minutes a day, five days a week, is enough for ages 3–6. Stop while your child is still enjoying it; the next day goes better." },
  { q: "What age is letter of the week for?", a: "Ages 3 to 6: preschool, KG1 and KG2. Three-year-olds can do the hearing, colouring and game days; from four, add the tracing." },
  { q: "What comes after the 28 weeks?", a: "The short vowels (fatha, kasra, damma), then reading letters with them. The harakat and letters-with-harakat packs pick up exactly where the alphabet ends." },
];

const faqAr = [
  { q: "ما هو «حرف الأسبوع»؟", a: `طريقة لتعليم الحروف حرفاً حرفاً: الأسبوع كلّه لحرف واحد — صوته وأشكاله والكلمات التي تبدأ به. ومع 28 حرفاً تستغرق الخطة ${WEEKS} أسبوعاً، وهذا يتّسع داخل السنة الدراسية مع وقت للمراجعة.` },
  { q: "بأيّ ترتيب أعلّم الحروف العربية؟", a: "تتبع أكثر المدارس الترتيب الهجائي (أ ب ت ث…)، وهو ترتيب هذه الخطة، لأنه يوافق أنشودة الحروف والكتب التي يراها الطفل. كما يجمع الحروف المتشابهة شكلاً: ب ت ث في ثلاثة أسابيع متتالية، فالجديد كل أسبوع هو النقاط فقط." },
  { q: "كم مدّة الجلسة الواحدة؟", a: "عشر دقائق يومياً، خمسة أيام في الأسبوع، تكفي من 3 إلى 6 سنوات. توقّفا والطفل ما زال مستمتعاً، فيكون اليوم التالي أفضل." },
  { q: "لأيّ عمر تناسب خطة حرف الأسبوع؟", a: "من 3 إلى 6 سنوات: التمهيدي والروضة الأولى والثانية. ابن الثالثة يشارك في أيام الاستماع والتلوين واللعب، ومن الرابعة يُضاف التتبّع." },
  { q: "ماذا بعد الأسابيع الـ28؟", a: "الحركات القصيرة (الفتحة والكسرة والضمّة)، ثم قراءة الحروف بها. وحزمتا الحركات والحروف مع الحركات تبدآن من حيث تنتهي الأبجدية." },
];

export default async function LetterOfTheWeekPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const title = tt(`Arabic Letter of the Week: a ${WEEKS}-Week Plan`, `حرف الأسبوع: خطة ${WEEKS} أسبوعاً لتعليم الحروف العربية`);

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={title}
        description={tt(
          `One Arabic letter a week for ${WEEKS} weeks, with a free worksheet, picture words and a game for each letter.`,
          `حرف عربي كل أسبوع لمدة ${WEEKS} أسبوعاً، ولكل حرف ورقة مجانية وكلمات بالصور ولعبة.`,
        )}
        slug="learn/letter-of-the-week"
        datePublished={PUBLISHED}
        section="Activities"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("Letter of the week", "حرف الأسبوع") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">{title}</h1>
      <p className="text-base text-ink/75 mb-6">
        {tt(
          "For kindergarten teachers and parents: ten minutes a day, one letter a week, a free worksheet for each",
          "لمعلّمات الروضة والوالدين: عشر دقائق يومياً، حرف كل أسبوع، وورقة مجانية لكل حرف",
        )}
      </p>

      <div className="space-y-3 text-sm leading-relaxed text-ink/80 mb-6 max-w-3xl">
        <p>
          {tt(
            "Giving each letter a whole week works because young children learn a letter by meeting it many times in different ways: hearing it, tracing it, spotting it in words, playing with it. One letter at a time also keeps the look-alikes apart — ب, ت and ث arrive in three separate weeks, so by the time ث comes, the only new thing is its three dots.",
            "تخصيص أسبوع كامل لكل حرف ينجح لأنّ الطفل الصغير يتعلّم الحرف حين يلقاه مرّات كثيرة وبطرق مختلفة: يسمعه ويتتبّعه ويكتشفه في الكلمات ويلعب به. والحرف الواحد في كل مرّة يُبعد الخلط بين الحروف المتشابهة — فالباء والتاء والثاء تأتي في ثلاثة أسابيع منفصلة، وحين يصل الطفل إلى الثاء يكون الجديد نقاطها الثلاث فقط.",
          )}
        </p>
        <p>
          {tt(
            `Every letter below has its own free page: a one-page tracing worksheet (PDF), the four shapes, words with pictures at the start, middle and end, and pronunciation help for parents who do not speak Arabic.`,
            `لكل حرف أدناه صفحة مجانية خاصّة: ورقة تتبّع من صفحة واحدة (PDF)، وأشكال الحرف الأربعة، وكلمات بالصور في أول الكلمة ووسطها وآخرها، وشرح للنطق.`,
          )}
        </p>
      </div>

      <div className="mb-8">
        <ShareWhatsApp
          locale={locale}
          url={`https://www.arabfingers.site/${locale}/learn/letter-of-the-week`}
          text={tt(`Arabic letter of the week — ${WEEKS}-week plan with free worksheets`, `خطة حرف الأسبوع — ${WEEKS} أسبوعاً مع أوراق عمل مجانية`)}
        />
      </div>

      <section className="mb-10 rounded-2xl border border-ink/10 bg-card p-5">
        <h2 className="text-xl font-semibold text-ink mb-1">{tt("How one week works", "كيف يسير الأسبوع")}</h2>
        <p className="text-sm text-ink/75 mb-4">{tt("Five days, about ten minutes each.", "خمسة أيام، نحو عشر دقائق لكلّ يوم.")}</p>
        <ol className="space-y-3">
          {days.map((d, i) => (
            <li key={d.en} className="flex gap-3 text-sm leading-relaxed text-ink/80">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-saffron-soft font-bold text-ink">{i + 1}</span>
              <span>
                <b className="text-ink">{tt(`Day ${i + 1} — ${d.en}.`, `اليوم ${i + 1} — ${d.ar}.`)}</b> {tt(d.textEn, d.textAr)}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-ink/75">
          {tt("Games: ", "الألعاب: ")}
          <Link href={`/${locale}/play`} className="font-semibold text-ink underline">{tt("letter game", "لعبة الحروف")}</Link>
          {" · "}
          <Link href={`/${locale}/games/trace`} className="font-semibold text-ink underline">{tt("tracing game", "لعبة التتبّع")}</Link>
          {" · "}
          <Link href={`/${locale}/games/dots`} className="font-semibold text-ink underline">{tt("how many dots?", "كم نقطة؟")}</Link>
          {" · "}
          <Link href={`/${locale}/games/memory`} className="font-semibold text-ink underline">{tt("memory match", "لعبة الذاكرة")}</Link>
        </p>
      </section>

      <section className="mb-10" aria-labelledby="weeks">
        <h2 id="weeks" className="text-xl font-semibold text-ink mb-1">{tt(`The ${WEEKS} weeks`, `الأسابيع الـ${WEEKS}`)}</h2>
        <p className="text-sm text-ink/75 mb-4">
          {tt(
            `Tip for a school year: add a review week after weeks 7, 14 and 21 and the plan fills ${WEEKS + 3} weeks.`,
            `اقتراح للسنة الدراسية: أضيفوا أسبوع مراجعة بعد الأسابيع 7 و14 و21، فتملأ الخطة ${WEEKS + 3} أسبوعاً.`,
          )}
        </p>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {letterWorksheetPages.map((p) => {
            const entry = letterGuide[p.index];
            const words = letterPositions(entry).start.slice(0, 2);
            return (
              <li key={p.slug} className="card-stock flex items-center gap-4 p-4">
                <span className="flex h-16 w-16 flex-none items-center justify-center rounded-xl border-2 border-ink/10 bg-white text-4xl text-ink" lang="ar" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
                  {entry.ar}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-ink/70">{tt(`Week ${p.index + 1}`, `الأسبوع ${p.index + 1}`)}</div>
                  <Link href={`/${locale}/printables/letters/${p.slug}`} className="font-display text-base font-extrabold text-ink underline-offset-4 hover:underline">
                    {tt(`${entry.enName} (${entry.ar})`, `حرف ال${entry.arName}`)}
                  </Link>
                  <div className="mt-0.5 text-sm text-ink/80">
                    {words.map((w) => `${w.emoji} ${w.word}`).join("  ")}
                  </div>
                  <a href={`/printables/letters/${p.slug}.pdf`} download className="mt-1 inline-block text-xs font-bold text-ink underline underline-offset-4">
                    ⬇ {tt("Worksheet PDF", "ورقة العمل PDF")}
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <WorksheetCrossLink
        locale={locale}
        packId="arabic-alphabet-tracing"
        titleEn="All 28 letters in one PDF"
        titleAr="الحروف الـ28 في ملف PDF واحد"
        textEn="Print the whole year at once: the alphabet tracing pack has every letter's sheet in teaching order."
        textAr="اطبعوا السنة كلّها مرّة واحدة: حزمة تتبّع الحروف فيها ورقة كل حرف بترتيب التعليم."
      />

      <FaqSection
        locale={locale}
        title={tt("Questions about letter of the week", "أسئلة عن حرف الأسبوع")}
        items={isAr ? faqAr : faqEn}
      />

      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "letter-of-the-week")} />
    </PageLayout>
  );
}
