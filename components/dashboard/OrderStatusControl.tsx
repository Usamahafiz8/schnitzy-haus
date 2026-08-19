"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import { OrderStatus, type $Enums } from "@/app/generated/prisma/browser";

const STATUSES = Object.values(OrderStatus);

export function OrderStatusControl({
  orderId,
  status,
}: {
  orderId: string;
  status: $Enums.OrderStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(event) =>
        startTransition(() =>
          updateOrderStatus(orderId, event.target.value as $Enums.OrderStatus),
        )
      }
      className="rounded-full border border-border bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink focus:border-brand focus:outline-none disabled:opacity-60"
    >
      {STATUSES.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
