const SITE = "https://www.arabfingers.site";

/* Site-wide JSON-LD: who publishes the site, and the site itself. Rendered on
   every page by the locale layout, so it must hold only facts true of every
   page. Page-level types (FAQPage, Article, DigitalDocument, ItemList…) live
   on the pages whose visible content they describe — a site-wide FAQPage used
   to sit here, invisible on every page and doubling up each page's own FAQ. */
export function StructuredData() {
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "Arab Fingers",
    alternateName: "عرب فنجرز",
    description:
      "Free bilingual Arabic learning for children aged 1–6: printable Arabic alphabet worksheets (PDF), letter games with recorded pronunciation, illustrated stories and guides for parents.",
    url: SITE,
    inLanguage: ["en", "ar"],
    isAccessibleForFree: true,
    publisher: { "@id": `${SITE}/#organization` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE}/#organization`,
    name: "Arab Fingers",
    alternateName: "عرب فنجرز",
    url: SITE,
    logo: `${SITE}/icon-512.png`,
    description:
      "A free, open-source bilingual Arabic & English educational platform for children aged 1-6, featuring interactive letter games, science lessons, and printable worksheets.",
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      email: "ibhartech39@gmail.com",
      contactType: "customer support",
      availableLanguage: ["Arabic", "English"],
    },
    founder: {
      "@type": "Person",
      name: "IBHAR TECH LEARNING",
      url: "https://www.arabfingers.site/en/author",
    },
    sameAs: [
      "https://github.com/ibhar-tech/arabfingers",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
