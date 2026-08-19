# Schnitzy Haus

The Schnitzy Haus restaurant website: a marketing site with a hardcoded menu,
a dynamic online ordering system (pickup only, pay in person), a table
reservation system, and a small staff dashboard to manage both. Built with
Next.js (App Router), TypeScript, Tailwind CSS v4, and Prisma/Postgres.

This README is written for whoever maintains the site day-to-day, not just
developers — the sections below tell you exactly which file to open for each
kind of change.

## The 5-minute map: where to change things

| To change...                                   | Edit this file                        |
| ----------------------------------------------- | -------------------------------------- |
| **The menu** (dishes, prices, descriptions)     | `data/menu.ts`                         |
| **Restaurant info** (hours, address, phone, delivery partners) | `data/restaurant.ts`   |
| **Site text** (buttons, headings, form labels)  | `i18n/dictionaries/de.ts` and `en.ts`  |
| **Colors** (brand red, background, etc.)        | `app/globals.css` (the `:root` block) |
| **Fonts**                                       | `app/layout.tsx` (the three `next/font/google` imports at the top) |
| **Legal pages** (Impressum/Datenschutz)         | `app/[locale]/impressum/page.tsx`, `app/[locale]/datenschutz/page.tsx` — **placeholder text, must be replaced with real legal content before going live** |

Everything else (ordering, reservations, the dashboard) is dynamic and
doesn't need code changes for day-to-day use.

## Editing the menu

Open `data/menu.ts`. Every dish is one object in the `menuItems` array:

```ts
{
  id: "beef-burger",           // unique, don't change once orders exist
  category: "burgers",
  name: { de: "Beef Burger", en: "Beef Burger" },
  description: { de: "...", en: "..." },
  priceCents: 1190,            // €11.90 — always in cents, avoids rounding bugs
  popular: true,                // shows it in the homepage highlights
  rating: 4.9,
  ratingCount: 214,
  // image: "/images/menu/beef-burger.jpg",  // see "Adding real photos" below
}
```

To add a dish: copy an existing block, give it a new unique `id`, fill in the
fields. To remove one: delete its block. To 86 something temporarily without
deleting it, just remove it and add it back later — there's no live-inventory
system tying orders to stock counts.

Prices changed here apply instantly to the homepage, the full menu page, and
any new orders. Past orders are unaffected — every order stores a snapshot of
the name and price at the moment it was placed.

### Adding real photos

Until a dish has a photo, it shows a styled placeholder automatically — no
broken image icons. To add a real photo:

1. Put the image file in `public/images/menu/` (e.g. `public/images/menu/beef-burger.jpg`).
2. Set that item's `image` field in `data/menu.ts` to `"/images/menu/beef-burger.jpg"`.

## Editing restaurant info

Open `data/restaurant.ts` for the phone number, email, address(es), opening
hours, social links, and delivery partner links. This file also defines the
operating rules the ordering/reservation systems use:

- `operations.openHour` / `closeHour` — reservations and pickup times outside
  these hours are rejected.
- `operations.pickupLeadTimeMinutes` — how much advance notice the kitchen
  needs (the earliest pickup slot offered at checkout).
- `operations.reservationMaxPartySizeOnline` — groups larger than this are
  asked to call instead of booking online.

## Editing site text / adding a language

All UI copy (nav labels, buttons, headings, form text) lives in
`i18n/dictionaries/de.ts` and `i18n/dictionaries/en.ts`. Both files implement
the same `Dictionary` type (`i18n/types.ts`), so if you add a field to one
without the other, TypeScript will fail the build and tell you exactly what's
missing — it's not possible for the two languages to silently drift apart.

The site defaults to German with an English switcher in the header. To add a
third language: add it to `locales` in `i18n/config.ts`, create
`i18n/dictionaries/<code>.ts`, and TypeScript will point out anything left to
fill in.

The staff dashboard (`/dashboard/...`) is intentionally English-only — it's
an internal tool, not customer-facing.

## Theme (colors & fonts)

Colors are CSS variables defined once in `app/globals.css`, right at the top,
clearly commented. Change `--color-brand` and every button, link, and accent
across the whole site updates.

Fonts are loaded once in `app/layout.tsx` via `next/font/google` — swap the
font name in one of the three `import`/font-loader blocks there (display,
script accent, or body) and it propagates everywhere through the same CSS
variables.

## How ordering & reservations work

- **Ordering**: a customer browses `/menu`, adds items to a cart (stored in
  their browser only), and checks out with their name/phone/email and a
  pickup time. There's no online payment — customers pay in person at
  pickup. The order (with prices recalculated server-side from
  `data/menu.ts`, never trusted from the browser) lands in
  `/dashboard/orders` for staff to prepare and mark as Preparing → Ready →
  Completed.
- **Reservations**: a customer requests a table via `/reservations`. It lands
  in `/dashboard/reservations` as "Pending" for staff to confirm or decline
  by phone/email, then mark Confirmed/Cancelled/Completed in the dashboard.

## The staff dashboard

Visit `/dashboard/login`. Two roles:

- **ADMIN** — everything STAFF can do, plus managing staff accounts
  (`/dashboard/staff`): creating logins, changing roles, deactivating access.
- **STAFF** — views/updates orders and reservations, can't manage other
  accounts.

The very first ADMIN account is created by the seed script (see below), not
through the UI (there's no UI yet when the staff table is empty).

## Local setup

1. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — a Postgres connection string (this project currently
     points at a Supabase Postgres instance).
   - `SESSION_SECRET` — any long random string (`openssl rand -base64 32`).
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — credentials for the first
     dashboard login.
2. Install dependencies. **Use `pnpm`, not `npm`** — in this environment
   `npm install` was unreliable (it repeatedly died mid-install with no
   error message); `pnpm install` worked cleanly every time.
   ```bash
   pnpm install
   ```
3. Push the database schema (creates the `staff_users`, `reservations`,
   `orders`, `order_items` tables):
   ```bash
   pnpm db:push
   ```
4. Create the first ADMIN login:
   ```bash
   pnpm db:seed
   ```
5. Run the dev server:
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000` for the site, `/dashboard/login` for the
   dashboard.

## Deploying to production

- **Database**: this schema is plain Postgres (via Prisma), so it works with
  any Postgres host (Supabase, Neon, RDS, etc.) — just point `DATABASE_URL`
  at it. Run `pnpm db:push` once against the production database before
  first deploy.
- **Legal pages**: replace the placeholder text on the Impressum and
  Datenschutz pages with real, legally reviewed content before going live —
  required for a business operating in Germany.
- **Env vars**: set `DATABASE_URL`, `SESSION_SECRET`, and the `SEED_ADMIN_*`
  vars (for the one-time seed) on your hosting platform.

## Project structure

```
app/
  [locale]/          # public site (de/en) — home, menu, cart, checkout,
                      # reservations, about, contact, locations, legal
  dashboard/         # staff dashboard (English only, session-protected)
  globals.css        # <- theme tokens (colors/fonts)
  layout.tsx          # <- font loading, root <html>
data/
  menu.ts            # <- the menu (single source of truth)
  restaurant.ts       # <- business info + operating rules
i18n/
  dictionaries/      # <- all UI copy, one file per language
lib/
  actions/           # server actions: orders, reservations, auth, staff
  auth/              # password hashing, session signing/verification
  validation/        # zod schemas shared by forms and server actions
components/
  site/              # public-site UI (Header, Footer, MenuItemCard, ...)
  dashboard/         # dashboard-only UI
  cart/              # client-side cart (React context + localStorage)
prisma/
  schema.prisma       # database schema (StaffUser, Reservation, Order, OrderItem)
  seed.ts             # creates the first ADMIN login
```

## Learn More (Next.js)

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
