import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import WaterCycleInteractive from "@/components/StatesOfMatter/WaterCycleInteractive";

export const metadata: Metadata = {
  title: "The Water Cycle for Kids | دورة المياه للأطفال",
  description:
    "An immersive interactive science cartoon teaching children the water cycle: Evaporation, Condensation, Precipitation, and Collection. Localized in Arabic and English.",
};

export default async function WaterCyclePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

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

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}
