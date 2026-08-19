import { localeCookieName, type Locale } from "@/i18n/config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function setLocaleCookie(locale: Locale): void {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}`;
}
