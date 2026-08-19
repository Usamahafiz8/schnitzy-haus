import Link from "next/link";
import { prisma } from "@/lib/prisma";

function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfTomorrow(): Date {
  const date = startOfToday();
  date.setDate(date.getDate() + 1);
  return date;
}

export default async function DashboardOverviewPage() {
  const [pendingOrders, pendingReservations, reservationsToday] = await Promise.all([
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.reservation.count({ where: { status: "PENDING" } }),
    prisma.reservation.count({
      where: { date: { gte: startOfToday(), lt: startOfTomorrow() } },
    }),
  ]);

  const stats = [
    { label: "Pending Orders", value: pendingOrders, href: "/dashboard/orders?status=PENDING" },
    {
      label: "Pending Reservations",
      value: pendingReservations,
      href: "/dashboard/reservations?status=PENDING",
    },
    { label: "Reservations Today", value: reservationsToday, href: "/dashboard/reservations" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Overview</h1>
      <p className="mt-1 text-sm text-ink-muted">
        A quick look at what needs attention right now.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-ink-muted">{stat.label}</p>
            <p className="mt-2 font-display text-4xl text-ink">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
