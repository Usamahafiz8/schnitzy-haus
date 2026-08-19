import { team } from "@/data/team";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { PlaceholderImage } from "./PlaceholderImage";
import { StarRating } from "./StarRating";

type OurChefsProps = {
  locale: Locale;
  dict: Dictionary["chefs"];
};

export function OurChefs({ locale, dict }: OurChefsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-3xl text-brand">{dict.title}</h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {team.map((member) => (
          <div key={member.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg text-ink">{member.name}</h3>
                <p className="text-sm text-ink-muted">{dict.roleLabel}</p>
              </div>
              <PlaceholderImage
                label={member.name}
                className="h-24 w-28 shrink-0 rounded-2xl"
              />
            </div>
            <StarRating rating={member.rating} className="mt-4" />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {member.bio[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
