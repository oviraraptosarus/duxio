import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const cookieName = "duxio_session";

function secretKey() {
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "development-secret-set-auth-secret-before-deploy");
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());

  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function readSession() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, secretKey());
    return verified.payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function verifyAdmin(email: string, password: string) {
  if (email !== (process.env.ADMIN_EMAIL ?? "admin@duxio.ai")) return false;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}
