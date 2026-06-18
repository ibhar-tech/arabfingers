import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  locale: string;
  crumbs: Crumb[];
};

export function Breadcrumbs({ locale, crumbs }: BreadcrumbsProps) {
  const isAr = locale === "ar";
  const home: Crumb = { label: isAr ? "الرئيسية" : "Home", href: `/${locale}` };
  const allCrumbs = [home, ...crumbs];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `https://www.arabfingers.site${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-ink/45">
        <ol className="flex flex-wrap items-center gap-1">
          {allCrumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1">{isAr ? "›" : "›"}</span>}
              {crumb.href && i < allCrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-qalam transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-ink/70">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
