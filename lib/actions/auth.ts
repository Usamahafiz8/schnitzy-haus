"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  signSession,
} from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/staff";

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email and password." };
  }

  // Deliberately vague on which part was wrong — don't help an attacker
  // enumerate valid staff emails.
  const invalidCredentials: LoginState = {
    status: "error",
    message: "Invalid email or password.",
  };

  const user = await prisma.staffUser.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user || !user.active) {
    return invalidCredentials;
  }

  const validPassword = await verifyPassword(
    parsed.data.password,
    user.passwordHash,
  );
  if (!validPassword) {
    return invalidCredentials;
  }

  const token = await signSession({
    sub: user.id,
    role: user.role,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/dashboard/login");
}
