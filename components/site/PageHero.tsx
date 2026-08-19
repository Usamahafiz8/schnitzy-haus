type PageHeroProps = {
  /** Small uppercase line above the title, e.g. "More Than Just Burgers." */
  eyebrow?: string;
  title: string;
  /** Supporting line below the title, e.g. a page subtitle. */
  subtitle?: string;
};

// Shared full-bleed dark banner used at the top of interior pages (menu,
// reservations, about, contact, locations). `-mt-20` cancels the top padding
// [locale]/layout.tsx adds to <main> to clear the fixed, glassy Header, so
// this bleeds all the way up to the true top of the viewport and shows
// through the header's frosted-glass blur — see Header.tsx.
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative -mt-20 overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
      style={{
        background:
          "radial-gradient(90% 140% at 15% 20%, rgba(204,32,39,0.35) 0%, transparent 55%), radial-gradient(80% 130% at 85% 80%, rgba(238,168,47,0.25) 0%, transparent 55%), var(--color-ink)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      <div className="relative mx-auto max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
        )}
        <h1
          className={`font-display text-4xl text-surface sm:text-5xl ${eyebrow ? "mt-1" : ""}`}
        >
          {title}
        </h1>
        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-brand" />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg text-sm text-cream/80 sm:text-base">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
