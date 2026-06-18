import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { SpeakButton } from "@/components/SpeakButton";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-numbers", {
    titleEn: "Arabic Numbers for Kids (0–10): Names, Pronunciation & Counting Games",
    titleAr: "الأرقام العربية للأطفال (٠–١٠): الأسماء والنطق وألعاب العدّ",
    descriptionEn:
      "Learn Arabic numbers 0 to 10 with a clear ٠–٩ to 0–9 table, pronunciation, the right-to-left vs left-to-right quirk, three counting games, and parent FAQs.",
    descriptionAr:
      "تعلّم الأرقام العربية من ٠ إلى ١٠ مع جدول يربط ٠–٩ بالأرقام اللاتينية، والنطق، وسرّ القراءة من اليسار إلى اليمين، وثلاث ألعاب عدّ، وأسئلة شائعة للوالدين.",
    ogType: "article",
    publishedTime: "2026-03-12",
    modifiedTime: "2026-06-12",
    keywords: [
      "arabic numbers for kids", "الأرقام العربية للأطفال",
      "counting in arabic", "العد بالعربية",
      "eastern arabic numerals", "الأرقام العربية الشرقية",
    ],
  });
}

const numbers = [
  { ar: "٠", arWord: "صفر", en: "0", enWord: "Zero", enPron: "Sifr", factEn: "The word \"zero\" itself comes from the Arabic صفر (sifr). Arab mathematicians introduced zero as a number to the world.", factAr: "كلمة \"zero\" في الإنجليزية مأخوذة من الكلمة العربية صفر. أدخل علماء الرياضيات العرب الصفر إلى العالم كرقم مستقل." },
  { ar: "١", arWord: "واحد", en: "1", enWord: "One", enPron: "Waahid", factEn: "The numeral system (0–9) the whole world uses today was developed by Arab and Indian mathematicians.", factAr: "النظام العددي (٠–٩) الذي يستخدمه العالم اليوم طوّره علماء الرياضيات العرب والهنود." },
  { ar: "٢", arWord: "اثنان", en: "2", enWord: "Two", enPron: "Ithnaan", factEn: "Arabic has a special grammatical form just for the number 2, called the \"dual\" — rare among world languages.", factAr: "للعربية صيغة نحوية خاصة بالرقم اثنين تُسمّى \"المُثنّى\" — وهي نادرة بين لغات العالم." },
  { ar: "٣", arWord: "ثلاثة", en: "3", enWord: "Three", enPron: "Thalaatha", factEn: "The Arabic word for 3 starts with the letter ث (Tha), which makes the soft \"th\" sound as in \"think\".", factAr: "كلمة ثلاثة تبدأ بحرف الثاء، وهو الصوت الذي ينطقه الطفل بطرف لسانه بين أسنانه." },
  { ar: "٤", arWord: "أربعة", en: "4", enWord: "Four", enPron: "Arba'a", factEn: "The word for 4 contains the letter ع (Ain), one of the unique Arabic throat sounds.", factAr: "كلمة أربعة تحتوي على حرف العين، وهو من الأصوات الحلقية المميزة في العربية." },
  { ar: "٥", arWord: "خمسة", en: "5", enWord: "Five", enPron: "Khamsa", factEn: "The \"Khamsa\" (an open hand with five fingers) is a famous symbol across the Arab world.", factAr: "الخَمسة (الكفّ المفتوح بأصابعه الخمسة) رمز مشهور في كثير من بلدان العالم العربي." },
  { ar: "٦", arWord: "ستة", en: "6", enWord: "Six", enPron: "Sitta", factEn: "A fun quirk: Arabic words read right-to-left, but Arabic numbers read left-to-right — just like English.", factAr: "طُرفة لطيفة: تُقرأ الكلمات العربية من اليمين إلى اليسار، لكن الأرقام تُقرأ من اليسار إلى اليمين تماماً كالإنجليزية." },
  { ar: "٧", arWord: "سبعة", en: "7", enWord: "Seven", enPron: "Sab'a", factEn: "The number 7 appears often in Arab and Islamic traditions, and many children's stories use it.", factAr: "يتكرر الرقم سبعة كثيراً في التراث العربي والإسلامي، وتستعمله حكايات الأطفال." },
  { ar: "٨", arWord: "ثمانية", en: "8", enWord: "Eight", enPron: "Thamaaniya", factEn: "Thamaaniya is one of the longer number words — a nice one to practise clapping out syllables.", factAr: "ثمانية من أطول أسماء الأرقام، ومناسبة لتدريب الطفل على تقطيع المقاطع بالتصفيق." },
  { ar: "٩", arWord: "تسعة", en: "9", enWord: "Nine", enPron: "Tis'a", factEn: "The Eastern Arabic ٩ looks different from the Western 9 — both descend from the same old Arabic shapes.", factAr: "الرقم العربي الشرقي ٩ يختلف شكله عن الرقم الغربي 9، مع أنّ كليهما من أصل عربي قديم واحد." },
  { ar: "١٠", arWord: "عشرة", en: "10", enWord: "Ten", enPron: "Ashara", factEn: "After ten, numbers combine: 11 is أحد عشر (ahada ashar), which literally means \"one ten\".", factAr: "بعد العشرة تتركّب الأعداد: أحد عشر تعني حرفياً \"واحد وعشرة\"، وهكذا حتى تسعة عشر." },
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
    bodyEn: "Look for Eastern Arabic numerals (٠–٩) around you — on a clock, a phone, a car plate, or a book page. Each time you spot one, name it together in Arabic.",
    bodyAr: "ابحثا عن الأرقام العربية الشرقية (٠–٩) حولكما — على الساعة، أو الهاتف، أو لوحة سيارة، أو صفحة كتاب. كلّما وجدتما رقماً، سمّياه معاً بالعربية.",
  },
];

const faqs = [
  {
    qEn: "What is the difference between ١٢٣ and 123?",
    qAr: "ما الفرق بين ١٢٣ و 123؟",
    aEn: "They are the same numbers written in two styles. ٠–٩ are \"Eastern Arabic numerals\" used in Arabic text; 0–9 are \"Western Arabic numerals\" used in English and most of the world. Both came from the Arab world, so both are genuinely \"Arabic\".",
    aAr: "هما الأرقام نفسها بأسلوبين مختلفين. ٠–٩ تُسمّى الأرقام العربية الشرقية وتُستعمل في النصوص العربية، و0–9 تُسمّى الأرقام العربية الغربية وتُستعمل في الإنجليزية ومعظم العالم. كلا الشكلين أصله عربي.",
  },
  {
    qEn: "Why do Arabic numbers read left-to-right inside right-to-left text?",
    qAr: "لماذا تُقرأ الأرقام من اليسار إلى اليمين داخل نصّ يُكتب من اليمين إلى اليسار؟",
    aEn: "It is just a feature of how Arabic writing works: the words flow right-to-left, but a number keeps its digits in the same order as in English, so 25 is still \"two-five\". Children rarely find this confusing — they absorb it naturally.",
    aAr: "هذه ببساطة من خصائص الكتابة العربية: تتدفّق الكلمات من اليمين إلى اليسار، لكن أرقام العدد تبقى مرتّبة كما في الإنجليزية، فالعدد ٢٥ يبقى \"اثنان ثم خمسة\". ونادراً ما يحتار الأطفال في هذا، بل يستوعبونه تلقائياً.",
  },
  {
    qEn: "At what age should my child start counting in Arabic?",
    qAr: "في أي عمر يبدأ طفلي العدّ بالعربية؟",
    aEn: "Children can chant numbers as a song from around age two, and connect the spoken number to a quantity of objects from about age three or four. Start with 1–5, make it playful, and add more only when those feel easy.",
    aAr: "يستطيع الأطفال ترديد الأرقام كأغنية من حوالي عمر السنتين، ويربطون الرقم المنطوق بكمّية من الأشياء من حوالي الثالثة أو الرابعة. ابدأ من ١ إلى ٥، واجعل الأمر لعباً، ولا تزد إلا عندما يسهل عليه ما تعلّمه.",
  },
];

export default async function ArabicNumbersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="Arabic Numbers for Kids (0–10)"
        description="Learn Arabic numbers 0 to 10 with pronunciation, a numeral table, the right-to-left quirk, counting games, and parent FAQs."
        slug="learn/arabic-numbers"
        datePublished="2026-03-12"
        dateModified="2026-06-12"
        section="Education"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "الأرقام" : "Numbers" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-ink mb-2">
        {isAr ? "الأرقام العربية للأطفال (٠–١٠)" : "Arabic Numbers for Kids (0–10)"}
      </h1>
      <p className="text-base text-ink/75 mb-8">
        {isAr ? "تعلّم العدّ بالعربية مع النطق والجدول وألعاب ممتعة للوالدين" : "Learn to count in Arabic with pronunciation, a table, and fun games for parents"}
      </p>

      <div className="text-base leading-relaxed text-ink/80 mb-8 space-y-3">
        <p>
          {isAr
            ? "الأرقام من أوّل ما ينبغي أن يتعلّمه طفلك مبكراً، لأنها تظهر في كل مكان: على الساعة، وفي العدّ، وفي الألعاب، وفي تقسيم الطعام. والنظام العددي العربي (٠–٩) هو الأساس الذي يستخدمه العالم كله اليوم. في هذا الدليل نتعلّم الأرقام من ٠ إلى ١٠ بالعربية مع النطق الصحيح وحقيقة ممتعة لكل رقم، ثم نلعب معاً."
            : "Numbers are one of the first things your child should learn early, because they appear everywhere: on the clock, in counting, in games, and when sharing food. The Arabic numeral system (0–9) is the foundation the whole world uses today. In this guide we learn numbers 0 through 10 in Arabic with correct pronunciation and a fun fact for each — then we play together."}
        </p>
        <p>
          {isAr
            ? "ملاحظة مهمة: الأرقام التي نكتبها في الإنجليزية (1، 2، 3...) تُسمّى \"الأرقام العربية الغربية\" لأنها جاءت أصلاً من العالم العربي. أمّا الأرقام التي تظهر في النصوص العربية (١، ٢، ٣...) فتُسمّى \"الأرقام العربية الشرقية\". الشكلان عربيّان، وطفلك يحتاج أن يألف الاثنين."
            : "Important note: the numerals we write in English (1, 2, 3...) are called \"Western Arabic numerals\" because they originally came from the Arab world. The numerals that appear in Arabic text (١، ٢، ٣...) are called \"Eastern Arabic numerals\". Both forms are Arabic, and your child benefits from getting comfortable with both."}
        </p>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "جدول الأرقام: ٠–٩ مقابل 0–9" : "Numeral Table: ٠–٩ vs 0–9"}
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "عربي شرقي" : "Eastern"}</th>
              <th className="py-2 px-3 text-center text-ink/70 font-medium">{isAr ? "عربي غربي" : "Western"}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "الاسم" : "Arabic name"}</th>
              <th className="py-2 px-3 text-start text-ink/70 font-medium">{isAr ? "النطق" : "Pronunciation"}</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((n) => (
              <tr key={n.en} className="border-b border-ink/10 hover:bg-white/5 transition">
                <td className="py-2.5 px-3 text-center text-2xl text-accent">{n.ar}</td>
                <td className="py-2.5 px-3 text-center text-xl text-ink/80">{n.en}</td>
                <td className="py-2.5 px-3 text-start text-base text-ink" style={{ fontFamily: "var(--font-noto-naskh), var(--font-ibm-plex-arabic), sans-serif" }}>{n.arWord}</td>
                <td className="py-2.5 px-3 text-start text-sm text-accent/80 italic">{n.enPron}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-ink mb-4">
        {isAr ? "الأرقام واحداً واحداً" : "Each Number, One by One"}
      </h2>
      <div className="space-y-4 mb-10">
        {numbers.map((n) => (
          <div key={n.en} className="rounded-xl border border-ink/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-accent">{n.ar}</span>
                <span className="text-2xl text-ink/30">/</span>
                <span className="text-3xl font-bold text-ink/80">{n.en}</span>
              </div>
              <SpeakButton text={n.arWord} label={`Listen: ${n.arWord}`} />
            </div>
            <div className="mb-2">
              <span className="text-base font-semibold text-ink">{isAr ? n.arWord : n.enWord}</span>
              <span className="text-ink/40 mx-2">—</span>
              <span className="text-sm text-ink/70">{isAr ? n.enWord : n.arWord}</span>
              <span className="text-ink/30 mx-2">·</span>
              <span className="text-sm text-accent/80 italic">{n.enPron}</span>
            </div>
            <p className="text-sm text-ink/75 leading-relaxed">{isAr ? n.factAr : n.factEn}</p>
          </div>
        ))}
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
            ? "يلاحظ كثير من الآباء شيئاً غريباً: النصّ العربي يُكتب ويُقرأ من اليمين إلى اليسار، لكن الأرقام داخله تُقرأ من اليسار إلى اليمين، مثل الإنجليزية تماماً. فإذا رأى طفلك العدد ٢٥، يبدأ من اليسار: \"اثنان ثم خمسة\". هذه ليست قاعدة معقّدة بل لُطفة في اللغة، وغالباً ما يستوعبها الأطفال دون أن يلاحظوها أصلاً. أشِر إليها بابتسامة عند العدّ، فهي تجعل التعلّم أكثر متعة."
            : "Many parents notice something curious: Arabic text is written and read right-to-left, yet numbers inside it read left-to-right, exactly like English. So when your child sees ٢٥, they start from the left: \"two then five\". This isn't a complicated rule — it's a charming quirk of the language, and children usually absorb it without even noticing. Point it out with a smile while counting; it makes learning more fun."}
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
          <p>{isAr ? "• استخدم الأرقام في الروتين اليومي — \"أعطني ٣ تفاحات\"" : "• Use numbers in daily routines — \"give me 3 apples\""}</p>
          <p>{isAr ? "• اجعل العدّ لعبة — من يصل إلى ١٠ أسرع؟" : "• Make counting a game — who reaches 10 fastest?"}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="text-sm text-accent underline">
          {isAr ? "← دليل الأبجدية العربية" : "← Arabic Alphabet Guide"}
        </Link>
        <Link href={`/${locale}/learn/arabic-colors`} className="text-sm text-accent underline">
          {isAr ? "الألوان بالعربية →" : "Arabic Colors →"}
        </Link>
      </div>

      <div className="text-center py-6">
        <Link href={`/${locale}/play`} className="btn-chunky inline-flex items-center gap-2 px-6 py-3 text-base transition hover:scale-105">
          🚀 {isAr ? "تدرب في عرب فنجرز" : "Practice in ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}
