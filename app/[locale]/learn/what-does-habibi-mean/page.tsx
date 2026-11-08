import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { PageLayout } from "@/components/PageLayout";
import { RelatedArticles } from "@/components/RelatedArticles";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { isLocale } from "@/lib/locales";
import { getRelatedArticles } from "@/lib/related";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

const PATH = "/learn/what-does-habibi-mean";
const PUBLISHED = "2026-11-08";
const NASKH = { fontFamily: "var(--font-noto-naskh), sans-serif" };

const FORMS = [
  { word: "حبيبي", say: "ḥabībī", toEn: "A man or boy", toAr: "للمذكّر" },
  { word: "حبيبتي", say: "ḥabībtī", toEn: "A woman or girl", toAr: "للمؤنّث" },
  { word: "حبايبي", say: "ḥabāybī", toEn: "A group, in everyday speech", toAr: "للجماعة، في الكلام اليومي" },
];

const SPELLING = [
  { letter: "ح", form: "حـ", en: "start of the word", ar: "أوّل الكلمة" },
  { letter: "ب", form: "ـبـ", en: "middle", ar: "وسط الكلمة" },
  { letter: "ي", form: "ـيـ", en: "middle, the long ī vowel", ar: "وسط الكلمة، مدّ بالياء" },
  { letter: "ب", form: "ـبـ", en: "middle", ar: "وسط الكلمة" },
  { letter: "ي", form: "ـي", en: "end, meaning “my”", ar: "آخر الكلمة، ياء المتكلّم" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, PATH, {
    titleEn: "What Does Habibi Mean? Habibi vs Habibti Explained",
    titleAr: "ما معنى حبيبي؟ الفرق بين حبيبي وحبيبتي",
    descriptionEn: "Habibi (حبيبي) means “my dear” in Arabic. How to say it, when to use habibi or habibti, when not to, and how the word is written.",
    descriptionAr: "حبيبي كلمة عربية تعني «يا عزيزي». متى نقول حبيبي ومتى حبيبتي، ومتى لا تناسب، وكيف تُكتب حرفاً حرفاً.",
    ogType: "article",
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    keywords: ["habibi meaning", "what does habibi mean", "habibi vs habibti", "habibi in arabic", "معنى حبيبي"],
  });
}

export default async function WhatDoesHabibiMeanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const tt = (en: string, ar: string) => (isAr ? ar : en);

  const faq = [
    {
      q: tt("Is habibi romantic?", "هل كلمة حبيبي رومانسية؟"),
      a: tt(
        "It can be, between spouses, but most of the time it is not. Parents say it to children, friends say it to each other, and relatives use it all the time. The relationship and the tone decide what it means.",
        "قد تكون كذلك بين الزوجين، لكنّها في الغالب ليست كذلك. فالأهل يقولونها لأبنائهم، والأصدقاء لبعضهم، والأقارب كثيراً. والعلاقة ونبرة الصوت هما ما يحدّد المعنى.",
      ),
    },
    {
      q: tt("Can you say habibi to a woman?", "هل تُقال حبيبي للمرأة؟"),
      a: tt(
        "The form that matches a woman is habibti. In casual speech in some regions you will also hear habibi said to women, but as a learner, use habibti.",
        "الصيغة المطابقة للمرأة هي حبيبتي. وقد تسمع «حبيبي» تُقال للمرأة في الكلام العفوي في بعض المناطق، لكنّ الصيغة المطابقة أولى للمتعلّم.",
      ),
    },
    {
      q: tt("What is the difference between habib and habibi?", "ما الفرق بين حبيب وحبيبي؟"),
      a: tt(
        "Habib means beloved or dear one. Adding the ending ي (ī) makes it “my beloved”. Habib is also used as a man's name.",
        "حبيب تعني المحبوب، وبإضافة ياء المتكلّم تصبح «حبيبي». وحبيب أيضاً اسم علم للذكور.",
      ),
    },
    {
      q: tt("How do you write habibi in Arabic?", "كيف تُكتب حبيبي؟"),
      a: tt(
        "It is written حبيبي, with five letters joined from right to left: ح ب ي ب ي. For a woman, habibti adds ت before the last letter: حبيبتي.",
        "تُكتب حبيبي بخمسة أحرف متّصلة: ح ب ي ب ي. وتُضاف التاء قبل الحرف الأخير في حبيبتي.",
      ),
    },
  ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={tt("What Does Habibi Mean?", "ما معنى حبيبي؟")}
        description={tt("The meaning of habibi and habibti, who says them to whom, and how the word is written.", "معنى حبيبي وحبيبتي، ولمن تُقالان، وكيف تُكتب الكلمة.")}
        slug="learn/what-does-habibi-mean"
        datePublished={PUBLISHED}
        dateModified={PUBLISHED}
        section="Education"
        crumbs={[
          { label: tt("Learn", "تعلم"), href: `/${locale}/learn` },
          { label: tt("What Does Habibi Mean?", "معنى حبيبي") },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-4">{tt("What Does Habibi Mean?", "ما معنى حبيبي؟")}</h1>
      <p className="text-lg leading-relaxed text-ink/85 mb-8">
        {tt(
          "Habibi (حبيبي) is an Arabic word of affection meaning “my dear” or “my beloved”. It is said to a man or boy. To a woman or girl, the word is habibti (حبيبتي).",
          "حبيبي كلمة مودّة عربية تعني «يا عزيزي» أو «يا من أحبّ»، وتُقال للمذكّر. أمّا للمؤنّث فنقول حبيبتي.",
        )}
      </p>

      <div className="space-y-8 text-base leading-relaxed text-ink/80 mb-10">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("Habibi, habibti and the plural", "حبيبي وحبيبتي والجمع")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="py-2 px-3 text-center text-ink/70 font-medium">{tt("Arabic", "الكلمة")}</th>
                  <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Say it", "النطق")}</th>
                  <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Said to", "تُقال")}</th>
                </tr>
              </thead>
              <tbody>
                {FORMS.map((f) => (
                  <tr key={f.word} className="border-b border-ink/10">
                    <td className="py-2.5 px-3 text-center text-2xl text-ink" style={NASKH} lang="ar">{f.word}</td>
                    <td className="py-2.5 px-3" dir="ltr">{f.say}</td>
                    <td className="py-2.5 px-3">{isAr ? f.toAr : f.toEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            {tt(
              "The stress falls on the long “bee”: ha-BEE-bee. The first sound, ح, is a breathy h from the throat, stronger than the English h. You will often hear it with ya in front, as in ya habibi (يا حبيبي), which is how Arabic addresses someone directly.",
              "وتُنطق الحاء من وسط الحلق، وتكثر معها «يا» النداء فنقول: يا حبيبي.",
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("Where the word comes from", "أصل الكلمة")}</h2>
          <p>
            {tt(
              "It comes from the Arabic root ḥ-b-b, connected with love. From it come ḥubb (حُبّ, love) and ḥabīb (حبيب, beloved). The ending ī (ـي) means “my”.",
              "الكلمة من الجذر ح ب ب الدالّ على المحبّة، ومنه الحُبّ والحبيب. والياء في آخرها ياء المتكلّم.",
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("When people say it, and when not to", "متى تُقال، ومتى لا تناسب")}</h2>
          <p className="mb-3">
            {tt(
              "Arabic speakers use it with family and close friends, and parents say it to their children all the time. Among friends it can be warm, playful or gently teasing, and the tone of voice carries that difference.",
              "يستعملها الناس مع الأهل والأصدقاء المقرّبين، ويقولها الآباء والأمّهات لأبنائهم كثيراً. وقد تكون بين الأصدقاء دافئة أو مازحة، ونبرة الصوت هي التي تبيّن ذلك.",
            )}
          </p>
          <p>
            {tt(
              "As a learner, avoid it with people you do not know well and in formal or work settings. Saying it to someone of the opposite sex outside family or close friends can sound too familiar, especially in more conservative settings.",
              "وتجنّبها مع من لا تعرفه جيداً وفي المواقف الرسمية أو في العمل. وقد تبدو مبالغة في الألفة إن قيلت لغير الأقارب أو الأصدقاء المقرّبين من الجنس الآخر، ولا سيما في البيئات المحافظة.",
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">{tt("How it is written, letter by letter", "كيف تُكتب حرفاً حرفاً")}</h2>
          <p className="mb-4">
            {tt("Arabic is written from right to left and the letters join, so each one takes the shape for its place in the word:", "تُكتب العربية من اليمين إلى اليسار وتتّصل حروفها، فيأخذ كلّ حرف الشكل المناسب لموضعه:")}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="py-2 px-3 text-center text-ink/70 font-medium">{tt("Letter", "الحرف")}</th>
                  <th className="py-2 px-3 text-center text-ink/70 font-medium">{tt("Shape here", "شكله هنا")}</th>
                  <th className="py-2 px-3 text-start text-ink/70 font-medium">{tt("Position", "موضعه")}</th>
                </tr>
              </thead>
              <tbody>
                {SPELLING.map((s, i) => (
                  <tr key={i} className="border-b border-ink/10">
                    <td className="py-2.5 px-3 text-center text-2xl text-ink" style={NASKH} lang="ar">{s.letter}</td>
                    <td className="py-2.5 px-3 text-center text-2xl text-ink" style={NASKH} lang="ar">{s.form}</td>
                    <td className="py-2.5 px-3">{isAr ? s.ar : s.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            <Link href={`/${locale}/learn/arabic-alphabet-for-adults`} className="font-semibold underline underline-offset-4">{tt("Learning the Arabic alphabet as an adult", "تعلّم الحروف العربية في الكبر")}</Link>
          </p>
        </section>
      </div>

      <WorksheetCrossLink
        locale={locale}
        packId="arabic-handwriting-beginners"
        titleEn="Practise writing Arabic yourself"
        titleAr="تدرّب على الكتابة بنفسك"
        textEn="A free, plain handwriting workbook for teens and adults: every letter in its four forms, then everyday words for joining practice."
        textAr="كرّاسة خطّ مجانية بسيطة لليافعين والكبار: كلّ حرف بأشكاله الأربعة، ثمّ كلمات يومية للتدرّب على الوصل."
      />

      <FaqSection locale={locale} title={tt("Common questions", "أسئلة شائعة")} items={faq} />
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "what-does-habibi-mean")} />
    </PageLayout>
  );
}
