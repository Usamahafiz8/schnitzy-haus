"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { getMenuItem, type MenuItem } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { submitOrder } from "@/lib/actions/orders";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type CheckoutFormProps = {
  locale: Locale;
  dict: Dictionary["checkoutPage"];
};

type PickupSlot = { value: string; label: string };

function buildPickupSlots(locale: Locale): PickupSlot[] {
  const {
    openHour,
    closeHour,
    pickupLeadTimeMinutes,
    pickupSlotIntervalMinutes,
  } = restaurant.operations;

  const earliest = new Date(Date.now() + pickupLeadTimeMinutes * 60_000);
  const roundedMinutes =
    Math.ceil(earliest.getMinutes() / pickupSlotIntervalMinutes) *
    pickupSlotIntervalMinutes;

  let cursor = new Date(earliest);
  cursor.setMinutes(0, 0, 0);
  cursor = new Date(cursor.getTime() + roundedMinutes * 60_000);

  const withinHours = cursor.getHours() >= openHour && cursor.getHours() < closeHour;
  if (!withinHours) {
    if (cursor.getHours() >= closeHour) {
      cursor.setDate(cursor.getDate() + 1);
    }
    cursor.setHours(openHour, 0, 0, 0);
  }

  const closingTime = new Date(cursor);
  closingTime.setHours(closeHour, 0, 0, 0);

  const formatter = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const slots: PickupSlot[] = [];
  while (cursor <= closingTime && slots.length < 24) {
    slots.push({ value: cursor.toISOString(), label: formatter.format(cursor) });
    cursor = new Date(cursor.getTime() + pickupSlotIntervalMinutes * 60_000);
  }

  return slots;
}

export function CheckoutForm({ locale, dict }: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const slots = useMemo(() => buildPickupSlots(locale), [locale]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupTime, setPickupTime] = useState(slots[0]?.value ?? "");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedItems: { menuItemId: string; quantity: number; menuItem: MenuItem }[] = [];
  for (const item of items) {
    const menuItem = getMenuItem(item.menuItemId);
    if (menuItem) {
      resolvedItems.push({ menuItemId: item.menuItemId, quantity: item.quantity, menuItem });
    }
  }
  const totalCents = resolvedItems.reduce(
    (sum, entry) => sum + entry.menuItem.priceCents * entry.quantity,
    0,
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await submitOrder({
      customerName: name,
      phone,
      email,
      pickupTime,
      notes,
      locale,
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        notes: item.notes,
      })),
    });

    if (result.status !== "success") {
      // "idle" is unreachable in practice — submitOrder always resolves to
      // "error" or "success" — but TypeScript doesn't know that from the
      // return type alone.
      setError(result.status === "error" ? result.message : "Please try again.");
      setPending(false);
      return;
    }

    clearCart();
    router.push(`/${locale}/order/${result.orderNumber}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-5">
        <Field label={dict.name} required>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={dict.phone} required>
          <input
            required
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={dict.email} required>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={dict.pickupTime} hint={dict.pickupHint} required>
          <select
            required
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
            className={inputClass}
          >
            {slots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.notes}>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={dict.notesPlaceholder}
            rows={3}
            className={inputClass}
          />
        </Field>
      </div>

      <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-semibold text-ink">{dict.yourOrder}</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {resolvedItems.map((entry) => (
            <li key={entry.menuItemId} className="flex justify-between text-ink-muted">
              <span>
                {entry.quantity}× {entry.menuItem.name[locale]}
              </span>
              <span>{formatPrice(entry.menuItem.priceCents * entry.quantity, locale)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-ink">
          <span>{dict.total}</span>
          <span>{formatPrice(totalCents, locale)}</span>
        </div>
        <p className="mt-3 text-xs text-ink-muted">{dict.payAtPickup}</p>
        {error && <p className="mt-3 text-sm text-brand">{error}</p>}
        <button
          type="submit"
          disabled={pending || items.length === 0}
          className="mt-5 flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? dict.submitting : dict.submit}
        </button>
      </aside>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus:border-brand focus:outline-none";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </label>
  );
}
