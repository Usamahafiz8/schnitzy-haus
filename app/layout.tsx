import type { Metadata } from "next";
import { Anton, Caveat, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

/**
 * THE font control point for the whole site. Swap any Google Font here (or
 * switch to a local font via `next/font/local`) and it propagates everywhere
 * through the `--font-schnitzy-*` CSS variables wired up in `globals.css`.
 *
 * - display: big poster-style headlines ("PREMIUM BURGERS")
 * - script:  red handwritten flourish accents ("Frankfurt's Home of")
 * - sans:    everything else (body copy, nav, buttons, forms)
 */
const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-schnitzy-display",
});

const script = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-schnitzy-script",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-schnitzy-sans",
});

export const metadata: Metadata = {
  title: "Schnitzy Haus",
  description: "Premium Burgers & Bowls",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const lang = headersList.get("x-locale") ?? "en";

  return (
    <html
      lang={lang}
      className={`${display.variable} ${script.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
