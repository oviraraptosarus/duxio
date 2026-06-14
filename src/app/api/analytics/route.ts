import { NextRequest, NextResponse } from "next/server";
import { analyticsSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { sendAnalyticsEvent } from "@/lib/integrations";
import { createAnalyticsRecord } from "@/lib/repositories";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`analytics:${ip}`, 80, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = analyticsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid analytics payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  await createAnalyticsRecord(parsed.data);
  await sendAnalyticsEvent(parsed.data);

  return NextResponse.json({ ok: true });
}
