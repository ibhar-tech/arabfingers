import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LocaleDocumentSync } from "@/components/LocaleDocumentSync";
import { isLocale, locales, type AppLocale } from "@/lib/locales";

import arMessages from "../../messages/ar.json";
import enMessages from "../../messages/en.json";

const allMessages: Record<AppLocale, Record<string, string>> = {
  ar: arMessages,
  en: enMessages,
};

const localeMetadata: Record<AppLocale, Metadata> = {
  en: {
    title: "ArabFingers — Arabic Keyboard Smash Toy for Kids",
    description:
      "Free bilingual Arabic & English keyboard smash toy for toddlers (1–6 yrs). Animated letters, 3D objects, pronunciation & 5 themes.",
  },
  ar: {
    title: "عرب فنجرز — لعبة الحروف العربية للأطفال",
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

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return localeMetadata[locale];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = allMessages[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleDocumentSync locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
