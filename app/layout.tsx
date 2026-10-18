import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SchemaJsonLd } from "@/components/schema-json-ld";
import { getSiteSettings } from "@/lib/settings";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo"
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
    <html lang="ar" dir="rtl" className={cairo.variable}>
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
      <body className="font-cairo antialiased min-h-screen flex flex-col justify-between">
        <SchemaJsonLd settings={settings} />
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}