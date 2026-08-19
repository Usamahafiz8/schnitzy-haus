import Link from "next/link";
import { getPopularItems } from "@/data/menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { MenuItemCard } from "./MenuItemCard";

type PopularDishesProps = {
  locale: Locale;
  dict: Dictionary["popularDishes"];
  popularBadgeLabel: string;
};

export function PopularDishes({ locale, dict, popularBadgeLabel }: PopularDishesProps) {
  const items = getPopularItems();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {dict.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-4xl text-ink">{dict.title}</h2>
        </div>
        <Link
          href={`/${locale}/menu`}
          className="rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-surface"
        >
          {dict.viewAll}
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            locale={locale}
            addToCartLabel={dict.addToCart}
            popularBadgeLabel={popularBadgeLabel}
          />
        ))}
      </div>
    </section>
  );
}
