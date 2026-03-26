import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE } from "@shared/constants";
import LenisProvider from "@frontend/components/shared/LenisProvider";
import Navbar from "@frontend/components/layout/Navbar";
import Footer from "@frontend/components/layout/Footer";
import SchemaOrg from "@frontend/components/shared/SchemaOrg";
import AuthProvider from "@frontend/components/shared/AuthProvider";
import Preloader from "@frontend/components/shared/Preloader";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <Preloader />
        <AuthProvider>
          <LenisProvider>
            <SchemaOrg />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
          </LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
