import type { Locale } from "./config";
import type { Dictionary } from "./types";

// Server-only: called from Server Components (layout/page) so each locale's
// copy is code-split rather than bundled together.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("./dictionaries/de").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
