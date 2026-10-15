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
 const user = await db.user.findUnique({ where: { username: input.username } }); const valid = user ? await bcrypt.compare(input.password, user.passwordHash) : false; if (!user || !valid || !["admin", "editor"].includes(user.role)) return NextResponse.json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة." }, { status: 401 });
 attempts.delete(ip); const token = await createSession(user.id); const response = NextResponse.json({ user: { name: user.name, username: user.username, role: user.role } }); response.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 8 * 60 * 60, path: "/" }); return response;
}