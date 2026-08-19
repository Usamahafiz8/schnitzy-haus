import { SignJWT, jwtVerify } from "jose";

// Single source of truth for the dashboard's session cookie — both
// proxy.ts (the gatekeeper) and the server actions that issue/clear
// sessions import from here, so there's exactly one place that defines what
// a valid session looks like.
export const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type StaffRole = "ADMIN" | "STAFF";

export type SessionPayload = {
  sub: string; // StaffUser id
  role: StaffRole;
  name: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. See .env.example.",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.sub === "string" &&
      (payload.role === "ADMIN" || payload.role === "STAFF") &&
      typeof payload.name === "string"
    ) {
      return { sub: payload.sub, role: payload.role, name: payload.name };
    }
    return null;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_SECONDS;
