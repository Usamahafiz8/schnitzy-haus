import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/site/CheckoutForm";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type CheckoutPageProps = { params: Promise<{ locale: string }> };

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{dict.checkoutPage.title}</h1>
      <p className="mt-2 text-ink-muted">{dict.checkoutPage.subtitle}</p>
      <div className="mt-8">
        <CheckoutForm locale={locale} dict={dict.checkoutPage} />
      </div>
    </div>
  );
}
