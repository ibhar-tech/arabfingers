export function StructuredData() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Arab Fingers",
    alternateName: "عرب فنجرز",
    description:
      "A free bilingual Arabic and English keyboard smash toy for toddlers with 3D animations, letter pronunciation, and themed experiences.",
    url: "https://www.arabfingers.site",
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
    inLanguage: ["ar", "en"],
    isAccessibleForFree: true,
    keywords:
      "Arabic letters, حروف عربية, kids keyboard, لعبة أطفال, bilingual, ثنائي اللغة, toddler, educational",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arab Fingers",
    url: "https://www.arabfingers.site",
    contactPoint: {
      "@type": "ContactPoint",
      email: "ibhartech39@gmail.com",
      contactType: "customer support",
    },
    founder: {
      "@type": "Person",
      name: "Aissa Trad",
      url: "https://www.arabfingers.site/en/author",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What age is Arab Fingers for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arab Fingers is designed for children aged 1 to 6 years old. Toddlers (1-3) enjoy the sensory experience of seeing letters and hearing sounds, while pre-schoolers (4-6) begin to recognize and name the letters.",
        },
      },
      {
        "@type": "Question",
        name: "Is Arab Fingers free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Arab Fingers is completely free to use. There are no in-app purchases, no subscriptions, and no premium features. The app is open-source.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work on tablets and phones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Arab Fingers works on any device with a web browser — tablets, phones, laptops, and desktops. You can also install it as an app for offline use.",
        },
      },
      {
        "@type": "Question",
        name: "Does my child need to know Arabic already?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not at all. Arab Fingers is designed for complete beginners. Children learn through exposure — seeing the letter shapes and hearing the sounds repeatedly during play.",
        },
      },
      {
        "@type": "Question",
        name: "Is it safe for children?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Arab Fingers collects zero personal data, has no ads in the play area, no external links children can click, and the parent panel is protected by a hold gesture and optional PIN lock.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use it offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Install Arab Fingers as a PWA (Progressive Web App) and it works without an internet connection. All letter sounds are pre-loaded.",
        },
      },
      {
        "@type": "Question",
        name: "What keyboard layouts are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arab Fingers supports Arabic Standard (QWERTY), Phonetic (intuitive A→ا mapping), and AZERTY layouts. Parents can switch layouts from the settings panel.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
