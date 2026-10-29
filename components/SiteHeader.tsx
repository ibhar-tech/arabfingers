"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { href: "", labelEn: "Explore", labelAr: "اكتشف" },
  { href: "/printables", labelEn: "Printables", labelAr: "أوراق عمل" },
  { href: "/games", labelEn: "Games", labelAr: "ألعاب" },
  { href: "/stories", labelEn: "Stories", labelAr: "قصص" },
  { href: "/learn", labelEn: "For parents", labelAr: "للأهل" },
];

export function SiteHeader({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const nextLocale = ar ? "en" : "ar";
  const nextPath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const publish = () => document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  function isActive(href: string) {
    return href ? pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`) : pathname === `/${locale}`;
  }

  return (
    <header ref={headerRef} className="site-header print:hidden" onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
    }}>
      <a href="#main-content" className="skip-link">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <nav className="site-navigation" aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}>
        <Link href={`/${locale}`} className="site-brand" aria-label={ar ? "عرب فنجرز — الرئيسية" : "Arab Fingers — home"}><span className="brand-mark" aria-hidden>أ<span>✦</span></span><span>{ar ? "عرب فنجرز" : "arab fingers"}<small>{ar ? "لنكبر بالعربية" : "little minds, big discoveries"}</small></span></Link>
        <div className="desktop-navigation">{NAV_LINKS.map((link) => <Link key={link.href} href={`/${locale}${link.href}`} aria-current={isActive(link.href) ? "page" : undefined}>{ar ? link.labelAr : link.labelEn}</Link>)}</div>
        <div className="nav-actions">
          <Link className="locale-link" href={nextPath} hrefLang={nextLocale} lang={nextLocale} aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}>{ar ? "English" : "العربية"}</Link>
          <Link className="nav-play" href={`/${locale}/games`}>{ar ? "لنلعب" : "Let's play"}<ArrowUpRight size={16} aria-hidden /></Link>
          <button ref={menuButtonRef} className="nav-menu" type="button" aria-label={ar ? "قائمة التنقل" : "Navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label={ar ? "قائمة الهاتف" : "Mobile navigation"}>{NAV_LINKS.map((link) => <Link key={link.href} href={`/${locale}${link.href}`} aria-current={isActive(link.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>{ar ? link.labelAr : link.labelEn}</Link>)}</nav>}
    </header>
  );
}
