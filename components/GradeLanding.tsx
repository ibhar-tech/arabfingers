import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { gradePages, type GradePage } from "@/lib/gradePages";
import { worksheetSets } from "@/lib/worksheets";

const SITE = "https://www.arabfingers.site";

/** A grade-level view of the library: the right packs for one age, in order. */
export function GradeLanding({ locale, grade }: { locale: string; grade: GradePage }) {
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);
  const packs = grade.packs.map((p) => ({ ...p, set: worksheetSets.find((s) => s.id === p.id)! }));
  const url = `${SITE}/${locale}/printables/${grade.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: tt(grade.h1En, grade.h1Ar),
        description: tt(grade.seoDescEn, grade.seoDescAr),
        url,
        inLanguage: locale,
        isAccessibleForFree: true,
        audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: tt(grade.ageEn, grade.ageAr) },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: packs.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/${locale}/printables/${p.id}`,
            name: tt(p.set.titleEn, p.set.titleAr),
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: grade.faq.map((f) => ({
          "@type": "Question",
          name: tt(f.qEn, f.qAr),
          acceptedAnswer: { "@type": "Answer", text: tt(f.aEn, f.aAr) },
        })),
      },
    ],
  };

  return (
    <PageLayout locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: tt("Worksheets", "أوراق العمل"), href: `/${locale}/printables` },
          { label: tt(grade.h1En, grade.h1Ar) },
        ]}
      />

      <header className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/70">
          {grade.emoji} {tt(grade.ageEn, grade.ageAr)} · {tt(`${packs.length} free packs`, `${packs.length} حزم مجانية`)}
        </p>
        <h1 className="font-display mt-1 text-3xl font-extrabold leading-tight text-ink">{tt(grade.h1En, grade.h1Ar)}</h1>
        <div className="mt-3 max-w-3xl space-y-3">
          {(isAr ? grade.introAr : grade.introEn).map((p) => (
            <p key={p} className="text-base leading-relaxed text-ink/80">{p}</p>
          ))}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold text-ink">{tt("What children can usually do at this age", "ما يستطيعه الطفل غالباً في هذه السنّ")}</h2>
        <ul className="mt-4 space-y-2">
          {(isAr ? grade.canDoAr : grade.canDoEn).map((line) => (
            <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink/80">
              <span aria-hidden className="mt-1 flex-none text-qalam">◆</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">{tt("The worksheets, in the order to use them", "أوراق العمل بالترتيب الذي تُستعمل به")}</h2>
        <ol className="mt-4 space-y-4">
          {packs.map((p, i) => (
            <li key={p.id} className="card-stock flex gap-4 p-4">
              <Image
                src={`/printables/previews/${p.id}.png`}
                alt={tt(`First page of ${p.set.titleEn}`, `الصفحة الأولى من ${p.set.titleAr}`)}
                width={96}
                height={136}
                unoptimized
                className="h-auto w-20 flex-none rounded border border-ink/15 bg-white sm:w-24"
              />
              <div className="min-w-0">
                <h3 className="font-display text-base font-extrabold leading-snug text-ink">
                  {i + 1}. <Link href={`/${locale}/printables/${p.id}`} className="underline-offset-4 hover:underline">{tt(p.set.titleEn, p.set.titleAr)}</Link>
                </h3>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink/70">
                  {p.set.pages} {tt(p.set.pages === 1 ? "page" : "pages", "صفحة")} · {tt(p.set.ageEn, p.set.ageAr)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{tt(p.whyEn, p.whyAr)}</p>
                <a href={`/printables/${p.id}.pdf`} download className="mt-2 inline-block text-sm font-bold text-ink underline underline-offset-4">
                  ⬇ {tt("Download the PDF", "حمّل ملف PDF")}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded-2xl border border-ink/10 bg-card p-5">
        <h2 className="font-display text-xl font-extrabold text-ink">{tt("A 4-week starter plan", "خطّة بداية لأربعة أسابيع")}</h2>
        <p className="mt-1 text-sm text-ink/75">{tt("Ten minutes a day, five days a week.", "عشر دقائق يومياً، خمسة أيام في الأسبوع.")}</p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
          {grade.plan.map((w) => <li key={w.en}>{tt(w.en, w.ar)}</li>)}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">{tt("Questions", "أسئلة")}</h2>
        <div className="mt-4 space-y-3">
          {grade.faq.map((f) => (
            <div key={f.qEn} className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="text-base font-semibold text-ink mb-1">{tt(f.qEn, f.qAr)}</h3>
              <p className="text-sm leading-relaxed text-ink/80">{tt(f.aEn, f.aAr)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-ink">{tt("Other ages", "أعمار أخرى")}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {gradePages.filter((g) => g.slug !== grade.slug).map((g) => (
            <Link key={g.slug} href={`/${locale}/printables/${g.slug}`} className="card-stock px-4 py-3 text-sm font-bold text-ink transition hover:border-qalam">
              {g.emoji} {tt(g.h1En, g.h1Ar)}
            </Link>
          ))}
          <Link href={`/${locale}/printables`} className="card-stock px-4 py-3 text-sm font-bold text-ink transition hover:border-qalam">
            {tt("All worksheets →", "← كلّ أوراق العمل")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
