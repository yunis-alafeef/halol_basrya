export interface SiteSettings {
  id: string;
  brandName: string;
  brandShortName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  commercialRecord: string;
  announcementText: string;
  announcementEnabled: boolean;
  socialTwitter: string;
  socialInstagram: string;
  socialTiktok: string;
  socialLinkedin: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  updatedAt: string;
}

export const defaultSettings: SiteSettings = {
  id: "global-settings",
  brandName: "حلول بصير للدعاية والإعلان",
  brandShortName: "حلول بصير",
  tagline: "نصنع حضورًا بصريًا استثنائيًا يُميز علامتك التجارية ويترك أثرًا راسخًا",
  logoUrl: "",
  primaryColor: "#0B1426",
  secondaryColor: "#C59D5F",
  accentColor: "#B88A4B",
  fontFamily: "Cairo, Tajawal",
  phone: "+966 50 123 4567",
  whatsapp: "966501234567",
  email: "info@halol-basrya.com",
  address: "المملكة العربية السعودية، الرياض، حي الملز",
  workingHours: "السبت - الخميس: 9:00 ص - 10:00 م",
  commercialRecord: "سجل تجاري معتمد: 1010894521",
  announcementText: "✦ احصل على معاينة وتصميم استرشادي مجاني لمشروعك الإعلاني الجديد — تواصل معنا اليوم",
  announcementEnabled: true,
  socialTwitter: "https://x.com",
  socialInstagram: "https://instagram.com",
  socialTiktok: "https://tiktok.com",
  socialLinkedin: "https://linkedin.com",
  seoTitle: "حلول بصير | دعاية وإعلان وطباعة وتجهيز واجهات إعلانية",
  seoDescription: "حلول متكاملة للدعاية والإعلان: حروف بارزة مضيئة، واجهات كلادينج، لوحات المشاريع، طباعة رقمية وأوفست، دروع تكريمية وهدايا دعائية في المملكة العربية السعودية.",
  seoKeywords: "دعاية وإعلان, لوحات حروف بارزة, واجهات كلادينج, طباعة رقمية, دروع تكريمية, هدايا دعائية, الرياض, حلول بصير",
  updatedAt: new Date().toISOString()
};

// Global in-memory storage for active site settings
const globalStore = globalThis as unknown as {
  __site_settings?: SiteSettings;
};

if (!globalStore.__site_settings) {
  globalStore.__site_settings = { ...defaultSettings };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return globalStore.__site_settings ? { ...globalStore.__site_settings } : { ...defaultSettings };
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  if (!globalStore.__site_settings) {
    globalStore.__site_settings = { ...defaultSettings };
  }
  globalStore.__site_settings = {
    ...globalStore.__site_settings,
    ...data,
    id: "global-settings",
    updatedAt: new Date().toISOString()
  };
  return { ...globalStore.__site_settings };
}

export async function resetSiteSettings(): Promise<SiteSettings> {
  globalStore.__site_settings = { ...defaultSettings, updatedAt: new Date().toISOString() };
  return { ...globalStore.__site_settings };
}
