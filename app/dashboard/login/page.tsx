import { LoginForm } from "@/components/dashboard/LoginForm";

export default function DashboardLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="text-center">
          <span
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-surface"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M12 2 2 10h3v10h5v-6h4v6h5V10h3z" />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-2xl text-ink">Schnitzy Haus</h1>
          <p className="text-sm text-ink-muted">Staff Dashboard</p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
