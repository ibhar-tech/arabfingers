import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ShareWhatsApp } from "@/components/ShareWhatsApp";
import { getRelatedArticles } from "@/lib/related";
import { worksheetSets } from "@/lib/worksheets";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/* Ramadan 1448 (expected to begin around 8 February 2027). A seasonal page
   published three months ahead so it is indexed before families start
   searching in January. It leads to the Ramadan calendar pack, the Ramadan
   colouring book and the Little Lantern story; the older blog post covers
   Arabic vocabulary for the month and is linked rather than repeated. */

const PUBLISHED = "2026-11-01";
const PACK_PAGES = worksheetSets.find((s) => s.id === "arabic-ramadan-calendar")!.pages;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/ramadan-activities-for-kids", {
    titleEn: "Ramadan Activities for Kids 2027: 10 Ideas + Free Calendar Printable",
    titleAr: "أنشطة رمضان للأطفال 1448: 10 أفكار مع تقويم رمضان مجاني للطباعة",
    descriptionEn:
      "Ten simple Ramadan activities for children at home and in class — a lantern calendar, a good-deeds chart, iftar jobs, an Eid card — with free printables. Ramadan 1448 is expected to begin around 8 February 2027.",
    descriptionAr:
      "عشرة أنشطة رمضانية بسيطة للأطفال في البيت والصفّ — تقويم الفوانيس، وجدول الأعمال الطيّبة، ومهامّ الإفطار، وبطاقة العيد — مع مطبوعات مجانية. يُتوقّع أن يبدأ رمضان 1448 نحو 8 فبراير 2027.",
    ogType: "article",
    publishedTime: PUBLISHED,
    keywords: [
      "ramadan activities for kids", "أنشطة رمضان للأطفال",
      "ramadan 2027 for kids", "رمضان 1448 للأطفال",
      "ramadan calendar for kids", "تقويم رمضان للأطفال",
      "ramadan good deeds chart", "جدول الأعمال الطيبة في رمضان",
    ],
  });
}

type Activity = { titleEn: string; titleAr: string; en: string; ar: string; link?: { href: string; en: string; ar: string } };

const activities: Activity[] = [
  {
    titleEn: "Colour one lantern each evening", titleAr: "لوّن فانوساً كلّ مساء",
    en: "A 30-lantern calendar on the wall, one coloured in at every iftar. Young children cannot feel a month passing; they can see a row of lanterns filling up.",
    ar: "تقويم من 30 فانوساً على الجدار، يُلوَّن واحد منها عند كلّ إفطار. الطفل الصغير لا يشعر بمرور الشهر، لكنّه يرى صفّ الفوانيس وهو يمتلئ.",
    link: { href: "/printables/arabic-ramadan-calendar", en: "Lantern calendar (PDF)", ar: "تقويم الفوانيس (PDF)" },
  },
  {
    titleEn: "Keep a good-deeds chart", titleAr: "جدول الأعمال الطيّبة",
    en: "Six everyday deeds — helping at home, a kind word, sharing, Quran, dua for someone, patience — and a star for each one done. Fill it in together at bedtime.",
    ar: "ستّة أعمال يومية — المساعدة في البيت، والكلمة الطيّبة، والمشاركة، والقرآن، والدعاء للغير، والصبر — ونجمة لكلّ عمل. املأوه معاً قبل النوم.",
    link: { href: "/printables/arabic-ramadan-calendar", en: "Good-deeds chart (PDF)", ar: "جدول الأعمال الطيّبة (PDF)" },
  },
  {
    titleEn: "Give your child an iftar job", titleAr: "مهمّة للطفل في الإفطار",
    en: "Putting out the dates, filling the water glasses, calling everyone when the adhan starts. A real job makes the evening theirs too, fasting or not.",
    ar: "وضع التمر، وملء أكواب الماء، ونداء الجميع عند الأذان. المهمّة الحقيقية تجعل المساء له أيضاً، صام أم لم يصم.",
  },
  {
    titleEn: "Watch for the crescent", titleAr: "ترقّبوا الهلال",
    en: "On the evening Ramadan is expected, go outside after sunset and look west for the thin new moon. Then look again at the end of the month, for Eid.",
    ar: "في المساء الذي يُترقّب فيه رمضان، اخرجوا بعد الغروب وانظروا نحو الغرب بحثاً عن الهلال الرفيع. ثمّ أعيدوا ذلك في آخر الشهر لهلال العيد.",
  },
  {
    titleEn: "Learn eight Ramadan words", titleAr: "تعلّم ثماني كلمات رمضانية",
    en: "رمضان، صيام، إفطار، سحور، هلال، فانوس، تمر، عيد — one a few days, said at the moment it happens: سحور before dawn, إفطار at sunset.",
    ar: "رمضان، صيام، إفطار، سحور، هلال، فانوس، تمر، عيد — كلمة كلّ بضعة أيام، تُقال في وقتها: السحور قبل الفجر، والإفطار عند الغروب.",
    link: { href: "/printables/arabic-ramadan-calendar", en: "Words to trace (PDF)", ar: "كلمات للتتبّع (PDF)" },
  },
  {
    titleEn: "Read a Ramadan story", titleAr: "اقرأوا قصّة رمضانية",
    en: "The Little Lantern follows Ahmad and the lantern on his door, and what he learns about sharing when guests arrive. Bilingual, with a free PDF.",
    ar: "قصّة «الفانوس الصغير» عن أحمد وفانوسه المعلّق على الباب، وما يتعلّمه عن المشاركة حين يأتي الضيوف. بالعربية والإنجليزية مع ملف PDF مجاني.",
    link: { href: "/stories/al-fanoos-al-sagheer", en: "The Little Lantern", ar: "الفانوس الصغير" },
  },
  {
    titleEn: "Make a sharing box", titleAr: "صندوق المشاركة",
    en: "A shoebox by the door where the family adds a coin, a tin of food or a toy to give away. At the end of the month, take it together to someone who needs it.",
    ar: "علبة أحذية قرب الباب تضع فيها الأسرة قطعة نقود أو علبة طعام أو لعبة للعطاء. وفي آخر الشهر خذوها معاً إلى من يحتاجها.",
  },
  {
    titleEn: "Colour the Ramadan pictures", titleAr: "لوّنوا صور رمضان",
    en: "A lantern, a mosque, a crescent, dates, a gift and a balloon, each with its Arabic name to trace — a quiet activity for the hour before iftar.",
    ar: "فانوس، ومسجد، وهلال، وتمر، وهدية، وبالون، مع اسم كلّ منها بالعربية للتتبّع — نشاط هادئ للساعة التي تسبق الإفطار.",
    link: { href: "/printables/arabic-ramadan-coloring", en: "Ramadan colouring book (PDF)", ar: "كتاب تلوين رمضان (PDF)" },
  },
  {
    titleEn: "Decorate the house", titleAr: "زيّنوا البيت",
    en: "Paper lanterns, a string of stars, a crescent on the window. Let your child choose where each one goes; it becomes their Ramadan as much as yours.",
    ar: "فوانيس من الورق، وسلسلة نجوم، وهلال على النافذة. دع طفلك يختار مكان كلّ منها، فيصير رمضان رمضانه كما هو رمضانك.",
  },
  {
    titleEn: "Make Eid cards", titleAr: "بطاقات العيد",
    en: "In the last week, colour and fold an Eid Mubarak card for grandparents, a teacher or a neighbour, with the greeting traced in Arabic inside.",
    ar: "في الأسبوع الأخير لوّنوا بطاقة «عيد مبارك» واطووها للأجداد أو المعلّمة أو الجيران، مع التهنئة متتبَّعة بالعربية في داخلها.",
    link: { href: "/printables/arabic-ramadan-calendar", en: "Eid card (PDF)", ar: "بطاقة العيد (PDF)" },
  },
];

const faqEn = [
  { q: "When does Ramadan start in 2027?", a: "Ramadan 1448 is expected to begin around 8 February 2027, and Eid al-Fitr around 9–10 March 2027. The exact days depend on the sighting of the new moon, so they can shift by a day." },
  { q: "How can young children take part in Ramadan if they do not fast?", a: "Through everything around the fast: an iftar job, a calendar to colour, a good-deeds chart, a sharing box, decorating the house and making Eid cards. These are how most children first experience the month." },
  { q: "What are good Ramadan activities for a classroom?", a: "The lantern calendar on the wall with one lantern coloured each day, Ramadan words to trace, a class sharing box and Eid cards in the final week. All the printables on this page can be copied for a whole class." },
  { q: "Are the Ramadan printables free?", a: `Yes. The calendar pack (${PACK_PAGES} pages) and the Ramadan colouring book are free PDFs with no signup and no watermark.` },
];

const faqAr = [
  { q: "متى يبدأ رمضان 1448؟", a: "يُتوقّع أن يبدأ رمضان 1448 نحو 8 فبراير 2027، وأن يكون عيد الفطر نحو 9 أو 10 مارس 2027. والأيام الدقيقة تتوقّف على رؤية الهلال، فقد تتغيّر يوماً." },
  { q: "كيف يشارك الأطفال الصغار في رمضان إن لم يصوموا؟", a: "بكلّ ما يحيط بالصيام: مهمّة في الإفطار، وتقويم يلوّنونه، وجدول للأعمال الطيّبة، وصندوق للمشاركة، وتزيين البيت، وبطاقات العيد. هكذا يعيش أكثر الأطفال الشهر أوّل مرّة." },
  { q: "ما أنشطة رمضان المناسبة للصفّ؟", a: "تقويم الفوانيس على الجدار مع فانوس يُلوَّن كلّ يوم، وكلمات رمضانية للتتبّع، وصندوق مشاركة للصفّ، وبطاقات العيد في الأسبوع الأخير. ويمكن نسخ كلّ المطبوعات في هذه الصفحة لصفّ كامل." },
  { q: "هل مطبوعات رمضان مجانية؟", a: `نعم. حزمة التقويم (${PACK_PAGES} صفحات) وكتاب تلوين رمضان ملفّات PDF مجانية بلا تسجيل وبلا علامة مائية.` },
];

export default async function RamadanActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const title = tt("Ramadan Activities for Kids: 10 Ideas for 2027", "أنشطة رمضان للأطفال: 10 أفكار لرمضان 1448");

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={title}
        description={tt(
          "Ten simple Ramadan activities for children, with a free lantern calendar, good-deeds chart and Eid card.",
          "عشرة أنشطة رمضانية بسيطة للأطفال، مع تقويم فوانيس وجدول أعمال طيّبة وبطاقة عيد مجانية.",
        )}
        slug="learn/ramadan-activities-for-kids"
        datePublished={PUBLISHED}
        section="Activities"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("Ramadan activities", "أنشطة رمضان") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">{title}</h1>
      <p className="text-base text-ink/75 mb-6">
        {tt("For home, the classroom and the mosque school — with free printables", "للبيت والصفّ ومدرسة المسجد — مع مطبوعات مجانية")}
      </p>

      <div className="space-y-3 text-sm leading-relaxed text-ink/80 mb-6 max-w-3xl">
        <p>
          {tt(
            "Young children experience Ramadan through what they can see and do: the lantern on the door, the dates on the table, the crescent in the sky. The ten activities below give them a part in the month whether or not they are fasting yet, and most take ten minutes or less.",
            "يعيش الأطفال الصغار رمضان بما يرونه ويفعلونه: الفانوس على الباب، والتمر على المائدة، والهلال في السماء. والأنشطة العشرة أدناه تعطيهم دوراً في الشهر صاموا أم لم يصوموا، وأكثرها لا يستغرق أكثر من عشر دقائق.",
          )}
        </p>
      </div>

      <section className="mb-8 rounded-2xl border border-ink/10 bg-card p-5">
        <h2 className="text-lg font-semibold text-ink mb-3">{tt("Ramadan 1448 at a glance", "رمضان 1448 باختصار")}</h2>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-ink/80 leading-relaxed">
          <li>{tt("Expected start: around 8 February 2027, after the new moon is sighted.", "البداية المتوقّعة: نحو 8 فبراير 2027، بعد رؤية الهلال.")}</li>
          <li>{tt("Length: 29 or 30 days.", "المدّة: 29 أو 30 يوماً.")}</li>
          <li>{tt("Eid al-Fitr: expected around 9–10 March 2027.", "عيد الفطر: نحو 9 أو 10 مارس 2027.")}</li>
          <li>{tt("Print the calendar before the first night so the first lantern is coloured at the first iftar.", "اطبعوا التقويم قبل الليلة الأولى ليُلوَّن الفانوس الأوّل عند أوّل إفطار.")}</li>
        </ul>
      </section>

      <WorksheetCrossLink
        locale={locale}
        packId="arabic-ramadan-calendar"
        titleEn={`Free Ramadan calendar pack — ${PACK_PAGES} printable pages`}
        titleAr={`حزمة تقويم رمضان مجاناً — ${PACK_PAGES} صفحات للطباعة`}
        textEn="A 30-lantern calendar, a good-deeds star chart in two halves, eight Ramadan words to trace and an Eid Mubarak card. One PDF, no signup, no dates printed so it works every year."
        textAr="تقويم من 30 فانوساً، وجدول نجوم للأعمال الطيّبة في صفحتين، وثماني كلمات رمضانية للتتبّع، وبطاقة «عيد مبارك». ملف PDF واحد بلا تسجيل، ولا تواريخ مطبوعة فيصلح لكلّ عام."
      />

      <div className="mb-8">
        <ShareWhatsApp
          locale={locale}
          url={`https://www.arabfingers.site/${locale}/learn/ramadan-activities-for-kids`}
          text={tt("Ramadan activities for kids + free calendar printable", "أنشطة رمضان للأطفال مع تقويم مجاني للطباعة")}
        />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-4">{tt("10 Ramadan activities for children", "10 أنشطة رمضانية للأطفال")}</h2>
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div key={a.titleEn} className="rounded-2xl border border-ink/8 bg-card p-5">
              <h3 className="text-lg font-semibold text-ink mb-2">{i + 1}. {tt(a.titleEn, a.titleAr)}</h3>
              <p className="text-sm text-ink/80 leading-relaxed">{tt(a.en, a.ar)}</p>
              {a.link && (
                <Link href={`/${locale}${a.link.href}`} className="mt-2 inline-block text-sm font-semibold text-ink underline">
                  {tt(a.link.en, a.link.ar)} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <p className="mb-10 text-sm text-ink/80">
        {tt("More Arabic for the month: ", "مزيد من العربية في رمضان: ")}
        <Link href={`/${locale}/blog/ramadan-activities-arabic-learning`} className="font-semibold text-ink underline">
          {tt("Ramadan words and activities by age", "كلمات رمضان وأنشطته حسب العمر")}
        </Link>
      </p>

      <FaqSection
        locale={locale}
        title={tt("Questions about Ramadan with children", "أسئلة عن رمضان مع الأطفال")}
        items={isAr ? faqAr : faqEn}
      />

      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "ramadan-activities-for-kids")} />
    </PageLayout>
  );
}
