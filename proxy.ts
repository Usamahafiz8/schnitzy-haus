import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
} from "@/i18n/config";
import { SESSION_COOKIE_NAME, verifySession } from "@/lib/auth/session";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Passes the resolved locale down to Server Components (the root layout
// reads this to set `<html lang>`) without needing a second lookup.
function withLocaleHeader(request: NextRequest, locale: string): Headers {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return headers;
}

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  const preferred = acceptLanguage
    ?.split(",")[0]
    ?.split("-")[0]
    ?.toLowerCase();
  if (preferred && isLocale(preferred)) return preferred;

  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Internal dashboard: session + role gate. Kept outside the [locale]
  // tree entirely, so it never touches the locale-redirect logic below. ---
  if (pathname.startsWith("/dashboard")) {
    if (pathname === "/dashboard/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = token ? await verifySession(token) : null;

    if (!session) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }

    if (pathname.startsWith("/dashboard/staff") && session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next({ request: { headers: withLocaleHeader(request, "en") } });
  }

  // --- Public site: make sure every path is locale-prefixed ---
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) {
    const currentLocale = pathname.split("/")[1];
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, currentLocale) },
    });
  }

  const locale = detectLocale(request);
  const redirectUrl = new URL(
    `/${locale}${pathname}${request.nextUrl.search}`,
    request.url,
  );
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
