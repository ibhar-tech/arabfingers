import type { Metadata } from "next";
import Link from "next/link";
import { TraceLoader } from "./TraceLoader";
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
  return generatePageMetadata(locale, "/games/trace", {
    titleEn: "Trace the Arabic Letters — Free Handwriting Game for Kids",
    titleAr: "لعبة تتبّع الحروف العربية — مجانية للأطفال",
    descriptionEn:
      "Trace all 28 Arabic letters with a finger and earn a star for each one. A free, no-download handwriting game that follows the dotted letter outline — great early writing practice for ages 3–7.",
    descriptionAr:
      "تتبّع الحروف العربية الـ٢٨ بإصبعك واكسب نجمة عن كلّ حرف. لعبة خطّ مجانية بلا تحميل تتبع حدّ الحرف المنقّط — تدريب ممتاز على الكتابة المبكرة لأعمار ٣–٧.",
    keywords: [
      "trace arabic letters game", "arabic handwriting for kids", "arabic letter tracing online",
      "لعبة تتبع الحروف", "تعليم الكتابة العربية للأطفال", "free arabic writing game",
    ],
  });
}

const copy = {
  en: {
    crumb: "Trace the Letters",
    h1: "Trace the Arabic Letters",
    lead:
      "Follow the dotted outline of each Arabic letter with a finger, a stylus or a mouse. When you have covered enough of the shape you earn its star — then move on to the next letter. There is nothing to download and nothing to set up; the game above is the whole activity.",
    whyTitle: "Why an interactive tracing game helps",
    why: [
      { t: "Repetition without a cost", d: "A wobbly line on paper is permanent. On screen, one tap clears everything, so a hesitant child will attempt a letter ten times instead of once carefully." },
      { t: "Shape before pencil grip", d: "Tracing with a finger teaches the shape of the letter first. When the pencil comes out later, the child is only learning one new thing at a time." },
      { t: "The star is the feedback", d: "A child does not need to read to know they finished — the confetti, the letter's sound and the star do the teaching, which is why it works for pre-readers." },
    ],
    howTitle: "Getting the most out of it",
    how: [
      "Say the letter's name aloud with your child each time the star appears — the game plays the sound, and repeating it links the shape to the sound.",
      "Start with the letters your child already knows, so the first stars come quickly and the game feels winnable.",
      "Move to the printable worksheets once the shape is reliable — screen tracing builds recognition, paper builds the pencil control school expects.",
    ],
    nextTitle: "Where to go next",
    next: [
      { href: "/games/tap", t: "Tap the letter", d: "Listen to a letter's sound and tap the matching shape. The sound side of the same 28 letters." },
      { href: "/coloring", t: "Colour the letters", d: "A free painting canvas — the same letters, with colours and stickers." },
      { href: "/printables", t: "Printable tracing worksheets (PDF)", d: "The paper version — a full page for every letter, free to download and print." },
      { href: "/learn/arabic-alphabet-guide", t: "The complete alphabet guide", d: "All 28 letters, how each one sounds, and the mistakes learners usually make." },
    ],
    faqTitle: "Questions about the tracing game",
    faq: [
      { q: "Does the game need a download or an account?", a: "No. It runs in the browser — no download, no account, no email and no payment. Nothing your child draws is uploaded or stored anywhere; the star count stays in your browser only." },
      { q: "What age is it for?", a: "It suits children from about three upwards. Younger children enjoy covering the letter, which is still useful — recognising a shape comes before writing it." },
      { q: "What devices work best?", a: "Any modern browser on a phone, tablet or computer. A tablet with a stylus gives the closest feel to writing with a pencil, but a finger on a phone works well for younger children." },
      { q: "Are the stars saved?", a: "Yes — in your browser, so they survive a reload on the same device. They are not tied to an account and are not sent anywhere. Clearing your browser data resets them." },
    ],
  },
  ar: {
    crumb: "تتبّع الحروف",
    h1: "تتبّع الحروف العربية",
    lead:
      "اتبع الحدّ المنقّط لكلّ حرف بإصبعك أو بقلم رقمي أو بالفأرة. ومتى غطّيت ما يكفي من الشكل كسبت نجمته، ثمّ انتقلت إلى الحرف التالي. لا شيء يُحمَّل ولا شيء يُعدّ — اللعبة في الأعلى هي النشاط كلّه.",
    whyTitle: "لماذا تنفع لعبة التتبّع التفاعلية",
    why: [
      { t: "تكرار بلا كلفة", d: "الخطّ المرتعش على الورق دائم. أمّا على الشاشة فنقرة واحدة تمسح كلّ شيء، فيحاول الطفل المتردّد الحرف عشر مرّات بدل مرّة واحدة حذرة." },
      { t: "الشكل قبل الإمساك بالقلم", d: "التتبّع بالإصبع يعلّم شكل الحرف أوّلاً، فإذا جاء القلم لاحقاً كان الطفل يتعلّم شيئاً واحداً جديداً في المرّة." },
      { t: "النجمة هي التغذية الراجعة", d: "لا يحتاج الطفل إلى القراءة ليعرف أنّه أنهى — فالقصاصات وصوت الحرف والنجمة هي ما يعلّم، ولهذا تنفع مع من لم يقرأ بعد." },
    ],
    howTitle: "كيف تستفيد منها أكثر",
    how: [
      "انطق اسم الحرف مع طفلك كلّما ظهرت النجمة — فاللعبة تشغّل الصوت، وترديده يربط الشكل بالصوت.",
      "ابدأ بالحروف التي يعرفها طفلك، لتأتي النجمات الأولى سريعاً وتبدو اللعبة قابلة للفوز.",
      "انتقل إلى أوراق العمل المطبوعة متى استقرّ الشكل — فالتتبّع على الشاشة يبني التمييز، والورق يبني التحكّم بالقلم الذي تطلبه المدرسة.",
    ],
    nextTitle: "إلى أين بعد ذلك",
    next: [
      { href: "/games/tap", t: "انقر الحرف", d: "استمع إلى صوت الحرف وانقر شكله المطابق. الجانب الصوتي من الحروف الـ٢٨ نفسها." },
      { href: "/coloring", t: "لوّن الحروف", d: "لوحة رسم مجانية — الحروف نفسها، مع الألوان والملصقات." },
      { href: "/printables", t: "أوراق التتبّع للطباعة (PDF)", d: "النسخة الورقية — صفحة كاملة لكلّ حرف، مجانية للتنزيل والطباعة." },
      { href: "/learn/arabic-alphabet-guide", t: "دليل الحروف الكامل", d: "الحروف الـ٢٨ كاملة، ونطق كلّ حرف، والأخطاء المعتادة عند المتعلّمين." },
    ],
    faqTitle: "أسئلة عن لعبة التتبّع",
    faq: [
      { q: "هل تحتاج اللعبة إلى تحميل أو حساب؟", a: "لا. تعمل داخل المتصفّح — بلا تحميل ولا حساب ولا بريد ولا دفع. ولا يُرفع شيء ممّا يرسمه طفلك ولا يُخزَّن، ويبقى عدّ النجمات في متصفّحك وحده." },
      { q: "ما العمر المناسب لها؟", a: "تناسب من نحو ثلاث سنوات فصاعداً. والأصغر سنّاً يستمتعون بتغطية الحرف، وهذا نافع أيضاً — فتمييز الشكل يسبق كتابته." },
      { q: "أيّ الأجهزة أنسب؟", a: "أيّ متصفّح حديث في هاتف أو لوح أو حاسوب. واللوح ذو القلم الرقمي أقرب إحساساً إلى الكتابة بالقلم، لكنّ الإصبع على الهاتف يفي بالغرض للأصغر." },
      { q: "هل تُحفَظ النجمات؟", a: "نعم — في متصفّحك، فتبقى بعد إعادة التحميل على الجهاز نفسه. وهي غير مرتبطة بحساب ولا تُرسل إلى أيّ مكان. ومسح بيانات المتصفّح يعيدها إلى الصفر." },
    ],
  },
} as const;

export default async function TracePage({
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
      <TraceLoader />

      <section dir={isAr ? "rtl" : "ltr"} className="border-t-2 border-ink/10 print:hidden">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
          <Breadcrumbs locale={locale} crumbs={[{ label: isAr ? "الألعاب" : "Games", href: `/${locale}/games` }, { label: t.crumb }]} />

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
