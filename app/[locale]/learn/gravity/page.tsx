import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import GravityInteractive from "@/components/StatesOfMatter/GravityInteractive";
import { GravityDiagram } from "@/components/illustrations/GravityDiagram";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/gravity", {
    titleEn: "How Gravity Works for Kids — Interactive Science Lesson",
    titleAr: "الجاذبية للأطفال — درس علمي تفاعلي",
    descriptionEn: "An immersive interactive physics lesson teaching children gravity: Isaac Newton's apple story, weightlessness in space, Jupiter gravity, and a drop-chamber sandbox.",
    descriptionAr: "درس كرتوني تفاعلي شيق يعلم الأطفال أسرار الجاذبية: قصة تفاحة إسحاق نيوتن وانعدام الوزن في الفضاء والجاذبية الثقيلة لكوكب المشتري مع شريط تحكم ممتع.",
    ogType: "article",
    publishedTime: "2026-05-31",
    keywords: [
      "how gravity works for kids", "كيف تعمل الجاذبية للأطفال",
      "isaac newton apple kids", "قصة نيوتن والتفاحة للأطفال",
      "weightlessness in space kids", "انعدام الوزن في الفضاء للأطفال",
      "gravity sandbox simulator", "محاكي الجاذبية التفاعلي",
      "physics for preschoolers", "علم الفيزياء للأطفال الصغار",
    ],
  });
}

const transcriptEn = [
  { speaker: "Narrator", text: "Welcome future scientists! Today we will discover a spectacular invisible force that holds us to the ground and makes things fall! It's gravity!" },
  { speaker: "Anas", text: "Dr. Hakim, I threw my ball in the air, but it fell right back on my head! Why doesn't it keep flying up and disappear in space?" },
  { speaker: "Dr. Hakim", text: "A smart question, champion! Long ago, scientist Isaac Newton saw an apple fall from a tree, and realized the Earth pulls everything to its center using gravity!" },
  { speaker: "Dr. Hakim", text: "Notice, Anas! Heavy rocks drop firmly, while light feathers float slowly due to air resistance, but gravity pulls both down equally in a vacuum!" },
  { speaker: "Anas", text: "Oh my! Look at the astronauts, they float happily in outer space because there is no gravity dragging them down! That looks like so much fun!" },
  { speaker: "Dr. Hakim", text: "True! But beware, if we go to massive Jupiter, its gravity is so strong and heavy that it makes our movements slow and difficult, as if carrying rocks!" },
  { speaker: "Narrator", text: "Now it's your turn to become gravity masters! Slide the bar to adjust gravity strength and watch items float or fall rapidly, and tap them to launch!" },
  { speaker: "Anas", text: "What a powerful and fun physics experiment! Let's summarize the magic properties of gravity with these cute science cards!" },
  { speaker: "Dr. Hakim", text: "Outstanding job my little junior scientists! You were amazing at challenging gravity today! Keep asking smart questions and see you soon!" },
];

const transcriptAr = [
  { speaker: "الراوي", text: "مرحباً بكم يا علماء المستقبل! اليوم سنكتشف قوة خفية مذهلة تمسك بنا على الأرض وتجعل الأشياء تسقط للأسفل! إنها الجاذبية!" },
  { speaker: "أنس", text: "يا دكتور حكيم، رميت كرتي في الهواء، لكنها عادت وسقطت فوراً على رأسي! لماذا لا تستمر في الطيران للأعلى وتختفي في الفضاء؟" },
  { speaker: "د. حكيم", text: "سؤال ذكي يا بطل! منذ زمن طويل، رأى العالم إسحاق نيوتن تفاحة تسقط من شجرة، فأدرك أن الأرض تسحب كل شيء نحوها بقوة تسمى الجاذبية!" },
  { speaker: "د. حكيم", text: "لاحظ يا أنس! الصخور الثقيلة تسقط بقوة وثبات، بينما الأوراق الخفيفة تطفو ببطء بسبب مقاومة الهواء، لكن الجاذبية تسحب كليهما بالتساوي!" },
  { speaker: "أنس", text: "يا إلهي! انظروا إلى رواد الفضاء، إنهم يطفون بسعادة في الفضاء الخارجي لعدم وجود جاذبية تسحبهم للأسفل! يبدو ذلك ممتعاً للغاية!" },
  { speaker: "د. حكيم", text: "صحيح! ولكن انتبهوا، إذا ذهبنا لكوكب المشتري الضخم، فستكون جاذبيته قوية جداً وثقيلة لدرجة تجعل حركتنا بطيئة وصعبة كأننا نحمل صخوراً!" },
  { speaker: "الراوي", text: "والآن حان دوركم لتصبحوا سادة الجاذبية! حركوا الشريط لضبط قوة الجاذبية وشاهدوا الأجسام وهي تطفو أو تسقط بسرعة، واضغطوا عليها لتطلقوها!" },
  { speaker: "أنس", text: "يا لها من تجربة فيزيائية قوية وممتعة! دعونا نلخص خصائص الجاذبية السحرية بأوراق العلوم التفاعلية اللطيفة!" },
  { speaker: "د. حكيم", text: "أحسنتم يا أصدقائي العلماء الصغار! لقد كنتم رائعين في تحدي الجاذبية اليوم! استمروا في طرح الأسئلة الذكية ونراكم قريباً!" },
];

export default async function GravityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

  const faq = isAr
    ? [
        {
          q: "لماذا لا يسقط الناس في أستراليا عن الأرض؟",
          a: "لأن الجاذبية تسحب كل شيء نحو مركز الأرض، وليس نحو جهة واحدة. كلمة «تحت» تعني «نحو منتصف الكوكب» في كل مكان على سطح الأرض. لذلك يقف الأطفال في أستراليا بثبات تماماً مثلنا، فأقدامهم مشدودة نحو المركز.",
        },
        {
          q: "لماذا لا يسقط القمر على رؤوسنا؟",
          a: "القمر يسقط فعلاً، لكنه يسقط حولنا وليس علينا! فهو يتحرك إلى الجانب بسرعة كبيرة في الوقت نفسه الذي تسحبه فيه جاذبية الأرض، فيظل يدور في حلقة لا تنتهي حول كوكبنا دون أن يصطدم به أبداً.",
        },
        {
          q: "هل تسحب الجاذبية الهواء أيضاً؟",
          a: "نعم! الجاذبية تمسك الهواء قريباً من الأرض، ولهذا يحيط بنا غلاف جوي نتنفس منه. أما القمر فكتلته صغيرة وجاذبيته ضعيفة، فلم يستطع الاحتفاظ بالهواء، ولذلك لا يوجد هواء على سطحه يتنفسه رواد الفضاء.",
        },
        {
          q: "من اكتشف الجاذبية؟",
          a: "العالم إسحاق نيوتن هو أول من وصف الجاذبية بعد قصة التفاحة الشهيرة التي سقطت من الشجرة. وبعد سنوات طويلة، جاء العالم ألبرت أينشتاين ليشرحها بطريقة أعمق وأدق، فعلّمنا كيف تنحني الجاذبية حول الأجسام الضخمة.",
        },
        {
          q: "هل يمكننا إيقاف الجاذبية؟",
          a: "لا، لا نستطيع إطفاء الجاذبية أبداً، فهي موجودة في كل مكان. لكن رواد الفضاء داخل المركبات التي تدور حول الأرض يشعرون بانعدام الوزن، لأنهم وكل ما حولهم يسقطون معاً سقوطاً حراً مستمراً، فيبدو وكأنهم يطفون.",
        },
      ]
    : [
        {
          q: "Why don't people in Australia fall off the Earth?",
          a: "Gravity pulls everything toward the CENTER of the Earth, not toward one single direction. That means 'down' really means 'toward the middle' everywhere on the globe. So children in Australia stand firmly with their feet planted, exactly like we do.",
        },
        {
          q: "Why doesn't the Moon fall on us?",
          a: "The Moon IS falling — but it falls AROUND us instead of onto us! While Earth's gravity pulls it inward, the Moon is also racing sideways very fast. These two motions balance, so it keeps circling our planet in a never-ending loop.",
        },
        {
          q: "Does gravity pull on air too?",
          a: "Yes! Gravity holds the air close to the ground, which is why Earth keeps a blanket of atmosphere we can breathe. The Moon has much less mass and weaker gravity, so it could not hold onto air — that is why there is no air on the Moon.",
        },
        {
          q: "Who discovered gravity?",
          a: "Isaac Newton was the first to describe gravity, after the famous story of an apple falling from a tree. Many years later, Albert Einstein explained it even more deeply, showing us how gravity bends and curves around huge, heavy objects in space.",
        },
        {
          q: "Can we turn gravity off?",
          a: "No — we can never switch gravity off, because it is everywhere. But astronauts orbiting the Earth FEEL weightless. That happens because they, and everything around them, are in constant free-fall around the planet, so they appear to float gently.",
        },
      ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "كيف تعمل الجاذبية للأطفال - كرتون تفاعلي" : "How Gravity Works for Kids - Interactive Cartoon"}
        description={
          isAr
            ? "درس تفاعلي شيق يعلم الأطفال مفهوم الجاذبية وسقوط الأجسام وانعدام الوزن في الفضاء الخارجي."
            : "An immersive interactive cartoon lesson teaching children gravity concepts, falling objects, and weightlessness in space."
        }
        slug="learn/gravity"
        datePublished="2026-05-31"
        dateModified="2026-06-11"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "الجاذبية" : "Gravity" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="How Gravity Works for Kids — Interactive Science Lesson"
        titleAr="الجاذبية للأطفال — درس علمي تفاعلي"
        descriptionEn="Learn about Newton's apple discovery, mass, and weightlessness in space."
        descriptionAr="تعلم عن اكتشاف الجاذبية وقصة نيوتن والتفاحة وانعدام الوزن في الفضاء."
        slug="gravity"
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
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "كيف تعمل الجاذبية للأطفال؟ 🍎✨" : "How Gravity Works for Kids 🍎✨"}
        </h1>
        <p className="text-base text-white/75">
          {isAr
            ? "اكتشف القوة الخفية للكون! تحكم في شريط الجاذبية لجعل الأجسام تطفو بخفة في الفضاء أو تسقط وتتحطم تحت تأثير الجاذبية الثقيلة للمشتري!"
            : "Explore the invisible force of the cosmos! Adjust the gravity slider to make objects float weightlessly or crash instantly under heavy gravity settings!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <GravityInteractive locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص حقائق الجاذبية الرائعة" : "💡 Cool Gravity Facts Summary"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">
              {isAr ? "١. ما هي الجاذبية؟" : "1. What is Gravity?"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "قوة جذب غير مرئية يمتلكها كل جسم له كتلة أو وزن. الأرض لأنها ضخمة للغاية، تسحب كل شيء نحو مركزها وتثبت أقدامنا."
                : "An invisible pulling force that every object with mass possesses. Earth, being huge, pulls us down to stand firmly."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-400 mb-1">
              {isAr ? "٢. قصة تفاحة نيوتن" : "2. Isaac Newton's Discovery"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "العالم إسحاق نيوتن أول من فسر الجاذبية بعدما سقطت تفاحة من شجرة فوق رأسه وتفكر لماذا سقطت للأسفل ولم تطر للأعلى."
                : "Isaac Newton was the first to explain gravity after seeing an apple fall from a tree, thinking why it dropped straight down."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "٣. الجاذبية في الفضاء" : "3. Floating in Space"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "في الفضاء المتباعد، لا توجد كتل ضخمة قريبة لتسحب الأجسام، مما يجعل رواد الفضاء يطفون بخفة متناهية وانعدام تام للوزن."
                : "In deep space, there is no nearby massive body to exert pull, causing astronauts and tools to float weightlessly."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-purple-400 mb-1">
              {isAr ? "٤. الكتلة تحدد القوة" : "4. Mass and Planet Size"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "كلما زادت كتلة ووزن الكوكب، زادت جاذبيته. المشتري كوكب ضخم جداً وجاذبيته ثقيلة وصعبة، بينما القمر خفيف وجاذبيته ضعيفة."
                : "The heavier the planet, the stronger its pull. Jupiter is massive with heavy gravity, while our Moon is light with low gravity."}
            </p>
          </div>
        </div>
      </section>

      {/* Diagram figure: three gravity worlds */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🪐 رسم توضيحي: عوالم الجاذبية" : "🪐 Diagram: The Worlds of Gravity"}
        </h2>
        <figure className="m-0">
          <GravityDiagram locale={locale} />
          <figcaption className="text-sm text-white/75 mt-3 text-center">
            {isAr
              ? "ثلاثة عوالم للجاذبية: الأرض والفضاء والمشتري"
              : "Three worlds of gravity: Earth, deep space, and Jupiter"}
          </figcaption>
        </figure>
      </section>

      {/* Gravity in your home */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🏠 الجاذبية في بيتك" : "🏠 Gravity in Your Home"}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <p className="text-base text-white/80">
            {isAr
              ? "لست بحاجة إلى صاروخ أو مختبر لترى الجاذبية، فهي تعمل من حولك في كل لحظة داخل المنزل. إليك أربعة أشياء بسيطة يمكنك أن تجرّبها بنفسك اليوم:"
              : "You do not need a rocket or a laboratory to see gravity — it is working all around you, every single moment, right inside your home. Here are four simple things you can check for yourself today:"}
          </p>
          <p>
            <strong className="text-white">{isAr ? "الملعقة تسقط دائماً للأسفل: " : "A dropped spoon always falls down: "}</strong>
            {isAr
              ? "حين تنفلت ملعقة من يدك على المائدة، فإنها تهبط نحو الأرض في كل مرة، ولا تطير أبداً نحو السقف. الجاذبية هي التي تسحبها للأسفل."
              : "When a spoon slips out of your hand at the table, it drops toward the floor every single time. It never flies up to the ceiling — gravity always pulls it down."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "العصير ينسكب نحو الأسفل: " : "Juice pours DOWN into the cup: "}</strong>
            {isAr
              ? "عندما تصبّ العصير من الإبريق، فإنه ينساب نزولاً ليملأ الكوب، ولا يتسلق العصير للأعلى. الجاذبية تقود السائل دائماً إلى أسفل."
              : "When you pour juice from a jug, it flows downward to fill the cup. The juice never climbs upward — gravity always guides the liquid down into the glass."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "الكرة تعود إليك: " : "A thrown ball comes back: "}</strong>
            {isAr
              ? "إذا رميت كرة عالياً في الهواء، فستبطئ حركتها شيئاً فشيئاً، ثم تتوقف لحظة، ثم تعود ساقطة نحوك. الجاذبية تسحبها إلى الأرض من جديد."
              : "If you toss a ball high into the air, it slows down little by little, stops for a moment, and then comes falling back toward you. Gravity pulls it back to the ground."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "نحن ننزلق إلى الأسفل: " : "We slide DOWN slides: "}</strong>
            {isAr
              ? "في الحديقة، تنزلق دائماً من أعلى الزحليقة إلى أسفلها، ولا تنزلق صاعداً أبداً. هذه هي الجاذبية تسحبك بلطف نحو الأرض."
              : "At the park, you always slide from the top of the slide down to the bottom — never upward. That is gravity gently pulling you toward the ground."}
          </p>
        </div>
      </section>

      {/* Try it at home: the great drop race */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🧪 جرّبها في البيت: سباق السقوط الكبير" : "🧪 Try It at Home: The Great Drop Race"}
        </h2>
        <ol className="list-decimal ms-5 space-y-3 text-sm sm:text-base text-white/80 leading-relaxed marker:text-accent marker:font-bold">
          <li>
            {isAr
              ? "أحضر قطعة نقود معدنية وورقة مسطّحة من ورق الطباعة. أمسكهما معاً على ارتفاع عالٍ فوق رأسك."
              : "Take a coin and a flat sheet of paper. Hold them both up high, well above your head, ready to drop."}
          </li>
          <li>
            {isAr
              ? "أفلتهما في الوقت نفسه وراقب جيداً: القطعة المعدنية تسقط بسرعة، بينما الورقة تتمايل وتطفو نازلة ببطء بسبب مقاومة الهواء."
              : "Drop them at the same time and watch closely: the coin drops fast, while the paper floats and flutters down slowly — that is air resistance!"}
          </li>
          <li>
            {isAr
              ? "الآن اكمش الورقة واضغطها بيدك حتى تصبح كرة صغيرة محكمة. أمسكها مع القطعة المعدنية مرة أخرى على نفس الارتفاع."
              : "Now crumple the paper, squeezing it into a tight little ball. Hold it up next to the coin again, at the very same height."}
          </li>
          <li>
            {isAr
              ? "أفلت الكرتين الصغيرتين معاً، وستفاجأ: تسقطان في وقت واحد وتصلان الأرض في اللحظة نفسها تقريباً!"
              : "Drop both small objects together, and prepare to be surprised: they fall side by side and land at almost the exact same moment!"}
          </li>
          <li>
            {isAr
              ? "ماذا تعلّمنا؟ الجاذبية تسحب كل الأجسام بالقوة نفسها مهما اختلف وزنها. كان الهواء هو الفرق الوحيد بين السقطتين، فحين أزلناه باختفاء سطح الورقة، تساوى كل شيء."
              : "What did we learn? Gravity pulls all objects equally, no matter their weight. The air was the only difference — once we removed its effect by crumpling the paper, both objects fell together."}
          </li>
          <li className="text-sm text-white/75">
            {isAr
              ? "🛡️ ملاحظة أمان: استعمل أشياء غير قابلة للكسر فقط، وتأكد أن الأرض أمامك خالية ونظيفة قبل أن تبدأ التجربة."
              : "🛡️ Safety note: use only objects that cannot break, and make sure the floor in front of you is clear and clean before you begin the experiment."}
          </li>
        </ol>
      </section>

      {/* FAQ — kids' questions, rendered from faq[] for JSON-LD parity */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "❓ أسئلة يطرحها الأطفال" : "❓ Questions Kids Ask"}
        </h2>
        <div className="space-y-4">
          {faq.map((f, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5">
              <h3 className="font-bold text-accent mb-1 text-sm sm:text-base">{f.q}</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini-glossary */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📚 قاموس الكلمات العلمية" : "📚 Mini Science Glossary"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">{isAr ? "الجاذبية" : "Gravity"}</h3>
            <p className="text-white/80">
              {isAr
                ? "القوة الخفية التي تسحب كل الأشياء نحو الأرض، وهي التي تجعل التفاحة تسقط من الشجرة."
                : "The invisible force that pulls everything toward the Earth — it is what makes an apple fall from a tree."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-400 mb-1">{isAr ? "الكتلة" : "Mass"}</h3>
            <p className="text-white/80">
              {isAr
                ? "مقدار المادة الموجودة داخل الجسم، وتبقى الكتلة نفسها سواء كنت على الأرض أو على القمر."
                : "How much 'stuff' is inside an object. Your mass stays the same whether you are on Earth or on the Moon."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">{isAr ? "الوزن" : "Weight"}</h3>
            <p className="text-white/80">
              {isAr
                ? "مقدار قوة الجاذبية التي تسحب جسمك للأسفل، ولهذا يكون وزنك على القمر أخف منه على الأرض."
                : "How hard gravity pulls your body down. That is why you weigh less on the Moon than you do here on Earth."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-purple-400 mb-1">{isAr ? "انعدام الوزن" : "Weightlessness"}</h3>
            <p className="text-white/80">
              {isAr
                ? "الشعور بالطفو والخفّة الذي يحسّ به رواد الفضاء حين يدورون حول الأرض ويسقطون سقوطاً حراً."
                : "The floating feeling astronauts have when they orbit the Earth and fall freely around it."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-pink-400 mb-1">{isAr ? "المدار" : "Orbit"}</h3>
            <p className="text-white/80">
              {isAr
                ? "المسار الدائري الذي يدور فيه جسم حول جسم آخر، مثل دوران القمر حول الأرض دون توقف."
                : "The curved path one object travels as it circles another, like the way the Moon endlessly circles the Earth."}
            </p>
          </div>
        </div>
      </section>

      {/* Full Lesson Transcript — crawlable by Google for SEO */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📝 نص الدرس الكامل" : "📝 Full Lesson Transcript"}
        </h2>
        <p className="text-xs text-white/40 mb-4">
          {isAr
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول الجاذبية وسقوط الأجسام."
            : "The complete educational dialogue between Dr. Hakim and Anas about gravity and falling objects."}
        </p>
        <div className="space-y-3 text-sm text-white/80 leading-relaxed">
          {transcript.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-bold text-white/80 min-w-[70px]">{line.speaker}:</span>
              <p>{line.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Science Lessons — cross-linking */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">
          {isAr ? "🔬 دروس علمية أخرى" : "🔬 More Science Lessons"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href={`/${locale}/learn/states-of-matter`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🧪</span>
            <span className="font-semibold text-white">{isAr ? "حالات المادة" : "States of Matter"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "استكشف الحالات الأربع للمادة" : "Explore solid, liquid, gas, and plasma"}</p>
          </Link>
          <Link href={`/${locale}/learn/water-cycle`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">💧</span>
            <span className="font-semibold text-white">{isAr ? "دورة المياه" : "Water Cycle"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "رحلة قطرة الماء في الطبيعة" : "Follow a water drop's journey"}</p>
          </Link>
          <Link href={`/${locale}/learn/solar-system`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🚀</span>
            <span className="font-semibold text-white">{isAr ? "النظام الشمسي" : "Solar System"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "استكشف الكواكب والمدارات" : "Explore planets and orbits"}</p>
          </Link>
        </div>
      </section>

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}

