import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale, locales } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { worksheetSets } from "@/lib/worksheets";
import { worksheetPages, getWorksheetPage } from "@/lib/worksheetPages";
import fileSizes from "@/lib/worksheet-files.json";

/* One page per printable pack.
   Search Console showed /printables ranking 4.5–6.5 for dozens of different
   queries at once — it was a single URL competing with itself. Each pack now
   answers its own intent, with the download still one click from the top. */

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    worksheetPages.map((p) => ({ locale, slug: p.id })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getWorksheetPage(slug);
  if (!page) return {};
  return generatePageMetadata(locale, `/printables/${slug}`, {
    titleEn: page.seoTitleEn,
    titleAr: page.seoTitleAr,
    descriptionEn: page.seoDescEn,
    descriptionAr: page.seoDescAr,
    ogType: "article",
    keywords: page.keywords,
  });
}

const mb = (bytes?: number) =>
  bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : "PDF";

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  const page = getWorksheetPage(slug);
  const set = worksheetSets.find((s) => s.id === slug);
  if (!page || !set) notFound();

  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const bytes = (fileSizes as Record<string, number>)[set.id];
  const others = worksheetSets.filter((s) => s.id !== set.id);

  // DigitalDocument + FAQ, so the pack itself can surface as a downloadable
  // result and the questions can appear as rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DigitalDocument",
        name: isAr ? set.titleAr : set.titleEn,
        description: isAr ? page.seoDescAr : page.seoDescEn,
        url: `https://www.arabfingers.site/${locale}/printables/${set.id}`,
        encodingFormat: "application/pdf",
        inLanguage: [isAr ? "ar" : "en"],
        isAccessibleForFree: true,
        learningResourceType: "Worksheet",
        typicalAgeRange: isAr ? set.ageAr : set.ageEn,
        numberOfPages: set.pages,
        author: { "@type": "Person", name: "IBHAR TECH LEARNING" },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: isAr ? f.qAr : f.qEn,
          acceptedAnswer: { "@type": "Answer", text: isAr ? f.aAr : f.aEn },
        })),
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
          { label: tt("Worksheets", "أوراق العمل"), href: `/${locale}/printables` },
          { label: isAr ? set.titleAr : set.titleEn },
        ]}
      />

      {/* ---------- top: preview + download ---------- */}
      <section className="mt-4 grid gap-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-start">
        <Image
          src={`/printables/previews/${set.id}.png`}
          alt={tt(
            `First page of the ${set.titleEn} PDF`,
            `الصفحة الأولى من ملف ${set.titleAr}`,
          )}
          width={349}
          height={494}
          unoptimized
          className="h-auto w-full max-w-[220px] rounded-lg border-2 border-ink/15 bg-white shadow-[3px_3px_0_0_rgba(42,29,78,0.12)]"
        />

        <div className="min-w-0">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
            {isAr ? set.titleAr : set.titleEn}
          </h1>
          <p className="mt-2 text-base text-ink/75">{tt(page.taglineEn, page.taglineAr)}</p>

          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/45">
            {set.pages} {tt(set.pages === 1 ? "page" : "pages", "صفحة")} · PDF · {mb(bytes)} ·{" "}
            {isAr ? set.ageAr : set.ageEn}
          </p>

          <a href={`/printables/${set.id}.pdf`} download className="btn-chunky mt-5 inline-flex text-sm">
            ⬇ {tt("Download the PDF — free", "حمّل ملف PDF — مجاناً")}
          </a>
          <p className="mt-2 text-xs font-semibold text-ink/50">
            {tt(
              "No email, no account, no watermark.",
              "بلا بريد إلكتروني ولا حساب ولا علامة مائية.",
            )}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-ink/75">
            {isAr ? set.descAr : set.descEn}
          </p>
        </div>
      </section>

      {/* ---------- what's inside ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("What is on the pages", "ما في الصفحات")}
        </h2>
        <ul className="mt-4 space-y-3">
          {(isAr ? page.insideAr : page.insideEn).map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink/75">
              <span aria-hidden className="mt-1 flex-none text-qalam">◆</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- how to use ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("How to use it", "كيف تستعملها")}
        </h2>
        <div className="mt-4 space-y-4">
          {(isAr ? page.useAr : page.useEn).map((para) => (
            <p key={para} className="text-sm leading-relaxed text-ink/75">{para}</p>
          ))}
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("Questions", "أسئلة")}
        </h2>
        <div className="mt-4 space-y-3">
          {page.faq.map((f) => (
            <div key={f.qEn} className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="text-base font-semibold text-ink mb-1">{isAr ? f.qAr : f.qEn}</h3>
              <p className="text-sm leading-relaxed text-ink/80">{isAr ? f.aAr : f.aEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- second download, for people who read to the end ---------- */}
      <section className="mt-12 rounded-2xl border-2 border-ink bg-saffron-soft/40 p-6 text-center">
        <h2 className="font-display text-lg font-extrabold text-ink">
          {tt("Ready to print", "جاهزة للطباعة")}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          {tt(
            `${set.pages} ${set.pages === 1 ? "page" : "pages"}, ${mb(bytes)}, free forever.`,
            `${set.pages} صفحة، ${mb(bytes)}، مجاناً إلى الأبد.`,
          )}
        </p>
        <a href={`/printables/${set.id}.pdf`} download className="btn-chunky mt-4 inline-flex text-sm">
          ⬇ {tt("Download the PDF", "حمّل ملف PDF")}
        </a>
      </section>

      {/* ---------- the rest of the library ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("The rest of the library", "بقيّة المكتبة")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((s) => (
            <Link
              key={s.id}
              href={`/${locale}/printables/${s.id}`}
              className="card-stock flex items-start gap-3 p-4 transition hover:border-qalam"
            >
              <span aria-hidden className="text-2xl leading-none">{s.emoji}</span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-extrabold leading-snug text-ink">
                  {isAr ? s.titleAr : s.titleEn}
                </h3>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink/45">
                  {s.pages} {tt(s.pages === 1 ? "page" : "pages", "صفحة")} · {isAr ? s.ageAr : s.ageEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={`/${locale}/printables`}
          className="mt-5 inline-block text-sm font-bold text-qalam underline underline-offset-4"
        >
          {tt("See all worksheets →", "← كلّ أوراق العمل")}
        </Link>
      </section>
    </PageLayout>
  );
}
