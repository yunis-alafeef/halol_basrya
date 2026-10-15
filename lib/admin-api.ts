import { NextResponse } from "next/server";
import { getCurrentUser, type SessionUser } from "@/lib/auth";

export async function authorize(roles: string[] = ["admin", "editor"]): Promise<{ user: SessionUser | null; response: NextResponse | null }> {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 }) };
  if (!roles.includes(user.role)) return { user: null, response: NextResponse.json({ error: "لا تملك صلاحية لهذه العملية." }, { status: 403 }) };
  return { user, response: null };
}