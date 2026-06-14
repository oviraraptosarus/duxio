import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas";
import { requestBooking } from "@/lib/integrations";
import { createAnalyticsRecord } from "@/lib/repositories";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`booking:${ip}`, 10, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = bookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  await requestBooking(parsed.data);
  await createAnalyticsRecord({
    type: "BOOKING_REQUESTED",
    properties: parsed.data,
  });

  return NextResponse.json({
    ok: true,
    bookingUrl: "https://calendly.com/duxio-ai/30min",
  });
}
