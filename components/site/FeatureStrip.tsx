import type { Dictionary } from "@/i18n/types";

type FeatureStripProps = {
  features: Dictionary["features"];
};

export function FeatureStrip({ features }: FeatureStripProps) {
  const items = [
    {
      ...features.premiumQuality,
      icon: (
        <path d="M4 10.5A8 8 0 0112 4a8 8 0 018 6.5M3 10.5h18M4 13.5h16M6 13.5l.6 4a2 2 0 002 1.7h6.8a2 2 0 002-1.7l.6-4" />
      ),
    },
    {
      ...features.madeFresh,
      icon: (
        <path d="M12 2c1.5 3 2 4.5 1 6.5C15 8 16 6.5 16 5c2 2 3 4.5 3 7a7 7 0 11-14 0c0-2 .7-3.6 1.8-5 .3 2 1.4 3 2.2 3-1-3 .5-5.5 3-8z" />
      ),
    },
    {
      ...features.fastPickup,
      icon: (
        <path d="M4 8h11l3 4v5h-2M4 8v9h2m3.5-9V5a1 1 0 011-1H12a1 1 0 011 1v3M9 20a1.6 1.6 0 100-3.2A1.6 1.6 0 009 20zm9 0a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z" />
      ),
    },
    {
      ...features.topRated,
      icon: <path d="M12 2.5l3 6.2 6.8.7-5.1 4.6 1.4 6.7L12 17l-6.1 3.7 1.4-6.7-5.1-4.6 6.8-.7z" />,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
