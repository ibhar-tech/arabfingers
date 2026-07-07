import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import Image from "next/image";
import { TableOfContents } from "@/components/TableOfContents";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/blog/how-we-built-arabfingers", {
    titleEn: "How We Built ArabFingers: The Story Behind the App",
    titleAr: "كيف بنينا عرب فنجرز: القصة وراء التطبيق",
    descriptionEn:
      "The personal story of why and how ArabFingers was created — from a parent's frustration finding Arabic tools for toddlers to building a free bilingual app used worldwide.",
    descriptionAr:
      "القصة الشخصية لسبب وكيفية إنشاء عرب فنجرز — من إحباط أحد الوالدين في البحث عن أدوات عربية للأطفال الصغار إلى بناء تطبيق مجاني ثنائي اللغة تستخدمه العائلات حول العالم.",
    ogType: "article",
    publishedTime: "2026-04-15",
    modifiedTime: "2026-06-12",
    keywords: [
      "how arabfingers was built", "كيف بنينا عرب فنجرز",
      "arabic learning app for toddlers", "تطبيق تعلم العربية للأطفال الصغار",
      "free arabic app for kids", "تطبيق عربي مجاني للأطفال",
      "bilingual parenting story", "قصة التربية ثنائية اللغة",
    ],
  });
}

export default async function HowWeBuiltPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <ArticleStructuredData
        title="How We Built ArabFingers: The Story Behind the App"
        description="The personal story of why and how ArabFingers was created."
        slug="blog/how-we-built-arabfingers"
        locale={locale}
        datePublished="2026-04-15"
        dateModified="2026-06-12"
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: locale === "ar" ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: locale === "ar" ? "قصة البناء" : "Our Story", href: `/${locale}/blog/how-we-built-arabfingers` },
        ]}
      />
      <article className="text-ink">
        {locale === "ar" ? <ContentAr /> : <ContentEn />}
      </article>
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
        <time dateTime="2026-04-15">{isAr ? "١٥ أبريل ٢٠٢٦" : "April 15, 2026"}</time>
        <span className="mx-2">·</span>
        <span>{isAr ? "٨ دقائق قراءة" : "8 min read"}</span>
      </div>
    </div>
  );
}

function ContentEn() {
  const tocItems = [
    { id: "problem", text: "The Problem: Arabic Learning is Broken" },
    { id: "insight", text: "The Insight: Keyboard Smashing is Learning" },
    { id: "prototype", text: "Building the First Prototype" },
    { id: "design", text: "Design Decisions That Shaped ArabFingers" },
    { id: "technical", text: "The Technical Architecture" },
    { id: "next", text: "What's Next" },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">How We Built ArabFingers: The Story Behind the App</h1>
      <p className="text-base text-ink/75">From a parent&apos;s frustration to a free tool for families worldwide</p>
      <AuthorBlock />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_how_we_built.png"
          alt="How We Built Arab Fingers"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <TableOfContents locale="en" items={tocItems} />

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 id="problem" className="text-xl font-semibold text-ink mb-3">The Problem: Arabic Learning for Toddlers Is Broken</h2>
          <p className="mb-3">
            If you&apos;re a parent in a bilingual Arab family living outside the Arab world, you&apos;ve probably experienced this: you want your toddler to be exposed to Arabic letters, but every app you find is either low quality, filled with intrusive ads, behind a paywall, or designed for much older children. The situation for toddlers — kids aged 1 to 3 who can&apos;t read yet — is particularly dire.
          </p>
          <p className="mb-3">
            I experienced this firsthand. My child was 18 months old and fascinated by the keyboard. Every time he sat on my lap while I worked, he would smash the keys gleefully — delighted by the letters appearing on screen. I thought: what if each keypress showed an Arabic letter with its sound? What if the screen came alive with animations? What if this natural curiosity could become a gateway to Arabic literacy?
          </p>
          <p>
            I searched for existing solutions. I tried dozens of apps. Some were in Arabic, but they assumed the child could already read. Others had small touchable letter tiles, but they were surrounded by banner ads that my toddler would accidentally tap. The ones without ads cost $5-10 per month — a significant barrier for many families. None of them captured the pure joy of keyboard smashing that my child already loved.
          </p>
        </section>

        <section>
          <h2 id="insight" className="text-xl font-semibold text-ink mb-3">The Insight: Keyboard Smashing Is Learning</h2>
          <p className="mb-3">
            The realization that changed everything was simple: <strong className="text-ink/90">toddlers already know how to use keyboards</strong>. They don&apos;t need instructions, tutorials, or onboarding flows. They smash keys. That&apos;s it. And every keypress is a learning opportunity — if you design the response correctly.
          </p>
          <p className="mb-3">
            Child development research supports this. The concept of &quot;cause and effect&quot; learning is fundamental to toddler cognition. Babies as young as 6 months understand that their actions produce results. When they press a key and see a large, colorful letter appear with a pleasant sound, they&apos;re forming neural connections. They&apos;re learning that this shape is called &quot;Ba&quot; and that shape is called &quot;Ta.&quot;
          </p>
          <p>
            This isn&apos;t passive screen time — it&apos;s active, multi-sensory engagement. The child is choosing to press keys (motor activity), seeing the result (visual), and hearing the letter name (auditory). Three learning channels simultaneously, driven by the child&apos;s own curiosity. Research published in the journal &quot;Developmental Psychology&quot; has shown that self-directed exploration leads to significantly better learning outcomes than passive observation.
          </p>
        </section>

        <section>
          <h2 id="prototype" className="text-xl font-semibold text-ink mb-3">Building the First Prototype</h2>
          <p className="mb-3">
            The first version of ArabFingers was built in a weekend. It was embarrassingly simple: a full-screen app that listened for keypresses and showed the corresponding Arabic letter in large text. No animations, no sounds, no themes — just letters.
          </p>
          <p className="mb-3">
            But my son loved it. He would sit at the keyboard and press keys for 10-15 minutes at a time — an eternity in toddler attention spans. Within a week, he was pointing at the letter ب on a book cover and saying &quot;Ba!&quot; He was 20 months old.
          </p>
          <p>
            That moment convinced me this needed to become a real product. Not a commercial product — a free tool that every Arab family could use, regardless of income or location. The Arabic-speaking diaspora spans the entire globe, and these families deserve access to high-quality educational tools without financial barriers.
          </p>
        </section>

        <section>
          <h2 id="design" className="text-xl font-semibold text-ink mb-3">Design Decisions That Shaped ArabFingers</h2>
          <p className="mb-3">
            Every design decision in ArabFingers was guided by one principle: <strong className="text-ink/90">what is best for a 1-3 year old?</strong> This led to some unconventional choices:
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">No navigation, no menus, no buttons</h3>
              <p className="text-ink/75">The play area has zero UI elements. A toddler cannot accidentally navigate away, close the app, or change settings. Every tap and every keypress produces a letter. The entire screen is the toy.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">Hidden parent panel with hold gesture</h3>
              <p className="text-ink/75">Parents access settings by pressing and holding a small corner icon for 2 seconds — a gesture no toddler would discover accidentally. We also added an optional PIN lock for extra safety. This means parents can configure themes, sounds, and keyboard layouts without their child ever seeing a settings screen.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">Bilingual display, always</h3>
              <p className="text-ink/75">Every Arabic letter is shown alongside its English phonetic equivalent. This serves two audiences: Arabic-speaking parents who want their child to learn the Latin equivalents, and English-speaking parents who are learning Arabic alongside their child. Both languages are always visible, normalizing bilingualism from the very first interaction.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">Celebration without competition</h3>
              <p className="text-ink/75">ArabFingers celebrates every keypress with animations and sound, and it celebrates milestones (10 keys, 28 keys, etc.) with confetti and emoji bursts. But there are no scores, no leaderboards, no &quot;you got it wrong&quot; feedback. Every interaction is positive. This builds a love of Arabic letters without anxiety or pressure.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 id="technical" className="text-xl font-semibold text-ink mb-3">The Technical Architecture</h2>
          <p className="mb-3">
            ArabFingers is built as a Progressive Web App (PWA) using Next.js, React, and Three.js. This technology stack was chosen for specific reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 text-ink/75">
            <li><strong className="text-ink/80">PWA</strong> — Installable on any device without an app store, works offline, and updates automatically. Parents don&apos;t need to deal with App Store approvals or Google Play policies.</li>
            <li><strong className="text-ink/80">Next.js</strong> — Server-side rendering ensures the content pages (home, about, learn articles) are fully indexable by search engines, while the interactive play area remains a rich client-side experience.</li>
            <li><strong className="text-ink/80">Three.js</strong> — Powers the 3D floating objects in the background. Each theme (Space, Desert, Jungle, Underwater, Ramadan) has unique 3D models that create an immersive, magical atmosphere for children.</li>
            <li><strong className="text-ink/80">Neural TTS</strong> — Letter pronunciations are generated using high-quality text-to-speech, providing natural-sounding Arabic and English letter names.</li>
          </ul>
          <p className="mt-3">
            The entire app is open-source. We believe educational tools for children should be transparent, auditable, and community-driven. Any parent or educator can inspect the code and verify that it&apos;s safe for their children.
          </p>
        </section>

        <section>
          <h2 id="next" className="text-xl font-semibold text-ink mb-3">What&apos;s Next</h2>
          <p className="mb-3">
            ArabFingers continues to evolve based on feedback from parents and educators. We&apos;re currently exploring:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-ink/75">
            <li>Additional languages (French, Urdu, Turkish) for families in multilingual communities</li>
            <li>More interactive learning modes beyond keyboard smashing</li>
            <li>Printable worksheets and offline activities to complement the digital experience</li>
            <li>Accessibility improvements for children with special needs</li>
          </ul>
          <p className="mt-3">
            If you have ideas or feedback, we&apos;d love to hear from you at <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href={`/en/blog`} className="text-xs text-accent underline">← All blog posts</Link>
        <Link href={`/en/blog/screen-time-guidelines-arabic-learning`} className="text-xs text-accent underline">Screen Time Guidelines →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 Try ArabFingers Now — It&apos;s Free
        </Link>
      </div>
    </>
  );
}

function ContentAr() {
  const tocItems = [
    { id: "ar-problem", text: "المشكلة: تعليم العربية بحاجة لحل" },
    { id: "ar-insight", text: "الرؤية: ضرب المفاتيح هو تعلم" },
    { id: "ar-prototype", text: "بناء النموذج الأولي" },
    { id: "ar-design", text: "قرارات التصميم" },
    { id: "ar-next", text: "ما التالي" },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">كيف بنينا عرب فنجرز: القصة وراء التطبيق</h1>
      <p className="text-base text-ink/75">من إحباط أحد الوالدين إلى أداة مجانية للعائلات حول العالم</p>
      <AuthorBlock isAr />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_how_we_built.png"
          alt="كيف بنينا عرب فنجرز"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <TableOfContents locale="ar" items={tocItems} />

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 id="ar-problem" className="text-xl font-semibold text-ink mb-3">المشكلة: تعليم العربية للأطفال الصغار بحاجة لحل</h2>
          <p className="mb-3">
            إذا كنت والداً في عائلة عربية ثنائية اللغة تعيش خارج العالم العربي، فربما عشت هذه التجربة: تريد لطفلك الصغير أن يتعرض للحروف العربية، لكن كل تطبيق تجده إما منخفض الجودة، أو مليء بالإعلانات المزعجة، أو خلف جدار دفع، أو مصمم لأطفال أكبر سناً. الوضع للأطفال الصغار — من عمر سنة إلى ٣ سنوات الذين لا يستطيعون القراءة بعد — صعب بشكل خاص.
          </p>
          <p className="mb-3">
            عشت هذا بنفسي. كان طفلي عمره ١٨ شهراً ومفتوناً بلوحة المفاتيح. كل مرة يجلس على حضني أثناء عملي، كان يضغط المفاتيح بفرح — مبتهجاً بالحروف التي تظهر على الشاشة. فكرت: ماذا لو أن كل ضغطة أظهرت حرفاً عربياً مع صوته؟ ماذا لو ازدانت الشاشة بالرسوم المتحركة؟ ماذا لو أصبح هذا الفضول الطبيعي بوابة لمحو الأمية العربية؟
          </p>
          <p>
            بحثت عن حلول موجودة. جربت عشرات التطبيقات. بعضها كان بالعربية لكنها افترضت أن الطفل يعرف القراءة مسبقاً. أخرى كان فيها مربعات حروف صغيرة محاطة بإعلانات بانر يضغط عليها طفلي بالخطأ. التطبيقات بدون إعلانات تكلف ٥-١٠ دولارات شهرياً. لم يلتقط أي منها متعة ضرب المفاتيح التي يحبها طفلي بالفعل.
          </p>
        </section>

        <section>
          <h2 id="ar-insight" className="text-xl font-semibold text-ink mb-3">الرؤية: ضرب المفاتيح هو تعلم</h2>
          <p className="mb-3">
            الإدراك الذي غيّر كل شيء كان بسيطاً: <strong className="text-ink/90">الأطفال الصغار يعرفون بالفعل كيف يستخدمون لوحات المفاتيح</strong>. لا يحتاجون تعليمات أو دروس تعريفية. هم يضغطون المفاتيح. هذا كل شيء. وكل ضغطة هي فرصة تعلم — إذا صممت الاستجابة بشكل صحيح.
          </p>
          <p className="mb-3">
            أبحاث تطور الطفل تدعم هذا. مفهوم تعلم &quot;السبب والنتيجة&quot; أساسي لإدراك الأطفال الصغار. الأطفال من عمر ٦ أشهر يفهمون أن أفعالهم تنتج نتائج. عندما يضغطون مفتاحاً ويرون حرفاً كبيراً ملوناً يظهر مع صوت لطيف، هم يُشكّلون اتصالات عصبية.
          </p>
          <p>
            هذا ليس وقت شاشة سلبي — إنه تفاعل نشط متعدد الحواس. الطفل يختار الضغط على المفاتيح (نشاط حركي)، يرى النتيجة (بصري)، ويسمع اسم الحرف (سمعي). ثلاث قنوات تعلم في وقت واحد، مدفوعة بفضول الطفل الخاص.
          </p>
        </section>

        <section>
          <h2 id="ar-prototype" className="text-xl font-semibold text-ink mb-3">بناء النموذج الأولي</h2>
          <p className="mb-3">
            النسخة الأولى من عرب فنجرز بُنيت في عطلة نهاية أسبوع. كانت بسيطة بشكل محرج: تطبيق بملء الشاشة يستمع لضغطات المفاتيح ويُظهر الحرف العربي المقابل بخط كبير. لا رسوم متحركة، لا أصوات، لا ثيمات — فقط حروف.
          </p>
          <p className="mb-3">
            لكن ابني أحبها. كان يجلس عند لوحة المفاتيح ويضغط المفاتيح لمدة ١٠-١٥ دقيقة في كل مرة — أبدية في مقياس انتباه الأطفال الصغار. في غضون أسبوع، كان يشير إلى حرف ب على غلاف كتاب ويقول &quot;با!&quot; كان عمره ٢٠ شهراً.
          </p>
          <p>
            تلك اللحظة أقنعتني أن هذا يحتاج أن يصبح منتجاً حقيقياً. ليس منتجاً تجارياً — أداة مجانية يمكن لكل عائلة عربية استخدامها، بغض النظر عن الدخل أو الموقع.
          </p>
        </section>

        <section>
          <h2 id="ar-design" className="text-xl font-semibold text-ink mb-3">قرارات التصميم التي شكّلت عرب فنجرز</h2>
          <p className="mb-3">
            كل قرار تصميم في عرب فنجرز كان موجّهاً بمبدأ واحد: <strong className="text-ink/90">ما هو الأفضل لطفل عمره ١-٣ سنوات؟</strong>
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">لا تنقل، لا قوائم، لا أزرار</h3>
              <p className="text-ink/75">منطقة اللعب خالية تماماً من عناصر الواجهة. لا يمكن للطفل الانتقال بالخطأ أو إغلاق التطبيق أو تغيير الإعدادات. كل لمسة وكل ضغطة تنتج حرفاً.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">لوحة والدين مخفية بإيماءة ضغط مطول</h3>
              <p className="text-ink/75">يصل الوالدان للإعدادات بالضغط المطول على أيقونة صغيرة في الزاوية لمدة ثانيتين — إيماءة لن يكتشفها أي طفل صغير بالصدفة. أضفنا أيضاً قفل PIN اختياري لأمان إضافي.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">عرض ثنائي اللغة، دائماً</h3>
              <p className="text-ink/75">كل حرف عربي يُعرض بجانب مقابله الصوتي الإنجليزي. هذا يخدم جمهورين: الوالدين الناطقين بالعربية الذين يريدون لطفلهم تعلم المقابلات اللاتينية، والوالدين الناطقين بالإنجليزية الذين يتعلمون العربية مع طفلهم.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="font-semibold text-ink mb-1">احتفال بدون منافسة</h3>
              <p className="text-ink/75">عرب فنجرز يحتفل بكل ضغطة بالرسوم المتحركة والصوت. لكن لا توجد نقاط ولا لوحات متصدرين ولا ردود فعل &quot;أخطأت&quot;. كل تفاعل إيجابي.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 id="ar-next" className="text-xl font-semibold text-ink mb-3">ما التالي</h2>
          <p className="mb-3">
            يستمر عرب فنجرز في التطور بناءً على ملاحظات الوالدين والمعلمين. لم يكن في نيتي يوماً أن أبني &quot;منتجاً&quot; بقدر ما أردت حلّ مشكلة واجهتها بنفسي مع أطفالي، ثم اكتشفت أن آلاف العائلات حول العالم تواجه المشكلة ذاتها. كل رسالة تصلني من أمٍّ أو معلّمٍ تذكّرني لماذا بدأت، وتشكّل ما سيأتي لاحقاً. نستكشف حالياً:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-ink/75">
            <li>لغات إضافية (الفرنسية، الأردية، التركية) للعائلات في المجتمعات متعددة اللغات</li>
            <li>أوضاع تعلم تفاعلية إضافية</li>
            <li>أوراق عمل قابلة للطباعة وأنشطة بدون شاشة</li>
            <li>تحسينات إمكانية الوصول للأطفال ذوي الاحتياجات الخاصة</li>
          </ul>
          <p className="mt-3">
            إذا كانت لديك أفكار أو ملاحظات، نسعد بسماعك على <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/ar/blog" className="text-xs text-accent underline">← جميع المقالات</Link>
        <Link href="/ar/blog/screen-time-guidelines-arabic-learning" className="text-xs text-accent underline">إرشادات وقت الشاشة →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 جرب عرب فنجرز الآن — مجاناً
        </Link>
      </div>
    </>
  );
}
