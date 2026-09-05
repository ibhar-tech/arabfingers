import type { Metadata } from "next";
import { Amiri, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic, Baloo_2, Baloo_Bhaijaan_2, Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { StructuredData } from "@/components/StructuredData";
import { WebAnalytics } from "@/components/WebAnalytics";
import { isLocale, locales, type AppLocale } from "@/lib/locales";

import arMessages from "../../messages/ar.json";
import enMessages from "../../messages/en.json";
import { setRequestLocale } from "next-intl/server";

// Display + body faces for the warm "parchment & ink" redesign. IBM Plex Arabic and
// Noto Naskh stay as fallbacks and for the taught letterforms.
/* Font loading rules for this file, both learned from measurement:

   1. Ask for the VARIABLE file, not static instances. Passing a `weight` array to
      a variable family makes next/font download one woff2 per weight — Baloo 2 at
      four weights was four files where the variable font is one, covering every
      weight in between as well. Only Amiri and IBM Plex Arabic are genuinely
      static upstream, so they are the only two that still name weights.

   2. `preload` only the face that paints above the fold in the Latin UI. next/font
      preloads every family by default, which put 16 <link rel=preload as=font>
      tags and 659 KB in the <head> of BOTH locales — English readers were blocking
      on the Arabic faces and Arabic readers on the Latin ones. With preload:false
      the @font-face still ships, so the browser fetches the file only if rendered
      text actually uses it; a page with no Arabic on it now downloads no Arabic
      font at all. font-display:swap (already set on every declaration) covers the
      slightly later start for the faces that ARE used. */
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"] });
// Rounded, bubbly Arabic display face for kids — the Arabic match to Baloo 2.
const balooArabic = Baloo_Bhaijaan_2({ variable: "--font-baloo-arabic", subsets: ["arabic", "latin"], preload: false });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], preload: false });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});
// The face used for the letterforms a child is actually learning. Amiri is a proper
// Naskh with the stroke contrast and tooth shapes handwriting is taught from; Noto
// Naskh stays behind it as the fallback.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  // Regular only. The bold face was a second 98 KB download for display text that
  // is already large; Noto Naskh behind it in the stack covers any bold Arabic.
  weight: ["400"],
  preload: false,
});
const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  preload: false,
});

const allMessages: Record<AppLocale, Record<string, string>> = {
  ar: arMessages,
  en: enMessages,
};

const localeMetadata: Record<AppLocale, Metadata> = {
  en: {
    title: "Arabic Alphabet Game for Kids",
    description:
      "Free bilingual Arabic learning for children 1–6: parent guides, printable worksheets, and a letter game with recorded pronunciation.",
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

const fontVars = `${baloo.variable} ${balooArabic.variable} ${nunito.variable} ${ibmPlexArabic.variable} ${notoNaskhArabic.variable} ${amiri.variable}`;

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
        <WebAnalytics />
      </body>
    </html>
  );
}
