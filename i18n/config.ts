// Single source of truth for supported locales. Add a locale by: adding it
// here, adding a matching file in `i18n/dictionaries/`, and TypeScript will
// point out anywhere else that needs updating (the Dictionary type keeps
// every locale's copy in sync).
export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeCookieName = "NEXT_LOCALE";

export const localeLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
