import { Prisma } from "@/generated/prisma";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import type { AnalyticsInput, ConversationInput, LeadInput, ScorecardInput } from "@/lib/schemas";

function asJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function asJsonRequired(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export async function createLeadRecord(input: LeadInput & { score: number; priority: string }) {
  try {
    const contact = await db.contact.upsert({
      where: { email: input.email },
      create: {
        email: input.email,
        name: input.name,
        company: input.company,
        phone: input.phone,
        source: input.leadSource,
      },
      update: {
        name: input.name,
        company: input.company,
        phone: input.phone,
        source: input.leadSource,
      },
    });

    return db.lead.create({
      data: {
        contactId: contact.id,
        company: input.company,
        leadSource: input.leadSource,
        monthlyRevenue: input.monthlyRevenue,
        problem: input.problem,
        score: input.score,
        priority: input.priority,
      },
    });
  } catch (error) {
    logger.error({ error }, "create lead failed");
    return null;
  }
}

export async function createScorecardRecord(input: ScorecardInput) {
  try {
    return await db.scorecardResult.create({
      data: {
        score: input.score,
        result: input.result,
        answers: asJsonRequired(input.answers),
        source: input.source,
      },
    });
  } catch (error) {
    logger.error({ error }, "create scorecard failed");
    return null;
  }
}

export async function createAnalyticsRecord(input: AnalyticsInput) {
  try {
    return await db.analyticsEvent.create({
      data: {
        type: input.type,
        sessionId: input.sessionId,
        path: input.path,
        referrer: input.referrer,
        properties: asJson(input.properties),
      },
    });
  } catch (error) {
    logger.error({ error }, "create analytics event failed");
    return null;
  }
}

export async function createConversationRecord(input: ConversationInput) {
  try {
    return await db.conversation.create({
      data: {
        channel: input.channel,
        summary: input.message.slice(0, 180),
        messages: {
          create: {
            role: "visitor",
            body: input.message,
            metadata: asJson({ email: input.email, sessionId: input.sessionId }),
          },
        },
      },
      include: { messages: true },
    });
  } catch (error) {
    logger.error({ error }, "create conversation failed");
    return null;
  }
}
