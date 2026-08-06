import type { Metadata, Viewport } from "next";
import "./globals.css";

// Force the canonical www host even if NEXT_PUBLIC_SITE_URL is set to the bare
// apex on Vercel — the apex 307-redirects, so emitting it in canonical/OG tags
// makes Google ignore our canonical. Pages set their own per-locale canonical
// via lib/seo.ts; this is only the metadataBase + global defaults.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arabfingers.site").replace(
  "://arabfingers.site",
  "://www.arabfingers.site",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arab Fingers — Arabic Alphabet Game for Kids",
    template: "%s | Arab Fingers",
  },
  description:
    "Arab Fingers is a free bilingual Arabic & English keyboard smash toy for toddlers (1–6 yrs). Kids press any key to see animated Arabic letters with pronunciation, 3D floating objects, and confetti celebrations. عرب فنجرز — لعبة تعليمية ثنائية اللغة للأطفال لتعلم الحروف العربية والإنجليزية بالرسوم المتحركة والأصوات.",
  keywords: [
    "Arabic letters for kids",
    "حروف عربية للأطفال",
    "keyboard smash toy",
    "لعبة لوحة المفاتيح",
    "bilingual kids app",
    "تطبيق ثنائي اللغة للأطفال",
    "learn Arabic alphabet",
    "تعلم الأبجدية العربية",
    "toddler keyboard game",
    "لعبة أطفال تعليمية",
    "Arabic English letters",
    "Arab Fingers",
    "عرب فنجرز",
    "baby keyboard",
    "kids educational game",
    "لعبة تعليمية",
    "Arabic for toddlers",
    "العربية للأطفال",
  ],
  applicationName: "Arab Fingers",
  authors: [{ name: "Aissa Trad", url: "https://www.arabfingers.site/en/author" }],
  creator: "Aissa Trad",
  publisher: "Arab Fingers",
  category: "education",
  openGraph: {
    type: "website",
    siteName: "Arab Fingers",
    title: "Arab Fingers — Arabic Alphabet Game for Kids",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers. Animated letters, 3D objects, sound effects & 5 themes. لعبة مجانية ثنائية اللغة للأطفال.",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arab Fingers — Arabic Keyboard Smash Toy for Kids",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arab Fingers — Arabic Alphabet Game for Kids",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers with 3D animations and letter pronunciation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    // SVG first for browsers that take it, PNG behind for those that don't.
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    // iOS ignores SVG icons outright — pointing this at icon.svg is why Add to
    // Home Screen was falling back to a screenshot of the page instead of the
    // logo. 180x180 PNG, flattened (iOS does not honour alpha).
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Arab Fingers",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF7EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// ponytail: the <html>/<body> shell lives in app/[locale]/layout.tsx so lang/dir
// are set per-locale in the server HTML (Googlebot needs lang="ar" dir="rtl" for
// the Arabic half). The root layout only carries global metadata + passes through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
