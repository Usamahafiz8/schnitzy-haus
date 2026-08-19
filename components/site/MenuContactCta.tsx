"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/types";

type MenuContactCtaProps = {
  dict: Dictionary["menuPage"];
};

export function MenuContactCta({ dict }: MenuContactCtaProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 500);
  }

  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:grid-cols-2">
      <div className="p-6 sm:p-8">
        {status === "sent" ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-surface">
              ✓
            </span>
            <p className="mt-2 font-display text-xl text-ink">{dict.formSuccess}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dict.formFirstName}>
                <input required name="firstName" className={inputClass} />
              </Field>
              <Field label={dict.formLastName}>
                <input required name="lastName" className={inputClass} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dict.formEmail}>
                <input required type="email" name="email" className={inputClass} />
              </Field>
              <Field label={dict.formPhone}>
                <input required type="tel" name="phone" className={inputClass} />
              </Field>
            </div>
            <Field label={dict.formSubject}>
              <input name="subject" className={inputClass} />
            </Field>
            <Field label={dict.formMessage}>
              <textarea required name="message" rows={4} className={inputClass} />
            </Field>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 justify-self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? dict.formSubmitting : dict.formSubmit}
            </button>
          </form>
        )}
      </div>

      <div
        className="relative flex min-h-64 flex-col justify-center gap-3 p-6 sm:p-10"
        style={{
          background:
            "radial-gradient(120% 100% at 20% 30%, rgba(238,168,47,0.3) 0%, transparent 55%), radial-gradient(100% 120% at 90% 90%, rgba(204,32,39,0.35) 0%, transparent 55%), var(--color-ink)",
        }}
      >
        <p className="font-script text-2xl text-gold">{dict.ctaEyebrow}</p>
        <h2 className="max-w-sm font-display text-2xl leading-tight text-surface sm:text-3xl">
          {dict.ctaHeading}
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-cream/80">{dict.ctaBody}</p>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
