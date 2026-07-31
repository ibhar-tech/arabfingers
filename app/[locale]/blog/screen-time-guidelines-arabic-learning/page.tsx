import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/blog/screen-time-guidelines-arabic-learning", {
    titleEn: "Screen Time & Arabic Learning: An Evidence-Based Guide for Parents",
    titleAr: "وقت الشاشة وتعلم العربية: دليل مبني على الأدلة للوالدين",
    descriptionEn:
      "How to balance screen time with meaningful Arabic learning for toddlers and preschoolers. Research-backed guidelines from pediatric and educational experts.",
    descriptionAr:
      "كيف توازن بين وقت الشاشة والتعلم الهادف للعربية للأطفال الصغار وما قبل المدرسة. إرشادات مبنية على أبحاث طب الأطفال والخبراء التربويين.",
    ogType: "article",
    publishedTime: "2026-04-28",
    modifiedTime: "2026-06-12",
    keywords: [
      "screen time arabic learning", "وقت الشاشة وتعلم العربية",
      "screen time guidelines toddlers", "إرشادات وقت الشاشة للأطفال الصغار",
      "educational apps for kids", "تطبيقات تعليمية للأطفال",
      "active vs passive screen time", "وقت الشاشة النشط مقابل السلبي",
    ],
  });
}

export default async function ScreenTimePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <ArticleStructuredData
        title="Screen Time & Arabic Learning: An Evidence-Based Guide for Parents"
        description="How to balance screen time with meaningful Arabic learning for toddlers."
        slug="blog/screen-time-guidelines-arabic-learning"
        locale={locale}
        datePublished="2026-04-28"
        dateModified="2026-06-12"
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: locale === "ar" ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: locale === "ar" ? "وقت الشاشة" : "Screen Time", href: `/${locale}/blog/screen-time-guidelines-arabic-learning` },
        ]}
      />
      <article className="text-ink">
        {locale === "ar" ? <ContentAr /> : <ContentEn />}
      </article>
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "screen-time-guidelines-arabic-learning")} />
    </PageLayout>
  );
}

function AuthorBlock({ isAr }: { isAr?: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-2 mb-8 text-xs text-ink/40">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">A</div>
      <div>
        <Link href={`/${isAr ? "ar" : "en"}/author`} className="text-ink/70 font-medium hover:text-accent transition">Aissa Trad</Link>
        <span className="mx-2">·</span>
        <time dateTime="2026-04-28">{isAr ? "٢٨ أبريل ٢٠٢٦" : "April 28, 2026"}</time>
        <span className="mx-2">·</span>
        <span>{isAr ? "١٠ دقائق قراءة" : "10 min read"}</span>
      </div>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">Screen Time &amp; Arabic Learning: An Evidence-Based Guide for Parents</h1>
      <p className="text-base text-ink/75">How to balance digital tools with healthy development</p>
      <AuthorBlock />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_screen_time.png"
          alt="Screen Time and Arabic Learning"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The Screen Time Debate</h2>
          <p className="mb-3">
            Few topics generate more parental anxiety than screen time. The American Academy of Pediatrics (AAP), the World Health Organization (WHO), and child development experts have all weighed in with guidelines — but these guidelines can feel contradictory and confusing, especially when parents are trying to use digital tools for a specific educational purpose like teaching Arabic.
          </p>
          <p className="mb-3">
            The truth is nuanced: <strong className="text-ink/90">not all screen time is created equal</strong>. Passively watching videos is fundamentally different from actively interacting with an educational app. And the context matters enormously — a child using an Arabic learning app alongside a parent who names the letters with them gets a vastly different experience from a child left alone with the same app.
          </p>
          <p>
            In this guide, we&apos;ll break down what the research actually says, provide practical guidelines tailored to Arabic learning, and help you make informed decisions that work for your family.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What the Research Actually Says</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Under 18 months</h3>
              <p className="text-ink/75">The AAP recommends avoiding screen media other than video chatting for children under 18 months. At this age, babies learn best through direct human interaction, physical exploration, and face-to-face communication. Their brains are not yet developed enough to transfer learning from 2D screens to 3D reality effectively. This is known as the &quot;transfer deficit&quot; in developmental psychology.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">18-24 months</h3>
              <p className="text-ink/75">For children 18-24 months, the AAP recommends introducing high-quality digital media with a critical caveat: <strong className="text-ink/80">parents should co-view and interact alongside their child</strong>. At this age, children can begin to learn from screen-based media, but only when a caregiver is actively mediating the experience — pointing at things, naming objects, asking questions, and making connections to the real world.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">2-5 years</h3>
              <p className="text-ink/75">For children aged 2-5, the AAP recommends limiting screen time to 1 hour per day of high-quality programming. The WHO guidelines are similar, recommending no more than 1 hour of sedentary screen time. However, both organizations emphasize that the <strong className="text-ink/80">quality and context</strong> of screen time matters more than the raw number of minutes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Active vs. Passive Screen Time</h2>
          <p className="mb-3">
            Researchers distinguish between <strong className="text-ink/90">passive consumption</strong> (watching videos, scrolling) and <strong className="text-ink/90">active interaction</strong> (responding to prompts, creating content, solving problems). The evidence consistently shows that active, interactive screen time produces better learning outcomes than passive viewing.
          </p>
          <p className="mb-3">
            A 2020 meta-analysis published in &quot;JAMA Pediatrics&quot; examined 87 studies involving over 159,000 children and found that the relationship between screen time and child development depends heavily on the type of content and how it&apos;s used. Interactive educational apps showed positive associations with language development, while passive video viewing showed negative associations.
          </p>
          <p>
            Arabic learning apps like ArabFingers fall into the &quot;active interaction&quot; category: the child initiates each interaction (pressing a key or tapping the screen), receives immediate multi-sensory feedback (visual letter, audio pronunciation, animation), and controls the pace of the experience. This is fundamentally different from watching an Arabic alphabet video on YouTube.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Practical Guidelines for Arabic Learning Screen Time</h2>
          <p className="mb-3">Based on the research, here are practical guidelines for using digital tools like ArabFingers for Arabic learning:</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">1. Co-play whenever possible</h3>
              <p className="text-ink/75">Sit with your child during ArabFingers sessions. Name the letters together, celebrate when they recognize one, and connect letters to real-world objects. &quot;Look, ب — that&apos;s Ba, like بيت, which means house!&quot; Research shows co-viewing multiplies the educational benefit by 2-3x.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">2. Keep sessions short and child-led</h3>
              <p className="text-ink/75">Let your child determine the length of each session. Toddlers naturally disengage when they&apos;re done — they&apos;ll climb off your lap, look away, or start doing something else. Follow their lead. Typical productive sessions are 3-10 minutes.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">3. Balance with offline Arabic activities</h3>
              <p className="text-ink/75">Screen-based Arabic learning should complement, not replace, real-world exposure. Read Arabic picture books, sing Arabic songs, label household objects in Arabic, and use Arabic in daily conversation. The combination of digital and physical experiences creates the strongest learning foundation.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">4. No screens before bedtime</h3>
              <p className="text-ink/75">Avoid using ArabFingers or any screen-based tool in the hour before bedtime. The blue light from screens can interfere with melatonin production and disrupt sleep patterns. Morning and early afternoon are the best times for screen-based learning.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">5. Evaluate apps critically</h3>
              <p className="text-ink/75">Not all &quot;educational&quot; apps are actually educational. Look for apps that are designed for child safety, don&apos;t collect data, don&apos;t have distracting notifications, and encourage active participation rather than passive watching. ArabFingers was designed specifically with these criteria in mind.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The Bilingual Advantage in Screen Time Context</h2>
          <p className="mb-3">
            For bilingual families, screen time takes on additional significance. Children in Arabic-English bilingual homes often get significantly less Arabic exposure than English, especially in English-dominant countries. This creates what linguists call an &quot;input gap&quot; — the child hears and sees much less Arabic than English, which can lead to Arabic becoming the weaker language.
          </p>
          <p>
            In this context, high-quality Arabic digital tools serve an important role: they supplement the Arabic input that the child receives at home. A few minutes of ArabFingers each day won&apos;t replace the need for conversational Arabic, but it can reinforce letter recognition, normalize seeing Arabic text, and build positive associations with the language. This supplementary exposure can make a meaningful difference in maintaining bilingual balance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The Bottom Line</h2>
          <p className="mb-3">
            Screen time for Arabic learning is not inherently good or bad — it depends on the quality of the app, the context of use, and the involvement of caregivers. When used thoughtfully, digital tools like ArabFingers can be a valuable part of your child&apos;s Arabic learning journey. The key is to be intentional: choose high-quality tools, co-play when possible, keep sessions short, and balance screen time with rich offline Arabic experiences.
          </p>
          <p>
            Remember: you know your child best. If they&apos;re engaged, learning, and enjoying the experience, you&apos;re on the right track.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/en/blog/how-we-built-arabfingers" className="text-xs text-accent underline">← How We Built ArabFingers</Link>
        <Link href="/en/blog/arabic-alphabet-vs-latin-deep-dive" className="text-xs text-accent underline">Arabic vs Latin →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 Try ArabFingers Now
        </Link>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">وقت الشاشة وتعلم العربية: دليل مبني على الأدلة للوالدين</h1>
      <p className="text-base text-ink/75">كيف توازن بين الأدوات الرقمية والنمو الصحي</p>
      <AuthorBlock isAr />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_screen_time.png"
          alt="وقت الشاشة وتعلم العربية"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">نقاش وقت الشاشة</h2>
          <p className="mb-3">
            قليل من المواضيع تولد قلقاً لدى الوالدين أكثر من وقت الشاشة. الأكاديمية الأمريكية لطب الأطفال (AAP) ومنظمة الصحة العالمية (WHO) وخبراء تطور الطفل قدموا جميعهم إرشادات — لكن هذه الإرشادات قد تبدو متناقضة ومربكة، خاصة عندما يحاول الوالدان استخدام أدوات رقمية لغرض تعليمي محدد مثل تعليم العربية.
          </p>
          <p className="mb-3">
            الحقيقة دقيقة: <strong className="text-ink/90">ليس كل وقت شاشة متساوياً</strong>. مشاهدة الفيديوهات بشكل سلبي مختلف جوهرياً عن التفاعل النشط مع تطبيق تعليمي. والسياق مهم للغاية — الطفل الذي يستخدم تطبيق تعلم عربية مع والد يسمّي الحروف معه يحصل على تجربة مختلفة تماماً عن الطفل المتروك وحده مع نفس التطبيق.
          </p>
          <p>في هذا الدليل، سنفصل ما تقوله الأبحاث فعلاً، ونقدم إرشادات عملية مخصصة لتعلم العربية.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ما تقوله الأبحاث فعلاً</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">أقل من ١٨ شهراً</h3>
              <p className="text-ink/75">توصي الأكاديمية الأمريكية لطب الأطفال بتجنب وسائل الإعلام على الشاشة للأطفال دون ١٨ شهراً (باستثناء مكالمات الفيديو). في هذا العمر، يتعلم الأطفال أفضل من خلال التفاعل البشري المباشر والاستكشاف البدني.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">١٨-٢٤ شهراً</h3>
              <p className="text-ink/75">للأطفال ١٨-٢٤ شهراً، توصي الأكاديمية بتقديم وسائط رقمية عالية الجودة مع تحذير مهم: <strong className="text-ink/80">يجب على الوالدين المشاهدة والتفاعل مع طفلهم</strong>. في هذا العمر، يمكن للأطفال البدء في التعلم من وسائط الشاشة، لكن فقط عندما يكون مقدم الرعاية يتوسط التجربة بنشاط.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">٢-٥ سنوات</h3>
              <p className="text-ink/75">للأطفال ٢-٥ سنوات، توصي الأكاديمية بتحديد وقت الشاشة بساعة واحدة يومياً من البرامج عالية الجودة. لكن كلتا المنظمتين تؤكدان أن <strong className="text-ink/80">جودة وسياق</strong> وقت الشاشة أهم من عدد الدقائق الخام.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">وقت الشاشة النشط مقابل السلبي</h2>
          <p className="mb-3">
            يفرّق الباحثون بين <strong className="text-ink/90">الاستهلاك السلبي</strong> (مشاهدة الفيديوهات والتمرير المتواصل) و<strong className="text-ink/90">التفاعل النشط</strong> (الاستجابة للمؤثرات، وإنشاء المحتوى، وحل المشكلات). تُظهر الأدلة باستمرار أن وقت الشاشة النشط والتفاعلي ينتج نتائج تعلم أفضل بكثير من المشاهدة السلبية.
          </p>
          <p className="mb-3">
            راجعت دراسة تحليلية نُشرت عام ٢٠٢٠ في دورية &quot;JAMA Pediatrics&quot; سبعاً وثمانين بحثاً شملت أكثر من ١٥٩ ألف طفل، ووجدت أن العلاقة بين وقت الشاشة ونمو الطفل تعتمد بشكل كبير على نوع المحتوى وطريقة استخدامه. ارتبطت التطبيقات التعليمية التفاعلية إيجابياً بتطور اللغة، بينما ارتبطت مشاهدة الفيديو السلبية بنتائج سلبية.
          </p>
          <p>
            تطبيقات تعلم العربية مثل عرب فنجرز تقع ضمن فئة &quot;التفاعل النشط&quot;: الطفل يبدأ كل تفاعل بنفسه (بالضغط على مفتاح أو لمس الشاشة)، ويتلقى تغذية راجعة فورية متعددة الحواس (حرف مرئي، ونطق صوتي، ورسوم متحركة)، ويتحكم في إيقاع التجربة. هذا يختلف جوهرياً عن مشاهدة فيديو للأبجدية العربية على يوتيوب.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">إرشادات عملية لوقت الشاشة مع تعلم العربية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">١. العب مع طفلك كلما أمكن</h3>
              <p className="text-ink/75">اجلس مع طفلك أثناء جلسات عرب فنجرز. سمّ الحروف معاً، احتفل عندما يتعرف على حرف، واربط الحروف بأشياء واقعية. الأبحاث تُظهر أن المشاركة تضاعف الفائدة التعليمية ٢-٣ مرات.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">٢. اجعل الجلسات قصيرة وموجّهة من الطفل</h3>
              <p className="text-ink/75">دع طفلك يحدد طول كل جلسة. الأطفال الصغار ينسحبون بشكل طبيعي عندما ينتهون. اتبع قيادتهم. الجلسات الإنتاجية النموذجية ٣-١٠ دقائق.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">٣. وازن مع أنشطة عربية بدون شاشة</h3>
              <p className="text-ink/75">تعلم العربية بالشاشة يجب أن يكمّل، لا يحل محل، التعرض في العالم الحقيقي. اقرأ كتب صور عربية، غنّ أغاني عربية، سمّ أشياء المنزل بالعربية، واستخدم العربية في المحادثات اليومية.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">٤. لا شاشات قبل النوم</h3>
              <p className="text-ink/75">تجنب استخدام أي أداة شاشة في الساعة قبل النوم. الضوء الأزرق من الشاشات يمكن أن يتداخل مع إنتاج الميلاتونين ويعطل أنماط النوم. الصباح وبداية فترة الظهيرة هما أفضل وقت للتعلم عبر الشاشة.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">٥. قيّم التطبيقات بعين ناقدة</h3>
              <p className="text-ink/75">ليست كل التطبيقات &quot;التعليمية&quot; تعليمية فعلاً. ابحث عن تطبيقات مصممة لسلامة الأطفال، لا تجمع بيانات، ليس فيها إشعارات مشتتة، وتشجع المشاركة النشطة بدلاً من المشاهدة السلبية. صُمّم عرب فنجرز خصيصاً وفق هذه المعايير.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ميزة ثنائية اللغة في سياق وقت الشاشة</h2>
          <p className="mb-3">
            بالنسبة للعائلات ثنائية اللغة، يكتسب وقت الشاشة أهمية إضافية. غالباً ما يحصل الأطفال في البيوت العربية الإنجليزية على تعرّض للعربية أقل بكثير من الإنجليزية، خاصة في البلدان التي تغلب عليها الإنجليزية. هذا يخلق ما يسميه اللغويون &quot;فجوة المدخلات&quot; — يسمع الطفل ويرى عربية أقل بكثير من الإنجليزية، مما قد يجعل العربية لغته الأضعف.
          </p>
          <p>
            في هذا السياق، تؤدي الأدوات الرقمية العربية عالية الجودة دوراً مهماً: فهي تكمّل المدخلات العربية التي يتلقاها الطفل في المنزل. بضع دقائق من عرب فنجرز يومياً لن تغني عن الحاجة للعربية المحكية، لكنها تعزز التعرف على الحروف، وتطبّع رؤية النص العربي، وتبني ارتباطات إيجابية باللغة. هذا التعرض التكميلي يمكن أن يُحدث فرقاً حقيقياً في الحفاظ على توازن اللغتين.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">الخلاصة</h2>
          <p>
            وقت الشاشة لتعلم العربية ليس جيداً أو سيئاً بطبيعته — يعتمد على جودة التطبيق وسياق الاستخدام ومشاركة مقدمي الرعاية. عند استخدامه بتفكير، يمكن أن تكون الأدوات الرقمية مثل عرب فنجرز جزءاً قيماً من رحلة تعلم طفلك للعربية. المفتاح هو أن تكون متعمداً: اختر أدوات عالية الجودة، العب مع طفلك عندما يمكنك، اجعل الجلسات قصيرة، ووازن وقت الشاشة مع تجارب عربية غنية بدون شاشة.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/ar/blog/how-we-built-arabfingers" className="text-xs text-accent underline">← كيف بنينا عرب فنجرز</Link>
        <Link href="/ar/blog/arabic-alphabet-vs-latin-deep-dive" className="text-xs text-accent underline">العربية مقابل اللاتينية →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 جرب عرب فنجرز الآن
        </Link>
      </div>
    </>
  );
}
