"use client";

import Link from "next/link";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

type PageLayoutProps = {
  locale: string;
  children: ReactNode;
  /**
   * Drops the centred, padded <main> so a full-width interactive stage (the
   * /play toy, the /coloring canvas) can bleed edge to edge while still getting
   * the site header and footer. Without this those pages render as orphans with
   * no navigation, which reads as an unfinished site to crawlers and visitors.
   */
  fullBleed?: boolean;
};

// /play and /coloring are activities inside /games — listing them here too made the
// header read like three separate game sections. They stay linked from the hub and
// the footer, so nothing is orphaned.
const navLinks = [
  { href: "", labelEn: "Home", labelAr: "الرئيسية" },
  { href: "/games", labelEn: "Games", labelAr: "ألعاب" },
  { href: "/learn", labelEn: "Learn", labelAr: "تعلّم" },
  { href: "/printables", labelEn: "Worksheets", labelAr: "أوراق عمل" },
  { href: "/blog", labelEn: "Blog", labelAr: "المدونة" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/about", labelEn: "About", labelAr: "عن الموقع" },
];

const footerPlayLinks = [
  { href: "/games", labelEn: "All Games", labelAr: "كل الألعاب" },
  { href: "/games/trace", labelEn: "Trace Letters", labelAr: "تتبّع الحروف" },
  { href: "/games/tap", labelEn: "Tap the Letter", labelAr: "انقر الحرف" },
  { href: "/coloring", labelEn: "Coloring", labelAr: "التلوين" },
  { href: "/play", labelEn: "Free Play", labelAr: "لعب حر" },
  { href: "/printables", labelEn: "Worksheets", labelAr: "أوراق عمل" },
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

// Worksheets lives in the Play column; repeating it here gave the same page two
// footer entries under two different headings.
const footerInfoLinks = [
  { href: "/about", labelEn: "About", labelAr: "عن الموقع" },
  { href: "/author", labelEn: "Author", labelAr: "المؤلف" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

export function PageLayout({ locale, children, fullBleed = false }: PageLayoutProps) {
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
  const [footerOpen, setFooterOpen] = useState<Record<string, boolean>>({ play: false, learn: false, blog: false, info: false });

  /* The nav sits in flow, so a full-bleed stage sized `100dvh` overshoots the
     viewport by exactly the nav's height and pushes its own bottom controls (the
     on-screen letter bar) below the fold. Publish the measured height so those
     stages can size themselves against it. */
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setFooterOpen({ play: true, learn: true, blog: true, info: true });
    }
  }, []);

  const toggleFooterSection = (section: string) =>
    setFooterOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  const footerCols: { key: string; title: string; links: typeof footerLearnLinks }[] = [
    { key: "play", title: isAr ? "العب" : "Play", links: footerPlayLinks },
    { key: "learn", title: isAr ? "تعلّم العربية" : "Learn Arabic", links: footerLearnLinks },
    { key: "blog", title: isAr ? "المدونة والقصص" : "Blog & Stories", links: footerBlogLinks },
    { key: "info", title: isAr ? "معلومات" : "Important Info", links: footerInfoLinks },
  ];

  return (
    <div
      className="theme-warm site-warm page-scrollable relative flex min-h-dvh flex-col overflow-x-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* soft ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
        <div className="absolute -top-20 -start-16 h-80 w-80 rounded-full bg-saffron/20 blur-[100px]" />
        <div className="absolute top-1/3 -end-20 h-96 w-96 rounded-full bg-violet/15 blur-[110px]" />
        <div className="absolute bottom-0 start-1/3 h-72 w-72 rounded-full bg-qalam/12 blur-[100px]" />
      </div>

      {/* Top nav — warm pill */}
      <header className="sticky top-3 z-30 px-3 print:hidden">
        <nav
          ref={navRef}
          className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-[2.5px] border-ink bg-card/90 px-4 py-2.5 backdrop-blur-md shadow-[0_4px_0_0_var(--ink)]"
        >
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-arabic-display text-saffron">ا</span>
            Arab Fingers
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
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
                className={`flex min-h-10 min-w-10 items-center justify-center rounded-full px-2.5 transition ${isAr ? "bg-ink text-card" : "text-ink/60"}`}
              >
                ع
              </button>
              <button
                onClick={() => switchLocale("en")}
                aria-pressed={!isAr}
                className={`flex min-h-10 min-w-10 items-center justify-center rounded-full px-2.5 transition ${!isAr ? "bg-ink text-card" : "text-ink/60"}`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-3xl border-[2.5px] border-ink bg-card p-3 shadow-[4px_4px_0_0_var(--ink)] lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-bold text-ink/80 hover:bg-saffron-soft"
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t-2 border-ink/10 px-3 pt-3">
              <button onClick={() => { switchLocale("ar"); setMenuOpen(false); }} className={`rounded-full border-2 border-ink px-4 py-3 text-xs font-bold ${isAr ? "bg-ink text-card" : "text-ink"}`}>العربية</button>
              <button onClick={() => { switchLocale("en"); setMenuOpen(false); }} className={`rounded-full border-2 border-ink px-4 py-3 text-xs font-bold ${!isAr ? "bg-ink text-card" : "text-ink"}`}>English</button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main
        className={
          fullBleed
            ? "relative z-10 w-full flex-1"
            : "relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10"
        }
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t-[2.5px] border-ink bg-card print:hidden">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {footerCols.map((col) => (
              <div key={col.key} className="card-stock card-stock-saffron p-5">
                <button
                  type="button"
                  onClick={() => toggleFooterSection(col.key)}
                  className="group flex min-h-11 w-full items-center justify-between py-3 text-start"
                >
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">{col.title}</h3>
                  <ChevronDown className={`h-4 w-4 text-ink/50 transition-transform duration-300 ${footerOpen[col.key] ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${footerOpen[col.key] ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-0.5 pt-1 sm:grid-cols-2">
                      {col.links.map((link) => (
                        <Link
                          key={link.href}
                          href={`/${locale}${link.href}`}
                          className="flex min-h-11 items-center truncate py-2 text-sm font-semibold text-ink/60 transition hover:text-qalam"
                        >
                          {isAr ? link.labelAr : link.labelEn}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t-2 border-ink/10 pt-5 sm:flex-row">
            <p className="text-sm font-semibold text-ink/50">© 2026 Arab Fingers. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
            <p className="text-sm font-semibold text-ink/50">
              {isAr ? "صُنع بـ ❤️ بواسطة " : "Made with ❤️ by "}
              <Link href={`/${locale}/author`} className="text-ink/70 underline hover:text-qalam">Aissa Trad</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
