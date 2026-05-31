import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHOTO } from "@/components/AuthorByline";

const SITE_URL = "https://www.arabfingers.site";

export const metadata: Metadata = {
  title: `${AUTHOR_NAME} — Author & Founder | عن المؤلف`,
  description:
    "Aissa Trad is the parent and developer behind Arab Fingers, a free, open-source bilingual Arabic learning resource for families raising children aged 1–6.",
};

export default async function AuthorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
        <Image
          src={AUTHOR_PHOTO}
          alt={AUTHOR_NAME}
          width={120}
          height={120}
          unoptimized
          className="h-28 w-28 rounded-full object-cover bg-white/10 shrink-0"
        />
        <div className="text-center sm:text-start">
          <h1 className="text-3xl font-bold text-white">{AUTHOR_NAME}</h1>
          <p className="mt-1 text-sm text-accent/90">
            {isAr ? "مطوّر ومؤسس عرب فنجرز" : "Developer & Founder of Arab Fingers"}
          </p>
          <a
            href={`mailto:${AUTHOR_EMAIL}`}
            className="mt-3 inline-block text-sm text-white/60 underline hover:text-accent"
            dir="ltr"
          >
            {AUTHOR_EMAIL}
          </a>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70 max-w-2xl">
        {isAr ? (
          <>
            <p>
              أنا عيسى، الأب والمطوّر الذي بنى <strong className="text-white/90">عرب فنجرز</strong>.
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
              <strong className="text-white/90">Arab Fingers</strong>. The project started from a
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

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={`/${locale}/about`} className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 transition">
            {isAr ? "عن المشروع" : "About the project"}
          </Link>
          <Link href={`/${locale}/learn`} className="rounded-lg bg-accent/90 px-4 py-2 font-medium text-slate-950 hover:bg-accent transition">
            {isAr ? "أدلة التعلم" : "Learning guides"}
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
