import { StaffForm } from "@/components/dashboard/StaffForm";
import { StaffRow } from "@/components/dashboard/StaffRow";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export default async function StaffPage() {
  const session = await requireAdmin();
  const staff = await prisma.staffUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Staff</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Manage who can access this dashboard.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-semibold text-ink">Add Staff Account</h2>
        <div className="mt-4">
          <StaffForm />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <StaffRow
                key={member.id}
                staff={member}
                isSelf={member.id === session.sub}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
