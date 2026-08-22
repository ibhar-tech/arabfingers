"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The single site navigation: sticky pill bar + mobile menu + locale switcher.
 * Shared by every page INCLUDING the homepage — the homepage used to carry its
 * own near-copy whose nav had drifted (it lacked the Resources link) and had to
 * be edited separately forever after.
 */
export const NAV_LINKS = [
  { href: "", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/printables", labelEn: "Worksheets", labelAr: "أوراق عمل" },
  { href: "/games", labelEn: "Games", labelAr: "ألعاب" },
  { href: "/learn", labelEn: "Learn", labelAr: "تعلّم" },
  { href: "/blog", labelEn: "Blog", labelAr: "المدونة" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/about", labelEn: "About", labelAr: "عن الموقع" },
];

export function SiteHeader({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  function switchLocale(nextLocale: "ar" | "en") {
    const nextPath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);
    router.replace(nextPath);
  }

  /* Full-bleed stages size themselves against the nav height; publish it as a
     custom property so e.g. /play can compute `100dvh - var(--header-h)`. */
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const publish = () =>
      document.documentElement.style.setProperty("--header-h", `${nav.offsetHeight}px`);

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-3 z-30 px-3 print:hidden">
      <nav
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-[2.5px] border-ink bg-card/90 px-4 py-2.5 backdrop-blur-md shadow-[0_4px_0_0_var(--ink)]"
        aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}
      >
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-arabic-display text-saffron">ا</span>
          Arab Fingers
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="rounded-full px-2.5 py-1.5 text-sm font-bold text-ink/65 transition hover:bg-saffron-soft hover:text-ink"
            >
              {isAr ? link.labelAr : link.labelEn}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-0.5 rounded-full border-2 border-ink p-0.5 text-xs font-bold sm:flex">
            <button
              onClick={() => switchLocale("ar")}
              aria-pressed={isAr}
              aria-label={isAr ? "العربية (الحالية)" : "التبديل إلى العربية"}
              className={`flex min-h-10 min-w-10 items-center justify-center rounded-full px-2.5 transition ${isAr ? "bg-ink text-card" : "text-ink/60"}`}
            >
              ع
            </button>
            <button
              onClick={() => switchLocale("en")}
              aria-pressed={!isAr}
              aria-label={isAr ? "Switch to English" : "English (current)"}
              className={`flex min-h-10 min-w-10 items-center justify-center rounded-full px-2.5 transition ${!isAr ? "bg-ink text-card" : "text-ink/60"}`}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border-[2.5px] border-ink bg-card p-3 shadow-[4px_4px_0_0_var(--ink)] lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-bold text-ink/80 hover:bg-saffron-soft"
            >
              {isAr ? link.labelAr : link.labelEn}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t-2 border-ink/10 px-3 pt-3 sm:hidden">
            <button onClick={() => { switchLocale("ar"); setMenuOpen(false); }} className={`min-h-11 rounded-full border-2 border-ink px-4 py-3 text-xs font-bold ${isAr ? "bg-ink text-card" : "text-ink"}`}>العربية</button>
            <button onClick={() => { switchLocale("en"); setMenuOpen(false); }} className={`min-h-11 rounded-full border-2 border-ink px-4 py-3 text-xs font-bold ${!isAr ? "bg-ink text-card" : "text-ink"}`}>English</button>
          </div>
        </div>
      )}
    </header>
  );
}
