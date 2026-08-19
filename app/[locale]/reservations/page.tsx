import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { ReservationForm } from "@/components/site/ReservationForm";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type ReservationsPageProps = { params: Promise<{ locale: string }> };

export default async function ReservationsPage({ params }: ReservationsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="pb-20">
      <PageHero
        title={dict.reservationsPage.title}
        subtitle={dict.reservationsPage.subtitle}
      />
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        <ReservationForm locale={locale} dict={dict.reservationsPage} />
      </div>
    </div>
  );
}
