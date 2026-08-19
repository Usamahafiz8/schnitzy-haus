import { notFound } from "next/navigation";
import { MenuBrowser } from "@/components/site/MenuBrowser";
import { MenuContactCta } from "@/components/site/MenuContactCta";
import { PageHero } from "@/components/site/PageHero";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type MenuPageProps = { params: Promise<{ locale: string }> };

export default async function MenuPage({ params }: MenuPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="pb-20">
      <PageHero title={dict.menuPage.title} />

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <MenuBrowser locale={locale} dict={dict.menuPage} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <MenuContactCta dict={dict.menuPage} />
      </section>
    </div>
  );
}
