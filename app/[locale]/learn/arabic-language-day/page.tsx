import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/* World Arabic Language Day, 18 December. A seasonal page: schools and weekend
   schools search for activities every December, and the printable pack
   (/printables/arabic-language-day) gives them something to hand out. Published
   seven weeks ahead so it is indexed before the searches start. */

const PUBLISHED = "2026-10-29";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-language-day", {
    titleEn: "Arabic Language Day for Kids: 10 Activities for 18 December",
    titleAr: "اليوم العالمي للغة العربية للأطفال: 10 أنشطة ليوم 18 ديسمبر",
    descriptionEn:
      "World Arabic Language Day is on 18 December. Ten simple activities for home and the classroom — from writing your name in Arabic to an 'Arabic only' dinner — plus a free printable certificate and activity pack.",
    descriptionAr:
      "اليوم العالمي للغة العربية في 18 ديسمبر. عشرة أنشطة بسيطة للبيت والصفّ — من كتابة الاسم بالعربية إلى عشاء «بالعربية فقط» — مع شهادة وحزمة أنشطة مجانية للطباعة.",
    ogType: "article",
    publishedTime: PUBLISHED,
    keywords: [
      "arabic language day activities for kids", "أنشطة اليوم العالمي للغة العربية",
      "world arabic language day 18 december", "اليوم العالمي للغة العربية للأطفال",
      "arabic language day ideas for school", "أفكار للاحتفال باليوم العالمي للغة العربية في المدرسة",
    ],
  });
}

type Activity = { titleEn: string; titleAr: string; ageEn: string; ageAr: string; en: string; ar: string; link?: { href: string; en: string; ar: string } };

const activities: Activity[] = [
  {
    titleEn: "Write your name in Arabic", titleAr: "اكتب اسمك بالعربية",
    ageEn: "Ages 4–8", ageAr: "من 4 إلى 8 سنوات",
    en: "A grown-up writes the child's name in Arabic, the child traces it, then writes it alone. It is the one word every child wants to see in a new script — and the box on the certificate is waiting for it.",
    ar: "يكتب الكبير اسم الطفل بالعربية، فيتتبّعه الطفل ثمّ يكتبه وحده. إنّه الكلمة التي يريد كلّ طفل أن يراها بخطّ جديد — ومربّع الشهادة ينتظرها.",
    link: { href: "/printables/arabic-language-day", en: "Name sheet + certificate (PDF)", ar: "ورقة الاسم والشهادة (PDF)" },
  },
  {
    titleEn: "Colour an 'I love Arabic' poster", titleAr: "لوّن ملصق «أحبّ العربية»",
    ageEn: "Ages 3–8", ageAr: "من 3 إلى 8 سنوات",
    en: "Big outlined letters reading أحبّ العربية, with stars and a crescent to decorate. Hang the finished posters in a row on the classroom wall or the fridge.",
    ar: "حروف كبيرة مفرّغة تقول «أحبّ العربية» مع نجوم وهلال للتزيين. علّقوا الملصقات المكتملة صفّاً على جدار الصفّ أو باب الثلاجة.",
    link: { href: "/printables/arabic-language-day", en: "Poster page (PDF)", ar: "صفحة الملصق (PDF)" },
  },
  {
    titleEn: "Go on a letter hunt", titleAr: "رحلة بحث عن الحروف",
    ageEn: "Ages 3–7", ageAr: "من 3 إلى 7 سنوات",
    en: "Pick one letter — ب is a good start — and hunt for it on food packets, book covers and signs. In class, use the printed hunt grid first: ten ب hidden among letters that look almost the same.",
    ar: "اختاروا حرفاً واحداً — والباء بداية جيّدة — وابحثوا عنه على علب الطعام وأغلفة الكتب واللافتات. وفي الصفّ، ابدأوا بشبكة البحث المطبوعة: عشر باءات مخبّأة بين حروف تشبهها.",
  },
  {
    titleEn: "Learn three greetings", titleAr: "تعلّم ثلاث تحيّات",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    en: "مرحباً (marhaban, hello), شكراً (shukran, thank you) and مع السلامة (ma'a as-salama, goodbye). Use them all day — at the door, at snack time, at home time.",
    ar: "مرحباً، وشكراً، ومع السلامة. استعملوها طوال اليوم — عند الباب، ووقت الوجبة، وعند الانصراف.",
  },
  {
    titleEn: "Have an 'Arabic only' meal", titleAr: "وجبة «بالعربية فقط»",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    en: "For one meal, everything on the table is named in Arabic: خبز (khubz, bread), ماء (maa', water), حليب (haleeb, milk), تمر (tamr, dates). Whoever forgets says the word twice.",
    ar: "في وجبة واحدة يُسمّى كلّ ما على المائدة بالعربية: خبز، ماء، حليب، تمر. ومن نسي يقول الكلمة مرّتين.",
  },
  {
    titleEn: "Try simple calligraphy", titleAr: "جرّبوا خطّاً بسيطاً",
    ageEn: "Ages 6+", ageAr: "من 6 سنوات فما فوق",
    en: "A flat marker held at an angle makes thick and thin strokes on its own. Write one short word — نور (light) or حب (love) — slowly, five times, and keep the best one.",
    ar: "قلم عريض مائل يرسم خطوطاً عريضة ورفيعة وحده. اكتبوا كلمة قصيرة — نور أو حبّ — ببطء خمس مرّات، واحتفظوا بأجملها.",
    link: { href: "/blog/arabic-calligraphy-for-kids", en: "Calligraphy for kids", ar: "الخطّ العربي للأطفال" },
  },
  {
    titleEn: "Read a bilingual story", titleAr: "اقرأوا قصّة ثنائية اللغة",
    ageEn: "Ages 3–8", ageAr: "من 3 إلى 8 سنوات",
    en: "Read one of our short illustrated stories aloud, Arabic line first, then English. Older children can read the Arabic line back to you.",
    ar: "اقرأوا قصّة مصوّرة قصيرة بصوت عالٍ، السطر العربي أوّلاً ثمّ الإنجليزي. ويستطيع الأكبر أن يعيد قراءة السطر العربي.",
    link: { href: "/stories", en: "Free stories", ar: "قصص مجانية" },
  },
  {
    titleEn: "Ask a grandparent for a word", titleAr: "اطلبوا كلمة من الجدّة أو الجدّ",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    en: "Call a grandparent or relative and ask for their favourite Arabic word, saying or song. Write it on the words-and-facts sheet and draw it.",
    ar: "اتّصلوا بالجدّة أو الجدّ أو أحد الأقارب واطلبوا كلمته العربية المفضّلة أو مثلاً أو أنشودة. اكتبوها على ورقة الكلمات وارسموها.",
  },
  {
    titleEn: "Play a letter game", titleAr: "العبوا لعبة حروف",
    ageEn: "Ages 2–6", ageAr: "من 2 إلى 6 سنوات",
    en: "Ten minutes of the letter game or the tracing game — every tap says the letter out loud, which paper cannot do.",
    ar: "عشر دقائق من لعبة الحروف أو لعبة التتبّع — كلّ نقرة تنطق الحرف بصوت عالٍ، وهذا ما لا يفعله الورق.",
    link: { href: "/games", en: "Free letter games", ar: "ألعاب الحروف المجانية" },
  },
  {
    titleEn: "Hand out the certificates", titleAr: "وزّعوا الشهادات",
    ageEn: "Ages 4–8", ageAr: "من 4 إلى 8 سنوات",
    en: "End the day by giving each child their certificate, with their name written in Arabic by their own hand. It is the part they will take home and show.",
    ar: "اختموا اليوم بتسليم كلّ طفل شهادته وعليها اسمه مكتوباً بالعربية بيده. إنّه الجزء الذي سيأخذه إلى البيت ويُريه لأهله.",
  },
];

const faqEn = [
  { q: "When is World Arabic Language Day?", a: "World Arabic Language Day is celebrated every year on 18 December." },
  { q: "Why is Arabic Language Day on 18 December?", a: "On 18 December 1973 the United Nations General Assembly adopted Arabic as one of its official languages. The UN marks Arabic Language Day on that date; Arabic is one of the six official UN languages, alongside English, French, Spanish, Russian and Chinese." },
  { q: "How can a school celebrate Arabic Language Day with young children?", a: "Keep it hands-on: each child writes their name in Arabic, colours an 'I love Arabic' poster, learns three greetings and takes home a certificate. Our free printable pack covers all of this in four pages." },
  { q: "Is there a free Arabic Language Day certificate for kids?", a: "Yes. The Arab Fingers Arabic Language Day pack includes a printable certificate with a line for the child's name and a box for writing it in Arabic. It is a free PDF with no signup." },
  { q: "Do we need to speak Arabic to take part?", a: "No. Every activity here works for beginners and families who do not speak Arabic — the words come with transliteration and meaning, and a phone keyboard is enough to look up how a name is written in Arabic." },
];

const faqAr = [
  { q: "متى يكون اليوم العالمي للغة العربية؟", a: "يُحتفل باليوم العالمي للغة العربية في 18 ديسمبر من كلّ عام." },
  { q: "لماذا يكون اليوم العالمي للغة العربية في 18 ديسمبر؟", a: "في 18 ديسمبر 1973 اعتمدت الجمعية العامة للأمم المتحدة العربية لغةً رسمية لها، فاختير هذا التاريخ. والعربية إحدى اللغات الرسمية الستّ في الأمم المتحدة مع الإنجليزية والفرنسية والإسبانية والروسية والصينية." },
  { q: "كيف تحتفل المدرسة باليوم العالمي للغة العربية مع الصغار؟", a: "اجعلوه عملياً: يكتب كلّ طفل اسمه بالعربية، ويلوّن ملصق «أحبّ العربية»، ويتعلّم ثلاث تحيّات، ويأخذ شهادة إلى البيت. وحزمتنا المجانية للطباعة تجمع هذا كلّه في أربع صفحات." },
  { q: "هل توجد شهادة مجانية للأطفال لليوم العالمي للغة العربية؟", a: "نعم. تتضمّن حزمة عرب فنجرز لليوم العالمي للغة العربية شهادة للطباعة فيها سطر لاسم الطفل ومربّع ليكتبه بالعربية. وهي ملف PDF مجاني بلا تسجيل." },
  { q: "هل يجب أن نتكلّم العربية لنشارك؟", a: "لا. كلّ نشاط هنا يناسب المبتدئين والأسر التي لا تتكلّم العربية — فالكلمات مكتوبة بنطقها ومعناها، ولوحة مفاتيح الهاتف تكفي لمعرفة كيف يُكتب الاسم بالعربية." },
];

export default async function ArabicLanguageDayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={tt("Arabic Language Day for Kids: 10 Activities for 18 December", "اليوم العالمي للغة العربية للأطفال: 10 أنشطة ليوم 18 ديسمبر")}
        description={tt(
          "Ten simple activities for World Arabic Language Day at home and in the classroom, with a free printable certificate.",
          "عشرة أنشطة بسيطة لليوم العالمي للغة العربية في البيت والصفّ، مع شهادة مجانية للطباعة.",
        )}
        slug="learn/arabic-language-day"
        datePublished={PUBLISHED}
        section="Activities"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("Arabic Language Day", "اليوم العالمي للغة العربية") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {tt("Arabic Language Day for Kids: 10 Activities for 18 December", "اليوم العالمي للغة العربية للأطفال: 10 أنشطة ليوم 18 ديسمبر")}
      </h1>
      <p className="text-base text-ink/75 mb-6">
        {tt("For home, the classroom and weekend school — with a free printable pack", "للبيت والصفّ ومدرسة نهاية الأسبوع — مع حزمة مجانية للطباعة")}
      </p>

      <div className="space-y-3 text-sm leading-relaxed text-ink/80 mb-8">
        <p>
          {tt(
            "World Arabic Language Day is celebrated every year on 18 December, the date in 1973 when the United Nations General Assembly made Arabic one of its official languages. For young children, the best way to mark it is to do something with the language rather than hear about it — write a name, say a greeting, colour a word.",
            "يُحتفل باليوم العالمي للغة العربية في 18 ديسمبر من كلّ عام، وهو التاريخ الذي اعتمدت فيه الجمعية العامة للأمم المتحدة العربية لغةً رسمية عام 1973. وأفضل ما يحتفل به الصغار أن يفعلوا شيئاً باللغة لا أن يسمعوا عنها — أن يكتبوا اسماً، ويقولوا تحيّة، ويلوّنوا كلمة.",
          )}
        </p>
        <p>
          {tt(
            "The ten activities below take five to twenty minutes each and need nothing you do not already have. Four of them use our free four-page printable: a certificate, an 'I love Arabic' poster, a name-and-letter-hunt sheet, and Arabic words and facts.",
            "تستغرق الأنشطة العشرة أدناه من خمس دقائق إلى عشرين لكلّ منها، ولا تحتاج شيئاً ليس عندكم. وأربعة منها تستعمل حزمتنا المجانية ذات الصفحات الأربع: شهادة، وملصق «أحبّ العربية»، وورقة الاسم والبحث عن الحرف، وكلمات ومعلومات عن العربية.",
          )}
        </p>
      </div>

      <section className="mb-8 rounded-2xl border border-ink/10 bg-card p-5">
        <h2 className="text-lg font-semibold text-ink mb-3">{tt("Arabic Language Day at a glance", "اليوم العالمي للغة العربية باختصار")}</h2>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-ink/80 leading-relaxed">
          <li>{tt("Date: 18 December, every year.", "التاريخ: 18 ديسمبر من كلّ عام.")}</li>
          <li>{tt("Why that date: on 18 December 1973 the UN General Assembly adopted Arabic as an official language.", "سبب التاريخ: في 18 ديسمبر 1973 اعتمدت الجمعية العامة للأمم المتحدة العربية لغةً رسمية.")}</li>
          <li>{tt("Arabic is one of the six official UN languages, with English, French, Spanish, Russian and Chinese.", "العربية إحدى اللغات الرسمية الستّ في الأمم المتحدة، مع الإنجليزية والفرنسية والإسبانية والروسية والصينية.")}</li>
          <li>{tt("The alphabet has 28 letters and is written from right to left.", "للأبجدية العربية 28 حرفاً، وتُكتب من اليمين إلى اليسار.")}</li>
        </ul>
      </section>

      <WorksheetCrossLink
        locale={locale}
        packId="arabic-language-day"
        titleEn="Free Arabic Language Day pack — 4 printable pages"
        titleAr="حزمة اليوم العالمي للغة العربية مجاناً — 4 صفحات للطباعة"
        textEn="A certificate, an 'I love Arabic' poster to colour, a write-your-name and letter-hunt sheet, and Arabic words and facts. One PDF, no signup."
        textAr="شهادة، وملصق «أحبّ العربية» للتلوين، وورقة لكتابة الاسم والبحث عن الحرف، وكلمات ومعلومات عن العربية. ملف PDF واحد بلا تسجيل."
      />

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-4">{tt("10 activities for Arabic Language Day", "10 أنشطة لليوم العالمي للغة العربية")}</h2>
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div key={a.titleEn} className="rounded-2xl border border-ink/8 bg-card p-5">
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold text-ink">{i + 1}. {tt(a.titleEn, a.titleAr)}</h3>
                <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-ink">{tt(a.ageEn, a.ageAr)}</span>
              </div>
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

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-3">{tt("A one-hour plan for the classroom", "خطّة ساعة واحدة للصفّ")}</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-ink/80 leading-relaxed">
          <li>{tt("10 minutes — learn the three greetings and use them to say good morning.", "10 دقائق — تعلّموا التحيّات الثلاث وقولوا بها صباح الخير.")}</li>
          <li>{tt("15 minutes — the name sheet: each child traces and writes their name in Arabic.", "15 دقيقة — ورقة الاسم: يتتبّع كلّ طفل اسمه بالعربية ويكتبه.")}</li>
          <li>{tt("15 minutes — colour the 'I love Arabic' poster while a bilingual story is read aloud.", "15 دقيقة — تلوين ملصق «أحبّ العربية» أثناء قراءة قصّة ثنائية اللغة بصوت عالٍ.")}</li>
          <li>{tt("10 minutes — the letter hunt: who finds all ten ب first?", "10 دقائق — البحث عن الحرف: من يجد الباءات العشر أوّلاً؟")}</li>
          <li>{tt("10 minutes — certificates: each child writes their Arabic name in the box and takes it home.", "10 دقائق — الشهادات: يكتب كلّ طفل اسمه بالعربية في المربّع ويأخذها إلى البيت.")}</li>
        </ol>
      </section>

      <FaqSection
        locale={locale}
        title={tt("Frequently asked questions about Arabic Language Day", "أسئلة شائعة عن اليوم العالمي للغة العربية")}
        items={isAr ? faqAr : faqEn}
      />

      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "arabic-language-day")} />
    </PageLayout>
  );
}
