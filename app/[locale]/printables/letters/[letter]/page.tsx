import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HearLetterButton } from "@/components/HearLetterButton";
import { isLocale, locales } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { arabicLetters } from "@/lib/arabicMap";
import { letterGuide } from "@/lib/letterGuide";
import {
  getLetterWorksheetPage,
  letterFormsOf,
  letterWorksheetPages,
} from "@/lib/letterWorksheets";
import fileSizes from "@/lib/worksheet-files.json";

/* One page per letter of the alphabet — /printables/letters/ba, .../tha, …

   Search Console (May–Aug 2026): letter-level queries ("arabic letter ba
   worksheet") had no URL to answer them while competitors rank with exactly
   this structure (belarabyapps: one post per letter; iqragames: 28 numbered
   PDFs). Each page pairs the free single-letter PDF with the pronunciation
   help a non-Arabic-speaking parent needs to actually teach it — our audience
   searches in English (591 of 665 GSC queries), so metadata is English-first
   with the Arabic name always visible on the page. */

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    letterWorksheetPages.map((p) => ({ locale, letter: p.slug })),
  );
}

type Props = { params: Promise<{ locale: string; letter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, letter } = await params;
  const page = getLetterWorksheetPage(letter);
  if (!page) return {};
  return generatePageMetadata(locale, `/printables/letters/${letter}`, {
    titleEn: page.seoTitleEn,
    titleAr: page.seoTitleAr,
    descriptionEn: page.seoDescEn,
    descriptionAr: page.seoDescAr,
    ogType: "article",
    keywords: page.keywords,
  });
}

const mb = (bytes?: number) =>
  bytes ? `${(bytes / 1024).toFixed(0)} KB` : "PDF";

export default async function Page({ params }: Props) {
  const { locale, letter } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  const page = getLetterWorksheetPage(letter);
  if (!page) notFound();
  const entry = letterGuide[page.index];
  const soundId = arabicLetters[page.index].soundId;
  const forms = letterFormsOf(entry);

  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const bytes = (fileSizes as Record<string, number>)[`letters/${page.slug}`];
  const prev = letterWorksheetPages[(page.index - 1 + letterWorksheetPages.length) % letterWorksheetPages.length];
  const next = letterWorksheetPages[(page.index + 1) % letterWorksheetPages.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DigitalDocument",
        name: isAr ? page.seoTitleAr : page.seoTitleEn,
        description: isAr ? page.seoDescAr : page.seoDescEn,
        url: `https://www.arabfingers.site/${locale}/printables/letters/${page.slug}`,
        encodingFormat: "application/pdf",
        inLanguage: [isAr ? "ar" : "en"],
        isAccessibleForFree: true,
        learningResourceType: "Worksheet",
        typicalAgeRange: "Ages 4-7",
        numberOfPages: 1,
        author: { "@type": "Person", name: "Aissa Trad" },
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
          {
            label: tt("One letter at a time", "حرفاً حرفاً"),
            href: `/${locale}/printables#letters`,
          },
          { label: `${entry.enName} (${entry.ar})` },
        ]}
      />

      {/* ---------- top: preview + download ---------- */}
      <section className="mt-4 grid gap-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-start">
        <Image
          src={`/printables/previews/letters/${page.slug}.png`}
          alt={tt(
            `The ${entry.enName} (${entry.ar}) tracing worksheet — letter, forms and practice rows`,
            `ورقة تتبّع حرف ${entry.arName} (${entry.ar})`,
          )}
          width={349}
          height={494}
          unoptimized
          className="h-auto w-full max-w-[220px] rounded-lg border-2 border-ink/15 bg-white shadow-[3px_3px_0_0_rgba(42,29,78,0.12)]"
        />

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/45">
            {tt(
              `Letter ${page.index + 1} of 28 · Ages 4–7 · Pre-K – Grade 1`,
              `الحرف ${page.index + 1} من ٢٨ · من ٤ إلى ٧ سنوات`,
            )}
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold leading-tight text-ink">
            {isAr
              ? `حرف ${entry.arName} (${entry.ar}) — ورقة تتبّع مجانية`
              : `Arabic Letter ${entry.enName} (${entry.ar}) — Free Tracing Worksheet`}
          </h1>
          <p className="mt-2 text-base text-ink/75">
            {isAr ? page.seoDescAr : page.seoDescEn}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={`/printables/letters/${page.slug}.pdf`} download className="btn-chunky inline-flex text-sm">
              ⬇ {tt("Download the PDF — free", "حمّل ملف PDF — مجاناً")}
            </a>
            <HearLetterButton
              soundId={soundId}
              locale={locale}
              labelEn={`Hear ${entry.enName}`}
              labelAr={`اسمع حرف ${entry.arName}`}
            />
          </div>
          <p className="mt-2 text-xs font-semibold text-ink/50">
            {tt(
              `1 page · ${mb(bytes)} · no email, no account, no watermark.`,
              `صفحة واحدة · ${mb(bytes)} · بلا بريد إلكتروني ولا حساب ولا علامة مائية.`,
            )}
          </p>
        </div>
      </section>

      {/* ---------- the four forms ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt(
            `The four shapes of ${entry.enName} (${entry.ar})`,
            `أشكال حرف ${entry.arName} (${entry.ar}) الأربعة`,
          )}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
          {tt(
            "Arabic letters change shape depending on where they sit in a word. The same sheet your child traces shows all four, so the changing shape is learned from day one instead of coming as a surprise later.",
            "تتغيّر أشكال الحروف العربية بحسب موضعها في الكلمة، وورقة التتبّع تعرض الأشكال الأربعة ليتعوّدها الطفل من البداية.",
          )}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {forms.map((f) => (
            <div key={f.en} className="card-stock p-4 text-center">
              <div
                className="font-arabic-display text-5xl leading-tight text-ink"
                dir="rtl"
                style={{ fontFamily: "var(--font-noto-naskh), serif" }}
              >
                {f.glyph}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-ink/45">
                {isAr ? f.ar : f.en}
              </div>
              {!f.joins && (
                <div className="mt-1 text-[11px] font-semibold text-ink/40">
                  {tt("does not join after", "لا يتصل بما بعده")}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- pronunciation for non-Arabic parents ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt(`How to pronounce ${entry.enName}`, `كيف يُنطق حرف ${entry.arName}`)}
        </h2>
        <div className="mt-4 space-y-4">
          <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
            <b className="text-ink">“{entry.translit}”.</b>{" "}
            {isAr ? entry.soundHowToAr : entry.soundHowToEn}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
            {isAr ? entry.comparisonAr : entry.comparisonEn}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-ink/75">
            <b className="text-ink">{tt("The classic mix-up:", "الخلط الشائع:")}</b>{" "}
            {isAr ? entry.mistakeAr : entry.mistakeEn}
          </p>
        </div>
      </section>

      {/* ---------- words with this letter ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt(`Words your child already knows with ${entry.enName}`, `كلمات مألوفة بحرف ${entry.arName}`)}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
          {tt(
            "These are the example words printed on the worksheet — trace them together, then find more around the house.",
            "هذه الكلمات المطبوعة في الورقة — تتبّعاها معاً ثم ابحثا عن كلمات أخرى في البيت.",
          )}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {entry.examples.map((ex) => (
            <div key={ex.word} className="card-stock flex items-center gap-3 p-4">
              <span aria-hidden className="text-3xl leading-none">{ex.emoji}</span>
              <div className="min-w-0">
                <div className="font-arabic-display text-2xl text-ink" dir="rtl" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
                  {ex.word}
                </div>
                <div className="text-xs font-bold text-ink/50">
                  {ex.translit} — {isAr ? ex.meaningAr : ex.meaningEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- parent tip ---------- */}
      <section className="mt-12 rounded-2xl border-2 border-ink bg-saffron-soft/40 p-6">
        <h2 className="font-display text-lg font-extrabold text-ink">
          {tt("One activity for this week", "نشاط واحد لهذا الأسبوع")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">
          {isAr ? entry.parentTipAr : entry.parentTipEn}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`/printables/letters/${page.slug}.pdf`} download className="btn-chunky inline-flex text-sm">
            ⬇ {tt("Download the PDF", "حمّل ملف PDF")}
          </a>
          <Link href={`/${locale}/play`} className="btn-chunky inline-flex text-sm">
            🎮 {tt("Hear it in the letter game", "اسمعه في لعبة الحروف")}
          </Link>
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

      {/* ---------- prev / next ---------- */}
      <nav className="mt-12 flex items-center justify-between gap-4" aria-label={tt("More letters", "حروف أخرى")}>
        <Link
          href={`/${locale}/printables/letters/${prev.slug}`}
          className="card-stock min-w-0 flex-1 p-4 transition hover:border-qalam"
        >
          <div className="text-xs font-bold uppercase tracking-wide text-ink/45">
            {isAr ? "الحرف التالي" : "Previous letter"}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-arabic-display text-3xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
              {letterGuide[prev.index].ar}
            </span>
            <span className="truncate font-display text-sm font-extrabold text-ink">
              {letterGuide[prev.index].enName}
            </span>
          </div>
        </Link>
        <Link
          href={`/${locale}/printables/letters/${next.slug}`}
          className="card-stock min-w-0 flex-1 p-4 text-end transition hover:border-qalam"
        >
          <div className="text-xs font-bold uppercase tracking-wide text-ink/45">
            {isAr ? "الحرف السابق" : "Next letter"}
          </div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <span className="truncate font-display text-sm font-extrabold text-ink">
              {letterGuide[next.index].enName}
            </span>
            <span className="font-arabic-display text-3xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
              {letterGuide[next.index].ar}
            </span>
          </div>
        </Link>
      </nav>

      {/* ---------- the whole alphabet strip ---------- */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">
          {tt("Every letter has its own page", "لكل حرف صفحته الخاصة")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {letterWorksheetPages.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/printables/letters/${p.slug}`}
              aria-label={`${letterGuide[p.index].enName} (${letterGuide[p.index].ar})`}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 font-arabic-display text-2xl transition ${
                p.slug === page.slug
                  ? "border-qalam bg-qalam/10 text-ink"
                  : "border-ink/10 bg-card text-ink/70 hover:border-qalam hover:text-ink"
              }`}
              style={{ fontFamily: "var(--font-noto-naskh), serif" }}
            >
              {letterGuide[p.index].ar}
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink/70">
          {tt(
            "Want all 28 in one file? ",
            "تريد الحروف الـ٢٨ في ملف واحد؟ ",
          )}
          <Link href={`/${locale}/printables/arabic-alphabet-tracing`} className="font-bold text-qalam underline underline-offset-4">
            {tt("Download the complete alphabet pack →", "حمّل المجموعة الكاملة ←")}
          </Link>
        </p>
      </section>
    </PageLayout>
  );
}
