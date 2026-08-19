import { redirect } from "next/navigation";
import { getCurrentStaff } from "./current-user";
import type { SessionPayload } from "./session";

// The dashboard's middleware guard (proxy.ts) already blocks navigation
// to these routes without a valid session/role. These are a second,
// defense-in-depth check run inside the Server Actions themselves, since
// actions are effectively their own endpoint.
export async function requireStaff(): Promise<SessionPayload> {
  const session = await getCurrentStaff();
  if (!session) redirect("/dashboard/login");
  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireStaff();
  if (session.role !== "ADMIN") redirect("/dashboard");
  return session;
}
