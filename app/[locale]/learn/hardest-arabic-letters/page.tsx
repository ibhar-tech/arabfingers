import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { letterGuide, type LetterGuideEntry } from "@/lib/letterGuide";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/hardest-arabic-letters", {
    titleEn: "The 10 Hardest Arabic Letters for English Speakers",
    titleAr: "أصعب عشرة حروف عربية على الناطقين بالإنجليزية",
    descriptionEn:
      "Ten of the 28 Arabic letters have no English equivalent at all. Here is each one — where the sound is made, the nearest English sound and how it differs, the mistake learners reliably make, and what to do about it.",
    descriptionAr:
      "عشرة من حروف العربية الثمانية والعشرين لا نظير لها في الإنجليزية البتّة. إليك كلّ حرف منها: مخرجه، وأقرب صوت إنجليزي إليه وموضع الفرق، والخطأ الذي يقع فيه المتعلّمون عادةً، وعلاجه.",
    ogType: "article",
    publishedTime: "2026-08-20",
    modifiedTime: "2026-08-20",
    keywords: [
      "hardest arabic letters", "أصعب الحروف العربية",
      "arabic pronunciation for english speakers", "نطق العربية للناطقين بالإنجليزية",
      "arabic throat letters", "حروف الحلق",
      "emphatic letters arabic", "الحروف المُطبَقة",
    ],
  });
}

/* Sourced from lib/letterGuide.ts — the same data the full alphabet guide teaches
   from. The difficulty rating on each letter is what selects it into this article,
   so the two pages can never disagree about which letters are the hard ones. */
const hard = letterGuide.filter((l) => l.difficulty === "hard");
const counts = {
  easy: letterGuide.filter((l) => l.difficulty === "easy").length,
  medium: letterGuide.filter((l) => l.difficulty === "medium").length,
  hard: hard.length,
};

/** The ten split by why they are hard — throat position, emphasis, or the trill. */
const THROAT = ["ح", "خ", "ع", "غ", "ق"];
const EMPHATIC = ["ص", "ض", "ط", "ظ"];

const groups = [
  {
    id: "throat",
    titleEn: "The throat letters",
    titleAr: "حروف الحلق",
    introEn:
      "Five of the ten are made further back in the throat than any English sound goes. English stops at the soft palate; Arabic keeps going, down through the uvula to the pharynx. This is not a matter of accent — it is a place of articulation English simply does not use, which is why imitation alone rarely works and a physical instruction does.",
    introAr:
      "خمسة من العشرة مخرجها أعمق في الحلق من كلّ صوت إنجليزيّ. فالإنجليزية تقف عند أقصى الحنك، والعربية تمضي أبعد، إلى اللهاة ثمّ الحلق. وليست المسألة لكنةً، بل مخرجٌ لا تستعمله الإنجليزية أصلاً، ولذلك قلّما تنفع المحاكاة وحدها، وينفع الوصف الجسديّ.",
    letters: THROAT,
  },
  {
    id: "emphatic",
    titleEn: "The emphatic letters",
    titleAr: "الحروف المُطبَقة",
    introEn:
      "Four more are the heavy twins of letters your child already knows: ص is a heavy س, ض a heavy د, ط a heavy ت, ظ a heavy ذ. The tongue flattens and the back of it rises toward the roof of the mouth, which darkens the vowel next to it. Say “sun” then “soft” and notice the tongue shift — Arabic makes that difference carry meaning.",
    introAr:
      "وأربعة أخرى هي التوائم الثقيلة لحروف يعرفها طفلك: فالصاد سين مُفخَّمة، والضاد دال مُفخَّمة، والطاء تاء مُفخَّمة، والظاء ذال مُفخَّمة. ينبسط اللسان ويرتفع أقصاه نحو الحنك فيُظلم الصوت المجاور. والعربية تجعل هذا الفرق فارقاً في المعنى، لا مجرّد نبرة.",
    letters: EMPHATIC,
  },
  {
    id: "trill",
    titleEn: "And the rolled ر",
    titleAr: "والراء المكرّرة",
    introEn:
      "The tenth is not a throat sound or an emphatic — it is a tap or trill, where the tongue tip bounces off the ridge behind the teeth. English has this sound but hides it: it is the middle of “butter” in most American accents. Children who can already say that have the motion; they just have not been told it is the same one.",
    introAr:
      "والعاشر ليس حلقياً ولا مُطبَقاً، بل هو تكرار: يرتدّ طرف اللسان على ما وراء الثنايا. والإنجليزية فيها هذا الصوت لكنّها تُخفيه، فهو وسط كلمة «butter» في أكثر اللهجات الأمريكية. والطفل الذي يحسن قولها يملك الحركة، وإنّما لم يُخبَر أنّها هي هي.",
    letters: ["ر"],
  },
];

const faqs = [
  {
    qEn: "Should I make my child practise these first, or last?",
    qAr: "أأدرّب طفلي على هذه أولاً أم آخراً؟",
    aEn: "Neither. Teach the alphabet in its normal order and let these arrive when they arrive. Singling out the ten hard letters for drill is how a four-year-old learns that Arabic is the language where they fail. The point of knowing which letters are hard is that you stop expecting them to be right quickly — not that you attack them.",
    aAr: "لا هذا ولا ذاك. علّمه الأبجدية على ترتيبها ودَع هذه تأتي في أوانها. فإفراد الحروف العشرة الصعبة بالتدريب هو الطريق ليتعلّم ابن الرابعة أنّ العربية هي اللغة التي يفشل فيها. وإنّما فائدة معرفتك بصعوبتها أن تكفّ عن توقّع إتقانها سريعاً، لا أن تهجم عليها.",
  },
  {
    qEn: "My own pronunciation is not good. Will I teach it wrong?",
    qAr: "نطقي أنا ليس جيّداً، أفأعلّمه خطأً؟",
    aEn: "Probably a little, and it matters less than you fear. A child who hears an imperfect ع from a parent and a clear one from a recording or a grandparent will converge on the clear one. What they cannot recover from is never hearing the sound at all. Use the recordings for the reference and your own voice for the company.",
    aAr: "لعلّك تفعل قليلاً، والأمر أهون ممّا تخشى. فالطفل الذي يسمع عيناً غير محكمة من والده وأخرى محكمة من تسجيل أو من جدّه يميل إلى المحكمة. والذي لا يُتدارَك أن لا يسمع الصوت أصلاً. فاجعل التسجيل مرجعاً وصوتك أنت مؤنساً.",
  },
  {
    qEn: "At what age should these sounds be correct?",
    qAr: "في أيّ سنّ يستقيم نطق هذه الأصوات؟",
    aEn: "Later than you would think, and later than the easy letters by a wide margin. Arabic-speaking children raised in Arabic-speaking countries commonly do not settle ع, ح and ق until five or six, and the emphatics can take longer still. A three-year-old approximating them is on schedule, not behind.",
    aAr: "أمّا الاستقامة فمتأخّرة عمّا تظنّ، ومتأخّرة عن الحروف السهلة بفارق كبير. فأطفال العرب في بلادهم كثيراً ما لا تستقيم لهم العين والحاء والقاف قبل الخامسة أو السادسة، والمُطبَقة قد تطول أكثر. وابن الثالثة الذي يقاربها في موعده لا متأخّر.",
  },
  {
    qEn: "Is it worth correcting every time?",
    qAr: "أيستحقّ التصحيح في كلّ مرّة؟",
    aEn: "No. Correcting every attempt turns a game into a test, and a child who expects a correction stops volunteering the word at all. Say the word back correctly in your normal voice and carry on — recasting, not correcting. They hear the difference without being told they were wrong.",
    aAr: "لا. فالتصحيح في كلّ محاولة يحيل اللعب امتحاناً، والطفل الذي يتوقّع التصحيح يكفّ عن المبادرة بالكلمة أصلاً. أعِد الكلمة صحيحةً بصوتك المعتاد وامضِ — إعادةَ صياغةٍ لا تصحيحاً. فيسمع الفرق دون أن يُقال له إنّه أخطأ.",
  },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="The 10 Hardest Arabic Letters for English Speakers"
        description="The ten Arabic letters with no English equivalent — where each sound is made, the mistake learners reliably make, and what to do about it."
        slug="learn/hardest-arabic-letters"
        datePublished="2026-08-20"
        dateModified="2026-08-20"
        section="Pronunciation"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "أصعب الحروف" : "Hardest Letters" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}

      <section className="mt-2 mb-8">
        <h2 className="text-xl font-semibold text-ink mb-4">{isAr ? "أسئلة شائعة" : "Frequently Asked Questions"}</h2>
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
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          📖 {isAr ? "دليل الحروف الكامل" : "The full alphabet guide"}
        </Link>
      </div>
    </PageLayout>
  );
}

function LetterCard({ l, isAr }: { l: LetterGuideEntry; isAr: boolean }) {
  return (
    <div className="rounded-xl border border-ink/8 bg-card p-5">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-4xl text-ink leading-none" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>{l.ar}</span>
        <div>
          <h3 className="font-semibold text-ink">{isAr ? l.arName : l.enName}</h3>
          <p className="text-xs text-ink/50 font-mono">{l.translit}</p>
        </div>
      </div>
      <dl className="space-y-2 text-ink/80">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{isAr ? "المخرج" : "How to make it"}</dt>
          <dd className="mt-0.5">{isAr ? l.soundHowToAr : l.soundHowToEn}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{isAr ? "تمييزه" : "Nearest English sound"}</dt>
          <dd className="mt-0.5">{isAr ? l.comparisonAr : l.comparisonEn}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{isAr ? "الخطأ الشائع" : "The common mistake"}</dt>
          <dd className="mt-0.5">{isAr ? l.mistakeAr : l.mistakeEn}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-ink/45">{isAr ? "نصيحة للوالدين" : "What to do about it"}</dt>
          <dd className="mt-0.5">{isAr ? l.parentTipAr : l.parentTipEn}</dd>
        </div>
      </dl>
    </div>
  );
}

function Groups({ isAr }: { isAr: boolean }) {
  return (
    <>
      {groups.map((g) => (
        <section key={g.id}>
          <h2 className="text-xl font-semibold text-ink mb-3">{isAr ? g.titleAr : g.titleEn}</h2>
          <p className="mb-4">{isAr ? g.introAr : g.introEn}</p>
          <div className="space-y-4">
            {g.letters
              .map((ch) => hard.find((l) => l.ar === ch))
              .filter((l): l is LetterGuideEntry => Boolean(l))
              .map((l) => (
                <LetterCard key={l.ar} l={l} isAr={isAr} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">The 10 Hardest Arabic Letters for English Speakers</h1>
      <p className="text-base text-ink/75 mb-8">Where each sound lives, and what actually helps</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Ten of twenty-eight</h2>
          <p className="mb-3">Most of the Arabic alphabet is easier than its reputation. Of the 28 letters, we rate {counts.easy} as straightforward for an English-speaking learner — ب is a b, م is an m, and a child who can say them in English can say them in Arabic on the first try. Another {counts.medium} sit in between.</p>
          <p className="mb-3">That leaves {counts.hard}. These are the ones with no English equivalent at all — not a slightly different vowel or a rolled consonant, but sounds English never makes in any word. They are the reason a parent can teach the alphabet confidently for twenty minutes and then hit a wall.</p>
          <p>This page is the wall, letter by letter. For each one: where in the mouth or throat it is made, the nearest English sound and exactly how it differs, the mistake learners reliably make, and one thing to do about it.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Why these ten and not others</h2>
          <p className="mb-3">They fall into three groups, and knowing which group a letter belongs to tells you what kind of help it needs. Five are made deeper in the throat than English ever goes. Four are &quot;emphatic&quot; — heavy versions of letters your child already knows, where the whole tongue changes shape. One is the rolled ر, which is a motion problem rather than a placement problem.</p>
          <p>Grouping them this way matters practically: the throat letters need a physical instruction, the emphatics need a contrast pair, and ر needs a motion your child probably already owns.</p>
        </section>

        <Groups isAr={false} />

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The honest timeline</h2>
          <p className="mb-3">If you take one thing from this page, take this: these sounds arrive late, and they arrive late for Arabic-speaking children in Arabic-speaking countries too. ع, ح and ق commonly do not settle until five or six. The emphatics can take longer.</p>
          <p className="mb-3">A three-year-old who says a soft h where ح belongs is not struggling. They are doing exactly what a three-year-old in Cairo does. The difference is that nobody in Cairo is anxiously watching for it.</p>
          <p>So the goal before school age is not accuracy. It is that the child has heard the sound often enough, from a clear source, that their ear knows it exists and knows it is different from its neighbour. The mouth catches up later, and it catches up on its own.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What to do with this page</h2>
          <p className="mb-3">Not a curriculum. Read it once so you know what is coming, then close it and go back to the alphabet in its ordinary order.</p>
          <p>When your child reaches one of these letters and it comes out wrong, you will know why, you will know it is expected, and you will have one concrete thing to try instead of simply repeating the letter louder. That is the whole use of it.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">أصعب عشرة حروف عربية على الناطقين بالإنجليزية</h1>
      <p className="text-base text-ink/75 mb-8">أين مخرج كلّ صوت، وما الذي ينفع فعلاً</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">عشرة من ثمانية وعشرين</h2>
          <p className="mb-3">أكثر الأبجدية العربية أيسر ممّا اشتُهر عنها. فمن الحروف الثمانية والعشرين نعدّ {counts.easy} حرفاً ميسوراً على المتعلّم الناطق بالإنجليزية — فالباء باء، والميم ميم، ومن أحسنها في لغته أحسنها في العربية من أوّل مرّة. و{counts.medium} أخرى بين بين.</p>
          <p className="mb-3">فيبقى {counts.hard}. وهذه هي التي لا نظير لها في الإنجليزية البتّة — لا حركةً مختلفة قليلاً ولا صامتاً مكرّراً، بل أصواتاً لا تنطقها الإنجليزية في كلمة قطّ. وهي سبب أن يعلّم الوالد الأبجدية واثقاً عشرين دقيقة ثمّ يصطدم بجدار.</p>
          <p>وهذه الصفحة هي ذلك الجدار، حرفاً حرفاً. لكلّ حرف: مخرجه من الفم أو الحلق، وأقرب صوت إنجليزيّ إليه وموضع الفرق بالضبط، والخطأ الذي يقع فيه المتعلّمون عادةً، وأمرٌ واحد تصنعه حياله.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لماذا هذه العشرة دون غيرها</h2>
          <p className="mb-3">تنتظم في ثلاث طوائف، ومعرفتك بطائفة الحرف تدلّك على نوع العون الذي يحتاجه. فخمسة مخرجها أعمق في الحلق ممّا تبلغه الإنجليزية. وأربعة مُطبَقة، أي نظائر ثقيلة لحروف يعرفها طفلك، يتغيّر فيها شكل اللسان كلّه. وواحد هو الراء المكرّرة، ومشكلتها في الحركة لا في المخرج.</p>
          <p>ولهذا التقسيم فائدة عملية: فالحلقية تحتاج وصفاً جسديّاً، والمُطبَقة تحتاج مقابلةً بنظيرها، والراء تحتاج حركةً يملكها طفلك على الأرجح.</p>
        </section>

        <Groups isAr={true} />

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">الجدول الزمنيّ الصادق</h2>
          <p className="mb-3">إن أخذت من هذه الصفحة شيئاً واحداً فخذ هذا: هذه الأصوات تأتي متأخّرة، وتأتي متأخّرة عند أطفال العرب في بلاد العرب أيضاً. فالعين والحاء والقاف كثيراً ما لا تستقيم قبل الخامسة أو السادسة، والمُطبَقة قد تطول أكثر.</p>
          <p className="mb-3">وابن الثالثة الذي يقول هاءً ليّنة مكان الحاء ليس متعثّراً، بل يصنع ما يصنعه ابن الثالثة في القاهرة تماماً. والفرق أنّ أحداً في القاهرة لا يرقب ذلك قلِقاً.</p>
          <p>فالمقصود قبل سنّ المدرسة ليس الإصابة، بل أن يكون الطفل قد سمع الصوت كثيراً من مصدر واضح حتى تعرف أذنه أنّه موجود وأنّه غير جاره. أمّا الفم فيلحق بعد، ويلحق وحده.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ماذا تصنع بهذه الصفحة</h2>
          <p className="mb-3">ليست منهجاً. اقرأها مرّة لتعلم ما أنت قادم عليه، ثمّ أغلقها وعُد إلى الأبجدية على ترتيبها المعتاد.</p>
          <p>فإذا بلغ طفلك حرفاً منها فخرج على غير وجهه، عرفتَ السبب، وعرفتَ أنّه متوقَّع، وكان عندك أمرٌ محدّد تجرّبه بدل أن تعيد الحرف بصوت أعلى. وهذه فائدتها كلّها.</p>
        </section>
      </div>
    </>
  );
}
