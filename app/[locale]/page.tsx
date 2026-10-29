import type { Metadata } from "next";
import { worksheetSets } from "@/lib/worksheets";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { WarmHome } from "@/components/WarmHome";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pages = worksheetSets.filter((pack) => !pack.bundle).reduce((sum, pack) => sum + pack.pages, 0);
  // path "" → self-canonical to /{locale} with correct hreflang. The brand is
  // appended by the root title template, so titles stay brand-free here.
  return generatePageMetadata(locale, "", {
    titleEn: "Free Arabic Worksheets for Kids — Printable PDFs + Letter Game",
    titleAr: "أوراق عمل عربية مجانية للأطفال — ملفات PDF للطباعة ولعبة حروف",
    descriptionEn:
      `${pages} pages of free Arabic worksheets, counting and letter games, and illustrated stories. Browse by age, save favourites, and learn together. No sign-up.`,
    descriptionAr:
      `${pages.toLocaleString("ar-u-nu-latn")} صفحة من أوراق العمل العربية المجانية، وألعاب الحروف والأرقام وقصص مصوّرة. اختر حسب العمر واحفظ المفضّلة وتعلّم مع طفلك. بدون تسجيل.`,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  return <WarmHome locale={locale} />;
}
