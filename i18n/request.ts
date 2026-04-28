import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { locales, type AppLocale } from "@/lib/locales";

import arMessages from "../messages/ar.json";
import enMessages from "../messages/en.json";

const allMessages: Record<AppLocale, Record<string, string>> = {
  ar: arMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : "en";

  return {
    locale,
    messages: allMessages[locale as AppLocale] ?? allMessages.en,
  };
});
