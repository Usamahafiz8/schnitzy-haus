"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => logout())}
      className="rounded-lg border border-border px-3 py-2 text-left text-sm font-medium text-ink-muted transition-colors hover:bg-cream hover:text-ink disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
