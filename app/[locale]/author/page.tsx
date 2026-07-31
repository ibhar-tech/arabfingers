import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHOTO } from "@/components/AuthorByline";
import { setRequestLocale } from "next-intl/server";

const SITE_URL = "https://www.arabfingers.site";

/**
 * Editorial standards, stated plainly. Everything here is checkable against the
 * site itself — no invented credentials, since the honest position ("parent and
 * developer, not a linguist") is already the more useful signal to a reader.
 */
const editorialEn: { h: string; body: string[] }[] = [
  {
    h: "How the material on this site is made",
    body: [
      "The letter, number and colour audio is produced with neural Arabic text-to-speech voices and then checked by ear before it ships. I would rather tell you that than imply a studio and a voice actor. It is clear and consistent, which is what a child repeating a letter forty times needs — but it is synthetic, and for the sounds English speakers find hardest (ح, ع, ق, ض) there is no substitute for hearing a relative say them. Use the audio as the reference, not as the whole lesson.",
      "The written guides are drafted, then checked against the way the letters actually behave in ordinary words. The printable worksheets are generated from the same letter data that drives the site, so a letter cannot be correct in the game and wrong on the worksheet.",
      "Where a guide makes a claim about how children learn, it reflects publicly available child-development material and my own experience raising bilingual children. I try to say which is which, and I avoid dressing up an opinion as research.",
    ],
  },
  {
    h: "What I will not do here",
    body: [
      "I will not put a worksheet behind an email form, invent a teaching qualification I do not hold, or publish a page whose only purpose is to rank. There is no newsletter, no upsell and no paid tier, and the downloads are the complete files rather than samples of something purchasable.",
      "The site carries advertising, and I would rather say so plainly than pretend otherwise: ads are what pay for the hosting and for the voice recordings. They are kept off the pages children actually play on, and the privacy policy sets out exactly which third-party cookies that involves.",
    ],
  },
  {
    h: "Corrections",
    body: [
      "If something here is wrong — a mispronounced recording, a letter form drawn incorrectly, a claim that does not hold up — please write to me. Corrections to language content go to the front of the queue, because a child practising a wrong letter shape is worse than a child practising nothing. I read every message myself, and I will say in the page when something has been corrected.",
    ],
  },
];

const editorialAr: { h: string; body: string[] }[] = [
  {
    h: "كيف تُصنع مواد هذا الموقع",
    body: [
      "صوت الحروف والأرقام والألوان مُنتَج بأصوات عصبية اصطناعية للعربية، ثمّ يُراجَع بالسمع قبل نشره. وأفضّل أن أخبرك بهذا على أن أوحي بوجود استوديو وممثّل صوتي. هو واضح ومتّسق، وهذا ما يحتاجه طفل يعيد الحرف أربعين مرّة — لكنّه اصطناعي، وللأصوات التي يجدها متكلّمو الإنجليزية أصعب (ح، ع، ق، ض) لا بديل عن سماعها من قريب ينطقها. فاجعل الصوت مرجعاً لا درساً كاملاً.",
      "تُكتب الأدلّة أوّلاً، ثمّ تُراجَع على سلوك الحروف الفعلي في الكلمات المعتادة. وتُولَّد أوراق العمل من بيانات الحروف نفسها التي يعمل بها الموقع، فلا يمكن أن يكون الحرف صحيحاً في اللعبة خاطئاً في الورقة.",
      "وحيث يقرّر دليلٌ شيئاً عن طريقة تعلّم الأطفال، فهو يعكس موادّ متاحة للعموم في تطوّر الطفل وتجربتي في تربية أبناء ثنائيي اللغة. وأحاول أن أبيّن أيّهما أيّ، وأتجنّب أن ألبس الرأي ثوب البحث.",
    ],
  },
  {
    h: "ما لن أفعله هنا",
    body: [
      "لن أضع ورقة عمل خلف نموذج بريد إلكتروني، ولن أدّعي مؤهّلاً تعليمياً لا أحمله، ولن أنشر صفحة غرضها الوحيد التصدّر في البحث. لا نشرة بريدية ولا ترقية مدفوعة ولا طبقة مأجورة، والملفّات المنزَّلة كاملة لا عيّنات من شيء يُباع.",
      "يعرض الموقع إعلانات، وأفضّل أن أقولها صراحةً بدل أن أتظاهر بغيرها: الإعلانات هي ما يدفع كلفة الاستضافة والتسجيلات الصوتية. وهي مُبعَدة عن الصفحات التي يلعب فيها الأطفال فعلاً، وتبيّن سياسة الخصوصية بالضبط ما يستتبعه ذلك من ملفّات ارتباط لطرف ثالث.",
    ],
  },
  {
    h: "التصحيحات",
    body: [
      "إن كان هنا شيء خاطئ — تسجيل بنطق غير سليم، أو شكل حرف مرسوم على غير وجهه، أو دعوى لا تثبت — فاكتب إليّ. وتصحيحات المحتوى اللغوي تتقدّم الصفّ، لأنّ طفلاً يتدرّب على شكل حرف خاطئ أسوأ من طفل لا يتدرّب أصلاً. أقرأ كلّ رسالة بنفسي، وأذكر في الصفحة متى صُحّح شيء فيها.",
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/author", {
    titleEn: `${AUTHOR_NAME} — Author & Founder of Arab Fingers`,
    titleAr: `${AUTHOR_NAME} — مؤلف ومؤسس عرب فنجرز`,
    descriptionEn:
      "Aissa Trad is the parent and developer behind Arab Fingers, a free, open-source bilingual Arabic learning resource for families raising children aged 1–6.",
    descriptionAr:
      "عيسى تراد هو الأب والمطوّر الذي بنى عرب فنجرز، مورد تعليمي عربي مجاني ومفتوح المصدر ثنائي اللغة للعائلات التي تربي أطفالاً من عمر سنة إلى ٦ سنوات.",
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-05-31",
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/${locale}/author`,
      image: `${SITE_URL}${AUTHOR_PHOTO}`,
      email: AUTHOR_EMAIL,
      jobTitle: "Developer & Founder",
      description:
        "Parent and developer who built Arab Fingers, a free open-source bilingual Arabic learning resource for young children.",
      worksFor: {
        "@type": "Organization",
        name: "Arab Fingers",
        url: SITE_URL,
      },
    },
  };

  return (
    <PageLayout locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <Breadcrumbs
        locale={locale}
        crumbs={[{ label: isAr ? "المؤلف" : "Author", href: `/${locale}/author` }]}
      />

      <div className="card-stock p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
        <Image
          src={AUTHOR_PHOTO}
          alt={AUTHOR_NAME}
          width={120}
          height={120}
          unoptimized
          className="h-28 w-28 rounded-full object-cover bg-saffron-soft shrink-0"
        />
        <div className="text-center sm:text-start">
          <h1 className="text-3xl font-bold text-ink font-display">{AUTHOR_NAME}</h1>
          <p className="mt-1 text-sm text-accent/90">
            {isAr ? "مطوّر ومؤسس عرب فنجرز" : "Developer & Founder of Arab Fingers"}
          </p>
          <a
            href={`mailto:${AUTHOR_EMAIL}`}
            className="mt-3 inline-block text-sm text-ink/60 underline hover:text-accent"
            dir="ltr"
          >
            {AUTHOR_EMAIL}
          </a>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80 max-w-2xl">
        {isAr ? (
          <>
            <p>
              أنا عيسى، الأب والمطوّر الذي بنى <strong className="text-ink/90">عرب فنجرز</strong>.
              بدأ المشروع من تجربة شخصية: البحث عن أداة بسيطة وممتعة تساعد طفلي على التعرف على الحروف
              العربية دون ضغط أو اشتراكات أو إعلانات تستهدف الأطفال — ولم أجد ما يناسبني، فقررت بناءه.
            </p>
            <p>
              أنا لست لغوياً أو معلماً محترفاً، وكل المحتوى التعليمي على الموقع مبني على مصادر تطور
              الطفل المتاحة للعموم وعلى تجربتي كأب يربّي أطفالاً ثنائيي اللغة. أكتب الأدلة لتكون عملية
              وصادقة، وأحدّثها عندما أتعلم شيئاً جديداً أو يصلني تصحيح من القرّاء.
            </p>
            <p>
              عرب فنجرز مجاني ومفتوح المصدر، ولا يجمع أي بيانات شخصية عن الأطفال. إن كان لديك سؤال أو
              ملاحظة أو تصحيح، تواصل معي مباشرة عبر البريد أعلاه — أقرأ كل رسالة بنفسي.
            </p>
          </>
        ) : (
          <>
            <p>
              I&apos;m Aissa, the parent and developer who built{" "}
              <strong className="text-ink/90">Arab Fingers</strong>. The project started from a
              personal need: I was looking for a simple, joyful way to help my own child recognise
              Arabic letters — without pressure, subscriptions, or ads aimed at kids — and couldn&apos;t
              find one I liked, so I built it.
            </p>
            <p>
              I&apos;m not a linguist or a professional teacher. The educational guides on this site are
              based on publicly available child-development sources and my own experience raising
              bilingual children. I write them to be practical and honest, and I update them when I
              learn something new or a reader sends a correction.
            </p>
            <p>
              Arab Fingers is free and open-source, and it collects no personal data from children.
              If you have a question, a suggestion, or a correction, email me directly at the address
              above — I read every message myself.
            </p>
          </>
        )}

        {(isAr ? editorialAr : editorialEn).map((s) => (
          <section key={s.h} className="pt-2">
            <h2 className="font-display text-lg font-extrabold text-ink">{s.h}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-2 text-sm leading-relaxed text-ink/75">{p}</p>
            ))}
          </section>
        ))}

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={`/${locale}/about`} className="btn-chunky-ghost rounded-lg px-4 py-2 font-medium">
            {isAr ? "عن المشروع" : "About the project"}
          </Link>
          <Link href={`/${locale}/learn`} className="btn-chunky rounded-lg px-4 py-2 font-medium">
            {isAr ? "أدلة التعلم" : "Learning guides"}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
