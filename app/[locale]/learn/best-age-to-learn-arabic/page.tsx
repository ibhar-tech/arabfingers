import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Best Age to Start Teaching Arabic | أفضل عمر لبدء تعليم العربية",
  description:
    "Research-backed guidance on when to introduce Arabic to children. Learn about critical language acquisition periods and age-appropriate strategies for teaching Arabic letters.",
};

export default async function BestAgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Best Age to Start Teaching Arabic"
        description="What research and experience say about the best age to start teaching Arabic to children, and what to expect at each stage."
        slug="learn/best-age-to-learn-arabic"
        datePublished="2026-04-23"
        dateModified="2026-05-22"
        section="Parenting"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "أفضل عمر" : "Best Age" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}
      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "ابدأ التعلم الآن" : "Start Learning Now"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">What&apos;s the Best Age to Start Teaching Arabic?</h1>
      <p className="text-sm text-white/50 mb-8">Research-backed guidance for parents and educators</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Short Answer: As Early as Possible</h2>
          <p className="mb-3">Language researchers agree: there is no &quot;too early&quot; when it comes to language exposure. Babies begin processing language sounds from birth — and possibly even before birth in the womb. The earlier a child is exposed to Arabic sounds and letter shapes, the more naturally they will acquire the language.</p>
          <p>However, &quot;teaching&quot; Arabic to a one-year-old looks very different from teaching it to a five-year-old. The key is matching your approach to your child&apos;s developmental stage. This guide breaks down what to expect and how to approach Arabic learning at each age.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Critical Period for Language Learning</h2>
          <p className="mb-3">Neuroscience research has identified a &quot;critical period&quot; for language acquisition that extends roughly from birth to age 7. During this window, the brain is extraordinarily receptive to new language input. Children can distinguish phonetic differences that adults struggle to hear, and they can acquire native-like pronunciation with minimal effort.</p>
          <p className="mb-3">After approximately age 7, the brain begins &quot;pruning&quot; neural connections for sounds it doesn&apos;t regularly hear. This doesn&apos;t mean older children can&apos;t learn Arabic — they absolutely can — but the process becomes more effortful and accent-free pronunciation becomes harder to achieve.</p>
          <p>This is why tools like ArabFingers are designed for the 1-6 age range. Every exposure to Arabic letter sounds during this period builds neural pathways that make formal Arabic education significantly easier later.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Age-by-Age Guide</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 0-1: Sound Exposure</h3>
              <p className="text-white/60 mb-2">At this age, babies are absorbing the sounds of their environment. They can&apos;t produce language yet, but they&apos;re building a sound library in their brain. Every Arabic conversation, song, or Quran recitation they hear is building neural connections.</p>
              <p className="text-white/60"><strong className="text-white/80">What to do:</strong> Speak Arabic around your baby. Play Arabic nursery rhymes and songs. Read Arabic board books aloud, even if they can&apos;t understand the words yet. The rhythm and sounds of Arabic are what matters at this stage.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 1-2: Sensory Exploration</h3>
              <p className="text-white/60 mb-2">Toddlers learn through cause-and-effect interactions. They love pressing buttons and seeing things happen. This is the perfect age for ArabFingers — the keyboard smash format lets them explore Arabic letters through play without any expectations or pressure.</p>
              <p className="text-white/60"><strong className="text-white/80">What to do:</strong> Let your child play with ArabFingers freely. Don&apos;t quiz them or ask them to identify letters. Simply let them enjoy the sensory experience of seeing colorful letters and hearing Arabic sounds. Name letters casually as they appear: &quot;Oh, that&apos;s Ba!&quot;</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 2-4: Recognition Begins</h3>
              <p className="text-white/60 mb-2">This is when children start recognizing and naming familiar shapes, including letters. They may begin saying letter names, identifying letters they&apos;ve seen repeatedly, and showing favorites. &quot;I want to find the ب!&quot; is a wonderful sign of emerging literacy.</p>
              <p className="text-white/60"><strong className="text-white/80">What to do:</strong> Continue casual play with ArabFingers. Start pointing out Arabic letters in the environment — on food packages, street signs, and book covers. Sing the Arabic alphabet song. Introduce Arabic letter puzzles and magnetic letters for tactile learning.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 4-6: Active Learning</h3>
              <p className="text-white/60 mb-2">Pre-schoolers can engage in more structured learning. They can name most letters, understand that letters represent sounds, begin connecting letters to words, and start tracing letter shapes. This is when formal Arabic letter instruction can begin alongside continued play.</p>
              <p className="text-white/60"><strong className="text-white/80">What to do:</strong> Use ArabFingers guided mode for sequential letter practice. Introduce writing practice — tracing Arabic letters in sand, salt trays, or on paper. Read simple Arabic words together. Start a structured Arabic curriculum if desired, but keep play as the primary mode of learning.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 6+: Reading Readiness</h3>
              <p className="text-white/60 mb-2">Children who had early exposure to Arabic are now ready for reading instruction. They can recognize most letters in their various forms, understand how letters connect in words, begin reading simple words and short sentences, and start learning diacritics (harakat) for proper pronunciation.</p>
              <p className="text-white/60"><strong className="text-white/80">What to do:</strong> Transition to reading-focused Arabic programs. Continue using ArabFingers for fun review and reinforcement. Read Arabic children&apos;s books together daily. Consider formal Arabic classes or tutoring.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Common Concerns</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">&quot;Won&apos;t two writing systems confuse my child?&quot;</h3>
              <p className="text-white/60">No. Research consistently shows that bilingual children do not get confused by multiple writing systems. They develop separate &quot;tracks&quot; for each language and switch between them naturally. Temporary mixing (writing some Arabic letters backwards or inserting English letters into Arabic) is normal and resolves naturally.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">&quot;My child only speaks English at home. Is it too late?&quot;</h3>
              <p className="text-white/60">It&apos;s never too late to start. While earlier is better for pronunciation, children can begin learning Arabic letters at any age. Even starting at 5 or 6 — with tools like ArabFingers for letter recognition — gives them a strong foundation before formal Arabic instruction.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">&quot;How much time per day is needed?&quot;</h3>
              <p className="text-white/60">For toddlers: 5-10 minutes of play per day is plenty. For pre-schoolers: 15-20 minutes combining play and structured activities. Consistency matters more than duration. Five minutes every day is far more effective than an hour once a week.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Bottom Line</h2>
          <p>The best time to start teaching Arabic is now — whatever your child&apos;s age. For babies and toddlers, that means sound exposure through conversation and play. For pre-schoolers, it means interactive letter recognition through tools like ArabFingers combined with environmental exposure. The foundation you build in these early years will make Arabic literacy dramatically easier when formal instruction begins.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">ما هو أفضل عمر لبدء تعليم العربية؟</h1>
      <p className="text-sm text-white/50 mb-8">إرشادات مدعومة بالأبحاث للوالدين والمعلمين</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الإجابة القصيرة: في أقرب وقت ممكن</h2>
          <p className="mb-3">يتفق الباحثون في مجال اللغة: لا يوجد &quot;مبكر جداً&quot; عندما يتعلق الأمر بالتعرض للغة. يبدأ الأطفال في معالجة أصوات اللغة منذ الولادة — وربما حتى قبل الولادة في الرحم. كلما تعرض الطفل للأصوات العربية وأشكال الحروف مبكراً، كلما اكتسب اللغة بشكل أكثر طبيعية.</p>
          <p>لكن &quot;تعليم&quot; العربية لطفل عمره سنة يبدو مختلفاً جداً عن تعليمها لطفل عمره خمس سنوات. المفتاح هو مطابقة أسلوبك مع المرحلة التطورية لطفلك.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الفترة الحرجة لتعلم اللغة</h2>
          <p className="mb-3">حددت أبحاث علم الأعصاب &quot;فترة حرجة&quot; لاكتساب اللغة تمتد تقريباً من الولادة إلى سن السابعة. خلال هذه النافذة، يكون الدماغ مستقبلاً بشكل استثنائي للمدخلات اللغوية الجديدة. يمكن للأطفال تمييز الفروقات الصوتية التي يجد الكبار صعوبة في سماعها، ويمكنهم اكتساب نطق شبيه بالمتحدثين الأصليين بأقل جهد.</p>
          <p>بعد سن السابعة تقريباً، يبدأ الدماغ في &quot;تقليم&quot; الاتصالات العصبية للأصوات التي لا يسمعها بانتظام. هذا لا يعني أن الأطفال الأكبر لا يمكنهم تعلم العربية — بالتأكيد يمكنهم ذلك — لكن العملية تصبح أكثر جهداً.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">دليل حسب العمر</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">عمر ٠-١: التعرض للأصوات</h3>
              <p className="text-white/60 mb-2">في هذا العمر، يمتص الأطفال أصوات بيئتهم. لا يمكنهم إنتاج اللغة بعد، لكنهم يبنون مكتبة أصوات في دماغهم.</p>
              <p className="text-white/60"><strong className="text-white/80">ماذا تفعل:</strong> تحدث بالعربية حول طفلك. شغّل أناشيد وأغاني عربية. اقرأ كتب عربية بصوت عالٍ.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">عمر ١-٢: استكشاف حسي</h3>
              <p className="text-white/60 mb-2">الأطفال الصغار يتعلمون من خلال تفاعلات السبب والنتيجة. هذا هو العمر المثالي لعرب فنجرز — يتيح لهم استكشاف الحروف العربية من خلال اللعب.</p>
              <p className="text-white/60"><strong className="text-white/80">ماذا تفعل:</strong> دع طفلك يلعب بعرب فنجرز بحرية. لا تختبره. ببساطة دعه يستمتع بالتجربة الحسية.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">عمر ٢-٤: بداية التعرف</h3>
              <p className="text-white/60 mb-2">هذا هو الوقت الذي يبدأ فيه الأطفال التعرف على الأشكال المألوفة بما في ذلك الحروف. قد يبدأون في قول أسماء الحروف والتعرف على الحروف التي رأوها مراراً.</p>
              <p className="text-white/60"><strong className="text-white/80">ماذا تفعل:</strong> استمر في اللعب مع عرب فنجرز. ابدأ بالإشارة إلى الحروف العربية في البيئة المحيطة.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">عمر ٤-٦: تعلم نشط</h3>
              <p className="text-white/60 mb-2">أطفال ما قبل المدرسة يمكنهم المشاركة في تعلم أكثر تنظيماً. يمكنهم تسمية معظم الحروف وفهم أن الحروف تمثل أصواتاً.</p>
              <p className="text-white/60"><strong className="text-white/80">ماذا تفعل:</strong> استخدم الوضع الموجّه في عرب فنجرز. قدّم تمارين الكتابة — تتبع الحروف العربية في الرمل أو على الورق.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الخلاصة</h2>
          <p>أفضل وقت لبدء تعليم العربية هو الآن — مهما كان عمر طفلك. للرضع والأطفال الصغار، يعني ذلك التعرض للأصوات من خلال المحادثة واللعب. لأطفال ما قبل المدرسة، يعني التعرف التفاعلي على الحروف من خلال أدوات مثل عرب فنجرز مع التعرض البيئي. الأساس الذي تبنيه في هذه السنوات المبكرة سيجعل محو الأمية العربية أسهل بشكل كبير.</p>
        </section>
      </div>
    </>
  );
}
