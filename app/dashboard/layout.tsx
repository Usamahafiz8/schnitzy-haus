import Link from "next/link";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { getCurrentStaff } from "@/lib/auth/current-user";

// Internal tool — deliberately English-only and outside the [locale] tree
// (see i18n/config.ts). proxy.ts already enforces the session/role gate
// for everything under here except /dashboard/login; this layout just
// renders the chrome around it.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentStaff();

  if (!session) {
    // The login page (and any edge case where the cookie expired between
    // middleware and render) gets a bare shell, no sidebar.
    return <div className="min-h-screen bg-cream">{children}</div>;
  }

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/orders", label: "Orders" },
    { href: "/dashboard/reservations", label: "Reservations" },
    ...(session.role === "ADMIN"
      ? [{ href: "/dashboard/staff", label: "Staff" }]
      : []),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-cream sm:flex-row">
      <div className="border-b border-border bg-surface px-4 py-3 sm:hidden">
        <nav className="flex gap-2 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface p-6 sm:flex">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-surface"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2 2 10h3v10h5v-6h4v6h5V10h3z" />
            </svg>
          </span>
          <span className="font-display text-base tracking-wide text-ink">
            SCHNITZY <span className="text-brand">HAUS</span>
          </span>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-cream hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
          <div>
            <p className="text-sm font-semibold text-ink">{session.name}</p>
            <p className="text-xs uppercase tracking-wide text-ink-muted">
              {session.role}
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
