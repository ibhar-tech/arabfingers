import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import GravityInteractive from "@/components/StatesOfMatter/GravityInteractive";

export const metadata: Metadata = {
  title: "How Gravity Works for Kids | كيف تعمل الجاذبية للأطفال",
  description:
    "An immersive interactive science cartoon teaching children gravity: Newton's apple, weightlessness in space, Jupiter heavy gravity, and drop-chamber sandbox. Localized in Arabic and English.",
};

export default async function GravityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

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

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}
