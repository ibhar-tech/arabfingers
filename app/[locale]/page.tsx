import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "ArabFingers — Learn Arabic Letters | تعلم الحروف العربية",
  description:
    "Free bilingual Arabic & English keyboard smash toy for toddlers. Learn the Arabic alphabet with 3D animations, natural pronunciation, and fun themes.",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <HomeAr /> : <HomeEn />}
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
          ArabFingers
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

      {/* Arabic Alphabet Reference */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          The Arabic Alphabet
        </h2>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          The Arabic alphabet consists of 28 letters, written from right to left. Each letter has
          a unique shape that can change depending on its position in a word. ArabFingers teaches
          children to recognize the isolated form of each letter — the foundation for reading Arabic.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {[
            { ar: "ا", en: "A" }, { ar: "ب", en: "B" }, { ar: "ت", en: "T" }, { ar: "ث", en: "TH" },
            { ar: "ج", en: "J" }, { ar: "ح", en: "H" }, { ar: "خ", en: "KH" }, { ar: "د", en: "D" },
            { ar: "ذ", en: "DH" }, { ar: "ر", en: "R" }, { ar: "ز", en: "Z" }, { ar: "س", en: "S" },
            { ar: "ش", en: "SH" }, { ar: "ص", en: "SS" }, { ar: "ض", en: "DD" }, { ar: "ط", en: "TT" },
            { ar: "ظ", en: "ZZ" }, { ar: "ع", en: "A'" }, { ar: "غ", en: "GH" }, { ar: "ف", en: "F" },
            { ar: "ق", en: "Q" }, { ar: "ك", en: "K" }, { ar: "ل", en: "L" }, { ar: "م", en: "M" },
            { ar: "ن", en: "N" }, { ar: "ه", en: "Ha" }, { ar: "و", en: "W" }, { ar: "ي", en: "Y" },
          ].map((l) => (
            <div key={l.ar} className="flex flex-col items-center rounded-lg border border-white/8 bg-white/5 py-3">
              <span className="text-2xl text-white" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.ar}</span>
              <span className="text-[10px] text-white/40 mt-1">{l.en}</span>
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

      {/* Learn more links */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Learn More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/en/learn/arabic-alphabet-guide" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📖 Arabic Alphabet Complete Guide</h3>
            <p className="text-xs text-white/50">Learn all 28 Arabic letters with pronunciation tips</p>
          </Link>
          <Link href="/en/learn/teaching-arabic-to-kids" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">👶 Teaching Arabic to Kids</h3>
            <p className="text-xs text-white/50">Tips and strategies for parents and educators</p>
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

      {/* Arabic Alphabet Reference */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">الأبجدية العربية</h2>
        <p className="text-sm text-white/70 leading-relaxed mb-4">
          تتكون الأبجدية العربية من ٢٨ حرفاً، تُكتب من اليمين إلى اليسار. لكل حرف شكل فريد يمكن
          أن يتغير حسب موقعه في الكلمة. يُعلّم عرب فنجرز الأطفال التعرف على الشكل المنفصل لكل
          حرف — وهو الأساس لقراءة العربية.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {[
            { ar: "ا", en: "A" }, { ar: "ب", en: "B" }, { ar: "ت", en: "T" }, { ar: "ث", en: "TH" },
            { ar: "ج", en: "J" }, { ar: "ح", en: "H" }, { ar: "خ", en: "KH" }, { ar: "د", en: "D" },
            { ar: "ذ", en: "DH" }, { ar: "ر", en: "R" }, { ar: "ز", en: "Z" }, { ar: "س", en: "S" },
            { ar: "ش", en: "SH" }, { ar: "ص", en: "SS" }, { ar: "ض", en: "DD" }, { ar: "ط", en: "TT" },
            { ar: "ظ", en: "ZZ" }, { ar: "ع", en: "A'" }, { ar: "غ", en: "GH" }, { ar: "ف", en: "F" },
            { ar: "ق", en: "Q" }, { ar: "ك", en: "K" }, { ar: "ل", en: "L" }, { ar: "م", en: "M" },
            { ar: "ن", en: "N" }, { ar: "ه", en: "Ha" }, { ar: "و", en: "W" }, { ar: "ي", en: "Y" },
          ].map((l) => (
            <div key={l.ar} className="flex flex-col items-center rounded-lg border border-white/8 bg-white/5 py-3">
              <span className="text-2xl text-white" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{l.ar}</span>
              <span className="text-[10px] text-white/40 mt-1">{l.en}</span>
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

      {/* Learn more links */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">تعلم المزيد</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/ar/learn/arabic-alphabet-guide" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">📖 دليل الأبجدية العربية الكامل</h3>
            <p className="text-xs text-white/50">تعلم جميع الحروف العربية الـ ٢٨ مع نصائح النطق</p>
          </Link>
          <Link href="/ar/learn/teaching-arabic-to-kids" className="rounded-xl border border-white/8 bg-white/5 p-4 transition hover:bg-white/8">
            <h3 className="text-sm font-semibold text-white mb-1">👶 تعليم العربية للأطفال</h3>
            <p className="text-xs text-white/50">نصائح واستراتيجيات للوالدين والمعلمين</p>
          </Link>
        </div>
      </section>
    </>
  );
}
