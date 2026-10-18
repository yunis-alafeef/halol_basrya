import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/admin-api";
import { getSiteSettings, updateSiteSettings, resetSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ data: settings });
}

export async function PUT(request: NextRequest) {
  const auth = await authorize(["admin"]);
  if (auth.response) return auth.response;

  try {
    const body = await request.json();
    if (body.reset) {
      const reset = await resetSiteSettings();
      return NextResponse.json({ data: reset, message: "تمت استعادة الإعدادات الافتراضية بنجاح." });
    }

    const updated = await updateSiteSettings(body);
    return NextResponse.json({ data: updated, message: "تم حفظ التغييرات بنجاح." });
  } catch {
    return NextResponse.json({ error: "تعذر حفظ الإعدادات، يرجى التحقق من المدخلات." }, { status: 400 });
  }
}
