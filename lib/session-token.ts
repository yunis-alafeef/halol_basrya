import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "hb_session";

function getSecret(): Uint8Array {
  const value = process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && (!value || value.length < 32)) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in production.");
  }
  return new TextEncoder().encode(value || "development-only-session-secret-change-me");
}

export async function createSession(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function readSession(token: string): Promise<string | null> {
  const secret = getSecret();
  try {
    const { payload } = await jwtVerify(token, secret);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
