import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import InteractiveLoader from "./InteractiveLoader";
import { StatesOfMatterDiagram } from "@/components/illustrations/StatesOfMatterDiagram";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/states-of-matter", {
    titleEn: "States of Matter in Arabic — Bilingual Science Lesson for Kids",
    titleAr: "حالات المادة بالعربية — درس علمي ثنائي اللغة للأطفال",
    descriptionEn: "Learn the states of matter in Arabic and English side by side. Every scene is narrated in both languages, so a child picks up the Arabic words for solid, liquid, gas and plasma while heating and cooling the molecules themselves.",
    descriptionAr: "تعلّم حالات المادة بالعربية والإنجليزية معاً. كلّ مشهد مرويّ باللغتين، فيلتقط الطفل كلمات الصلب والسائل والغاز والبلازما بالعربية وهو يسخّن الجزيئات ويبرّدها بنفسه.",
    ogType: "article",
    publishedTime: "2026-05-31",
    keywords: [
      "states of matter for kids", "حالات المادة للأطفال",
      "solid liquid gas", "صلبة سائلة غازية",
      "science for preschoolers", "علوم للأطفال",
      "interactive science lesson", "درس علمي تفاعلي",
      "plasma for kids", "البلازما للأطفال",
    ],
  });
}

// Transcript data for SEO — same dialogue as the interactive component
const transcriptEn = [
  { speaker: "Narrator", text: "Welcome my friends to our fun science journey! Today we will learn all about the amazing states of matter!" },
  { speaker: "Dr. Hakim", text: "Hello champion! I am Dr. Hakim, and this is my smart assistant Anas! We are super happy to have you with us today!" },
  { speaker: "Anas", text: "Dr. Hakim, I am so excited! But what exactly is 'matter'? Is everything around us considered matter?" },
  { speaker: "Dr. Hakim", text: "Excellent question, Anas! Matter is anything that takes up space and has weight. Like this ice block, it is in a solid state!" },
  { speaker: "Anas", text: "Oh my! When the ice heats up, it melts into liquid water! Look at the water molecules, they are wearing swim goggles and sliding around!" },
  { speaker: "Dr. Hakim", text: "Wonderful, Anas! And if we heat the water even more, it evaporates into gaseous steam! The molecules fly around like superheroes!" },
  { speaker: "Dr. Hakim", text: "And now a surprise! There is a super fourth state called Plasma! We see it in lightning, bright stars, and glowing neon lights!" },
  { speaker: "Narrator", text: "Now my little friends, it's your turn in the lab! Slide the temperature bar and watch the molecules transform in real-time!" },
  { speaker: "Anas", text: "What a spectacular show! Let's summarize what we have learned today with these magical states of matter cards!" },
  { speaker: "Dr. Hakim", text: "Outstanding job my clever friends! You were amazing scientists today! Keep exploring and learning, and see you next time!" },
];

const transcriptAr = [
  { speaker: "الراوي", text: "أهلاً بكم يا أصدقائي في رحلتنا العلمية الممتعة! اليوم سنتعلم معاً عن حالات المادة المذهلة!" },
  { speaker: "د. حكيم", text: "أهلاً بك يا بطل! أنا الدكتور حكيم، وهذا صديقي المساعد الذكي أنس! نحن سعيدان جداً بوجودكم معنا اليوم!" },
  { speaker: "أنس", text: "يا دكتور حكيم، أنا متحمس جداً! ولكن ما هي 'المادة' بالضبط؟ وهل كل ما نراه حولنا يعتبر مادة؟" },
  { speaker: "د. حكيم", text: "سؤال ممتاز يا أنس! المادة هي كل شيء يشغل حيزاً وله وزن. مثل قالب الجليد هذا، إنه في الحالة الصلبة!" },
  { speaker: "أنس", text: "يا إلهي! عندما يسخن الجليد ينصهر ليصبح ماءً سائلاً! انظروا لجزيئات الماء، إنها ترتدي نظارات سباحة وتنزلق بنشاط!" },
  { speaker: "د. حكيم", text: "رائع يا أنس! وإذا قمنا بتسخين الماء أكثر، فإنه يتبخر ليصبح بخاراً غازياً! تطير الجزيئات هنا وهناك كالأبطال الخارقين!" },
  { speaker: "د. حكيم", text: "والآن مفاجأة! هناك حالة رابعة خارقة تسمى البلازما! نراها في البرق والنجوم الساطعة وشاشات النيون المتوهجة!" },
  { speaker: "الراوي", text: "والآن يا أصدقائي الصغار حان دوركم لتجربة المختبر! حركوا شريط درجة الحرارة وشاهدوا كيف تتحول الجزيئات!" },
  { speaker: "أنس", text: "يا له من عرض ممتع ومذهل! دعونا نلخص ما تعلمناه اليوم ببطاقات حالات المادة السحرية!" },
  { speaker: "د. حكيم", text: "أحسنتم يا أصدقائي الأذكياء! لقد كنتم علماء رائعين اليوم! استمروا في الاستكشاف والتعلم، ونراكم في مغامرة أخرى!" },
];

export default async function StatesOfMatterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

  const faq = isAr
    ? [
        {
          q: "هل الرمل سائل لأنه ينسكب؟",
          a: "لا، الرمل ليس سائلاً! كل حبة رمل صغيرة هي جسم صلب قاسٍ بحد ذاته. عندما تصبّ الرمل، تنزلق الحبيبات الصغيرة فوق بعضها فيبدو وكأنه يسيل، لكن كل حبة تحافظ على شكلها الصلب الثابت ولا تتغير أبداً.",
        },
        {
          q: "لماذا يطفو الجليد فوق الماء؟",
          a: "الماء مادة عجيبة! عندما يتجمد ويصبح جليداً، يصبح أخف من الماء السائل، ولهذا يطفو فوقه. هذه ميزة رائعة، فطبقة الجليد تبقى في الأعلى وتترك الماء دافئاً تحتها، فتعيش الأسماك بأمان أسفل البحيرات المتجمدة في الشتاء.",
        },
        {
          q: "ما هي البلازما؟",
          a: "البلازما هي الحالة الرابعة للمادة، وهي غاز شديد السخونة ومشحون بالكهرباء. نراها في البرق الذي يلمع في السماء، وفي الشمس الضخمة التي تضيء نهارنا. إنها الحالة الأكثر انتشاراً في الكون كله رغم أننا نادراً ما نراها في بيوتنا.",
        },
        {
          q: "لماذا تذوب الشوكولاتة في يدك ولا يذوب البسكويت؟",
          a: "لأن نقطة انصهار الشوكولاتة منخفضة جداً، أقل بقليل من حرارة جسمك، فتذوب بمجرد أن تلمسها بيدك الدافئة. أما البسكويت فمصنوع من مواد تحتاج إلى حرارة عالية جداً كي تتغير، لذلك يبقى صلباً ومقرمشاً في يدك.",
        },
        {
          q: "هل يمكن أن يصبح الهواء سائلاً؟",
          a: "نعم، يمكن ذلك! إذا برّدنا الهواء حتى تصل حرارته إلى نحو مئتي درجة تحت الصفر، فإنه يتحول إلى سائل وينساب كالماء الأزرق الباهت. يستعمل العلماء هذا الهواء السائل البارد جداً في تجارب مذهلة داخل المختبرات.",
        },
      ]
    : [
        {
          q: "Is sand a liquid because it pours?",
          a: "No — sand is not a liquid! Each tiny grain of sand is its own hard, solid object. When you pour sand, the little grains simply slide past one another so it looks like it flows. But every single grain keeps its firm, solid shape and never changes at all.",
        },
        {
          q: "Why does ice float on water?",
          a: "Water is very special! When it freezes into ice, the solid ice becomes LIGHTER than the liquid water, so it floats on top. This is wonderful, because the floating ice keeps the water below it warmer — that is how fish survive safely under frozen lakes in winter.",
        },
        {
          q: "What is plasma?",
          a: "Plasma is the fourth state of matter — a super-hot gas that carries an electric charge. We see it in the bright lightning that flashes across the sky and in the giant Sun that lights our day. It is the most common state in the whole universe, even though we rarely see it at home.",
        },
        {
          q: "Why does chocolate melt in your hand but a biscuit doesn't?",
          a: "Chocolate has a very low melting point — just below your body temperature — so it melts the moment your warm hand touches it. That is on purpose! A biscuit is made of ingredients that need much higher heat to change, so it stays solid and crunchy in your hand.",
        },
        {
          q: "Can air become a liquid?",
          a: "Yes, it can! If we cool air down until it reaches about minus two hundred degrees Celsius, it turns into a liquid and pours just like pale blue water. Scientists use this very cold liquid air for amazing experiments inside their laboratories.",
        },
      ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "حالات المادة للأطفال - حكاية علمية تفاعلية" : "States of Matter for Kids - Interactive Cartoon"}
        description={
          isAr
            ? "درس تفاعلي شيق يعلم الأطفال حالات المادة الأربع (الصلبة، السائلة، الغازية، والبلازما) مع محاكاة جزيئات ذكية متحركة."
            : "An immersive interactive cartoon lesson teaching children the 4 states of matter with smart physical particle simulations."
        }
        slug="learn/states-of-matter"
        datePublished="2026-05-31"
        dateModified="2026-06-11"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "حالات المادة" : "States of Matter" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="States of Matter in Arabic — Bilingual Science Lesson for Kids"
        titleAr="حالات المادة بالعربية — درس علمي ثنائي اللغة للأطفال"
        descriptionEn="Learn about Solid, Liquid, Gas, and Plasma through an interactive cartoon with Dr. Hakim and Anas."
        descriptionAr="تعلم عن الحالة الصلبة والسائلة والغازية والبلازما من خلال كرتون تفاعلي مع الدكتور حكيم وأنس."
        slug="states-of-matter"
        durationMinutes={5}
        datePublished="2026-05-31"
        transcriptText={plainTranscript}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-ink mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "حالات المادة للأطفال 🧪✨" : "States of Matter for Kids 🧪✨"}
        </h1>
        <p className="text-base text-ink/75">
          {isAr
            ? "انضم إلى أنس والدكتور حكيم في المختبر السحري لاستكشاف الجزيئات وحالات المادة وتحولاتها المذهلة!"
            : "Join Anas and Dr. Hakim in the magical lab to explore molecules, the states of matter, and their amazing transformations!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <InteractiveLoader locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص حالات المادة الأربع" : "💡 Summary of the Four States of Matter"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-cyan-400 mb-1">
              {isAr ? "١. المادة الصلبة" : "1. Solid Matter"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "تكون جزيئاتها متقاربة جداً وتترابط بقوة كبيرة، لذا تهتز في مكانها فقط وتحافظ على شكل وحجم ثابتين."
                : "Molecules are very close and tightly bound together, vibrating in place, which maintains a fixed shape and volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">
              {isAr ? "٢. المادة السائلة" : "2. Liquid Matter"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "تكون جزيئاتها قريبة ولكن يمكنها الحركة والانزلاق فوق بعضها، لذا تأخذ شكل الوعاء الذي توضع فيه ولها حجم ثابت."
                : "Molecules are close but free to flow and slide over each other. It takes the shape of its container with a fixed volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-rose mb-1">
              {isAr ? "٣. المادة الغازية" : "3. Gaseous Matter"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "تكون جزيئاتها متباعدة جداً وتتحرك بسرعة فائقة في كل الاتجاهات، وليس لها شكل أو حجم ثابت."
                : "Molecules are spaced far apart and fly rapidly in all directions. It has no fixed shape or volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-violet mb-1">
              {isAr ? "٤. حالة البلازما" : "4. Plasma State"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "حالة غازية خارقة مشحونة بالكامل بالطاقة والكهرباء، وتتحرك بسرعة البرق وهي الحالة الأكثر انتشاراً في الكون!"
                : "A super gaseous state fully charged with electrical energy, zooming at lightning speed. It is the most common state in the universe!"}
            </p>
          </div>
        </div>
      </section>

      {/* Diagram figure: three states of matter */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🧊 رسم توضيحي: حالات المادة الثلاث" : "🧊 Diagram: The Three States of Matter"}
        </h2>
        <figure className="m-0">
          <StatesOfMatterDiagram locale={locale} />
          <figcaption className="text-sm text-ink/75 mt-3 text-center">
            {isAr
              ? "الجليد والماء والبخار: نفس الجزيئات بثلاث شخصيات"
              : "Ice, water, and steam: the same particles with three personalities"}
          </figcaption>
        </figure>
      </section>

      {/* States of matter in your kitchen */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🍳 حالات المادة في مطبخك" : "🍳 States of Matter in Your Kitchen"}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          <p className="text-base text-ink/80">
            {isAr
              ? "لست بحاجة إلى مختبر علمي لترى المادة تغيّر حالتها، فمطبخك مليء بهذه العجائب كل يوم. كلما تغيرت الحرارة، تبدّلت حالة المادة أمام عينيك مباشرة. إليك خمسة مشاهد بسيطة يمكنك أن تلاحظها بنفسك:"
              : "You do not need a science lab to watch matter change its state — your kitchen is full of these wonders every single day. Whenever the temperature changes, matter switches its state right before your eyes. Here are five simple scenes you can spot for yourself:"}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "مكعبات الثلج تذوب في العصير: " : "Ice cubes melt in your juice: "}</strong>
            {isAr
              ? "ضع مكعبات الثلج الصلبة في كوب العصير، وراقبها وهي تتقلّص شيئاً فشيئاً حتى تتحول إلى ماء سائل. هذا انصهار: الصلب يصبح سائلاً بفعل الدفء."
              : "Drop solid ice cubes into a glass of juice and watch them shrink little by little until they turn into liquid water. That is melting — a solid becoming a liquid because of warmth."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "الشوكولاتة تذوب في يدك الدافئة: " : "Chocolate melts in your warm hand: "}</strong>
            {isAr
              ? "أمسك قطعة شوكولاتة صلبة في كفك لحظات قليلة، فتبدأ بالليونة ثم تسيل، لأن دفء جسمك كافٍ تماماً لتحويلها من الحالة الصلبة إلى السائلة."
              : "Hold a solid piece of chocolate in your palm for a few moments and it softens, then turns runny — because the warmth of your body is just enough to change it from solid to liquid."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "البخار يتصاعد من الحساء الساخن: " : "Steam rises from hot soup: "}</strong>
            {isAr
              ? "حين يسخن الحساء كثيراً، ترى خيوط بخار رقيقة تتصاعد من سطحه. هذا الماء السائل يتحول إلى غاز ويطير في الهواء بفعل الحرارة العالية."
              : "When soup gets very hot, you see thin wisps of steam rising from its surface. That liquid water is turning into a gas and floating into the air because of the strong heat."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "الزبدة تذوب في المقلاة الساخنة: " : "Butter melts in a hot pan: "}</strong>
            {isAr
              ? "ضع قطعة زبدة صلبة في مقلاة ساخنة، فتنزلق وتسيل بسرعة لتصبح سائلاً ذهبياً لامعاً. الحرارة هي التي غيّرت حالتها من صلبة إلى سائلة."
              : "Place a solid lump of butter in a hot pan and it quickly slides and flows into a shiny golden liquid. The heat is what changed its state from solid to liquid."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "تجميد العصير ليصبح مصاصة: " : "Freezing juice into popsicles: "}</strong>
            {isAr
              ? "صبّ العصير السائل في قالب وضعه في الفريزر، وبعد ساعات يتجمد ويصبح مصاصة صلبة لذيذة. هذا تجمّد: السائل يصبح صلباً بفعل البرد الشديد."
              : "Pour liquid juice into a mold and place it in the freezer; after a few hours it freezes into a delicious solid popsicle. That is freezing — a liquid becoming a solid because of strong cold."}
          </p>
        </div>
      </section>

      {/* Experiment: the three faces of water */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🧪 تجربة: وجوه الماء الثلاثة" : "🧪 Experiment: The Three Faces of Water"}
        </h2>
        <ol className="list-decimal ms-5 space-y-3 text-sm sm:text-base text-ink/80 leading-relaxed marker:text-accent marker:font-bold">
          <li>
            {isAr
              ? "ضع مكعب ثلج في وعاء صغير وسجّل الوقت، ثم اطلب من الطفل أن يخمّن كم دقيقة سيحتاج كي يذوب تماماً."
              : "Put an ice cube in a small bowl and write down the time, then ask your child to guess how many minutes it will need to melt completely."}
          </li>
          <li>
            {isAr
              ? "تفقّد المكعب كل خمس عشرة دقيقة وراقبه وهو يتحول من ثلج صلب إلى ماء سائل، وقارن النتيجة بتخمين الطفل. (صلب ← سائل)"
              : "Check the cube every fifteen minutes and watch it turn from solid ice into liquid water, then compare the result with the child's guess. (solid → liquid)"}
          </li>
          <li>
            {isAr
              ? "الآن يغلي شخص بالغ قليلاً من الماء على الموقد، ويراقب الطفل البخار وهو يتصاعد من مسافة آمنة بعيدة. (سائل ← غاز)"
              : "Now an ADULT boils a little water on the stove while the child watches the steam rise from a safe distance away. (liquid → gas)"}
          </li>
          <li>
            {isAr
              ? "تنفّس بلطف على نافذة باردة أو مرآة، وراقب كيف يظهر الضباب فوراً على شكل قطرات ماء صغيرة. (غاز ← قطرات سائلة!)"
              : "Breathe gently onto a cold window or a mirror and watch how fog appears at once as tiny droplets of water. (gas → liquid droplets!)"}
          </li>
          <li className="text-sm text-ink/75">
            {isAr
              ? "🛡️ ملاحظة أمان: يبقى البالغ وحده قرب الموقد، ويظل الطفل على مسافة ذراع كاملة بعيداً عن البخار الساخن طوال التجربة."
              : "🛡️ Safety note: only an adult stays near the stove, and the child must stay a full arm's length away from the hot steam throughout the experiment."}
          </li>
        </ol>
      </section>

      {/* FAQ — kids' questions, rendered from faq[] for JSON-LD parity */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "❓ أسئلة يطرحها الأطفال" : "❓ Questions Kids Ask"}
        </h2>
        <div className="space-y-4">
          {faq.map((f, i) => (
            <div key={i} className="p-4 rounded-xl border border-ink/5 bg-card">
              <h3 className="font-bold text-accent mb-1 text-sm sm:text-base">{f.q}</h3>
              <p className="text-sm sm:text-base text-ink/80 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini-glossary */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📚 قاموس الكلمات العلمية" : "📚 Mini Science Glossary"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-cyan-400 mb-1">{isAr ? "الصلب" : "Solid"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "حالة المادة التي يكون فيها الجسم قاسياً وثابت الشكل، مثل مكعب الثلج أو الحجر أو قطعة الخشب."
                : "The state of matter where an object is hard and keeps a fixed shape, like an ice cube, a rock, or a piece of wood."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">{isAr ? "السائل" : "Liquid"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "حالة المادة التي تسيل وتأخذ شكل الوعاء الذي توضع فيه، مثل الماء والعصير والحليب."
                : "The state of matter that flows and takes the shape of its container, like water, juice, and milk."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-rose mb-1">{isAr ? "الغاز" : "Gas"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "حالة المادة التي تنتشر وتملأ كل الفراغ حولها، مثل البخار والهواء الذي نتنفسه."
                : "The state of matter that spreads out to fill all the space around it, like steam and the air we breathe."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-saffron-ink mb-1">{isAr ? "الانصهار" : "Melting"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "تحوّل المادة من الحالة الصلبة إلى السائلة بفعل الحرارة، مثلما يذوب الثلج ويصبح ماءً."
                : "When matter changes from a solid into a liquid because of heat, like ice melting into water."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-sky-400 mb-1">{isAr ? "التجمد" : "Freezing"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "تحوّل المادة من الحالة السائلة إلى الصلبة بفعل البرد، مثلما يتجمد الماء ويصبح ثلجاً."
                : "When matter changes from a liquid into a solid because of cold, like water freezing into ice."}
            </p>
          </div>
        </div>
      </section>

      {/* Full Lesson Transcript — crawlable by Google for SEO */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📝 نص الدرس الكامل" : "📝 Full Lesson Transcript"}
        </h2>
        <p className="text-xs text-ink/40 mb-4">
          {isAr
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول حالات المادة."
            : "The complete educational dialogue between Dr. Hakim and Anas about the states of matter."}
        </p>
        <div className="space-y-3 text-sm text-ink/80 leading-relaxed">
          {transcript.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-bold text-ink/80 min-w-[70px]">{line.speaker}:</span>
              <p>{line.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Science Lessons — cross-linking */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-ink mb-3">
          {isAr ? "🔬 دروس علمية أخرى" : "🔬 More Science Lessons"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href={`/${locale}/learn/water-cycle`} className="rounded-xl border border-ink/8 bg-card p-4 text-sm hover:bg-card hover:text-accent transition">
            <span className="text-2xl block mb-1">💧</span>
            <span className="font-semibold text-ink">{isAr ? "دورة المياه" : "Water Cycle"}</span>
            <p className="text-xs text-ink/50 mt-1">{isAr ? "رحلة قطرة الماء في الطبيعة" : "Follow a water drop's journey"}</p>
          </Link>
          <Link href={`/${locale}/learn/solar-system`} className="rounded-xl border border-ink/8 bg-card p-4 text-sm hover:bg-card hover:text-accent transition">
            <span className="text-2xl block mb-1">🚀</span>
            <span className="font-semibold text-ink">{isAr ? "النظام الشمسي" : "Solar System"}</span>
            <p className="text-xs text-ink/50 mt-1">{isAr ? "استكشف الكواكب والمدارات" : "Explore planets and orbits"}</p>
          </Link>
          <Link href={`/${locale}/learn/gravity`} className="rounded-xl border border-ink/8 bg-card p-4 text-sm hover:bg-card hover:text-accent transition">
            <span className="text-2xl block mb-1">🍎</span>
            <span className="font-semibold text-ink">{isAr ? "الجاذبية" : "Gravity"}</span>
            <p className="text-xs text-ink/50 mt-1">{isAr ? "القوة الخفية للكون" : "The invisible force of the cosmos"}</p>
          </Link>
        </div>
      </section>

      {/* Nav links to return to dashboard */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="inline-flex min-h-11 items-center text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 {isAr ? "العب وتدرب الآن" : "Play & Practice Now"}
        </Link>
      </div>
    </PageLayout>
  );
}
