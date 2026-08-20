import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import {
  AlphabetIcon,
  NumbersIcon,
  ColorsIcon,
  WordsIcon,
  ScienceIcon,
  ParentingIcon,
} from "@/components/illustrations/HubIcons";

type HubIcon = ({ className }: { className?: string }) => React.JSX.Element;

import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn", {
    titleEn: "Learn Arabic — Guides & Resources | Arab Fingers",
    titleAr: "تعلم العربية — الأدلة والمصادر | عرب فنجرز",
    descriptionEn:
      "Free Arabic learning resources for kids and parents. Alphabet guides, pronunciation tips, numbers, colors, first words, and teaching strategies for bilingual families.",
    descriptionAr:
      "مصادر مجانية لتعلم العربية للأطفال والوالدين. أدلة الأبجدية، نصائح النطق، الأرقام، الألوان، الكلمات الأولى، واستراتيجيات التعليم للعائلات ثنائية اللغة.",
  });
}

const articles: {
  slug: string;
  Icon: HubIcon;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}[] = [
  {
    slug: "arabic-alphabet-guide",
    Icon: AlphabetIcon,
    titleEn: "Arabic Alphabet Complete Guide",
    titleAr: "دليل الأبجدية العربية الكامل",
    descEn:
      "You'll learn all 28 Arabic letters with their sounds, English equivalents, and an example word for each. Start here if your child is brand new to Arabic — it is the foundation every other guide builds on.",
    descAr:
      "ستتعلم الحروف العربية الـ ٢٨ كاملة مع أصواتها وما يقابلها في الإنجليزية وكلمة مثال لكل حرف. ابدأ من هنا إن كان طفلك جديداً على العربية، فهذا الأساس الذي تُبنى عليه بقية الأدلة.",
  },
  {
    slug: "teaching-arabic-to-kids",
    Icon: ParentingIcon,
    titleEn: "Teaching Arabic to Kids: A Parent's Guide",
    titleAr: "تعليم العربية للأطفال: دليل الوالدين",
    descEn:
      "You'll find practical, age-appropriate strategies for introducing Arabic to toddlers and pre-schoolers without pressure. It is written for parents who don't speak fluent Arabic themselves and want a clear daily routine.",
    descAr:
      "ستجد استراتيجيات عملية مناسبة للعمر لتعريف الأطفال الصغار بالعربية دون ضغط. وهو مكتوب للوالدين الذين لا يتقنون العربية بطلاقة ويبحثون عن روتين يومي واضح.",
  },
  {
    slug: "arabic-numbers",
    Icon: NumbersIcon,
    titleEn: "Arabic Numbers 0–10 for Kids",
    titleAr: "الأرقام العربية ٠–١٠ للأطفال",
    descEn:
      "You'll learn to count from zero to ten using the Eastern Arabic-Indic numerals used across the Arab world, with pronunciation for each. Use it once your child knows a few letters and is ready for a fun, fast win.",
    descAr:
      "ستتعلم العدّ من صفر إلى عشرة بالأرقام العربية الشرقية المستخدمة في العالم العربي مع نطق كل رقم. استعمله بعد أن يتعرّف طفلك على بعض الحروف ويصبح جاهزاً لإنجاز ممتع وسريع.",
  },
  {
    slug: "arabic-colors",
    Icon: ColorsIcon,
    titleEn: "Arabic Colors for Kids",
    titleAr: "الألوان بالعربية للأطفال",
    descEn:
      "You'll learn the names of everyday colors in Arabic with pronunciation and a little cultural context for each. It is perfect for early talkers aged 1–4, since colors are easy to spot and name around the house.",
    descAr:
      "ستتعلم أسماء الألوان اليومية بالعربية مع النطق وبعض السياق الثقافي لكل لون. وهو مثالي للأطفال في بداية الكلام بين عام وأربعة أعوام، لأن الألوان سهلة الملاحظة والتسمية في أرجاء البيت.",
  },
  {
    slug: "first-arabic-words",
    Icon: WordsIcon,
    titleEn: "First Arabic Words for Kids",
    titleAr: "أول كلمات عربية للأطفال",
    descEn:
      "You'll get the essential first vocabulary toddlers need — family, animals, food, and everyday words they hear most. Use it alongside the alphabet guide so letters and real words grow together.",
    descAr:
      "ستحصل على المفردات الأولى الأساسية التي يحتاجها الطفل — العائلة والحيوانات والطعام والكلمات اليومية الأكثر تكراراً. استعمله إلى جانب دليل الأبجدية لتنمو الحروف والكلمات الحقيقية معاً.",
  },
  {
    slug: "arabic-letter-forms",
    Icon: AlphabetIcon,
    titleEn: "How Arabic Letters Change Shape",
    titleAr: "كيف تتغير أشكال الحروف العربية",
    descEn:
      "You'll see how each letter changes its shape at the beginning, middle, and end of a word, with clear visual examples. It is for children aged 5 and up who already know the basic letters and are ready to start reading whole words.",
    descAr:
      "سترى كيف يغيّر كل حرف شكله في بداية الكلمة ووسطها ونهايتها مع أمثلة بصرية واضحة. وهو موجّه للأطفال من عمر خمس سنوات فأكثر ممن يعرفون الحروف الأساسية واستعدوا لقراءة الكلمات الكاملة.",
  },
  {
    slug: "arabic-vs-english",
    Icon: AlphabetIcon,
    titleEn: "Arabic vs English Alphabet: Key Differences",
    titleAr: "الأبجدية العربية مقابل الإنجليزية: الفروقات الرئيسية",
    descEn:
      "You'll get a side-by-side comparison of the two writing systems — direction, letter shapes, and sounds that have no English match. It helps parents and educators of bilingual children anticipate where kids get confused.",
    descAr:
      "ستحصل على مقارنة جنباً إلى جنب بين نظامي الكتابة — الاتجاه وأشكال الحروف والأصوات التي لا مقابل لها في الإنجليزية. يساعد الوالدين والمعلمين للأطفال ثنائيي اللغة على توقّع المواضع التي يقع فيها اللبس.",
  },
  {
    slug: "best-age-to-learn-arabic",
    Icon: ParentingIcon,
    titleEn: "What's the Best Age to Start Teaching Arabic?",
    titleAr: "ما هو أفضل عمر لبدء تعليم العربية؟",
    descEn:
      "You'll get research-backed guidance on when and how to introduce Arabic, and why earlier exposure makes pronunciation easier. Read it before you build a plan, so your expectations match your child's stage.",
    descAr:
      "ستحصل على إرشادات مدعومة بالأبحاث حول متى وكيف تُقدّم العربية، ولماذا يجعل التعرّض المبكر النطق أسهل. اقرأه قبل وضع خطتك حتى تتوافق توقعاتك مع مرحلة طفلك العمرية.",
  },
  {
    slug: "bilingual-children-benefits",
    Icon: ParentingIcon,
    titleEn: "Benefits of Raising Bilingual Arabic-English Children",
    titleAr: "فوائد تربية أطفال ثنائيي اللغة عربي-إنجليزي",
    descEn:
      "You'll learn the cognitive, social, and cultural advantages of bilingualism, backed by child-development research. It is for parents weighing whether the daily effort of two languages is worth it — the evidence says yes.",
    descAr:
      "ستتعرّف على الفوائد المعرفية والاجتماعية والثقافية لثنائية اللغة، مدعومةً بأبحاث نمو الطفل. وهو للوالدين الذين يوازنون بين جهد لغتين يومياً ومردوده، والأدلة تؤكد أنه يستحق العناء.",
  },
  {
    slug: "arabic-activities-at-home",
    Icon: ParentingIcon,
    titleEn: "10 Fun Activities to Practice Arabic Letters at Home",
    titleAr: "١٠ أنشطة ممتعة لممارسة الحروف العربية في المنزل",
    descEn:
      "You'll get ten creative activities — both screen-free and digital — that reinforce letter learning through play. Use them on days you want to step away from the app and practice with your hands and voice.",
    descAr:
      "ستحصل على عشرة أنشطة إبداعية — بعيدة عن الشاشة وأخرى رقمية — تعزّز تعلّم الحروف عبر اللعب. استعملها في الأيام التي تريد فيها الابتعاد عن التطبيق والتدرّب بيديك وصوتك.",
  },
];

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">
        {isAr ? "تعلم العربية — أدلة وموارد" : "Learn Arabic — Guides & Resources"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr
          ? "موارد مجانية لتعلم العربية للأطفال والوالدين. أدلة الأبجدية، نصائح النطق، الأرقام، الألوان، والكلمات الأولى."
          : "Free Arabic learning resources for kids and parents. Alphabet guides, pronunciation tips, numbers, colors, first words, and teaching strategies."}
      </p>

      <div className="space-y-6 text-base leading-relaxed text-ink/80 mb-10">
        <p>
          {isAr
            ? "تعلم اللغة العربية يبدأ بالأساسيات — الحروف والأصوات والكلمات البسيطة. سواء كنت والداً يريد تعريف طفله بالعربية أو معلماً يبحث عن موارد، فإن هذه الأدلة المجانية تغطي كل ما تحتاج لمعرفته. كل دليل متاح باللغتين العربية والإنجليزية ومصمم ليكون عملياً ومناسباً للعمر."
            : "Learning Arabic starts with the fundamentals — letters, sounds, and simple words. Whether you're a parent wanting to introduce your child to Arabic or an educator looking for resources, these free guides cover everything you need to know. Each guide is available in both Arabic and English and designed to be practical and age-appropriate."}
        </p>
        <p>
          {isAr
            ? "نوصي بالبدء بدليل الأبجدية العربية لتعلم الحروف الأساسية، ثم استخدام تطبيق عرب فنجرز للتدريب التفاعلي. الجمع بين القراءة واللعب هو أفضل طريقة للأطفال الصغار لتعلم العربية."
            : "We recommend starting with the Arabic Alphabet Guide to learn the basic letters, then using the ArabFingers app for interactive practice. Combining reading with play is the best way for young children to learn Arabic."}
        </p>
      </div>

      {/* Start-here learning path, organized by child age */}
      <section className="card-stock card-stock-saffron mb-12 p-6 sm:p-7">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">
          {isAr ? "ابدأ من هنا: مسار التعلم حسب العمر" : "Start Here: A Learning Path by Age"}
        </h2>
        <p className="text-base text-ink/80 mb-6 leading-relaxed">
          {isAr
            ? "ليس كل دليل مناسباً لكل طفل في الوقت نفسه. اختر نقطة البداية حسب عمر طفلك، ثم تدرّج صعوداً مع نموّه."
            : "Not every guide suits every child at once. Pick a starting point that matches your child's age, then move up the path as they grow."}
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-ink mb-1.5">
              {isAr ? "من عام إلى ٣ أعوام: أصوات الحروف عبر اللعب" : "Ages 1–3: Letter Sounds Through Play"}
            </h3>
            <p className="text-base text-ink/80 leading-relaxed">
              {isAr
                ? "في هذه المرحلة المبكرة يتعلّم الطفل بالأذن لا بالقلم. افتح شبكة الصوت في دليل الأبجدية العربية واستمعا معاً إلى أصوات الحروف، ثم انتقلا إلى دليل الألوان لتسمية ما يحيط بكما في البيت. اجعل الجلسة قصيرة — دقائق معدودة لا ساعات — وكرّرها مراراً في اليوم. وتُكمّل هذه القراءة جلسةٌ خفيفة في تطبيق عرب فنجرز، حيث يلمس الطفل الحرف فيسمع صوته، فيربط الأذن بالإصبع وهو يلعب."
                : "At this early stage children learn by ear, not by pen. Open the audio grid in the Arabic Alphabet Guide and listen to the letter sounds together, then move to the Colors guide to name what you see around the house. Keep each session short — a few minutes, not hours — and repeat it often through the day. Pair this reading with a light session in the ArabFingers play app, where tapping a letter plays its sound so ear and finger connect through play."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink mb-1.5">
              {isAr ? "من ٣ إلى ٥ أعوام: الأبجدية والأرقام والكلمات الأولى" : "Ages 3–5: Alphabet, Numbers, and First Words"}
            </h3>
            <p className="text-base text-ink/80 leading-relaxed">
              {isAr
                ? "حين يطول تركيز الطفل، اعمل بدليل الأبجدية العربية بانتظام حرفاً بعد حرف، ثم أضِف دليل الأرقام العربية ودليل أول كلمات عربية لتربط الحروف بكلمات حقيقية. هذه هي السن التي تبدأ فيها بإدخال أوراق التدريب المطبوعة لتدريب خارج الشاشة: يتتبّع الطفل الحرف بقلمه فترسخ صورته في يده. والأفضل أن تتناوبا بين التطبيق التفاعلي للّعب والورقة المطبوعة للكتابة، فيجمع الطفل بين متعة الشاشة وثبات الخط."
                : "When attention spans lengthen, work through the Arabic Alphabet Guide systematically, one letter at a time, then add the Arabic Numbers guide and First Arabic Words to tie letters to real vocabulary. This is the age to introduce printables for off-screen practice: tracing a letter with a pencil fixes its shape in the hand. Alternate between the interactive play app and the printed sheet, so your child gets both the fun of the screen and the muscle memory of writing."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-ink mb-1.5">
              {isAr ? "٥ أعوام فأكثر: أشكال الحروف والمقارنة والعلوم" : "Ages 5+: Letter Forms, Comparison, and Science"}
            </h3>
            <p className="text-base text-ink/80 leading-relaxed">
              {isAr
                ? "بعد إتقان الحروف منفردةً، انتقل إلى دليل كيف تتغير أشكال الحروف العربية ليفهم الطفل كيف تتّصل الحروف في كلمة واحدة، ثم استعن بدليل المقارنة بين العربية والإنجليزية إن كان طفلك ثنائيّ اللغة. في هذه السن تُصبح الدروس العلمية التفاعلية الأربعة — حالات المادة ودورة المياه والنظام الشمسي والجاذبية — وسيلةً رائعة لقراءة العربية في سياق ممتع. واجعل أوراق التدريب المطبوعة رفيقاً لهذه الدروس: يكتب الطفل ما تعلّمه بيده بعد أن لعب به على الشاشة."
                : "Once individual letters are mastered, move to How Arabic Letters Change Shape so your child understands how letters connect into a single word, then use the Arabic vs English comparison if your child is bilingual. At this age the four interactive science lessons — states of matter, the water cycle, the solar system, and gravity — become a wonderful way to read Arabic in a fun context. Keep printables as their companion: your child writes down what they learned after playing with it on screen."}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Cartoon Lessons Dashboard */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-ink mb-2 flex items-center gap-2">
          {isAr ? "🔬 العلوم بالعربية" : "🔬 Science in Arabic"}
          <span className="text-xs bg-accent/20 text-accent font-semibold px-2.5 py-0.5 rounded-full animate-pulse border border-accent/20">
            {isAr ? "جديد" : "NEW"}
          </span>
        </h2>
        <p className="text-base text-ink/80 mb-6">
          {isAr
            ? "بعد أن يعرف الطفل الحروف، تأتي الخطوة التالية: أن يسمع العربية في جُمَل حقيقية لا في حروف مفردة. هذه أربعة دروس علمية، كلّ مشهد فيها مرويّ بالعربية والإنجليزية معاً، فيلتقط الطفل مفردات العلوم — الماء والبخار والجاذبية والكواكب — في سياق يفهمه ويريد متابعته."
            : "Once a child knows the letters, the next step is hearing Arabic in real sentences rather than single sounds. These four science lessons are narrated scene by scene in both Arabic and English, so a child picks up science vocabulary — water, vapour, gravity, planets — in a context they follow because they want to know what happens next."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Flagship Lesson Card */}
          <Link
            href={`/${locale}/learn/states-of-matter`}
            className="md:col-span-2 group relative overflow-hidden card-stock card-stock-qalam p-6 transition-all hover:scale-[1.01]"
          >
            <div className="absolute top-0 right-0 bg-accent text-ink text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              {isAr ? "نشط الآن ✨" : "Active Now ✨"}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start h-full">
              <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <ScienceIcon className="w-9 h-9" />
              </div>
              <div className="flex-grow flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-qalam transition-colors flex items-center gap-2">
                    {isAr ? "حالات المادة (حكاية علمية)" : "States of Matter (Science Story)"}
                  </h3>
                  <p className="text-sm text-ink/80 leading-relaxed mb-4">
                    {isAr
                      ? "انضم إلى أنس والدكتور حكيم في مختبرهم السحري! استكشف الحالات الأربع للمادة (الصلبة، السائلة، الغازية، والبلازما) وتحكم في حرارة الجزيئات بنفسك لتراها تتجمد، تنصهر، وتتبخر!"
                      : "Join Anas and Dr. Hakim in their magical lab! Explore the four states of matter (Solid, Liquid, Gas, and Plasma) and adjust the temperature slider yourself to watch molecules freeze, melt, or vaporize!"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold group-hover:underline">
                  {isAr ? "ابدأ المغامرة التفاعلية الآن 🚀" : "Start the Interactive Adventure Now 🚀"}
                </div>
              </div>
            </div>
          </Link>

          {/* Active Cards Column */}
          <div className="flex flex-col gap-4">
            <Link
              href={`/${locale}/learn/water-cycle`}
              className="group card-stock card-stock-qalam p-4 flex gap-3 items-center hover:scale-[1.02] transition duration-200 cursor-pointer"
            >
              <div className="shrink-0 text-2xl bg-accent/10 p-2 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform">💧</div>
              <div>
                <h4 className="text-sm font-bold text-ink group-hover:text-qalam transition-colors">
                  {isAr ? "دورة المياه في الطبيعة 🌧️" : "The Water Cycle 🌧️"}
                </h4>
                <p className="text-xs text-accent mt-0.5 font-semibold">
                  {isAr ? "نشط الآن - العب بالطقس! 🚀" : "Active Now - Play with weather! 🚀"}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/learn/solar-system`}
              className="group card-stock card-stock-violet p-4 flex gap-3 items-center hover:scale-[1.02] transition duration-200 cursor-pointer"
            >
              <div className="shrink-0 text-2xl bg-accent/10 p-2 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform">🚀</div>
              <div>
                <h4 className="text-sm font-bold text-ink group-hover:text-qalam transition-colors">
                  {isAr ? "نظامنا الشمسي الرائع 🪐" : "Our Spectacular Solar System 🪐"}
                </h4>
                <p className="text-xs text-accent mt-0.5 font-semibold">
                  {isAr ? "نشط الآن - حلق حول الكواكب! ✨" : "Active Now - Orbit the planets! ✨"}
                </p>
              </div>
            </Link>

            <Link
              href={`/${locale}/learn/gravity`}
              className="group card-stock card-stock-rose p-4 flex gap-3 items-center hover:scale-[1.02] transition duration-200 cursor-pointer"
            >
              <div className="shrink-0 text-2xl bg-accent/10 p-2 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform">🍎</div>
              <div>
                <h4 className="text-sm font-bold text-ink group-hover:text-qalam transition-colors">
                  {isAr ? "كيف تعمل الجاذبية؟ 🧲" : "How Gravity Works 🧲"}
                </h4>
                <p className="text-xs text-accent mt-0.5 font-semibold">
                  {isAr ? "نشط الآن - اضبط جاذبية الكون! 🌟" : "Active Now - Adjust cosmic pull! 🌟"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Articles Section */}
      <h2 className="text-xl font-bold text-ink mb-4">
        {isAr ? "📚 أدلة ومقالات تعليمية" : "📚 Educational Guides & Articles"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale}/learn/${article.slug}`}
            className="group rounded-xl border border-ink/10 bg-card p-5 transition hover:bg-card hover:border-ink/15"
          >
            <article.Icon className="w-10 h-10 mb-3" />
            <h3 className="text-base font-semibold text-ink mb-1.5 group-hover:text-accent transition-colors">
              {isAr ? article.titleAr : article.titleEn}
            </h3>
            <p className="text-sm text-ink/75 leading-relaxed">
              {isAr ? article.descAr : article.descEn}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105"
        >
          🚀 {isAr ? "جرب عرب فنجرز الآن" : "Try ArabFingers Now"}
        </Link>
      </div>
    </PageLayout>
  );
}
