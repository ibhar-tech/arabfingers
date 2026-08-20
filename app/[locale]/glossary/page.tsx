import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { glossaryCategories, glossaryCount, type GlossaryEntry } from "@/lib/glossary";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/glossary", {
    titleEn: `Arabic Word List for Kids — ${glossaryCount} Words with Meaning & Pronunciation`,
    titleAr: `قائمة كلمات عربية للأطفال — ${glossaryCount} كلمة بالمعنى والنطق`,
    descriptionEn:
      "What does that Arabic word mean? A bilingual word list for parents: every word in Arabic script with its transliteration and English meaning — colours, numbers, animals and the everyday words children meet first.",
    descriptionAr:
      "ما معنى تلك الكلمة العربية؟ قائمة كلمات ثنائية اللغة للآباء: كلّ كلمة بالخطّ العربيّ مع نطقها بالحروف اللاتينية ومعناها — الألوان والأرقام والحيوانات والكلمات اليومية الأولى.",
    ogType: "article",
    publishedTime: "2026-08-20",
    modifiedTime: "2026-08-20",
    keywords: [
      "arabic word list for kids",
      "arabic words with meaning",
      "arabic vocabulary for children",
      "arabic transliteration meaning",
      "burtuqaali meaning", "ahmar meaning", "asad meaning",
      "قائمة كلمات عربية للأطفال",
      "معاني الكلمات العربية",
    ],
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={`Arabic Word List for Kids — ${glossaryCount} Words`}
        description="A bilingual Arabic word list with transliteration and English meaning: colours, numbers, animals and everyday words."
        slug="glossary"
        datePublished="2026-08-20"
        dateModified="2026-08-20"
        section="Reference"
        crumbs={[{ label: tt("Word list", "قائمة الكلمات") }]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {tt("Arabic Word List for Kids", "قائمة كلمات عربية للأطفال")}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {tt(
          `${glossaryCount} words in Arabic script, with how to say them and what they mean`,
          `${glossaryCount} كلمة بالخطّ العربيّ، مع طريقة نطقها ومعناها`,
        )}
      </p>

      <div className="space-y-4 text-sm leading-relaxed text-ink/80 mb-10">
        <p>
          {tt(
            "This page exists for a specific moment: your child says an Arabic word, or you find one written in a book, and you want to know what it means without opening a dictionary built for adults. Every word here is one a young child actually meets — nothing academic, nothing you would never say out loud.",
            "وُجدت هذه الصفحة للحظة بعينها: ينطق طفلك كلمة عربية، أو تجدها مكتوبة في كتاب، فتريد معناها دون أن تفتح معجماً وُضع للكبار. وكلّ كلمة هنا ممّا يلقاه الطفل الصغير فعلاً — لا شيء أكاديميّ، ولا شيء لا يُقال بصوت عالٍ.",
          )}
        </p>
        <p>
          {tt(
            "The middle column is the transliteration — the word written in Latin letters so you can say it before you can read the script. It is a guide, not a rule: Arabic has sounds English does not, and a few of them can only be approximated this way. Where a word matters and the sound is hard, the alphabet guide explains how to make it properly.",
            "والعمود الأوسط هو النطق بالحروف اللاتينية، لتقول الكلمة قبل أن تقرأ الخطّ. وهو دليل لا قاعدة: ففي العربية أصوات ليست في الإنجليزية، وبعضها لا يمكن إلّا تقريبه هكذا. وحيث تهمّ الكلمة ويصعب صوتها، يشرح دليل الأبجدية كيف يُنطق على وجهه.",
          )}
        </p>
      </div>

      <nav aria-label={tt("Jump to a section", "انتقل إلى قسم")} className="mb-10 flex flex-wrap gap-2">
        {glossaryCategories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-xl border-2 border-ink/15 bg-card px-3 py-1.5 text-sm font-bold text-ink transition hover:border-qalam"
          >
            {isAr ? c.titleAr : c.titleEn}{" "}
            <span className="text-ink/45">({c.entries.length})</span>
          </a>
        ))}
      </nav>

      {glossaryCategories.map((c) => (
        <section key={c.id} id={c.id} className="mb-12 scroll-mt-24">
          <h2 className="text-xl font-semibold text-ink mb-2">{isAr ? c.titleAr : c.titleEn}</h2>
          <p className="text-sm leading-relaxed text-ink/75 mb-4">{isAr ? c.blurbAr : c.blurbEn}</p>
          <WordTable entries={c.entries} isAr={isAr} />
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-3">
          {tt("How to use a list like this", "كيف تُستعمل قائمة كهذه")}
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-ink/80">
          <p>
            {tt(
              "Do not work through it. A word list is a reference, not a syllabus, and a child asked to memorise a hundred words will learn to dislike all of them. Use it the way you would use a dictionary — when a specific word comes up and somebody wants to know.",
              "لا تمضِ فيها صفحةً صفحة. فقائمة الكلمات مرجع لا منهج، والطفل الذي يُطلب إليه حفظ مئة كلمة يتعلّم كراهيتها كلّها. استعملها كما تستعمل المعجم: حين تَعرِض كلمة بعينها ويريد أحدٌ معرفتها.",
            )}
          </p>
          <p>
            {tt(
              "When you do teach a word deliberately, teach it attached to the thing. The colour words stick because there is something red in every room; the animal words stick because the child already knows the animal. Abstract words at this age slide off.",
              "وإذا علّمت كلمة عن قصد فعلّمها مقترنة بمسمّاها. فكلمات الألوان تثبت لأنّ في كلّ غرفة شيئاً أحمر، وأسماء الحيوانات تثبت لأنّ الطفل يعرف الحيوان أصلاً. أمّا المجرّدات في هذه السنّ فتنزلق ولا تعلق.",
            )}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-ink bg-saffron-soft/40 p-6">
        <h2 className="font-display text-lg font-extrabold text-ink">
          {tt("Hear these words, or write them", "اسمع هذه الكلمات أو اكتبها")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          {tt(
            "A written list only gets you halfway — Arabic has sounds that cannot be spelled in English letters. These pages have the recordings and the practice sheets.",
            "القائمة المكتوبة تبلغ بك نصف الطريق، ففي العربية أصوات لا تُكتب بحروف إنجليزية. وفي هذه الصفحات التسجيلات وأوراق التمرين.",
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="btn-chunky text-sm">
            {tt("Letter sounds & audio", "أصوات الحروف والتسجيلات")}
          </Link>
          <Link href={`/${locale}/printables/arabic-alphabet-tracing`} className="btn-chunky btn-chunky-ghost text-sm">
            {tt("Free tracing worksheets", "أوراق التتبّع المجانية")}
          </Link>
          <Link href={`/${locale}/learn/hardest-arabic-letters`} className="btn-chunky btn-chunky-ghost text-sm">
            {tt("The 10 hardest sounds", "أصعب عشرة أصوات")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

function WordTable({ entries, isAr }: { entries: GlossaryEntry[]; isAr: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-card">
            <th className="py-2 px-3 text-start font-medium text-ink/70">{isAr ? "الكلمة" : "Arabic"}</th>
            <th className="py-2 px-3 text-start font-medium text-ink/70">{isAr ? "النطق" : "Say it"}</th>
            <th className="py-2 px-3 text-start font-medium text-ink/70">{isAr ? "المعنى" : "Meaning"}</th>
          </tr>
        </thead>
        <tbody className="text-ink/80">
          {entries.map((e) => (
            <tr key={e.slug + e.ar} id={e.slug} className="border-b border-ink/5 scroll-mt-24 last:border-0">
              <td
                className="py-2.5 px-3 text-xl text-ink whitespace-nowrap"
                style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), serif" }}
              >
                <span aria-hidden className="me-2 text-base">{e.emoji}</span>
                {e.ar}
              </td>
              <td className="py-2.5 px-3 font-mono text-[0.8rem] text-qalam whitespace-nowrap">{e.translit}</td>
              <td className="py-2.5 px-3">{isAr ? e.meaningAr : e.meaningEn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
