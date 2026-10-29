import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { generatePageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";
import { DotsLoader } from "./DotsLoader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/games/dots", {
    titleEn: "How Many Dots? — Arabic Letters Game for Kids (ب ت ث)",
    titleAr: "كم نقطة؟ — لعبة الحروف العربية المتشابهة للأطفال (ب ت ث)",
    descriptionEn:
      "A free Arabic letters game: look at the dots and tap the right letter among look-alikes — ب ت ث, ج ح خ, س ش. Ten rounds, no timer, works before a child can read. Ages 4–7.",
    descriptionAr:
      "لعبة مجانية للحروف العربية: انظر إلى النقاط وانقر الحرف الصحيح بين الحروف المتشابهة — ب ت ث، ج ح خ، س ش. عشر جولات بلا توقيت، تصلح قبل أن يقرأ الطفل. لعمر 4–7 سنوات.",
    keywords: [
      "arabic letters game", "arabic letter dots game", "similar arabic letters for kids",
      "لعبة الحروف المتشابهة", "نقاط الحروف العربية للأطفال",
    ],
  });
}

const faqEn = [
  { q: "Why do Arabic letters have dots?", a: "Several Arabic letters share exactly the same shape and differ only by their dots: ب has one dot below, ت two above and ث three above. Reading the dots is how you tell them apart." },
  { q: "Which Arabic letters look the same except for dots?", a: "The main families are ب ت ث, ج ح خ, د ذ, ر ز, س ش, ص ض, ط ظ, ع غ and ف ق. This game uses all nine." },
  { q: "What age is the dots game for?", a: "About four to seven. It needs no reading — the child only has to count dots and see whether they sit above or below the letter." },
];
const faqAr = [
  { q: "لماذا للحروف العربية نقاط؟", a: "تشترك حروف عربية عدّة في الشكل نفسه ولا يفرّق بينها إلّا النقاط: للباء نقطة تحتها، وللتاء نقطتان فوقها، وللثاء ثلاث نقاط فوقها. وقراءة النقاط هي طريقة التمييز بينها." },
  { q: "ما الحروف العربية المتشابهة إلّا في النقاط؟", a: "أهمّ مجموعاتها: ب ت ث، ج ح خ، د ذ، ر ز، س ش، ص ض، ط ظ، ع غ، ف ق. وتستعمل اللعبة المجموعات التسع كلّها." },
  { q: "لأيّ عمر لعبة النقاط؟", a: "من الرابعة إلى السابعة تقريباً. ولا تحتاج قراءة — يكفي أن يعدّ الطفل النقاط ويرى هل هي فوق الحرف أم تحته." },
];

export default async function DotsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const ar = locale === "ar";
  return (
    <PageLayout locale={locale}>
      <Breadcrumbs locale={locale} crumbs={[{ label: ar ? "الألعاب" : "Games", href: `/${locale}/games` }, { label: ar ? "كم نقطة؟" : "How many dots?" }]} />
      <div className="counting-page-heading">
        <span className="discovery-eyebrow">{ar ? "عمر 4–7 · الحروف المتشابهة" : "AGES 4–7 · LOOK-ALIKE LETTERS"}</span>
        <h1>{ar ? "كم نقطة؟" : "How many dots?"}</h1>
        <p>{ar ? "انظر إلى النقاط وانقر الحرف الصحيح: ب أم ت أم ث؟" : "Look at the dots and tap the right letter: is it ب, ت or ث?"}</p>
      </div>
      <DotsLoader locale={locale} />
      <section className="counting-parent-guide">
        <h2>{ar ? "كيف نلعب معاً؟" : "How do we play together?"}</h2>
        <p>
          {ar
            ? "اقرأ السؤال بصوت عالٍ — «انقر الحرف الذي له نقطتان فوقه» — ودع طفلك يعدّ النقاط بإصبعه على الشاشة. حين يصيب، استمعا إلى اسم الحرف معاً. وإن أخطأ فلا بأس: الحرف الخاطئ يتلوّن، ويحاول مرّة أخرى."
            : "Read the question aloud — “tap the letter with two dots above” — and let your child count the dots with a finger on the screen. When they get it, listen to the letter's name together. A wrong tap just turns orange, and they try again."}
        </p>
        <div className="hero-actions">
          <Link className="discovery-button secondary" href={`/${locale}/printables/arabic-alphabet-tracing`}>{ar ? "أوراق تتبّع الحروف" : "Letter tracing sheets"}</Link>
          <Link className="discovery-button secondary" href={`/${locale}/learn/hardest-arabic-letters`}>{ar ? "أصعب الحروف العربية" : "The hardest Arabic letters"}</Link>
        </div>
      </section>
      <div className="mx-auto max-w-[760px]">
        <FaqSection locale={locale} title={ar ? "أسئلة عن نقاط الحروف" : "Questions about letter dots"} items={ar ? faqAr : faqEn} />
      </div>
    </PageLayout>
  );
}
