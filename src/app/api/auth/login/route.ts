import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyAdmin } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`login:${ip}`, 6, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many login attempts" }, { status: 429 });
  }

  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid login payload" }, { status: 400 });
  }

  const valid = await verifyAdmin(parsed.data.email, parsed.data.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(parsed.data.email);
  return NextResponse.json({ ok: true });
}
