"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { RotateCcw, Home } from "lucide-react";
import { useEffect } from "react";

/**
 * Route-segment error boundary. Client-only (Next requirement). Kept free of
 * any dependency on the crashed tree — no store reads, no layout chrome.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isAr = locale === "ar";

  // Surface the failure in the console so a bug report from a non-technical
  // parent still carries the stack; Next already strips it from the UI.
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="theme-warm flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center">
      <span className="breathe font-arabic-display text-8xl text-ink/15" aria-hidden>!</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {isAr ? "حدث خطأ ما" : "Something went wrong"}
      </h1>
      <p className="mt-3 max-w-md text-[15px] font-semibold leading-relaxed text-ink/65">
        {isAr
          ? "ليست مشكلة من عندك. أعد المحاولة، وإن استمرّ الخطأ فجرّب تحديث الصفحة."
          : "This is not your fault. Try again, or reload the page if it keeps happening."}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-chunky text-sm">
          <RotateCcw className="h-4 w-4" /> {isAr ? "حاول مجدداً" : "Try again"}
        </button>
        <Link href={`/${locale}`} className="btn-chunky btn-chunky-ghost text-sm">
          <Home className="h-4 w-4" /> {isAr ? "الرئيسية" : "Home"}
        </Link>
      </div>
    </div>
  );
}
