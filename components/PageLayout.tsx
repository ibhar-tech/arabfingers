"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
  { href: "/learn/states-of-matter", labelEn: "🧪 States of Matter", labelAr: "🧪 حالات المادة" },
  { href: "/learn/water-cycle", labelEn: "💧 Water Cycle", labelAr: "💧 دورة المياه" },
  { href: "/learn/solar-system", labelEn: "🚀 Solar System", labelAr: "🚀 النظام الشمسي" },
  { href: "/learn/gravity", labelEn: "🍎 Gravity", labelAr: "🍎 الجاذبية" },
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setFooterOpen({
        learn: true,
        blog: true,
        info: true,
      });
    }
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
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Learn Column */}
            <div className="bg-[#080d21]/60 border border-white/[0.04] backdrop-blur-md rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <button
                type="button"
                onClick={() => toggleFooterSection("learn")}
                className="w-full flex items-center justify-between text-start focus:outline-none cursor-pointer py-1 group"
              >
                <h3 className="text-xs font-bold text-white/90 group-hover:text-accent transition-colors uppercase tracking-wider">
                  {isAr ? "🧪 تعلم العربية والعلوم" : "🧪 Learn Arabic & Science"}
                </h3>
                <span className="text-white/40 group-hover:text-accent transition-colors">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${footerOpen.learn ? "rotate-180 text-accent" : ""}`} />
                </span>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${footerOpen.learn ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1">
                    {footerLearnLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${locale}${link.href}`}
                        className="group flex items-center gap-2 text-xs text-white/50 hover:text-accent transition-all duration-200 py-1 hover:ps-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/15 group-hover:bg-accent group-hover:scale-125 transition-all duration-200 shrink-0" />
                        <span className="truncate">{isAr ? link.labelAr : link.labelEn}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Column */}
            <div className="bg-[#080d21]/60 border border-white/[0.04] backdrop-blur-md rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <button
                type="button"
                onClick={() => toggleFooterSection("blog")}
                className="w-full flex items-center justify-between text-start focus:outline-none cursor-pointer py-1 group"
              >
                <h3 className="text-xs font-bold text-white/90 group-hover:text-accent transition-colors uppercase tracking-wider">
                  {isAr ? "✍️ المدونة والقصص" : "✍️ Blog & Stories"}
                </h3>
                <span className="text-white/40 group-hover:text-accent transition-colors">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${footerOpen.blog ? "rotate-180 text-accent" : ""}`} />
                </span>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${footerOpen.blog ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}>
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2 pt-1">
                    {footerBlogLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${locale}${link.href}`}
                        className="group flex items-center gap-2 text-xs text-white/50 hover:text-accent transition-all duration-200 py-1 hover:ps-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/15 group-hover:bg-accent group-hover:scale-125 transition-all duration-200 shrink-0" />
                        <span className="truncate">{isAr ? link.labelAr : link.labelEn}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="bg-[#080d21]/60 border border-white/[0.04] backdrop-blur-md rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <button
                type="button"
                onClick={() => toggleFooterSection("info")}
                className="w-full flex items-center justify-between text-start focus:outline-none cursor-pointer py-1 group"
              >
                <h3 className="text-xs font-bold text-white/90 group-hover:text-accent transition-colors uppercase tracking-wider">
                  {isAr ? "ℹ️ معلومات هامة" : "ℹ️ Important Info"}
                </h3>
                <span className="text-white/40 group-hover:text-accent transition-colors">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${footerOpen.info ? "rotate-180 text-accent" : ""}`} />
                </span>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${footerOpen.info ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}>
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2 pt-1">
                    {footerInfoLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${locale}${link.href}`}
                        className="group flex items-center gap-2 text-xs text-white/50 hover:text-accent transition-all duration-200 py-1 hover:ps-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white/15 group-hover:bg-accent group-hover:scale-125 transition-all duration-200 shrink-0" />
                        <span className="truncate">{isAr ? link.labelAr : link.labelEn}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © 2026 Arab Fingers. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
            <p className="text-xs text-white/45">
              {isAr ? "صُنع بـ ❤️ بواسطة " : "Made with ❤️ by "}
              <Link href={`/${locale}/author`} className="text-white/60 hover:text-accent transition-colors underline">
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
