"use client";

import { useEffect } from "react";
import type { AppLocale } from "@/lib/locales";

type LocaleDocumentSyncProps = {
  locale: AppLocale;
};

export function LocaleDocumentSync({ locale }: LocaleDocumentSyncProps) {
  useEffect(() => {
    const direction = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [locale]);

  return null;
}
