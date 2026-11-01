import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ShareWhatsApp } from "@/components/ShareWhatsApp";
import { getRelatedArticles } from "@/lib/related";
import { getVocabTopic, vocabCount, vocabTopics } from "@/lib/vocabTopics";
import { worksheetSets } from "@/lib/worksheets";
import { isLocale, locales } from "@/lib/locales";
import { lastUpdatedFor } from "@/lib/contentDates";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

/* Arabic vocabulary pages (animals, fruit and vegetables, body parts, days
   and months, shapes). The words and copy live in lib/vocabTopics.ts; the
   older vocabulary pages (colours, numbers, first words) keep their own
   folders, which take precedence over this dynamic segment. */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => vocabTopics.map((t) => ({ locale, topic: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; topic: string }> }): Promise<Metadata> {
  const { locale, topic: slug } = await params;
  const topic = getVocabTopic(slug);
  if (!topic) return {};
  const n = vocabCount(topic);
  return generatePageMetadata(locale, `/learn/${topic.slug}`, {
    titleEn: topic.titleEn(n),
    titleAr: topic.titleAr(n),
    descriptionEn: topic.descEn(n),
    descriptionAr: topic.descAr(n),
    ogType: "article",
    publishedTime: topic.published,
    modifiedTime: lastUpdatedFor(`/learn/${topic.slug}`, topic.published),
    keywords: topic.keywords,
  });
}

export default async function VocabPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic: slug } = await params;
  setRequestLocale(locale);
  const topic = getVocabTopic(slug);
  if (!isLocale(locale) || !topic) notFound();
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const n = vocabCount(topic);
  const pack = topic.packId ? worksheetSets.find((s) => s.id === topic.packId) : undefined;

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={tt(topic.titleEn(n), topic.titleAr(n))}
        description={tt(topic.descEn(n), topic.descAr(n))}
        slug={`learn/${topic.slug}`}
        datePublished={topic.published}
        dateModified={lastUpdatedFor(`/learn/${topic.slug}`, topic.published)}
        section="Education"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt(topic.h1En, topic.h1Ar) },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">{tt(topic.h1En, topic.h1Ar)}</h1>
      <div className="mb-6 max-w-3xl space-y-3 text-base leading-relaxed text-ink/80">
        {(isAr ? topic.introAr : topic.introEn).map((p) => <p key={p}>{p}</p>)}
      </div>

      <nav aria-label={tt("On this page", "في هذه الصفحة")} className="mb-8 flex flex-wrap gap-2">
        {topic.groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-card px-4 text-sm font-semibold text-ink hover:border-qalam">
            {tt(g.en, g.ar)} <span className="ms-1.5 text-ink/70">({g.words.length})</span>
          </a>
        ))}
      </nav>

      {topic.groups.map((g) => (
        <section key={g.id} aria-labelledby={g.id} className="mb-10">
          <h2 id={g.id} className="scroll-mt-24 text-xl font-semibold text-ink mb-4">{tt(g.en, g.ar)}</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {g.words.map((x) => (
              <li key={x.ar} className="flex items-center gap-3 rounded-xl border border-ink/12 bg-card p-3">
                <span aria-hidden className="text-3xl leading-none">{x.emoji}</span>
                <div className="min-w-0">
                  <div className="text-xl leading-snug text-ink" lang="ar" dir="rtl" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), serif" }}>
                    {x.ar}
                  </div>
                  <div lang="en" dir="ltr" className={`text-xs text-ink/75 ${isAr ? "text-end" : ""}`}>
                    {x.en}{!isAr && <> · <span className="italic">{x.tr}</span></>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mb-10 rounded-2xl border border-ink/10 bg-card p-5">
        <h2 className="text-xl font-semibold text-ink mb-3">{tt("Three ways to practise at home", "ثلاث طرق للتدرّب في البيت")}</h2>
        <ul className="space-y-2 text-sm leading-relaxed text-ink/80">
          {(isAr ? topic.tipsAr : topic.tipsEn).map((t) => (
            <li key={t} className="flex gap-3"><span aria-hidden className="mt-1 flex-none text-qalam">◆</span><span>{t}</span></li>
          ))}
        </ul>
      </section>

      <div className="mb-8">
        <ShareWhatsApp
          locale={locale}
          url={`https://www.arabfingers.site/${locale}/learn/${topic.slug}`}
          text={tt(topic.titleEn(n), topic.titleAr(n))}
        />
      </div>

      {pack && (
        <WorksheetCrossLink
          locale={locale}
          packId={pack.id}
          titleEn={`Free printable: ${pack.titleEn}`}
          titleAr={`للطباعة مجاناً: ${pack.titleAr}`}
          textEn={`${pack.pages} pages to colour, each with the Arabic word to trace. One PDF, no signup.`}
          textAr={`${pack.pages} صفحات للتلوين، في كلّ منها الكلمة بالعربية للتتبّع. ملف PDF واحد بلا تسجيل.`}
        />
      )}

      <FaqSection
        locale={locale}
        title={tt("Questions parents ask", "أسئلة يطرحها الوالدان")}
        items={topic.faq.map((f) => ({ q: tt(f.qEn, f.qAr), a: tt(f.aEn, f.aAr) }))}
      />

      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, topic.slug)} />
    </PageLayout>
  );
}
