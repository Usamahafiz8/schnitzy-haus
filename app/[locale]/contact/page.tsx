import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { restaurant } from "@/data/restaurant";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type ContactPageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const location = restaurant.locations[0];

  return (
    <div className="pb-20">
      <PageHero title={dict.contactPage.title} subtitle={dict.contactPage.subtitle} />
      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold text-ink">{dict.contactPage.addressTitle}</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {location?.addressLine1}
              <br />
              {location?.addressLine2}
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              <a href={`tel:${restaurant.phone.replace(/\s+/g, "")}`} className="hover:text-brand">
                {restaurant.phone}
              </a>
              <br />
              <a href={`mailto:${restaurant.email}`} className="hover:text-brand">
                {restaurant.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-semibold text-ink">{dict.contactPage.hoursTitle}</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {restaurant.hoursLabel[locale]}
              <br />
              {restaurant.hoursValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
