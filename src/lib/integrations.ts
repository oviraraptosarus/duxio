import { logger } from "@/lib/logger";
import type { AnalyticsInput, BookingInput, LeadInput } from "@/lib/schemas";

async function postWebhook(url: string | undefined, payload: unknown) {
  if (!url) return { skipped: true };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with ${response.status}`);
  }

  return { ok: true };
}

export async function syncLeadToCrm(lead: LeadInput & { score: number; priority: string }) {
  try {
    return await postWebhook(process.env.CRM_WEBHOOK_URL, { type: "lead.created", lead });
  } catch (error) {
    logger.error({ error }, "crm sync failed");
    return { ok: false };
  }
}

export async function requestBooking(input: BookingInput) {
  try {
    return await postWebhook(process.env.BOOKING_WEBHOOK_URL, { type: "booking.requested", booking: input });
  } catch (error) {
    logger.error({ error }, "booking sync failed");
    return { ok: false };
  }
}

export async function sendAnalyticsEvent(event: AnalyticsInput) {
  try {
    return await postWebhook(process.env.ANALYTICS_WEBHOOK_URL, { type: "analytics.event", event });
  } catch (error) {
    logger.error({ error }, "analytics sync failed");
    return { ok: false };
  }
}
