import { NextRequest, NextResponse } from "next/server";
import { scorecardSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { createAnalyticsRecord, createScorecardRecord } from "@/lib/repositories";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`scorecard:${ip}`, 20, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = scorecardSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid scorecard payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const record = await createScorecardRecord(parsed.data);
  await createAnalyticsRecord({
    type: "SCORECARD_COMPLETED",
    properties: {
      score: parsed.data.score,
      result: parsed.data.result,
    },
  });

  return NextResponse.json({ ok: true, scorecardId: record?.id ?? null });
}
