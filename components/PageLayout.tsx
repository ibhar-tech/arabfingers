// Server component: no hooks or handlers here, and dropping the old
// "use client" keeps every page that renders this shell out of the client
// bundle boundary (SiteHeader/SiteFooter carry their own directives).
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ReadingAds } from "@/components/ReadingAds";

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

export function PageLayout({ locale, children, fullBleed = false }: PageLayoutProps) {
  const isAr = locale === "ar";

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

      <SiteHeader locale={locale} />

      {/* Content */}
      <main
        className={
          fullBleed
            ? "relative z-10 w-full flex-1"
            : "relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10"
        }
      >
        {children}
        {/* End-of-content ad slot. ReadingAds self-gates by route and renders
            nothing visible outside the parent-facing reading pages. */}
        <ReadingAds />
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
