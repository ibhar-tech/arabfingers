import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/blog/ramadan-activities-arabic-learning", {
    titleEn: "Ramadan & Arabic Learning: Activities That Connect Language to Culture",
    titleAr: "رمضان وتعلم العربية: أنشطة تربط اللغة بالثقافة",
    descriptionEn:
      "Use the spirit of Ramadan to inspire Arabic learning. Practical activities that connect Arabic vocabulary to cultural and religious traditions for young children.",
    descriptionAr:
      "استخدم روح رمضان لإلهام تعلم العربية. أنشطة عملية تربط المفردات العربية بالتقاليد الثقافية والدينية للأطفال الصغار، مع مفردات رمضان الأساسية وأنشطة حسب العمر.",
    ogType: "article",
    publishedTime: "2026-05-20",
    modifiedTime: "2026-06-12",
    keywords: [
      "ramadan activities for kids", "أنشطة رمضان للأطفال",
      "ramadan arabic vocabulary", "مفردات رمضان للأطفال",
      "teaching arabic through culture", "تعليم العربية من خلال الثقافة",
      "ramadan learning for toddlers", "تعلم رمضان للأطفال الصغار",
    ],
  });
}

export default async function RamadanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <ArticleStructuredData
        title="Ramadan & Arabic Learning: Activities That Connect Language to Culture"
        description="Use the spirit of Ramadan to inspire Arabic learning with practical activities."
        slug="blog/ramadan-activities-arabic-learning"
        locale={locale}
        datePublished="2026-05-20"
        dateModified="2026-06-12"
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[
          { label: locale === "ar" ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: locale === "ar" ? "أنشطة رمضان" : "Ramadan Activities", href: `/${locale}/blog/ramadan-activities-arabic-learning` },
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
        <time dateTime="2026-05-20">{isAr ? "٢٠ مايو ٢٠٢٦" : "May 20, 2026"}</time>
        <span className="mx-2">·</span>
        <span>{isAr ? "٧ دقائق قراءة" : "7 min read"}</span>
      </div>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">Ramadan &amp; Arabic Learning: Activities That Connect Language to Culture</h1>
      <p className="text-base text-ink/75">Using the holiest month as a springboard for Arabic vocabulary and letter recognition</p>
      <AuthorBlock />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_ramadan.png"
          alt="Ramadan & Arabic Learning activities"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Why Ramadan Is Perfect for Arabic Learning</h2>
          <p className="mb-3">
            Ramadan is the most culturally rich month in the Islamic calendar. For families — especially those living in non-Muslim-majority countries — it&apos;s a time when Arabic language and culture become especially present in daily life. Greetings are exchanged in Arabic (&quot;Ramadan Mubarak! رمضان مبارك&quot;), prayers are recited in Arabic, and traditional Arabic foods appear on the table.
          </p>
          <p className="mb-3">
            This natural immersion creates a perfect learning environment for young children. When Arabic words are connected to real experiences — the taste of dates, the sound of the adhan, the excitement of opening iftar — they become meaningful rather than abstract. Children don&apos;t just learn vocabulary; they form emotional connections with the language.
          </p>
          <p>
            Here are practical activities that use the spirit and traditions of Ramadan to reinforce Arabic learning for children of all ages. ArabFingers even includes a special Ramadan theme with crescent moons, stars, and lanterns floating in the background — perfect for the season.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Ramadan Vocabulary for Kids</h2>
          <p className="mb-3">Start by introducing these essential Ramadan words. Practice saying them together and point them out whenever they come up naturally during the month:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { ar: "رمضان", en: "Ramadan", pron: "Ramadaan", desc: "The holy month of fasting" },
              { ar: "صيام", en: "Fasting", pron: "Siyaam", desc: "Abstaining from food and drink" },
              { ar: "إفطار", en: "Iftar", pron: "Iftaar", desc: "The meal at sunset" },
              { ar: "سحور", en: "Suhoor", pron: "Suhoor", desc: "The pre-dawn meal" },
              { ar: "تمر", en: "Dates", pron: "Tamar", desc: "The fruit traditionally eaten at iftar" },
              { ar: "مسجد", en: "Mosque", pron: "Masjid", desc: "Place of prayer" },
              { ar: "صلاة", en: "Prayer", pron: "Salah", desc: "The act of praying" },
              { ar: "هلال", en: "Crescent", pron: "Hilaal", desc: "The crescent moon of Ramadan" },
              { ar: "فانوس", en: "Lantern", pron: "Fanoos", desc: "Traditional Ramadan lantern" },
              { ar: "قرآن", en: "Quran", pron: "Qur'aan", desc: "The holy book" },
              { ar: "زكاة", en: "Charity", pron: "Zakah", desc: "Giving to those in need" },
              { ar: "عيد", en: "Eid", pron: "Eid", desc: "The celebration after Ramadan" },
            ].map((word) => (
              <div key={word.ar} className="rounded-lg border border-ink/8 bg-card p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg text-accent font-semibold" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{word.ar}</span>
                  <span className="text-ink/30">—</span>
                  <span className="text-xs text-ink/60">{word.en}</span>
                </div>
                <p className="text-[11px] text-ink/40"><em>{word.pron}</em> · {word.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Activities for Different Ages</h2>

          <h3 className="text-base font-semibold text-ink/90 mt-5 mb-3">🧒 Ages 1-3: Sensory Ramadan</h3>
          <div className="space-y-3">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🌙 Crescent Moon Letter Hunt</h4>
              <p className="text-ink/75">Cut crescent moon shapes from yellow paper and write one Arabic letter on each. Hide them around the room and let your toddler find them. When they find one, say the letter name together. &quot;You found هاء! Ha! Like هلال — hilal — crescent!&quot;</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🪘 Ramadan Sound Walk</h4>
              <p className="text-ink/75">Take a walk and listen for Ramadan-related sounds: the adhan, greeting exchanges, the clinking of iftar preparation. Name each sound in Arabic. This builds listening skills and creates positive auditory associations with the language.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🕹️ ArabFingers Ramadan Theme</h4>
              <p className="text-ink/75">Switch ArabFingers to the Ramadan theme from the parent panel. The floating 3D objects become crescent moons, stars, and lanterns. This seasonal visual change renews your child&apos;s interest and connects their keyboard play to the Ramadan atmosphere at home.</p>
            </div>
          </div>

          <h3 className="text-base font-semibold text-ink/90 mt-6 mb-3">📚 Ages 4-6: Vocabulary Building</h3>
          <div className="space-y-3">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">📋 Ramadan Word Wall</h4>
              <p className="text-ink/75">Create a large poster with Ramadan vocabulary words in Arabic and English. Each day, practice reading one word together. By the end of Ramadan, your child will know 30 Arabic words connected to real experiences they&apos;ve had that month.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🎨 Decorate with Arabic Letters</h4>
              <p className="text-ink/75">Make Ramadan decorations featuring Arabic calligraphy. Write &quot;رمضان مبارك&quot; (Ramadan Mubarak) on a banner, or let your child decorate paper lanterns with Arabic letters they know. This transforms Arabic writing into festive art.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🍽️ Iftar Label Game</h4>
              <p className="text-ink/75">Before iftar, label the dishes with their Arabic names on small cards. &quot;تمر — dates,&quot; &quot;ماء — water,&quot; &quot;حساء — soup.&quot; Let your child match the cards to the correct dishes. This turns mealtime into a vocabulary lesson.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Keeping It Realistic for Busy Parents</h2>
          <p className="mb-3">
            Ramadan is already a busy month — between fasting, longer prayers, and family obligations, the last thing most parents need is an ambitious learning curriculum to feel guilty about. So my advice, as a parent who has been there, is to keep expectations small and woven into things you are already doing.
          </p>
          <p className="mb-3">
            You do not need a dedicated lesson. Naming the crescent moon when your child spots it in the sky, saying &quot;بسم الله&quot; together before the first date at iftar, or pointing at the lantern on the table and repeating its Arabic name — these thirty-second moments add up to far more retained vocabulary than a structured half-hour your child resists. Repetition across a whole month, in a warm emotional context, is what makes the words stick.
          </p>
          <p>
            One thing I have found helpful is to pick just three or four words for the entire month and use them relentlessly. By the time Eid arrives, those few words are genuinely part of your child&apos;s vocabulary — and that small, real win is worth more than a long list they half-remember.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Making It a Tradition</h2>
          <p className="mb-3">
            The most powerful aspect of Ramadan-based Arabic learning is that it becomes a tradition. When Arabic learning is woven into the fabric of Ramadan — alongside fasting, prayer, charity, and family gatherings — it becomes something children look forward to rather than resist.
          </p>
          <p>
            Start small, be consistent, and focus on connection over perfection. A child who associates Arabic with the warmth of Ramadan — the smell of food, the joy of Eid, the togetherness of family — will carry that positive association for life. And that emotional foundation is worth more than any formal curriculum.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/en/blog/arabic-calligraphy-for-kids" className="text-xs text-accent underline">← Arabic Calligraphy</Link>
        <Link href="/en/blog" className="text-xs text-accent underline">All blog posts →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 Try ArabFingers — Ramadan Theme 🌙
        </Link>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-1">رمضان وتعلم العربية: أنشطة تربط اللغة بالثقافة</h1>
      <p className="text-base text-ink/75">استخدام الشهر الكريم كنقطة انطلاق لتعلم المفردات والحروف العربية</p>
      <AuthorBlock isAr />

      <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-2xl overflow-hidden border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/blog/blog_ramadan.png"
          alt="رمضان وتعلم العربية للأطفال"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-ink/70">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لماذا رمضان مثالي لتعلم العربية</h2>
          <p className="mb-3">
            رمضان هو الشهر الأغنى ثقافياً في التقويم الإسلامي. بالنسبة للعائلات — خاصة تلك التي تعيش في بلدان ذات أغلبية غير مسلمة — إنه وقت تصبح فيه اللغة والثقافة العربية حاضرة بشكل خاص في الحياة اليومية. التحيات تُتبادل بالعربية (&quot;رمضان مبارك!&quot;)، الصلوات تُتلى بالعربية، والأطعمة العربية التقليدية تظهر على المائدة.
          </p>
          <p className="mb-3">
            هذا الانغماس الطبيعي يخلق بيئة تعلم مثالية للأطفال الصغار. عندما ترتبط الكلمات العربية بتجارب حقيقية — طعم التمر، صوت الأذان، حماس فتح الإفطار — تصبح ذات معنى بدلاً من مجردة. الأطفال لا يتعلمون مفردات فحسب؛ بل يُشكّلون روابط عاطفية مع اللغة.
          </p>
          <p>
            فيما يلي أنشطة عملية تستثمر روح رمضان وتقاليده لترسيخ تعلم العربية لدى الأطفال في مختلف الأعمار. ويتضمن عرب فنجرز ثيماً خاصاً برمضان فيه أهلّة ونجوم وفوانيس تطفو في الخلفية — مثالي للموسم.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">مفردات رمضان للأطفال</h2>
          <p className="mb-3">ابدأ بتقديم هذه الكلمات الرمضانية الأساسية، وهي مفردات يسمعها طفلك ويراها فعلاً طوال الشهر. تدرّبوا على نطقها معاً، وأشِر إليها كلما وردت طبيعياً في البيت أو على المائدة أو في المسجد، فالكلمة المرتبطة بموقف حقيقي تثبت في الذاكرة أسرع بكثير من الكلمة المجردة:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { ar: "رمضان", en: "Ramadan", desc: "الشهر الكريم" },
              { ar: "صيام", en: "Fasting", desc: "الامتناع عن الطعام والشراب" },
              { ar: "إفطار", en: "Iftar", desc: "وجبة غروب الشمس" },
              { ar: "سحور", en: "Suhoor", desc: "وجبة ما قبل الفجر" },
              { ar: "تمر", en: "Dates", desc: "الفاكهة التقليدية للإفطار" },
              { ar: "مسجد", en: "Mosque", desc: "مكان الصلاة" },
              { ar: "صلاة", en: "Prayer", desc: "أداء العبادة" },
              { ar: "هلال", en: "Crescent", desc: "هلال رمضان" },
              { ar: "فانوس", en: "Lantern", desc: "فانوس رمضان التقليدي" },
              { ar: "قرآن", en: "Quran", desc: "الكتاب المقدس" },
              { ar: "زكاة", en: "Charity", desc: "العطاء للمحتاجين" },
              { ar: "عيد", en: "Eid", desc: "الاحتفال بعد رمضان" },
            ].map((word) => (
              <div key={word.ar} className="rounded-lg border border-ink/8 bg-card p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg text-accent font-semibold" style={{ fontFamily: "var(--font-noto-naskh), sans-serif" }}>{word.ar}</span>
                  <span className="text-ink/30">—</span>
                  <span className="text-xs text-ink/60">{word.en}</span>
                </div>
                <p className="text-[11px] text-ink/40">{word.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">أنشطة حسب العمر</h2>
          <h3 className="text-base font-semibold text-ink/90 mt-5 mb-3">🧒 عمر ١-٣: رمضان حسي</h3>
          <div className="space-y-3">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🌙 صيد حروف هلالية</h4>
              <p className="text-ink/75">اقطع أشكال هلال من ورق أصفر واكتب حرفاً عربياً على كل واحد. خبئها حول الغرفة ودع طفلك يجدها. عندما يجد واحداً، قل اسم الحرف معاً. &quot;وجدتَ الهاء! مثل هلال!&quot;</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🪘 جولة أصوات رمضان</h4>
              <p className="text-ink/75">اخرج في نزهة قصيرة وأنصت مع طفلك لأصوات رمضان: الأذان، وتبادل التهاني، وأصوات تحضير الإفطار. سمِّ كل صوت بالعربية. هذا ينمّي مهارة الإصغاء ويبني عند الطفل ارتباطات سمعية إيجابية باللغة منذ سنواته الأولى.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🕹️ ثيم رمضان في عرب فنجرز</h4>
              <p className="text-ink/75">بدّل عرب فنجرز لثيم رمضان من لوحة الوالدين. الأشكال الثلاثية الأبعاد العائمة تصبح أهلّة ونجوم وفوانيس. هذا التغيير البصري الموسمي يجدد اهتمام طفلك ويربط لعبه بأجواء رمضان في المنزل.</p>
            </div>
          </div>

          <h3 className="text-base font-semibold text-ink/90 mt-6 mb-3">📚 عمر ٤-٦: بناء المفردات</h3>
          <div className="space-y-3">
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">📋 جدار كلمات رمضان</h4>
              <p className="text-ink/75">أنشئ ملصقاً كبيراً بكلمات مفردات رمضان بالعربية والإنجليزية. كل يوم، تدرب على قراءة كلمة واحدة معاً. بنهاية رمضان، سيعرف طفلك ٣٠ كلمة عربية مرتبطة بتجارب حقيقية.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🎨 زيّن بالحروف العربية</h4>
              <p className="text-ink/75">اصنعوا زينة رمضانية تحمل خطاً عربياً. اكتب &quot;رمضان مبارك&quot; على لافتة، أو دع طفلك يزيّن فوانيس ورقية بالحروف التي يعرفها. هكذا يتحوّل الخط العربي إلى فن احتفالي يربط الطفل بجمال لغته دون أن يشعر أنه &quot;يدرس&quot;.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-4">
              <h4 className="font-semibold text-ink mb-1">🍽️ لعبة بطاقات الإفطار</h4>
              <p className="text-ink/75">قبل الإفطار، ضع بطاقات بأسماء الأطباق بالعربية. &quot;تمر&quot;، &quot;ماء&quot;، &quot;حساء&quot;. دع طفلك يطابق البطاقات مع الأطباق الصحيحة.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لتبقى الأمور واقعية للوالدين المشغولين</h2>
          <p className="mb-3">
            رمضان شهر مزدحم أصلاً — بين الصيام، وطول الصلوات، والواجبات العائلية، آخر ما يحتاجه أغلب الوالدين منهج تعليمي طموح يشعرون بالذنب إن قصّروا فيه. لذا نصيحتي، كأبٍ مرّ بهذه التجربة، أن تبقي توقعاتك صغيرة ومنسوجة في ما تفعله أصلاً.
          </p>
          <p className="mb-3">
            لست بحاجة إلى درس مخصص. تسمية الهلال حين يلمحه طفلك في السماء، أو قول &quot;بسم الله&quot; معاً قبل أول تمرة على الإفطار، أو الإشارة إلى الفانوس على المائدة وتكرار اسمه بالعربية — هذه اللحظات التي لا تتجاوز ثوانٍ تترك من المفردات الراسخة أكثر بكثير من نصف ساعة منظّمة يقاومها الطفل. فالتكرار على مدى شهر كامل، في سياق عاطفي دافئ، هو ما يجعل الكلمات تثبت.
          </p>
          <p>
            ومما وجدته مفيداً أن تختار ثلاث أو أربع كلمات فقط للشهر كله وتستعملها بلا انقطاع. فحين يأتي العيد، تكون تلك الكلمات القليلة جزءاً حقيقياً من حصيلة طفلك اللغوية — وهذا الفوز الصغير الحقيقي أثمن من قائمة طويلة يحفظها نصف حفظ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">اجعلها تقليداً</h2>
          <p className="mb-3">
            الجانب الأقوى في تعلم العربية القائم على رمضان هو أنه يصبح تقليداً. عندما يُنسج تعلم العربية في نسيج رمضان — جنباً إلى جنب مع الصيام والصلاة والصدقة والتجمعات العائلية — يصبح شيئاً يتطلع إليه الأطفال لا يقاومونه.
          </p>
          <p>
            ابدأ صغيراً، كن منتظماً، وركز على الاتصال أكثر من الكمال. الطفل الذي يربط العربية بدفء رمضان — رائحة الطعام، وفرحة العيد، واجتماع الأهل — سيحمل ذلك الارتباط الإيجابي مدى الحياة. وهذا الأساس العاطفي أثمن من أي منهج رسمي.
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3 mt-10 mb-4">
        <Link href="/ar/blog/arabic-calligraphy-for-kids" className="text-xs text-accent underline">← الخط العربي</Link>
        <Link href="/ar/blog" className="text-xs text-accent underline">جميع المقالات →</Link>
      </div>

      <div className="text-center py-6">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 جرب عرب فنجرز — ثيم رمضان 🌙
        </Link>
      </div>
    </>
  );
}
