import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { PlaceholderImage } from "./PlaceholderImage";

type AboutSectionProps = {
  locale: Locale;
  dict: Dictionary["aboutSection"];
};

export function AboutSection({ locale, dict }: AboutSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {dict.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-4xl text-ink">{dict.title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
            {dict.paragraph}
          </p>
          <Link
            href={`/${locale}/about`}
            className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
          >
            {dict.cta}
          </Link>
        </div>
        <PlaceholderImage
          label="Schnitzy Haus"
          className="aspect-[16/10] w-full rounded-3xl"
        />
      </div>
    </section>
  );
}
