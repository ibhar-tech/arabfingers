export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ArabFingers",
    alternateName: "عرب فنجرز",
    description:
      "A free bilingual Arabic and English keyboard smash toy for toddlers with 3D animations, letter pronunciation, and themed experiences.",
    url: "https://arabfingers.com",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript, WebGL",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      suggestedMinAge: 1,
      suggestedMaxAge: 6,
    },
    inLanguage: ["ar", "en", "fr"],
    isAccessibleForFree: true,
    keywords:
      "Arabic letters, حروف عربية, kids keyboard, لعبة أطفال, bilingual, ثنائي اللغة, toddler, educational",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
