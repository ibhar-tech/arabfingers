import { blogPosts } from "./blog-data";
import { RelatedArticle } from "@/components/RelatedArticles";

export const learnArticles = [
  {
    slug: "arabic-alphabet-guide",
    titleEn: "Arabic Alphabet Complete Guide",
    titleAr: "دليل الأبجدية العربية الكامل",
    descEn: "Learn all 28 Arabic letters with their sounds and an example word for each.",
    descAr: "ستتعلم الحروف العربية الـ ٢٨ كاملة مع أصواتها وكلمة مثال لكل حرف.",
    path: "learn",
  },
  {
    slug: "teaching-arabic-to-kids",
    titleEn: "Teaching Arabic to Kids: A Parent's Guide",
    titleAr: "تعليم العربية للأطفال: دليل الوالدين",
    descEn: "Practical strategies for introducing Arabic to toddlers without pressure.",
    descAr: "استراتيجيات عملية لتعريف الأطفال الصغار بالعربية دون ضغط.",
    path: "learn",
  },
  {
    slug: "arabic-numbers",
    titleEn: "Arabic Numbers 0–10 for Kids",
    titleAr: "الأرقام العربية ٠–١٠ للأطفال",
    descEn: "Learn to count from zero to ten using the Eastern Arabic-Indic numerals.",
    descAr: "ستتعلم العدّ من صفر إلى عشرة بالأرقام العربية الشرقية.",
    path: "learn",
  },
  {
    slug: "arabic-colors",
    titleEn: "Arabic Colors for Kids",
    titleAr: "الألوان بالعربية للأطفال",
    descEn: "Learn the names of everyday colors in Arabic with pronunciation.",
    descAr: "ستتعلم أسماء الألوان اليومية بالعربية مع النطق.",
    path: "learn",
  },
  {
    slug: "first-arabic-words",
    titleEn: "First Arabic Words for Kids",
    titleAr: "أول كلمات عربية للأطفال",
    descEn: "The essential first vocabulary toddlers need — family, animals, and food.",
    descAr: "المفردات الأولى الأساسية التي يحتاجها الطفل — العائلة والحيوانات والطعام.",
    path: "learn",
  },
  {
    slug: "arabic-letter-forms",
    titleEn: "How Arabic Letters Change Shape",
    titleAr: "كيف تتغير أشكال الحروف العربية",
    descEn: "See how each letter changes its shape at the beginning, middle, and end.",
    descAr: "سترى كيف يغيّر كل حرف شكله في بداية الكلمة ووسطها ونهايتها.",
    path: "learn",
  },
];

export function getRelatedArticles(locale: string, currentSlug: string, count = 2): RelatedArticle[] {
  const allArticles = [
    ...learnArticles.map(a => ({
      href: `/${locale}/${a.path}/${a.slug}`,
      titleEn: a.titleEn,
      titleAr: a.titleAr,
      descEn: a.descEn,
      descAr: a.descAr,
      slug: a.slug,
    })),
    ...blogPosts.map(p => ({
      href: `/${locale}/blog/${p.slug}`,
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      descEn: p.descEn,
      descAr: p.descAr,
      slug: p.slug,
    }))
  ];

  // Return next articles in the cycle based on current index in allArticles to make it pseudo-random but deterministic
  const currentIndex = allArticles.findIndex(a => a.slug === currentSlug) || 0;
  
  const related: RelatedArticle[] = [];
  for (let i = 1; i <= count; i++) {
    const nextIndex = (currentIndex + i) % allArticles.length;
    // ensure we don't pick the current one again (if count > length-1)
    if (allArticles[nextIndex].slug !== currentSlug) {
      related.push(allArticles[nextIndex]);
    }
  }

  return related;
}
