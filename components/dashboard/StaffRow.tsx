"use client";

import { useTransition } from "react";
import { setStaffActive, setStaffRole } from "@/lib/actions/staff";
import type { $Enums } from "@/app/generated/prisma/browser";

type StaffRowProps = {
  staff: {
    id: string;
    name: string;
    email: string;
    role: $Enums.StaffRole;
    active: boolean;
  };
  isSelf: boolean;
};

export function StaffRow({ staff, isSelf }: StaffRowProps) {
  const [pending, startTransition] = useTransition();

  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-4 py-3">
        <p className="text-ink">
          {staff.name}
          {isSelf && <span className="ml-2 text-xs text-ink-muted">(you)</span>}
        </p>
        <p className="text-xs text-ink-muted">{staff.email}</p>
      </td>
      <td className="px-4 py-3">
        <select
          value={staff.role}
          disabled={pending || isSelf}
          onChange={(event) =>
            startTransition(() =>
              setStaffRole(staff.id, event.target.value as $Enums.StaffRole),
            )
          }
          title={isSelf ? "You can't change your own role." : undefined}
          className="rounded-full border border-border bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink focus:border-brand focus:outline-none disabled:opacity-60"
        >
          <option value="STAFF">STAFF</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          disabled={pending || isSelf}
          title={isSelf ? "You can't deactivate your own account." : undefined}
          onClick={() => startTransition(() => setStaffActive(staff.id, !staff.active))}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            staff.active ? "bg-brand/10 text-brand" : "bg-ink/10 text-ink-muted"
          }`}
        >
          {staff.active ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
}
