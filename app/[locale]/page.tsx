import type { Metadata } from "next";
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
  // path "" → self-canonical to /{locale} with correct hreflang. The brand is
  // appended by the root title template, so titles stay brand-free here.
  return generatePageMetadata(locale, "", {
    titleEn: "Free Arabic Worksheets for Kids — Printable PDFs + Letter Game",
    titleAr: "أوراق عمل عربية مجانية للأطفال — ملفات PDF للطباعة ولعبة حروف",
    descriptionEn:
      "53 pages of free printable Arabic worksheets — tracing sheets for all 28 letters, numbers, colours and animals. No signup. Plus a free letter game with real pronunciation and guides for parents.",
    descriptionAr:
      "٥٣ صفحة من أوراق العمل العربية المجانية للطباعة — أوراق تتبّع للحروف الـ٢٨ والأرقام والألوان والحيوانات، بلا تسجيل. مع لعبة حروف مجانية بنطق حقيقيّ وأدلّة للآباء.",
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
