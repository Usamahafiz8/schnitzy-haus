import { restaurant } from "@/data/restaurant";
import { formatCompactCount } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { StarRating } from "./StarRating";

type TestimonialsProps = {
  locale: Locale;
  dict: Dictionary["testimonials"];
};

export function Testimonials({ locale, dict }: TestimonialsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Decorative video placeholder — wire this up to a real video embed
            once one exists; the button is presentational only for now. */}
        <div
          className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 65%, rgba(238,168,47,0.35) 0%, rgba(204,32,39,0.28) 35%, rgba(36,23,18,0.95) 72%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-cream shadow-lg"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <h2 className="max-w-md font-display text-4xl leading-tight text-gold">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
            {dict.quote}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-3" aria-hidden="true">
              <span className="h-10 w-10 rounded-full border-2 border-surface bg-gold" />
              <span className="h-10 w-10 rounded-full border-2 border-surface bg-brand" />
              <span className="h-10 w-10 rounded-full border-2 border-surface bg-ink" />
            </div>
            <div>
              <p className="font-semibold text-ink">{dict.feedbackLabel}</p>
              <StarRating
                rating={restaurant.reviews.rating}
                suffix={`${formatCompactCount(restaurant.reviews.count, locale)} ${dict.reviewsSuffix}`}
                className="mt-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
