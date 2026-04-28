import type { Metadata, Viewport } from "next";
import { Fredoka, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arabfingers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ArabFingers — لعبة الحروف العربية | Arabic Keyboard Smash Toy for Kids",
    template: "%s | ArabFingers",
  },
  description:
    "ArabFingers is a free bilingual Arabic & English keyboard smash toy for toddlers (1–6 yrs). Kids press any key to see animated Arabic letters with pronunciation, 3D floating objects, and confetti celebrations. عرب فنجرز — لعبة تعليمية ثنائية اللغة للأطفال لتعلم الحروف العربية والإنجليزية بالرسوم المتحركة والأصوات.",
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
    "ArabFingers",
    "عرب فنجرز",
    "baby keyboard",
    "kids educational game",
    "لعبة تعليمية",
    "Arabic for toddlers",
    "العربية للأطفال",
  ],
  manifest: "/manifest.json",
  applicationName: "ArabFingers",
  authors: [{ name: "ArabFingers" }],
  creator: "ArabFingers",
  publisher: "ArabFingers",
  category: "education",
  openGraph: {
    type: "website",
    siteName: "ArabFingers",
    title: "ArabFingers — لعبة الحروف العربية | Arabic Keyboard Smash Toy",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers. Animated letters, 3D objects, sound effects & 5 themes. لعبة مجانية ثنائية اللغة للأطفال.",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: siteUrl,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ArabFingers — Arabic Keyboard Smash Toy for Kids",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArabFingers — Arabic Keyboard Smash Toy for Kids",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers with 3D animations and letter pronunciation.",
    images: ["/og-image.svg"],
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
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": `${siteUrl}/en`,
      "ar": `${siteUrl}/ar`,
      "x-default": `${siteUrl}/en`,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "ArabFingers",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" dir="ltr">
      <head>
        {/* Google AdSense — replace ca-pub-XXXXXXX with your publisher ID after approval */}
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body className={`${fredoka.variable} ${ibmPlexArabic.variable} ${notoNaskhArabic.variable} antialiased`}>
        <StructuredData />
        {children}
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
