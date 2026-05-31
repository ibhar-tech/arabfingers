import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import WaterCycleInteractive from "@/components/StatesOfMatter/WaterCycleInteractive";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/water-cycle", {
    titleEn: "The Water Cycle for Kids — Interactive Science Lesson",
    titleAr: "دورة المياه للأطفال — درس علمي تفاعلي",
    descriptionEn: "An immersive interactive weather lesson teaching children the water cycle: Evaporation, Condensation, Precipitation, and Collection, with temperature control and rain simulation.",
    descriptionAr: "درس كرتوني تفاعلي شيق يعلم الأطفال مراحل دورة المياه الأربع: التبخر والتكاثف والهطول والتجميع مع تحكم في الحرارة ومحاكاة الطقس والمطر.",
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
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

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
        dateModified="2026-05-31"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "دورة المياه" : "Water Cycle" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="The Water Cycle for Kids — Interactive Science Lesson"
        titleAr="دورة المياه للأطفال — درس علمي تفاعلي"
        descriptionEn="Learn about Evaporation, Condensation, Precipitation, and Collection through an interactive cartoon."
        descriptionAr="تعلم عن التبخر والتكاثف والهطول والتجميع من خلال كرتون تفاعلي ممتع."
        slug="water-cycle"
        durationMinutes={5}
        datePublished="2026-05-31"
        transcriptText={plainTranscript}
      />

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "دورة المياه في الطبيعة للأطفال 💧✨" : "The Water Cycle for Kids 💧✨"}
        </h1>
        <p className="text-sm text-white/50">
          {isAr
            ? "رافق قطرة الماء الصغيرة في رحلتها الدائرية المذهلة! تحكم في حرارة الطقس لتبخير المياه، تكثيف السحب، وإنزال المطر!"
            : "Accompany the tiny water drop on its spectacular circular journey! Control weather heat to evaporate water, condense clouds, and spawn rain!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <WaterCycleInteractive locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص دورة المياه الأربع" : "💡 Summary of the Water Cycle"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/70 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-400 mb-1">
              {isAr ? "1. التبخر (Evaporation)" : "1. Evaporation Stage"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "تقوم أشعة الشمس الدافئة بتسخين مياه المحيطات والأنهار، فتحولها إلى بخار ماء خفيف غير مرئي يرتفع عالياً في السماء."
                : "Warm sun rays heat up surface water, turning it into light, invisible vapor that drifts high into the atmosphere."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "2. التكاثف (Condensation)" : "2. Condensation Stage"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "عندما يرتفع البخار عالياً حيث الجو بارد جداً، يبرد ويتجمع معاً ليشكل غيوماً بيضاء ناعمة وجميلة."
                : "When vapor rises to cold high altitudes, it cools down and clusters together to form fluffy white cartoon clouds."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-blue-400 mb-1">
              {isAr ? "3. الهطول (Precipitation)" : "3. Precipitation Stage"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "عندما تصبح السحب ثقيلة للغاية ومحملة بالمياه، تسقط قطرات الماء على شكل مطر منعش أو بلورات ثلج براقة."
                : "When clouds become extremely heavy with accumulated water, they release it as refreshing rain or shiny snowflakes."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">
              {isAr ? "4. الجريان والتجميع (Collection)" : "4. Collection & Runoff"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "تتدفق المياه عبر الجداول والأنهار عائدة إلى المحيطات والبحار السعيدة، لتستقر وتستعد لبدء دورة مائية جديدة."
                : "Rainwater streams through rivers and runoff valleys back to the ocean, where it settles to prepare for a new cycle."}
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
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول دورة المياه."
            : "The complete educational dialogue between Dr. Hakim and Anas about the water cycle."}
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
          <Link href={`/${locale}/learn/solar-system`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🚀</span>
            <span className="font-semibold text-white">{isAr ? "النظام الشمسي" : "Solar System"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "استكشف الكواكب والمدارات" : "Explore planets and orbits"}</p>
          </Link>
          <Link href={`/${locale}/learn/gravity`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🍎</span>
            <span className="font-semibold text-white">{isAr ? "الجاذبية" : "Gravity"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "القوة الخفية للكون" : "The invisible force of the cosmos"}</p>
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

