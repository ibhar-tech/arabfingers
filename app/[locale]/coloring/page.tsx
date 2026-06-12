import type { Metadata } from "next";
import Link from "next/link";
import { ColoringLoader } from "./ColoringLoader";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Coloring & Tracing — Learn Arabic Letters | تلوين وتتبع الحروف",
  description:
    "Free interactive coloring and tracing game for Arabic letters. Let your kids paint, trace, and color the Arabic alphabet with this fun educational tool.",
};

export default async function ColoringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = isLocale(locale) && locale === "ar";

  return (
    <>
      <ColoringLoader />

      {/* Visible content section below the interactive canvas (reachable by scrolling). */}
      <section
        dir={isAr ? "rtl" : "ltr"}
        className="bg-[#050816] text-white/85 border-t border-white/10 print:hidden"
      >
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
          {isAr ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                لعبة تلوين وتتبع الحروف العربية
              </h1>
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                لوحة رسم تفاعلية مجانية تتيح للأطفال ممارسة مهاراتهم الحركية الدقيقة أثناء تعلم
                أشكال الحروف العربية. اختر لوناً من اللوحة واستخدم إصبعك أو الفأرة للرسم والتتبع
                مباشرة على الشاشة.
              </p>

              <h2 className="text-lg font-semibold text-white mb-2">الفوائد التعليمية</h2>
              <ul className="list-disc ms-5 space-y-1.5 text-sm text-white/80 mb-8">
                <li>تنمية المهارات الحركية الدقيقة الأساسية للكتابة</li>
                <li>تعزيز التعرف على الحروف العربية وحفظ أشكالها</li>
                <li>بيئة إبداعية خالية من الضغط للأطفال</li>
                <li>يعمل بسلاسة على الأجهزة اللوحية والهواتف والحواسيب</li>
              </ul>

              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}`} className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 transition">
                  ← الصفحة الرئيسية
                </Link>
                <Link href={`/${locale}/learn/arabic-letter-forms`} className="rounded-lg bg-accent/90 px-4 py-2 font-medium text-slate-950 hover:bg-accent transition">
                  دليل أشكال الحروف العربية
                </Link>
                <Link href={`/${locale}/play`} className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 transition">
                  ▶ لعبة الحروف
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Arabic Letters Coloring &amp; Tracing Game
              </h1>
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                A free interactive canvas that lets children practise their fine motor skills while
                learning the shapes of Arabic letters. Pick a colour from the palette and use your
                finger or mouse to paint and trace directly on the screen.
              </p>

              <h2 className="text-lg font-semibold text-white mb-2">Educational Benefits</h2>
              <ul className="list-disc ms-5 space-y-1.5 text-sm text-white/80 mb-8">
                <li>Develops fine motor skills essential for writing</li>
                <li>Reinforces Arabic letter recognition and shape memorization</li>
                <li>Provides a creative, pressure-free environment for kids</li>
                <li>Works smoothly on tablets, phones, and desktop computers</li>
              </ul>

              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}`} className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 transition">
                  ← Home
                </Link>
                <Link href={`/${locale}/learn/arabic-letter-forms`} className="rounded-lg bg-accent/90 px-4 py-2 font-medium text-slate-950 hover:bg-accent transition">
                  Arabic Letter Forms Guide
                </Link>
                <Link href={`/${locale}/play`} className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/15 transition">
                  ▶ Letter Game
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
