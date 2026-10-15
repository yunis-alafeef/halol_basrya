import "server-only";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { COOKIE_NAME, readSession } from "@/lib/session-token";
export { COOKIE_NAME, createSession } from "@/lib/session-token";
export async function getCurrentUser() { const token = (await cookies()).get(COOKIE_NAME)?.value; if (!token) return null; const id = await readSession(token); if (!id) return null; return db.user.findUnique({ where: { id }, select: { id: true, username: true, name: true, role: true } }); }
export type SessionUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;