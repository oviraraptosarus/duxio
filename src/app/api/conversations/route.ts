import { NextRequest, NextResponse } from "next/server";
import { conversationSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { createAnalyticsRecord, createConversationRecord } from "@/lib/repositories";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const bucket = rateLimit(`conversation:${ip}`, 20, 60_000);

  if (!bucket.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = conversationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid conversation payload", issues: parsed.error.flatten() }, { status: 400 });
  }

  const record = await createConversationRecord(parsed.data);
  await createAnalyticsRecord({
    type: "CHAT_MESSAGE",
    sessionId: parsed.data.sessionId,
    properties: {
      channel: parsed.data.channel,
      hasEmail: Boolean(parsed.data.email),
    },
  });

  return NextResponse.json({
    ok: true,
    conversationId: record?.id ?? null,
    reply:
      "That is a useful signal. The highest leverage next step is to map where the first handoff fails, then build one system around that moment.",
  });
}
