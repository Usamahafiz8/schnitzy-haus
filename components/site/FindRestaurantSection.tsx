"use client";

import { useState, type FormEvent } from "react";
import { restaurant } from "@/data/restaurant";
import type { Dictionary } from "@/i18n/types";

type FindRestaurantSectionProps = {
  dict: Dictionary["findRestaurant"];
  menuDict: Dictionary["menuPage"];
  locationsDict: Dictionary["locationsPage"];
};

export function FindRestaurantSection({
  dict,
  menuDict,
  locationsDict,
}: FindRestaurantSectionProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const location = restaurant.locations[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 500);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-3xl text-brand">{dict.title}</h2>

      <div className="mt-10 flex justify-center">
        {/* Stylized, self-contained map placeholder — no external map
            embed/API key needed. Links out to the real location on Google
            Maps via data/restaurant.ts. */}
        <div className="relative min-h-80 w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-cream">
          <svg
            className="absolute inset-0 h-full w-full opacity-40"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {Array.from({ length: 7 }, (_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                y1={index * 45 + 10}
                x2="400"
                y2={index * 45 + 10}
                stroke="var(--color-ink)"
                strokeOpacity="0.12"
                strokeWidth="6"
              />
            ))}
            {Array.from({ length: 9 }, (_, index) => (
              <line
                key={`v-${index}`}
                x1={index * 50 + 15}
                y1="0"
                x2={index * 50 + 15}
                y2="300"
                stroke="var(--color-ink)"
                strokeOpacity="0.12"
                strokeWidth="6"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-surface shadow-lg" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
              </svg>
            </span>
          </div>
          {location && (
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 rounded-full bg-surface px-4 py-2 text-xs font-semibold text-brand shadow-sm transition-colors hover:bg-cream"
            >
              {locationsDict.getDirections} →
            </a>
          )}
        </div>

        {/* <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-surface">
                ✓
              </span>
              <p className="mt-2 font-display text-xl text-ink">{menuDict.formSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Field label={dict.formName}>
                <input required name="name" className={inputClass} />
              </Field>
              <Field label={menuDict.formEmail}>
                <input required type="email" name="email" className={inputClass} />
              </Field>
              <Field label={menuDict.formPhone}>
                <input required type="tel" name="phone" className={inputClass} />
              </Field>
              <Field label={menuDict.formMessage}>
                <textarea required name="message" rows={3} className={inputClass} />
              </Field>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 justify-self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? menuDict.formSubmitting : menuDict.formSubmit}
              </button>
            </form>
          )}
        </div> */}
      </div>
      
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-cream px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
