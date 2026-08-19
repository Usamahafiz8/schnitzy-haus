import Link from "next/link";
import { restaurant } from "@/data/restaurant";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
};

export function Footer({ locale, nav, footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-surface"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2 2 10h3v10h5v-6h4v6h5V10h3z" />
              </svg>
            </span>
            <span className="font-display text-lg tracking-wide text-ink">
              SCHNITZY <span className="text-brand">HAUS</span>
            </span>
          </Link>
          <p className="text-sm text-ink-muted">{footer.tagline}</p>
          <div className="mt-1 flex items-center gap-3">
            <SocialIcon href={restaurant.socials.instagram} label="Instagram">
              <path d="M12 2.2c2.7 0 3 0 4.1.06 1.1.05 1.7.24 2.1.4.5.2.9.44 1.3.84.4.4.63.8.84 1.3.16.4.35 1 .4 2.1.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.24 1.7-.4 2.1-.2.5-.44.9-.84 1.3-.4.4-.8.63-1.3.84-.4.16-1 .35-2.1.4-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.7-.24-2.1-.4a3.5 3.5 0 01-1.3-.84 3.5 3.5 0 01-.84-1.3c-.16-.4-.35-1-.4-2.1-.06-1.1-.06-1.4-.06-4.1s0-3 .06-4.1c.05-1.1.24-1.7.4-2.1.2-.5.44-.9.84-1.3.4-.4.8-.63 1.3-.84.4-.16 1-.35 2.1-.4C9 2.2 9.3 2.2 12 2.2zm0 1.8c-2.66 0-2.97 0-4.02.06-.86.04-1.33.18-1.64.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.78-.3 1.64C4.31 8.03 4.3 8.34 4.3 11s0 2.97.06 4.02c.04.86.18 1.33.3 1.64.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.78.26 1.64.3 1.05.06 1.36.06 4.02.06s2.97 0 4.02-.06c.86-.04 1.33-.18 1.64-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.78.3-1.64.06-1.05.06-1.36.06-4.02s0-2.97-.06-4.02c-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 00-.66-1.01 2.7 2.7 0 00-1.01-.66c-.31-.12-.78-.26-1.64-.3C14.97 4 14.66 4 12 4zm0 3.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2zm0 1.8a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm4.6-2a.84.84 0 110 1.68.84.84 0 010-1.68z" />
            </SocialIcon>
            <SocialIcon href={restaurant.socials.facebook} label="Facebook">
              <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.7c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.42-3.9 4V10.4H8.2v3h2.16V21h3.14z" />
            </SocialIcon>
            <SocialIcon href={restaurant.socials.tiktok} label="TikTok">
              <path d="M14.5 3h2.6c.15 1.5 1 2.9 2.9 3.4V9c-1.1-.02-2.1-.36-2.9-.94v6.1a5.1 5.1 0 11-5.1-5.1c.2 0 .4.02.6.05v2.7a2.5 2.5 0 102.1 2.47V3z" />
            </SocialIcon>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            {footer.quickLinks}
          </h3>
          <FooterLink href={`/${locale}`}>{nav.home}</FooterLink>
          <FooterLink href={`/${locale}/menu`}>{nav.menu}</FooterLink>
          <FooterLink href={`/${locale}/about`}>{nav.about}</FooterLink>
          <FooterLink href={`/${locale}/contact`}>{nav.contact}</FooterLink>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
            {footer.information}
          </h3>
          <FooterLink href={`/${locale}/impressum`}>{footer.impressum}</FooterLink>
          <FooterLink href={`/${locale}/datenschutz`}>{footer.datenschutz}</FooterLink>
          <FooterLink href={`/${locale}/reservations`}>{nav.reservations}</FooterLink>
          <FooterLink href={`/${locale}/locations`}>{nav.locations}</FooterLink>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {footer.contactTitle}
            </h3>
            <p className="mt-3 text-sm text-ink-muted">
              {restaurant.locations[0]?.addressLine1}
              <br />
              {restaurant.locations[0]?.addressLine2}
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              <a href={`tel:${restaurant.phone.replace(/\s+/g, "")}`} className="hover:text-brand">
                {restaurant.phone}
              </a>
              <br />
              <a href={`mailto:${restaurant.email}`} className="hover:text-brand">
                {restaurant.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {footer.hoursTitle}
            </h3>
            <p className="mt-3 text-sm text-ink-muted">
              {restaurant.hoursLabel[locale]}
              <br />
              {restaurant.hoursValue}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {restaurant.name}. {footer.rights}
          </p>
          <p className="font-script text-base text-brand">{footer.closingNote}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-ink-muted transition-colors hover:text-brand">
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-brand hover:text-surface"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
