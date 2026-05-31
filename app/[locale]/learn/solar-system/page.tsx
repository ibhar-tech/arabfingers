import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import SolarSystemInteractive from "@/components/StatesOfMatter/SolarSystemInteractive";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/solar-system", {
    titleEn: "The Solar System for Kids — Interactive Science Lesson",
    titleAr: "النظام الشمسي للأطفال — درس علمي تفاعلي",
    descriptionEn: "An immersive interactive space lesson teaching children about the solar system and gravity: Sun, Mercury, Venus, Earth, Mars, and orbital paths with gravity controls.",
    descriptionAr: "درس كرتوني تفاعلي شيق يعلم الأطفال النظام الشمسي والجاذبية: كواكب عطارد والزهرة والأرض والمريخ مع مدارات تفاعلية ومحاكي جاذبية ممتع.",
    ogType: "article",
    publishedTime: "2026-05-31",
    keywords: [
      "solar system for kids", "النظام الشمسي للأطفال",
      "gravity and orbits for kids", "الجاذبية والمدارات للأطفال",
      "mercury venus earth mars kids", "كواكب المجموعة الشمسية للأطفال",
      "interactive space simulator", "محاكي الفضاء التفاعلي",
      "astronomy for preschoolers", "علم الفلك للأطفال الصغار",
    ],
  });
}

const transcriptEn = [
  { speaker: "Narrator", text: "Fasten your seatbelts my friends! Today we will fly on a cosmic space journey among the planets to discover how gravity keeps them orbiting!" },
  { speaker: "Anas", text: "Dr. Hakim, space is so vast and scary! Why do our planets spin in perfect circles around the sun instead of flying off into the deep universe?" },
  { speaker: "Dr. Hakim", text: "A very deep question! The Sun is extremely massive and heavy, so it possesses a super invisible gravitational pull that grips planets and keeps them orbiting like a magnet!" },
  { speaker: "Dr. Hakim", text: "Look at Mercury, it's the closest planet to the sun! It is very small and speeds around like a cheetah so gravity doesn't drag it down into the burning sun!" },
  { speaker: "Anas", text: "What a gorgeous shine! Venus is the hottest and brightest planet because it is wrapped in thick clouds that trap heat like a greenhouse!" },
  { speaker: "Dr. Hakim", text: "And now our wonderful planet, Earth! It is the only planet packed with water, air, and life, and a cute little moon spins around it to light up our night!" },
  { speaker: "Anas", text: "Look at that spectacular red color! It's Mars, covered in iron rust. We send smart rover robots to explore its giant mountains and deep valleys!" },
  { speaker: "Narrator", text: "Now it's your turn to control solar gravity! Slide the bar to increase gravity and watch planets speed up, or decrease it to watch asteroids float away!" },
  { speaker: "Anas", text: "What a spectacular cosmic flight! Let's summarize our four neighboring planets with these interactive space cards!" },
  { speaker: "Dr. Hakim", text: "Outstanding job my clever astronaut friends! You were amazing on our cosmic adventure today! Keep exploring the stars and see you soon!" },
];

const transcriptAr = [
  { speaker: "الراوي", text: "اربطوا أحزمة الأمان يا أصدقائي! سننطلق اليوم في رحلة فضائية خارقة بين الكواكب لنكتشف كيف تحافظ الجاذبية عليها تدور بسعادة!" },
  { speaker: "أنس", text: "يا دكتور حكيم، الفضاء واسع ومخيف جداً! لماذا تدور كواكبنا في دوائر منتظمة حول الشمس ولا تطير متباعدة في الكون الفسيح؟" },
  { speaker: "د. حكيم", text: "سؤال عميق جداً! الشمس ضخمة وثقيلة للغاية، لذا تمتلك قوة جذب خارقة غير مرئية تسحب الكواكب نحوها وتجعلها تدور حولها كالمغناطيس!" },
  { speaker: "د. حكيم", text: "انظروا إلى عطارد، إنه الكوكب الأقرب للشمس! حجمه صغير جداً وهو سريع كالفهد في دورانه لكي لا تسحبه الجاذبية وتسقطه في الشمس الساخنة!" },
  { speaker: "أنس", text: "يا لها من لمعان! كوكب الزهرة هو الأكثر سخونة وتوهجاً في مجموعتنا لأنه محاط بغيوم سميكة تحبس الحرارة كصوبة دافئة!" },
  { speaker: "د. حكيم", text: "والآن كوكبنا الرائع الأرض! إنه الكوكب الوحيد المليء بالماء والهواء والحياة، ويدور حوله قمر صغير ينير ليلنا الجميل بسعادة!" },
  { speaker: "أنس", text: "انظروا للون الأحمر الرائع! إنه كوكب المريخ المغطى بالحديد والصدأ، ونحن نرسل مركبات فضاء ذكية لتستكشف جباله الشاهقة ووديانه العميقة!" },
  { speaker: "الراوي", text: "والآن حان دوركم للتحكم في جاذبية الشمس! حركوا الشريط لزيادة الجاذبية وشاهدوا كيف تسرع الكواكب، أو خفضوها لتطير الكويكبات بعيداً!" },
  { speaker: "أنس", text: "يا له من طيران فضائي مذهل! دعونا نلخص خصائص كواكبنا القريبة الأربعة ببطاقات الفضاء التفاعلية!" },
  { speaker: "د. حكيم", text: "أحسنتم يا أصدقائي رواد الفضاء الأذكياء! لقد كنتم رائعين في مغامرتنا الكونية اليوم! استمروا في استكشاف النجوم ونراكم قريباً!" },
];

export default async function SolarSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "رحلة النظام الشمسي للأطفال - كرتون تفاعلي" : "The Solar System for Kids - Interactive Cartoon"}
        description={
          isAr
            ? "درس تفاعلي مشوق يستكشف كواكب المجموعة الشمسية القريبة وكيف تحافظ الجاذبية الكونية على توازن المدارات."
            : "An immersive interactive cartoon lesson exploring neighboring planets and how gravity keeps orbits balanced in space."
        }
        slug="learn/solar-system"
        datePublished="2026-05-31"
        dateModified="2026-05-31"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "النظام الشمسي" : "Solar System" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="The Solar System for Kids — Interactive Science Lesson"
        titleAr="النظام الشمسي للأطفال — درس علمي تفاعلي"
        descriptionEn="Learn about neighboring planets and solar gravity through an interactive cartoon."
        descriptionAr="تعلم عن كواكب المجموعة الشمسية وجاذبية الشمس من خلال كرتون تفاعلي شيق."
        slug="solar-system"
        durationMinutes={5}
        datePublished="2026-05-31"
        transcriptText={plainTranscript}
      />

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "النظام الشمسي وكواكبه للأطفال 🚀✨" : "Our Spectacular Solar System 🚀✨"}
        </h1>
        <p className="text-sm text-white/50">
          {isAr
            ? "حلق في مغامرة فضائية مذهلة! استكشف أسرار كواكبنا الأربعة القريبة وتحكم في جاذبية الشمس لتغيير سرعة المدارات وتفادي كويكباتك الخاصة!"
            : "Fly on a spectacular space adventure! Explore our neighboring planets and adjust solar gravity to control orbital speeds and launch custom asteroids!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <SolarSystemInteractive locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص كواكب مجموعتنا الشمسية" : "💡 Neighbors of Our Solar System"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/70 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-slate-400 mb-1">
              {isAr ? "1. كوكب عطارد (Mercury)" : "1. Mercury"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "الكوكب الأقرب للشمس وسريع الدوران جداً لئلا تسحبه جاذبيتها. صخري وحجمه صغير للغاية ولا يمتلك أي قمر."
                : "The closest planet to the sun. It orbits at lightning speeds to resist solar pull. Small, rocky, and moonless."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-300 mb-1">
              {isAr ? "2. كوكب الزهرة (Venus)" : "2. Venus"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "الكوكب الأكثر حرارة وسخونة في نظامنا؛ غيومه السميكة والغازية تحبس حرارة الشمس كصوبة دافئة لا تحتمل."
                : "The hottest planet in our system, wrapped in thick atmosphere that traps solar rays like a greenhouse."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "3. كوكب الأرض (Earth)" : "3. Earth"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "موطننا الجميل المليء بالماء والهواء والبحار والغابات والحياة، ويمتلك قمراً لطيفاً واحداً ينير ليلنا السعيد."
                : "Our spectacular blue home, overflowing with oceans, oxygen, and life, orbited by a single glowing moon."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-red-400 mb-1">
              {isAr ? "4. كوكب المريخ (Mars)" : "4. Mars"}
            </h3>
            <p className="text-white/60">
              {isAr
                ? "الكوكب الأحمر المليء بالصدأ والحديد، ونرسل إليه روبوتات ومركبات فضاء ذكية تبحث عن آثار مياه قديمة."
                : "The rusty red planet covered in iron dust, actively explored by smart robotic rovers seeking water hints."}
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
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول النظام الشمسي والكواكب."
            : "The complete educational dialogue between Dr. Hakim and Anas about the solar system and its planets."}
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

