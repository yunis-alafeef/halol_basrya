import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, readSession } from "@/lib/session-token";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin/login") return NextResponse.next();
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const id = token ? await readSession(token) : null;
  if (id) return NextResponse.next();
  if (path.startsWith("/api/")) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  const url = new URL("/admin/login", request.url);
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };