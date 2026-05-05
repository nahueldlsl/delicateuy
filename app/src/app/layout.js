import "./globals.css";
import { Nunito, Fraunces, Caveat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "delicate by Viky — Pastelería artesanal en Punta del Este",
  description:
    "Cookies estilo NY, roles de canela y más. Hechos en casa, para vos. Pedí online con retiro o delivery en Maldonado.",
  keywords: [
    "pastelería artesanal",
    "cookies",
    "roles de canela",
    "Punta del Este",
    "Maldonado",
    "delivery",
    "delicate by Viky",
  ],
  openGraph: {
    title: "delicate by Viky — Pastelería artesanal",
    description:
      "Cookies, roles de canela y más. Hechos en casa, para vos.",
    type: "website",
    locale: "es_UY",
  },
  icons: {
    icon: "/logo-sticker.svg",
    apple: "/logo-sticker.svg",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "delicate by Viky",
    "image": "https://delicate.com.uy/logo-og.jpg",
    "@id": "https://delicate.com.uy",
    "url": "https://delicate.com.uy",
    "telephone": "+59899000000",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maldonado Centro",
      "addressLocality": "Maldonado",
      "addressRegion": "Maldonado",
      "postalCode": "20000",
      "addressCountry": "UY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.9011,
      "longitude": -54.9506
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": ["https://www.instagram.com/delicateuy_/"]
  };

  return (
    <html
      lang="es"
      className={`${nunito.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
    >
      <body
        className="min-h-screen flex flex-col bg-cream-50 text-choc-900 font-body"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
