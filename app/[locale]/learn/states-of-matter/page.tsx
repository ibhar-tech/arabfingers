import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import StatesOfMatterInteractive from "@/components/StatesOfMatter/StatesOfMatterInteractive";

export const metadata: Metadata = {
  title: "States of Matter for Kids | حالات المادة للأطفال",
  description:
    "An immersive interactive science cartoon teaching children the states of matter: Solid, Liquid, Gas, and Plasma. Localized in Arabic and English.",
};

export default async function StatesOfMatterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

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
