"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createStaffUser, type StaffFormState } from "@/lib/actions/staff";

const initialState: StaffFormState = { status: "idle" };

export function StaffForm() {
  const [state, formAction] = useActionState(createStaffUser, initialState);

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Name</span>
        <input required name="name" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Email</span>
        <input required type="email" name="email" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Password</span>
        <input required type="password" name="password" minLength={8} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Role</span>
        <select name="role" defaultValue="STAFF" className={inputClass}>
          <option value="STAFF">Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
      </label>
      <div className="sm:col-span-2">
        {state.status === "error" && (
          <p className="mb-2 text-sm text-brand">{state.message}</p>
        )}
        {state.status === "success" && (
          <p className="mb-2 text-sm text-ink-muted">Staff account created.</p>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create Staff Account"}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none";
