import type { Locale } from "@/i18n/config";

export function formatPrice(cents: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Simple, deterministic "18.6k" style abbreviation for large review counts —
// deliberately not Intl compact-notation, since its output isn't consistent
// enough across locales to rely on for a fixed design like the testimonial
// section. Swaps in the German decimal comma for the `de` locale.
export function formatCompactCount(count: number, locale: Locale): string {
  const value = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  return locale === "de" ? value.replace(".", ",") : value;
}

export function formatDateTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
