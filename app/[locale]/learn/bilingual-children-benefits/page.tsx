import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Benefits of Bilingual Arabic-English Children | فوائد ثنائية اللغة",
  description:
    "Discover the cognitive, social, and cultural benefits of raising bilingual Arabic-English children. Research-backed insights for parents on bilingual child development.",
};

export default async function BilingualBenefitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Benefits of Raising Bilingual Arabic-English Children"
        description="The cognitive, cultural, and social benefits of raising bilingual Arabic-English children — and how to support them."
        slug="learn/bilingual-children-benefits"
        datePublished="2026-04-30"
        dateModified="2026-05-24"
        section="Parenting"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "فوائد ثنائية اللغة" : "Bilingual Benefits" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}
      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "ابدأ رحلة ثنائية اللغة" : "Start the Bilingual Journey"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">Benefits of Raising Bilingual Arabic-English Children</h1>
      <p className="text-sm text-white/50 mb-8">Why giving your child both languages is one of the best gifts you can offer</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Science of Bilingual Brains</h2>
          <p className="mb-3">Decades of research in cognitive science and neurolinguistics have consistently shown that bilingualism provides profound benefits for brain development. Children who grow up speaking two languages don&apos;t just know two languages — they develop fundamentally different cognitive abilities compared to monolingual peers.</p>
          <p>For Arabic-English bilingual children specifically, the benefits are amplified because the two languages use entirely different writing systems, reading directions, and phonetic inventories. This means the brain gets an even more diverse workout, strengthening neural connections across multiple cognitive domains.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Cognitive Benefits</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Enhanced Executive Function</h3>
              <p className="text-white/60">Bilingual children show superior performance in executive function tasks — the mental processes that help us plan, focus attention, remember instructions, and juggle multiple tasks. This is because they constantly practice switching between languages and inhibiting one language while using the other. A 2012 study published in Child Development found that bilingual children outperformed monolingual children on tasks requiring mental flexibility and working memory as early as age 3.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Stronger Problem-Solving Skills</h3>
              <p className="text-white/60">Bilingual children are better at solving problems that require ignoring misleading information and focusing on what&apos;s relevant. This skill, called cognitive inhibition, translates to better performance in mathematics, science, and any domain that requires analytical thinking. Learning Arabic and English — with their different logical structures — trains this ability naturally.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Better Metalinguistic Awareness</h3>
              <p className="text-white/60">Children who know two languages develop an earlier understanding that language is a system with rules. They grasp concepts like &quot;this word means the same thing in Arabic and English&quot; or &quot;Arabic goes right to left but English goes left to right.&quot; This awareness makes them better readers and writers in both languages and makes learning additional languages significantly easier.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Delayed Cognitive Decline</h3>
              <p className="text-white/60">Perhaps the most remarkable finding is that bilingualism provides lifelong cognitive benefits. Research shows that bilingual adults experience the onset of dementia symptoms an average of 4-5 years later than monolinguals. The mental exercise of maintaining two languages throughout life builds cognitive reserve that protects the brain in old age.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Social and Cultural Benefits</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Connection to Heritage</h3>
              <p className="text-white/60">For families with Arabic heritage, language is the bridge to culture. A child who speaks Arabic can communicate with grandparents, understand cultural traditions, participate in religious practices, appreciate Arabic literature and media, and feel a sense of belonging to their heritage community. Without Arabic, children risk becoming culturally disconnected from their roots — a common source of identity struggles in diaspora communities.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Greater Empathy and Social Skills</h3>
              <p className="text-white/60">Bilingual children show greater social sensitivity and perspective-taking abilities. Because they regularly need to assess which language to use with different people, they develop stronger theory of mind — the ability to understand that other people have different knowledge, beliefs, and perspectives. This makes them more empathetic communicators.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Career Advantages</h3>
              <p className="text-white/60">Arabic is spoken by over 400 million people worldwide and is an official language of the United Nations. Professionals who speak both Arabic and English are in high demand across international business, diplomacy, journalism, healthcare, and technology. The bilingual foundation you build now gives your child a significant career advantage for life.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">How ArabFingers Supports Bilingual Development</h2>
          <p className="mb-3">ArabFingers was designed specifically for bilingual families. Every Arabic letter is displayed alongside its English phonetic equivalent. Both Arabic and English letter names are spoken aloud. The interface is available in both languages. Children see Arabic and English as equal, natural parts of their world.</p>
          <p>This bilingual approach means that even during &quot;Arabic time,&quot; English-speaking children feel comfortable and engaged. And Arabic-speaking children simultaneously reinforce their English. Both languages grow together, reinforcing each other rather than competing.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Getting Started</h2>
          <p>The journey to bilingualism begins with exposure. Let your child hear Arabic sounds, see Arabic letters, and associate both with fun and positive experiences. ArabFingers makes this first step effortless — just open the app and let your child play. Every keypress is a step toward a bilingual future.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">فوائد تربية أطفال ثنائيي اللغة عربي-إنجليزي</h1>
      <p className="text-sm text-white/50 mb-8">لماذا منح طفلك كلتا اللغتين هو أحد أفضل الهدايا التي يمكنك تقديمها</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">علم الأدمغة ثنائية اللغة</h2>
          <p className="mb-3">أظهرت عقود من البحث في علم الإدراك وعلم اللغة العصبي باستمرار أن ثنائية اللغة توفر فوائد عميقة لتطور الدماغ. الأطفال الذين ينشأون وهم يتحدثون لغتين لا يعرفون لغتين فحسب — بل يطورون قدرات إدراكية مختلفة جوهرياً مقارنة بأقرانهم أحاديي اللغة.</p>
          <p>بالنسبة للأطفال ثنائيي اللغة عربي-إنجليزي تحديداً، تتضاعف الفوائد لأن اللغتين تستخدمان أنظمة كتابة مختلفة تماماً واتجاهات قراءة ومخزون صوتي مختلف.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الفوائد المعرفية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">تعزيز الوظيفة التنفيذية</h3>
              <p className="text-white/60">يُظهر الأطفال ثنائيو اللغة أداءً متفوقاً في مهام الوظيفة التنفيذية — العمليات العقلية التي تساعدنا في التخطيط وتركيز الانتباه وتذكر التعليمات. وجدت دراسة نُشرت عام ٢٠١٢ أن الأطفال ثنائيي اللغة تفوقوا على أحاديي اللغة في مهام المرونة العقلية والذاكرة العاملة في سن مبكرة تصل إلى ٣ سنوات.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">مهارات حل المشكلات الأقوى</h3>
              <p className="text-white/60">الأطفال ثنائيو اللغة أفضل في حل المشكلات التي تتطلب تجاهل المعلومات المضللة والتركيز على ما هو مهم. هذه المهارة تُترجم إلى أداء أفضل في الرياضيات والعلوم.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">وعي لغوي أفضل</h3>
              <p className="text-white/60">الأطفال الذين يعرفون لغتين يطورون فهماً مبكراً بأن اللغة هي نظام له قواعد. هذا الوعي يجعلهم قراء وكتاب أفضل في كلتا اللغتين ويجعل تعلم لغات إضافية أسهل بكثير.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الفوائد الاجتماعية والثقافية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">الاتصال بالتراث</h3>
              <p className="text-white/60">بالنسبة للعائلات ذات الأصول العربية، اللغة هي الجسر إلى الثقافة. الطفل الذي يتحدث العربية يمكنه التواصل مع الأجداد وفهم التقاليد الثقافية والمشاركة في الممارسات الدينية وتقدير الأدب والإعلام العربي والشعور بالانتماء إلى مجتمع تراثه.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">تعاطف أكبر ومهارات اجتماعية</h3>
              <p className="text-white/60">يُظهر الأطفال ثنائيو اللغة حساسية اجتماعية أكبر وقدرات أفضل على فهم وجهات نظر الآخرين، مما يجعلهم متواصلين أكثر تعاطفاً.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">مزايا مهنية</h3>
              <p className="text-white/60">العربية يتحدثها أكثر من ٤٠٠ مليون شخص حول العالم وهي لغة رسمية في الأمم المتحدة. المتخصصون الذين يتحدثون العربية والإنجليزية مطلوبون بشدة في الأعمال الدولية والدبلوماسية والصحافة والرعاية الصحية والتكنولوجيا.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">البداية</h2>
          <p>رحلة ثنائية اللغة تبدأ بالتعرض. دع طفلك يسمع الأصوات العربية ويرى الحروف العربية ويربطها بالمرح والتجارب الإيجابية. عرب فنجرز يجعل هذه الخطوة الأولى سهلة — فقط افتح التطبيق ودع طفلك يلعب.</p>
        </section>
      </div>
    </>
  );
}
