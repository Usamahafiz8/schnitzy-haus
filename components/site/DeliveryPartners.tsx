import { restaurant } from "@/data/restaurant";
import type { Dictionary } from "@/i18n/types";

type DeliveryPartnersProps = {
  dict: Dictionary["deliveryPartners"];
};

export function DeliveryPartners({ dict }: DeliveryPartnersProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-8 sm:flex-row sm:px-10">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {dict.eyebrow}
          </p>
          <h3 className="mt-1 font-display text-2xl text-ink">{dict.title}</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {restaurant.deliveryPartners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ color: partner.color, borderColor: `${partner.color}40` }}
            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
