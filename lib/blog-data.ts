export type BlogPost = {
  slug: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  datePublished: string;
  dateModified: string;
  readingTimeEn: string;
  readingTimeAr: string;
  icon: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-we-built-arabfingers",
    icon: "🛠️",
    titleEn: "How We Built ArabFingers: The Story Behind the App",
    titleAr: "كيف بنينا عرب فنجرز: القصة وراء التطبيق",
    descEn: "The personal story of why and how ArabFingers was created — from a parent's frustration to a free tool used by families worldwide.",
    descAr: "القصة الشخصية لسبب وكيفية إنشاء عرب فنجرز — من إحباط أحد الوالدين إلى أداة مجانية تستخدمها العائلات حول العالم.",
    datePublished: "2026-04-15",
    dateModified: "2026-05-20",
    readingTimeEn: "8 min read",
    readingTimeAr: "٨ دقائق قراءة",
  },
  {
    slug: "screen-time-guidelines-arabic-learning",
    icon: "📱",
    titleEn: "Screen Time & Arabic Learning: An Evidence-Based Guide for Parents",
    titleAr: "وقت الشاشة وتعلم العربية: دليل مبني على الأدلة للوالدين",
    descEn: "How to balance screen time with meaningful Arabic learning. Research-backed guidelines for toddlers and preschoolers.",
    descAr: "كيف توازن بين وقت الشاشة والتعلم الهادف للعربية. إرشادات مبنية على الأبحاث للأطفال الصغار.",
    datePublished: "2026-04-28",
    dateModified: "2026-05-18",
    readingTimeEn: "10 min read",
    readingTimeAr: "١٠ دقائق قراءة",
  },
  {
    slug: "arabic-alphabet-vs-latin-deep-dive",
    icon: "🔬",
    titleEn: "Arabic vs Latin Alphabet: A Linguistic Deep Dive",
    titleAr: "الأبجدية العربية مقابل اللاتينية: غوص لغوي عميق",
    descEn: "Explore the fundamental differences between Arabic and Latin writing systems — from letter connectivity to diacritics and morphology.",
    descAr: "استكشف الفروقات الأساسية بين نظامي الكتابة العربية واللاتينية — من اتصال الحروف إلى التشكيل والصرف.",
    datePublished: "2026-05-05",
    dateModified: "2026-05-22",
    readingTimeEn: "12 min read",
    readingTimeAr: "١٢ دقيقة قراءة",
  },
  {
    slug: "arabic-calligraphy-for-kids",
    icon: "🖊️",
    titleEn: "Arabic Calligraphy for Kids: A Beginner's Introduction",
    titleAr: "الخط العربي للأطفال: مقدمة للمبتدئين",
    descEn: "Introduce your child to the beautiful art of Arabic calligraphy. Learn about different styles and try fun activities at home.",
    descAr: "عرّف طفلك على فن الخط العربي الجميل. تعرّف على الأنماط المختلفة وجرّب أنشطة ممتعة في المنزل.",
    datePublished: "2026-05-12",
    dateModified: "2026-05-25",
    readingTimeEn: "9 min read",
    readingTimeAr: "٩ دقائق قراءة",
  },
  {
    slug: "ramadan-activities-arabic-learning",
    icon: "🌙",
    titleEn: "Ramadan & Arabic Learning: Activities That Connect Language to Culture",
    titleAr: "رمضان وتعلم العربية: أنشطة تربط اللغة بالثقافة",
    descEn: "Use the spirit of Ramadan to inspire Arabic learning. Practical activities that teach Arabic vocabulary through cultural traditions.",
    descAr: "استخدم روح رمضان لإلهام تعلم العربية. أنشطة عملية تعلم المفردات العربية من خلال التقاليد الثقافية.",
    datePublished: "2026-05-20",
    dateModified: "2026-05-25",
    readingTimeEn: "7 min read",
    readingTimeAr: "٧ دقائق قراءة",
  },
];
