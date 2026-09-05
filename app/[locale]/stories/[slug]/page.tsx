import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale, locales } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { stories } from "@/lib/stories";

/* One page per story: scene-by-scene reading view, fully vocalised Arabic with
   transliteration and English, then a printable PDF for offline bedtime use. */

export function generateStaticParams() {
  return locales.flatMap((locale) => stories.map((s) => ({ locale, slug: s.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};
  return generatePageMetadata(locale, `/stories/${slug}`, {
    titleEn: `${story.titleEn} — Arabic Story for Kids (PDF)`,
    titleAr: `${story.titleAr} — قصة عربية للأطفال PDF`,
    descriptionEn: story.introEn,
    descriptionAr: story.introAr,
    ogType: "article",
  });
}

export default async function StoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const others = stories.filter((s) => s.slug !== story.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ShortStory",
        name: isAr ? story.titleAr : story.titleEn,
        alternateName: isAr ? story.titleEn : story.titleAr,
        url: `https://www.arabfingers.site/${locale}/stories/${story.slug}`,
        inLanguage: ["ar", "en"],
        isAccessibleForFree: true,
        typicalAgeRange: isAr ? story.agesAr : story.agesEn,
        author: { "@type": "Organization", name: "IBHAR TECH LEARNING" },
        encoding: {
          "@type": "MediaObject",
          encodingFormat: "application/pdf",
          contentUrl: `https://www.arabfingers.site/stories/${story.slug}.pdf`,
        },
      },
    ],
  };

  return (
    <PageLayout locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: tt("Stories", "القصص"), href: `/${locale}/stories` },
          { label: isAr ? story.titleAr : story.titleEn },
        ]}
      />

      {/* ---------- header ---------- */}
      <header className="mt-4 max-w-3xl">
        <div className="flex items-center gap-4">
          <span aria-hidden className="text-6xl leading-none">{story.emoji}</span>
          <div>
            <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
              {isAr ? story.titleAr : story.titleEn}
            </h1>
            <p className="mt-1 font-arabic-display text-lg text-qalam" dir="rtl">
              {isAr ? story.titleEn : story.titleAr}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">{isAr ? story.introAr : story.introEn}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink/45">
          {isAr ? story.agesAr : story.agesEn} · {story.scenes.length} {tt("scenes", "مشاهد")} ·{" "}
          {isAr ? story.minutesAr : story.minutesEn}
        </p>
        <a href={`/stories/${story.slug}.pdf`} download className="btn-chunky mt-4 inline-flex text-sm">
          ⬇ {tt("Download the PDF — free", "حمّل ملف PDF — مجاناً")}
        </a>
        <p className="mt-2 text-xs font-semibold text-ink/50">
          {tt(
            "Read-aloud tip: point at every word as you say it — the tashkeel marks show your child exactly which vowel each letter carries.",
            "نصيحة للقراءة الجهرية: أشِر إلى كل كلمة أثناء نطقها — فالحركات تُري طفلك بدقّة أيّ حركة تحملها كلّ حرف.",
          )}
        </p>
      </header>

      {/* ---------- the scenes ---------- */}
      <ol className="mt-10 space-y-5">
        {story.scenes.map((scene, i) => (
          <li
            key={i}
            className="card-stock mx-auto flex max-w-3xl items-start gap-5 p-6 sm:items-center"
          >
            <span
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-ink/10 bg-saffron-soft/50 text-4xl leading-none sm:h-20 sm:w-20 sm:text-5xl"
            >
              {scene.emoji}
            </span>
            <div className="min-w-0">
              <p className="font-arabic-display text-2xl leading-relaxed text-ink sm:text-3xl" dir="rtl">
                {scene.ar}
              </p>
              <p className="mt-2 text-sm italic text-ink/50">{scene.translit}</p>
              <p className="mt-1 text-base text-ink/75">{scene.en}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* ---------- moral ---------- */}
      <section className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 border-ink bg-saffron-soft/40 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-qalam">
          {tt("The lesson · الْعِبْرَة", "The lesson · الْعِبْرَة")}
        </p>
        <p className="mt-3 font-display text-lg font-extrabold text-ink">{story.moralEn}</p>
        <p className="mt-2 font-arabic-display text-2xl leading-relaxed text-ink" dir="rtl">
          {story.moralAr}
        </p>
        <a href={`/stories/${story.slug}.pdf`} download className="btn-chunky mt-5 inline-flex text-sm">
          ⬇ {tt("Save the story as PDF", "احفظ القصة PDF")}
        </a>
      </section>

      {/* ---------- keep going ---------- */}
      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("More stories", "المزيد من القصص")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/${locale}/stories/${s.slug}`}
              className="card-stock flex items-start gap-3 p-4 transition hover:border-qalam"
            >
              <span aria-hidden className="text-3xl leading-none">{s.emoji}</span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-extrabold leading-snug text-ink">
                  {isAr ? s.titleAr : s.titleEn}
                </h3>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink/45">
                  {s.scenes.length} {tt("scenes", "مشاهد")} · {isAr ? s.minutesAr : s.minutesEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold">
          <Link href={`/${locale}/stories`} className="text-qalam underline underline-offset-4">
            ← {tt("All stories", "كل القصص")}
          </Link>
          <Link href={`/${locale}/printables`} className="text-qalam underline underline-offset-4">
            {tt("Printable worksheets →", "← أوراق العمل")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
