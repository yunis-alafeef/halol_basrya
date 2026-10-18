import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export const dynamic = "force-dynamic";
const schema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().email().max(254), phone: z.string().trim().max(40).optional().default(""), subject: z.string().trim().min(3).max(160), message: z.string().trim().min(10).max(5000), website: z.string().max(200).optional() });
export async function POST(request: NextRequest) {
 let data; try { data = schema.parse(await request.json()); } catch { return NextResponse.json({ error: "تحقق من الحقول المطلوبة وحاول مرة أخرى." }, { status: 400 }); }
 if (data.website) return NextResponse.json({ ok: true });
 const key = process.env.RESEND_API_KEY; const from = process.env.RESEND_FROM_EMAIL; const to = process.env.CONTACT_TO_EMAIL; if (!key || !from || !to) { console.log("[AI Studio] Contact submission:", data); return NextResponse.json({ ok: true, notice: "تم استلام رسالتك بنجاح." }); }
 const text = ["رسالة جديدة من نموذج حلول بصرية", "", "الاسم: " + data.name, "البريد: " + data.email, "الهاتف: " + (data.phone || "غير مذكور"), "الموضوع: " + data.subject, "", data.message].join("\n");
 try { const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: "رسالة الموقع: " + data.subject, text }) }); if (!response.ok) return NextResponse.json({ error: "تعذر إرسال الرسالة حاليًا. حاول لاحقًا." }, { status: 502 }); return NextResponse.json({ ok: true }); } catch { return NextResponse.json({ error: "تعذر إرسال الرسالة حاليًا. حاول لاحقًا." }, { status: 502 }); }
}