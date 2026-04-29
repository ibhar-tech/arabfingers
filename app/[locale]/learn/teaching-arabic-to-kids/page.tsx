import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Teaching Arabic to Kids: Tips & Strategies | تعليم العربية للأطفال",
  description: "Practical tips and strategies for teaching Arabic letters to toddlers and pre-schoolers. Learn how to make Arabic learning fun and effective.",
};

export default async function TeachingArabicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <ContentAr /> : <ContentEn />}
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">Teaching Arabic to Kids: A Parent&apos;s Guide</h1>
      <p className="text-sm text-white/50 mb-8">Practical tips for introducing the Arabic alphabet to toddlers and pre-schoolers</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Why Start Early?</h2>
          <p className="mb-3">Children between ages 1 and 6 are in a critical period for language acquisition. Their brains are wired to absorb new sounds, shapes, and patterns at an extraordinary rate. Introducing Arabic letters during this window — even casually through play — creates neural pathways that make formal reading much easier later.</p>
          <p>Research shows that children exposed to multiple writing systems develop stronger cognitive flexibility, better problem-solving skills, and enhanced memory. For bilingual families, early exposure to Arabic script alongside English helps children see both languages as natural parts of their world.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Play-First Approach</h2>
          <p className="mb-3">The most effective way to teach Arabic letters to young children is through play, not formal instruction. Here&apos;s why:</p>
          <ul className="list-disc list-inside space-y-2 text-white/60">
            <li><strong className="text-white/80">No pressure</strong> — When learning feels like play, children are more engaged and retain more information.</li>
            <li><strong className="text-white/80">Repetition without boredom</strong> — Kids naturally repeat activities they enjoy. Each repetition reinforces letter recognition.</li>
            <li><strong className="text-white/80">Multi-sensory learning</strong> — Combining visual (seeing the letter), auditory (hearing the name), and kinesthetic (pressing keys) input creates stronger memories.</li>
            <li><strong className="text-white/80">Positive associations</strong> — Children who associate Arabic with fun are more motivated to continue learning as they grow.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Practical Tips for Parents</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">1. Keep sessions short</h3>
              <p className="text-white/60">Toddlers have attention spans of 2-5 minutes. Let them play with ArabFingers for a few minutes at a time, multiple times a day. Short, frequent exposure is more effective than long sessions.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">2. Name the letters together</h3>
              <p className="text-white/60">When your child presses a key and a letter appears, say the letter name with them. &quot;Look, that&apos;s Ba! باء!&quot; This social interaction reinforces learning far more than the app alone.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">3. Connect letters to real life</h3>
              <p className="text-white/60">When you see a letter your child recognizes in the real world — on a sign, a book, or a food package — point it out. &quot;Look, there&apos;s the ب we saw in ArabFingers!&quot;</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">4. Celebrate progress</h3>
              <p className="text-white/60">When your child recognizes a letter or says its name, celebrate! Positive reinforcement builds confidence and motivation. ArabFingers has built-in milestone celebrations for this reason.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">5. Don&apos;t correct mistakes</h3>
              <p className="text-white/60">If your child calls a letter by the wrong name, gently model the correct name without saying &quot;no&quot; or &quot;wrong.&quot; Say &quot;That&apos;s تاء — Ta!&quot; instead of &quot;No, that&apos;s not Ba.&quot;</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Age-Appropriate Expectations</h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">Ages 1-2: Sensory exploration</h3>
              <p className="text-white/60">At this age, children enjoy the cause-and-effect of pressing keys and seeing colorful responses. They&apos;re not learning letter names yet — they&apos;re building familiarity with Arabic letter shapes and sounds.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">Ages 2-4: Recognition begins</h3>
              <p className="text-white/60">Children start recognizing familiar letters and may begin saying some letter names. They might have favorites — &quot;I want to find the ب!&quot; This is a great sign of emerging literacy.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">Ages 4-6: Active learning</h3>
              <p className="text-white/60">Pre-schoolers can name most letters, understand that letters make sounds, and begin connecting letters to words. They&apos;re ready for more structured Arabic learning alongside play.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center py-8">
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
      <h1 className="text-3xl font-semibold text-white mb-2">تعليم العربية للأطفال: دليل الوالدين</h1>
      <p className="text-sm text-white/50 mb-8">نصائح عملية لتعريف الأطفال الصغار بالأبجدية العربية</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">لماذا نبدأ مبكراً؟</h2>
          <p className="mb-3">الأطفال بين عمر سنة و٦ سنوات في فترة حرجة لاكتساب اللغة. أدمغتهم مهيأة لاستيعاب الأصوات والأشكال والأنماط الجديدة بمعدل استثنائي. تعريض الأطفال للحروف العربية خلال هذه الفترة — حتى بشكل عرضي من خلال اللعب — يُنشئ مسارات عصبية تجعل القراءة الرسمية أسهل بكثير لاحقاً.</p>
          <p>تُظهر الأبحاث أن الأطفال المعرضين لأنظمة كتابة متعددة يطورون مرونة إدراكية أقوى ومهارات حل مشكلات أفضل وذاكرة محسنة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">نهج اللعب أولاً</h2>
          <p className="mb-3">الطريقة الأكثر فعالية لتعليم الحروف العربية للأطفال الصغار هي من خلال اللعب، وليس التعليم الرسمي:</p>
          <ul className="list-disc list-inside space-y-2 text-white/60">
            <li><strong className="text-white/80">بدون ضغط</strong> — عندما يشعر التعلم باللعب، يكون الأطفال أكثر انخراطاً ويحتفظون بمعلومات أكثر.</li>
            <li><strong className="text-white/80">تكرار بدون ملل</strong> — يكرر الأطفال بشكل طبيعي الأنشطة التي يستمتعون بها. كل تكرار يعزز التعرف على الحروف.</li>
            <li><strong className="text-white/80">تعلم متعدد الحواس</strong> — الجمع بين المدخلات البصرية والسمعية والحركية يُنشئ ذكريات أقوى.</li>
            <li><strong className="text-white/80">ارتباطات إيجابية</strong> — الأطفال الذين يربطون العربية بالمرح أكثر تحفيزاً لمواصلة التعلم.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">نصائح عملية للوالدين</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">١. اجعل الجلسات قصيرة</h3>
              <p className="text-white/60">مدة انتباه الأطفال الصغار ٢-٥ دقائق. دعهم يلعبون بعرب فنجرز لبضع دقائق في كل مرة، عدة مرات في اليوم.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">٢. سمّ الحروف معاً</h3>
              <p className="text-white/60">عندما يضغط طفلك على مفتاح ويظهر حرف، قل اسم الحرف معه. &quot;انظر، هذا باء!&quot; هذا التفاعل الاجتماعي يعزز التعلم أكثر بكثير من التطبيق وحده.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">٣. اربط الحروف بالحياة الواقعية</h3>
              <p className="text-white/60">عندما ترى حرفاً يعرفه طفلك في العالم الحقيقي — على لافتة أو كتاب أو عبوة طعام — أشر إليه.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">٤. احتفل بالتقدم</h3>
              <p className="text-white/60">عندما يتعرف طفلك على حرف أو يقول اسمه، احتفل! التعزيز الإيجابي يبني الثقة والتحفيز.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">٥. لا تصحح الأخطاء مباشرة</h3>
              <p className="text-white/60">إذا سمّى طفلك حرفاً باسم خاطئ، قدّم الاسم الصحيح بلطف. قل &quot;هذا تاء!&quot; بدلاً من &quot;لا، هذا ليس باء.&quot;</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">التوقعات المناسبة لكل عمر</h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">عمر ١-٢: استكشاف حسي</h3>
              <p className="text-white/60">في هذا العمر، يستمتع الأطفال بالسبب والنتيجة لضغط المفاتيح ورؤية استجابات ملونة. هم يبنون ألفة مع أشكال وأصوات الحروف العربية.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">عمر ٢-٤: بداية التعرف</h3>
              <p className="text-white/60">يبدأ الأطفال في التعرف على الحروف المألوفة وقد يبدأون في قول بعض أسماء الحروف.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="font-semibold text-white mb-1">عمر ٤-٦: تعلم نشط</h3>
              <p className="text-white/60">يمكن لأطفال ما قبل المدرسة تسمية معظم الحروف وفهم أن الحروف تصدر أصواتاً والبدء في ربط الحروف بالكلمات.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center py-8">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 جرب عرب فنجرز الآن
        </Link>
      </div>
    </>
  );
}
