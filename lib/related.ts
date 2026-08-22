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
    slug: "teaching-arabic-non-speakers",
    titleEn: "Teaching Arabic When You Don't Speak It",
    titleAr: "تعليم العربية وأنت لا تتحدثها",
    descEn: "A six-week plan for non-Arabic parents: audio-first letters, five-minute sessions, and worksheets you can check without reading the script.",
    descAr: "خطة ستة أسابيع للوالدين غير الناطقين بالعربية: الحروف بالصوت أولاً، وجلسات من خمس دقائق، وأوراق تراجعها دون قراءة الخط.",
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
  /* These four existed as pages but were missing from this list, so nothing on the
     site linked to them except the /learn index — they were effectively orphaned
     from related-article suggestions and from the homepage library. */
  {
    slug: "arabic-vs-english",
    titleEn: "Arabic vs English: 7 Key Differences",
    titleAr: "العربية والإنجليزية: ٧ فروق أساسية",
    descEn: "Direction, letter count, shapes and dots — and what transfers easily for a bilingual child.",
    descAr: "الاتجاه وعدد الحروف والأشكال والنقاط — وما الذي ينتقل بسهولة للطفل ثنائي اللغة.",
    path: "learn",
  },
  {
    slug: "best-age-to-learn-arabic",
    titleEn: "Best Age to Start Arabic",
    titleAr: "أفضل عمر للبدء بالعربية",
    descEn: "A stage-by-stage guide from listening at 0–2 to reading at 6+, and why it is never too late.",
    descAr: "دليل مرحلة بمرحلة من الإصغاء في ٠–٢ إلى القراءة في ٦+، ولماذا لا يفوت الأوان أبداً.",
    path: "learn",
  },
  {
    slug: "bilingual-children-benefits",
    titleEn: "Benefits of Raising a Bilingual Child",
    titleAr: "فوائد تربية طفل ثنائي اللغة",
    descEn: "Cognitive flexibility, family connection and future opportunity — with the common worries answered.",
    descAr: "المرونة الذهنية وصلة الأسرة وفرص المستقبل — مع جواب عن المخاوف الشائعة.",
    path: "learn",
  },
  {
    slug: "arabic-activities-at-home",
    titleEn: "10 Arabic Letter Activities for Home",
    titleAr: "١٠ أنشطة للحروف في البيت",
    descEn: "Ten hands-on activities written like recipes — materials, steps and an age range for each.",
    descAr: "عشرة أنشطة عملية مكتوبة كوصفات — الموادّ والخطوات والعمر المناسب لكلٍّ منها.",
    path: "learn",
  },
  {
    slug: "arabic-keyboard-layout-for-kids",
    titleEn: "Which Arabic Keyboard for a Child?",
    titleAr: "أيّ لوحة مفاتيح عربية للطفل؟",
    descEn: "Six keys on the standard Arabic layout produce no letter of the alphabet. What to use instead.",
    descAr: "ستّة مفاتيح في التخطيط القياسيّ لا تُخرج حرفاً من الأبجدية. وما البديل.",
    path: "learn",
  },

  {
    slug: "hardest-arabic-letters",
    titleEn: "The 10 Hardest Arabic Letters",
    titleAr: "أصعب عشرة حروف عربية",
    descEn: "The ten letters with no English equivalent — where each sound is made and what actually helps.",
    descAr: "الحروف العشرة التي لا نظير لها في الإنجليزية — مخرج كلّ صوت وما ينفع فعلاً.",
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
