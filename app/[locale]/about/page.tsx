import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { PlaceholderImage } from "@/components/site/PlaceholderImage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type AboutPageProps = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div className="pb-20">
      <PageHero eyebrow={dict.aboutPage.intro} title={dict.aboutPage.title} />
      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <PlaceholderImage
          label="Schnitzy Haus"
          className="aspect-[16/7] w-full rounded-3xl"
        />
        <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-ink-muted">
          {dict.aboutPage.body}
        </p>
      </div>
    </div>
  );
}
