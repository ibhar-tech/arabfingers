import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/about", {
    titleEn: "About Arab Fingers — Our Mission & Method",
    titleAr: "عن عرب فنجرز — مهمتنا ومنهجنا",
    descriptionEn:
      "Arab Fingers is a free, open-source bilingual Arabic & English keyboard smash toy for toddlers aged 1–6. Learn about our mission, methodology, and child safety commitment.",
    descriptionAr:
      "عرب فنجرز هو لعبة لوحة مفاتيح مجانية ومفتوحة المصدر ثنائية اللغة بالعربية والإنجليزية للأطفال من عمر سنة إلى ٦ سنوات. تعرّف على مهمتنا ومنهجنا التعليمي والتزامنا بسلامة الأطفال.",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <Breadcrumbs
        locale={locale}
        crumbs={[{ label: locale === "ar" ? "عن الموقع" : "About", href: `/${locale}/about` }]}
      />
      {locale === "ar" ? <AboutAr /> : <AboutEn />}
    </PageLayout>
  );
}

function AboutEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink font-display">About ArabFingers</h1>
      <p className="mt-1 text-sm text-ink/50">The fun way for kids to discover the Arabic alphabet</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Our Mission</h2>
          <p className="mb-3">
            ArabFingers was born from a simple observation: millions of children in bilingual Arab families around
            the world are growing up without meaningful exposure to the Arabic alphabet. Parents want their children
            to learn Arabic, but finding age-appropriate, engaging tools for toddlers is surprisingly difficult.
          </p>
          <p>
            Our mission is to make Arabic letter recognition as natural and joyful as playing with toys. We believe
            that the foundation for Arabic literacy should be built through play, not pressure — and that every child
            deserves free access to high-quality educational tools regardless of their family&apos;s financial situation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">What is ArabFingers?</h2>
          <p className="mb-3">
            ArabFingers is a free, bilingual (Arabic &amp; English) keyboard smash toy designed specifically for toddlers
            and pre-schoolers aged 1 to 6. When kids press any key on the keyboard or tap the screen, they see beautiful
            animated Arabic letters with natural pronunciation, 3D floating objects, emoji bursts, and confetti celebrations.
          </p>
          <p>
            The app is built as a Progressive Web App (PWA), which means it can be installed on any device — phones,
            tablets, laptops, and desktops — without going through an app store. It works offline, loads instantly,
            and takes up minimal storage space.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Our Educational Approach</h2>
          <p className="mb-3">
            ArabFingers is built on the principle of play-based learning, supported by decades of child development
            research. Our approach follows three core ideas:
          </p>
          <div className="space-y-3">
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Multi-Sensory Learning</h3>
              <p className="text-ink/80">Children learn best when multiple senses are engaged simultaneously. ArabFingers combines visual (seeing the letter shape), auditory (hearing the letter name), and kinesthetic (pressing keys or tapping) input to create stronger neural connections and better retention.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Repetition Through Joy</h3>
              <p className="text-ink/80">Letter recognition requires repeated exposure. Instead of drilling, ArabFingers makes each interaction rewarding with animations, sounds, and celebrations. Children naturally repeat activities they enjoy, and each repetition reinforces letter recognition without feeling like work.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Zero Pressure Environment</h3>
              <p className="text-ink/80">There are no tests, no scores, no wrong answers, and no failure states in ArabFingers. Every interaction produces a positive response. This pressure-free design builds positive associations with Arabic and encourages children to explore freely.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Full 28-letter Arabic alphabet with natural pronunciation</li>
            <li>Bilingual display — Arabic and English side by side</li>
            <li>High-quality letter pronunciation using neural text-to-speech</li>
            <li>3D animated floating objects background</li>
            <li>5 visual themes: Space, Desert, Jungle, Underwater, Ramadan</li>
            <li>Keyboard and touch screen support</li>
            <li>Multiple keyboard layouts: Standard QWERTY, Phonetic, AZERTY</li>
            <li>Parent control panel with PIN lock</li>
            <li>Guided mode for sequential alphabet learning</li>
            <li>Session summary showing letters practiced</li>
            <li>Installable as a PWA on mobile and desktop</li>
            <li>Works offline — all sounds pre-loaded</li>
            <li>Child-safe — no data collection, no tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Who Is It For?</h2>
          <div className="space-y-3">
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Toddlers (Ages 1–3)</h3>
              <p className="text-ink/80">At this age, children enjoy the sensory experience — pressing keys and seeing colorful, animated responses. They&apos;re building familiarity with Arabic letter shapes and sounds through cause-and-effect play.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Pre-Schoolers (Ages 4–6)</h3>
              <p className="text-ink/80">Older children begin recognizing and naming letters, matching Arabic letters to their English equivalents, and engaging with the guided mode for sequential learning.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Bilingual Families</h3>
              <p className="text-ink/80">Families who speak Arabic at home and want their children to see Arabic and English as equal, natural parts of their world.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">Parents &amp; Educators</h3>
              <p className="text-ink/80">Adults looking for a safe, ad-free play area with parental controls, or teachers seeking a classroom-friendly Arabic introduction tool.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Child Safety Commitment</h2>
          <p className="mb-3">
            ArabFingers is designed with children&apos;s safety as the top priority. We take the following measures
            to ensure a safe experience:
          </p>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong className="text-ink/85">Zero data collection</strong> — We collect no personal information whatsoever</li>
            <li><strong className="text-ink/85">No accounts or login</strong> — No registration required to use the app</li>
            <li><strong className="text-ink/85">No external links in play area</strong> — Children cannot accidentally navigate away</li>
            <li><strong className="text-ink/85">Parent-controlled settings</strong> — All configuration is behind a PIN-protected panel</li>
            <li><strong className="text-ink/85">No social features</strong> — No chat, no sharing, no user-generated content</li>
            <li><strong className="text-ink/85">COPPA-aware design</strong> — Built with children&apos;s privacy regulations in mind</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Open Source</h2>
          <p>
            ArabFingers is open-source software. We believe educational tools should be transparent, auditable,
            and community-driven. The source code is publicly available, and we welcome contributions from
            developers, educators, and designers who share our mission of making Arabic learning accessible to all children.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Who&apos;s Behind Arab Fingers</h2>
          <p className="mb-3">
            Arab Fingers is built and maintained by{" "}
            <Link href="/en/author" className="text-accent underline">Aissa Trad</Link>, a parent and
            developer who created it after struggling to find a simple, child-safe way to introduce his own
            child to the Arabic alphabet. It is an independent, self-funded project — not backed by any
            company or institution.
          </p>
          <p>
            The learning guides on this site are written from a parent&apos;s perspective and grounded in
            publicly available child-development research, not claimed academic or teaching credentials.
            Each guide shows a published and last-updated date, and we revise articles when we learn
            something new or a reader sends a correction. If you spot an error, please{" "}
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">tell us</a> — we&apos;ll fix it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">Contact</h2>
          <p>
            Questions, feedback, or partnership inquiries? Reach out at{" "}
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>

      <div className="text-center py-8">
        <Link href="/en/play" className="btn-chunky px-6 py-3 text-base">
          🚀 Try ArabFingers Now — It&apos;s Free
        </Link>
      </div>
    </>
  );
}

function AboutAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink font-display">عن عرب فنجرز</h1>
      <p className="mt-1 text-sm text-ink/50">الطريقة الممتعة للأطفال لاكتشاف الأبجدية العربية</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">مهمتنا</h2>
          <p className="mb-3">
            وُلد عرب فنجرز من ملاحظة بسيطة: ملايين الأطفال في العائلات العربية ثنائية اللغة حول العالم ينشأون
            بدون تعرض حقيقي للأبجدية العربية. الآباء يريدون لأطفالهم تعلم العربية، لكن إيجاد أدوات مناسبة
            للعمر وجذابة للأطفال الصغار أمر صعب بشكل مفاجئ.
          </p>
          <p>
            مهمتنا هي جعل التعرف على الحروف العربية طبيعياً وممتعاً كاللعب بالألعاب. نؤمن بأن أساس محو
            الأمية العربية يجب أن يُبنى من خلال اللعب وليس الضغط — وأن كل طفل يستحق الوصول المجاني
            لأدوات تعليمية عالية الجودة بغض النظر عن الوضع المالي لعائلته.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">ما هو عرب فنجرز؟</h2>
          <p className="mb-3">
            عرب فنجرز هو لعبة لوحة مفاتيح مجانية ثنائية اللغة (عربي وإنجليزي) مصممة خصيصاً للأطفال الصغار
            من عمر ١ إلى ٦ سنوات. عندما يضغط الأطفال على أي مفتاح أو يلمسون الشاشة، يرون حروفاً عربية
            متحركة جميلة مع نطق طبيعي وأشكال ثلاثية الأبعاد عائمة ورموز تعبيرية واحتفالات بالقصاصات الملونة.
          </p>
          <p>
            التطبيق مبني كتطبيق ويب تقدمي (PWA)، مما يعني أنه يمكن تثبيته على أي جهاز — هواتف وأجهزة
            لوحية وحواسيب محمولة ومكتبية — بدون الحاجة لمتجر تطبيقات. يعمل بدون إنترنت ويتم تحميله فوراً.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">منهجنا التعليمي</h2>
          <p className="mb-3">
            عرب فنجرز مبني على مبدأ التعلم القائم على اللعب، المدعوم بعقود من أبحاث تطور الطفل:
          </p>
          <div className="space-y-3">
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">تعلم متعدد الحواس</h3>
              <p className="text-ink/80">الأطفال يتعلمون أفضل عندما يتم إشراك حواس متعددة في وقت واحد. عرب فنجرز يجمع بين المدخلات البصرية والسمعية والحركية لإنشاء اتصالات عصبية أقوى.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">التكرار من خلال الفرح</h3>
              <p className="text-ink/80">التعرف على الحروف يتطلب تعرضاً متكرراً. بدلاً من التلقين، يجعل عرب فنجرز كل تفاعل مكافئاً بالرسوم المتحركة والأصوات والاحتفالات.</p>
            </div>
            <div className="card-stock p-4">
              <h3 className="font-semibold text-ink mb-1 font-display">بيئة بدون ضغط</h3>
              <p className="text-ink/80">لا اختبارات ولا درجات ولا إجابات خاطئة ولا حالات فشل. كل تفاعل ينتج استجابة إيجابية. هذا التصميم يبني ارتباطات إيجابية مع العربية.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">المميزات</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>الأبجدية العربية كاملة ٢٨ حرفاً مع نطق طبيعي</li>
            <li>عرض ثنائي اللغة — العربية والإنجليزية جنباً إلى جنب</li>
            <li>نطق عالي الجودة باستخدام تحويل النص إلى كلام العصبي</li>
            <li>خلفية أشكال ثلاثية الأبعاد متحركة</li>
            <li>٥ ثيمات بصرية: الفضاء، الصحراء، الغابة، تحت الماء، رمضان</li>
            <li>دعم لوحة المفاتيح وشاشة اللمس</li>
            <li>تخطيطات لوحة مفاتيح متعددة: قياسي، صوتي، AZERTY</li>
            <li>لوحة تحكم للوالدين مع قفل PIN</li>
            <li>وضع موجّه لتعلم الأبجدية بالترتيب</li>
            <li>ملخص الجلسة يُظهر الحروف التي تم التدرب عليها</li>
            <li>قابل للتثبيت كتطبيق على الهاتف وسطح المكتب</li>
            <li>يعمل بدون إنترنت</li>
            <li>آمن للأطفال — لا جمع بيانات، لا تتبع</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">التزامنا بسلامة الأطفال</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong className="text-ink/85">صفر جمع بيانات</strong> — لا نجمع أي معلومات شخصية</li>
            <li><strong className="text-ink/85">لا حسابات أو تسجيل دخول</strong> — لا يلزم التسجيل</li>
            <li><strong className="text-ink/85">لا روابط خارجية في منطقة اللعب</strong> — لا يمكن للأطفال الانتقال بالخطأ</li>
            <li><strong className="text-ink/85">إعدادات يتحكم فيها الوالدين</strong> — كل الإعدادات خلف لوحة محمية</li>
            <li><strong className="text-ink/85">تصميم متوافق مع COPPA</strong> — مبني مع مراعاة لوائح خصوصية الأطفال</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">من يقف وراء عرب فنجرز</h2>
          <p className="mb-3">
            عرب فنجرز من بناء وصيانة{" "}
            <Link href="/ar/author" className="text-accent underline">عيسى تراد</Link>، أب ومطوّر
            أنشأه بعد معاناته في إيجاد طريقة بسيطة وآمنة لتعريف طفله بالأبجدية العربية.
            إنه مشروع مستقل ممول ذاتياً — غير مدعوم من أي شركة أو مؤسسة.
          </p>
          <p>
            الأدلة التعليمية على هذا الموقع مكتوبة من منظور أحد الوالدين ومستندة إلى مصادر تطور الطفل
            المتاحة للعموم، وليست ادعاءً بشهادات أكاديمية أو تدريسية. يعرض كل دليل تاريخ النشر وآخر
            تحديث، ونراجع المقالات عندما نتعلم شيئاً جديداً أو يصلنا تصحيح من القرّاء. إن وجدت خطأً،{" "}
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">أخبرنا</a> وسنصلحه.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink font-display">تواصل معنا</h2>
          <p>
            أسئلة أو ملاحظات؟ تواصل معنا على{" "}
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>

      <div className="text-center py-8">
        <Link href="/ar/play" className="btn-chunky px-6 py-3 text-base">
          🚀 جرب عرب فنجرز الآن — مجاناً
        </Link>
      </div>
    </>
  );
}
