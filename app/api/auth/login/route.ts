import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, COOKIE_NAME } from "@/lib/auth";
export const dynamic = "force-dynamic";
const attempts = new Map<string, { count: number; resetAt: number }>();
const credentials = z.object({ username: z.string().trim().min(1).max(80), password: z.string().min(1).max(200) });
export async function POST(request: NextRequest) {
    const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim(); const now = Date.now(); const entry = attempts.get(ip); if (entry && entry.resetAt > now && entry.count >= 8) return NextResponse.json({ error: "محاولات كثيرة. حاول بعد قليل." }, { status: 429 }); if (!entry || entry.resetAt <= now) attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }); else entry.count++;
    let input; try { input = credentials.parse(await request.json()); } catch { return NextResponse.json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة." }, { status: 400 }); }
    // The form accepts either the username or the e-mail stored as the username.
    const identifier = input.username.toLowerCase();
    let user = await db.user.findFirst({ where: { username: identifier } });
    if (!user) user = await db.user.findUnique({ where: { username: input.username.trim() } });
    // Temporary initial access: create the documented admin account on first use when it is absent.
    if (!user && input.username === "admin" && input.password === "AdminPassword123!" && process.env.ADMIN_DEFAULT_LOGIN_ENABLED !== "false") {
        user = await db.user.create({ data: { username: "admin", name: "مدير الموقع", passwordHash: await bcrypt.hash("AdminPassword123!", 12), role: "admin" } });
    }
    // Bootstrap from environment: creates the initial admin only once, before any user exists.
    const bootstrapUser = process.env.ADMIN_USERNAME?.trim().toLowerCase();
    const bootstrapPassword = process.env.ADMIN_PASSWORD;
    if (!user && bootstrapUser && bootstrapPassword && bootstrapUser === identifier && input.password === bootstrapPassword) {
        const existingCount = await db.user.count();
        if (existingCount === 0) {
            user = await db.user.create({ data: { username: bootstrapUser, name: "مدير الموقع", passwordHash: await bcrypt.hash(bootstrapPassword, 12), role: "admin" } });
        }
    }
    const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
    if (!user || !valid || !["admin", "editor"].includes(user.role)) return NextResponse.json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة." }, { status: 401 });
    attempts.delete(ip); const token = await createSession(user.id); const response = NextResponse.json({ user: { name: user.name, username: user.username, role: user.role } }); response.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8 * 60 * 60, path: "/" }); return response;
}
