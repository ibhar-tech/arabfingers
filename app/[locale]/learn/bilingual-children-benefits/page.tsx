import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/bilingual-children-benefits", {
    titleEn: "Benefits of Raising Bilingual Arabic-English Children (with Examples)",
    titleAr: "فوائد تربية الطفل على العربية والإنجليزية معاً — بأمثلة عملية",
    descriptionEn:
      "The real benefits of raising bilingual Arabic-English children — cognitive flexibility, family and identity connection, and future opportunities — with everyday examples, common worries answered, and a parent FAQ.",
    descriptionAr:
      "فوائد تربية الطفل على العربية والإنجليزية معاً: المرونة الذهنية، وصلة الأسرة والهوية، وفرص المستقبل، مع أمثلة من الحياة اليومية، وجواب عن المخاوف الشائعة، وأسئلة للوالدين.",
    ogType: "article",
    publishedTime: "2026-04-30",
    modifiedTime: "2026-06-12",
    keywords: [
      "bilingual children benefits", "فوائد ثنائية اللغة للأطفال",
      "raising bilingual kids", "تربية طفل ثنائي اللغة",
      "arabic english bilingual", "العربية والإنجليزية معاً",
    ],
  });
}

const faqs = [
  {
    qEn: "My child mixes Arabic and English in one sentence. Is that a problem?",
    qAr: "طفلي يخلط العربية والإنجليزية في الجملة الواحدة، فهل هذا خلل؟",
    aEn: "Not at all. Mixing two languages in one sentence — sometimes called code-switching — is completely normal for bilingual children and even for fluent bilingual adults. It's a sign they have two systems to draw from, not a sign of confusion. It settles as their vocabulary in each language grows.",
    aAr: "كلّا. فخلط اللغتين في الجملة الواحدة — وقد يُسمّى التناوب اللغويّ — أمر طبيعيّ تماماً عند الطفل ثنائيّ اللغة، بل عند الكبير المتقن للّغتين. وهو دليل على أنّ عنده نظامين يستمدّ منهما، لا دليل ارتباك. ويهدأ هذا كلّما اتّسعت حصيلته في كلّ لغة.",
  },
  {
    qEn: "Will learning two languages delay my child's speech?",
    qAr: "هل تعلّم لغتين يؤخّر كلام طفلي؟",
    aEn: "No. Bilingualism does not delay language development overall. A bilingual child's words may at first be split across two languages, so each language's count looks smaller — but their total vocabulary is on track. Counting both languages together gives the true picture.",
    aAr: "لا. فثنائية اللغة لا تؤخّر نموّ اللغة في مجمله. وقد تكون كلمات الطفل أوّل الأمر موزّعة على لغتين، فيبدو عدد كلّ لغة أقلّ، لكنّ حصيلته الكلّية في مسارها الصحيح. والعبرة بمجموع اللغتين معاً.",
  },
  {
    qEn: "I'm not fully fluent in Arabic myself. Can I still raise a bilingual child?",
    qAr: "أنا نفسي لا أتقن العربية تماماً، فهل أربّي طفلاً ثنائيّ اللغة؟",
    aEn: "Yes. You don't have to be perfect — you have to be present and consistent. Learn alongside your child, lean on songs, books, recordings, relatives, and tools like ArabFingers, and keep Arabic a regular, warm part of daily life. Children absorb far more than we expect from steady exposure.",
    aAr: "نعم. فلست مطالَباً بالكمال، بل بالحضور والاستمرار. تعلّم مع طفلك، واستعن بالأناشيد والكتب والتسجيلات والأقارب وأدوات مثل عرب فنجرز، واجعل العربية جزءاً دافئاً من يومكما. فالطفل يكتسب من التعريض الثابت أكثر ممّا نظنّ.",
  },
  {
    qEn: "My child refuses to answer me in Arabic. What do I do?",
    qAr: "طفلي يرفض أن يجيبني بالعربية، فماذا أفعل؟",
    aEn: "This is common, especially once school fills the day with the majority language. Keep speaking Arabic warmly without forcing replies, make it useful and fun (stories, cooking, video calls with relatives), and avoid turning it into a battle. Understanding comes before speaking; keep the input flowing and speech follows.",
    aAr: "هذا شائع، لا سيّما حين تملأ المدرسة اليوم باللغة الأكثر حضوراً. واصِل الحديث بالعربية بحبٍّ من غير إكراهٍ على الردّ، واجعلها نافعة ممتعة (قصص، طبخ، مكالمات مع الأقارب)، ولا تحوّلها إلى معركة. فالفهم يسبق الكلام؛ أدِم المدخلات يتبعها النطق.",
  },
];

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
        dateModified="2026-06-12"
        section="Parenting"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "فوائد ثنائية اللغة" : "Bilingual Benefits" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}

      <section className="mt-2 mb-8">
        <h2 className="text-xl font-semibold text-ink mb-4">{isAr ? "مخاوف شائعة وأجوبتها" : "Common Worries, Answered"}</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.qEn} className="rounded-xl border border-ink/8 bg-card p-4">
              <h3 className="text-base font-semibold text-ink mb-1">{isAr ? f.qAr : f.qEn}</h3>
              <p className="text-sm text-ink/80 leading-relaxed">{isAr ? f.aAr : f.aEn}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 {isAr ? "ابدأ رحلة ثنائية اللغة" : "Start the Bilingual Journey"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">Benefits of Raising Bilingual Arabic-English Children</h1>
      <p className="text-base text-ink/75 mb-8">Why giving your child both languages is one of the best gifts you can offer</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Two Languages, One Stronger Mind</h2>
          <p className="mb-3">Raising a child with both Arabic and English does far more than give them two ways to say &quot;hello.&quot; It shapes how their mind works, deepens their ties to family and heritage, and widens the doors open to them later in life. Below we group these benefits into three areas — thinking, belonging, and opportunity — with everyday examples, then answer the worries parents most often raise.</p>
          <p>For Arabic-English families in particular, the payoff is rich because the two languages use entirely different scripts, reading directions, and sounds. The brain gets a more varied workout, and the child gains a window into two cultures at once.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">1. Cognitive Flexibility</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Sharper attention and switching</h3>
              <p className="text-ink/80 mb-2">Because a bilingual child constantly chooses which language fits the moment — and holds the other one back — they get daily practice in focus and mental switching. This strengthens what psychologists call executive function: planning, ignoring distractions, and juggling tasks.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> Your child speaks Arabic to grandma on a video call, then turns and answers a sibling in English without missing a beat. That instant, effortless switch is a workout the brain repeats dozens of times a day.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Earlier insight into how language works</h3>
              <p className="text-ink/80 mb-2">Children who know two languages realise early that words are labels, not the things themselves — and that the same idea can wear different clothes in different languages. This &quot;metalinguistic awareness&quot; makes them stronger readers and writers and makes a third language easier later.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> A four-year-old says, &quot;In Arabic it&apos;s قطة and in English it&apos;s cat — same animal!&quot; That observation is a genuine cognitive leap.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">2. Family &amp; Identity Connection</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">A bridge to grandparents and heritage</h3>
              <p className="text-ink/80 mb-2">For families with Arabic roots, language is the bridge to culture. A child who speaks Arabic can talk with grandparents, follow family traditions, take part in religious practice, enjoy Arabic stories and songs, and feel they belong to their heritage community.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> Without shared language, visits with a grandparent can shrink to smiles and snacks. With Arabic, a child hears the family&apos;s jokes, proverbs, and stories firsthand — the things that make a family feel like home.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">A confident sense of self</h3>
              <p className="text-ink/80 mb-2">Children raised with their heritage language tend to develop a steadier sense of who they are. They&apos;re not choosing between two worlds — they hold both. Many adults in diaspora communities say losing the home language was their deepest regret.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> A child who can name their feelings and family in Arabic carries their identity comfortably, rather than feeling like an outsider to part of their own story.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">3. Future Opportunities</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">A skill that opens doors</h3>
              <p className="text-ink/80 mb-2">Arabic is spoken by hundreds of millions of people and is one of the official languages of the United Nations. People fluent in both Arabic and English are sought after in business, diplomacy, journalism, healthcare, translation, and technology.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> The bilingual foundation you lay in a toddler&apos;s playtime today can become, twenty years on, the reason a door opens that stays closed to others.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Empathy and easy connection</h3>
              <p className="text-ink/80 mb-2">Bilingual children practise reading their audience — which language, which words, with whom. That habit grows into stronger perspective-taking and social ease, the ability to imagine how things look from someone else&apos;s side.</p>
              <p className="text-ink/80"><strong className="text-ink/90">Everyday example:</strong> A bilingual child naturally softens their words for a younger cousin and shifts language for a guest — small acts of empathy practised many times a day.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">How ArabFingers Supports Bilingual Development</h2>
          <p className="mb-3">ArabFingers was made for bilingual families. Every Arabic letter appears with its English phonetic equivalent, both letter names are spoken aloud, and the interface works in either language. Children see Arabic and English as equal, natural parts of their world.</p>
          <p>This balance means that even during &quot;Arabic time,&quot; an English-speaking child stays comfortable and engaged, while an Arabic-speaking child quietly reinforces their English. The two languages grow together rather than competing.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Getting Started</h2>
          <p>The journey to bilingualism begins with exposure. Let your child hear Arabic sounds, see Arabic letters, and tie both to fun, positive moments. ArabFingers makes that first step effortless — open it and let your child play. Every keypress is a step toward a bilingual future.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">فوائد تربية الطفل على العربية والإنجليزية معاً</h1>
      <p className="text-base text-ink/75 mb-8">لماذا يُعدّ منح طفلك اللغتين من أحسن ما تهديه إيّاه</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لغتان وعقلٌ أقوى</h2>
          <p className="mb-3">تربية الطفل على العربية والإنجليزية معاً أبعد أثراً من أن تمنحه طريقتين لقول &quot;مرحباً&quot;؛ فهي تصوغ طريقة عمل عقله، وتوثّق صلته بأهله وتراثه، وتوسّع له الأبواب فيما يأتي من عمره. وسنجمع هذه الفوائد في ثلاثة أبواب: التفكير، والانتماء، والفرص، مع أمثلة من الحياة اليومية، ثمّ نجيب عن أكثر ما يقلق الوالدين.</p>
          <p>والثمرة في الأسر التي تجمع العربية والإنجليزية غنيّة على وجه الخصوص؛ لأنّ اللغتين تختلفان خطّاً واتجاه قراءةٍ وأصواتاً اختلافاً تامّاً. فيلقى الدماغ تدريباً أكثر تنوّعاً، ويطلّ الطفل على ثقافتين في آنٍ واحد.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">١. المرونة الذهنية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">انتباه أحدّ وانتقال أسرع</h3>
              <p className="text-ink/80 mb-2">لأنّ الطفل ثنائيّ اللغة يختار في كلّ لحظة اللغة الملائمة، ويكفّ الأخرى، فإنّه يتدرّب يومياً على التركيز والانتقال الذهنيّ. ويقوّي هذا ما يسمّيه النفسانيّون الوظائف التنفيذية: التخطيط، وتجاهل المشتّتات، وإدارة أكثر من مهمّة.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> يكلّم طفلك جدّته بالعربية في مكالمة مرئية، ثمّ يلتفت فيجيب أخاه بالإنجليزية دون أن يتلعثم. هذا الانتقال الفوريّ السهل تدريب يكرّره الدماغ عشرات المرّات في اليوم.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">إدراك مبكّر لطبيعة اللغة</h3>
              <p className="text-ink/80 mb-2">الطفل الذي يعرف لغتين يدرك مبكّراً أنّ الكلمات أسماء للأشياء لا الأشياء نفسها، وأنّ المعنى الواحد يلبس ثوباً مختلفاً في كلّ لغة. وهذا &quot;الوعي اللغويّ&quot; يجعله أقوى في القراءة والكتابة، وييسّر عليه لغة ثالثة لاحقاً.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> يقول ابن الرابعة: &quot;بالعربية قطّة وبالإنجليزية cat، والحيوان واحد!&quot;، وهذه الملاحظة قفزة ذهنية حقيقية.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٢. صلة الأسرة والهوية</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">جسرٌ إلى الجدود والتراث</h3>
              <p className="text-ink/80 mb-2">في الأسر ذات الأصول العربية، اللغة هي الجسر إلى الثقافة. فالطفل الذي يتكلّم العربية يحادث جدّيه، ويتابع عادات أهله، ويشارك في شعائرهم، ويستمتع بقصص العربية وأناشيدها، ويشعر بانتمائه إلى أهل تراثه.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> من غير لغة مشتركة قد تنكمش زيارة الجدّ إلى ابتسامات ولُقَيمات. أمّا بالعربية فيسمع الطفل نكات الأسرة وأمثالها وحكاياتها مباشرةً، وهي ما يجعل البيت بيتاً.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">إحساسٌ واثقٌ بالذات</h3>
              <p className="text-ink/80 mb-2">الطفل الذي يُربّى على لغة أهله ينشأ غالباً أثبت إحساساً بمن هو؛ فهو لا يختار بين عالمين، بل يحملهما معاً. ويقول كثير من الكبار في بلاد المهجر إنّ فقدان لغة البيت كان أعمق ما ندموا عليه.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> الطفل الذي يسمّي مشاعره وأهله بالعربية يحمل هويّته في يُسرٍ، بدل أن يشعر بأنّه غريب عن جزءٍ من حكايته.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">٣. فرص المستقبل</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">مهارةٌ تفتح الأبواب</h3>
              <p className="text-ink/80 mb-2">العربية يتكلّمها مئات الملايين، وهي إحدى اللغات الرسمية في الأمم المتحدة. ومن يتقن العربية والإنجليزية معاً مطلوبٌ في التجارة والدبلوماسية والصحافة والطبّ والترجمة والتقنية.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> الأساس الذي تضعه في لعب طفلك اليوم قد يصير بعد عشرين عاماً سبباً ينفتح به بابٌ يبقى مغلقاً على غيره.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">تعاطفٌ وسهولةٌ في التواصل</h3>
              <p className="text-ink/80 mb-2">الطفل ثنائيّ اللغة يتمرّن على قراءة مخاطَبه: أيّ لغة، وأيّ كلمات، ومع مَن. وتنمو هذه العادة فتصير قدرةً أقوى على تقدير وجهة نظر الآخر، ويُسراً في المعاشرة.</p>
              <p className="text-ink/80"><strong className="text-ink/90">مثال يوميّ:</strong> يلطّف الطفل ثنائيّ اللغة كلامه لابن عمّه الأصغر، ويبدّل لغته لضيفٍ زارهم؛ أفعالُ تعاطفٍ صغيرة يكرّرها مراراً في يومه.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">كيف يعين عرب فنجرز على ثنائية اللغة</h2>
          <p className="mb-3">صُنع عرب فنجرز للأسر ثنائية اللغة. فكلّ حرف عربيّ يظهر بجانب نطقه الإنجليزيّ، ويُنطق اسما الحرف بالصوت، وتعمل الواجهة بأيّ اللغتين. فيرى الطفل العربية والإنجليزية جزأين متساويين طبيعيّين من عالمه.</p>
          <p>وهذا التوازن يجعل الطفل المتكلّم بالإنجليزية مرتاحاً منخرطاً حتى في &quot;وقت العربية&quot;، ويجعل المتكلّم بالعربية يثبّت إنجليزيّته في هدوء. فتنمو اللغتان معاً لا متنافستين.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">من أين تبدأ</h2>
          <p>رحلة ثنائية اللغة تبدأ بالتعريض. دع طفلك يسمع أصوات العربية، ويرى حروفها، ويربط بينهما وبين لحظاتٍ ممتعة محبَّبة. وعرب فنجرز يجعل الخطوة الأولى سهلة: افتحه ودَع طفلك يلعب؛ فكلّ ضغطة مفتاحٍ خطوةٌ نحو مستقبلٍ بلغتين.</p>
        </section>
      </div>
    </>
  );
}
