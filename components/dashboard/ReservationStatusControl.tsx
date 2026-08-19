"use client";

import { useTransition } from "react";
import { updateReservationStatus } from "@/lib/actions/reservations";
import { ReservationStatus, type $Enums } from "@/app/generated/prisma/browser";

const STATUSES = Object.values(ReservationStatus);

export function ReservationStatusControl({
  reservationId,
  status,
}: {
  reservationId: string;
  status: $Enums.ReservationStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(event) =>
        startTransition(() =>
          updateReservationStatus(
            reservationId,
            event.target.value as $Enums.ReservationStatus,
          ),
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
