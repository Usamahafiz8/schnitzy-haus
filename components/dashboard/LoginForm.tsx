"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = { status: "idle" };

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Email</span>
        <input required type="email" name="email" autoComplete="username" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Password</span>
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className={inputClass}
        />
      </label>
      {state.status === "error" && (
        <p className="text-sm text-brand">{state.message}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none";
