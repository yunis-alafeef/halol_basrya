import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export async function POST(request: NextRequest) {
  const auth = await authorize();
  if (auth.response) return auth.response;

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "اختر صورة أولًا." }, { status: 400 });
    if (!allowed.has(file.type)) return NextResponse.json({ error: "نوع الصورة غير مدعوم." }, { status: 415 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "الحد الأقصى لحجم الصورة 5 ميجابايت." }, { status: 413 });

    // If BLOB_READ_WRITE_TOKEN is configured, use Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || "image";
        const blob = await put(safeName, file, { access: "public", addRandomSuffix: true });
        return NextResponse.json({ url: blob.url });
      } catch (err) {
        console.warn("[AI Studio] Vercel blob upload failed, falling back to data URL:", err);
      }
    }

    // In-memory data URL fallback for AI Studio container
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    return NextResponse.json({ url: dataUrl });
  } catch {
    return NextResponse.json({ error: "تعذر رفع الصورة." }, { status: 502 });
  }
}