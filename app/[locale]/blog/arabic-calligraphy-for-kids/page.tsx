import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Arabic Calligraphy for Kids: A Beginner's Introduction | الخط العربي للأطفال",
  description:
    "Introduce your child to Arabic calligraphy. Learn about Naskh, Thuluth, Diwani styles, the history of Arabic calligraphy, and simple activities kids can try at home.",
};

export default async function CalligraphyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <ArticleStructuredData
        title="Arabic Calligraphy for Kids: A Beginner's Introduction"
        description="Introduce your child to the beautiful art of Arabic calligraphy."
        slug="blog/arabic-calligraphy-for-kids"
        locale={locale}
        datePublished="2026-05-12"
        dateModified="2026-05-25"
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: locale === "ar" ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: locale === "ar" ? "الخط العربي" : "Calligraphy" },
        ]}
      />
      {locale === "ar" ? <ContentAr /> : <ContentEn />}
    </PageLayout>
  );
}

function AuthorBlock({ isAr }: { isAr?: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-2 mb-8 text-xs text-white/40">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">A</div>
      <div>
        <Link href={`/${isAr ? "ar" : "en"}/author`} className="text-white/70 font-medium hover:text-accent transition">Aissa Trad</Link>
        <span className="mx-2">·</span>
        <time dateTime="2026-05-12">{isAr ? "١٢ مايو ٢٠٢٦" : "May 12, 2026"}</time>
        <span className="mx-2">·</span>
        <span>{isAr ? "٩ دقائق قراءة" : "9 min read"}</span>
      </div>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-1">Arabic Calligraphy for Kids: A Beginner&apos;s Introduction</h1>
      <p className="text-sm text-white/50">Where language meets art — making Arabic beautiful for young learners</p>
      <AuthorBlock />

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What Is Arabic Calligraphy?</h2>
          <p className="mb-3">
            Arabic calligraphy (الخط العربي — Al-Khatt Al-Arabi) is the art of beautiful writing in Arabic script. It&apos;s one of the most revered art forms in the Islamic world, with a history spanning over 1,400 years. Unlike Western calligraphy, which is often seen as a decorative hobby, Arabic calligraphy has deep spiritual, cultural, and artistic significance.
          </p>
          <p className="mb-3">
            The word &quot;khatt&quot; (خط) literally means &quot;line&quot; in Arabic, reflecting the fundamental role of the flowing line in Arabic writing. Every stroke has rules — thickness, angle, proportion, and rhythm — that calligraphers spend years mastering. The result is writing that is simultaneously legible text and visual art.
          </p>
          <p>
            For children, Arabic calligraphy is a wonderful gateway into Arabic literacy. It transforms the process of learning letters from a chore into a creative adventure. When a child sees that Arabic letters can be made beautiful, they develop a deeper appreciation and curiosity for the language.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Major Calligraphy Styles</h2>
          <p className="mb-3">There are several distinct styles of Arabic calligraphy, each with its own character and historical context:</p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Naskh (نسخ) — The Foundation</h3>
              <p className="text-white/60 mb-2">Naskh is the most commonly used style today. It&apos;s the script you see in printed Arabic books, newspapers, and websites. The name comes from the Arabic word &quot;to copy&quot; (نسخ), because it was the preferred script for copying manuscripts. Naskh is characterized by clear, readable letterforms with gentle curves and balanced proportions.</p>
              <p className="text-white/50 text-xs">Best for beginners — this is the style ArabFingers uses and the style children should learn first.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Thuluth (ثلث) — The Majestic</h3>
              <p className="text-white/60 mb-2">Thuluth means &quot;one-third&quot; — referring to the proportion of the pen nib&apos;s width to the letters. It&apos;s an ornamental script used for mosque decorations, book titles, and monumental inscriptions. Thuluth is characterized by tall, dramatic letterforms with elongated horizontal strokes and elaborate flourishes.</p>
              <p className="text-white/50 text-xs">Children enjoy Thuluth because it looks &quot;fancy&quot; and dramatic — great for understanding Arabic as art.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Diwani (ديواني) — The Elegant</h3>
              <p className="text-white/60 mb-2">Developed during the Ottoman Empire for official correspondence (the &quot;diwan&quot; was the royal court), Diwani is known for its fluid, flowing curves and overlapping letters. It was intentionally designed to be difficult to forge, with no dots or diacritics in its most complex form (Diwani Jali).</p>
              <p className="text-white/50 text-xs">Diwani is visually stunning but challenging — best appreciated by older children and adults.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Kufi (كوفي) — The Geometric</h3>
              <p className="text-white/60 mb-2">The oldest formal Arabic calligraphy style, named after the city of Kufa in Iraq. Kufi is distinguished by its angular, geometric letterforms — straight lines and sharp corners rather than curves. It was originally used for early Quran manuscripts and is still widely used in architectural decoration and logos.</p>
              <p className="text-white/50 text-xs">Kufi&apos;s geometric nature makes it great for children who enjoy drawing with rulers and graph paper.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Why Arabic Calligraphy Is Perfect for Kids</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">It makes Arabic tangible</h3>
              <p className="text-white/60">When children practice calligraphy, they&apos;re not just memorizing abstract shapes — they&apos;re physically creating them. The motor memory of drawing each letter reinforces visual recognition. The hand teaches the eye.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">It develops fine motor skills</h3>
              <p className="text-white/60">The controlled movements required for calligraphy — varying pressure, maintaining angles, creating smooth curves — develop the same fine motor skills children need for everyday writing. It&apos;s handwriting practice disguised as art.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">It builds cultural pride</h3>
              <p className="text-white/60">For children in Arab families, seeing Arabic letters as a form of high art — found in the world&apos;s most beautiful mosques, palaces, and museums — builds pride in their heritage. Arabic isn&apos;t just functional; it&apos;s one of humanity&apos;s most celebrated visual art forms.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">It teaches patience and focus</h3>
              <p className="text-white/60">Calligraphy requires slowing down and paying attention to each stroke. In an age of constant stimulation, this mindful practice helps children develop concentration and attention to detail — skills that benefit every area of learning.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Simple Activities to Try at Home</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🖌️ Finger painting Arabic letters</h3>
              <p className="text-white/60">Spread finger paint on a large sheet and let your child trace Arabic letters with their finger. Start with simple letters like ا (Alef — a straight vertical line) and و (Waw — a simple hook shape). The tactile feedback makes it memorable, and there&apos;s no pressure for perfection.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🏖️ Sand tray writing</h3>
              <p className="text-white/60">Fill a shallow tray with sand or salt. Your child can draw Arabic letters with their finger, a stick, or the back of a paintbrush. The wonderful thing about sand writing is that you can erase and start over with a gentle shake — making it stress-free and endlessly repeatable.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🧁 Edible calligraphy</h3>
              <p className="text-white/60">Use a squeeze bottle of chocolate sauce, icing, or honey to write Arabic letters on a plate or parchment paper. Children love this because they get to eat their work! Start with their name in Arabic or letters they&apos;ve learned in ArabFingers.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">📐 Kufi block letters</h3>
              <p className="text-white/60">Give your child graph paper and colored markers. Help them draw Arabic letters using only straight lines and right angles, mimicking the Kufi style. This is especially fun for children who enjoy building with blocks — it turns Arabic letters into mini architecture projects.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">💧 Water brush calligraphy</h3>
              <p className="text-white/60">On a warm day, give your child a paintbrush and a cup of water. Let them &quot;paint&quot; Arabic letters on the sidewalk, a fence, or a wall. The letters appear dark when wet and disappear as they dry — creating a magical, impermanent canvas that encourages experimentation without fear of mistakes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">From Recognition to Creation</h2>
          <p className="mb-3">
            ArabFingers helps children with the first step: <strong className="text-white/90">letter recognition</strong>. They see the letter shapes, hear the names, and build familiarity through play. Arabic calligraphy activities provide the natural next step: <strong className="text-white/90">letter creation</strong>. When a child recognizes a letter from ArabFingers and then draws that same letter with paint or sand, the connection deepens. They&apos;re not just seeing Arabic — they&apos;re making it.
          </p>
          <p>
            Together, digital recognition and physical creation form a powerful learning cycle. And through calligraphy, your child discovers that Arabic isn&apos;t just a language — it&apos;s one of the world&apos;s greatest art forms.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/en/blog/arabic-alphabet-vs-latin-deep-dive" className="text-xs text-accent underline">← Arabic vs Latin</Link>
        <Link href="/en/blog/ramadan-activities-arabic-learning" className="text-xs text-accent underline">Ramadan Activities →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 Try ArabFingers Now
        </Link>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-1">الخط العربي للأطفال: مقدمة للمبتدئين</h1>
      <p className="text-sm text-white/50">حيث تلتقي اللغة بالفن — جعل العربية جميلة للمتعلمين الصغار</p>
      <AuthorBlock isAr />

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">ما هو الخط العربي؟</h2>
          <p className="mb-3">
            الخط العربي هو فن الكتابة الجميلة بالحرف العربي. إنه واحد من أكثر الفنون تقديراً في العالم الإسلامي، بتاريخ يمتد لأكثر من ١٤٠٠ عام. كلمة &quot;خط&quot; تعني حرفياً &quot;line&quot; بالإنجليزية، مما يعكس الدور الأساسي للخط المتدفق في الكتابة العربية.
          </p>
          <p>
            بالنسبة للأطفال، الخط العربي بوابة رائعة للقراءة والكتابة بالعربية. إنه يحول عملية تعلم الحروف من واجب إلى مغامرة إبداعية. عندما يرى الطفل أن الحروف العربية يمكن أن تكون جميلة، يطور تقديراً أعمق وفضولاً للغة.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">أنماط الخط الرئيسية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">النسخ — الأساس</h3>
              <p className="text-white/60">النسخ هو الأسلوب الأكثر استخداماً اليوم. إنه الخط الذي تراه في الكتب العربية المطبوعة والصحف والمواقع. يتميز بأشكال حروف واضحة ومقروءة مع منحنيات لطيفة ونسب متوازنة. هذا هو الأسلوب الذي يستخدمه عرب فنجرز والذي يجب أن يتعلمه الأطفال أولاً.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">الثلث — المهيب</h3>
              <p className="text-white/60">خط زخرفي يُستخدم لتزيين المساجد وعناوين الكتب والنقوش الضخمة. يتميز بأشكال حروف طويلة ودراماتيكية مع ضربات أفقية ممتدة وزخارف متقنة. الأطفال يستمتعون بالثلث لأنه يبدو &quot;فاخراً&quot; ودراماتيكياً.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">الديواني — الأنيق</h3>
              <p className="text-white/60">طُوّر خلال الإمبراطورية العثمانية للمراسلات الرسمية. معروف بمنحنياته المتدفقة السلسة وحروفه المتداخلة. صُمم عمداً ليكون صعب التزوير.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">الكوفي — الهندسي</h3>
              <p className="text-white/60">أقدم أسلوب خط عربي رسمي، سمي على اسم مدينة الكوفة في العراق. يتميز بأشكال حروف زاوية هندسية — خطوط مستقيمة وزوايا حادة بدلاً من المنحنيات. طبيعة الكوفي الهندسية تجعله رائعاً للأطفال الذين يستمتعون بالرسم بالمساطر وورق الرسم البياني.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">أنشطة بسيطة لتجربتها في المنزل</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🖌️ رسم الحروف العربية بالأصابع</h3>
              <p className="text-white/60">انثر طلاء الأصابع على ورقة كبيرة ودع طفلك يتتبع الحروف العربية بإصبعه. ابدأ بحروف بسيطة مثل ا (ألف) و و (واو). التغذية اللمسية تجعلها لا تُنسى.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🏖️ الكتابة على صينية رمل</h3>
              <p className="text-white/60">املأ صينية ضحلة بالرمل أو الملح. يمكن لطفلك رسم الحروف العربية بإصبعه أو بعصا. الشيء الرائع في الكتابة بالرمل أنه يمكنك المسح والبدء من جديد بهزة لطيفة.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">🧁 خط بالطعام</h3>
              <p className="text-white/60">استخدم زجاجة ضغط من صلصة الشوكولاتة أو العسل لكتابة حروف عربية على طبق. الأطفال يحبون هذا لأنهم يأكلون عملهم! ابدأ باسمهم بالعربية.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">💧 الخط بفرشاة ماء</h3>
              <p className="text-white/60">في يوم دافئ، أعطِ طفلك فرشاة رسم وكوب ماء. دعه &quot;يرسم&quot; حروفاً عربية على الرصيف. الحروف تظهر داكنة عندما تكون رطبة وتختفي عندما تجف — مما يخلق لوحة سحرية تشجع التجريب.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">من التعرف إلى الإبداع</h2>
          <p>
            عرب فنجرز يساعد الأطفال في الخطوة الأولى: التعرف على الحروف. أنشطة الخط العربي توفر الخطوة التالية الطبيعية: إنشاء الحروف. عندما يتعرف الطفل على حرف من عرب فنجرز ثم يرسم نفس الحرف بالطلاء أو الرمل، يتعمق الاتصال. هم لا يرون العربية فحسب — بل يصنعونها. ومن خلال الخط، يكتشف طفلك أن العربية ليست مجرد لغة — إنها واحدة من أعظم أشكال الفن في العالم.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/ar/blog/arabic-alphabet-vs-latin-deep-dive" className="text-xs text-accent underline">← العربية مقابل اللاتينية</Link>
        <Link href="/ar/blog/ramadan-activities-arabic-learning" className="text-xs text-accent underline">أنشطة رمضان →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 جرب عرب فنجرز الآن
        </Link>
      </div>
    </>
  );
}
