"use server";

import { revalidatePath } from "next/cache";
import { restaurant } from "@/data/restaurant";
import { requireStaff } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validation/reservation";
import type { $Enums } from "@/app/generated/prisma/client";

export type ReservationState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; reservationId: string };

export async function submitReservation(
  _prevState: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const parsed = reservationSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    date: formData.get("date"),
    timeSlot: formData.get("timeSlot"),
    partySize: formData.get("partySize"),
    notes: formData.get("notes"),
    locale: formData.get("locale"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check your details.",
    };
  }

  const { name, phone, email, date, timeSlot, partySize, notes, locale } =
    parsed.data;

  const requestedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(requestedDate.getTime())) {
    return { status: "error", message: "Please choose a valid date." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (requestedDate < today) {
    return { status: "error", message: "The date can't be in the past." };
  }

  const hour = Number(timeSlot.split(":")[0]);
  if (
    hour < restaurant.operations.openHour ||
    hour >= restaurant.operations.closeHour
  ) {
    return {
      status: "error",
      message: "Please choose a time within our opening hours.",
    };
  }

  if (partySize > restaurant.operations.reservationMaxPartySizeOnline) {
    return {
      status: "error",
      message: "For groups this size, please call us directly.",
    };
  }

  const reservation = await prisma.reservation.create({
    data: {
      name,
      phone,
      email,
      partySize,
      date: requestedDate,
      timeSlot,
      notes: notes || null,
      locale: locale.toUpperCase() as $Enums.Locale,
    },
  });

  return { status: "success", reservationId: reservation.id };
}

// --- Dashboard mutation ---

export async function updateReservationStatus(
  reservationId: string,
  status: $Enums.ReservationStatus,
): Promise<void> {
  await requireStaff();
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status },
  });
  revalidatePath("/dashboard/reservations");
  revalidatePath("/dashboard");
}
