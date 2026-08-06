import type { Metadata } from "next";
import Link from "next/link";
import { GamesHub } from "./GamesHub";
import { isLocale } from "@/lib/locales";
import { PageLayout } from "@/components/PageLayout";
import { FaqSection } from "@/components/FaqSection";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/games", {
    titleEn: "Free Arabic Alphabet Games for Kids — Trace, Listen & Play",
    titleAr: "ألعاب الحروف العربية للأطفال — تتبّع واستمع والعب مجاناً",
    descriptionEn:
      "A small set of free Arabic alphabet games for young children: trace each letter with a finger, listen and tap the matching shape, colour the letters, and play the sound game. No download, no account — stars saved on your device.",
    descriptionAr:
      "مجموعة صغيرة من ألعاب الحروف العربية المجانية للصغار: تتبّع كلّ حرف بإصبعك، واستمع وانقر الشكل المطابق، ولوّن الحروف، والعب لعبة الأصوات. بلا تحميل وبلا حساب — تُحفَظ النجمات على جهازك.",
    keywords: [
      "arabic alphabet games for kids", "free arabic games online", "learn arabic letters game",
      "ألعاب الحروف العربية", "ألعاب تعليم العربية للأطفال", "arabic letters for toddlers",
    ],
  });
}

const copy = {
  en: {
    aboutTitle: "About these games",
    about:
      "Each game here does one small job and does it in a minute or two — the length of a young child's attention. Tracing teaches the shape of a letter, tapping teaches its sound, colouring makes it playful, and the letter game lets a child explore every sound at their own pace. Together they cover the two halves of learning the alphabet, seeing it and hearing it, without ever asking a child to read an instruction. Everything runs in the browser: no download, no account, no cost, and the stars a child earns are saved on your own device, not sent anywhere.",
    faqTitle: "Questions about the games",
    faq: [
      { q: "Do the games cost anything or need an account?", a: "No. Every game is free and runs in the browser. There is no account, no email, no download and no payment, and nothing is uploaded — the star counts live in your browser only." },
      { q: "What age are they for?", a: "About three to seven. Younger children enjoy the tracing and colouring; the tapping game and the letter game suit children who are starting to connect sounds with shapes." },
      { q: "Are the stars saved?", a: "Yes, in your browser, so they survive a reload on the same device. They are not tied to an account. Clearing your browser data resets them." },
      { q: "Do they work on a phone or tablet?", a: "Yes. They are built for touch first — a finger on a phone or a stylus on a tablet — and work equally well with a mouse on a computer." },
    ],
    moreTitle: "More free Arabic activities",
    more: [
      { href: "/printables", t: "Printable worksheets (PDF)", d: "Tracing pages, number pages and colouring sheets to print at home." },
      { href: "/learn/arabic-alphabet-guide", t: "The complete alphabet guide", d: "All 28 letters, how each sounds, and the mistakes learners usually make." },
    ],
  },
  ar: {
    aboutTitle: "عن هذه الألعاب",
    about:
      "كلّ لعبة هنا تؤدّي مهمّة صغيرة واحدة وتنتهي في دقيقة أو دقيقتين — بقدر انتباه الطفل الصغير. فالتتبّع يعلّم شكل الحرف، والنقر يعلّم صوته، والتلوين يجعله ممتعاً، ولعبة الحروف تدع الطفل يستكشف كلّ صوت على مهله. وهي معاً تغطّي نصفَي تعلّم الأبجدية، رؤيتها وسماعها، دون أن تطلب من الطفل قراءة تعليمة. وكلّ شيء يعمل في المتصفّح: بلا تحميل ولا حساب ولا كلفة، والنجمات التي يكسبها الطفل تُحفَظ على جهازك أنت لا تُرسل إلى أيّ مكان.",
    faqTitle: "أسئلة عن الألعاب",
    faq: [
      { q: "هل الألعاب بمقابل أو تحتاج حساباً؟", a: "لا. كلّ لعبة مجانية وتعمل في المتصفّح. لا حساب ولا بريد ولا تحميل ولا دفع، ولا يُرفع شيء — ويبقى عدّ النجمات في متصفّحك وحده." },
      { q: "ما العمر المناسب لها؟", a: "نحو ثلاث إلى سبع سنوات. الأصغر يستمتعون بالتتبّع والتلوين؛ ولعبتا النقر والحروف تناسبان من بدأ يربط الأصوات بالأشكال." },
      { q: "هل تُحفَظ النجمات؟", a: "نعم، في متصفّحك، فتبقى بعد إعادة التحميل على الجهاز نفسه. وهي غير مرتبطة بحساب. ومسح بيانات المتصفّح يعيدها إلى الصفر." },
      { q: "هل تعمل على الهاتف أو اللوح؟", a: "نعم. صُمّمت للمس أوّلاً — إصبع على الهاتف أو قلم رقمي على اللوح — وتعمل كذلك بالفأرة على الحاسوب." },
    ],
    moreTitle: "أنشطة عربية مجانية أخرى",
    more: [
      { href: "/printables", t: "أوراق العمل للطباعة (PDF)", d: "صفحات تتبّع وأرقام وتلوين لطباعتها في البيت." },
      { href: "/learn/arabic-alphabet-guide", t: "دليل الحروف الكامل", d: "الحروف الـ٢٨ كاملة، وكيف يُنطق كلّ حرف، والأخطاء المعتادة." },
    ],
  },
} as const;

export default async function GamesPage({
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
    <PageLayout locale={locale}>
      <GamesHub locale={locale} />

      <section dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-3xl px-5 pb-12 sm:px-6">
        <h2 className="font-display text-xl font-extrabold text-ink">{t.aboutTitle}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{t.about}</p>

        <div className="mt-10">
          <FaqSection locale={locale} title={t.faqTitle} items={[...t.faq]} />
        </div>

        <h2 className="font-display text-xl font-extrabold text-ink">{t.moreTitle}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.more.map((n) => (
            <Link key={n.href} href={`/${locale}${n.href}`} className="card-stock p-5 transition hover:border-qalam">
              <h3 className="font-display text-sm font-extrabold text-ink">{n.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{n.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
