export const locales = ["ar", "en"] as const;

export type AppLocale = (typeof locales)[number];

export function isLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
