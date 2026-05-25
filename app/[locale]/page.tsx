import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import { InteractiveHomeParts } from "@/components/InteractiveHomeParts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar"
      ? "عرب فنجرز — لعبة الحروف العربية للأطفال"
      : "Arab Fingers — Learn Arabic Letters | Arabic Keyboard Smash Toy for Kids",
    description: locale === "ar"
      ? "عرب فنجرز هو تطبيق ولعبة مجانية ثنائية اللغة للأطفال لتعلم الحروف العربية والإنجليزية بالرسوم المتحركة ثلاثية الأبعاد، الأصوات الطبيعية والاحتفالات الممتعة."
      : "Free bilingual Arabic & English keyboard smash toy for toddlers (1-6 yrs). Learn the Arabic alphabet with 3D animations, natural pronunciation, and fun interactive themes.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {/* Whimsical fixed glowing atmospheric auroras for background depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 print:hidden opacity-35">
        <div className="absolute top-[8%] left-[5%] w-80 h-80 rounded-full bg-red-500/8 blur-[90px] animate-float-slow" />
        <div className="absolute top-[35%] right-[8%] w-96 h-96 rounded-full bg-emerald-500/8 blur-[100px] animate-float-medium" />
        <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/8 blur-[110px] animate-float-fast" />
        <div className="absolute top-[65%] left-[45%] w-84 h-84 rounded-full bg-purple-500/6 blur-[90px] animate-float-slowest" />
      </div>

      <div className="relative z-10">
        {locale === "ar" ? <HomeAr /> : <HomeEn />}
      </div>
    </PageLayout>
  );
}

function HomeEn() {
  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎹✨</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          Arab Fingers
        </h1>
        <p className="mt-3 text-lg text-white/60">
          The fun way for kids to learn Arabic letters
        </p>
        <Link
          href="/en/play"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-lg font-semibold text-[#050816] shadow-[0_8px_32px_rgba(159,225,203,0.3)] transition hover:shadow-[0_12px_40px_rgba(159,225,203,0.45)] hover:scale-105"
        >
          🚀 Start Playing
        </Link>
      </div>

      <div className="mb-12">
        <InteractiveHomeParts locale="en" />
      </div>

      {/* What is ArabFingers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          What is ArabFingers?
        </h2>
        <p className="text-sm leading-relaxed text-white/70 mb-3">
          ArabFingers is a free, bilingual keyboard smash toy designed specifically for toddlers and
          pre-schoolers aged 1 to 6 years old. When children press any key on the keyboard or tap
          anywhere on a touch screen, they see a beautiful, large Arabic letter appear on screen with
          its English equivalent displayed side by side.
        </p>
        <p className="text-sm leading-relaxed text-white/70 mb-3">
          Each letter is accompanied by natural-sounding pronunciation in both Arabic and English,
          helping children associate the visual shape of each letter with its correct sound. The app
          features colorful 3D animated floating objects in the background, emoji bursts that explode
          from the point of interaction, and confetti celebrations at milestone key counts.
        </p>
        <p className="text-sm leading-relaxed text-white/70">
          ArabFingers was created for bilingual Arab families who want their children to be exposed to
          the Arabic alphabet in a fun, pressure-free environment. There are no tests, no scores, and
          no wrong answers — just pure sensory joy and letter recognition through play.
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🔤", title: "Full Arabic Alphabet", desc: "All 28 Arabic letters with their English phonetic equivalents displayed in beautiful, large typography." },
            { icon: "🔊", title: "Natural Pronunciation", desc: "High-quality Arabic and English letter name pronunciation using neural text-to-speech voices." },
            { icon: "🎨", title: "5 Visual Themes", desc: "Space, Desert, Jungle, Underwater, and Ramadan — each with unique color palettes and 3D floating objects." },
            { icon: "📱", title: "Touch & Keyboard", desc: "Works with physical keyboards and touch screens. Perfect for tablets, phones, and laptops." },
            { icon: "🔒", title: "Parent Controls", desc: "Hidden parent panel with PIN lock, theme selection, keyboard layout, voice speed, and display options." },
            { icon: "🌍", title: "Bilingual Interface", desc: "Full Arabic and English UI. Switch languages instantly from the parent panel." },
            { icon: "⌨️", title: "Keyboard Layouts", desc: "Supports Arabic Standard (QWERTY), Phonetic, and AZERTY keyboard layouts." },
            { icon: "📲", title: "Installable PWA", desc: "Install as an app on any device — works offline, no app store needed." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
        <div className="space-y-4 text-sm text-white/70 leading-relaxed">
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">1</span>
            <p><strong className="text-white/90">Open the app</strong> — Visit the play page or install ArabFingers as a PWA on your device. The app goes fullscreen automatically for an immersive experience.</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">2</span>
            <p><strong className="text-white/90">Let your child smash keys</strong> — Every keypress or screen tap shows a large Arabic letter with its English equivalent. The letter name is spoken aloud in both languages.</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">3</span>
            <p><strong className="text-white/90">Watch them learn</strong> — Through repetition and sensory feedback, children naturally begin to recognize Arabic letter shapes and associate them with sounds.</p>
          </div>
        </div>
      </section>

      {/* Why Parents Choose ArabFingers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Why Parents Choose ArabFingers
        </h2>
        <div className="space-y-3">
          {[
            { icon: "✅", title: "Zero data collection", desc: "We collect absolutely no personal information. No accounts, no tracking, no analytics. Your child's privacy is non-negotiable." },
            { icon: "💰", title: "100% free, forever", desc: "No subscriptions, no in-app purchases, no premium tiers. Every feature is available to every family, regardless of budget." },
            { icon: "🧠", title: "Research-backed approach", desc: "Built on multi-sensory learning principles and play-based pedagogy supported by decades of child development research." },
            { icon: "🔒", title: "Child-safe play area", desc: "No external links, no navigation, no UI distractions in the play area. The entire screen is a safe, contained learning toy." },
            { icon: "🌍", title: "Built for the Arab diaspora", desc: "Designed specifically for bilingual Arab families worldwide who want their children to connect with their Arabic heritage through play." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start rounded-xl border border-white/8 bg-white/5 p-4">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "What age is ArabFingers for?", a: "ArabFingers is designed for children aged 1 to 6 years old. Toddlers (1-3) enjoy the sensory experience of seeing letters and hearing sounds, while pre-schoolers (4-6) begin to recognize and name the letters." },
            { q: "Is ArabFingers free?", a: "Yes, ArabFingers is completely free to use. There are no in-app purchases, no subscriptions, and no premium features. The app is open-source." },
            { q: "Does it work on tablets and phones?", a: "Yes! ArabFingers works on any device with a web browser — tablets, phones, laptops, and desktops. You can also install it as an app for offline use." },
            { q: "Does my child need to know Arabic already?", a: "Not at all. ArabFingers is designed for complete beginners. Children learn through exposure — seeing the letter shapes and hearing the sounds repeatedly during play." },
            { q: "Is it safe for children?", a: "Absolutely. ArabFingers collects zero personal data, has no ads in the play area, no external links children can click, and the parent panel is protected by a hold gesture and optional PIN lock." },
            { q: "Can I use it offline?", a: "Yes. Install ArabFingers as a PWA (Progressive Web App) and it works without an internet connection. All letter sounds are pre-loaded." },
            { q: "What keyboard layouts are supported?", a: "ArabFingers supports Arabic Standard (QWERTY), Phonetic (intuitive A→ا mapping), and AZERTY layouts. Parents can switch layouts from the settings panel." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <Link
          href="/en/play"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-lg font-semibold text-[#050816] shadow-[0_8px_32px_rgba(159,225,203,0.3)] transition hover:shadow-[0_12px_40px_rgba(159,225,203,0.45)] hover:scale-105"
        >
          🚀 Start Playing Now — It&apos;s Free!
        </Link>
      </div>

      {/* Latest from the Blog */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Latest from the Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/en/blog/how-we-built-arabfingers" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">🛠️ How We Built ArabFingers</h3>
            <p className="text-xs text-white/50">The story behind the app and our mission</p>
          </Link>
          <Link href="/en/blog/screen-time-guidelines-arabic-learning" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📱 Screen Time & Arabic Learning</h3>
            <p className="text-xs text-white/50">Evidence-based guide for parents</p>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/en/learn/arabic-alphabet-guide" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📖 Arabic Alphabet Complete Guide</h3>
            <p className="text-xs text-white/50">Learn all 28 Arabic letters with pronunciation tips</p>
          </Link>
          <Link href="/en/blog" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📝 View All Articles</h3>
            <p className="text-xs text-white/50">Browse our full blog and learning resources</p>
          </Link>
        </div>
      </section>
    </>
  );
}

function HomeAr() {
  return (
    <>
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🎹✨</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
          عرب فنجرز
        </h1>
        <p className="mt-3 text-lg text-white/60">
          الطريقة الممتعة لتعلم الحروف العربية للأطفال
        </p>
        <Link
          href="/ar/play"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-lg font-semibold text-[#050816] shadow-[0_8px_32px_rgba(159,225,203,0.3)] transition hover:shadow-[0_12px_40px_rgba(159,225,203,0.45)] hover:scale-105"
        >
          🚀 ابدأ اللعب
        </Link>
      </div>

      <div className="mb-12">
        <InteractiveHomeParts locale="ar" />
      </div>

      {/* What is ArabFingers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">ما هو عرب فنجرز؟</h2>
        <p className="text-sm leading-relaxed text-white/70 mb-3">
          عرب فنجرز هو لعبة لوحة مفاتيح مجانية ثنائية اللغة مصممة خصيصاً للأطفال الصغار من عمر سنة
          إلى ٦ سنوات. عندما يضغط الأطفال على أي مفتاح في لوحة المفاتيح أو يلمسون أي مكان على الشاشة،
          يظهر حرف عربي كبير وجميل على الشاشة مع مقابله الإنجليزي جنباً إلى جنب.
        </p>
        <p className="text-sm leading-relaxed text-white/70 mb-3">
          كل حرف مصحوب بنطق طبيعي بالعربية والإنجليزية، مما يساعد الأطفال على ربط الشكل المرئي لكل
          حرف بصوته الصحيح. يتميز التطبيق بأشكال ثلاثية الأبعاد متحركة ملونة في الخلفية، وانفجارات
          رموز تعبيرية من نقطة التفاعل، واحتفالات بالقصاصات الملونة عند الوصول لعدد معين من الضغطات.
        </p>
        <p className="text-sm leading-relaxed text-white/70">
          تم إنشاء عرب فنجرز للعائلات العربية ثنائية اللغة التي تريد تعريض أطفالها للأبجدية العربية
          في بيئة ممتعة وخالية من الضغط. لا توجد اختبارات، لا نقاط، ولا إجابات خاطئة — فقط متعة
          حسية خالصة وتعرف على الحروف من خلال اللعب.
        </p>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">المميزات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🔤", title: "الأبجدية العربية كاملة", desc: "جميع الحروف العربية الـ ٢٨ مع مقابلاتها الصوتية الإنجليزية معروضة بخط كبير وجميل." },
            { icon: "🔊", title: "نطق طبيعي", desc: "نطق عالي الجودة لأسماء الحروف بالعربية والإنجليزية باستخدام أصوات ذكاء اصطناعي طبيعية." },
            { icon: "🎨", title: "٥ ثيمات بصرية", desc: "الفضاء، الصحراء، الغابة، تحت الماء، ورمضان — كل منها بألوان فريدة وأشكال ثلاثية الأبعاد." },
            { icon: "📱", title: "لمس ولوحة مفاتيح", desc: "يعمل مع لوحات المفاتيح الفعلية وشاشات اللمس. مثالي للأجهزة اللوحية والهواتف والحواسيب." },
            { icon: "🔒", title: "تحكم أبوي", desc: "لوحة تحكم مخفية للوالدين مع قفل PIN واختيار الثيم وتخطيط لوحة المفاتيح وسرعة الصوت." },
            { icon: "🌍", title: "واجهة ثنائية اللغة", desc: "واجهة كاملة بالعربية والإنجليزية. بدّل اللغات فوراً من لوحة الوالدين." },
            { icon: "⌨️", title: "تخطيطات لوحة المفاتيح", desc: "يدعم التخطيط العربي القياسي (QWERTY) والصوتي و AZERTY." },
            { icon: "📲", title: "تطبيق قابل للتثبيت", desc: "ثبّته كتطبيق على أي جهاز — يعمل بدون إنترنت، لا حاجة لمتجر التطبيقات." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">كيف يعمل</h2>
        <div className="space-y-4 text-sm text-white/70 leading-relaxed">
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">١</span>
            <p><strong className="text-white/90">افتح التطبيق</strong> — زر صفحة اللعب أو ثبّت عرب فنجرز كتطبيق على جهازك. يدخل التطبيق وضع ملء الشاشة تلقائياً لتجربة غامرة.</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">٢</span>
            <p><strong className="text-white/90">دع طفلك يضغط المفاتيح</strong> — كل ضغطة أو لمسة تُظهر حرفاً عربياً كبيراً مع مقابله الإنجليزي. يُنطق اسم الحرف بصوت عالٍ بكلتا اللغتين.</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-bold">٣</span>
            <p><strong className="text-white/90">شاهدهم يتعلمون</strong> — من خلال التكرار والتغذية الحسية، يبدأ الأطفال بشكل طبيعي في التعرف على أشكال الحروف العربية وربطها بالأصوات.</p>
          </div>
        </div>
      </section>

      {/* Why Parents Choose ArabFingers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">لماذا يختار الوالدون عرب فنجرز</h2>
        <div className="space-y-3">
          {[
            { icon: "✅", title: "صفر جمع بيانات", desc: "لا نجمع أي معلومات شخصية على الإطلاق. لا حسابات، لا تتبع، لا تحليلات. خصوصية طفلك غير قابلة للتفاوض." },
            { icon: "💰", title: "مجاني ١٠٠٪ إلى الأبد", desc: "لا اشتراكات، لا مشتريات داخل التطبيق، لا مستويات مدفوعة. كل ميزة متاحة لكل عائلة." },
            { icon: "🧠", title: "نهج مبني على الأبحاث", desc: "مبني على مبادئ التعلم متعدد الحواس والتعليم القائم على اللعب المدعوم بعقود من أبحاث تطور الطفل." },
            { icon: "🔒", title: "منطقة لعب آمنة", desc: "لا روابط خارجية، لا تنقل، لا مشتتات واجهة في منطقة اللعب. الشاشة بأكملها لعبة تعليمية آمنة." },
            { icon: "🌍", title: "مصمم للشتات العربي", desc: "مصمم خصيصاً للعائلات العربية ثنائية اللغة حول العالم الذين يريدون لأطفالهم التواصل مع تراثهم العربي من خلال اللعب." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start rounded-xl border border-white/8 bg-white/5 p-4">
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          {[
            { q: "لأي عمر مصمم عرب فنجرز؟", a: "عرب فنجرز مصمم للأطفال من عمر سنة إلى ٦ سنوات. الأطفال الصغار (١-٣) يستمتعون بالتجربة الحسية لرؤية الحروف وسماع الأصوات، بينما أطفال ما قبل المدرسة (٤-٦) يبدأون في التعرف على الحروف وتسميتها." },
            { q: "هل عرب فنجرز مجاني؟", a: "نعم، عرب فنجرز مجاني تماماً. لا توجد مشتريات داخل التطبيق، لا اشتراكات، ولا ميزات مدفوعة. التطبيق مفتوح المصدر." },
            { q: "هل يعمل على الأجهزة اللوحية والهواتف؟", a: "نعم! يعمل عرب فنجرز على أي جهاز يحتوي على متصفح ويب — أجهزة لوحية، هواتف، حواسيب محمولة، وحواسيب مكتبية. يمكنك أيضاً تثبيته كتطبيق للاستخدام بدون إنترنت." },
            { q: "هل يحتاج طفلي لمعرفة العربية مسبقاً؟", a: "لا على الإطلاق. عرب فنجرز مصمم للمبتدئين تماماً. يتعلم الأطفال من خلال التعرض — رؤية أشكال الحروف وسماع الأصوات بشكل متكرر أثناء اللعب." },
            { q: "هل هو آمن للأطفال؟", a: "بالتأكيد. عرب فنجرز لا يجمع أي بيانات شخصية، لا إعلانات في منطقة اللعب، لا روابط خارجية يمكن للأطفال النقر عليها، ولوحة الوالدين محمية بإيماءة ضغط مطول وقفل PIN اختياري." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8">
        <Link
          href="/ar/play"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-lg font-semibold text-[#050816] shadow-[0_8px_32px_rgba(159,225,203,0.3)] transition hover:shadow-[0_12px_40px_rgba(159,225,203,0.45)] hover:scale-105"
        >
          🚀 ابدأ اللعب الآن — مجاناً!
        </Link>
      </div>

      {/* Latest from the Blog */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">آخر المقالات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/ar/blog/how-we-built-arabfingers" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">🛠️ كيف بنينا عرب فنجرز</h3>
            <p className="text-xs text-white/50">القصة وراء التطبيق ومهمتنا</p>
          </Link>
          <Link href="/ar/blog/screen-time-guidelines-arabic-learning" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📱 وقت الشاشة وتعلم العربية</h3>
            <p className="text-xs text-white/50">دليل مبني على الأدلة للوالدين</p>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/ar/learn/arabic-alphabet-guide" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📖 دليل الأبجدية العربية الكامل</h3>
            <p className="text-xs text-white/50">تعلم جميع الحروف العربية الـ ٢٨ مع نصائح النطق</p>
          </Link>
          <Link href="/ar/blog" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📝 عرض جميع المقالات</h3>
            <p className="text-xs text-white/50">تصفح مدونتنا الكاملة وموارد التعلم</p>
          </Link>
        </div>
      </section>
    </>
  );
}
