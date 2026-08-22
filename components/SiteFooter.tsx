"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
  { href: "/glossary", labelEn: "Arabic Word List", labelAr: "قائمة الكلمات" },
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

// Exported so any page can render the same info links (contact/privacy/terms
// must stay reachable everywhere — ad-network and search reviewers check this).
export const footerInfoLinks = [
  { href: "/about", labelEn: "About", labelAr: "عن الموقع" },
  { href: "/author", labelEn: "Author", labelAr: "المؤلف" },
  { href: "/resources", labelEn: "Resources", labelAr: "المصادر" },
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

/**
 * The single site footer. The homepage previously shipped a second, simpler
 * footer whose link set had drifted; now every route shares this one.
 */
export function SiteFooter({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  // Columns start open on desktop, collapsed on mobile — measured after mount
  // so SSR renders the mobile default and hydration doesn't fight it.
  const [footerOpen, setFooterOpen] = useState<Record<string, boolean>>({
    play: false,
    learn: false,
    blog: false,
    info: false,
  });
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
    <footer className="relative z-10 mt-auto border-t-[2.5px] border-ink bg-card print:hidden">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {footerCols.map((col) => (
            <div key={col.key} className="card-stock card-stock-saffron p-5">
              <button
                type="button"
                onClick={() => toggleFooterSection(col.key)}
                aria-expanded={footerOpen[col.key]}
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
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1" aria-label={isAr ? "روابط مهمة" : "Important links"}>
            {footerInfoLinks
              .filter((l) => ["/contact", "/privacy", "/terms"].includes(l.href))
              .map((l) => (
                <Link key={l.href} href={`/${locale}${l.href}`} className="text-sm font-semibold text-ink/50 transition hover:text-qalam">
                  {isAr ? l.labelAr : l.labelEn}
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
