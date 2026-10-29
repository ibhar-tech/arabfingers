import type { Metadata } from "next";
import { RelatedArticles } from "@/components/RelatedArticles";
import { getRelatedArticles } from "@/lib/related";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { WorksheetCrossLink } from "@/components/WorksheetCrossLink";
import { ArticleMeta } from "@/components/ArticleMeta";
import { SpeakButton } from "@/components/SpeakButton";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-numbers", {
    titleEn: "Arabic Numbers for Kids (0–10): Names, Pronunciation & Counting Games",
    titleAr: "الأرقام العربية للأطفال (0–10): الأسماء والنطق وألعاب العدّ",
    descriptionEn:
      "Learn to count from 0 to 10 in Arabic with familiar 0–9 digits, Arabic number names, pronunciation, counting games, and free tracing worksheets.",
    descriptionAr:
      "تعلّم العدّ من 0 إلى 10 بالعربية باستخدام الأرقام 0–9، مع أسماء الأعداد ونطقها وألعاب العدّ وأوراق تتبّع مجانية.",
    ogType: "article",
    publishedTime: "2026-03-12",
    modifiedTime: "2026-09-29",
    keywords: [
      "arabic numbers for kids", "الأرقام العربية للأطفال",
      "counting in arabic", "العد بالعربية",
      "arabic number names", "أسماء الأعداد بالعربية",
    ],
  });
}

const numbers = [
  { numeral: "0", arWord: "صفر", enWord: "Zero", enPron: "Sifr", factEn: "An empty plate has zero apples. Put one apple on it, then take it away and say sifr (zero).", factAr: "الطبق الفارغ فيه صفر من التفّاح. ضع عليه تفاحة ثم ارفعها وقل: صفر." },
  { numeral: "1", arWord: "واحد", enWord: "One", enPron: "Waahid", factEn: "Hold up one finger and say waahid. Find one toy, one spoon, and one book together.", factAr: "ارفع إصبعاً واحداً وقل: واحد. ابحثا معاً عن لعبة واحدة وملعقة واحدة وكتاب واحد." },
  { numeral: "2", arWord: "اثنان", enWord: "Two", enPron: "Ithnaan", factEn: "Arabic has a special grammatical form just for the number 2, called the \"dual\" — rare among world languages.", factAr: "للعربية صيغة نحوية خاصة بالرقم اثنين تُسمّى \"المُثنّى\" — وهي نادرة بين لغات العالم." },
  { numeral: "3", arWord: "ثلاثة", enWord: "Three", enPron: "Thalaatha", factEn: "The Arabic word for 3 starts with the letter ث (Tha), which makes the soft \"th\" sound as in \"think\".", factAr: "كلمة ثلاثة تبدأ بحرف الثاء، وهو الصوت الذي ينطقه الطفل بطرف لسانه بين أسنانه." },
  { numeral: "4", arWord: "أربعة", enWord: "Four", enPron: "Arba'a", factEn: "The word for 4 contains the letter ع (Ain), one of the unique Arabic throat sounds.", factAr: "كلمة أربعة تحتوي على حرف العين، وهو من الأصوات الحلقية المميزة في العربية." },
  { numeral: "5", arWord: "خمسة", enWord: "Five", enPron: "Khamsa", factEn: "The \"Khamsa\" (an open hand with five fingers) is a famous symbol across the Arab world.", factAr: "الخَمسة (الكفّ المفتوح بأصابعه الخمسة) رمز مشهور في كثير من بلدان العالم العربي." },
  { numeral: "6", arWord: "ستة", enWord: "Six", enPron: "Sitta", factEn: "Make two groups of three blocks. Count all six blocks together and say sitta.", factAr: "كوّن مجموعتين، في كل منهما ثلاثة مكعّبات. عُدّ المكعّبات الستة مع طفلك وقولا: ستة." },
  { numeral: "7", arWord: "سبعة", enWord: "Seven", enPron: "Sab'a", factEn: "The number 7 appears often in Arab and Islamic traditions, and many children's stories use it.", factAr: "يتكرر الرقم سبعة كثيراً في التراث العربي والإسلامي، وتستعمله حكايات الأطفال." },
  { numeral: "8", arWord: "ثمانية", enWord: "Eight", enPron: "Thamaaniya", factEn: "Thamaaniya is one of the longer number words — a nice one to practise clapping out syllables.", factAr: "ثمانية من أطول أسماء الأرقام، ومناسبة لتدريب الطفل على تقطيع المقاطع بالتصفيق." },
  { numeral: "9", arWord: "تسعة", enWord: "Nine", enPron: "Tis'a", factEn: "Arrange nine blocks in three rows of three. Touch each block once as you count to tis'a.", factAr: "رتّب تسعة مكعّبات في ثلاثة صفوف، في كل صف ثلاثة. المس كل مكعّب مرة واحدة أثناء العدّ حتى تسعة." },
  { numeral: "10", arWord: "عشرة", enWord: "Ten", enPron: "Ashara", factEn: "After ten, numbers combine: 11 is أحد عشر (ahada ashar), which literally means \"one ten\".", factAr: "بعد العشرة تتركّب الأعداد: أحد عشر تعني حرفياً \"واحد وعشرة\"، وهكذا حتى تسعة عشر." },
];

const games = [
  {
    emoji: "🪜",
    titleEn: "Stairs Counting",
    titleAr: "عدّ الدرجات",
    bodyEn: "Every time you climb stairs together, count each step aloud in Arabic — waahid, ithnaan, thalaatha. Stairs give a built-in rhythm and turn a daily routine into a counting lesson.",
    bodyAr: "في كل مرة تصعدان فيها الدرج معاً، عُدّا كل درجة بصوت مرتفع بالعربية: واحد، اثنان، ثلاثة. يمنح الدرج إيقاعاً طبيعياً ويحوّل عادة يومية إلى درس في العدّ.",
  },
  {
    emoji: "🍎",
    titleEn: "Snack Math",
    titleAr: "حساب الوجبة الخفيفة",
    bodyEn: "At snack time, ask your child to bring you a number of items in Arabic: \"a'teeni khamsa\" (give me five) grapes. They count as they hand them over, learning numbers and sharing at once.",
    bodyAr: "في وقت الوجبة الخفيفة، اطلب من طفلك أن يحضر لك عدداً من القطع بالعربية: \"أعطني خمسة\" حبّات عنب. يعدّها وهو يناولك إيّاها، فيتعلّم الأرقام والمشاركة معاً.",
  },
  {
    emoji: "🔢",
    titleEn: "Number Hunt",
    titleAr: "البحث عن الأرقام",
    bodyEn: "Look for numbers (0–9) around you — on a clock, a phone, a car plate, or a book page. Each time you spot one, name it together in Arabic.",
    bodyAr: "ابحثا عن الأرقام (0–9) حولكما — على الساعة، أو الهاتف، أو لوحة سيارة، أو صفحة كتاب. كلّما وجدتما رقماً، سمّياه معاً بالعربية.",
  },
];

const faqs = [
  {
    qEn: "Which digits do these Arabic lessons use?",
    qAr: "ما شكل الأرقام المستخدمة في هذه الدروس؟",
    aEn: "These lessons use 0, 1, 2, 3 and the other familiar digits. The learning goal is to connect each number to its Arabic name and to a quantity of objects.",
    aAr: "نستخدم الأرقام 0 و1 و2 و3 وبقية الأرقام بالشكل نفسه. يتعلّم الطفل ربط كل رقم باسمه العربي وبكمّية من الأشياء.",
  },
  {
    qEn: "How are digits arranged inside right-to-left Arabic text?",
    qAr: "كيف تترتّب أرقام العدد داخل النصّ العربي؟",
    aEn: "Arabic words run right-to-left, but place value works like 0–9 numerals: in 25, the 2 on the left means two tens and the 5 on the right means five ones. Say the number khamsa wa-ishroon (خمسة وعشرون, twenty-five), not \"two-five\".",
    aAr: "تُكتب الكلمات العربية من اليمين إلى اليسار، لكن ترتيب منازل العدد يماثل الأرقام 0–9: في 25، يمثّل الرقم 2 على اليسار عشرتين، ويمثّل الرقم 5 على اليمين خمس وحدات. نقرأ العدد «خمسة وعشرون»، وليس «اثنان ثم خمسة».",
  },
  {
    qEn: "At what age should my child start counting in Arabic?",
    qAr: "في أي عمر يبدأ طفلي العدّ بالعربية؟",
    aEn: "Children can chant numbers as a song from around age two, and connect the spoken number to a quantity of objects from about age three or four. Start with 1–5, make it playful, and add more only when those feel easy.",
    aAr: "يستطيع الأطفال ترديد الأرقام كأغنية من حوالي عمر السنتين، ويربطون الرقم المنطوق بكمّية من الأشياء من حوالي الثالثة أو الرابعة. ابدأ من 1 إلى 5، واجعل الأمر لعباً، ولا تزد إلا عندما يسهل عليه ما تعلّمه.",
  },
];

export default async function ArabicNumbersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Arabic Numbers for Kids (0–10)"
        description="Learn to count from 0 to 10 in Arabic with number names, pronunciation, counting games, and free tracing worksheets."
        slug="learn/arabic-numbers"
        datePublished="2026-03-12"
        dateModified="2026-09-29"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "الأرقام" : "Numbers" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "الأرقام العربية للأطفال (0–10)" : "Arabic Numbers for Kids (0–10)"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "تعلّم الأعداد من 0 إلى 10، واستمع إلى أسمائها، والعب ألعاب العدّ" : "Learn number names from 0 to 10, hear the pronunciation, and play counting games"}
      </p>

      <nav aria-label={isAr ? "ابدأ التعلّم" : "Start learning"} className="mb-8 flex flex-wrap gap-3">
        <Link href={`/${locale}/games/count`} className="btn-chunky text-sm">{isAr ? "العب لعبة العدّ 1–10" : "Play the 1–10 counting game"}</Link>
        <a href="#number-reference" className="btn-chunky btn-chunky-ghost text-sm">{isAr ? "جدول الأرقام" : "Number chart"}</a>
        <a href="#number-worksheets" className="btn-chunky btn-chunky-ghost text-sm">{isAr ? "أوراق تتبّع مجانية" : "Free tracing worksheets"}</a>
      </nav>

      <h2 id="number-reference" className="scroll-mt-24 text-xl font-semibold text-ink mb-4">
        {isAr ? "جدول الأرقام من 0 إلى 10" : "Numeral Table: 0–10"}
      </h2>
      <div role="region" aria-labelledby="number-reference" tabIndex={0} className="overflow-x-auto mb-10 rounded-xl border border-ink/15 bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th scope="col" className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "الرقم" : "Number"}</th>
              <th scope="col" className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "الاسم" : "Arabic name"}</th>
              <th scope="col" className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "النطق" : "Pronunciation"}</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((n) => (
              <tr key={n.numeral} className="border-b border-ink/10 hover:bg-white/5 transition">
                <td dir="ltr" className="py-2.5 px-3 text-center text-2xl text-ink">{n.numeral}</td>
                <td className="py-2.5 px-3 text-start text-base text-ink" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>{n.arWord}</td>
                <td lang="en" dir="ltr" className="py-2.5 px-3 text-start text-sm text-ink/80 italic">{n.enPron}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 overflow-hidden rounded-3xl border-[2.5px] border-ink bg-card shadow-[4px_4px_0_0_var(--ink)]">
        <Image
          src="/images/learn/learn_numbers.jpg"
          alt={isAr ? "دليل الأرقام العربية" : "Arabic numbers guide"}
          width={1200}
          height={630}
          className="w-full object-cover"
        />
      </div>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-3">
        <p>
          {isAr
            ? "ابدأ بأشياء يستطيع طفلك لمسها وعدّها: مكعّبات أو ملاعق أو ألعاب. نستخدم الأرقام 0–9 ونربطها بأسمائها بالعربية: واحد، اثنان، ثلاثة. المس كل شيء مرة واحدة أثناء العدّ، ثم قل العدد الكلّي."
            : "Start with things your child can touch and count: blocks, spoons, or toys. We use familiar 0–9 digits and connect them to Arabic names: waahid, ithnaan, thalaatha. Touch each object once while counting, then say how many there are altogether."}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "الأرقام واحداً واحداً" : "Each Number, One by One"}
      </h2>
      <div className="space-y-4 mb-10">
        {numbers.map((n) => (
          <div key={n.numeral} className="rounded-xl border border-ink/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span dir="ltr" className="text-4xl font-bold text-ink">{n.numeral}</span>
              </div>
              <SpeakButton text={n.arWord} label={isAr ? `استمع: ${n.arWord}` : `Listen: ${n.arWord}`} className="shrink-0 border-ink/20 bg-white" />
            </div>
            <div className="mb-2">
              <span className="text-base font-semibold text-ink">{isAr ? n.arWord : n.enWord}</span>
              <span className="text-ink/70 mx-2">—</span>
              <span className="text-sm text-ink/70">{isAr ? n.enWord : n.arWord}</span>
              <span className="text-ink/70 mx-2">·</span>
              <span lang="en" dir="ltr" className="text-sm text-ink/80 italic">{n.enPron}</span>
            </div>
            <p className="text-sm text-ink/75 leading-relaxed">{isAr ? n.factAr : n.factEn}</p>
          </div>
        ))}
      </div>

      <section className="mb-10 rounded-2xl border-2 border-ink/15 bg-card p-5 sm:p-6">
        <h2 className="mb-3 text-xl font-semibold text-ink">{isAr ? "من اسم العدد إلى عدّ الأشياء" : "From number names to counting objects"}</h2>
        <p className="mb-4 text-base text-ink/80">{isAr ? "ضع ثلاثة مكعّبات أمام طفلك. المسوا كل مكعّب مرة واحدة وقولوا: واحد، اثنان، ثلاثة. العدد الأخير يخبرنا أن لدينا ثلاثة مكعّبات. ثم جرّبا عدّ التفّاح في اللعبة؛ ابدآ بالمستوى 1–5." : "Place three blocks in front of your child. Touch each block once and say waahid, ithnaan, thalaatha. The last number tells us there are three blocks. Then try counting apples in the game, starting with the 1–5 level."}</p>
        <Link href={`/${locale}/games/count`} className="btn-chunky inline-flex text-sm">{isAr ? "عُدّ التفّاح واستمع للأعداد" : "Count apples & hear the numbers"}</Link>
      </section>

      <div id="number-worksheets" className="scroll-mt-24">
        <WorksheetCrossLink
          locale={locale}
          packId="arabic-numbers-tracing"
          titleEn="Trace the numbers on paper"
          titleAr="تتبّع الأرقام على الورق"
          textEn="A free PDF page for every number 1–10: a clear numeral, counting dots to colour, and writing practice for the number and its Arabic name."
          textAr="صفحة PDF مجانية لكل رقم من 1 إلى 10: رقم واضح، ودوائر عدّ للتلوين، وتدريب على كتابة الرقم واسمه بالعربية."
        />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "ثلاث ألعاب عدّ يلعبها الوالدان" : "Three Counting Games for Parents"}
        </h2>
        <p className="text-base text-ink/80 leading-relaxed mb-4">
          {isAr
            ? "أفضل طريقة لترسيخ الأرقام ليست الحفظ، بل اللعب اليومي. جرّب هذه الألعاب الثلاث البسيطة التي لا تحتاج إلى أدوات."
            : "The best way to make numbers stick is not memorising but daily play. Try these three simple games that need no materials."}
        </p>
        <div className="space-y-3">
          {games.map((g) => (
            <div key={g.titleEn} className="rounded-xl border border-ink/10 bg-white/5 p-4">
              <h3 className="font-semibold text-ink mb-1">{g.emoji} {isAr ? g.titleAr : g.titleEn}</h3>
              <p className="text-sm text-ink/75 leading-relaxed">{isAr ? g.bodyAr : g.bodyEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-2">
          {isAr ? "سرّ ممتع: الأرقام تسير عكس الكلمات" : "A Fun Quirk: Numbers Go the Other Way"}
        </h2>
        <p className="text-base text-ink/80 leading-relaxed">
          {isAr
            ? "تُكتب الكلمات العربية من اليمين إلى اليسار. في العدد 10، تقع العشرات على اليسار والوحدات على اليمين. والعدد 25 يُقرأ «خمسة وعشرون». ترتيب الرموز على الصفحة يختلف عن ترتيب الكلمات عند نطق العدد؛ لا نقرأه «اثنان ثم خمسة»."
            : "Arabic words run right-to-left. In the number 10, tens are on the left and ones are on the right. The number 25 is spoken khamsa wa-ishroon (خمسة وعشرون, twenty-five). The arrangement of digits on a page is different from the order of the spoken words; do not read it as \"two-five\"."}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-ink mb-4">
          {isAr ? "أسئلة شائعة للوالدين" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.qEn} className="rounded-xl border border-ink/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-ink mb-1">{isAr ? f.qAr : f.qEn}</h3>
              <p className="text-sm text-ink/75 leading-relaxed">{isAr ? f.aAr : f.aEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-ink mb-3">
          {isAr ? "نصائح سريعة لتعليم الأرقام" : "Quick Tips for Teaching Numbers"}
        </h2>
        <div className="space-y-2 text-base text-ink/80 leading-relaxed">
          <p>{isAr ? "• عدّ الأشياء اليومية بالعربية — أصابع، فواكه، ألعاب" : "• Count everyday objects in Arabic — fingers, fruits, toys"}</p>
          <p>{isAr ? "• غنِّ أغاني العدّ بالعربية مع طفلك، فالإيقاع يثبّت الترتيب" : "• Sing counting songs in Arabic — rhythm fixes the order"}</p>
          <p>{isAr ? "• استخدم الأرقام في الروتين اليومي — \"أعطني 3 تفاحات\"" : "• Use numbers in daily routines — \"give me 3 apples\""}</p>
          <p>{isAr ? "• اجعل العدّ لعبة — من يصل إلى 10 أسرع؟" : "• Make counting a game — who reaches 10 fastest?"}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-sm text-ink underline">
          {isAr ? "← دليل الأبجدية العربية" : "← Arabic Alphabet Guide"}
        </Link>
        <Link href={`/${locale}/learn/arabic-colors`} className="text-sm text-ink underline">
          {isAr ? "الألوان بالعربية →" : "Arabic Colors →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/games/count`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          🔢 {isAr ? "تدرّب في لعبة العدّ" : "Practice in the counting game"}
        </Link>
      </div>
      <RelatedArticles locale={locale} articles={getRelatedArticles(locale, "arabic-numbers")} />
    </PageLayout>
  );
}
