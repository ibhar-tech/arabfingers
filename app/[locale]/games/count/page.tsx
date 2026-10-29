import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";
import { CountingGame } from "./CountingGame";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/games/count", {
    titleEn: "Arabic Counting Game for Kids — Learn Numbers 1–10",
    titleAr: "لعبة العدّ للأطفال — تعلّم الأرقام العربية 1–10",
    descriptionEn: "Count apples, match numbers 1–10, and hear their Arabic names. A free counting game for ages 3–6 with two levels, no timer and no sign-up.",
    descriptionAr: "عُدّ التفّاح وطابق الأرقام 1–10 واستمع لأسماء الأعداد. لعبة مجانية لعمر 3–6 سنوات بمستويين، بدون توقيت أو تسجيل.",
  });
}

export default async function CountingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const ar = locale === "ar";
  return <PageLayout locale={locale}>
    <Breadcrumbs locale={locale} crumbs={[{ label: ar ? "الألعاب" : "Games", href: `/${locale}/games` }, { label: ar ? "عُدّ واكتشف" : "Count & discover" }]} />
    <div className="counting-page-heading"><span className="discovery-eyebrow">{ar ? "عمر 3–6 · تعلّم باللعب" : "AGES 3–6 · LEARN THROUGH PLAY"}</span><h1>{ar ? "عُدّ واكتشف" : "Count & discover"}</h1><p>{ar ? "لعبة مجانية لتعلّم الأرقام العربية من 1 إلى 10. عدّ، اختر، واستمع." : "A free Arabic counting game from 1 to 10. Count, choose, and listen."}</p></div>
    <CountingGame locale={locale} />
    <section className="counting-parent-guide"><h2>{ar ? "كيف نلعب معاً؟" : "How do we play together?"}</h2><p>{ar ? "ابدأ بالأعداد من 1 إلى 5. دع طفلك يلمس كل تفّاحة ويعدّها، ثم يختار العدد الصحيح. نستخدم الأرقام 1 و2 و3 مع أسماء الأعداد بالعربية. بعد الإجابة الصحيحة، استمعا إلى اسم العدد بالعربية. انتقلا إلى 6–10 حين يشعر الطفل بالثقة. لا توجد عقوبة على الخطأ ولا حدّ زمني." : "Start with numbers 1–5. Let your child tap and count each apple, then choose the matching number. The familiar digits 1, 2 and 3 are paired with spoken Arabic number names. After a correct answer, listen to the Arabic number name together. Try 6–10 when your child feels confident. There are no penalties for mistakes and no time limit."}</p><div className="hero-actions"><Link className="discovery-button secondary" href={`/${locale}/printables/arabic-numbers-tracing`}>{ar ? "حمّل أوراق تتبّع الأرقام" : "Download number tracing sheets"}</Link><Link className="discovery-button secondary" href={`/${locale}/learn/arabic-numbers`}>{ar ? "دليل الأرقام العربية" : "Read the Arabic numbers guide"}</Link></div></section>
  </PageLayout>;
}
