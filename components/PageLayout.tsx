"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

type PageLayoutProps = {
  locale: string;
  children: ReactNode;
};

const navLinks = [
  { href: "", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/play", labelEn: "▶ Play", labelAr: "▶ العب" },
  { href: "/coloring", labelEn: "🎨 Color", labelAr: "🎨 تلوين" },
  { href: "/learn", labelEn: "Learn", labelAr: "تعلم" },
  { href: "/printables", labelEn: "📄 Worksheets", labelAr: "📄 أوراق عمل" },
  { href: "/blog", labelEn: "Blog", labelAr: "المدونة" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/about", labelEn: "About", labelAr: "عن التطبيق" },
];

const footerLearnLinks = [
  { href: "/learn", labelEn: "All Guides", labelAr: "جميع الأدلة" },
  { href: "/learn/arabic-alphabet-guide", labelEn: "Alphabet Guide", labelAr: "دليل الأبجدية" },
  { href: "/learn/arabic-numbers", labelEn: "Numbers", labelAr: "الأرقام" },
  { href: "/learn/arabic-colors", labelEn: "Colors", labelAr: "الألوان" },
  { href: "/learn/first-arabic-words", labelEn: "First Words", labelAr: "كلمات" },
  { href: "/learn/arabic-letter-forms", labelEn: "Letter Forms", labelAr: "أشكال الحروف" },
  { href: "/learn/arabic-vs-english", labelEn: "Arabic vs English", labelAr: "عربي مقابل إنجليزي" },
  { href: "/learn/teaching-arabic-to-kids", labelEn: "For Parents", labelAr: "للوالدين" },
  { href: "/learn/best-age-to-learn-arabic", labelEn: "Best Age", labelAr: "أفضل عمر" },
  { href: "/learn/bilingual-children-benefits", labelEn: "Bilingual Benefits", labelAr: "فوائد ثنائية اللغة" },
  { href: "/learn/arabic-activities-at-home", labelEn: "Home Activities", labelAr: "أنشطة منزلية" },
];

const footerBlogLinks = [
  { href: "/blog", labelEn: "All Articles", labelAr: "جميع المقالات" },
  { href: "/blog/how-we-built-arabfingers", labelEn: "Our Story", labelAr: "قصتنا" },
  { href: "/blog/screen-time-guidelines-arabic-learning", labelEn: "Screen Time Guide", labelAr: "دليل وقت الشاشة" },
  { href: "/blog/arabic-calligraphy-for-kids", labelEn: "Arabic Calligraphy", labelAr: "الخط العربي" },
  { href: "/blog/ramadan-activities-arabic-learning", labelEn: "Ramadan Activities", labelAr: "أنشطة رمضان" },
];

const footerInfoLinks = [
  { href: "/about", labelEn: "About", labelAr: "عن التطبيق" },
  { href: "/printables", labelEn: "Worksheets", labelAr: "أوراق عمل" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

export function PageLayout({ locale, children }: PageLayoutProps) {
  const isAr = locale === "ar";
  const [menuOpen, setMenuOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState<Record<string, boolean>>({
    learn: false,
    blog: false,
    info: false,
  });

  const toggleFooterSection = (section: string) => {
    setFooterOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className="page-scrollable flex min-h-screen flex-col bg-[#050816] text-white/85"
      dir={isAr ? "rtl" : "ltr"}
      style={isAr ? { fontFamily: "var(--font-ibm-plex-arabic), sans-serif" } : undefined}
    >
      {/* Top nav */}
      <nav className="border-b border-white/8 bg-[#050816]/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href={`/${locale}`}
            className="shrink-0 text-base font-bold text-accent tracking-wide hover:scale-102 transition-transform"
          >
            ArabFingers
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white/50 transition hover:bg-white/8 hover:text-white/80"
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile slide-down menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#080d21] py-2 animate-fade-in shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-2.5 text-xs font-semibold text-white/60 hover:bg-white/5 hover:text-accent transition-colors"
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Content Area with spacious desktop padding */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/8 bg-[#050816] print:hidden">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Learn Column */}
            <div className="border-b border-white/5 md:border-none pb-4 md:pb-0">
              <button
                type="button"
                onClick={() => toggleFooterSection("learn")}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer"
              >
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "تعلم العربية" : "Learn Arabic"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.learn ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.learn ? "block" : "hidden"} md:block mt-3 md:mt-0 flex flex-col gap-2`}>
                {footerLearnLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/35 hover:text-white/60 transition"
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog Column */}
            <div className="border-b border-white/5 md:border-none pb-4 md:pb-0">
              <button
                type="button"
                onClick={() => toggleFooterSection("blog")}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer"
              >
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "المدونة" : "Blog"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.blog ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.blog ? "block" : "hidden"} md:block mt-3 md:mt-0 flex flex-col gap-2`}>
                {footerBlogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/35 hover:text-white/60 transition"
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                ))}
              </div>
            </div>

            {/* Info Column */}
            <div className="pb-2 md:pb-0">
              <button
                type="button"
                onClick={() => toggleFooterSection("info")}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer"
              >
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "معلومات" : "Info"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.info ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.info ? "block" : "hidden"} md:block mt-3 md:mt-0 flex flex-col gap-2`}>
                {footerInfoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/35 hover:text-white/60 transition"
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                ))}
              </div>
            </div>

          </div>
          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/20">
              © 2026 ArabFingers. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-xs text-white/15">
              {isAr ? "صُنع بـ ❤️ بواسطة Ibrahim" : "Made with ❤️ by Ibrahim"}
            </p>
          </div>
        </div>
      </footer>

      {/* Visual slide-down animation */}
      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
