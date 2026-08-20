import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { getKeyboardLayout } from "@/lib/keyboardLayouts";
import { arabicLetters } from "@/lib/arabicMap";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-keyboard-layout-for-kids", {
    titleEn: "Which Arabic Keyboard Layout Should a Child Use?",
    titleAr: "أيّ تخطيط لوحة مفاتيح عربية يناسب الطفل؟",
    descriptionEn:
      "Switch a computer to Arabic and six keys stop producing letters of the alphabet at all. Here is what those keys actually type, why it confuses a child learning the 28 letters, and which layout to use instead.",
    descriptionAr:
      "حين تحوّل الحاسوب إلى العربية تتوقّف ستّة مفاتيح عن إخراج أيّ حرف من حروف الأبجدية. إليك ما تكتبه تلك المفاتيح فعلاً، ولماذا تربك الطفل الذي يتعلّم الحروف الثمانية والعشرين، وأيّ تخطيط تستعمل بدلاً منها.",
    ogType: "article",
    publishedTime: "2026-08-20",
    modifiedTime: "2026-08-20",
    keywords: [
      "arabic keyboard layout", "تخطيط لوحة المفاتيح العربية",
      "arabic keyboard for kids", "لوحة مفاتيح عربية للأطفال",
      "phonetic arabic keyboard", "لوحة مفاتيح عربية صوتية",
      "type arabic letters", "كتابة الحروف العربية",
    ],
  });
}

/* The tables below are generated from the same layout data the letter game runs on
   (lib/keyboardLayouts.ts), not retyped here. If a mapping ever changes in the app,
   this article changes with it — an article about a product should not be able to
   drift out of sync with the product it describes. */
const standard = getKeyboardLayout("arabic-standard");
const phonetic = getKeyboardLayout("arabic-phonetic");
const alphabet = new Set(arabicLetters.map((l) => l.ar));

/** Standard-layout keys whose output is NOT one of the 28 letters. */
const nonLetterKeys = Object.entries(standard.mapping).filter(([, ch]) => !alphabet.has(ch));

const nonLetterNotes: Record<string, { en: string; ar: string }> = {
  "ئ": {
    en: "Hamza on a ya-shaped seat. The hamza is a glottal stop — the catch in the middle of “uh-oh” — and it rides on a carrier letter. It is not a 29th letter.",
    ar: "همزة على نبرة. والهمزة صوت قطع في الحلق، تُكتب على كرسيّ من حرف، وليست حرفاً تاسعاً وعشرين.",
  },
  "ء": {
    en: "The bare hamza, written with no seat at all. Same sound, different placement rule.",
    ar: "الهمزة المفردة تُكتب بلا كرسيّ. الصوت نفسه، والقاعدة في الرسم مختلفة.",
  },
  "ؤ": {
    en: "Hamza on a waw-shaped seat — the third of the three carriers a child will meet later.",
    ar: "همزة على واو، وهي ثالث الكراسي التي سيلقاها الطفل لاحقاً.",
  },
  "لا": {
    en: "Lam-alef: two letters, ل and ا, fused into one shape. Pressing one key produces two letters at once.",
    ar: "لام ألف: حرفان، اللام والألف، اندمجا في شكل واحد. فالضغطة الواحدة تُخرج حرفين معاً.",
  },
  "ى": {
    en: "Alef maqsura — an alef that is written like a ya at the end of a word. A spelling variant, not a separate letter.",
    ar: "الألف المقصورة: ألف تُرسم ياءً في آخر الكلمة. صورة إملائية، لا حرفاً مستقلاً.",
  },
  "ة": {
    en: "Ta marbuta — the “tied ta” that closes most feminine words. A form of ت, and a spelling rule a child meets after the alphabet, not during it.",
    ar: "التاء المربوطة التي تُختم بها أكثر الكلمات المؤنّثة. صورة من التاء، وقاعدة تأتي بعد الأبجدية لا أثناءها.",
  },
};

const faqs = [
  {
    qEn: "Is the standard Arabic layout wrong?",
    qAr: "هل التخطيط العربي القياسيّ خاطئ؟",
    aEn: "Not at all — it is exactly right for its job. It was designed for adults writing Arabic prose, where hamza carriers, lam-alef and ta marbuta are needed constantly. It was never designed to teach the alphabet, and that is the only sense in which it is a poor fit for a four-year-old.",
    aAr: "لا البتّة، بل هو صحيح تماماً لغرضه. فقد صُمِّم لبالغين يكتبون نصّاً عربياً تكثر فيه الهمزات ولام ألف والتاء المربوطة. ولم يُصمَّم يوماً لتعليم الأبجدية، وهذا وحده وجه قصوره مع ابن الرابعة.",
  },
  {
    qEn: "Will the phonetic layout teach my child bad habits?",
    qAr: "هل يورّث التخطيط الصوتيّ طفلي عادات خاطئة؟",
    aEn: "It teaches letter recognition, not typing. A child who later needs to write Arabic properly will learn the standard layout then, the same way they learn a physical pen grip separately from learning letter shapes. The phonetic map exists so that pressing a key reliably produces a letter from the chart on the wall.",
    aAr: "إنّما يعلّم معرفة الحروف لا الطباعة. والطفل الذي سيحتاج لاحقاً إلى كتابة العربية كتابةً صحيحة سيتعلّم التخطيط القياسيّ حينها، كما يتعلّم مسك القلم مستقلاً عن تعلّم أشكال الحروف. وإنّما وُجد التخطيط الصوتيّ ليُخرج كلُّ مفتاح حرفاً من اللوحة المعلّقة على الجدار.",
  },
  {
    qEn: "Do I need to change my computer's settings to use the letter game?",
    qAr: "هل أحتاج إلى تغيير إعدادات حاسوبي لاستعمال لعبة الحروف؟",
    aEn: "No. The game reads the physical key you press and maps it itself, so your operating system can stay in English. Changing the system layout is only necessary when you want to type Arabic into other programs.",
    aAr: "لا. فاللعبة تقرأ المفتاح الذي ضغطته وتترجمه بنفسها، فيبقى نظامك على الإنجليزية. وإنّما تحتاج إلى تغيير تخطيط النظام حين تريد كتابة العربية في برامج أخرى.",
  },
  {
    qEn: "What about AZERTY keyboards?",
    qAr: "وماذا عن لوحات AZERTY؟",
    aEn: "Common across North Africa and France, and the Arabic layout built on it shifts the letters to different physical keys. If your keyboard is AZERTY, choose that option in the parent panel so the printed keycaps and the letters agree.",
    aAr: "هي شائعة في شمال إفريقيا وفرنسا، والتخطيط العربيّ المبنيّ عليها ينقل الحروف إلى مفاتيح أخرى. فإن كانت لوحتك AZERTY فاختر ذلك في لوحة الوالدين ليتوافق المطبوع على المفاتيح مع الحروف.",
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
        title="Which Arabic Keyboard Layout Should a Child Use?"
        description="Six keys on the standard Arabic layout do not produce a letter of the alphabet. What they type instead, and which layout suits a child learning the 28 letters."
        slug="learn/arabic-keyboard-layout-for-kids"
        datePublished="2026-08-20"
        dateModified="2026-08-20"
        section="Practical"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "لوحة المفاتيح" : "Keyboard Layouts" },
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
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          ⌨️ {isAr ? "جرّب لوحة المفاتيح الآن" : "Try it on the letter game"}
        </Link>
      </div>
    </PageLayout>
  );
}

function NonLetterTable({ isAr }: { isAr: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink/10">
            <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "المفتاح" : "Key"}</th>
            <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "ما يظهر" : "What appears"}</th>
            <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "ما هو فعلاً" : "What it actually is"}</th>
          </tr>
        </thead>
        <tbody className="text-ink/80">
          {nonLetterKeys.map(([key, ch]) => (
            <tr key={key} className="border-b border-ink/5">
              <td className="py-2.5 px-3 font-mono text-ink/85 uppercase whitespace-nowrap">{key}</td>
              <td className="py-2.5 px-3 text-center text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>{ch}</td>
              <td className="py-2.5 px-3">{isAr ? nonLetterNotes[ch]?.ar : nonLetterNotes[ch]?.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhoneticTable({ isAr }: { isAr: boolean }) {
  const rows = Object.entries(phonetic.mapping);
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {rows.map(([key, ch]) => {
          const letter = arabicLetters.find((l) => l.ar === ch);
          return (
            <div key={key} className="rounded-lg border border-ink/8 bg-card p-2 text-center">
              <div className="font-mono text-xs uppercase text-ink/50">{key === "," ? "," : key === ";" ? ";" : key}</div>
              <div className="text-2xl text-ink" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>{ch}</div>
              <div className="text-[0.65rem] font-semibold text-ink/55">{isAr ? letter?.arName : letter?.enName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">Which Arabic Keyboard Layout Should a Child Use?</h1>
      <p className="text-base text-ink/75 mb-8">What we found building a letter game that listens to every key</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The problem nobody warns you about</h2>
          <p className="mb-3">Switch a computer to Arabic and you get the standard Arabic layout. It is the layout on every Arabic keyboard sold, it is what an Arabic-speaking adult uses all day, and it is genuinely excellent at what it was built for: writing Arabic prose quickly.</p>
          <p className="mb-3">It was not built to teach the alphabet. We discovered this the blunt way. An early version of our letter game read the standard layout directly, and testing it with a small child produced a puzzle: some keys made a letter appear and say its name, and some keys made <em>something</em> appear that was not on the alphabet chart at all — and the game did not know what to call it.</p>
          <p>Six of the letter keys on the standard Arabic layout do not produce any of the 28 letters of the alphabet.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The six keys, and what they really type</h2>
          <p className="mb-4">Every one of these is correct, necessary Arabic. None of them is a letter of the alphabet a child is learning to name.</p>
          <NonLetterTable isAr={false} />
          <p className="mt-4">Three are hamza carriers, one is a ligature of two letters printed as a single shape, and two are spelling variants that belong to a later stage of reading. An adult writing Arabic needs all six constantly. A three-year-old pressing keys at random has no use for any of them yet.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Why this matters more than it sounds</h2>
          <p className="mb-3">A child at this age is not typing. They are pressing keys to find out what happens — which is the whole point, and the reason a keyboard is such a good toy at three. The keyboard is a box of 28 surprises, and the child&apos;s job is to work out that each surprise has a name.</p>
          <p className="mb-3">That bargain breaks the moment a key produces something unnameable. Press <span className="font-mono">B</span> on the standard layout and you get لا — which is two letters wearing one shape. There is no honest answer to &quot;what&apos;s that one called?&quot;, because the answer is a spelling rule, and the child asking is three.</p>
          <p>It is a small thing, and it matters for a specific reason: a learning toy earns trust by being consistent. Every key gives a letter, every letter has a name, and the name is on the chart. Six exceptions out of roughly thirty is enough for a child to stop expecting the rule to hold.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">The phonetic layout, which fixes it</h2>
          <p className="mb-4">A phonetic layout maps each Latin key to the Arabic letter that sounds closest to it: <span className="font-mono">A</span> gives ا, <span className="font-mono">B</span> gives ب, <span className="font-mono">T</span> gives ت. It covers all 28 letters, one key each, and nothing else.</p>
          <PhoneticTable isAr={false} />
          <p className="mt-4">The mapping is not perfect Arabic phonetics — Arabic has more consonants than the Latin alphabet has letters, so the emphatic pairs have to share. <span className="font-mono">S</span> takes س and <span className="font-mono">P</span> takes ص; <span className="font-mono">D</span> takes د and <span className="font-mono">U</span> takes ض. Those second choices are arbitrary and we do not pretend otherwise. What matters at this age is that the key always gives a letter, and the letter always has a name.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Which layout for which job</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Phonetic — for learning the letters</h3>
              <p className="text-ink/80">All 28 letters, one key each, no ligatures or spelling variants. This is what the letter game uses by default, and what we would pick for any child under about seven.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">Standard — for actually writing Arabic</h3>
              <p className="text-ink/80">The right choice the moment your child is writing Arabic rather than meeting it: school work, messages, anything with real words in it. The six keys that confused a three-year-old are exactly the keys a writer needs.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">AZERTY-based — for North African and French keyboards</h3>
              <p className="text-ink/80">Same Arabic letters, different physical keys, because the underlying keyboard is AZERTY rather than QWERTY. Pick this if the letters printed on your keycaps do not match what appears on screen.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">You do not need to change any settings</h2>
          <p className="mb-3">Worth saying plainly, because it trips people up: the letter game reads the physical key you pressed and does the mapping itself. Your computer can stay in English. Nothing is installed and no system setting changes.</p>
          <p>You only need your operating system&apos;s Arabic layout when you want to type Arabic into other programs — a document, a search box, a message. That is a separate skill, and a later one.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">What we chose</h2>
          <p className="mb-3">The letter game defaults to the phonetic layout for the reasons above, and the on-screen letter tiles are labelled to match it — the tile for ب says <span className="font-mono">B</span>, because pressing <span className="font-mono">B</span> is what produces it.</p>
          <p>Parents who own a real Arabic keyboard and want the printed keycaps to agree with the screen can switch to standard or AZERTY in the parent panel. It is the one keyboard setting worth checking before you hand the device over.</p>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink mb-2">أيّ تخطيط لوحة مفاتيح عربية يناسب الطفل؟</h1>
      <p className="text-base text-ink/75 mb-8">ما تبيّن لنا ونحن نبني لعبة حروف تُصغي إلى كلّ مفتاح</p>

      <div className="space-y-8 text-sm leading-relaxed text-ink/80">
        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">مشكلة لا يحذّرك منها أحد</h2>
          <p className="mb-3">حوّل الحاسوب إلى العربية يظهر لك التخطيط العربيّ القياسيّ. وهو التخطيط المطبوع على كلّ لوحة مفاتيح عربية تُباع، وهو ما يستعمله الكاتب العربيّ طوال يومه، وهو ممتاز حقّاً فيما بُني له: كتابة النصّ العربيّ بسرعة.</p>
          <p className="mb-3">لكنّه لم يُبنَ لتعليم الأبجدية. وقد اكتشفنا ذلك على نحوٍ فجّ. فقد كانت نسخة مبكّرة من لعبة الحروف تقرأ التخطيط القياسيّ مباشرة، فأنتجت تجربتها مع طفل صغير لغزاً: بعض المفاتيح يُظهر حرفاً وينطق اسمه، وبعضها يُظهر <em>شيئاً</em> ليس على لوحة الحروف أصلاً — واللعبة نفسها لا تعرف بماذا تسمّيه.</p>
          <p>ستّة من مفاتيح الحروف في التخطيط العربيّ القياسيّ لا تُخرج أيّ حرف من حروف الأبجدية الثمانية والعشرين.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">المفاتيح الستّة وما تكتبه حقّاً</h2>
          <p className="mb-4">كلّ واحد من هذه صحيحٌ لازمٌ في العربية. وليس واحد منها حرفاً من حروف الأبجدية التي يتعلّم الطفل تسميتها.</p>
          <NonLetterTable isAr={true} />
          <p className="mt-4">ثلاثة منها كراسيّ للهمزة، وواحد ائتلاف حرفين في شكل واحد، واثنان صورتان إملائيتان تنتميان إلى طور لاحق من القراءة. والبالغ الذي يكتب العربية يحتاجها كلّها في كلّ سطر. أمّا ابن الثالثة الذي يضغط المفاتيح عشوائياً فلا حاجة له بشيء منها بعد.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لماذا هذا أهمّ ممّا يبدو</h2>
          <p className="mb-3">الطفل في هذه السنّ لا يكتب، وإنّما يضغط المفاتيح ليرى ماذا يحدث — وهذا هو المقصود كلّه، وهو سرّ كون لوحة المفاتيح لعبةً جيّدة لابن الثالثة. فاللوحة عنده صندوق فيه ثمانٍ وعشرون مفاجأة، ومهمّته أن يكتشف أنّ لكلّ مفاجأة اسماً.</p>
          <p className="mb-3">وينفرط هذا العقد لحظة يُخرج مفتاحٌ شيئاً لا يُسمّى. اضغط <span className="font-mono">B</span> في التخطيط القياسيّ تجد «لا» — وهي حرفان في شكل واحد. وليس ثمّة جواب صادق عن سؤال «وهذا ما اسمه؟»، لأنّ الجواب قاعدة إملائية، والسائل ابن ثلاث.</p>
          <p>وهو أمر صغير، وإنّما يهمّ لسبب بعينه: لعبة التعلّم تكسب الثقة باطّرادها. كلّ مفتاح يعطي حرفاً، ولكلّ حرف اسم، والاسم على اللوحة. وستّة استثناءات من نحو ثلاثين كافية ليكفّ الطفل عن توقّع اطّراد القاعدة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">التخطيط الصوتيّ الذي يعالج ذلك</h2>
          <p className="mb-4">التخطيط الصوتيّ يربط كلّ مفتاح لاتينيّ بالحرف العربيّ الأقرب إليه صوتاً: <span className="font-mono">A</span> تعطي ا، و<span className="font-mono">B</span> تعطي ب، و<span className="font-mono">T</span> تعطي ت. وهو يغطّي الحروف الثمانية والعشرين كلّها، لكلّ حرفٍ مفتاح، ولا شيء سواها.</p>
          <PhoneticTable isAr={true} />
          <p className="mt-4">وليس هذا الربط صوتيّات عربية دقيقة — ففي العربية من الصوامت أكثر ممّا في اللاتينية من حروف، فلا بدّ أن تتقاسم المفاتيحَ الحروفُ المُطبَقة ونظائرها. فالسين على <span className="font-mono">S</span> والصاد على <span className="font-mono">P</span>، والدال على <span className="font-mono">D</span> والضاد على <span className="font-mono">U</span>. وهذه الخيارات الثانية اعتباطية ولا ندّعي غير ذلك. والذي يهمّ في هذه السنّ أن يُخرج المفتاح حرفاً دائماً، وأن يكون للحرف اسم دائماً.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">أيّ تخطيط لأيّ غرض</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">الصوتيّ — لتعلّم الحروف</h3>
              <p className="text-ink/80">الحروف الثمانية والعشرون، لكلّ حرفٍ مفتاح، بلا ائتلافات ولا صور إملائية. وهو ما تستعمله لعبة الحروف افتراضاً، وما نختاره لكلّ طفل دون السابعة تقريباً.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">القياسيّ — لكتابة العربية فعلاً</h3>
              <p className="text-ink/80">هو الخيار الصحيح لحظة يصير طفلك يكتب العربية لا يتعرّف إليها: واجبات المدرسة والرسائل وكلّ ما فيه كلمات حقيقية. فالمفاتيح الستّة التي أربكت ابن الثالثة هي عينها ما يحتاجه الكاتب.</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-card p-5">
              <h3 className="font-semibold text-ink mb-2">المبنيّ على AZERTY — للوحات شمال إفريقيا وفرنسا</h3>
              <p className="text-ink/80">الحروف العربية نفسها على مفاتيح أخرى، لأنّ اللوحة تحتها AZERTY لا QWERTY. اخترْه إن كانت الحروف المطبوعة على مفاتيحك لا توافق ما يظهر على الشاشة.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">لا تحتاج إلى تغيير أيّ إعداد</h2>
          <p className="mb-3">يحسن قول هذا صراحةً لأنّه يلتبس على الناس: لعبة الحروف تقرأ المفتاح الذي ضغطته وتتولّى الربط بنفسها. فيبقى حاسوبك على الإنجليزية. ولا يُثبَّت شيء ولا يتغيّر إعداد في النظام.</p>
          <p>وإنّما تحتاج إلى التخطيط العربيّ في نظامك حين تريد كتابة العربية في برامج أخرى: مستند أو مربّع بحث أو رسالة. وتلك مهارة أخرى، ومتأخّرة.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">ماذا اخترنا</h2>
          <p className="mb-3">تبدأ لعبة الحروف بالتخطيط الصوتيّ للأسباب المتقدّمة، وبطاقات الحروف على الشاشة مكتوبة بما يوافقه — فبطاقة الباء عليها <span className="font-mono">B</span>، لأنّ ضغط <span className="font-mono">B</span> هو ما يُخرجها.</p>
          <p>ومن كان عنده لوحة مفاتيح عربية حقيقية وأراد أن يوافق المطبوعُ على المفاتيح ما على الشاشة، فله أن يحوّل إلى القياسيّ أو AZERTY من لوحة الوالدين. وهو الإعداد الوحيد في هذا الباب الذي يستحقّ أن تراجعه قبل أن تسلّم الجهاز للطفل.</p>
        </section>
      </div>
    </>
  );
}
