import type { Metadata } from "next";
import Link from "next/link";
import { TapLoader } from "./TapLoader";
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
  return generatePageMetadata(locale, "/games/tap", {
    titleEn: "Tap the Arabic Letter — Free Listening Game for Kids",
    titleAr: "لعبة انقر الحرف العربي — مجانية للأطفال",
    descriptionEn:
      "Hear an Arabic letter and tap the matching shape. A free, no-download listening game that links each of the 28 letters to its sound — audio-first, so it works before a child can read. Ages 3–7.",
    descriptionAr:
      "استمع إلى حرف عربي وانقر شكله المطابق. لعبة استماع مجانية بلا تحميل تربط كلّاً من الحروف الـ٢٨ بصوته — تعتمد الصوت أوّلاً فتصلح قبل أن يقرأ الطفل. لأعمار ٣–٧.",
    keywords: [
      "arabic letter sounds game", "learn arabic alphabet sounds", "arabic listening game for kids",
      "لعبة أصوات الحروف", "تعليم أصوات الحروف العربية", "arabic phonics for kids",
    ],
  });
}

const copy = {
  en: {
    crumb: "Tap the Letter",
    h1: "Tap the Arabic Letter",
    lead:
      "Press the speaker to hear a letter, then tap the shape that matches it. Get it right and you earn its star and hear a little cheer; get it wrong and the tile wobbles so you can try again. It is audio-first, which means a child can play it before they can read a single word.",
    whyTitle: "Why a listening game matters",
    why: [
      { t: "Sound comes before shape", d: "Children learn to hear a letter long before they can write it. Matching the sound to the shape builds the link the alphabet depends on — and it is the half that silent flashcards leave out." },
      { t: "No reading required", d: "The prompt is a sound, not a word, so a three-year-old who cannot read yet can still play and win. The star and the cheer are all the feedback they need." },
      { t: "Four choices, real thinking", d: "Choosing between four similar shapes makes the child look at the small differences — the dots, the tails — that tell Arabic letters apart, instead of just recognising one letter in isolation." },
    ],
    howTitle: "Getting the most out of it",
    how: [
      "Say the letter's name aloud with your child before they choose — hearing it twice, from the game and from you, doubles the exposure.",
      "If your child taps the wrong tile, resist correcting it — the wobble already tells them, and letting them find the right one themselves is what makes it stick.",
      "Play in short bursts. A handful of correct taps is a complete session for a young child; stop while it is still fun.",
    ],
    nextTitle: "Where to go next",
    next: [
      { href: "/games/trace", t: "Trace the letter", d: "Now write the shape you just learned to hear. The same 28 letters, drawn with a finger." },
      { href: "/play", t: "Free play", d: "Press any key to hear a letter spoken. Free exploration of every sound." },
      { href: "/learn/arabic-alphabet-guide", t: "The complete alphabet guide", d: "How each of the 28 letters sounds, with the mistakes learners usually make." },
      { href: "/coloring", t: "Colour the letters", d: "A free painting canvas — the same letters, with colours and stickers." },
    ],
    faqTitle: "Questions about the listening game",
    faq: [
      { q: "Does the game need a download or an account?", a: "No. It runs in the browser — no download, no account, no email and no payment. The star count stays in your browser only and is not sent anywhere." },
      { q: "My child's first tap made no sound — why?", a: "Browsers block audio until the first tap on the page, to stop sites playing sound on their own. After the first tap every letter plays normally; press the speaker button to replay a sound any time." },
      { q: "What age is it for?", a: "It suits children from about three upwards. Younger children can play by guessing and still absorb the sounds; older children use it to firm up letters they half-know." },
      { q: "Are the recordings real voices?", a: "They are neural Arabic and English voices, checked by ear before they ship — clear, consistent pronunciation for every letter." },
    ],
  },
  ar: {
    crumb: "انقر الحرف",
    h1: "انقر الحرف العربي",
    lead:
      "اضغط السمّاعة لتسمع حرفاً، ثمّ انقر الشكل الذي يطابقه. فإن أصبت كسبت نجمته وسمعت هتافاً صغيراً؛ وإن أخطأت اهتزّ المربّع لتعيد المحاولة. تعتمد اللعبة الصوت أوّلاً، فيلعبها الطفل قبل أن يقرأ كلمة واحدة.",
    whyTitle: "لماذا تهمّ لعبة الاستماع",
    why: [
      { t: "الصوت قبل الشكل", d: "يتعلّم الطفل سماع الحرف قبل أن يكتبه بزمن طويل. ومطابقة الصوت بالشكل تبني الرابط الذي تقوم عليه الأبجدية — وهو النصف الذي تغفله البطاقات الصامتة." },
      { t: "لا يشترط القراءة", d: "المطلوب صوت لا كلمة، فابن الثلاث سنوات الذي لم يقرأ بعد يلعب ويفوز. والنجمة والهتاف كلّ ما يحتاجه من تغذية راجعة." },
      { t: "أربعة خيارات وتفكير حقيقي", d: "الاختيار بين أربعة أشكال متشابهة يدفع الطفل إلى النظر في الفروق الدقيقة — النقاط والذيول — التي تميّز الحروف، بدل تمييز حرف واحد منعزلاً." },
    ],
    howTitle: "كيف تستفيد منها أكثر",
    how: [
      "انطق اسم الحرف مع طفلك قبل أن يختار — فسماعه مرّتين، من اللعبة ومنك، يضاعف التعرّض.",
      "إذا نقر طفلك المربّع الخطأ فلا تصحّح له — فالاهتزاز أخبره، وتركُه يجد الصحيح بنفسه هو ما يثبّته.",
      "العبا على دفعات قصيرة. حفنة نقرات صحيحة جلسة كاملة للطفل الصغير؛ توقّفا وهي ما زالت ممتعة.",
    ],
    nextTitle: "إلى أين بعد ذلك",
    next: [
      { href: "/games/trace", t: "تتبّع الحرف", d: "اكتب الآن الشكل الذي تعلّمت سماعه. الحروف الـ٢٨ نفسها، تُرسم بالإصبع." },
      { href: "/play", t: "لعب حر", d: "اضغط أيّ مفتاح لتسمع نطق حرف. استكشاف حرّ لكلّ صوت." },
      { href: "/learn/arabic-alphabet-guide", t: "دليل الحروف الكامل", d: "كيف يُنطق كلّ حرف من الحروف الـ٢٨، مع الأخطاء المعتادة عند المتعلّمين." },
      { href: "/coloring", t: "لوّن الحروف", d: "لوحة رسم مجانية — الحروف نفسها، مع الألوان والملصقات." },
    ],
    faqTitle: "أسئلة عن لعبة الاستماع",
    faq: [
      { q: "هل تحتاج اللعبة إلى تحميل أو حساب؟", a: "لا. تعمل داخل المتصفّح — بلا تحميل ولا حساب ولا بريد ولا دفع. ويبقى عدّ النجمات في متصفّحك وحده ولا يُرسل إلى أيّ مكان." },
      { q: "لماذا لم يصدر صوت عند أوّل نقرة؟", a: "تمنع المتصفّحات الصوت حتى أوّل نقرة على الصفحة، لئلّا تشغّل المواقع صوتاً من تلقائها. وبعد أوّل نقرة يُنطق كلّ حرف عادياً؛ واضغط زرّ السمّاعة لإعادة الصوت متى شئت." },
      { q: "ما العمر المناسب لها؟", a: "تناسب من نحو ثلاث سنوات فصاعداً. والأصغر سنّاً يلعبون بالتخمين ويلتقطون الأصوات، والأكبر يثبّتون بها حروفاً يعرفونها نصف معرفة." },
      { q: "هل الأصوات لأصوات بشرية حقيقية؟", a: "هي أصوات عصبية عربية وإنجليزية، مُراجعة بالأذن قبل نشرها — نطق واضح متّسق لكلّ حرف." },
    ],
  },
} as const;

export default async function TapPage({
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
      <TapLoader />

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
