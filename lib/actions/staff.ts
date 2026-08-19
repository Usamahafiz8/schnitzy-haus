"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guards";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { staffCreateSchema } from "@/lib/validation/staff";
import type { $Enums } from "@/app/generated/prisma/client";

export type StaffFormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success" };

export async function createStaffUser(
  _prevState: StaffFormState,
  formData: FormData,
): Promise<StaffFormState> {
  await requireAdmin();

  const parsed = staffCreateSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const existing = await prisma.staffUser.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { status: "error", message: "A staff account with that email already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.staffUser.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.role,
    },
  });

  revalidatePath("/dashboard/staff");
  return { status: "success" };
}

export async function setStaffActive(
  staffId: string,
  active: boolean,
): Promise<void> {
  await requireAdmin();
  await prisma.staffUser.update({ where: { id: staffId }, data: { active } });
  revalidatePath("/dashboard/staff");
}

export async function setStaffRole(
  staffId: string,
  role: $Enums.StaffRole,
): Promise<void> {
  await requireAdmin();
  await prisma.staffUser.update({ where: { id: staffId }, data: { role } });
  revalidatePath("/dashboard/staff");
}
