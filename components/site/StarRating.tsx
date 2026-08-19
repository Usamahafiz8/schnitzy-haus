type StarRatingProps = {
  rating: number;
  count?: number;
  /** Freeform text shown in parens instead of a bare count, e.g. "18.6k Reviews". */
  suffix?: string;
  className?: string;
};

export function StarRating({ rating, count, suffix, className }: StarRatingProps) {
  const filledStars = Math.round(rating);

  return (
    <div className={`flex items-center gap-1.5 text-sm ${className ?? ""}`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${
              index < filledStars ? "fill-gold" : "fill-ink/15"
            }`}
          >
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {suffix ? (
        <span className="text-ink-muted">({suffix})</span>
      ) : (
        typeof count === "number" && (
          <span className="text-ink-muted">({count})</span>
        )
      )}
    </div>
  );
}
