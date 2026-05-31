import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import SolarSystemInteractive from "@/components/StatesOfMatter/SolarSystemInteractive";

export const metadata: Metadata = {
  title: "The Solar System for Kids | النظام الشمسي للأطفال",
  description:
    "An immersive interactive science cartoon teaching children the Solar System and gravity: Sun, Mercury, Venus, Earth, Mars, and planetary orbits. Localized in Arabic and English.",
};

export default async function SolarSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

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

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}
