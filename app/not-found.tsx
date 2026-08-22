"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Root 404. In this app EVERY server-side 404 funnels here — unmatched paths
 * and notFound() thrown from matched dynamic segments alike all render through
 * Next's error shell, OUTSIDE the [locale] layout (which owns <html lang>).
 * So this boundary cannot rely on next-intl providers; it detects the language
 * from the URL instead and carries its own complete bilingual UI.
 */
export default function RootNotFound() {
  const pathname = usePathname() ?? "";
  const isAr = pathname.startsWith("/ar");

  const copy = isAr
    ? {
        title: "الصفحة غير موجودة",
        body: "ربما تغيّر الرابط أو حُذفت الصفحة. جرّب أحد هذه الطرق للرجوع:",
        home: "الرئيسية",
        navLabel: "روابط مفيدة",
      }
    : {
        title: "Page not found",
        body: "The link may have changed or the page was removed. Try one of these instead:",
        home: "Home",
        navLabel: "Helpful links",
      };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="theme-warm flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center">
      <span className="breathe font-arabic-display text-8xl text-ink/15" aria-hidden>ا</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">{copy.title}</h1>
      <p className="mt-3 max-w-md text-[15px] font-semibold leading-relaxed text-ink/65">{copy.body}</p>
      <nav aria-label={copy.navLabel} className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link href={`/${isAr ? "ar" : "en"}`} className="btn-chunky text-sm">{copy.home}</Link>
        {/* Always offer the other language explicitly — visitors can also land
            here from stale links with no locale prefix at all. */}
        <Link href={isAr ? "/en" : "/ar"} className="btn-chunky btn-chunky-ghost text-sm">
          {isAr ? "English" : "العربية"}
        </Link>
      </nav>
    </div>
  );
}
