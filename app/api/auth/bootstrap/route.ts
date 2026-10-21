import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { COOKIE_NAME, createSession } from "@/lib/session-token";
export const dynamic = "force-dynamic";
// One-time admin bootstrap for a brand-new database on the hosting provider.
// It works ONLY while the users table is empty and ONLY with the credentials
// stored in ADMIN_USERNAME / ADMIN_BOOTSTRAP_PASSWORD environment variables.
export async function POST() {
  const username = process.env.ADMIN_USERNAME?.trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || process.env.ADMIN_PASSWORD;
  if (!username || !password) return NextResponse.json({ error: "لم يتم إعداد بيانات المدير الأولى على الخادم." }, { status: 503 });
  try {
    const existing = await db.user.count();
    if (existing > 0) return NextResponse.json({ error: "الحساب الأول موجود بالفعل. سجّل الدخول مباشرة." }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { username, name: "مدير الموقع", passwordHash, role: "admin" },
      select: { id: true, username: true, name: true, role: true, passwordHash: true }
    });
    // Never trust the mock fallback: make sure the stored hash really matches.
    if (!(await bcrypt.compare(password, user.passwordHash))) return NextResponse.json({ error: "تعذر حفظ الحساب في قاعدة البيانات الحقيقية. تحقق من DATABASE_URL على الاستضافة." }, { status: 500 });
    const token = await createSession(user.id);
    const response = NextResponse.json({ data: { name: user.name, username: user.username, role: user.role } }, { status: 201 });
    response.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8 * 60 * 60, path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "تعذر إنشاء حساب المدير. تحقق من اتصال قاعدة البيانات." }, { status: 500 });
  }
}
