import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#060913", viewportFit: "cover" };

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: SITE.description,
  url: siteUrl,
  email: SITE.email,
  telephone: "+" + SITE.whatsappNumber,
  logo: siteUrl + "/logo.png",
};

export default function RootLayout({ children }) {
  return (
    // "js pre" hides the hero text until the intro hands over; see components/Intro.jsx
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable} js pre`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>
            {
              ".js.pre .hero .ln>span{transform:none}.js.pre .hero .fade{opacity:1;transform:none}#intro{display:none}"
            }
          </style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}
