import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { InteractiveAlphabet } from "@/components/InteractiveAlphabet";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { letterGuide } from "@/lib/letterGuide";
import { LetterCard } from "@/components/illustrations/LetterCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-alphabet-guide", {
    titleEn: "Arabic Alphabet for Kids: Complete Guide to All 28 Letters",
    titleAr: "دليل الأبجدية العربية الكامل للأطفال — الحروف الـ٢٨ بالنطق والأمثلة",
    descriptionEn:
      "Every Arabic letter explained for parents: how to make each sound, example words, the most common mistakes, and a parent tip — with audio and illustrated letter cards.",
    descriptionAr:
      "شرح كامل لكل حرف عربي: مخرج الحرف وطريقة نطقه، كلمات للأمثلة، أشهر أخطاء الأطفال، ونصيحة عملية للوالدين — مع الصوت وبطاقات مصورة.",
    ogType: "article",
    publishedTime: "2026-03-05",
    keywords: [
      "arabic alphabet for kids", "الحروف العربية للأطفال",
      "arabic letters pronunciation", "نطق الحروف العربية",
      "teach arabic alphabet", "تعليم الحروف للأطفال",
    ],
  });
}

export default async function ArabicAlphabetGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "دليل الأبجدية العربية الكامل: الحروف الـ٢٨ بالنطق والأمثلة" : "Arabic Alphabet: Complete Guide to All 28 Letters"}
        description={
          isAr
            ? "تعلم جميع الحروف العربية الـ٢٨ مع مخرج كل حرف وكلمات للأمثلة وأخطاء الأطفال الشائعة ونصائح عملية للوالدين."
            : "Learn all 28 Arabic letters with pronunciation, English equivalents, and writing tips. A complete guide for beginners and kids."
        }
        slug="learn/arabic-alphabet-guide"
        datePublished="2026-03-05"
        dateModified="2026-06-11"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "دليل الأبجدية" : "Alphabet Guide" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "دليل الأبجدية العربية الكامل" : "The Arabic Alphabet: A Complete Guide"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "تعلم جميع الحروف العربية الـ ٢٨ مع النطق والأمثلة" : "Learn all 28 Arabic letters with pronunciation and examples"}
      </p>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-3">
        <p>
          {isAr
            ? "الأبجدية العربية هي واحدة من أكثر أنظمة الكتابة استخداماً في العالم. تتكون من ٢٨ حرفاً تُكتب من اليمين إلى اليسار. على عكس الأبجدية اللاتينية، تتغير أشكال الحروف العربية حسب موقعها في الكلمة — بداية أو وسط أو نهاية."
            : "The Arabic alphabet is one of the most widely used writing systems in the world. It consists of 28 letters written from right to left. Unlike the Latin alphabet, Arabic letter shapes change depending on their position in a word — beginning, middle, or end."}
        </p>
        <p>
          {isAr
            ? "في هذا الدليل، سنستعرض كل حرف بشكله المنفصل — وهو الشكل الأساسي الذي يتعلمه الأطفال أولاً. هذا هو نفس الشكل الذي يعرضه تطبيق عرب فنجرز عندما يضغط طفلك على المفاتيح."
            : "In this guide, we'll cover each letter in its isolated form — the basic shape that children learn first. This is the same form that ArabFingers displays when your child presses keys."}
        </p>
        <p>
          {isAr
            ? "وأفضل طريقة للاستفادة من هذا الدليل أن تبدأ مع طفلك بالاستماع: اضغطا على كل حرف في الشبكة التفاعلية أدناه لتسمعا نطقه الحقيقي بصوت واضح. ثم انتقلا إلى شرح الحرف المفصّل، حيث تجد مخرجه وطريقة نطقه، وكلمات للأمثلة، وأشهر خطأ يقع فيه الأطفال، ونصيحة عملية لك. وأخيراً ثبّتا ما تعلّمتماه باللعب في تطبيق عرب فنجرز أو بأوراق العمل القابلة للطباعة."
            : "The best way to use this guide is to learn each letter in three steps. First, listen: tap any letter in the interactive grid below to hear its real, clearly-spoken sound. Next, read that letter's deep dive — how the sound is made, example words, the single most common mistake children make, and one practical parent tip. Finally, lock it in through play in the ArabFingers game or with the free printable worksheets. Listen, read, then practice."}
        </p>
      </div>

      <InteractiveAlphabet locale={locale} />

      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 mb-10 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/70">
          {isAr
            ? "تريد التدرّب بعيداً عن الشاشة؟ اطبع أوراق عمل الحروف العربية مجاناً."
            : "Want to practice off-screen? Print free Arabic letter worksheets."}
        </p>
        <Link
          href={`/${locale}/printables`}
          className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-950 hover:scale-105 transition"
        >
          {isAr ? "📄 أوراق العمل" : "📄 Printable Worksheets"}
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-ink mb-4">
        {isAr ? "كل حرف بالتفصيل" : "Every Letter in Detail"}
      </h2>
      <div className="space-y-6 mb-10">
        {letterGuide.map((l, i) => (
          <article key={l.ar} id={`letter-${l.enName.toLowerCase()}`} className="rounded-2xl border border-ink/10 bg-white/5 p-5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5">
            <div className="mx-auto w-44 sm:w-full">
              <LetterCard entry={l} index={i} locale={locale} />
            </div>
            <div className="min-w-0 space-y-3">
              <h3 className="text-lg font-bold text-ink">
                {isAr ? `حرف ال${l.arName}` : `${l.enName} (${l.arName})`}{" "}
                <span className="text-sm font-normal text-ink/60">
                  {isAr
                    ? l.difficulty === "easy" ? "— سهل النطق" : l.difficulty === "medium" ? "— متوسط" : "— يحتاج تدريباً"
                    : l.difficulty === "easy" ? "— easy" : l.difficulty === "medium" ? "— medium" : "— challenging"}
                </span>
              </h3>
              <p className="text-sm leading-relaxed text-ink/80">
                <strong className="text-accent">{isAr ? "كيف ننطقه: " : "How to say it: "}</strong>
                {isAr ? l.soundHowToAr : l.soundHowToEn}
              </p>
              <p className="text-sm leading-relaxed text-ink/80">
                <strong className="text-accent">{isAr ? "ميّزه عن أشباهه: " : "Compared to English: "}</strong>
                {isAr ? l.comparisonAr : l.comparisonEn}
              </p>
              <div className="flex flex-wrap gap-2">
                {l.examples.map((ex) => (
                  <span key={ex.word} className="rounded-xl border border-ink/10 bg-white/5 px-3 py-1.5 text-sm text-ink/85">
                    {ex.emoji} <span style={{ fontFamily: "var(--font-noto-naskh), serif" }}>{ex.word}</span>{" "}
                    <span className="text-ink/60">{isAr ? `— ${ex.meaningAr}` : `(${ex.translit} — ${ex.meaningEn})`}</span>
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink/80">
                <strong className="text-rose-300">{isAr ? "الخطأ الشائع: " : "Common mistake: "}</strong>
                {isAr ? l.mistakeAr : l.mistakeEn}
              </p>
              <p className="text-sm leading-relaxed text-ink/80">
                <strong className="text-emerald-300">{isAr ? "نصيحة للوالدين: " : "Parent tip: "}</strong>
                {isAr ? l.parentTipAr : l.parentTipEn}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105"
        >
          🚀 {isAr ? "تدرب على الحروف في عرب فنجرز" : "Practice Letters in ArabFingers"}
        </Link>
      </div>

      <section className="mt-6 border-t border-ink/10 pt-6">
        <h2 className="text-lg font-semibold text-ink mb-3">
          {isAr ? "أدلة ذات صلة" : "Related guides"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/learn/arabic-letter-forms", en: "How Arabic letters change shape", ar: "كيف تتغير أشكال الحروف" },
            { href: "/learn/arabic-numbers", en: "Arabic numbers (1–10)", ar: "الأرقام العربية (١–١٠)" },
            { href: "/learn/arabic-vs-english", en: "Arabic vs English alphabet", ar: "الأبجدية العربية مقابل الإنجليزية" },
            { href: "/learn/teaching-arabic-to-kids", en: "Teaching Arabic to kids", ar: "تعليم العربية للأطفال" },
          ].map((r) => (
            <Link key={r.href} href={`/${locale}${r.href}`} className="rounded-xl border border-ink/10 bg-white/5 p-3 text-sm text-ink/75 hover:bg-white/10 hover:text-accent transition">
              {isAr ? r.ar : r.en} →
            </Link>
          ))}
        </div>
      </section>

      <HowToSchema locale={locale} />
    </PageLayout>
  );
}

function HowToSchema({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name:
      locale === "ar"
        ? "كيف تعلّم طفلك الأبجدية العربية"
        : "How to teach your child the Arabic alphabet",
    description:
      locale === "ar"
        ? "خطوات بسيطة لتعليم الأطفال الحروف العربية الـ ٢٨ من خلال اللعب والتكرار."
        : "Simple steps to teach children the 28 Arabic letters through play and repetition.",
    inLanguage: locale === "ar" ? "ar" : "en",
    step: [
      {
        "@type": "HowToStep",
        name: locale === "ar" ? "ابدأ بالاستماع" : "Start with listening",
        text:
          locale === "ar"
            ? "اضغط على كل حرف في الشبكة التفاعلية لسماع نطقه بالعربية والإنجليزية."
            : "Tap each letter in the interactive grid to hear its Arabic and English pronunciation.",
      },
      {
        "@type": "HowToStep",
        name: locale === "ar" ? "اربط الشكل بالصوت" : "Connect shape to sound",
        text:
          locale === "ar"
            ? "اعرض شكل الحرف المنفصل وكرّر اسمه حتى يربط الطفل بين الشكل والصوت."
            : "Show the isolated letter shape and repeat its name so the child links shape to sound.",
      },
      {
        "@type": "HowToStep",
        name: locale === "ar" ? "تدرّب باللعب" : "Practice through play",
        text:
          locale === "ar"
            ? "استخدم لعبة عرب فنجرز وأوراق العمل القابلة للطباعة للتكرار الممتع بدون ضغط."
            : "Use the Arab Fingers letter game and printable worksheets for fun, pressure-free repetition.",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
