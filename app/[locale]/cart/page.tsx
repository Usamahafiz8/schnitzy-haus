import { notFound } from "next/navigation";
import { CartView } from "@/components/site/CartView";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type CartPageProps = { params: Promise<{ locale: string }> };

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-ink">{dict.cartPage.title}</h1>
      <div className="mt-8">
        <CartView locale={locale} dict={dict.cartPage} />
      </div>
    </div>
  );
}
