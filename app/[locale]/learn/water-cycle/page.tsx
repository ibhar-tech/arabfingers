import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import InteractiveLoader from "./InteractiveLoader";
import { WaterCycleDiagram } from "@/components/illustrations/WaterCycleDiagram";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/water-cycle", {
    titleEn: "The Water Cycle in Arabic — Bilingual Science Lesson for Kids",
    titleAr: "دورة المياه بالعربية — درس علمي ثنائي اللغة للأطفال",
    descriptionEn: "Learn the water cycle in Arabic and English side by side. Every scene is narrated in both languages, so a child picks up the Arabic words for evaporation, condensation, rain and collection while controlling the temperature and making it rain.",
    descriptionAr: "تعلّم دورة المياه بالعربية والإنجليزية معاً. كلّ مشهد مرويّ باللغتين، فيلتقط الطفل كلمات التبخّر والتكاثف والهطول والتجميع بالعربية وهو يتحكّم في الحرارة ويصنع المطر.",
    ogType: "article",
    publishedTime: "2026-05-31",
    keywords: [
      "water cycle for kids", "دورة المياه للأطفال",
      "evaporation condensation precipitation", "التبخر التكاثف الهطول",
      "weather science for preschoolers", "علوم الطقس للأطفال",
      "interactive weather simulator", "محاكي الطقس التفاعلي",
      "how rain forms", "كيف يتكون المطر للأطفال",
    ],
  });
}

const transcriptEn = [
  { speaker: "Narrator", text: "Welcome back to our magical lab! Today we will accompany a tiny water drop on its incredible circular journey in nature!" },
  { speaker: "Anas", text: "Dr. Hakim, it's so hot today! The water in my cup is slowly disappearing, and in oceans too! Where does it go?" },
  { speaker: "Dr. Hakim", text: "A smart question as always! When the sun heats up ocean waters, it turns into light vapor rising high into the sky! This is called 'evaporation'!" },
  { speaker: "Anas", text: "Oh my! When the vapor rises high where the air is cold, it gathers together to form beautiful, soft clouds! That's 'condensation'!" },
  { speaker: "Dr. Hakim", text: "Exactly! And when the clouds get too heavy and laden with water, they cannot hold it anymore, and it falls as rain or snow! That is 'precipitation'!" },
  { speaker: "Anas", text: "Wonderful! Rainwater flows through rivers and mountain streams, returning to the oceans to prepare for a new journey! It's a cycle that never ends!" },
  { speaker: "Narrator", text: "Now it's your turn to become a weather master! Slide the temperature bar and watch how heat affects evaporation, clouds, and rainfall!" },
  { speaker: "Anas", text: "What a refreshing watery adventure! Let's recall the four stages of our little drop with these interactive weather cards!" },
  { speaker: "Dr. Hakim", text: "Outstanding job my clever explorer friends! You were amazing at understanding weather secrets today! Keep learning, and see you next time!" },
];

const transcriptAr = [
  { speaker: "الراوي", text: "أهلاً بكم من جديد في مختبرنا الساحر! اليوم سنرافق قطرة ماء صغيرة في رحلتها الدائرية المذهلة في الطبيعة!" },
  { speaker: "أنس", text: "يا دكتور حكيم، الجو حار جداً اليوم! المياه في كوبي تختفي ببطء، وفي المحيطات أيضاً! أين تذهب يا ترى؟" },
  { speaker: "د. حكيم", text: "سؤال ذكي كالعادة! عندما تسخن الشمس مياه البحار، تتحول إلى بخار خفيف يرتفع عالياً في السماء! تسمى هذه العملية 'التبخر'!" },
  { speaker: "أنس", text: "يا إلهي! عندما يرتفع البخار عالياً حيث الجو بارد، يجتمع معاً ليشكل سحباً جميلة وناعمة! إنه 'التكاثف'!" },
  { speaker: "د. حكيم", text: "بالتأكيد! وعندما تصبح الغيوم ثقيلة جداً ومحملة بالمياه، لا تستطيع حملها بعد الآن، فتتساقط كأصوات مطر أو ثلج! إنه 'الهطول'!" },
  { speaker: "أنس", text: "رائع! تتدفق مياه الأمطار عبر الأنهار والجداول الجبلية، وتعود مجدداً إلى البحار لتستعد لرحلة جديدة! إنها دورة لا تنتهي أبداً!" },
  { speaker: "الراوي", text: "والآن حان دوركم لتصبحوا خبراء طقس! حركوا شريط الحرارة وشاهدوا كيف تؤثر على التبخر وسرعة تشكل الغيوم والمطر!" },
  { speaker: "أنس", text: "يا لها من مغامرة مائية منعشة! دعونا نتذكر محطات قطرتنا الصغيرة الأربع ببطاقات الطقس التفاعلية!" },
  { speaker: "د. حكيم", text: "أحسنتم يا أصدقائي المستكشفين الأذكياء! لقد كنتم رائعين في فهم أسرار الطقس اليوم! استمروا في التعلم، ونراكم في مغامرة أخرى!" },
];

export default async function WaterCyclePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

  const faq = isAr
    ? [
        {
          q: "من أين يأتي المطر؟",
          a: "يبدأ المطر رحلته من البحار والأنهار، فتسخنها الشمس وتحوّلها إلى بخار يصعد إلى السماء. هناك يبرد البخار ويتجمّع ليصنع السحب. وحين تمتلئ السحابة بالماء وتثقل، تسقط القطرات نحو الأرض مطراً يروي الحقول والنباتات.",
        },
        {
          q: "لماذا ماء البحر مالح بينما ماء المطر عذب؟",
          a: "حين تسخن الشمس ماء البحر، يصعد بخار الماء النقي وحده إلى السماء، ويترك الملح كله في الأسفل داخل البحر. لذلك تكون السحب وقطرات المطر عذبة بلا ملح، بينما يبقى البحر مالحاً لأن الملح لا يتبخر معه.",
        },
        {
          q: "هل يمكن أن ينفد الماء من العالم؟",
          a: "لا، فالماء لا ينفد أبداً، بل يدور في دورة لا تتوقف من البحر إلى السماء ثم إلى الأرض ثم إلى البحر من جديد. تخيّل أن الماء نفسه الذي شربته الديناصورات قديماً ما زال يدور حولنا اليوم في الأنهار والغيوم والمطر!",
        },
        {
          q: "لماذا بعض الغيوم بيضاء وأخرى رمادية ممطرة؟",
          a: "الغيمة البيضاء رقيقة وخفيفة، فتمرّ أشعة الشمس من خلالها وتبدو ناصعة. أما الغيمة الممطرة فتكون سميكة جداً وممتلئة بكثير من قطرات الماء، فتحجب ضوء الشمس عنا، ولهذا تبدو رمادية داكنة قبل أن ينزل منها المطر.",
        },
        {
          q: "ما هو الثلج؟",
          a: "الثلج هو ماء تجمّد وتحوّل إلى بلورات جليدية صغيرة جميلة قبل أن يسقط من السحاب. يحدث ذلك حين يصبح الجو شديد البرودة في الأعلى، فتتجمّد قطرات الماء وتنزل ندفاً ثلجية بيضاء بدلاً من قطرات المطر السائلة.",
        },
      ]
    : [
        {
          q: "Where does rain come from?",
          a: "Rain begins its journey in the seas and rivers. The sun heats that water and turns it into vapor that rises into the sky. Up high the vapor cools and gathers into clouds. When a cloud fills with water and grows heavy, the drops fall back down as rain to water the fields.",
        },
        {
          q: "Why is the sea salty but rain water is not?",
          a: "When the sun heats the sea, only the pure water rises up as vapor — it leaves all of the salt behind, down in the sea. That is why clouds and raindrops are fresh and have no salt, while the sea stays salty because the salt can never evaporate away with the water.",
        },
        {
          q: "Can the world ever run out of water?",
          a: "No — water never runs out. It travels in a cycle that never stops: from the sea to the sky, down to the land, and back to the sea again. Imagine this: the very same water the dinosaurs once drank is STILL cycling around us today in our rivers, clouds, and rain!",
        },
        {
          q: "Why are some clouds white but rain clouds grey?",
          a: "A white cloud is thin and light, so sunlight passes through it and it looks bright. A rain cloud, though, is very thick and packed with millions of water drops. All that water blocks the sunlight from reaching us, which is why the cloud looks dark grey before the rain falls.",
        },
        {
          q: "What is snow?",
          a: "Snow is water that freezes into tiny, beautiful ice crystals before it falls from a cloud. This happens when the air high up becomes very, very cold. The water drops freeze solid and drift down as soft white snowflakes instead of falling as liquid raindrops.",
        },
      ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "دورة المياه في الطبيعة للأطفال - كرتون تفاعلي" : "The Water Cycle for Kids - Interactive Cartoon"}
        description={
          isAr
            ? "درس تفاعلي شيق يعلم الأطفال مراحل دورة المياه الأربع مع محاكاة طقس ذكية ومتحركة."
            : "An immersive interactive cartoon lesson teaching children the 4 stages of the water cycle with smart weather particle simulations."
        }
        slug="learn/water-cycle"
        datePublished="2026-05-31"
        dateModified="2026-06-11"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "دورة المياه" : "Water Cycle" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="The Water Cycle in Arabic — Bilingual Science Lesson for Kids"
        titleAr="دورة المياه بالعربية — درس علمي ثنائي اللغة للأطفال"
        descriptionEn="Learn about Evaporation, Condensation, Precipitation, and Collection through an interactive cartoon."
        descriptionAr="تعلم عن التبخر والتكاثف والهطول والتجميع من خلال كرتون تفاعلي ممتع."
        slug="water-cycle"
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
          {isAr ? "دورة المياه في الطبيعة للأطفال 💧✨" : "The Water Cycle for Kids 💧✨"}
        </h1>
        <p className="text-base text-ink/75">
          {isAr
            ? "رافق قطرة الماء الصغيرة في رحلتها الدائرية المذهلة! تحكم في حرارة الطقس لتبخير المياه، تكثيف السحب، وإنزال المطر!"
            : "Accompany the tiny water drop on its spectacular circular journey! Control weather heat to evaporate water, condense clouds, and spawn rain!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <InteractiveLoader locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص دورة المياه الأربع" : "💡 Summary of the Water Cycle"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-saffron-ink mb-1">
              {isAr ? "١. التبخر" : "1. Evaporation Stage"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "تقوم أشعة الشمس الدافئة بتسخين مياه المحيطات والأنهار، فتحولها إلى بخار ماء خفيف غير مرئي يرتفع عالياً في السماء."
                : "Warm sun rays heat up surface water, turning it into light, invisible vapor that drifts high into the atmosphere."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "٢. التكاثف" : "2. Condensation Stage"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "عندما يرتفع البخار عالياً حيث الجو بارد جداً، يبرد ويتجمع معاً ليشكل غيوماً بيضاء ناعمة وجميلة."
                : "When vapor rises to cold high altitudes, it cools down and clusters together to form fluffy white cartoon clouds."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">
              {isAr ? "٣. الهطول" : "3. Precipitation Stage"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "عندما تصبح السحب ثقيلة للغاية ومحملة بالمياه، تسقط قطرات الماء على شكل مطر منعش أو بلورات ثلج براقة."
                : "When clouds become extremely heavy with accumulated water, they release it as refreshing rain or shiny snowflakes."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">
              {isAr ? "٤. الجريان والتجميع" : "4. Collection & Runoff"}
            </h3>
            <p className="text-ink/80">
              {isAr
                ? "تتدفق المياه عبر الجداول والأنهار عائدة إلى المحيطات والبحار السعيدة، لتستقر وتستعد لبدء دورة مائية جديدة."
                : "Rainwater streams through rivers and runoff valleys back to the ocean, where it settles to prepare for a new cycle."}
            </p>
          </div>
        </div>
      </section>

      {/* Diagram figure: a water drop's circular journey */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🌧️ رسم توضيحي: رحلة دورة الماء" : "🌧️ Diagram: The Water Cycle Journey"}
        </h2>
        <figure className="m-0">
          <WaterCycleDiagram locale={locale} />
          <figcaption className="text-sm text-ink/75 mt-3 text-center">
            {isAr
              ? "رحلة قطرة الماء التي لا تنتهي"
              : "The never-ending journey of a water drop"}
          </figcaption>
        </figure>
      </section>

      {/* The water cycle in your home */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🏠 دورة الماء في بيتك" : "🏠 The Water Cycle in Your Home"}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          <p className="text-base text-ink/80">
            {isAr
              ? "لست بحاجة إلى محيط أو غيمة لترى دورة الماء، فهي تحدث أمامك في بيتك كل يوم! الماء يتبخر، ثم يتكاثف، ثم يعود قطرات، تماماً كما يفعل في السماء. تأمّل هذه المشاهد الأربعة وابحث عنها بنفسك:"
              : "You do not need an ocean or a cloud to see the water cycle — it is happening right inside your home every single day! Water evaporates, then condenses, then turns back into drops, just like it does in the sky. Watch for these four moments yourself:"}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "البخار الصاعد من القِدر: " : "Steam rising from a kettle: "}</strong>
            {isAr
              ? "حين يغلي الماء في الإبريق أو في قِدر الطبخ، ترى بخاراً أبيض يتصاعد إلى الأعلى. هذا هو التبخر بعينه: الماء الساخن يتحول إلى بخار يطير في الهواء."
              : "When water boils in a kettle or a cooking pot, you see white steam rising upward. That is evaporation in action: the hot water turns into vapor that floats away into the air."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "ضباب مرآة الحمّام: " : "The bathroom mirror fogging up: "}</strong>
            {isAr
              ? "بعد حمّام دافئ، تتغطى المرآة بطبقة ضبابية من قطرات صغيرة. هذا هو التكاثف: بخار الماء الدافئ يلمس المرآة الباردة فيعود ماءً من جديد."
              : "After a warm shower, the mirror gets covered with a misty layer of tiny drops. That is condensation: the warm water vapor touches the cold mirror and turns back into liquid water."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "تعرّق زجاجة المشروب البارد: " : "A cold drink bottle 'sweating': "}</strong>
            {isAr
              ? "في يوم حار، تظهر قطرات ماء على زجاجة المشروب البارد من الخارج. لم تتسرب من الداخل، بل تكاثف بخار الهواء الدافئ حين لامس الزجاجة الباردة."
              : "On a hot day, droplets appear on the outside of a cold drink bottle. They did not leak from inside — the warm air's vapor condensed when it touched the cold bottle."}
          </p>
          <p>
            <strong className="text-ink">{isAr ? "البِرَك تختفي بعد المطر: " : "Puddles shrinking after rain: "}</strong>
            {isAr
              ? "بعد المطر تبقى برك صغيرة في الشارع، لكنها تصغر شيئاً فشيئاً حتى تختفي تماماً. الشمس بخّرت ماءها وأعادته إلى السماء ليبدأ دورة جديدة."
              : "After rain, little puddles stay on the street, but they grow smaller and smaller until they vanish completely. The sun evaporated their water and lifted it back to the sky for a new cycle."}
          </p>
        </div>
      </section>

      {/* Experiment: make a cloud in a jar */}
      <section className="mb-10 p-6 rounded-2xl border border-ink/8 bg-card">
        <h2 className="text-lg font-bold text-ink mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🧪 جرّبها: اصنع غيمة في برطمان" : "🧪 Experiment: Make a Cloud in a Jar"}
        </h2>
        <p className="mb-4 text-sm sm:text-base text-ink/80 leading-relaxed">
          {isAr
            ? "هل تعلم أنك تستطيع أن تصنع غيمة حقيقية صغيرة داخل برطمان زجاجي؟ بهذه التجربة الممتعة سترى التبخر والتكاثف والهطول كلها أمام عينيك في دقائق!"
            : "Did you know you can make a real tiny cloud inside a glass jar? With this fun experiment you will see evaporation, condensation, and precipitation happen right before your eyes in just minutes!"}
        </p>
        <ol className="list-decimal ms-5 space-y-3 text-sm sm:text-base text-ink/80 leading-relaxed marker:text-accent marker:font-bold">
          <li>
            {isAr
              ? "اطلب من شخص بالغ أن يسكب ماءً ساخناً (وليس مغلياً) في برطمان زجاجي شفاف، بعمق بضعة سنتيمترات فقط في القاع."
              : "Ask an adult to pour hot (not boiling) water into a clear glass jar — just a few centimeters deep at the bottom is plenty."}
          </li>
          <li>
            {isAr
              ? "غطِّ فوهة البرطمان بسرعة بصحن صغير حتى يبقى البخار الدافئ محبوساً في الداخل."
              : "Quickly cover the mouth of the jar with a small plate so the warm vapor stays trapped inside."}
          </li>
          <li>
            {isAr
              ? "ضع بعض مكعبات الثلج فوق الصحن. سيصبح الصحن بارداً جداً من الأعلى بينما الهواء تحته دافئ ورطب."
              : "Place a few ice cubes on top of the plate. The plate becomes very cold above, while the air below it stays warm and moist."}
          </li>
          <li>
            {isAr
              ? "راقب الداخل بهدوء: سيتشكل ضباب أبيض يلتف داخل البرطمان حين يلتقي الهواء الدافئ الرطب بالصحن البارد. هذه غيمة حقيقية صغيرة صنعتَها بنفسك!"
              : "Watch quietly: a white mist swirls inside the jar as the warm, moist air meets the cold plate. That is a real tiny cloud you made yourself!"}
          </li>
          <li>
            {isAr
              ? "ارفع الصحن بلطف، وستجد قطرات ماء صغيرة قد تجمّعت على وجهه السفلي، ثم تسقط نازلة مثل مطر صغير. هكذا تماماً تُمطر الغيوم في السماء!"
              : "Gently lift the plate, and you will find tiny water drops have gathered on its underside, then 'rain' back down. That is exactly how clouds make rain up in the sky!"}
          </li>
          <li className="text-sm text-ink/75">
            {isAr
              ? "🛡️ ملاحظة أمان: الشخص البالغ وحده هو من يتعامل مع الماء الساخن. لا تلمس الماء الساخن أو البرطمان بنفسك أبداً."
              : "🛡️ Safety note: ONLY an adult handles the hot water. Never touch the hot water or the jar yourself."}
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
            <h3 className="font-bold text-saffron-ink mb-1">{isAr ? "التبخر" : "Evaporation"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "حين تسخّن الشمس الماء فيتحول إلى بخار خفيف يصعد إلى السماء، مثل البخار المتصاعد من كوب الشاي الساخن."
                : "When the sun heats water and it turns into light vapor that rises into the sky — like the steam rising from a hot cup of tea."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-sky-400 mb-1">{isAr ? "التكاثف" : "Condensation"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "حين يبرد بخار الماء ويتحول إلى قطرات صغيرة، تماماً كما تتكوّن قطرات الماء على مرآة الحمّام بعد الاستحمام الدافئ."
                : "When water vapor cools down and turns back into tiny drops, just like the droplets that form on the bathroom mirror after a warm shower."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">{isAr ? "الهطول" : "Precipitation"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "نزول الماء من السحب إلى الأرض على شكل مطر أو ثلج أو بَرَد، حين تثقل الغيمة بالماء فلا تستطيع حمله."
                : "Water falling from the clouds to the ground as rain, snow, or hail, when a cloud grows too heavy with water to hold it any longer."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-cyan-300 mb-1">{isAr ? "بخار الماء" : "Water Vapor"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "الماء في حالته الغازية الخفيفة غير المرئية التي يصعد بها إلى السماء، وهو ما نراه أحياناً كضباب أبيض فوق الماء الساخن."
                : "Water in its light, invisible gas form that rises into the sky — the same thing we sometimes see as a white mist above hot water."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-ink/5 bg-card">
            <h3 className="font-bold text-qalam mb-1">{isAr ? "السحابة" : "Cloud"}</h3>
            <p className="text-ink/80">
              {isAr
                ? "تجمّع ضخم من ملايين قطرات الماء الصغيرة جداً وبلورات الجليد العائمة عالياً في السماء، ومنها ينزل المطر."
                : "A huge gathering of millions of very tiny water drops and floating ice crystals high up in the sky — and rain falls from it."}
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
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول دورة المياه."
            : "The complete educational dialogue between Dr. Hakim and Anas about the water cycle."}
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
          <Link href={`/${locale}/learn/states-of-matter`} className="rounded-xl border border-ink/8 bg-card p-4 text-sm hover:bg-card hover:text-accent transition">
            <span className="text-2xl block mb-1">🧪</span>
            <span className="font-semibold text-ink">{isAr ? "حالات المادة" : "States of Matter"}</span>
            <p className="text-xs text-ink/50 mt-1">{isAr ? "استكشف الحالات الأربع للمادة" : "Explore solid, liquid, gas, and plasma"}</p>
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

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="inline-flex min-h-11 items-center text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}

