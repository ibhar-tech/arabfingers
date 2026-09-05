import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale, locales } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { stories } from "@/lib/stories";

/* Original illustrated Arabic mini-stories for beginning readers.
   Every sentence is fully vocalised (tashkeel) and translated, because the
   audience is a parent reading aloud with a child who is still decoding. */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/stories", {
    titleEn: "Arabic Stories for Kids (PDF) — Original Bilingual Mini-Stories",
    titleAr: "قصص أطفال بالعربية PDF — قصص مصوّرة ثنائية اللغة",
    descriptionEn:
      "Original illustrated Arabic stories for beginning readers: fully vocalised sentences, English translations, and a free PDF download of every story. Read online or print for bedtime.",
    descriptionAr:
      "قصص عربية مصوّرة أصلية للمبتدئين: جمل مشكولة بالكامل مع الترجمة الإنجليزية، وتحميل مجاني بصيغة PDF لكل قصة. اقرأها هنا أو اطبعها لوقت النوم.",
  });
}

export default async function StoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isAr ? "قصص أطفال بالعربية" : "Arabic Stories for Kids",
    url: `https://www.arabfingers.site/${locale}/stories`,
    inLanguage: isAr ? "ar" : "en",
    hasPart: stories.map((s) => ({
      "@type": "ShortStory",
      name: isAr ? s.titleAr : s.titleEn,
      url: `https://www.arabfingers.site/${locale}/stories/${s.slug}`,
      inLanguage: ["ar", "en"],
      isAccessibleForFree: true,
      typicalAgeRange: isAr ? s.agesAr : s.agesEn,
    })),
  };

  const letterTales = stories.filter((s) => s.letter);
  const otherStories = stories.filter((s) => !s.letter);

  const storyCard = (s: (typeof stories)[number]) => (
    <article key={s.slug} className="card-stock flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden className="text-5xl leading-none">{s.emoji}</span>
        {s.letter ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-saffron-soft font-arabic-display text-xl font-bold text-ink">
            {s.letter}
          </span>
        ) : (
          <span className="rounded-full border-2 border-ink/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink/50">
            {isAr ? s.agesAr : s.agesEn}
          </span>
        )}
      </div>
      <h2 className="mt-3 font-display text-lg font-extrabold leading-snug text-ink">
        {isAr ? s.titleAr : s.titleEn}
      </h2>
      <p className="mt-1 font-arabic-display text-base text-qalam" dir="rtl">
        {isAr ? s.titleEn : s.titleAr}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">
        {isAr ? s.introAr : s.introEn}
      </p>
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink/45">
        {s.scenes.length} {tt("scenes", "مشاهد")} · {isAr ? s.minutesAr : s.minutesEn}
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Link
          href={`/${locale}/stories/${s.slug}`}
          className="btn-chunky inline-flex text-xs"
        >
          📖 {tt("Read the story", "اقرأ القصة")}
        </Link>
        <a
          href={`/stories/${s.slug}.pdf`}
          download
          className="inline-flex items-center rounded-xl border-2 border-ink/15 px-3.5 py-2 text-xs font-bold text-ink/70 transition hover:border-qalam hover:text-qalam"
        >
          ⬇ PDF
        </a>
      </div>
    </article>
  );

  return (
    <PageLayout locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs locale={locale} crumbs={[{ label: tt("Stories", "القصص") }]} />

      <section className="mt-4 max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
          {tt("Arabic Stories for Kids", "قَصَصٌ عَرَبِيَّةٌ لِلْأَطْفَال")}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink/75">
          {tt(
            "Original illustrated mini-stories written for children who are still decoding: every Arabic sentence is fully vocalised, paired with a transliteration and an English translation, and built from words your child already meets in the games and worksheets. Read them here scene by scene, or download the printable PDF for bedtime.",
            "قصص مصوّرة أصلية كُتبت لطفل ما يزال يفكّك الحروف: كل جملة عربية مشكولة بالكامل، مقرونة بنقل صوتي وترجمة إنجليزية، ومبنية من كلمات يقابلها طفلك في الألعاب وأوراق العمل. اقرأوها هنا مشهداً بمشهد، أو حمّلوا نسخة PDF للطباعة ووقت النوم.",
          )}
        </p>
        <p className="mt-3 text-sm font-semibold text-ink/55">
          {tt(
            "Free, no account, printable — and every story ends with one clear lesson.",
            "مجانية وبلا حساب وقابلة للطباعة — وكل قصة تنتهي بعبرة واضحة.",
          )}
        </p>
      </section>

      {letterTales.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold text-ink">
            {tt("Letter Tales · حِكَايَاتُ الْحُرُوفِ", "Letter Tales · حِكَايَاتُ الْحُرُوفِ")}
          </h2>
          <p className="mt-1.5 text-sm text-ink/60">
            {tt(
              "One story per letter, packed with words that start with it — read the story, then colour the letter in the Alphabet coloring book.",
              "قصة لكلّ حرف، مليئة بالكلمات التي تبدأ به — اقرأوا القصة ثم لوّنوا الحرف في كتاب تلوين الحروف.",
            )}
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {letterTales.map(storyCard)}
          </div>
        </section>
      )}

      {otherStories.length > 0 && (
        <section className="mt-10">
          {letterTales.length > 0 && (
            <h2 className="font-display text-xl font-extrabold text-ink">
              {tt("All stories", "كلّ القصص")}
            </h2>
          )}
          <div className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${letterTales.length > 0 ? "mt-4" : "mt-10"}`}>
            {otherStories.map(storyCard)}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-2xl border-2 border-ink bg-saffron-soft/40 p-6">
        <h2 className="font-display text-lg font-extrabold text-ink">
          {tt("Turn the story into a lesson", "اجعل القصة درساً")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
          {tt(
            "Every story is built from words the site already teaches. After reading, print the matching coloring book or play the letter game with the words you met:",
            "كل قصة مبنية من كلمات يعلّمها الموقع أصلاً. بعد القراءة، اطبع كتاب التلوين المرافق أو العبوا لعبة الحروف بالكلمات التي قابلتموها:",
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
          <Link href={`/${locale}/printables/arabic-animals-coloring`} className="text-qalam underline underline-offset-4">
            🦁 {tt("Animals coloring book", "كتاب تلوين الحيوانات")}
          </Link>
          <Link href={`/${locale}/printables/arabic-solar-system-coloring`} className="text-qalam underline underline-offset-4">
            🪐 {tt("Solar System coloring book", "كتاب تلوين المجموعة الشمسية")}
          </Link>
          <Link href={`/${locale}/play`} className="text-qalam underline underline-offset-4">
            🎮 {tt("Letter game", "لعبة الحروف")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
