type LessonStructuredDataProps = {
  locale: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  slug: string;
  durationMinutes: number;
  datePublished: string;
  /** Full transcript text for the lesson (plain text, used for accessibilityFeature) */
  transcriptText?: string;
};

/**
 * Emits LearningResource + VideoObject JSON-LD for interactive science lessons.
 * This enables rich search results with duration, educational level, and audience info.
 */
export function LessonStructuredData({
  locale,
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  slug,
  durationMinutes,
  datePublished,
  transcriptText,
}: LessonStructuredDataProps) {
  const siteUrl = "https://www.arabfingers.site";
  const isAr = locale === "ar";
  const title = isAr ? titleAr : titleEn;
  const description = isAr ? descriptionAr : descriptionEn;
  const url = `${siteUrl}/${locale}/learn/${slug}`;

  // ISO 8601 duration
  const isoDuration = `PT${durationMinutes}M`;

  const learningResource = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description,
    url,
    inLanguage: isAr ? "ar" : "en",
    learningResourceType: "Interactive lesson",
    educationalLevel: "Preschool",
    educationalUse: "Self-study",
    interactivityType: "active",
    isAccessibleForFree: true,
    timeRequired: isoDuration,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Children",
      suggestedMinAge: 3,
      suggestedMaxAge: 8,
    },
    author: {
      "@type": "Person",
      name: "Aissa Trad",
      url: `${siteUrl}/${locale}/author`,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: "Arab Fingers",
      url: siteUrl,
    },
    datePublished,
    ...(transcriptText && { text: transcriptText }),
    teaches: [
      isAr ? "العلوم للأطفال" : "Science for kids",
      isAr ? "اللغة العربية" : "Arabic language",
    ],
    assesses: isAr ? "فهم المفاهيم العلمية" : "Understanding science concepts",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
    />
  );
}
