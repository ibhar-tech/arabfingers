import Link from "next/link";
import type { ReactNode } from "react";

type PageLayoutProps = {
  locale: string;
  children: ReactNode;
};

const navLinks = [
  { href: "", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/play", labelEn: "▶ Play", labelAr: "▶ العب" },
  { href: "/learn/arabic-alphabet-guide", labelEn: "Learn", labelAr: "تعلم" },
  { href: "/about", labelEn: "About", labelAr: "عن التطبيق" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل" },
];

const footerLinks = [
  { href: "", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/play", labelEn: "Play", labelAr: "العب" },
  { href: "/learn/arabic-alphabet-guide", labelEn: "Alphabet Guide", labelAr: "دليل الأبجدية" },
  { href: "/learn/arabic-numbers", labelEn: "Numbers", labelAr: "الأرقام" },
  { href: "/learn/arabic-colors", labelEn: "Colors", labelAr: "الألوان" },
  { href: "/learn/first-arabic-words", labelEn: "First Words", labelAr: "كلمات" },
  { href: "/learn/teaching-arabic-to-kids", labelEn: "For Parents", labelAr: "للوالدين" },
  { href: "/about", labelEn: "About", labelAr: "عن التطبيق" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

export function PageLayout({ locale, children }: PageLayoutProps) {
  const isAr = locale === "ar";

  return (
    <div
      className="page-scrollable flex min-h-screen flex-col bg-[#050816] text-white/85"
      dir={isAr ? "rtl" : "ltr"}
      style={isAr ? { fontFamily: "var(--font-ibm-plex-arabic), sans-serif" } : undefined}
    >
      {/* Top nav */}
      <nav className="border-b border-white/8 bg-[#050816]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-2xl flex items-center gap-1 px-4 py-3">
          <Link
            href={`/${locale}`}
            className="shrink-0 text-sm font-semibold text-accent"
          >
            ArabFingers
          </Link>
          <span className="text-white/15 mx-2">|</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-white/50 transition hover:bg-white/8 hover:text-white/80"
            >
              {isAr ? link.labelAr : link.labelEn}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-6 sm:py-12">
        {children}
      </main>

      {/* Footer — always at bottom */}
      <footer className="mt-auto border-t border-white/8 bg-[#050816]">
        <div className="mx-auto max-w-2xl px-5 py-8 sm:px-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/35">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="hover:text-white/60 transition"
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/20">
            © 2026 ArabFingers. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
