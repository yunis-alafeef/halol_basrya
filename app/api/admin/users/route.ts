import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { authorize } from "@/lib/admin-api";
export const dynamic = "force-dynamic";
const createSchema = z.object({ username: z.string().trim().min(3).max(40).regex(/^[a-zA-Z0-9._-]+$/), name: z.string().trim().min(2).max(100), password: z.string().min(12).max(200), role: z.enum(["admin", "editor"]) });
export async function GET() { const auth = await authorize(["admin"]); if (auth.response) return auth.response; const users = await db.user.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, username: true, name: true, role: true, createdAt: true } }); return NextResponse.json({ data: users }); }
export async function POST(request: NextRequest) { const auth = await authorize(["admin"]); if (auth.response) return auth.response; try { const data = createSchema.parse(await request.json()); const passwordHash = await bcrypt.hash(data.password, 12); const user = await db.user.create({ data: { username: data.username, name: data.name, role: data.role, passwordHash }, select: { id: true, username: true, name: true, role: true } }); return NextResponse.json({ data: user }, { status: 201 }); } catch (error) { if (error && typeof error === "object" && "issues" in error) return NextResponse.json({ error: "تحقق من البيانات، وكلمة المرور يجب أن تتكون من 12 محرفًا على الأقل." }, { status: 400 }); return NextResponse.json({ error: "اسم المستخدم مستخدم مسبقًا أو تعذر إنشاء الحساب." }, { status: 409 }); } }