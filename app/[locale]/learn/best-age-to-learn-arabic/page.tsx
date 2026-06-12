import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/best-age-to-learn-arabic", {
    titleEn: "Best Age to Start Teaching Arabic to Kids (Stage-by-Stage Guide)",
    titleAr: "أفضل عمر لبدء تعليم العربية للأطفال — دليل مرحلة بمرحلة",
    descriptionEn:
      "When should a child start Arabic? A stage-by-stage age guide (0-2 listening, 2-4 sounds and play, 4-6 letters, 6+ reading), what early exposure does for the brain, and why it's never too late.",
    descriptionAr:
      "متى يبدأ الطفل تعلّم العربية؟ دليل بحسب العمر (٠–٢ الإصغاء، ٢–٤ الأصوات واللعب، ٤–٦ الحروف، ٦+ القراءة)، وأثر التعريض المبكّر في الدماغ، ولماذا لا يفوت الأوان أبداً.",
    ogType: "article",
    publishedTime: "2026-04-23",
    modifiedTime: "2026-06-12",
    keywords: [
      "best age to learn arabic", "أفضل عمر لتعلم العربية",
      "when to teach arabic", "متى نعلم الطفل العربية",
      "early language exposure", "التعرض المبكر للغة",
    ],
  });
}

const stages = [
  { ageEn: "0–2 years", ageAr: "٠–٢ سنة", focusEn: "Listening", focusAr: "الإصغاء", doEn: "Speak and sing Arabic around your baby; play nursery rhymes; read board books aloud.", doAr: "تحدّث وغنِّ بالعربية حول رضيعك، وشغّل الأناشيد، واقرأ الكتب المصوّرة بصوتٍ عالٍ." },
  { ageEn: "2–4 years", ageAr: "٢–٤ سنوات", focusEn: "Sounds & play", focusAr: "الأصوات واللعب", doEn: "Free, pressure-free play with ArabFingers; name letters casually; point out Arabic around you.", doAr: "لعب حرّ بلا ضغط مع عرب فنجرز، وتسمية الحروف عَرَضاً، والإشارة إلى العربية من حولكما." },
  { ageEn: "4–6 years", ageAr: "٤–٦ سنوات", focusEn: "Letters", focusAr: "الحروف", doEn: "Recognise and name most letters; trace shapes in sand or on paper; sing the alphabet.", doAr: "معرفة أكثر الحروف وتسميتها، وتتبّع أشكالها في الرمل أو على الورق، وغناء نشيد الأبجدية." },
  { ageEn: "6+ years", ageAr: "٦ سنوات فأكثر", focusEn: "Reading", focusAr: "القراءة", doEn: "Connect letters into words; read short sentences; begin diacritics (harakat).", doAr: "وصل الحروف كلماتٍ، وقراءة جمل قصيرة، والبدء بالحركات (الضبط بالشكل)." },
];

const faqs = [
  {
    qEn: "Is my child too young to start?",
    qAr: "هل طفلي أصغر من أن يبدأ؟",
    aEn: "No. From birth, babies are building a sound library from everything they hear. You can't start the listening stage too early — even an infant benefits from hearing Arabic spoken and sung around them.",
    aAr: "لا. فالرضيع منذ ولادته يبني مكتبة أصوات ممّا يسمعه. ولا يكون البدء بمرحلة الإصغاء مبكّراً أبداً؛ فحتى الرضيع ينتفع بسماع العربية تُقال وتُنشد حوله.",
  },
  {
    qEn: "My child only speaks English. Is it too late?",
    qAr: "طفلي لا يتكلّم إلا الإنجليزية، فهل فات الأوان؟",
    aEn: "It is never too late. Earlier is easier for accent-free pronunciation, but a five- or six-year-old can absolutely begin with letter recognition and build a strong foundation before formal Arabic study.",
    aAr: "لا يفوت الأوان أبداً. فالبدء المبكّر أيسر في سلامة النطق، لكنّ ابن الخامسة أو السادسة يستطيع تماماً أن يبدأ بمعرفة الحروف ويبني أساساً متيناً قبل الدراسة النظامية.",
  },
  {
    qEn: "How many minutes a day are enough?",
    qAr: "كم دقيقة في اليوم تكفي؟",
    aEn: "For toddlers, five to ten minutes of play is plenty. For pre-schoolers, fifteen to twenty minutes mixing play and activities. Consistency matters far more than length — five minutes daily beats an hour once a week.",
    aAr: "للصغار خمس إلى عشر دقائق من اللعب تكفي. ولأطفال الروضة خمس عشرة إلى عشرين دقيقة تجمع اللعب والنشاط. والاستمرار أهمّ من الطول بكثير؛ فخمس دقائق كلّ يوم خير من ساعة في الأسبوع.",
  },
  {
    qEn: "Won't two languages confuse or delay my child?",
    qAr: "ألا تربك اللغتان طفلي أو تؤخّران كلامه؟",
    aEn: "No. Bilingual children build a separate track for each language. Brief mixing is normal and passes, and bilingualism does not delay overall language development.",
    aAr: "لا. فالطفل ثنائيّ اللغة يبني مساراً مستقلاً لكلّ لغة. والخلط اليسير طبيعيّ ويزول، وثنائية اللغة لا تؤخّر نموّ اللغة في مجمله.",
  },
];

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
        dateModified="2026-06-12"
        section="Parenting"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "أفضل عمر" : "Best Age" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}

      <section className="mt-2 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">{isAr ? "أسئلة شائعة للوالدين" : "Frequently Asked Questions"}</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.qEn} className="rounded-xl border border-white/8 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-white mb-1">{isAr ? f.qAr : f.qEn}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{isAr ? f.aAr : f.aEn}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "ابدأ التعلم الآن" : "Start Learning Now"}
        </Link>
      </div>
    </PageLayout>
  );
}

function StageTable({ isAr }: { isAr: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-2 px-3 text-start text-white/70 font-medium">{isAr ? "العمر" : "Age"}</th>
            <th className="py-2 px-3 text-start text-white/70 font-medium">{isAr ? "التركيز" : "Focus"}</th>
            <th className="py-2 px-3 text-start text-white/70 font-medium">{isAr ? "ماذا تفعل" : "What to do"}</th>
          </tr>
        </thead>
        <tbody className="text-white/80">
          {stages.map((s) => (
            <tr key={s.ageEn} className="border-b border-white/5">
              <td className="py-2.5 px-3 text-white/85 font-medium whitespace-nowrap">{isAr ? s.ageAr : s.ageEn}</td>
              <td className="py-2.5 px-3 text-accent/90 whitespace-nowrap">{isAr ? s.focusAr : s.focusEn}</td>
              <td className="py-2.5 px-3">{isAr ? s.doAr : s.doEn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">What&apos;s the Best Age to Start Teaching Arabic?</h1>
      <p className="text-sm text-white/55 mb-8">A stage-by-stage guide for parents and educators</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Short Answer: As Early as Possible</h2>
          <p className="mb-3">Language experts broadly agree: there is no &quot;too early&quot; when it comes to language exposure. Babies begin processing language sounds from birth — and likely even in the womb. The earlier a child meets Arabic sounds and letter shapes, the more naturally they acquire the language.</p>
          <p>But &quot;teaching&quot; Arabic to a one-year-old looks very different from teaching it to a five-year-old. The key is matching your approach to your child&apos;s stage. This guide breaks down what to expect and how to approach Arabic at each age.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Age-Window Table</h2>
          <StageTable isAr={false} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What Early Exposure Does for the Brain</h2>
          <p className="mb-3">Researchers describe a &quot;sensitive period&quot; for language that runs from birth to roughly age seven. During this window the brain is extraordinarily open to new language input. Young children can hear and reproduce sound distinctions that adults struggle with, and they pick up native-like pronunciation with little effort.</p>
          <p className="mb-3">As children grow, the brain gradually tunes itself to the sounds it hears most and becomes less sensitive to sounds it rarely meets. This doesn&apos;t mean older children can&apos;t learn Arabic — they absolutely can — but accent-free pronunciation becomes a little harder to reach. Every early exposure to Arabic sounds is, in effect, keeping a door open.</p>
          <p>This is why tools like ArabFingers are built for the 1–6 range. Each time a child hears an Arabic letter sound in these years, they strengthen the pathways that make later, formal Arabic much easier.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Stage-by-Stage Guide</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 0–2: Listening</h3>
              <p className="text-white/80 mb-2">At this age, babies are absorbing the sounds of their environment. They can&apos;t produce language yet, but they&apos;re building a sound library in the brain. Every Arabic conversation, song, or recitation they hear lays down connections.</p>
              <p className="text-white/80"><strong className="text-white/90">What to do:</strong> Speak Arabic around your baby. Play Arabic nursery rhymes. Read Arabic board books aloud, even before they understand the words. The rhythm and sounds are what matter now.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 2–4: Sounds &amp; Play</h3>
              <p className="text-white/80 mb-2">Toddlers learn through cause and effect. They love pressing things and seeing what happens — the perfect age for ArabFingers. The keyboard-smash format lets them explore Arabic letters through play with no expectations.</p>
              <p className="text-white/80"><strong className="text-white/90">What to do:</strong> Let your child play freely. Don&apos;t quiz them. Name letters casually as they appear: &quot;Oh, that&apos;s Ba!&quot; Start pointing out Arabic letters on packages, signs, and book covers.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 4–6: Letters</h3>
              <p className="text-white/80 mb-2">Pre-schoolers can engage in more structured learning. They can name most letters, understand that letters carry sounds, and start tracing shapes. This is when gentle, formal letter work can begin alongside continued play.</p>
              <p className="text-white/80"><strong className="text-white/90">What to do:</strong> Trace Arabic letters in sand, salt trays, or on paper. Sing the alphabet. Read simple Arabic words together. Keep play as the main mode of learning.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">Ages 6+: Reading</h3>
              <p className="text-white/80 mb-2">Children with early exposure are ready for reading. They recognise most letters in their connected forms, see how letters join in words, and begin reading short words and sentences — and learning diacritics for precise pronunciation.</p>
              <p className="text-white/80"><strong className="text-white/90">What to do:</strong> Move to reading-focused programs. Keep ArabFingers for fun review. Read Arabic children&apos;s books daily. Consider classes or a tutor.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">It&apos;s Never Too Late</h2>
          <p className="mb-3">If your child is already six, seven, or older, take heart: the &quot;sensitive period&quot; describes when learning is easiest, not a deadline after which it becomes impossible. Older children bring real advantages — longer attention spans, the ability to follow explanations, and the capacity to study patterns deliberately.</p>
          <p>What matters most at any age is steady, positive exposure. A child who starts later and enjoys Arabic will go far past a child who started early but came to resent it. Begin where your child is today, keep it light, and let progress build.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">The Bottom Line</h2>
          <p>The best time to start teaching Arabic is now — whatever your child&apos;s age. For babies and toddlers, that means sound exposure through conversation and play. For pre-schoolers, interactive letter recognition through tools like ArabFingers combined with everyday exposure. The foundation you build in these early years makes Arabic literacy dramatically easier when formal instruction begins.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">ما أفضل عمر لبدء تعليم العربية؟</h1>
      <p className="text-sm text-white/55 mb-8">دليل مرحلة بمرحلة للوالدين والمعلّمين</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/80">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الجواب المختصر: في أبكر وقت ممكن</h2>
          <p className="mb-3">يكاد أهل اللغة يجمعون على أنّه لا &quot;مبكّر جداً&quot; حين يكون الحديث عن التعريض للّغة. فالطفل يبدأ معالجة أصوات اللغة منذ ولادته، بل لعلّه في بطن أمّه كذلك. وكلّما بكّرنا في تعريضه لأصوات العربية وأشكال حروفها، اكتسبها أيسر وأقرب إلى الطبع.</p>
          <p>على أنّ &quot;تعليم&quot; العربية لابن السنة يختلف اختلافاً كبيراً عن تعليمها لابن الخامسة. والمفتاح أن توائم بين أسلوبك ومرحلة طفلك. وهذا الدليل يبيّن لك ما تتوقّعه وكيف تتعامل مع العربية في كلّ عمر.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">جدول مراحل العمر</h2>
          <StageTable isAr={true} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">ماذا يصنع التعريض المبكّر في الدماغ؟</h2>
          <p className="mb-3">يصف الباحثون &quot;مرحلة حسّاسة&quot; لاكتساب اللغة تمتدّ من الولادة إلى نحو السابعة. وفي هذه النافذة يكون الدماغ منفتحاً انفتاحاً عظيماً على المدخلات اللغوية الجديدة؛ فالطفل يسمع فروقاً صوتية دقيقة يعجز عنها الكبير، ويكتسب نطقاً قريباً من نطق أهل اللغة بأقلّ جهد.</p>
          <p className="mb-3">وكلّما كبر الطفل، ضبط دماغه نفسه على الأصوات التي يسمعها أكثر، وقلّت حساسيته للأصوات النادرة عليه. وهذا لا يعني أنّ الأكبر لا يستطيع تعلّم العربية — بل يستطيع قطعاً — لكنّ سلامة النطق تصير أصعب قليلاً. فكلّ تعريض مبكّر لأصوات العربية هو في حقيقته إبقاء للباب مفتوحاً.</p>
          <p>ولهذا صُمّمت أدوات مثل عرب فنجرز لمن هم بين الواحدة والسادسة؛ فكلّما سمع الطفل صوت حرف عربيّ في هذه السنوات، قوّى المسارات التي تجعل تعلّمه النظاميّ للعربية أيسر فيما بعد.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">دليل مرحلة بمرحلة</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">٠–٢ سنة: الإصغاء</h3>
              <p className="text-white/80 mb-2">في هذا العمر يمتصّ الطفل أصوات ما حوله. لا يقدر على النطق بعد، لكنّه يبني مكتبة أصوات في دماغه. وكلّ حديث عربيّ أو نشيد أو تلاوة يسمعها يُرسي وصلات في عقله.</p>
              <p className="text-white/80"><strong className="text-white/90">ماذا تفعل:</strong> تحدّث بالعربية حوله، وشغّل الأناشيد العربية، واقرأ الكتب المصوّرة بصوتٍ عالٍ ولو قبل أن يفهم الكلمات؛ فالإيقاع والأصوات هما المهمّ الآن.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">٢–٤ سنوات: الأصوات واللعب</h3>
              <p className="text-white/80 mb-2">الطفل في هذا السنّ يتعلّم بالسبب والنتيجة، ويحبّ أن يضغط فيرى ما يحدث، وهو العمر الأمثل لعرب فنجرز؛ إذ يستكشف الحروف العربية باللعب بلا توقّعات.</p>
              <p className="text-white/80"><strong className="text-white/90">ماذا تفعل:</strong> دعه يلعب بحرّية، ولا تختبره، وسمِّ الحروف عَرَضاً كلّما ظهرت: &quot;انظر، هذه باء!&quot;، وابدأ بالإشارة إلى الحروف العربية على العبوات واللافتات وأغلفة الكتب.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">٤–٦ سنوات: الحروف</h3>
              <p className="text-white/80 mb-2">أطفال الروضة يقدرون على تعلّم أكثر تنظيماً؛ يسمّون أكثر الحروف، ويدركون أنّ الحرف يحمل صوتاً، ويبدأون بتتبّع الأشكال. وهنا يبدأ العمل اللطيف على الحروف بجانب استمرار اللعب.</p>
              <p className="text-white/80"><strong className="text-white/90">ماذا تفعل:</strong> تتبّعوا الحروف في الرمل أو صينية الملح أو على الورق، وغنّوا نشيد الأبجدية، واقرآ كلمات عربية بسيطة معاً، واجعل اللعب هو الأساس.</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/5 p-5">
              <h3 className="font-semibold text-white mb-2">٦ سنوات فأكثر: القراءة</h3>
              <p className="text-white/80 mb-2">الطفل الذي عُرّض مبكّراً صار مهيّأً للقراءة؛ يعرف أكثر الحروف في أشكالها المتّصلة، ويرى كيف تتّصل في الكلمات، ويبدأ بقراءة كلمات وجمل قصيرة، وبتعلّم الحركات لضبط النطق.</p>
              <p className="text-white/80"><strong className="text-white/90">ماذا تفعل:</strong> انتقلوا إلى برامج تركّز على القراءة، وأبقِ عرب فنجرز للمراجعة الممتعة، واقرآ كتب الأطفال العربية يومياً، وفكّر في الدروس أو معلّم.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">لا يفوت الأوان أبداً</h2>
          <p className="mb-3">إن كان طفلك بلغ السادسة أو السابعة أو أكثر، فطِب نفساً؛ فـ&quot;المرحلة الحسّاسة&quot; تصف متى يكون التعلّم أيسر، لا حدّاً يستحيل التعلّم بعده. بل للأكبر مزايا حقيقية: انتباه أطول، وقدرة على متابعة الشرح، وملكة على تأمّل القواعد عن قصد.</p>
          <p>والأهمّ في كلّ عمر هو التعريض الثابت المحبَّب. فالطفل الذي يبدأ متأخّراً ويحبّ العربية يسبق من بدأ مبكّراً ثمّ كرهها. ابدأ من حيث طفلك اليوم، واجعل الأمر خفيفاً، ودَع التقدّم يتراكم.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">الخلاصة</h2>
          <p>أفضل وقتٍ لبدء تعليم العربية هو الآن، مهما كان عمر طفلك. فللرضّع والصغار يكون ذلك بالتعريض للأصوات بالحديث واللعب، ولأطفال الروضة بمعرفة الحروف تفاعلياً بأدوات مثل عرب فنجرز مع التعريض اليوميّ من حولهم. والأساس الذي تبنيه في هذه السنوات المبكّرة يجعل القراءة والكتابة بالعربية أيسر بكثير حين يبدأ التعليم النظاميّ.</p>
        </section>
      </div>
    </>
  );
}
