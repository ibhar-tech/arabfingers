import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { worksheetSets } from "@/lib/worksheets";
import fileSizes from "@/lib/worksheet-files.json";
import { setRequestLocale } from "next-intl/server";

const SITE = "https://www.arabfingers.site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/printables", {
    titleEn: "Free Printable Arabic Alphabet Tracing Worksheets (PDF) for Kids",
    titleAr: "أوراق عمل مجانية لتتبّع الحروف العربية للأطفال (PDF)",
    descriptionEn:
      "Download 53 pages of free Arabic worksheets as PDFs: a tracing sheet for every one of the 28 letters, numbers 1–10, colours and animals. No signup, no email — just download and print.",
    descriptionAr:
      "حمّل ٥٣ صفحة من أوراق العمل العربية المجانية بصيغة PDF: ورقة تتبّع لكل حرف من الحروف الـ٢٨، والأرقام ١–١٠، والألوان والحيوانات. بلا تسجيل وبلا بريد — نزّل واطبع.",
    keywords: [
      "arabic alphabet tracing worksheets pdf", "free arabic letters worksheets pdf",
      "arabic letters tracing worksheets pdf free download", "trace arabic alphabet",
      "arabic alphabet printable pdf", "تتبع الحروف العربية", "أوراق عمل الحروف العربية",
      "arabic worksheets for kids", "arabic alphabet dotted tracing practice pdf",
      "alif ba ta worksheet pdf", "printable arabic alphabet",
    ],
  });
}

const mb = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

const totalPages = worksheetSets
  .filter((s) => s.id !== "arabic-complete-workbook")
  .reduce((sum, s) => sum + s.pages, 0);

// ---------------------------------------------------------------------------

const copy = {
  en: {
    crumb: "Worksheets",
    h1: "Free Printable Arabic Alphabet Tracing Worksheets (PDF)",
    lead: `Every worksheet on this page is a real PDF you can download and print — ${totalPages} pages in total, covering all 28 Arabic letters, the numbers 1 to 10, six colours and eight animals. There is no signup, no email wall and no watermark. Click a pack, the file downloads, you print it.`,
    lead2:
      "We built these sheets because most free Arabic tracing worksheets online are a single scanned page, printed either too faint to follow or too dark to trace over. Ours are typeset in Noto Naskh — the same clear naskh script children meet in school books — at a size a four-year-old can actually control, with the tracing guides graded from solid grey to a hollow outline to nothing at all, so a child leaves each page writing unaided.",
    statPacks: "worksheet packs",
    statPages: "printable pages",
    statPrice: "cost, forever",
    libraryTitle: "Download the worksheets",
    librarySub: "Each pack is a separate PDF so you can print only what you need. The last one contains all of them.",
    download: "Download PDF",
    pagesLabel: (n: number) => `${n} page${n === 1 ? "" : "s"}`,

    howTitle: "How to use these worksheets",
    howLead:
      "Tracing works best in short, frequent sessions rather than long ones. A single letter per day, five minutes at a time, will take a child through the whole alphabet in about a month and hold their attention far better than working through ten pages on a Saturday.",
    steps: [
      {
        t: "Say the letter before writing it",
        d: "Handwriting sticks faster when the sound is already in the child's ear. Say the letter name, have your child repeat it, and only then put the pencil down. If you are not a confident Arabic speaker, play the letter in the letter game first and copy the pronunciation you hear.",
      },
      {
        t: "Trace the grey letters, across the row in order",
        d: "The first two letters in every row are printed in solid grey to follow. The next two are hollow outlines, which force the child to control the stroke rather than colour inside a shape. The remaining boxes are empty. Do not skip ahead to the empty boxes — the graded sequence is what builds the muscle memory.",
      },
      {
        t: "Point out the four forms",
        d: "Arabic letters change shape depending on where they sit in a word. Every letter sheet shows all four forms side by side — alone, at the start, in the middle, and at the end. Children who meet this early stop being surprised by it later. Six letters (ا د ذ ر ز و) never join to the letter after them, and their sheets say so.",
      },
      {
        t: "Finish with the example words",
        d: "The bottom of each letter sheet has two or three real words that contain the letter, with a transliteration and an English meaning. Tracing a whole word is the point where a child stops drawing shapes and starts writing Arabic.",
      },
      {
        t: "Keep the finished pages",
        d: "Put each completed sheet in a folder in alphabet order. By the end you have a workbook your child made, which is a far better prompt for revision than starting again from a blank page.",
      },
    ],

    insideTitle: "What is on every letter sheet",
    inside: [
      { t: "The letter, large", d: "A reference version at the top of the page, big enough to study the shape properly before copying it." },
      { t: "All four joined forms", d: "Isolated, initial, medial and final, each labelled in English and Arabic." },
      { t: "Three graded tracing rows", d: "Five large letters, then six medium, then eight small — the size drops as control improves." },
      { t: "Two or three example words", d: "With transliteration and meaning, each on its own dashed writing line." },
      { t: "A name and date line", d: "So a teacher handing out thirty copies can tell them apart." },
      { t: "Black and white only", d: "No colour blocks, no photographs, no background fills. These print on a cheap mono laser printer without draining a cartridge." },
    ],

    printTitle: "Printing tips",
    print: [
      { t: "Print at 100%, not “fit to page”", d: "The sheets are laid out for A4. Scaling shrinks the tracing boxes below a comfortable size for small hands. If your printer defaults to US Letter, choose A4 or accept slightly wider margins — do not tick “shrink to fit”." },
      { t: "Use the greyscale setting", d: "Everything is already black and grey, so greyscale changes nothing visually and stops a colour printer mixing cartridges to make grey." },
      { t: "Slip one page into a plastic sleeve", d: "With a dry-wipe pen a single printed sheet becomes reusable indefinitely, which matters if your child wants to trace the same letter twenty times." },
      { t: "Print the chart once, the letters as you go", d: "The one-page alphabet chart is a reference to pin on the wall. Printing all 28 letter sheets at once tends to produce a stack nobody works through." },
    ],

    relatedTitle: "Keep going",
    relatedLead: "The worksheets train the hand. These guides train the ear and the eye.",
    related: [
      { href: "/learn/arabic-alphabet-guide", t: "The Arabic Alphabet: A Complete Guide", d: "How each of the 28 letters sounds, the common mistakes, and how to fix them." },
      { href: "/learn/arabic-letter-forms", t: "Why Arabic Letters Change Shape", d: "The joining rules behind the four forms shown on every worksheet." },
      { href: "/learn/arabic-numbers", t: "Arabic Numbers 1–10", d: "Eastern and Western numerals, and why Arabic uses both." },
      { href: "/play", t: "The Letter Game", d: "Hear every letter pronounced. Useful right before a tracing session." },
    ],

    faqTitle: "Frequently asked questions about the worksheets",
    faq: [
      { q: "Are these Arabic tracing worksheets really free?", a: "Yes. Every pack downloads as a PDF with no signup, no account, no email address and no payment. There is no watermark and nothing is held back behind a paid version." },
      { q: "Can I use these worksheets in my classroom or madrasah?", a: "Yes. You may print and photocopy them for your class, your homeschool or your weekend school at no cost. Please do not re-upload the PDF files to another site or sell them; link to this page instead so families always get the current version." },
      { q: "What age are the Arabic worksheets for?", a: "The letter and animal sheets suit children from about four to seven, once they can hold a pencil with some control. The numbers and colours sheets work from about three, because counting circles and colouring shapes need less precision than tracing a letter." },
      { q: "Why do the letters get smaller down the page?", a: "Because handwriting control develops from large movements to small ones. Starting a child on small letters produces cramped, tense writing. Each sheet starts at a size the whole arm can draw and finishes near normal writing size." },
      { q: "My printer makes the tracing letters too faint to see. What can I do?", a: "Turn off any toner-saving or draft mode, which is the usual cause. The tracing guides are printed in mid grey on purpose so a pencil line shows clearly on top of them, but draft mode drops them below the visible threshold." },
      { q: "Do the worksheets teach letters in alphabet order or by difficulty?", a: "Alphabet order, because that is the order children are taught in almost every Arabic curriculum and the order the alphabet song follows. If you would rather start with the easiest shapes, the alphabet guide marks each letter easy, medium or hard for English speakers." },
      { q: "What is the difference between the six packs?", a: "Five of them cover one topic each — the alphabet chart, letter tracing, numbers, colours and animals. The sixth, the complete workbook, is simply all five bound into a single file in teaching order, for people who would rather print once." },
      { q: "What is the best way to use tracing sheets to teach the Arabic alphabet?", a: "Pair tracing with sound. Say the letter, let your child hear it in the letter game, then trace it on the worksheet. Seeing, hearing and writing the same letter in one short session fixes it far faster than tracing in silence." },
    ],
  },

  ar: {
    crumb: "أوراق عمل",
    h1: "أوراق عمل مجانية لتتبّع الحروف العربية (PDF)",
    lead: `كل ورقة في هذه الصفحة ملف PDF حقيقي تنزّله وتطبعه — ${totalPages} صفحة في المجموع، تغطّي الحروف الـ٢٨ كاملة، والأرقام من ١ إلى ١٠، وستة ألوان وثمانية حيوانات. بلا تسجيل، وبلا بريد إلكتروني، وبلا علامة مائية. اضغط على المجموعة فينزّل الملف، ثم اطبعه.`,
    lead2:
      "أعددنا هذه الأوراق لأن أكثر أوراق التتبّع المجانية على الإنترنت صفحة ممسوحة ضوئياً واحدة، إمّا باهتة لا تُرى أو داكنة لا يمكن التتبّع فوقها. أوراقنا مكتوبة بخط نوتو نسخ — وهو خط النسخ الواضح نفسه الذي يقابله الطفل في كتب المدرسة — بحجم يستطيع ابن الأربع سنوات التحكّم به، مع تدرّج في أدلّة التتبّع من الرمادي الممتلئ إلى الحدّ الخارجي المفرّغ إلى الفراغ التامّ، حتى يترك الطفل كلّ صفحة وهو يكتب بلا مساعدة.",
    statPacks: "مجموعات",
    statPages: "صفحة للطباعة",
    statPrice: "التكلفة، دائماً",
    libraryTitle: "حمّل أوراق العمل",
    librarySub: "كل مجموعة ملف PDF مستقلّ لتطبع ما تحتاجه فقط. والأخيرة تضمّها جميعاً.",
    download: "تحميل PDF",
    pagesLabel: (n: number) => `${n} صفحة`,

    howTitle: "كيف تستعمل أوراق العمل",
    howLead:
      "التتبّع ينجح في جلسات قصيرة متكرّرة لا في جلسات طويلة. حرف واحد كل يوم، خمس دقائق في المرّة، يقطع بالطفل الأبجدية كاملة في نحو شهر، ويحفظ انتباهه أفضل بكثير من عشر صفحات دفعة واحدة يوم السبت.",
    steps: [
      {
        t: "انطق الحرف قبل كتابته",
        d: "تثبت الكتابة أسرع حين يكون الصوت مستقرّاً في أذن الطفل. انطق اسم الحرف، ودع طفلك يعيده، ثمّ أمسكا القلم. وإن لم تكن واثقاً من نطقك، شغّل الحرف في لعبة الحروف أوّلاً وقلّد ما تسمع.",
      },
      {
        t: "تتبّع الحروف الرمادية عبر الصفّ بالترتيب",
        d: "أوّل حرفين في كل صفّ مطبوعان بالرمادي الممتلئ للتتبّع فوقهما. والتاليان حدّ خارجي مفرّغ يجبر الطفل على ضبط الخطّ بدل التلوين داخل شكل. وبقيّة المربّعات فارغة. لا تقفز إلى الفارغة — فالتدرّج نفسه هو ما يبني الذاكرة الحركية.",
      },
      {
        t: "انتبه معه إلى الأشكال الأربعة",
        d: "يتغيّر شكل الحرف العربي بحسب موقعه من الكلمة. تعرض كلّ ورقة الأشكال الأربعة جنباً إلى جنب: منفرداً، وفي أوّل الكلمة، ووسطها، وآخرها. والطفل الذي يقابل هذا مبكّراً لا يتفاجأ به لاحقاً. وستّة حروف (ا د ذ ر ز و) لا تتّصل بما بعدها، وأوراقها تنبّه إلى ذلك.",
      },
      {
        t: "اختم بالكلمات",
        d: "في أسفل كلّ ورقة كلمتان أو ثلاث فيها الحرف، مع النطق بالحروف اللاتينية والمعنى بالإنجليزية. وتتبّع كلمة كاملة هو اللحظة التي يكفّ فيها الطفل عن رسم أشكال ويبدأ بكتابة العربية.",
      },
      {
        t: "احتفظ بالصفحات المنجزة",
        d: "ضع كلّ ورقة منتهية في ملفّ مرتّبة على الأبجدية. تحصل في النهاية على كرّاسة صنعها طفلك بنفسه، وهي أدعى للمراجعة من البدء مجدّداً من صفحة بيضاء.",
      },
    ],

    insideTitle: "ماذا في كل ورقة حرف",
    inside: [
      { t: "الحرف بحجم كبير", d: "نسخة مرجعية في أعلى الورقة، تكفي لدراسة الشكل جيّداً قبل نسخه." },
      { t: "الأشكال الأربعة المتّصلة", d: "منفرد وأوّل ووسط وآخر، كلٌّ منها معنون بالعربية والإنجليزية." },
      { t: "ثلاثة صفوف تتبّع متدرّجة", d: "خمسة حروف كبيرة، ثمّ ستّة متوسّطة، ثمّ ثمانية صغيرة — يصغر الحجم كلّما تحسّن التحكّم." },
      { t: "كلمتان أو ثلاث للتتبّع", d: "مع النطق والمعنى، كلّ واحدة على سطر متقطّع خاصّ بها." },
      { t: "سطر الاسم والتاريخ", d: "ليميّز المعلّم بين ثلاثين نسخة وزّعها على صفّه." },
      { t: "أبيض وأسود فقط", d: "بلا كتل لونية ولا صور ولا خلفيات ممتلئة. تُطبع على طابعة ليزر أحادية رخيصة دون استنزاف الحبر." },
    ],

    printTitle: "نصائح للطباعة",
    print: [
      { t: "اطبع بمقياس ١٠٠٪ لا «ملاءمة الصفحة»", d: "الأوراق مصمّمة لمقاس A4، والتصغير ينزل بمربّعات التتبّع تحت الحجم المريح ليد صغيرة. وإن كانت طابعتك على مقاس Letter فاختر A4 أو اقبل هوامش أوسع قليلاً — ولا تفعّل خيار التصغير." },
      { t: "استعمل وضع التدرّج الرمادي", d: "كلّ شيء أصلاً أسود ورمادي، فلن يتغيّر شيء بصرياً، وستمنع الطابعة الملوّنة من مزج الأحبار لتوليد الرمادي." },
      { t: "ضع ورقة في جيب بلاستيكي", d: "مع قلم يُمحى تصبح الورقة الواحدة صالحة للاستعمال بلا حدّ، وهذا مهمّ إن أراد طفلك تتبّع الحرف نفسه عشرين مرّة." },
      { t: "اطبع اللوحة مرّة والحروف تباعاً", d: "لوحة الحروف ذات الصفحة الواحدة مرجع يُعلّق على الجدار. أمّا طباعة الأوراق الـ٢٨ دفعة واحدة فتنتهي غالباً إلى كومة لا يكملها أحد." },
    ],

    relatedTitle: "تابع من هنا",
    relatedLead: "أوراق العمل تدرّب اليد، وهذه الأدلّة تدرّب الأذن والعين.",
    related: [
      { href: "/learn/arabic-alphabet-guide", t: "دليل الحروف العربية الكامل", d: "كيف يُنطق كلّ حرف من الـ٢٨، والأخطاء الشائعة وطريقة تصحيحها." },
      { href: "/learn/arabic-letter-forms", t: "لماذا تتغيّر أشكال الحروف", d: "قواعد الاتّصال وراء الأشكال الأربعة في كلّ ورقة." },
      { href: "/learn/arabic-numbers", t: "الأرقام العربية ١–١٠", d: "الأرقام المشرقية والغربية، ولماذا تستعمل العربية الاثنين." },
      { href: "/play", t: "لعبة الحروف", d: "استمع إلى نطق كلّ حرف. مفيدة قبل جلسة التتبّع مباشرة." },
    ],

    faqTitle: "أسئلة شائعة عن أوراق العمل",
    faq: [
      { q: "هل أوراق تتبّع الحروف العربية مجانية فعلاً؟", a: "نعم. كلّ مجموعة تُنزَّل ملفّ PDF بلا تسجيل ولا حساب ولا بريد إلكتروني ولا دفع. ولا توجد علامة مائية ولا شيء محجوز لنسخة مدفوعة." },
      { q: "هل أستطيع استعمالها في صفّي أو في المدرسة القرآنية؟", a: "نعم. لك أن تطبعها وتصوّرها لصفّك أو لتعليمك المنزلي أو لمدرسة نهاية الأسبوع بلا مقابل. ونرجو ألّا ترفع الملفّات على موقع آخر وألّا تبيعها؛ ضع رابط هذه الصفحة بدل ذلك ليصل الأهل دائماً إلى النسخة الحالية." },
      { q: "ما الأعمار المناسبة لأوراق العمل؟", a: "أوراق الحروف والحيوانات تناسب من نحو أربع إلى سبع سنوات، متى استطاع الطفل الإمساك بالقلم بشيء من التحكّم. أمّا أوراق الأرقام والألوان فتصلح من نحو ثلاث سنوات، لأنّ عدّ الدوائر وتلوين الأشكال يحتاجان دقّة أقلّ من تتبّع حرف." },
      { q: "لماذا تصغر الحروف كلّما نزلنا في الصفحة؟", a: "لأنّ التحكّم في الكتابة ينمو من الحركات الكبيرة إلى الصغيرة. والبدء بحروف صغيرة يُنتج خطّاً متشنّجاً مضغوطاً. لذلك تبدأ كلّ ورقة بحجم ترسمه الذراع كلّها وتنتهي قريباً من حجم الكتابة المعتاد." },
      { q: "طابعتي تُخرج حروف التتبّع باهتة جدّاً، ماذا أفعل؟", a: "أطفئ وضع توفير الحبر أو وضع المسوّدة، وهو السبب المعتاد. أدلّة التتبّع مطبوعة برمادي متوسّط عن قصد ليظهر خطّ القلم فوقها بوضوح، لكنّ وضع المسوّدة ينزل بها تحت حدّ الرؤية." },
      { q: "هل ترتيب الحروف أبجدي أم بحسب الصعوبة؟", a: "أبجدي، لأنّه الترتيب الذي يُدرَّس به الطفل في كلّ مناهج العربية تقريباً، وهو ترتيب أنشودة الحروف. وإن فضّلت البدء بأسهل الأشكال، فدليل الحروف يصنّف كلّ حرف سهلاً أو متوسّطاً أو صعباً لمتعلّمي الإنجليزية." },
      { q: "ما الفرق بين المجموعات الستّ؟", a: "خمس منها يغطّي كلّ واحدة موضوعاً: لوحة الحروف، وتتبّع الحروف، والأرقام، والألوان، والحيوانات. أمّا السادسة، الكرّاسة الكاملة، فهي الخمس مجموعة في ملفّ واحد مرتّب تعليمياً، لمن يفضّل الطباعة مرّة واحدة." },
      { q: "ما أفضل طريقة لاستعمال أوراق التتبّع في تعليم الأبجدية؟", a: "اجمع بين التتبّع والصوت: انطق الحرف، ودع طفلك يسمعه في لعبة الحروف، ثمّ يتتبّعه على الورقة. رؤية الحرف وسماعه وكتابته في جلسة قصيرة واحدة تثبّته أسرع بكثير من التتبّع في صمت." },
    ],
  },
} as const;

// ---------------------------------------------------------------------------

export default async function PrintablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const t = isAr ? copy.ar : copy.en;

  // ItemList of the downloadable packs, so the PDFs can surface as a set in
  // search rather than as one opaque page.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.h1,
    numberOfItems: worksheetSets.length,
    itemListElement: worksheetSets.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "DigitalDocument",
        name: isAr ? s.titleAr : s.titleEn,
        description: isAr ? s.descAr : s.descEn,
        url: `${SITE}/printables/${s.id}.pdf`,
        encodingFormat: "application/pdf",
        inLanguage: ["ar", "en"],
        isAccessibleForFree: true,
        learningResourceType: "worksheet",
      },
    })),
  };

  return (
    <PageLayout locale={locale}>
      <Breadcrumbs locale={locale} crumbs={[{ label: t.crumb }]} />

      {/* ---------- Hero ---------- */}
      <header className="card-stock card-stock-saffron mb-10 p-6 sm:p-8">
        <h1 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{t.h1}</h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink/80">{t.lead}</p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink/70">{t.lead2}</p>

        <dl className="mt-6 flex flex-wrap gap-3">
          {[
            { n: String(worksheetSets.length), l: t.statPacks },
            { n: String(totalPages), l: t.statPages },
            { n: isAr ? "٠" : "$0", l: t.statPrice },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border-2 border-ink bg-card px-4 py-2">
              <dt className="font-display text-xl font-extrabold text-ink">{s.n}</dt>
              <dd className="text-xs font-bold uppercase tracking-wide text-ink/55">{s.l}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ---------- Download library ---------- */}
      <section className="mb-12" aria-labelledby="downloads">
        <h2 id="downloads" className="font-display text-xl font-extrabold text-ink">{t.libraryTitle}</h2>
        <p className="mt-1 mb-5 text-sm text-ink/65">{t.librarySub}</p>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {worksheetSets.map((s) => {
            const bytes = (fileSizes as Record<string, number>)[s.id];
            return (
              <li key={s.id} className="card-stock flex gap-4 p-5">
                {/* The real first page, rendered by the same script that builds the
                    PDF — so the card cannot advertise a sheet the file does not have. */}
                <Image
                  src={`/printables/previews/${s.id}.png`}
                  alt=""
                  aria-hidden
                  width={349}
                  height={494}
                  unoptimized
                  className="hidden h-auto w-24 shrink-0 self-start rounded-lg border-2 border-ink/15 bg-white shadow-[3px_3px_0_0_rgba(42,29,78,0.12)] sm:block"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start gap-3">
                    <span aria-hidden className="text-3xl leading-none sm:hidden">{s.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-extrabold leading-snug text-ink">
                        {isAr ? s.titleAr : s.titleEn}
                      </h3>
                      <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink/45">
                        {t.pagesLabel(s.pages)} · PDF · {mb(bytes)} · {isAr ? s.ageAr : s.ageEn}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
                    {isAr ? s.descAr : s.descEn}
                  </p>

                  <a href={`/printables/${s.id}.pdf`} download className="btn-chunky mt-4 self-start text-sm">
                    ⬇ {t.download}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- How to use ---------- */}
      <section className="mb-12" aria-labelledby="how-to-use">
        <h2 id="how-to-use" className="font-display text-xl font-extrabold text-ink">{t.howTitle}</h2>
        <p className="mt-2 mb-5 max-w-3xl text-[15px] leading-relaxed text-ink/75">{t.howLead}</p>

        <ol className="space-y-4">
          {t.steps.map((s, i) => (
            <li key={s.t} className="card-stock flex gap-4 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-saffron font-display text-sm font-extrabold text-ink">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-extrabold text-ink">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- What's inside ---------- */}
      <section className="mb-12" aria-labelledby="whats-inside">
        <h2 id="whats-inside" className="mb-5 font-display text-xl font-extrabold text-ink">{t.insideTitle}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.inside.map((f) => (
            <div key={f.t} className="card-stock p-5">
              <h3 className="font-display text-sm font-extrabold text-ink">{f.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Printing tips ---------- */}
      <section className="mb-12" aria-labelledby="printing-tips">
        <h2 id="printing-tips" className="mb-5 font-display text-xl font-extrabold text-ink">{t.printTitle}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.print.map((p) => (
            <div key={p.t} className="card-stock p-5">
              <h3 className="font-display text-sm font-extrabold text-ink">{p.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <FaqSection locale={locale} title={t.faqTitle} items={[...t.faq]} />

      {/* ---------- Related ---------- */}
      <section className="mb-6" aria-labelledby="related">
        <h2 id="related" className="font-display text-xl font-extrabold text-ink">{t.relatedTitle}</h2>
        <p className="mt-1 mb-5 text-sm text-ink/65">{t.relatedLead}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.related.map((r) => (
            <Link key={r.href} href={`/${locale}${r.href}`} className="card-stock p-5 transition hover:border-qalam">
              <h3 className="font-display text-sm font-extrabold text-ink">{r.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{r.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
    </PageLayout>
  );
}
