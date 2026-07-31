import type { Metadata } from "next";
import Link from "next/link";
import { ColoringLoader } from "./ColoringLoader";
import { isLocale } from "@/lib/locales";
import { PageLayout } from "@/components/PageLayout";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/coloring", {
    titleEn: "Arabic Letter Coloring & Tracing Game (Free, No Download)",
    titleAr: "لعبة تلوين وتتبّع الحروف العربية (مجانية بلا تحميل)",
    descriptionEn:
      "Trace and colour all 28 Arabic letters on screen with a finger, stylus or mouse. A free browser canvas for pencil-grip practice before your child moves to paper — no download, no signup.",
    descriptionAr:
      "تتبّع الحروف العربية الـ٢٨ ولوّنها على الشاشة بالإصبع أو القلم الرقمي أو الفأرة. لوحة رسم مجانية في المتصفّح للتدرّب قبل الانتقال إلى الورق — بلا تحميل وبلا تسجيل.",
    keywords: [
      "arabic letter tracing online", "arabic coloring game for kids",
      "trace arabic letters on screen", "تلوين الحروف العربية", "تتبع الحروف للأطفال",
      "arabic alphabet coloring", "free arabic writing practice online",
    ],
  });
}

const copy = {
  en: {
    crumb: "Coloring",
    h1: "Arabic Letter Colouring & Tracing Game",
    lead:
      "Pick a colour, then draw straight onto the letter with a finger, a stylus or a mouse. The letter outline stays visible under the paint, so a child can trace the shape as many times as they like, wipe the canvas and start again. Nothing to download and nothing to set up — the canvas above is the whole activity.",
    whyTitle: "Why tracing on a screen before tracing on paper",
    why: [
      {
        t: "It removes the cost of a mistake",
        d: "A wobbly line on paper is permanent, and children who are worried about spoiling the page press harder and write smaller. On screen, one tap clears everything. That single fact is what lets a hesitant child attempt a letter ten times in a row instead of once, carefully.",
      },
      {
        t: "A finger is easier than a pencil",
        d: "Holding a pencil correctly is a separate motor skill from knowing the shape of a letter. Tracing with a finger lets a three- or four-year-old learn the shape first, so that when the pencil does come out they are only learning one new thing at a time.",
      },
      {
        t: "The shape is what matters, not the neatness",
        d: "Arabic letters are distinguished from one another by very small features — the number of dots, whether they sit above or below, a tail that curves below the line. A large screen tracing makes those differences obvious in a way a small pencil letter does not.",
      },
      {
        t: "It travels",
        d: "This runs in the browser on a phone or tablet, which makes it the practice that happens in a waiting room or on a bus, where a worksheet and a pencil are not practical.",
      },
    ],
    howTitle: "Getting the most out of it",
    how: [
      "Start with the letter your child is already working on elsewhere, rather than moving through the alphabet in order here. Repetition across two different formats is what makes a letter stick.",
      "Say the letter's name out loud each time your child finishes tracing it. Silent tracing teaches the hand but not the ear.",
      "Let them colour outside the lines. This is not a handwriting test — the goal at this stage is comfort and repetition, and correcting a four-year-old's colouring is the fastest way to end the session.",
      "Move to the printable worksheets once the shape is reliable. Screen tracing builds recognition; paper builds the pencil control that school will ask for.",
    ],
    nextTitle: "Where to go next",
    next: [
      { href: "/printables", t: "Printable tracing worksheets (PDF)", d: "The paper version — a full page for every letter, free to download and print." },
      { href: "/learn/arabic-letter-forms", t: "Why Arabic letters change shape", d: "The joining rules that decide how a letter looks in a real word." },
      { href: "/play", t: "The letter game", d: "Hear every letter pronounced. Good for the sound side of the same letter." },
      { href: "/learn/arabic-alphabet-guide", t: "The complete alphabet guide", d: "All 28 letters, how each one sounds, and the mistakes learners usually make." },
    ],
    faqTitle: "Questions about the tracing canvas",
    faq: [
      { q: "Does the Arabic tracing game need a download or an account?", a: "No. It runs in the browser. There is no download, no account, no email address and no payment, and nothing your child draws is uploaded or stored anywhere." },
      { q: "What devices does it work on?", a: "Any modern browser on a phone, tablet, laptop or desktop. Tablets with a stylus give the closest feel to writing with a pencil, but a finger on a phone screen works well for younger children." },
      { q: "What age is the colouring and tracing canvas for?", a: "It suits children from about three upwards. Below four, most children will simply enjoy painting over the letter, which is still useful — recognising the shape comes before reproducing it." },
      { q: "Is my child's drawing saved?", a: "No. Everything stays in the browser tab and disappears when you clear the canvas or close the page. We do not upload, store or transmit anything drawn here." },
      { q: "Should my child use this instead of paper worksheets?", a: "Use both. Screen tracing is better for early shape recognition and unlimited repetition; paper is better for pencil grip and the writing pressure that school expects. Most families use the canvas first and print the worksheets once the shape is familiar." },
    ],
  },

  ar: {
    crumb: "تلوين",
    h1: "لعبة تلوين وتتبّع الحروف العربية",
    lead:
      "اختر لوناً ثمّ ارسم مباشرة فوق الحرف بالإصبع أو بقلم رقمي أو بالفأرة. يبقى حدّ الحرف ظاهراً تحت اللون، فيستطيع الطفل تتبّع الشكل ما شاء، ثمّ يمسح اللوحة ويبدأ من جديد. لا شيء يُحمَّل ولا شيء يُعدّ — اللوحة في الأعلى هي النشاط كلّه.",
    whyTitle: "لماذا التتبّع على الشاشة قبل الورق",
    why: [
      {
        t: "يُلغي كلفة الخطأ",
        d: "الخطّ المرتعش على الورق دائم، والطفل الذي يخشى إفساد الصفحة يضغط أشدّ ويكتب أصغر. أمّا على الشاشة فنقرة واحدة تمسح كلّ شيء. وهذه الحقيقة وحدها هي ما يجعل الطفل المتردّد يحاول الحرف عشر مرّات متتالية بدل مرّة واحدة حذرة.",
      },
      {
        t: "الإصبع أسهل من القلم",
        d: "الإمساك الصحيح بالقلم مهارة حركية مستقلّة عن معرفة شكل الحرف. والتتبّع بالإصبع يتيح لابن الثلاث أو الأربع سنوات أن يتعلّم الشكل أوّلاً، حتى إذا جاء القلم كان يتعلّم شيئاً واحداً جديداً في المرّة.",
      },
      {
        t: "الشكل هو المقصود لا الإتقان",
        d: "تتمايز الحروف العربية بفروق دقيقة جدّاً: عدد النقاط، وكونها فوق أو تحت، وذيل ينزل عن السطر. والتتبّع الكبير على الشاشة يُظهر هذه الفروق بوضوح لا يتيحه حرف صغير بالقلم.",
      },
      {
        t: "ينتقل معك",
        d: "يعمل في متصفّح الهاتف أو اللوح، وهذا يجعله التمرين الذي يحدث في غرفة الانتظار أو في الحافلة، حيث لا تصلح ورقة وقلم.",
      },
    ],
    howTitle: "كيف تستفيد منه أكثر",
    how: [
      "ابدأ بالحرف الذي يعمل عليه طفلك في مكان آخر، بدل السير على الأبجدية بالترتيب هنا. فالتكرار عبر صيغتين مختلفتين هو ما يثبّت الحرف.",
      "انطق اسم الحرف بصوت مسموع كلّما أنهى طفلك تتبّعه. فالتتبّع الصامت يدرّب اليد ولا يدرّب الأذن.",
      "دعه يلوّن خارج الحدود. هذا ليس اختبار خطّ — والمقصود في هذه المرحلة الألفة والتكرار، وتصحيح تلوين ابن الأربع سنوات أسرع طريق لإنهاء الجلسة.",
      "انتقل إلى أوراق العمل المطبوعة متى استقرّ الشكل. فالتتبّع على الشاشة يبني التمييز، والورق يبني التحكّم بالقلم الذي ستطلبه المدرسة.",
    ],
    nextTitle: "إلى أين بعد ذلك",
    next: [
      { href: "/printables", t: "أوراق التتبّع للطباعة (PDF)", d: "النسخة الورقية — صفحة كاملة لكلّ حرف، مجانية للتنزيل والطباعة." },
      { href: "/learn/arabic-letter-forms", t: "لماذا تتغيّر أشكال الحروف", d: "قواعد الاتّصال التي تحدّد شكل الحرف داخل الكلمة." },
      { href: "/play", t: "لعبة الحروف", d: "استمع إلى نطق كلّ حرف. مفيدة للجانب الصوتي من الحرف نفسه." },
      { href: "/learn/arabic-alphabet-guide", t: "دليل الحروف الكامل", d: "الحروف الـ٢٨ كاملة، ونطق كلّ حرف، والأخطاء المعتادة عند المتعلّمين." },
    ],
    faqTitle: "أسئلة عن لوحة التتبّع",
    faq: [
      { q: "هل تحتاج لعبة التتبّع إلى تحميل أو حساب؟", a: "لا. تعمل داخل المتصفّح. لا تحميل ولا حساب ولا بريد إلكتروني ولا دفع، ولا يُرفع شيء ممّا يرسمه طفلك ولا يُخزَّن في أيّ مكان." },
      { q: "على أيّ الأجهزة تعمل؟", a: "على أيّ متصفّح حديث في هاتف أو لوح أو حاسوب محمول أو مكتبي. والألواح ذات القلم الرقمي أقرب إحساساً إلى الكتابة بالقلم، لكنّ الإصبع على شاشة الهاتف يفي بالغرض للأصغر سنّاً." },
      { q: "ما العمر المناسب للوحة التلوين والتتبّع؟", a: "تناسب من نحو ثلاث سنوات فصاعداً. ودون الرابعة سيكتفي أكثر الأطفال بالتلوين فوق الحرف، وهذا نافع أيضاً — فتمييز الشكل يسبق إنتاجه." },
      { q: "هل يُحفَظ رسم طفلي؟", a: "لا. يبقى كلّ شيء داخل صفحة المتصفّح ويزول متى مسحت اللوحة أو أغلقت الصفحة. ولا نرفع ولا نخزّن ولا ننقل شيئاً ممّا يُرسم هنا." },
      { q: "هل يستعمل طفلي هذه بدل أوراق العمل الورقية؟", a: "استعملوا الاثنتين. التتبّع على الشاشة أفضل لتمييز الشكل مبكراً وللتكرار بلا حدّ، والورق أفضل للإمساك بالقلم ولضغط الكتابة الذي تطلبه المدرسة. وأكثر الأسر تبدأ باللوحة ثمّ تطبع الأوراق متى صار الشكل مألوفاً." },
    ],
  },
} as const;

export default async function ColoringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const t = isAr ? copy.ar : copy.en;

  return (
    <PageLayout locale={locale} fullBleed>
      <ColoringLoader />

      {/* Article below the canvas — reachable by scrolling, and the part that
          explains to a parent (and to a crawler) what this page is for. */}
      <section dir={isAr ? "rtl" : "ltr"} className="border-t-2 border-ink/10 print:hidden">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
          <Breadcrumbs locale={locale} crumbs={[{ label: t.crumb }]} />

          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{t.h1}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{t.lead}</p>

          <h2 className="mt-10 font-display text-xl font-extrabold text-ink">{t.whyTitle}</h2>
          <div className="mt-4 space-y-4">
            {t.why.map((w) => (
              <div key={w.t} className="card-stock p-5">
                <h3 className="font-display text-base font-extrabold text-ink">{w.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{w.d}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-display text-xl font-extrabold text-ink">{t.howTitle}</h2>
          <ul className="mt-4 space-y-3">
            {t.how.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-saffron" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <FaqSection locale={locale} title={t.faqTitle} items={[...t.faq]} />
          </div>

          <h2 className="font-display text-xl font-extrabold text-ink">{t.nextTitle}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.next.map((n) => (
              <Link key={n.href} href={`/${locale}${n.href}`} className="card-stock p-5 transition hover:border-qalam">
                <h3 className="font-display text-sm font-extrabold text-ink">{n.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{n.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
