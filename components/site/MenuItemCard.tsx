"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import type { MenuItem } from "@/data/menu";
import type { Locale } from "@/i18n/config";
import { PlaceholderImage } from "./PlaceholderImage";
import { StarRating } from "./StarRating";

type MenuItemCardProps = {
  item: MenuItem;
  locale: Locale;
  addToCartLabel: string;
  popularBadgeLabel: string;
};

export function MenuItemCard({
  item,
  locale,
  addToCartLabel,
  popularBadgeLabel,
}: MenuItemCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name[locale]}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <PlaceholderImage label={item.name[locale]} className="h-full w-full" />
        )}
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-surface shadow-sm">
            {popularBadgeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-ink">
            {item.name[locale]}
          </h3>
          <span className="whitespace-nowrap font-display text-lg text-ink">
            {formatPrice(item.priceCents, locale)}
          </span>
        </div>
        {item.rating && (
          <StarRating rating={item.rating} count={item.ratingCount} />
        )}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-semibold text-surface transition-colors hover:bg-brand-dark active:scale-95"
          >
            {justAdded ? "✓" : addToCartLabel}
          </button>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={addToCartLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-brand hover:text-brand active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5"
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
          </button>
        </div>
      </div>
    </article>
  );
}
