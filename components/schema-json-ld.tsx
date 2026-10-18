import type { SiteSettings } from "@/lib/settings";

export function SchemaJsonLd({ settings }: { settings: SiteSettings }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://halol-basrya.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: settings.brandName,
    alternateName: settings.brandShortName,
    description: settings.seoDescription,
    url: siteUrl,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "الرياض",
      addressRegion: "منطقة الرياض",
      addressCountry: "SA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.6877",
      longitude: "46.7219"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "22:00"
      }
    ],
    priceRange: "$$",
    sameAs: [
      settings.socialTwitter,
      settings.socialInstagram,
      settings.socialTiktok,
      settings.socialLinkedin
    ].filter(Boolean)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
