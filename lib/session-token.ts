import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "hb_session";

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "halol_basrya_secret_token_default_key_at_least_32_bytes_long"
);

export async function createSession(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function readSession(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
