import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-activities-at-home", {
    titleEn: "10 Arabic Letter Activities for Home — Materials, Steps & Age Ranges",
    titleAr: "١٠ أنشطة لتعلّم الحروف العربية في البيت — المواد والخطوات والأعمار",
    descriptionEn:
      "Ten hands-on Arabic letter activities for kids, written like mini-recipes with materials, steps, and an age range each — grouped into craft, movement, and quiet-time ideas, with printable-pairing tips.",
    descriptionAr:
      "عشرة أنشطة عملية لتعلّم الحروف العربية للأطفال، مكتوبة كوصفاتٍ صغيرة بموادّها وخطواتها وعمرها المناسب — مرتّبة في أنشطة فنّية وحركية وهادئة، مع نصائح لربطها بأوراق العمل القابلة للطباعة.",
    ogType: "article",
    publishedTime: "2026-05-07",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic activities for kids", "أنشطة عربية للأطفال",
      "arabic letters at home", "الحروف العربية في البيت",
      "arabic crafts", "أنشطة فنية بالعربية",
    ],
  });
}

type Activity = {
  n: number;
  titleEn: string; titleAr: string;
  ageEn: string; ageAr: string;
  materialsEn: string; materialsAr: string;
  steps: { en: string; ar: string }[];
};

const craft: Activity[] = [
  {
    n: 1, titleEn: "Salt Tray Letter Tracing", titleAr: "تتبّع الحروف في صينية الملح",
    ageEn: "Ages 2–5", ageAr: "٢–٥ سنوات",
    materialsEn: "A flat tray or baking sheet, plus a thin layer of salt, sand, or sugar.",
    materialsAr: "صينية مسطّحة أو صفيحة خبز، وطبقة رقيقة من الملح أو الرمل أو السكّر.",
    steps: [
      { en: "Spread a thin, even layer across the tray.", ar: "افرش طبقةً رقيقةً متساويةً على الصينية." },
      { en: "Show one Arabic letter and trace it once yourself.", ar: "أرِ الطفل حرفاً واحداً وتتبّعه مرّةً بنفسك." },
      { en: "Let your child draw it with a fingertip, then shake to erase and repeat.", ar: "دَع طفلك يرسمه بطرف إصبعه، ثمّ هزّ الصينية للمسح وأعِد." },
    ],
  },
  {
    n: 2, titleEn: "Playdough Letters", titleAr: "حروف من المعجون",
    ageEn: "Ages 3–6", ageAr: "٣–٦ سنوات",
    materialsEn: "Soft playdough in a few colours.",
    materialsAr: "معجون لعبٍ ليّن بألوانٍ عدّة.",
    steps: [
      { en: "Roll the dough into thin snakes together.", ar: "لُفّوا المعجون أشكالاً رفيعةً معاً." },
      { en: "Bend them into an Arabic letter shape.", ar: "اثنوها على هيئة حرفٍ عربيّ." },
      { en: "Use a colour code: one colour for dots-below letters, another for dots-above.", ar: "اجعلوا لوناً للحروف المنقوطة من تحت وآخر للمنقوطة من فوق." },
    ],
  },
  {
    n: 3, titleEn: "Letter Stamps", titleAr: "أختام الحروف",
    ageEn: "Ages 2–5", ageAr: "٢–٥ سنوات",
    materialsEn: "Sponges or foam sheets, scissors (adult), and washable paint.",
    materialsAr: "إسفنج أو رقائق فلّين، ومقصّ (للكبير)، وطلاءٌ قابل للغسل.",
    steps: [
      { en: "Cut a few letter shapes from the sponge yourself.", ar: "قصّ بضعة أشكال حروفٍ من الإسفنج بنفسك." },
      { en: "Dip in paint and stamp onto paper.", ar: "اغمسوها في الطلاء واطبعوها على الورق." },
      { en: "Name each letter as it's stamped, then display the art.", ar: "سمّوا كلّ حرفٍ عند طبعه، ثمّ اعرضوا اللوحة." },
    ],
  },
  {
    n: 4, titleEn: "Watercolour Magic Letters", titleAr: "حروفٌ سحرية بالألوان المائية",
    ageEn: "Ages 3–6", ageAr: "٣–٦ سنوات",
    materialsEn: "White wax crayon, paper, watercolours, and a brush.",
    materialsAr: "شمعٌ أبيض، وورق، وألوانٌ مائية، وفرشاة.",
    steps: [
      { en: "Write large letters in white crayon (they'll be invisible).", ar: "اكتب حروفاً كبيرةً بالشمع الأبيض (تكون غير مرئية)." },
      { en: "Let your child paint over the whole sheet.", ar: "دَع طفلك يدهن الورقة كلّها بالألوان." },
      { en: "Watch the letters appear like magic and name them.", ar: "شاهدوا الحروف تظهر كالسحر وسمّوها." },
    ],
  },
];

const movement: Activity[] = [
  {
    n: 5, titleEn: "Real-World Letter Hunt", titleAr: "رحلة بحثٍ عن الحروف",
    ageEn: "Ages 2–6", ageAr: "٢–٦ سنوات",
    materialsEn: "Just your home or street — and ArabFingers to warm up.",
    materialsAr: "بيتك أو شارعك فحسب، وعرب فنجرز للتهيئة.",
    steps: [
      { en: "Play ArabFingers for a few minutes to pick a target letter.", ar: "العبوا عرب فنجرز دقائق لاختيار حرفٍ تبحثون عنه." },
      { en: "Hunt for it on packaging, signs, and book covers.", ar: "ابحثوا عنه على العبوات واللافتات وأغلفة الكتب." },
      { en: "Cheer each find: \"We found a ب, just like in the game!\"", ar: "هلّلوا لكلّ اكتشاف: \"وجدنا باءً كما في اللعبة!\"" },
    ],
  },
  {
    n: 6, titleEn: "Letter Songs &amp; Chants", titleAr: "أناشيد الحروف",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    materialsEn: "Your voice — optionally a recorded alphabet song.",
    materialsAr: "صوتك، ويمكن نشيد أبجدية مسجّل.",
    steps: [
      { en: "Sing أ ب ت ث together as a daily ritual (bath time works well).", ar: "غنّوا أ ب ت ث معاً طقساً يومياً (وقت الحمّام مناسب)." },
      { en: "Pair each letter with a word: أ for أسد, ب for بطّة.", ar: "اقرنوا كلّ حرفٍ بكلمة: أ لأسد، ب لبطّة." },
      { en: "Clap the rhythm so the order sticks.", ar: "صفّقوا على الإيقاع حتى يثبت الترتيب." },
    ],
  },
  {
    n: 7, titleEn: "Magnetic Letter Matching", titleAr: "مطابقة الحروف المغناطيسية",
    ageEn: "Ages 3–6", ageAr: "٣–٦ سنوات",
    materialsEn: "A set of magnetic Arabic letters and the fridge.",
    materialsAr: "مجموعة حروفٍ عربية مغناطيسية والثلاجة.",
    steps: [
      { en: "Stick the letters on the fridge at child height.", ar: "ألصقوا الحروف على الثلاجة في مستوى الطفل." },
      { en: "Hold up a card and ask your child to find the match.", ar: "ارفع بطاقةً واطلب من طفلك أن يجد نظيرتها." },
      { en: "For older kids, spell ماما or بابا together.", ar: "وللأكبر، اهجوا ماما أو بابا معاً." },
    ],
  },
];

const quiet: Activity[] = [
  {
    n: 8, titleEn: "Letter-of-the-Week", titleAr: "حرف الأسبوع",
    ageEn: "Ages 3–6", ageAr: "٣–٦ سنوات",
    materialsEn: "A card for the fridge and your everyday surroundings.",
    materialsAr: "بطاقة للثلاجة وما حولكم من أشياء.",
    steps: [
      { en: "Pick one letter and make it the week's \"star\".", ar: "اختاروا حرفاً واجعلوه \"نجم\" الأسبوع." },
      { en: "Find it in books, practise writing it, hunt objects with its sound.", ar: "جدوه في الكتب، وتدرّبوا على كتابته، وابحثوا عن أشياء تبدأ بصوته." },
      { en: "One letter a week covers all 28 in about seven months.", ar: "بحرفٍ في الأسبوع تُغطّى الـ٢٨ في نحو سبعة أشهر." },
    ],
  },
  {
    n: 9, titleEn: "Arabic Story Time", titleAr: "وقت القصّة العربية",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    materialsEn: "Arabic or bilingual picture books.",
    materialsAr: "كتب أطفالٍ عربية أو ثنائية اللغة.",
    steps: [
      { en: "Read aloud, pointing to letters and words as you go.", ar: "اقرأ بصوتٍ عالٍ مشيراً إلى الحروف والكلمات." },
      { en: "Ask: \"Can you find the ب on this page?\"", ar: "اسأل: \"أتجد الباء في هذه الصفحة؟\"" },
      { en: "Bilingual books let your child compare both scripts.", ar: "والكتب الثنائية تتيح للطفل أن يقارن الخطّين." },
    ],
  },
  {
    n: 10, titleEn: "ArabFingers Family Challenge", titleAr: "تحدّي عرب فنجرز العائليّ",
    ageEn: "All ages", ageAr: "جميع الأعمار",
    materialsEn: "ArabFingers and the whole family.",
    materialsAr: "عرب فنجرز والأسرة كلّها.",
    steps: [
      { en: "Take turns pressing keys and naming the letters that appear.", ar: "تناوبوا الضغط على المفاتيح وتسمية ما يظهر." },
      { en: "Let older siblings help the younger ones.", ar: "دَعوا الكبار يعينون الصغار." },
      { en: "Model enthusiasm: \"I love that one — that's شين, Sheen!\"", ar: "أظهِر حماسك: \"أحبّ هذا — إنّها شين!\"" },
    ],
  },
];

const groups = [
  { id: "craft", titleEn: "Craft &amp; Hands-On", titleAr: "أنشطة فنّية وعملية", items: craft },
  { id: "movement", titleEn: "Movement &amp; Out-Loud", titleAr: "أنشطة حركية وصوتية", items: movement },
  { id: "quiet", titleEn: "Quiet Time &amp; Together", titleAr: "أنشطة هادئة ومشتركة", items: quiet },
];

export default async function ArabicActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="10 Fun Activities to Practice Arabic Letters at Home"
        description="Ten creative, hands-on activities — with materials, steps, and age ranges — to help your child practice Arabic letters at home."
        slug="learn/arabic-activities-at-home"
        datePublished="2026-05-07"
        dateModified="2026-06-12"
        section="Activities"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "أنشطة منزلية" : "Home Activities" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-white mb-2">
        {isAr ? "١٠ أنشطة لتعلّم الحروف العربية في البيت" : "10 Fun Activities to Practice Arabic Letters at Home"}
      </h1>
      <p className="text-sm text-white/55 mb-8">
        {isAr ? "وصفاتٌ صغيرة بموادّها وخطواتها وعمرها المناسب" : "Mini-recipes with materials, steps, and age ranges"}
      </p>

      <div className="space-y-3 text-sm leading-relaxed text-white/80 mb-10">
        <p>
          {isAr
            ? "تعلّم الحروف العربية لا ينبغي أن يقتصر على الكتب والبطاقات. وأنفع تعلّمٍ للصغار ما كان عملياً متعدّد الحواس يشبه اللعب. وقد رتّبنا هذه الأنشطة العشرة في ثلاث مجموعات — فنّية، وحركية، وهادئة — وكتبنا كلّ نشاطٍ كوصفةٍ صغيرة فيها موادّه وخطواته وعمره المناسب، لتختاروا ما يلائم لحظتكم."
            : "Learning Arabic letters shouldn't be limited to workbooks and flashcards. The most effective learning for young children is hands-on and multi-sensory — it feels like play. We've sorted these ten activities into three groups — craft, movement, and quiet-time — and written each as a mini-recipe with its materials, steps, and an age range, so you can grab whatever fits the moment."}
        </p>
      </div>

      {groups.map((grp) => (
        <section key={grp.id} className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">{isAr ? grp.titleAr : grp.titleEn.replace("&amp;", "&")}</h2>
          <div className="space-y-5">
            {grp.items.map((a) => (
              <div key={a.n} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-white">{a.n}. {isAr ? a.titleAr : a.titleEn.replace("&amp;", "&")}</h3>
                  <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{isAr ? a.ageAr : a.ageEn}</span>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  <strong className="text-white/90">{isAr ? "ما تحتاجه: " : "You'll need: "}</strong>
                  {isAr ? a.materialsAr : a.materialsEn}
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-sm text-white/80 leading-relaxed">
                  {a.steps.map((s, i) => <li key={i}>{isAr ? s.ar : s.en}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">{isAr ? "نصائح لربطها بأوراق العمل القابلة للطباعة" : "Pairing with Printable Worksheets"}</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-white/80 leading-relaxed">
          <li>{isAr ? "اطبع ورقة الحرف نفسه الذي شكّلتموه بالمعجون أو طبعتموه بالأختام، ليتّصل العمل اليدويّ بالكتابة." : "Print the worksheet for the same letter you shaped in playdough or stamped, so the hands-on work connects to writing."}</li>
          <li>{isAr ? "اجعل ورقة \"حرف الأسبوع\" على الثلاجة بجانب الحرف المغناطيسيّ." : "Put the \"letter-of-the-week\" sheet on the fridge beside its magnetic letter."}</li>
          <li>{isAr ? "بعد رحلة البحث عن الحروف، لوّنوا الورقة المطبوعة لذلك الحرف مكافأةً." : "After a letter hunt, colour the printed sheet for that letter as a reward."}</li>
          <li>{isAr ? "احتفظوا بالأوراق في ملفّ ليرى الطفل تقدّمه يتراكم أسبوعاً بعد أسبوع." : "Keep the sheets in a folder so your child sees progress pile up week by week."}</li>
        </ul>
        <div className="mt-4">
          <Link href={`/${locale}/printables`} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-950 hover:scale-105 transition">
            {isAr ? "📄 أوراق العمل المجانية" : "📄 Free Printable Worksheets"}
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3">{isAr ? "نصائح للنجاح" : "Tips for Success"}</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-white/80 leading-relaxed">
          <li><strong className="text-white/90">{isAr ? "اجعلها قصيرة" : "Keep it short"}</strong> — {isAr ? "خمس إلى عشر دقائق للنشاط تكفي الصغار. توقّفوا قبل أن يملّوا." : "5–10 minutes per activity is plenty for toddlers. Stop before they lose interest."}</li>
          <li><strong className="text-white/90">{isAr ? "اتبعوا ميلهم" : "Follow their lead"}</strong> — {isAr ? "إن أحبّ طفلك نشاطاً، أكثِروا منه؛ فالمتعة تقود التعلّم." : "If your child loves one activity, do more of it. Enjoyment drives learning."}</li>
          <li><strong className="text-white/90">{isAr ? "امزجوا الرقميّ والماديّ" : "Mix digital and physical"}</strong> — {isAr ? "اجمعوا بين عرب فنجرز والأنشطة العملية لأفضل النتائج." : "Combine ArabFingers with hands-on activities for the best results."}</li>
          <li><strong className="text-white/90">{isAr ? "داوِموا" : "Be consistent"}</strong> — {isAr ? "بضع دقائق كلّ يومٍ خيرٌ من جلسةٍ طويلةٍ مرّةً في الأسبوع." : "A few minutes every day beats a long session once a week."}</li>
          <li><strong className="text-white/90">{isAr ? "احتفلوا بكلّ شيء" : "Celebrate everything"}</strong> — {isAr ? "كلّ حرفٍ يُعرف تقدّمٌ يستحقّ الاحتفال." : "Every letter recognised is progress worth celebrating."}</li>
        </ul>
      </section>

      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "جرب عرب فنجرز" : "Try ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
