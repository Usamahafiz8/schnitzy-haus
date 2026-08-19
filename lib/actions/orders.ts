"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getMenuItem } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { requireStaff } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";
import { orderSchema, type OrderInput } from "@/lib/validation/order";
import type { $Enums } from "@/app/generated/prisma/client";

export type OrderState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; orderNumber: string };

function generateOrderNumber(): string {
  return `SH-${randomBytes(3).toString("hex").toUpperCase()}`;
}

// Called directly from the checkout Client Component (not via <form action>)
// since the payload includes the whole cart array, not just scalar fields.
export async function submitOrder(input: OrderInput): Promise<OrderState> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check your order.",
    };
  }

  const { customerName, phone, email, pickupTime, notes, locale, items } =
    parsed.data;

  // Prices are ALWAYS recomputed here from data/menu.ts — the client-sent
  // cart is only ever used for item ids/quantities, never for pricing.
  let resolvedItems;
  try {
    resolvedItems = items.map((item) => {
      const menuItem = getMenuItem(item.menuItemId);
      if (!menuItem) {
        throw new Error(`Unknown menu item: ${item.menuItemId}`);
      }
      return {
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name[locale],
        unitPriceCents: menuItem.priceCents,
        quantity: item.quantity,
        notes: item.notes || null,
      };
    });
  } catch {
    return {
      status: "error",
      message: "One of the items in your cart is no longer available.",
    };
  }

  const totalCents = resolvedItems.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );

  const pickupDate = new Date(pickupTime);
  if (Number.isNaN(pickupDate.getTime())) {
    return { status: "error", message: "Please choose a valid pickup time." };
  }

  const earliestPickup = new Date(
    Date.now() + restaurant.operations.pickupLeadTimeMinutes * 60_000,
  );
  if (pickupDate < earliestPickup) {
    return {
      status: "error",
      message: "Please choose a later pickup time.",
    };
  }

  let orderNumber = generateOrderNumber();
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (!existing) break;
    orderNumber = generateOrderNumber();
  }

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName,
      phone,
      email,
      pickupTime: pickupDate,
      notes: notes || null,
      totalCents,
      locale: locale.toUpperCase() as $Enums.Locale,
      items: { create: resolvedItems },
    },
  });

  return { status: "success", orderNumber: order.orderNumber };
}

// --- Dashboard mutation ---

export async function updateOrderStatus(
  orderId: string,
  status: $Enums.OrderStatus,
): Promise<void> {
  await requireStaff();
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");
}
