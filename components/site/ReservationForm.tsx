"use client";

import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { restaurant } from "@/data/restaurant";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { submitReservation, type ReservationState } from "@/lib/actions/reservations";

type ReservationFormProps = {
  locale: Locale;
  dict: Dictionary["reservationsPage"];
};

const initialState: ReservationState = { status: "idle" };

export function ReservationForm({ locale, dict }: ReservationFormProps) {
  const [state, formAction] = useActionState(submitReservation, initialState);

  if (state.status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
          <HeartIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-4 font-script text-3xl text-brand">{dict.successTitle}</h2>
        <p className="mt-3 text-ink-muted">{dict.successBody}</p>
        <a
          href={`/${locale}`}
          className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-brand-dark"
        >
          {dict.backHome}
        </a>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-b from-surface to-cream/50 p-6 shadow-xl shadow-brand/5 sm:p-9">
      <span
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mb-6 flex items-center justify-center gap-3 text-gold" aria-hidden="true">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
        <HeartIcon className="h-4 w-4" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
      </div>

      <form action={formAction} className="relative grid gap-5">
        <input type="hidden" name="locale" value={locale} />

        <Field label={dict.name} icon={<UserIcon />}>
          <input required name="name" className={inputClass} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={dict.phone} icon={<PhoneIcon />}>
            <input required type="tel" name="phone" className={inputClass} />
          </Field>
          <Field label={dict.email} icon={<MailIcon />}>
            <input required type="email" name="email" className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label={dict.date} icon={<CalendarIcon />}>
            <input
              required
              type="date"
              name="date"
              min={new Date().toISOString().slice(0, 10)}
              className={inputClass}
            />
          </Field>
          <Field label={dict.time} icon={<ClockIcon />}>
            <input
              required
              type="time"
              name="timeSlot"
              min={`${String(restaurant.operations.openHour).padStart(2, "0")}:00`}
              max={`${String(restaurant.operations.closeHour - 1).padStart(2, "0")}:45`}
              className={inputClass}
            />
          </Field>
          <Field label={dict.partySize} icon={<UsersIcon />}>
            <input
              required
              type="number"
              name="partySize"
              min={restaurant.operations.reservationMinPartySize}
              max={restaurant.operations.reservationMaxPartySizeOnline}
              defaultValue={2}
              className={inputClass}
            />
          </Field>
        </div>
        <p className="text-xs text-ink-muted">{dict.largePartyNotice}</p>
        <Field label={dict.notes}>
          <textarea
            name="notes"
            placeholder={dict.notesPlaceholder}
            rows={3}
            className={`${plainInputClass} resize-none`}
          />
        </Field>

        {state.status === "error" && (
          <p className="text-sm text-brand">{state.message}</p>
        )}

        <SubmitButton dict={dict} />
      </form>
    </div>
  );
}

function SubmitButton({ dict }: { dict: Dictionary["reservationsPage"] }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3.5 text-sm font-semibold tracking-wide text-surface shadow-md shadow-brand/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      <HeartIcon className="h-4 w-4" />
      {pending ? dict.submitting : dict.submit}
    </button>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.5-8.28C.6 9.9 1.2 6.3 4.2 4.9c2.1-1 4.4-.3 5.8 1.4C11.4 4.6 13.7 3.9 15.8 4.9c3 1.4 3.6 5 1.7 7.82C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h3.2l1.3 4.3-2 1.6a11.4 11.4 0 005.6 5.6l1.6-2 4.3 1.3V18a2 2 0 01-2.2 2A15.6 15.6 0 015 6.2 2 2 0 015 4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" />
      <path d="M2.8 19c1.1-3 3.4-4.5 6.2-4.5s5.1 1.5 6.2 4.5" />
      <path d="M15.5 5.3a3 3 0 010 5.9M18.5 19c-.5-1.9-1.5-3.2-2.9-4" />
    </svg>
  );
}

const baseInputClass =
  "w-full rounded-xl border border-border bg-surface py-3 text-sm text-ink shadow-sm transition-all placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";
const inputClass = `${baseInputClass} pl-11 pr-4`;
const plainInputClass = `${baseInputClass} px-4`;

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="group flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/50 transition-colors group-focus-within:text-brand">
            {icon}
          </span>
        )}
        {children}
      </div>
    </label>
  );
}
