import type { Metadata } from "next";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { WarmHome } from "@/components/WarmHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // path "" → self-canonical to /{locale} with correct hreflang. The brand is
  // appended by the root title template, so titles stay brand-free here.
  return generatePageMetadata(locale, "", {
    titleEn: "Arabic Alphabet for Kids — Free Bilingual Letter Game",
    titleAr: "الحروف العربية للأطفال — لعبة مجانية لتعلم الأبجدية",
    descriptionEn:
      "Free, ad-free bilingual Arabic learning for toddlers (1–6). Play with all 28 Arabic letters, hear natural pronunciation, and explore guides for parents.",
    descriptionAr:
      "تعلّم مجاني وبدون إعلانات للأطفال من ١ إلى ٦ سنوات. العب بالحروف العربية الـ٢٨، استمع إلى النطق الطبيعي، واستكشف أدلة مفيدة للآباء.",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return <WarmHome locale={locale} />;
}
