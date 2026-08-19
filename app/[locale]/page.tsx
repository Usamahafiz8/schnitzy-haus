import { notFound } from "next/navigation";
import { BookTableSection } from "@/components/site/BookTableSection";
import { Faq } from "@/components/site/Faq";
import { FeaturedDishStrip } from "@/components/site/FeaturedDishStrip";
import { FindRestaurantSection } from "@/components/site/FindRestaurantSection";
import { Hero } from "@/components/site/Hero";
import { MenuContactCta } from "@/components/site/MenuContactCta";
import { OurChefs } from "@/components/site/OurChefs";
import { PopularDishesCarousel } from "@/components/site/PopularDishesCarousel";
import { Testimonials } from "@/components/site/Testimonials";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} hero={dict.hero} />
      <FeaturedDishStrip locale={locale} />
      <Testimonials locale={locale} dict={dict.testimonials} />
      <PopularDishesCarousel locale={locale} dict={dict.popularDishes} />
      <OurChefs locale={locale} dict={dict.chefs} />
      <BookTableSection
        locale={locale}
        dict={dict.bookTable}
        reservationsDict={dict.reservationsPage}
        contactDict={dict.contactPage}
      />
      <FindRestaurantSection
        dict={dict.findRestaurant}
        menuDict={dict.menuPage}
        locationsDict={dict.locationsPage}
      />
      <Faq dict={dict.faq} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <MenuContactCta dict={dict.menuPage} />
      </div>
    </>
  );
}
