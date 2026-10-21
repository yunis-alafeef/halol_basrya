import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SchemaJsonLd } from "@/components/schema-json-ld";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSiteSettings } from "@/lib/settings";

/* Body copy — Cairo (excellent Arabic legibility at 16–18px) */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo"
});

/* Display headings — Tajawal (geometric, high-end Arabic typography) */
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://halol-basrya.com";

  return {
    title: {
      default: `${settings.brandName} | دعاية وإعلان وطباعة وتجهيز واجهات`,
      template: `%s | ${settings.brandShortName}`
    },
    description: settings.seoDescription,
    keywords: settings.seoKeywords.split(",").map((k) => k.trim()),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/"
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: siteUrl,
      siteName: settings.brandName,
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [
        {
          url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
          width: 1200,
          height: 630,
          alt: settings.brandName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <head>
        {/* Dynamic theme style injection from site settings */}
        <style id="dynamic-theme-vars" dangerouslySetInnerHTML={{
          __html: `
            :root {
              --navy: ${settings.primaryColor || "#0A2540"};
              --gold: ${settings.secondaryColor || "#D4AF37"};
              --gold-accent: ${settings.accentColor || "#E5A812"};
            }
          `
        }} />
      </head>
      <body className="font-cairo antialiased min-h-screen flex flex-col justify-between pb-16 md:pb-0">
        <a href="#main-content" className="skip-to-content">تجاوز إلى المحتوى الرئيسي</a>
        <SchemaJsonLd settings={settings} />
        <Header settings={settings} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer settings={settings} />
        <MobileStickyBar settings={settings} />
        <ScrollReveal />
      </body>
    </html>
  );
}