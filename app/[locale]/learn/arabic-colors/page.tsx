import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { SpeakButton } from "@/components/SpeakButton";
import { FaqSection } from "@/components/FaqSection";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-colors", {
    titleEn: "Arabic Colors for Kids: 12 Colors with Pronunciation, Nature Examples & Games",
    titleAr: "الألوان بالعربية للأطفال: ١٢ لوناً مع النطق وأمثلة من الطبيعة وألعاب",
    descriptionEn:
      "Learn 12 colors in Arabic with a quick reference table, pronunciation, colors in nature, the masculine/feminine forms explained simply, and a color-hunt game.",
    descriptionAr:
      "تعلّم ١٢ لوناً بالعربية مع جدول مرجعي سريع، والنطق، وأمثلة من الطبيعة، وشرح بسيط للمذكّر والمؤنّث، ولعبة البحث عن الألوان.",
    ogType: "article",
    publishedTime: "2026-03-19",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic colors for kids", "الألوان بالعربية للأطفال",
      "colors in arabic", "أسماء الألوان بالعربية",
      "arabic vocabulary for children", "مفردات عربية للأطفال",
    ],
  });
}

const colors = [
  { ar: "أحمر", en: "Red", pron: "Ahmar", hex: "#EF4444", descEn: "The color of strawberries, fire trucks, and hearts — one of the first colors children recognize.", descAr: "لون الفراولة وسيارة الإطفاء والقلب، وهو من أوّل الألوان التي يميّزها الأطفال." },
  { ar: "أزرق", en: "Blue", pron: "Azraq", hex: "#3B82F6", descEn: "The color of the sky and the sea. Arabic even has words for light blue (سماوي) and navy (كحلي).", descAr: "لون السماء والبحر. وللعربية كلمات للأزرق الفاتح (سماوي) والأزرق الغامق (كحلي)." },
  { ar: "أخضر", en: "Green", pron: "Akhdar", hex: "#22C55E", descEn: "The color of trees and grass, and a color with special meaning in Arab and Islamic culture.", descAr: "لون الأشجار والعشب، وله مكانة خاصة في الثقافة العربية والإسلامية." },
  { ar: "أصفر", en: "Yellow", pron: "Asfar", hex: "#EAB308", descEn: "The color of the sun, bananas, and desert sand — a bright, cheerful color children love.", descAr: "لون الشمس والموز ورمل الصحراء، لون مرح يحبّه الأطفال." },
  { ar: "برتقالي", en: "Orange", pron: "Burtuqaali", hex: "#F97316", descEn: "Named after the fruit! The Arabic for the fruit is برتقال, and the color borrows the same name.", descAr: "مأخوذ من اسم الفاكهة! فالبرتقال فاكهة، ولون البرتقالي يأخذ اسمه منها." },
  { ar: "بنفسجي", en: "Purple", pron: "Banafsaji", hex: "#A855F7", descEn: "Named after the violet flower (بنفسج) — a color long linked with royalty and luxury.", descAr: "مأخوذ من زهرة البنفسج، وهو لون ارتبط قديماً بالملوك والفخامة." },
  { ar: "وردي", en: "Pink", pron: "Wardi", hex: "#EC4899", descEn: "From ورد (ward) meaning \"rose\" — so wardi literally means \"rose-colored\".", descAr: "من كلمة وَرد، فكلمة \"وردي\" تعني حرفياً \"بلون الوردة\"." },
  { ar: "أبيض", en: "White", pron: "Abyad", hex: "#F8FAFC", descEn: "The color of clouds, snow, and milk, and a symbol of purity and peace in Arab culture.", descAr: "لون الغيوم والثلج والحليب، ورمز للنقاء والسلام في الثقافة العربية." },
  { ar: "أسود", en: "Black", pron: "Aswad", hex: "#1E293B", descEn: "The color of the night sky and the pupil of the eye.", descAr: "لون سماء الليل وبؤبؤ العين." },
  { ar: "بني", en: "Brown", pron: "Bunni", hex: "#92400E", descEn: "The color of chocolate, coffee, and soil — from بن (bunn) meaning \"coffee beans\".", descAr: "لون الشوكولاتة والقهوة والتراب، من كلمة \"بُنّ\" أي حبوب القهوة." },
  { ar: "رمادي", en: "Gray", pron: "Ramaadi", hex: "#6B7280", descEn: "The color of rain clouds and elephants — from رماد (ramaad) meaning \"ash\".", descAr: "لون غيوم المطر والفِيَلة، من كلمة \"رماد\"." },
  { ar: "ذهبي", en: "Gold", pron: "Dhahabi", hex: "#D97706", descEn: "The color of gold and treasure — from ذهب (dhahab) meaning \"gold\".", descAr: "لون الذهب والكنوز، من كلمة \"ذهب\"." },
];

// Targets real GSC question queries: "burtuqaali meaning" (pos 9.8),
// "yellow/pink/brown/violet/teal in arabic", "colors in arabic for kids".
const faqEn = [
  { q: "What does burtuqaali (برتقالي) mean?", a: "Burtuqaali means orange in Arabic. It is named after the fruit — burtuqaal (برتقال) is the Arabic word for an orange, and the color borrows the same name, just like in English." },
  { q: "How do you say the main colors in Arabic for kids?", a: "Red is ahmar, blue is azraq, green is akhdar, yellow is asfar, orange is burtuqaali, purple is banafsaji, pink is wardi, white is abyad, black is aswad, and brown is bunni." },
  { q: "What is yellow in Arabic?", a: "Yellow in Arabic is asfar (أصفر) for masculine nouns and safraa (صفراء) for feminine nouns. It is the color of the sun, bananas, and desert sand." },
  { q: "What is pink in Arabic?", a: "Pink in Arabic is wardi (وردي). It comes from the word ward (ورد) meaning rose, so wardi literally means rose-colored." },
  { q: "What is purple (violet) in Arabic?", a: "Purple in Arabic is banafsaji (بنفسجي), named after the banafsaj (بنفسج) — the violet flower." },
  { q: "What is brown in Arabic?", a: "Brown in Arabic is bunni (بني). It comes from bunn (بُنّ) meaning coffee beans." },
  { q: "How many colors should I teach my child in Arabic first?", a: "Start with four or five basic colors — red, blue, green, yellow, and maybe orange. Use only the masculine form at first (ahmar, azraq, akhdar). Add more colors once those are familiar, and let the feminine forms come naturally through everyday speech." },
  { q: "Do Arabic color names change for masculine and feminine?", a: "Yes. Each basic color has a masculine and a feminine form — ahmar becomes hamraa, azraq becomes zarqaa. For young children, teach the masculine form only; they will pick up the feminine naturally over time." },
];

const faqAr = [
  { q: "ماذا تعني كلمة برتقالي؟", a: "برتقالي هو لون الـ Orange بالعربية، وهو مأخوذ من اسم الفاكهة، فالبرتقال فاكهة، واللون يأخذ اسمه منها تماماً كما في الإنجليزية." },
  { q: "كيف نقول الألوان الأساسية بالعربية للأطفال؟", a: "الأحمر، والأزرق، والأخضر، والأصفر، والبرتقالي، والبنفسجي، والوردي، والأبيض، والأسود، والبني — هذه هي الألوان الأساسية التي يبدأ بها الأطفال." },
  { q: "ما هو اللون الأصفر بالعربية؟", a: "الأصفر للمذكّر، وصفراء للمؤنّث. وهو لون الشمس والموز ورمل الصحراء." },
  { q: "ما هو اللون الوردي بالعربية؟", a: "الوردي مأخوذ من كلمة وَرد، فهو يعني حرفياً «بلون الوردة»." },
  { q: "ما هو اللون البنفسجي بالعربية؟", a: "البنفسجي مأخوذ من زهرة البنفسج، وهو الـ Purple أو Violet." },
  { q: "ما هو اللون البني بالعربية؟", a: "البني مأخوذ من كلمة «بُنّ» أي حبوب القهوة، وهو لون الشوكولاتة والتراب." },
  { q: "كم لوناً أعلّم طفلي بالعربية أولاً؟", a: "ابدأ بأربعة أو خمسة ألوان أساسية: الأحمر والأزرق والأخضر والأصفر وربما البرتقالي، واستخدم الشكل المذكّر فقط في البداية، ثم أضف الباقي تدريجياً." },
  { q: "هل تتغيّر أسماء الألوان للمذكّر والمؤنّث؟", a: "نعم، فلكل لون أساسي شكلان: أحمر/حمراء، أزرق/زرقاء. علّم طفلك الشكل المذكّر أولاً، وسيلتقط المؤنّث تلقائياً مع الوقت." },
];

const natureExamples = [
  { emoji: "☁️", en: "The sky is azraq (blue)", ar: "السماء زرقاء" },
  { emoji: "🌳", en: "The grass is akhdar (green)", ar: "العشب أخضر" },
  { emoji: "☀️", en: "The sun is asfar (yellow)", ar: "الشمس صفراء" },
  { emoji: "🍓", en: "The strawberry is ahmar (red)", ar: "الفراولة حمراء" },
  { emoji: "🌙", en: "The night is aswad (black)", ar: "الليل أسود" },
  { emoji: "🐘", en: "The elephant is ramaadi (gray)", ar: "الفيل رمادي" },
];

export default async function ArabicColorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Arabic Colors for Kids"
        description="Learn 12 colors in Arabic with a reference table, pronunciation, nature examples, masculine/feminine forms, and a color-hunt game."
        slug="learn/arabic-colors"
        datePublished="2026-03-19"
        dateModified="2026-06-12"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "الألوان" : "Colors" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "الألوان بالعربية للأطفال" : "Arabic Colors for Kids"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "تعلم ١٢ لوناً أساسياً مع النطق والأمثلة من الطبيعة" : "Learn 12 essential colors with pronunciation and examples from nature"}
      </p>

      <div className="mb-10 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-card shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/learn/learn_colors.png"
          alt={isAr ? "دليل الألوان العربية" : "Arabic colors guide"}
          width={1200}
          height={630}
          className="w-full object-cover"
        />
      </div>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-3">
        <p>
          {isAr
            ? "تعلّم الألوان من أوائل المهارات اللغوية التي يكتسبها الأطفال، فالألوان موجودة في كل مكان: في الطعام والملابس والطبيعة والألعاب. وتعليم طفلك أسماء الألوان بالعربية يفتح باباً واسعاً لبناء المفردات، لأن الألوان تُستخدم لوصف كل شيء تقريباً: التفاحة حمراء، والسماء زرقاء، والعشب أخضر."
            : "Learning colors is one of the first vocabulary skills children acquire — colors are everywhere: in food, clothes, nature, and toys. Teaching your child color names in Arabic opens a wide door to vocabulary building, because colors describe almost everything: the apple is red, the sky is blue, the grass is green."}
        </p>
        <p>
          {isAr
            ? "في العربية تتغيّر أسماء الألوان حسب جنس الاسم الموصوف (مذكّر أو مؤنّث). الأسماء المذكورة هنا هي الشكل المذكّر الأساسي الذي يتعلّمه الأطفال أولاً، وسنشرح المؤنّث ببساطة بعد قليل."
            : "In Arabic, color names change based on the gender of the noun they describe (masculine or feminine). The names listed here are the basic masculine form that children learn first; we'll explain the feminine simply in a moment."}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "جدول الألوان المرجعي" : "Quick Color Reference Table"}
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "اللون" : "Color"}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "بالعربية" : "Arabic"}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "بالإنجليزية" : "English"}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "النطق" : "Pronunciation"}</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((c) => (
              <tr key={c.en} className="border-b border-ink/10 hover:bg-white/5 transition">
                <td className="py-2.5 px-3 text-center">
                  <span className="inline-block w-6 h-6 rounded-md border border-ink/10 align-middle" style={{ backgroundColor: c.hex }} />
                </td>
                <td className="py-2.5 px-3 text-start text-base text-ink" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>{c.ar}</td>
                <td className="py-2.5 px-3 text-start text-sm text-ink/80">{c.en}</td>
                <td className="py-2.5 px-3 text-start text-sm text-accent/80 italic">{c.pron}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "الألوان واحداً واحداً" : "Each Color, One by One"}
      </h2>
      <div className="space-y-4 mb-10">
        {colors.map((c) => (
          <div key={c.en} className="rounded-xl border border-ink/10 bg-white/5 p-4 flex gap-4 items-start">
            <div
              className="shrink-0 w-14 h-14 rounded-xl border border-ink/10"
              style={{ backgroundColor: c.hex }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold text-ink" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                  {c.ar}
                </span>
                <span className="text-ink/30">—</span>
                <span className="text-sm text-ink/80">{c.en}</span>
                <span className="text-sm text-accent/80 italic">({c.pron})</span>
                <SpeakButton text={c.ar} label={`Listen: ${c.ar}`} className="ms-auto" />
              </div>
              <p className="text-sm text-ink/75 leading-relaxed">{isAr ? c.descAr : c.descEn}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "الألوان في الطبيعة" : "Colors in Nature"}
        </h2>
        <p className="text-base text-ink/80 leading-relaxed mb-4">
          {isAr
            ? "أسهل طريقة لتثبيت لون في ذهن الطفل هي ربطه بشيء يراه كل يوم. اربط كل لون بمثال من الطبيعة، وكرّره عند الخروج للنزهة."
            : "The easiest way to fix a color in a child's mind is to tie it to something they see every day. Link each color to a nature example, and repeat it on your walks."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {natureExamples.map((ex) => (
            <div key={ex.en} className="rounded-xl border border-ink/10 bg-white/5 p-3 flex items-center gap-3">
              <span className="text-2xl shrink-0">{ex.emoji}</span>
              <span className="text-sm text-ink/80 leading-relaxed">{isAr ? ex.ar : ex.en}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "المذكّر والمؤنّث — شرح بسيط للوالدين" : "Masculine & Feminine — Simply Explained for Parents"}
        </h2>
        <div className="text-base text-ink/80 leading-relaxed space-y-3">
          <p>
            {isAr
              ? "في العربية لكل لون أساسي شكلان: واحد للمذكّر وواحد للمؤنّث. فنقول \"قلم أحمر\" لأن القلم مذكّر، ونقول \"سيارة حمراء\" لأن السيارة مؤنّثة. اللون نفسه، لكن النهاية تتغيّر: أحمر تصبح حمراء، وأزرق تصبح زرقاء، وأخضر تصبح خضراء، وأصفر تصبح صفراء."
              : "In Arabic, each basic color has two forms: one for masculine and one for feminine nouns. We say \"qalam ahmar\" (a red pen) because pen is masculine, and \"sayyaara hamraa\" (a red car) because car is feminine. Same color, but the ending changes: ahmar becomes hamraa, azraq becomes zarqaa, akhdar becomes khadraa, asfar becomes safraa."}
          </p>
          <p>
            {isAr
              ? "لا تشغل طفلك الصغير بهذه القاعدة في البداية. ابدأ بالشكل المذكّر فقط (أحمر، أزرق، أخضر)، فهو يكفي تماماً في السنوات الأولى. ومع الوقت سيسمع طفلك المؤنّث في الكلام اليومي ويلتقطه تلقائياً، تماماً كما يفعل أطفال العرب."
              : "Don't burden a young child with this rule at first. Start with the masculine form only (ahmar, azraq, akhdar) — it is plenty for the early years. Over time your child will hear the feminine form in everyday speech and pick it up naturally, just as Arab children do."}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">
          {isAr ? "أنشطة ممتعة لتعلّم الألوان" : "Fun Activities to Learn Colors"}
        </h2>
        <div className="space-y-3 text-base text-ink/80 leading-relaxed">
          <div className="rounded-xl border border-ink/10 bg-white/5 p-4">
            <h3 className="font-semibold text-ink mb-1">{isAr ? "🎨 لعبة \"أنا أرى\"" : "🎨 'I Spy' Game"}</h3>
            <p className="text-sm text-ink/75">{isAr ? "قل \"أنا أرى شيئاً أحمر!\" ودع طفلك يبحث عن أشياء حمراء في الغرفة. ثم بدّلا الأدوار." : "Say \"I spy something ahmar (red)!\" and let your child find red objects in the room. Then swap roles."}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white/5 p-4">
            <h3 className="font-semibold text-ink mb-1">{isAr ? "🔍 رحلة البحث عن الألوان" : "🔍 Color Hunt"}</h3>
            <p className="text-sm text-ink/75">{isAr ? "اختر لوناً واحداً لليوم، مثلاً الأزرق، وابحثا عنه معاً طوال اليوم: كوب أزرق، قميص أزرق، سماء زرقاء. سمِّ كل شيء بالعربية عند رؤيته." : "Pick one color for the day, say blue, and hunt for it together all day: a blue cup, a blue shirt, a blue sky. Name each one in Arabic as you spot it."}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white/5 p-4">
            <h3 className="font-semibold text-ink mb-1">{isAr ? "🖍️ التلوين بالعربية" : "🖍️ Coloring in Arabic"}</h3>
            <p className="text-sm text-ink/75">{isAr ? "أثناء التلوين، سمِّ كل لون بالعربية: \"هيا نستخدم الأزرق للسماء!\"" : "While coloring, name each color in Arabic: \"Let's use azraq for the sky!\""}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white/5 p-4">
            <h3 className="font-semibold text-ink mb-1">{isAr ? "🍎 ألوان الطعام" : "🍎 Food Colors"}</h3>
            <p className="text-sm text-ink/75">{isAr ? "أثناء الوجبات، تحدّثا عن ألوان الطعام بالعربية: \"الموز أصفر! التفاحة حمراء!\"" : "During meals, talk about food colors in Arabic: \"The banana is asfar! The apple is ahmar!\""}</p>
          </div>
        </div>
      </section>

      <FaqSection
        locale={locale}
        title={isAr ? "أسئلة شائعة عن الألوان بالعربية" : "Frequently Asked Questions About Arabic Colors"}
        items={isAr ? faqAr : faqEn}
      />

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-numbers`} className="text-sm text-accent underline">
          {isAr ? "← الأرقام العربية" : "← Arabic Numbers"}
        </Link>
        <Link href={`/${locale}/learn/first-arabic-words`} className="text-sm text-accent underline">
          {isAr ? "أول كلمات عربية →" : "First Arabic Words →"}
        </Link>
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-sm text-accent underline">
          {isAr ? "دليل الأبجدية العربية →" : "Arabic Alphabet Guide →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          🚀 {isAr ? "العب في عرب فنجرز" : "Play ArabFingers"}
        </Link>
      </div>
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "arabic-colors")} />
    </PageLayout>
  );
}
