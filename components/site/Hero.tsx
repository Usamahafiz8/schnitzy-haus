import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { PlaceholderImage } from "./PlaceholderImage";

type HeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
};

export function Hero({ locale, hero }: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl">
            {hero.titleLine1}
            <br />
            {hero.titleLine2} <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/${locale}/menu`}
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
            >
              {hero.ctaOrder}
            </Link>
            <Link
              href={`/${locale}/menu`}
              className="text-sm font-semibold text-ink transition-colors hover:text-brand"
            >
              {hero.ctaMenu} →
            </Link>
          </div>
        </div>
        <div className="relative">
          <PlaceholderImage
            label="Schnitzy Haus"
            className="aspect-[4/3] w-full rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
