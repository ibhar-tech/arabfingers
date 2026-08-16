import type { Metadata } from "next";
import { Amiri, Fredoka, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic, Baloo_2, Baloo_Bhaijaan_2, Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { StructuredData } from "@/components/StructuredData";
import { AdSenseLoader } from "@/components/AdSenseLoader";
import { isLocale, locales, type AppLocale } from "@/lib/locales";

import arMessages from "../../messages/ar.json";
import enMessages from "../../messages/en.json";
import { setRequestLocale } from "next-intl/server";

// Display + body faces for the warm "parchment & ink" redesign. Fredoka/IBM Plex
// Arabic/Noto Naskh stay as fallbacks and for the taught letterforms.
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
// Rounded, bubbly Arabic display face for kids — the Arabic match to Baloo 2.
const balooArabic = Baloo_Bhaijaan_2({ variable: "--font-baloo-arabic", subsets: ["arabic", "latin"], weight: ["500", "600", "700", "800"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});
// The face used for the letterforms a child is actually learning. Amiri is a proper
// Naskh with the stroke contrast and tooth shapes handwriting is taught from; Noto
// Naskh stays behind it as the fallback.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});
const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const allMessages: Record<AppLocale, Record<string, string>> = {
  ar: arMessages,
  en: enMessages,
};

const localeMetadata: Record<AppLocale, Metadata> = {
  en: {
    title: "Arabic Alphabet Game for Kids",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers (1–6 yrs). Animated letters, 3D objects, pronunciation & 5 themes.",
  },
  ar: {
    title: "لعبة الحروف العربية للأطفال",
    description:
      "لعبة مجانية ثنائية اللغة للأطفال من عمر ١ إلى ٦ سنوات. حروف متحركة، أشكال ثلاثية الأبعاد، نطق الحروف و٥ ثيمات مختلفة.",
  },
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return localeMetadata[locale];
}

const fontVars = `${baloo.variable} ${balooArabic.variable} ${nunito.variable} ${fredoka.variable} ${ibmPlexArabic.variable} ${notoNaskhArabic.variable} ${amiri.variable}`;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!isLocale(locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = allMessages[locale];

  return (
    <html suppressHydrationWarning lang={locale} dir={dir}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9623110963718326" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9623110963718326"
          crossOrigin="anonymous"
          data-privacy-treatments="disablePersonalization"
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof window.__pwaPrompt==="undefined"){window.__pwaPrompt=null;}window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__pwaPrompt=e});if("serviceWorker"in navigator){navigator.serviceWorker.register("/sw.js")}`,
          }}
        />
      </head>
      <body dir={dir} className={`${fontVars} antialiased`}>
        <StructuredData />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <AdSenseLoader />
      </body>
    </html>
  );
}
