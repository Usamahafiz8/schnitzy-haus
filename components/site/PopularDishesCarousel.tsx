"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getPopularItems, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { PlaceholderImage } from "./PlaceholderImage";

type PopularDishesCarouselProps = {
  locale: Locale;
  dict: Dictionary["popularDishes"];
};

// The homepage's carousel-style "Our Most Popular Dishes" row — a distinct
// visual from MenuItemCard (used on /menu), so restyling this never touches
// the full menu grid. Still reads from the same data/menu.ts `popular` flag.
export function PopularDishesCarousel({ locale, dict }: PopularDishesCarouselProps) {
  const items = getPopularItems();
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-carousel-card]");
    const step = card ? card.offsetWidth + 24 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {dict.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-4xl text-ink">{dict.title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-border"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-surface transition-colors hover:bg-brand-dark"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-hide mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
      >
        {items.map((item, index) => (
          <CarouselCard
            key={item.id}
            item={item}
            locale={locale}
            addToCartLabel={dict.addToCart}
            tone={index % 2 === 0 ? "gold" : "white"}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={`/${locale}/menu`}
          className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
        >
          {dict.viewAll}
        </Link>
      </div>
    </section>
  );
}

function CarouselCard({
  item,
  locale,
  addToCartLabel,
  tone,
}: {
  item: MenuItem;
  locale: Locale;
  addToCartLabel: string;
  tone: "gold" | "white";
}) {
  const { addItem } = useCart();
  const [favorited, setFavorited] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article
      data-carousel-card
      className={`relative w-64 shrink-0 snap-start rounded-2xl p-5 shadow-sm sm:w-72 ${
        tone === "gold" ? "bg-gold" : "border border-border bg-surface"
      }`}
    >
      <button
        type="button"
        onClick={() => setFavorited((value) => !value)}
        aria-label="Favorite"
        aria-pressed={favorited}
        className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          favorited ? "bg-brand text-surface" : "bg-surface/70 text-brand"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.35-9.3-8.4C1 8.2 2.3 5 5.5 5c1.8 0 3.2 1 3.9 2.2C10.1 6 11.5 5 13.3 5c3.2 0 4.5 3.2 2.8 6.6C18.7 15.65 12 20 12 20z" />
        </svg>
      </button>

      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
        <PlaceholderImage label={item.name[locale]} className="h-full w-full" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <h3 className="truncate font-display text-lg text-ink">{item.name[locale]}</h3>
        <span className="whitespace-nowrap font-display text-lg text-ink">
          {formatPrice(item.priceCents, locale)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-10 flex-1 items-center justify-center rounded-full bg-brand text-sm font-semibold text-surface transition-colors hover:bg-brand-dark active:scale-95"
        >
          {justAdded ? "✓" : addToCartLabel}
        </button>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={addToCartLabel}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-brand hover:text-brand active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.75">
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
    </article>
  );
}
