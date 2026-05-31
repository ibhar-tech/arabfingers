"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

const ThreeDBackground = dynamic(() => import("@/components/ThreeDBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#050816] print:hidden" />,
});


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
  { href: "/author", labelEn: "Author", labelAr: "المؤلف" },
  { href: "/printables", labelEn: "Worksheets", labelAr: "أوراق عمل" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

export function PageLayout({ locale, children }: PageLayoutProps) {
  const isAr = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();
  const setLocale = useAppStore((state) => state.setLocale);

  function switchLocale(nextLocale: "ar" | "en") {
    const nextPath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLocale}`);
    setLocale(nextLocale);
    router.replace(nextPath);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [load3D, setLoad3D] = useState(false);
  const [footerOpen, setFooterOpen] = useState<Record<string, boolean>>({
    learn: false,
    blog: false,
    info: false,
  });

  useEffect(() => {
    // Defer 3D canvas loading on mobile viewports to maximize performance rank and keep mobile battery consumption zero
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const handle = idleCallback(() => setLoad3D(true));
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  const toggleFooterSection = (section: string) => {
    setFooterOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className="page-scrollable relative flex min-h-screen flex-col bg-[#050816] text-white/85 overflow-x-hidden"
      dir={isAr ? "rtl" : "ltr"}
      style={isAr ? { fontFamily: "var(--font-ibm-plex-arabic), sans-serif" } : undefined}
    >
      {load3D ? (
        <ThreeDBackground subtle={true} className="z-[-10]" />
      ) : (
        <div className="fixed inset-0 z-[-10] bg-[#050816] print:hidden" />
      )}
      {/* Top nav */}
      <nav className="border-b border-white/8 bg-[#050816]/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href={`/${locale}`}
            className="shrink-0 flex items-center hover:scale-102 transition-transform"
          >
            <Image src="/logo.svg" alt="Arab Fingers Logo" width={151} height={36} priority className="h-9 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
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

            {/* Language Switcher (Desktop) */}
            <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => switchLocale("ar")}
                className={`rounded-lg px-2.5 py-0.5 transition cursor-pointer ${
                  isAr
                    ? "bg-accent text-[#050816] font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`rounded-lg px-2.5 py-0.5 transition cursor-pointer ${
                  !isAr
                    ? "bg-accent text-[#050816] font-bold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                EN
              </button>
            </div>
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
            
            {/* Language Switcher (Mobile) */}
            <div className="border-t border-white/5 mt-2 px-6 py-3 flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold text-white/50">
                {isAr ? "اللغة / Language" : "Language / اللغة"}
              </span>
              <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/5 p-0.5 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => { switchLocale("ar"); setMenuOpen(false); }}
                  className={`rounded-lg px-2.5 py-1 transition cursor-pointer ${
                    isAr
                      ? "bg-accent text-[#050816] font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => { switchLocale("en"); setMenuOpen(false); }}
                  className={`rounded-lg px-2.5 py-1 transition cursor-pointer ${
                    !isAr
                      ? "bg-accent text-[#050816] font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Content Area with spacious desktop padding */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/8 bg-[#050816] print:hidden relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Learn Column */}
            <div className="border-b border-white/5 md:border-none pb-4 md:pb-0">
              <button
                type="button"
                onClick={() => toggleFooterSection("learn")}
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer py-2.5"
              >
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "تعلم العربية" : "Learn Arabic"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.learn ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.learn ? "flex" : "hidden"} md:flex flex-col gap-3.5 mt-3 md:mt-0`}>
                {footerLearnLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/75 hover:text-accent transition-colors py-2 px-1 block"
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
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer py-2.5"
              >
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "المدونة" : "Blog"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.blog ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.blog ? "flex" : "hidden"} md:flex flex-col gap-3.5 mt-3 md:mt-0`}>
                {footerBlogLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/75 hover:text-accent transition-colors py-2 px-1 block"
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
                className="w-full flex items-center justify-between text-left md:pointer-events-none md:block focus:outline-none cursor-pointer py-2.5"
              >
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-0 md:mb-3">
                  {isAr ? "معلومات" : "Info"}
                </h3>
                <span className="md:hidden text-white/40">
                  {footerOpen.info ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              <div className={`${footerOpen.info ? "flex" : "hidden"} md:flex flex-col gap-3.5 mt-3 md:mt-0`}>
                {footerInfoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="text-xs text-white/75 hover:text-accent transition-colors py-2 px-1 block"
                  >
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                ))}
              </div>
            </div>

          </div>
          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-white/70">
              © 2026 Arab Fingers. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-xs text-white/65">
              {isAr ? "صُنع بـ ❤️ بواسطة " : "Made with ❤️ by "}
              <Link href={`/${locale}/author`} className="text-white/80 hover:text-accent transition-colors underline">
                Aissa Trad
              </Link>
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
