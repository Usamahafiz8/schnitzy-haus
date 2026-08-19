type PlaceholderImageProps = {
  label: string;
  className?: string;
};

// Shown whenever a MenuItem in data/menu.ts has no `image` set yet. Once you
// have real food photography, add the file under public/images/menu/ and
// point the item's `image` field at it (see README) — this component simply
// stops being used for that item.
export function PlaceholderImage({ label, className }: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-ink ${className ?? ""}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 65%, rgba(238,168,47,0.35) 0%, rgba(204,32,39,0.28) 35%, rgba(36,23,18,0.95) 72%)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-gold/80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 2v6a2 2 0 002 2v11M6 2v20M9 2v6M10 2v20M17 2c-2.2 0-4 2-4 5.5S14.8 12 17 12v10"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wide text-cream/90">
          {label}
        </span>
      </div>
    </div>
  );
}
