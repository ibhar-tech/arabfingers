type ArticleStructuredDataProps = {
  title: string;
  description: string;
  slug: string;
  locale: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
};

export function ArticleStructuredData({
  title,
  description,
  slug,
  locale,
  datePublished,
  dateModified,
  section = "Education",
}: ArticleStructuredDataProps) {
  const siteUrl = "https://www.arabfingers.site";

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}/${locale}/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: "Ibrahim",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ArabFingers",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/${slug}`,
    },
    inLanguage: locale === "ar" ? "ar" : "en",
    articleSection: section,
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}
