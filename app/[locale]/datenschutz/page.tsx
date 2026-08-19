import { notFound } from "next/navigation";
import { restaurant } from "@/data/restaurant";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type DatenschutzPageProps = { params: Promise<{ locale: string }> };

export default async function DatenschutzPage({ params }: DatenschutzPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{dict.legal.datenschutzTitle}</h1>
      <p className="mt-4 rounded-xl border border-brand/30 bg-brand/5 p-4 text-sm text-ink-muted">
        {dict.legal.placeholderNotice}
      </p>
      <p className="mt-8 text-sm leading-relaxed text-ink-muted">
        {restaurant.name} processes the personal data you submit through the
        order and reservation forms on this site (name, phone, email, and the
        details of your order or reservation) solely to fulfil that order or
        reservation and to contact you about it. This placeholder page should
        be replaced with a complete privacy policy describing your data
        retention, legal basis, and user rights under the GDPR before the
        site goes live.
      </p>
    </div>
  );
}
