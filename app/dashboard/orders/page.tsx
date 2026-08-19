import Link from "next/link";
import { OrderStatusControl } from "@/components/dashboard/OrderStatusControl";
import { OrderStatus } from "@/app/generated/prisma/client";
import { formatDateTime, formatPrice } from "@/lib/format";
import { prisma } from "@/lib/prisma";

type OrdersPageProps = { searchParams: Promise<{ status?: string }> };

const FILTERS = ["ALL", ...Object.values(OrderStatus)];

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { status } = await searchParams;
  const activeFilter = FILTERS.includes(status ?? "ALL") ? (status ?? "ALL") : "ALL";

  const orders = await prisma.order.findMany({
    where: activeFilter === "ALL" ? undefined : { status: activeFilter as (typeof OrderStatus)[keyof typeof OrderStatus] },
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Orders</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Link
            key={filter}
            href={filter === "ALL" ? "/dashboard/orders" : `/dashboard/orders?status=${filter}`}
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
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Pickup</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">{order.orderNumber}</td>
                <td className="px-4 py-3">
                  <p className="text-ink">{order.customerName}</p>
                  <p className="text-xs text-ink-muted">{order.phone}</p>
                </td>
                <td className="max-w-xs px-4 py-3 text-ink-muted">
                  {order.items.map((item) => `${item.quantity}× ${item.nameSnapshot}`).join(", ")}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                  {formatDateTime(order.pickupTime, "en")}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">
                  {formatPrice(order.totalCents, "en")}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusControl orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
