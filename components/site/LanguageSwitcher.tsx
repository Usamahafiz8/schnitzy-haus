"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { setLocaleCookie } from "@/lib/set-locale-cookie";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const rest = pathname.split("/").slice(2).join("/");
    setLocaleCookie(next);
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div className="flex items-center rounded-full border border-border bg-cream p-0.5 text-xs font-semibold">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-current={code === locale}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            code === locale
              ? "bg-brand text-surface"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
