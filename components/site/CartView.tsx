"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { getMenuItem, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { PlaceholderImage } from "./PlaceholderImage";

type CartViewProps = {
  locale: Locale;
  dict: Dictionary["cartPage"];
};

export function CartView({ locale, dict }: CartViewProps) {
  const { items, updateQuantity, removeItem, updateNotes } = useCart();

  const resolved: { menuItemId: string; quantity: number; notes?: string; menuItem: MenuItem }[] = [];
  for (const cartItem of items) {
    const menuItem = getMenuItem(cartItem.menuItemId);
    if (menuItem) resolved.push({ ...cartItem, menuItem });
  }

  const subtotalCents = resolved.reduce(
    (sum, entry) => sum + entry.menuItem.priceCents * entry.quantity,
    0,
  );

  if (resolved.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-ink-muted">{dict.empty}</p>
        <Link
          href={`/${locale}/menu`}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
        >
          {dict.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <ul className="flex flex-col gap-4">
        {resolved.map((entry) => (
          <li
            key={entry.menuItemId}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              {entry.menuItem.image ? (
                <Image
                  src={entry.menuItem.image}
                  alt={entry.menuItem.name[locale]}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <PlaceholderImage label="" className="h-full w-full" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-ink">
                  {entry.menuItem.name[locale]}
                </h3>
                <button
                  type="button"
                  onClick={() => removeItem(entry.menuItemId)}
                  className="text-xs font-medium text-ink-muted hover:text-brand"
                >
                  {dict.remove}
                </button>
              </div>
              <p className="text-sm text-ink-muted">
                {formatPrice(entry.menuItem.priceCents, locale)}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-ink-muted">{dict.quantity}</span>
                <div className="flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => updateQuantity(entry.menuItemId, entry.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center text-ink hover:text-brand"
                    aria-label="-"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{entry.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(entry.menuItemId, entry.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center text-ink hover:text-brand"
                    aria-label="+"
                  >
                    +
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={entry.notes ?? ""}
                onChange={(event) => updateNotes(entry.menuItemId, event.target.value)}
                placeholder={dict.itemNote}
                className="mt-1 w-full rounded-lg border border-border bg-cream px-3 py-1.5 text-xs text-ink placeholder:text-ink-muted/70 focus:border-brand focus:outline-none"
              />
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between text-base font-semibold text-ink">
          <span>{dict.subtotal}</span>
          <span>{formatPrice(subtotalCents, locale)}</span>
        </div>
        <Link
          href={`/${locale}/checkout`}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
        >
          {dict.checkoutCta}
        </Link>
        <Link
          href={`/${locale}/menu`}
          className="mt-3 flex w-full items-center justify-center text-sm font-medium text-ink-muted hover:text-brand"
        >
          {dict.continueShopping}
        </Link>
      </aside>
    </div>
  );
}
