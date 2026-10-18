import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({
    brandName: settings.brandName,
    brandShortName: settings.brandShortName,
    tagline: settings.tagline,
    logoUrl: settings.logoUrl,
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    accentColor: settings.accentColor,
    fontFamily: settings.fontFamily,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    workingHours: settings.workingHours,
    commercialRecord: settings.commercialRecord,
    announcementText: settings.announcementText,
    announcementEnabled: settings.announcementEnabled,
    socialTwitter: settings.socialTwitter,
    socialInstagram: settings.socialInstagram,
    socialTiktok: settings.socialTiktok,
    socialLinkedin: settings.socialLinkedin
  });
}
