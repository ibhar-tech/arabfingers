import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import StatesOfMatterInteractive from "@/components/StatesOfMatter/StatesOfMatterInteractive";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/states-of-matter", {
    titleEn: "States of Matter for Kids — Interactive Science Lesson",
    titleAr: "حالات المادة للأطفال — درس علمي تفاعلي",
    descriptionEn: "An immersive interactive science cartoon teaching children the states of matter: Solid, Liquid, Gas, and Plasma with bilingual Arabic-English narration and molecule simulations.",
    descriptionAr: "درس كرتوني تفاعلي شيق يعلم الأطفال حالات المادة الأربع: الصلبة والسائلة والغازية والبلازما مع سرد ثنائي اللغة ومحاكاة جزيئات ذكية.",
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
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

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
        dateModified="2026-05-31"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "حالات المادة" : "States of Matter" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="States of Matter for Kids — Interactive Science Lesson"
        titleAr="حالات المادة للأطفال — درس علمي تفاعلي"
        descriptionEn="Learn about Solid, Liquid, Gas, and Plasma through an interactive cartoon with Dr. Hakim and Anas."
        descriptionAr="تعلم عن الحالة الصلبة والسائلة والغازية والبلازما من خلال كرتون تفاعلي مع الدكتور حكيم وأنس."
        slug="states-of-matter"
        durationMinutes={5}
        datePublished="2026-05-31"
        transcriptText={plainTranscript}
      />

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "حالات المادة للأطفال 🧪✨" : "States of Matter for Kids 🧪✨"}
        </h1>
        <p className="text-sm text-white/50">
          {isAr
            ? "انضم إلى أنس والدكتور حكيم في المختبر السحري لاستكشاف الجزيئات وحالات المادة وتحولاتها المذهلة!"
            : "Join Anas and Dr. Hakim in the magical lab to explore molecules, the states of matter, and their amazing transformations!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <StatesOfMatterInteractive locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص حالات المادة الأربع" : "💡 Summary of the Four States of Matter"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/70 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-cyan-400 mb-1">
              {isAr ? "1. المادة الصلبة (Solid)" : "1. Solid Matter"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "تكون جزيئاتها متقاربة جداً وتترابط بقوة كبيرة، لذا تهتز في مكانها فقط وتحافظ على شكل وحجم ثابتين."
                : "Molecules are very close and tightly bound together, vibrating in place, which maintains a fixed shape and volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">
              {isAr ? "2. المادة السائلة (Liquid)" : "2. Liquid Matter"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "تكون جزيئاتها قريبة ولكن يمكنها الحركة والانزلاق فوق بعضها، لذا تأخذ شكل الوعاء الذي توضع فيه ولها حجم ثابت."
                : "Molecules are close but free to flow and slide over each other. It takes the shape of its container with a fixed volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-red-400 mb-1">
              {isAr ? "3. المادة الغازية (Gas)" : "3. Gaseous Matter"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "تكون جزيئاتها متباعدة جداً وتتحرك بسرعة فائقة في كل الاتجاهات، وليس لها شكل أو حجم ثابت."
                : "Molecules are spaced far apart and fly rapidly in all directions. It has no fixed shape or volume."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-purple-400 mb-1">
              {isAr ? "4. حالة البلازما (Plasma)" : "4. Plasma State"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "حالة غازية خارقة مشحونة بالكامل بالطاقة والكهرباء، وتتحرك بسرعة البرق وهي الحالة الأكثر انتشاراً في الكون!"
                : "A super gaseous state fully charged with electrical energy, zooming at lightning speed. It is the most common state in the universe!"}
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
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول حالات المادة."
            : "The complete educational dialogue between Dr. Hakim and Anas about the states of matter."}
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
          <Link href={`/${locale}/learn/gravity`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🍎</span>
            <span className="font-semibold text-white">{isAr ? "الجاذبية" : "Gravity"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "القوة الخفية للكون" : "The invisible force of the cosmos"}</p>
          </Link>
        </div>
      </section>

      {/* Nav links to return to dashboard */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "العب وتدرب الآن" : "Play & Practice Now"}
        </Link>
      </div>
    </PageLayout>
  );
}
