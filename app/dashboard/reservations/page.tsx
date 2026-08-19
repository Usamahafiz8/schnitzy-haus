import Link from "next/link";
import { ReservationStatusControl } from "@/components/dashboard/ReservationStatusControl";
import { ReservationStatus } from "@/app/generated/prisma/client";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type ReservationsPageProps = { searchParams: Promise<{ status?: string }> };

const FILTERS = ["ALL", ...Object.values(ReservationStatus)];

export default async function DashboardReservationsPage({
  searchParams,
}: ReservationsPageProps) {
  const { status } = await searchParams;
  const activeFilter = FILTERS.includes(status ?? "ALL") ? (status ?? "ALL") : "ALL";

  const reservations = await prisma.reservation.findMany({
    where: activeFilter === "ALL" ? undefined : { status: activeFilter as (typeof ReservationStatus)[keyof typeof ReservationStatus] },
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Reservations</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter}
            href={
              filter === "ALL"
                ? "/dashboard/reservations"
                : `/dashboard/reservations?status=${filter}`
            }
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
              activeFilter === filter
                ? "border-brand bg-brand text-surface"
                : "border-border text-ink-muted hover:border-brand hover:text-brand"
            }`}
          >
            {filter}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Party</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="text-ink">{reservation.name}</p>
                  <p className="text-xs text-ink-muted">
                    {reservation.phone} · {reservation.email}
                  </p>
                </td>
                <td className="px-4 py-3 text-ink-muted">{reservation.partySize}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                  {formatDate(reservation.date, "en")}
                </td>
                <td className="px-4 py-3 text-ink-muted">{reservation.timeSlot}</td>
                <td className="max-w-xs px-4 py-3 text-ink-muted">
                  {reservation.notes || "—"}
                </td>
                <td className="px-4 py-3">
                  <ReservationStatusControl
                    reservationId={reservation.id}
                    status={reservation.status}
                  />
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">
                  No reservations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
