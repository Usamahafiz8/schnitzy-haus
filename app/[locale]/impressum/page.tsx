import { notFound } from "next/navigation";
import { restaurant } from "@/data/restaurant";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type ImpressumPageProps = { params: Promise<{ locale: string }> };

export default async function ImpressumPage({ params }: ImpressumPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const location = restaurant.locations[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{dict.legal.impressumTitle}</h1>
      <p className="mt-4 rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm text-ink-muted">
        {dict.legal.placeholderNotice}
      </p>
      <div className="mt-8 space-y-1 text-sm text-ink-muted">
        <p className="font-semibold text-ink">{restaurant.name}</p>
        <p>{location?.addressLine1}</p>
        <p>{location?.addressLine2}</p>
        <p>{restaurant.phone}</p>
        <p>{restaurant.email}</p>
      </div>
    </div>
  );
}
