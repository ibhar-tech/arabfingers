"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Printer } from "lucide-react";

/**
 * 404 for known-locale routes. Client component because Next gives not-found
 * no params — the locale comes from the next-intl provider in [locale]/layout.
 */
export default function NotFound() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const pathname = usePathname();

  // A missing worksheet pack is the most likely way a visitor lands here
  // (renamed slugs, stale pins) — offer printables first, then home.
  const cameFromPrintables = pathname?.includes("/printables") ?? false;

  const links = [
    { href: `/${locale}${cameFromPrintables ? "/printables" : ""}`, label: isAr ? "أوراق العمل" : "Worksheets", icon: Printer },
    { href: `/${locale}/games`, label: isAr ? "الألعاب" : "Games", icon: Gamepad2 },
    { href: `/${locale}`, label: isAr ? "الرئيسية" : "Home", icon: Home },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="theme-warm flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center">
      <span className="breathe font-arabic-display text-8xl text-ink/15" aria-hidden>؟</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {isAr ? "هذه الصفحة غير موجودة" : "This page doesn't exist"}
      </h1>
      <p className="mt-3 max-w-md text-[15px] font-semibold leading-relaxed text-ink/65">
        {isAr
          ? "ربما تغيّر الرابط أو حُذفت الصفحة. جرّب أحد هذه الطرق للرجوع:"
          : "The link may have changed or the page was removed. Try one of these instead:"}
      </p>
      <nav aria-label={isAr ? "روابط مفيدة" : "Helpful links"} className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="btn-chunky text-sm">
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
