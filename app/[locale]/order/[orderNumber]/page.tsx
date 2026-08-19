import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { formatDateTime, formatPrice } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type OrderConfirmationPageProps = {
  params: Promise<{ locale: string; orderNumber: string }>;
};

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { locale, orderNumber } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-4xl text-ink">
        {dict.orderConfirmation.title}
      </h1>
      <p className="mt-2 text-ink-muted">{dict.orderConfirmation.thankYou}</p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">
            {dict.orderConfirmation.orderNumberLabel}
          </span>
          <span className="font-display text-xl text-brand">{order.orderNumber}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-ink-muted">
            {dict.orderConfirmation.pickupTimeLabel}
          </span>
          <span className="font-semibold text-ink">
            {formatDateTime(order.pickupTime, locale)}
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm text-ink-muted">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.quantity}× {item.nameSnapshot}
              </span>
              <span>{formatPrice(item.unitPriceCents * item.quantity, locale)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-ink">
          <span>{dict.checkoutPage.total}</span>
          <span>{formatPrice(order.totalCents, locale)}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        {dict.orderConfirmation.payNotice}
      </p>

      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark"
      >
        {dict.orderConfirmation.backHome}
      </Link>
    </div>
  );
}
