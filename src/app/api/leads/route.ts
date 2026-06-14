import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import { scoreLead } from "@/lib/lead-scoring";
import { rateLimit } from "@/lib/rate-limit";
import { syncLeadToCrm } from "@/lib/integrations";
import { createAnalyticsRecord, createLeadRecord } from "@/lib/repositories";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`lead:${ip}`, 8, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const scored = { ...parsed.data, ...scoreLead(parsed.data) };
  const record = await createLeadRecord(scored);
  await syncLeadToCrm(scored);
  await createAnalyticsRecord({
    type: "LEAD_SUBMITTED",
    path: "/",
    properties: {
      source: scored.leadSource,
      score: scored.score,
      priority: scored.priority,
    },
  });

  return NextResponse.json({
    ok: true,
    leadId: record?.id ?? null,
    score: scored.score,
    priority: scored.priority,
  });
}
