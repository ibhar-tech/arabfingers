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
    descEn: "The personal story of why and how ArabFingers was built — from one parent's frustration finding Arabic tools for toddlers to a free, ad-light bilingual app. Written for parents and educators curious about the thinking behind a child-safe learning app.",
    descAr: "القصة الشخصية لسبب وكيفية بناء عرب فنجرز — من إحباط أحد الوالدين في البحث عن أدوات عربية للصغار إلى تطبيق مجاني ثنائي اللغة. مكتوبة للوالدين والمعلمين المهتمين بالفكر وراء تطبيق تعلّم آمن للأطفال.",
    datePublished: "2026-04-15",
    dateModified: "2026-06-12",
    readingTimeEn: "8 min read",
    readingTimeAr: "٨ دقائق قراءة",
  },
  {
    slug: "screen-time-guidelines-arabic-learning",
    icon: "📱",
    titleEn: "Screen Time & Arabic Learning: An Evidence-Based Guide for Parents",
    titleAr: "وقت الشاشة وتعلم العربية: دليل مبني على الأدلة للوالدين",
    descEn: "How to balance screen time with meaningful Arabic learning, with research-backed AAP and WHO guidelines by age and the difference between active and passive screen use. For parents of toddlers and preschoolers who want digital tools to help rather than harm.",
    descAr: "كيف توازن بين وقت الشاشة والتعلم الهادف للعربية، مع إرشادات مبنية على أبحاث طب الأطفال حسب العمر والفرق بين الاستخدام النشط والسلبي للشاشة. موجّهة لآباء الأطفال الصغار وما قبل المدرسة الذين يريدون أدوات رقمية تنفع لا تضر.",
    datePublished: "2026-04-28",
    dateModified: "2026-06-12",
    readingTimeEn: "10 min read",
    readingTimeAr: "١٠ دقائق قراءة",
  },
  {
    slug: "arabic-alphabet-vs-latin-deep-dive",
    icon: "🔬",
    titleEn: "Arabic vs Latin Alphabet: A Linguistic Deep Dive",
    titleAr: "الأبجدية العربية مقابل اللاتينية: غوص لغوي عميق",
    descEn: "A deep dive into how Arabic and Latin writing systems really differ — letter connectivity, the four positional forms, diacritics, and sounds that exist in only one language. For parents and curious learners raising bilingual children across two very different scripts.",
    descAr: "غوص عميق في الفروقات الحقيقية بين نظامي الكتابة العربي واللاتيني — اتصال الحروف، والأشكال الأربعة، والتشكيل، والأصوات الموجودة في لغة دون الأخرى. للوالدين والمتعلمين الفضوليين الذين يربّون أطفالاً ثنائيي اللغة بين خطّين مختلفين جداً.",
    datePublished: "2026-05-05",
    dateModified: "2026-06-12",
    readingTimeEn: "12 min read",
    readingTimeAr: "١٢ دقيقة قراءة",
  },
  {
    slug: "arabic-calligraphy-for-kids",
    icon: "🖊️",
    titleEn: "Arabic Calligraphy for Kids: A Beginner's Introduction",
    titleAr: "الخط العربي للأطفال: مقدمة للمبتدئين",
    descEn: "An introduction to Arabic calligraphy as art, covering the Naskh, Thuluth, Diwani, and Kufi styles plus why it builds fine motor skills and cultural pride. For parents who want simple, mess-friendly activities to try with young children at home.",
    descAr: "مقدمة في الخط العربي كفن، تتناول خطوط النسخ والثلث والديواني والكوفي، ولماذا ينمّي المهارات الحركية والاعتزاز بالهوية. للوالدين الذين يريدون أنشطة بسيطة وممتعة يجرّبونها مع أطفالهم الصغار في المنزل.",
    datePublished: "2026-05-12",
    dateModified: "2026-06-12",
    readingTimeEn: "9 min read",
    readingTimeAr: "٩ دقائق قراءة",
  },
  {
    slug: "ramadan-activities-arabic-learning",
    icon: "🌙",
    titleEn: "Ramadan & Arabic Learning: Activities That Connect Language to Culture",
    titleAr: "رمضان وتعلم العربية: أنشطة تربط اللغة بالثقافة",
    descEn: "Use the spirit of Ramadan to inspire Arabic learning, with essential vocabulary and age-by-age activities that tie words to real experiences like iftar, the crescent moon, and Eid. For families who want low-pressure, screen-light ways to grow Arabic during the holy month.",
    descAr: "استخدم روح رمضان لإلهام تعلم العربية، مع المفردات الأساسية وأنشطة مرتبة حسب العمر تربط الكلمات بتجارب حقيقية كالإفطار والهلال والعيد. للعائلات التي تريد طرقاً بسيطة وقليلة الشاشة لتنمية العربية خلال الشهر الكريم.",
    datePublished: "2026-05-20",
    dateModified: "2026-06-12",
    readingTimeEn: "7 min read",
    readingTimeAr: "٧ دقائق قراءة",
  },
];
