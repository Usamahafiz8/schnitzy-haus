import { restaurant } from "@/data/restaurant";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { ReservationForm } from "./ReservationForm";

type BookTableSectionProps = {
  locale: Locale;
  dict: Dictionary["bookTable"];
  reservationsDict: Dictionary["reservationsPage"];
  contactDict: Dictionary["contactPage"];
};

export function BookTableSection({
  locale,
  dict,
  reservationsDict,
  contactDict,
}: BookTableSectionProps) {
  const location = restaurant.locations[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-3xl text-brand">{dict.title}</h2>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-surface"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M12 2 2 10h3v10h5v-6h4v6h5V10h3z" />
              </svg>
            </span>
            <span className="font-display text-2xl tracking-wide text-ink">
              SCHNITZY <span className="text-brand">HAUS</span>
            </span>
          </div>
          <p className="font-script text-xl text-gold">{dict.tagline}</p>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {contactDict.addressTitle}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              {location?.addressLine1}
              <br />
              {location?.addressLine2}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {contactDict.hoursTitle}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              {restaurant.hoursLabel[locale]}
              <br />
              {restaurant.hoursValue}
            </p>
          </div>
        </div>

        <ReservationForm locale={locale} dict={reservationsDict} />
      </div>
    </section>
  );
}
