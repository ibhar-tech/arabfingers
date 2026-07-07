import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { FaqSection } from "@/components/FaqSection";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

// Targets real GSC queries: "easy/basic/baby arabic words for kids",
// "arabic words for kids to learn", "my first arabic words".
const wordsFaqEn = [
  { q: "What are some easy Arabic words for kids to learn first?", a: "Start with words your child hears every day: mama (mother), baba (dad), maa' (water), khubz (bread), qitta (cat), kalb (dog), and shukran (thank you). Short, useful words that come up in daily routines stick fastest." },
  { q: "What are good first Arabic words for a baby or toddler?", a: "Babies usually say mama and baba first. Add simple naming words next — qitta (cat), kalb (dog), tuffaha (apple), and body parts like yad (hand) and ayn (eye). Keep to one- and two-syllable words at this age." },
  { q: "How many Arabic words should a young child learn?", a: "There is no quota. Aim for a handful of new words a week, tied to real moments — naming food at meals, animals in a book, body parts at bath time. Repetition in context matters far more than the total count." },
  { q: "How do you say thank you and please in Arabic for kids?", a: "Thank you is shukran (شكراً) and please is min fadlak (من فضلك) to a boy or min fadlik (من فضلكِ) to a girl. Polite words are some of the most useful first words because children use them many times a day." },
  { q: "What is the best way to teach a toddler Arabic words?", a: "Name things in Arabic during everyday routines, repeat the word warmly, and don't correct harshly — just gently repeat the correct word. Books, songs, and play reinforce it. Consistency beats long lessons." },
];

const wordsFaqAr = [
  { q: "ما هي أسهل الكلمات العربية التي يتعلّمها الأطفال أولاً؟", a: "ابدأ بالكلمات التي يسمعها طفلك يومياً: ماما، بابا، ماء، خبز، قطة، كلب، شكراً. الكلمات القصيرة المفيدة التي تتكرّر في الروتين اليومي تثبت أسرع." },
  { q: "ما هي أوّل الكلمات العربية المناسبة للرضيع أو الطفل الصغير؟", a: "عادةً ينطق الأطفال «ماما» و«بابا» أولاً، ثم أضف كلمات التسمية البسيطة: قطة، كلب، تفاحة، وأعضاء الجسم مثل يد وعين. التزم بالكلمات ذات المقطع أو المقطعين في هذا العمر." },
  { q: "كم كلمة عربية ينبغي أن يتعلّمها الطفل الصغير؟", a: "لا يوجد عدد محدّد. اهدف إلى بضع كلمات جديدة أسبوعياً مرتبطة بمواقف حقيقية — تسمية الطعام، والحيوانات في القصص، وأعضاء الجسم. التكرار في سياق أهمّ بكثير من العدد." },
  { q: "كيف نقول «شكراً» و«من فضلك» بالعربية للأطفال؟", a: "شكراً للتعبير عن الامتنان، ومن فضلك (للولد) أو من فضلكِ (للبنت) للطلب بأدب. كلمات الأدب من أكثر الكلمات فائدة لأن الطفل يستعملها مرّات كثيرة في اليوم." },
  { q: "ما أفضل طريقة لتعليم الطفل الصغير الكلمات العربية؟", a: "سمِّ الأشياء بالعربية أثناء الروتين اليومي، وكرّر الكلمة بحنان، ولا تصحّح بقسوة بل أعد الكلمة الصحيحة بلطف. القصص والأغاني واللعب تعزّز ذلك، والاستمرارية أهمّ من الدروس الطويلة." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/first-arabic-words", {
    titleEn: "First Arabic Words for Kids: 25 Essential Words by Theme + Which to Teach First",
    titleAr: "أول كلمات عربية للأطفال: ٢٥ كلمة أساسية حسب الموضوع وأيّها يُعلَّم أولاً",
    descriptionEn:
      "25 essential first Arabic words grouped by theme — family, animals, food, body parts, and everyday words — with pronunciation, which words to teach first and why, and daily-routine tips.",
    descriptionAr:
      "٢٥ كلمة عربية أساسية مصنّفة حسب الموضوع — العائلة والحيوانات والطعام وأعضاء الجسم والكلمات اليومية — مع النطق، وأيّ الكلمات تُعلَّم أولاً ولماذا، ونصائح للروتين اليومي.",
    ogType: "article",
    publishedTime: "2026-03-26",
    modifiedTime: "2026-06-12",
    keywords: [
      "first arabic words for kids", "أول كلمات عربية للأطفال",
      "easy arabic words for kids", "basic arabic words for kids",
      "baby arabic words", "arabic words for kids to learn",
      "arabic vocabulary toddlers", "مفردات عربية للأطفال الصغار",
      "teach arabic words", "تعليم كلمات عربية", "كلمات عربية سهلة للأطفال",
    ],
  });
}

const categories = [
  {
    titleEn: "👨‍👩‍👧 Family",
    titleAr: "👨‍👩‍👧 العائلة",
    words: [
      { ar: "ماما", en: "Mama", pron: "Maama", noteEn: "Usually the first word babies say in Arabic.", noteAr: "عادةً أوّل كلمة ينطقها الأطفال بالعربية." },
      { ar: "بابا", en: "Papa/Dad", pron: "Baaba", noteEn: "The second word most Arabic-speaking babies learn.", noteAr: "ثاني كلمة يتعلّمها معظم الأطفال الناطقين بالعربية." },
      { ar: "أخ", en: "Brother", pron: "Akh", noteEn: "Short and starts with the letter أ (Alef).", noteAr: "كلمة قصيرة تبدأ بحرف الألف." },
      { ar: "أخت", en: "Sister", pron: "Ukht", noteEn: "Same root as \"brother\" with a feminine ending.", noteAr: "من جذر \"أخ\" نفسه مع نهاية مؤنّثة." },
      { ar: "جدّو", en: "Grandpa", pron: "Jiddo", noteEn: "An affectionate, informal term children use.", noteAr: "كلمة حانية يستعملها الأطفال للجدّ." },
      { ar: "تيتا", en: "Grandma", pron: "Teeta", noteEn: "Warm and informal, common in Levantine Arabic.", noteAr: "كلمة دافئة شائعة في بلاد الشام للجدّة." },
    ],
  },
  {
    titleEn: "🐾 Animals",
    titleAr: "🐾 الحيوانات",
    words: [
      { ar: "قطة", en: "Cat", pron: "Qitta", noteEn: "Cats are beloved in Arab culture and easy to point at.", noteAr: "القطط محبوبة في الثقافة العربية ويسهل الإشارة إليها." },
      { ar: "كلب", en: "Dog", pron: "Kalb", noteEn: "Starts with the letter ك (Kaf).", noteAr: "تبدأ بحرف الكاف." },
      { ar: "سمكة", en: "Fish", pron: "Samaka", noteEn: "From the root س-م-ك; great with picture books.", noteAr: "من الجذر س-م-ك، ومناسبة مع كتب الصور." },
      { ar: "طير", en: "Bird", pron: "Tayr", noteEn: "Starts with the emphatic letter ط (Tah).", noteAr: "تبدأ بحرف الطاء المُفخَّم." },
      { ar: "أرنب", en: "Rabbit", pron: "Arnab", noteEn: "Often used to teach the letter أ.", noteAr: "تُستعمل كثيراً لتعليم حرف الألف." },
    ],
  },
  {
    titleEn: "🍎 Food",
    titleAr: "🍎 الطعام",
    words: [
      { ar: "ماء", en: "Water", pron: "Maa'", noteEn: "One of the most important early words to learn.", noteAr: "من أهمّ الكلمات المبكّرة التي يتعلّمها الطفل." },
      { ar: "حليب", en: "Milk", pron: "Haleeb", noteEn: "Starts with ح (Hha) and used many times a day.", noteAr: "تبدأ بحرف الحاء وتتكرّر مرّات كثيرة في اليوم." },
      { ar: "تفاحة", en: "Apple", pron: "Tuffaaha", noteEn: "Starts with ت (Ta); easy to show at snack time.", noteAr: "تبدأ بحرف التاء، ويسهل إراءتها وقت الوجبة." },
      { ar: "موز", en: "Banana", pron: "Mawz", noteEn: "Short and easy to remember.", noteAr: "قصيرة وسهلة الحفظ." },
      { ar: "خبز", en: "Bread", pron: "Khubz", noteEn: "A staple food on the table every day.", noteAr: "طعام أساسي على المائدة كل يوم." },
    ],
  },
  {
    titleEn: "✋ Body Parts",
    titleAr: "✋ أعضاء الجسم",
    words: [
      { ar: "يد", en: "Hand", pron: "Yad", noteEn: "Perfect with songs and clapping games.", noteAr: "مناسبة مع الأغاني وألعاب التصفيق." },
      { ar: "عين", en: "Eye", pron: "Ayn", noteEn: "Point to it together in front of a mirror.", noteAr: "أشيرا إليها معاً أمام المرآة." },
      { ar: "أنف", en: "Nose", pron: "Anf", noteEn: "Touch-and-name games make this one fun.", noteAr: "ألعاب اللمس والتسمية تجعلها ممتعة." },
      { ar: "فم", en: "Mouth", pron: "Fam", noteEn: "Short and easy to say.", noteAr: "قصيرة وسهلة النطق." },
      { ar: "رجل", en: "Leg/Foot", pron: "Rijl", noteEn: "Use it with walking and stamping games.", noteAr: "استعملاها مع ألعاب المشي والدوس." },
    ],
  },
  {
    titleEn: "💬 Everyday Words",
    titleAr: "💬 كلمات يومية",
    words: [
      { ar: "نعم", en: "Yes", pron: "Na'am", noteEn: "Formal. Kids often say أيوا (aywa) informally.", noteAr: "كلمة فُصحى، ويقول الأطفال \"أيوا\" بالعاميّة." },
      { ar: "لا", en: "No", pron: "Laa", noteEn: "One of the shortest, most-used Arabic words.", noteAr: "من أقصر الكلمات العربية وأكثرها استعمالاً." },
      { ar: "شكراً", en: "Thank you", pron: "Shukran", noteEn: "An essential polite word to model early.", noteAr: "كلمة أدب أساسية يُحسن تعليمها مبكراً." },
      { ar: "مرحباً", en: "Hello", pron: "Marhaba", noteEn: "A warm, universal Arabic greeting.", noteAr: "تحيّة عربية دافئة يفهمها الجميع." },
    ],
  },
];

const firstWordsGuidance = [
  { wordEn: "ماما، بابا (Mama, Papa)", wordAr: "ماما، بابا", whyEn: "Emotionally closest — the people your baby loves most. These almost always come first.", whyAr: "أقرب الكلمات إلى قلب الطفل، فهما أحبّ الناس إليه، ولذلك تأتيان أولاً غالباً." },
  { wordEn: "ماء (Water)", wordAr: "ماء", whyEn: "A daily need. A word the child can use to ask for something real, dozens of times a day.", whyAr: "حاجة يومية، وكلمة يطلب بها الطفل شيئاً حقيقياً عشرات المرّات في اليوم." },
  { wordEn: "لا (No)", wordAr: "لا", whyEn: "Powerful and high-frequency — toddlers love a word that gives them a say.", whyAr: "كلمة قويّة كثيرة التكرار، ويحبّها الصغار لأنها تمنحهم رأياً." },
];

export default async function FirstArabicWordsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="First Arabic Words for Kids"
        description="25 essential first Arabic words by theme — family, animals, food, body parts, everyday words — with pronunciation, which to teach first, and daily-routine tips."
        slug="learn/first-arabic-words"
        datePublished="2026-03-26"
        dateModified="2026-06-12"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "كلمات أولى" : "First Words" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "أوّل كلمات عربية لطفلك" : "First Arabic Words for Your Child"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "٢٥ كلمة أساسية حسب الموضوع، مع إرشاد عن أيّها يُعلَّم أولاً" : "25 essential words by theme, with guidance on which to teach first"}
      </p>

      <div className="mb-10 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-card shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/learn/learn_first_words.png"
          alt={isAr ? "أول كلمات عربية" : "First Arabic words guide"}
          width={1200}
          height={630}
          className="w-full object-cover"
        />
      </div>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-3">
        <p>
          {isAr
            ? "بعد أن يتعلّم طفلك الحروف العربية، تأتي الخطوة التالية: بناء المفردات. هذه القائمة تضمّ ٢٥ كلمة عربية أساسية مقسّمة إلى موضوعات يسهل على الأطفال فهمها — العائلة، والحيوانات، والطعام، وأعضاء الجسم، والكلمات اليومية. اخترنا كلمات قصيرة، قريبة من حياة الطفل، يستطيع أن يراها ويلمسها ويطلبها."
            : "After your child learns the Arabic letters, the next step is building vocabulary. This list has 25 essential Arabic words grouped into themes children easily understand — family, animals, food, body parts, and everyday words. We chose short words, close to a child's life, that they can see, touch, and ask for."}
        </p>
        <p>
          {isAr
            ? "مع كل كلمة نطقٌ إنجليزي تقريبي وملاحظة تساعد على التذكّر. وأفضل ما تفعله هو استخدام هذه الكلمات في الحياة اليومية مع طفلك — فالتكرار في السياق الطبيعي هو أفضل طريقة للتعلّم، أفضل بكثير من البطاقات أو الحفظ."
            : "Each word comes with approximate English pronunciation and a memory note. The best thing you can do is use these words in daily life with your child — repetition in natural context is the best way to learn, far better than flashcards or memorising."}
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "أيّ الكلمات تُعلَّم أولاً ولماذا" : "Which Words First, and Why"}
        </h2>
        <p className="text-base text-ink/80 leading-relaxed mb-4">
          {isAr
            ? "لا تبدأ بأيّ كلمة عشوائياً. الكلمات الأولى الأفضل هي عالية التكرار وقريبة عاطفياً: أسماء من يحبّهم الطفل، وأشياء يحتاجها كل يوم. هذه الكلمات يسمعها الطفل كثيراً ويملك دافعاً حقيقياً لاستعمالها."
            : "Don't start with just any word. The best first words are high-frequency and emotionally close: the names of people the child loves, and things they need every day. Your child hears these often and has a real reason to use them."}
        </p>
        <div className="space-y-3">
          {firstWordsGuidance.map((g) => (
            <div key={g.wordEn} className="rounded-xl border border-ink/10 bg-white/5 p-4">
              <h3 className="font-semibold text-ink mb-1" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>{isAr ? g.wordAr : g.wordEn}</h3>
              <p className="text-sm text-ink/75 leading-relaxed">{isAr ? g.whyAr : g.whyEn}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "الكلمات حسب الموضوع" : "Words by Theme"}
      </h2>
      {categories.map((cat) => (
        <section key={cat.titleEn} className="mb-8">
          <h3 className="text-lg font-semibold text-ink mb-4">{isAr ? cat.titleAr : cat.titleEn}</h3>
          <div className="space-y-3">
            {cat.words.map((w) => (
              <div key={w.ar} className="rounded-xl border border-ink/10 bg-white/5 p-4 flex items-start gap-4">
                <div className="shrink-0 text-center w-16">
                  <span className="text-2xl text-ink font-semibold" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>
                    {w.ar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-ink">{w.en}</span>
                    <span className="text-sm text-accent/80 italic">({w.pron})</span>
                  </div>
                  <p className="text-sm text-ink/75 mt-1 leading-relaxed">{isAr ? w.noteAr : w.noteEn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "استعمال الكلمات في الروتين اليومي" : "Using Words in the Daily Routine"}
        </h2>
        <p className="text-base text-ink/80 leading-relaxed mb-3">
          {isAr
            ? "الكلمات تثبت حين ترتبط بلحظات يعيشها الطفل كل يوم. اربط كل كلمة بوقتها الطبيعي بدل تخصيص \"درس\" منفصل."
            : "Words stick when they are tied to moments the child lives every day. Anchor each word to its natural time instead of setting a separate \"lesson\"."}
        </p>
        <div className="space-y-2 text-base text-ink/80 leading-relaxed">
          <p>{isAr ? "• عند الاستيقاظ: قل \"صباح الخير\" وأشِر إلى العين والفم في المرآة." : "• On waking: say \"sabaah al-khayr\" and point to the eye and mouth in the mirror."}</p>
          <p>{isAr ? "• عند الوجبة: سمِّ الطعام بالعربية — \"ماء\"، \"حليب\"، \"تفاحة\"." : "• At mealtime: name the food in Arabic — \"maa'\", \"haleeb\", \"tuffaaha\"."}</p>
          <p>{isAr ? "• عند اللعب: أشِر إلى القطة في الكتاب وقل \"قطة!\"." : "• During play: point to the cat in a book and say \"qitta!\"."}</p>
          <p>{isAr ? "• عند النوم: قل \"تصبح على خير\" كل ليلة حتى تصبح عادة." : "• At bedtime: say \"tusbih ala khayr\" every night until it becomes a habit."}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">
          {isAr ? "كيف تعلّم هذه الكلمات" : "How to Teach These Words"}
        </h2>
        <div className="space-y-2 text-base text-ink/80 leading-relaxed">
          <p>• {isAr ? "ابدأ بـ ٣–٥ كلمات فقط في الأسبوع" : "Start with just 3–5 words per week"}</p>
          <p>• {isAr ? "استخدم الكلمات في مواقف حقيقية — أشِر إلى القطة وقل \"قطة!\"" : "Use words in real situations — point to the cat and say \"qitta!\""}</p>
          <p>• {isAr ? "اقرأ كتب أطفال بالعربية تحتوي على هذه الكلمات" : "Read Arabic children's books that contain these words"}</p>
          <p>• {isAr ? "غنِّ أغاني أطفال عربية — الموسيقى تساعد على الحفظ" : "Sing Arabic children's songs — music helps memorization"}</p>
          <p>• {isAr ? "لا تصحّح بقسوة — كرّر الكلمة الصحيحة بلطف" : "Don't correct harshly — gently repeat the correct word"}</p>
        </div>
      </section>

      <FaqSection
        locale={locale}
        title={isAr ? "أسئلة شائعة عن أول الكلمات العربية" : "Frequently Asked Questions About First Arabic Words"}
        items={isAr ? wordsFaqAr : wordsFaqEn}
      />

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-colors`} className="text-sm text-accent underline">
          {isAr ? "← الألوان بالعربية" : "← Arabic Colors"}
        </Link>
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-sm text-accent underline">
          {isAr ? "دليل الأبجدية →" : "Alphabet Guide →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          🚀 {isAr ? "تدرب على الحروف في عرب فنجرز" : "Practice Letters in ArabFingers"}
        </Link>
      </div>
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "first-arabic-words")} />
    </PageLayout>
  );
}
