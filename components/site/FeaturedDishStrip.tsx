import Link from "next/link";
import { getMenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import { PlaceholderImage } from "./PlaceholderImage";

type FeaturedDishStripProps = {
  locale: Locale;
};

// The three dish "spotlight" cards directly under the hero image. Deliberately
// curated (not `getPopularItems()`) so this strip always shows one of each
// kind of dish — pull from data/menu.ts, so swap the ids below to feature
// something else.
const FEATURED_IDS = ["schnitzy-bowl", "beef-burger", "schnitzel-burger"];

export function FeaturedDishStrip({ locale }: FeaturedDishStripProps) {
  const items = FEATURED_IDS.map(getMenuItem).filter((item) => item !== undefined);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`/${locale}/menu`}
            className={`flex items-center gap-4 rounded-2xl p-4 shadow-sm transition-transform hover:-translate-y-0.5 ${
              index % 2 === 0 ? "bg-brand" : "bg-gold"
            }`}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- tiny thumbnail, not worth next/image config here
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlaceholderImage label="" className="h-full w-full" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-display text-base text-cream">
                {item.name[locale]}
              </h3>
              {item.rating && (
                <div className="mt-1 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <svg
                      key={starIndex}
                      viewBox="0 0 20 20"
                      className={`h-3 w-3 ${
                        starIndex < Math.round(item.rating!)
                          ? "fill-cream"
                          : "fill-cream/30"
                      }`}
                    >
                      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
                    </svg>
                  ))}
                </div>
              )}
              <p className="mt-1 font-display text-lg text-cream">
                {formatPrice(item.priceCents, locale)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
