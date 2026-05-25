"use client";

import Link from "next/link";
import { arabicLetters } from "@/lib/arabicMap";

type PrintablesClientProps = {
  locale: string;
};

export function PrintablesClient({ locale }: PrintablesClientProps) {
  return locale === "ar" ? <PrintablesAr /> : <PrintablesEn />;
}

function PrintablesEn() {
  return (
    <>
      {/* Print Instructions */}
      <div className="print:hidden rounded-2xl border border-accent/25 bg-accent/5 p-6 mb-8 text-center">
        <span className="text-4xl mb-2 block">🖨️✨</span>
        <h1 className="text-2xl font-bold text-white mb-2">Free Printable Arabic Tracing Sheets</h1>
        <p className="text-xs text-white/60 leading-relaxed max-w-lg mx-auto">
          Need screen-free learning? We built a built-in printer stylesheet! Simply press{" "}
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-accent">Ctrl + P</kbd> (or{" "}
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-accent">Cmd + P</kbd> on Mac) on your keyboard to instantly print a beautiful, full-page letter tracing activity workbook for your toddler!
        </p>
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.print();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-[#050816] shadow-[0_4px_16px_rgba(159,225,203,0.25)] hover:scale-105 transition cursor-pointer"
        >
          🖨️ Print Worksheets Now
        </button>
      </div>

      {/* Printable Area Header (Shown only on Print) */}
      <div className="hidden print:block text-black text-center mb-8 border-b border-black/10 pb-4">
        <h1 className="text-3xl font-bold">ArabFingers Workbook</h1>
        <p className="text-sm text-black/60 mt-1">Arabic Alphabet Writing & Tracing Practice Sheets</p>
        <div className="mt-4 flex justify-between text-xs text-black/40">
          <span>Name: ________________________</span>
          <span>Date: ________________________</span>
        </div>
      </div>

      {/* Grid of Letter-Tracing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6">
        {arabicLetters.map((letter) => (
          <div
            key={letter.ar}
            className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
              <div>
                <span className="text-xs font-semibold text-accent print:text-black/60 uppercase">
                  Letter {letter.soundId}
                </span>
                <h3 className="text-lg font-bold text-white print:text-black mt-0.5">
                  {letter.arName} <span className="text-xs font-normal text-white/45 print:text-black/40">({letter.enName})</span>
                </h3>
              </div>
              <div className="text-4xl font-bold font-arabic text-accent print:text-black">
                {letter.ar}
              </div>
            </div>

            {/* Tracing Grid */}
            <div className="flex items-center justify-between gap-2 mt-2">
              {/* Dotted target guide */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">Guide</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center bg-white/2 print:bg-black/2 print:border-black/20">
                  <span className="text-3xl font-bold font-arabic text-white/25 print:text-black/25 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Tracing Block 1 */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">Trace</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                  <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Tracing Block 2 */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">Trace</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                  <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Free Write Block */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">Write</span>
                <div className="w-12 h-12 rounded-lg border-2 border-solid border-white/5 flex items-center justify-center bg-white/1 print:border-black/10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Details (Only visible in Print) */}
      <div className="hidden print:block text-center mt-12 pt-4 border-t border-black/10 text-xs text-black/45">
        <p>© 2026 ArabFingers (www.arabfingers.site). Free to distribute for classroom and family use.</p>
      </div>

      <div className="print:hidden text-center py-8">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 Screen Time Ready? Open interactive Play Mode
        </Link>
      </div>
    </>
  );
}

function PrintablesAr() {
  return (
    <>
      {/* Print Instructions */}
      <div className="print:hidden rounded-2xl border border-accent/25 bg-accent/5 p-6 mb-8 text-center">
        <span className="text-4xl mb-2 block">🖨️✨</span>
        <h1 className="text-2xl font-bold text-white mb-2">أوراق عمل كتابة وتلوين الحروف العربية مجاناً</h1>
        <p className="text-xs text-white/60 leading-relaxed max-w-lg mx-auto">
          هل تبحث عن بدائل تعليمية خالية من الشاشات؟ قمنا ببناء كود طباعة تلقائي متكامل! ببساطة اضغط على{" "}
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-accent">Ctrl + P</kbd> (أو{" "}
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-accent">Cmd + P</kbd> على نظام الماك) في لوحة المفاتيح لطباعة كراسة كتابة وتلوين الحروف كاملة لطفلك فوراً!
        </p>
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.print();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-[#050816] shadow-[0_4px_16px_rgba(159,225,203,0.25)] hover:scale-105 transition cursor-pointer"
        >
          🖨️ اطبع كراسة الحروف الآن
        </button>
      </div>

      {/* Printable Area Header (Shown only on Print) */}
      <div className="hidden print:block text-black text-center mb-8 border-b border-black/10 pb-4" dir="rtl">
        <h1 className="text-3xl font-bold">كراسة كتابة الحروف — عرب فنجرز</h1>
        <p className="text-sm text-black/60 mt-1">أوراق عمل ممتازة لكتابة وتدريب نطق الحروف العربية للأطفال</p>
        <div className="mt-4 flex justify-between text-xs text-black/40">
          <span>الاسم: ________________________</span>
          <span>التاريخ: ________________________</span>
        </div>
      </div>

      {/* Grid of Letter-Tracing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6" dir="rtl">
        {arabicLetters.map((letter) => (
          <div
            key={letter.ar}
            className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
              <div>
                <span className="text-xs font-semibold text-accent print:text-black/60 uppercase">
                  حرف {letter.soundId}
                </span>
                <h3 className="text-lg font-bold text-white print:text-black mt-0.5">
                  {letter.arName} <span className="text-xs font-normal text-white/45 print:text-black/40">({letter.enName})</span>
                </h3>
              </div>
              <div className="text-4xl font-bold font-arabic text-accent print:text-black">
                {letter.ar}
              </div>
            </div>

            {/* Tracing Grid */}
            <div className="flex items-center justify-between gap-2 mt-2">
              {/* Dotted target guide */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">دليل</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center bg-white/2 print:bg-black/2 print:border-black/20">
                  <span className="text-3xl font-bold font-arabic text-white/25 print:text-black/25 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Tracing Block 1 */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">تتبع</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                  <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Tracing Block 2 */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">تتبع</span>
                <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                  <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">
                    {letter.ar}
                  </span>
                </div>
              </div>

              {/* Free Write Block */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">اكتب</span>
                <div className="w-12 h-12 rounded-lg border-2 border-solid border-white/5 flex items-center justify-center bg-white/1 print:border-black/10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Details (Only visible in Print) */}
      <div className="hidden print:block text-center mt-12 pt-4 border-t border-black/10 text-xs text-black/45" dir="rtl">
        <p>© 2026 عرب فنجرز (www.arabfingers.site). مرخص للتوزيع والاستخدام المدرسي والمنزلي مجاناً.</p>
      </div>

      <div className="print:hidden text-center py-8">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 جاهز للعب التفاعلي؟ افتح شاشة اللعب والتعلم
        </Link>
      </div>
    </>
  );
}
