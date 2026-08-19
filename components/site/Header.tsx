"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function Header({ locale, nav }: HeaderProps) {
  const { totalItemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/menu`, label: nav.menu },
    { href: `/${locale}/reservations`, label: nav.reservations },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
    { href: `/${locale}/locations`, label: nav.locations },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150">
      {/* Dark-tinted glass (not cream) so the bar reads the same everywhere:
          blended into the dark PageHero on interior pages, and as a
          deliberate dark floating bar over the light homepage hero. Text
          stays light throughout instead of adapting per-page. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-surface"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2 2 10h3v10h5v-6h4v6h5V10h3z" />
              </svg>
            </span>
            <span className="font-display text-lg tracking-wide text-surface">
              SCHNITZY <span className="text-brand">HAUS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cream/75 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />

            <Link
              href={`/${locale}/menu`}
              aria-label={nav.search}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-surface hover:bg-white/10 sm:flex"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
                <path strokeLinecap="round" d="M20 20l-4.8-4.8" />
              </svg>
            </Link>

            <Link
              href={`/${locale}/cart`}
              aria-label={nav.cart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-surface hover:bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l2.2 12.2a2 2 0 002 1.8h7.6a2 2 0 002-1.8L20 7H6.2"
                />
                <circle cx="9.5" cy="20" r="1.3" />
                <circle cx="17.5" cy="20" r="1.3" />
              </svg>
              {totalItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-surface">
                  {totalItemCount}
                </span>
              )}
            </Link>

            <Link
              href={`/${locale}/menu`}
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark sm:inline-flex"
            >
              {nav.orderNow}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={nav.menu}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-surface hover:bg-white/10 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="flex flex-col gap-1 border-t border-white/15 bg-ink/60 py-3 backdrop-blur-xl lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-surface hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/menu`}
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-surface"
            >
              {nav.orderNow}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
