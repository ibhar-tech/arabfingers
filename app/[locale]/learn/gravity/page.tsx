import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import GravityInteractive from "@/components/StatesOfMatter/GravityInteractive";

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
        dateModified="2026-05-31"
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

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "كيف تعمل الجاذبية للأطفال؟ 🍎✨" : "How Gravity Works for Kids 🍎✨"}
        </h1>
        <p className="text-sm text-white/50">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/70 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">
              {isAr ? "1. ما هي الجاذبية؟ (What is Gravity?)" : "1. What is Gravity?"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "قوة جذب غير مرئية يمتلكها كل جسم له كتلة أو وزن. الأرض لأنها ضخمة للغاية، تسحب كل شيء نحو مركزها وتثبت أقدامنا."
                : "An invisible pulling force that every object with mass possesses. Earth, being huge, pulls us down to stand firmly."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-400 mb-1">
              {isAr ? "2. قصة تفاحة نيوتن (Newton's Apple)" : "2. Isaac Newton's Discovery"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "العالم إسحاق نيوتن أول من فسر الجاذبية بعدما سقطت تفاحة من شجرة فوق رأسه وتفكر لماذا سقطت للأسفل ولم تطر للأعلى."
                : "Isaac Newton was the first to explain gravity after seeing an apple fall from a tree, thinking why it dropped straight down."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "3. الجاذبية في الفضاء (Gravity in Space)" : "3. Floating in Space"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "في الفضاء المتباعد، لا توجد كتل ضخمة قريبة لتسحب الأجسام، مما يجعل رواد الفضاء يطفون بخفة متناهية وانعدام تام للوزن."
                : "In deep space, there is no nearby massive body to exert pull, causing astronauts and tools to float weightlessly."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-purple-400 mb-1">
              {isAr ? "4. الكتلة تحدد القوة (Mass Dictates Pull)" : "4. Mass and Planet Size"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "كلما زادت كتلة ووزن الكوكب، زادت جاذبيته. المشتري كوكب ضخم جداً وجاذبيته ثقيلة وصعبة، بينما القمر خفيف وجاذبيته ضعيفة."
                : "The heavier the planet, the stronger its pull. Jupiter is massive with heavy gravity, while our Moon is light with low gravity."}
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
        <div className="space-y-3 text-xs sm:text-sm text-white/65 leading-relaxed">
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

