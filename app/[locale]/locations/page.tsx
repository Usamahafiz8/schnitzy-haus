import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { restaurant } from "@/data/restaurant";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type LocationsPageProps = { params: Promise<{ locale: string }> };

export default async function LocationsPage({ params }: LocationsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="pb-20">
      <PageHero title={dict.locationsPage.title} subtitle={dict.locationsPage.subtitle} />
      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {restaurant.locations.map((location) => (
            <div key={location.id} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl text-ink">{location.name}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {location.addressLine1}
                <br />
                {location.addressLine2}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                {restaurant.hoursLabel[locale]}: {restaurant.hoursValue}
              </p>
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-surface"
              >
                {dict.locationsPage.getDirections}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
