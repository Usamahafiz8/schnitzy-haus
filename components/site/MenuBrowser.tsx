"use client";

import { useMemo, useState } from "react";
import { menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { MenuItemCard } from "./MenuItemCard";

type MenuBrowserProps = {
  locale: Locale;
  dict: Dictionary["menuPage"];
};

export function MenuBrowser({ locale, dict }: MenuBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MenuCategoryId | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        needle.length === 0 ||
        item.name[locale].toLowerCase().includes(needle) ||
        item.description[locale].toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, locale]);

  return (
    <div>
      {/* Segmented control — all tabs live inside one bordered, tinted
          track; the active tab gets a solid white chip that slides
          between options. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label={dict.allCategories}
          className="scrollbar-hide inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border border-border bg-border/35 p-1"
        >
          <CategoryTab active={category === "all"} onClick={() => setCategory("all")}>
            {dict.allCategories}
          </CategoryTab>
          {menuCategories.map((cat) => (
            <CategoryTab
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label[locale]}
            </CategoryTab>
          ))}
        </div>

        <div className="relative w-full sm:w-64 sm:shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" strokeLinecap="round" />
            <path strokeLinecap="round" d="M20 20l-4.8-4.8" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink-muted">{dict.noResults}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              locale={locale}
              addToCartLabel={dict.addToCart}
              popularBadgeLabel={dict.popularBadge}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-surface text-brand shadow-sm"
          : "text-ink-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
