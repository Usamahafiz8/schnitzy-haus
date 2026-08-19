import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <CartProvider>
      <Header locale={locale as Locale} nav={dict.nav} />
      {/* Header is now `fixed` (see Header.tsx) so it can float, glassy and
          transparent, over full-bleed hero banners — pt-20 here matches its
          h-20 height so ordinary page content isn't hidden underneath it.
          A page with its own full-bleed banner (see app/[locale]/menu) can
          cancel this out locally with `-mt-20` to bleed under the header. */}
      <main className="flex-1 pt-20">{children}</main>
      <Footer locale={locale as Locale} nav={dict.nav} footer={dict.footer} />
    </CartProvider>
  );
}
