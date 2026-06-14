import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  phone: z.string().trim().min(7).max(32),
  company: z.string().trim().min(2).max(160),
  monthlyRevenue: z.string().trim().optional().default("unknown"),
  leadSource: z.enum(["social", "website", "calls", "referrals", "paid", "mixed"]),
  problem: z.string().trim().min(12).max(1400),
});

export const scorecardSchema = z.object({
  score: z.number().int().min(0).max(10),
  answers: z.record(z.string(), z.number().int().min(0).max(2)),
  result: z.string().trim().min(2).max(120),
  source: z.string().trim().max(80).optional(),
});

export const bookingSchema = z.object({
  email: z.email(),
  requestedPath: z.string().trim().min(2).max(80),
  timezone: z.string().trim().max(80).optional(),
});

export const analyticsSchema = z.object({
  type: z.enum([
    "PAGE_VIEW",
    "CTA_CLICK",
    "SCORECARD_STARTED",
    "SCORECARD_COMPLETED",
    "LEAD_SUBMITTED",
    "BOOKING_REQUESTED",
    "CHAT_MESSAGE",
    "ADMIN_ACTION",
  ]),
  sessionId: z.string().trim().max(120).optional(),
  path: z.string().trim().max(320).optional(),
  referrer: z.string().trim().max(320).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

export const conversationSchema = z.object({
  email: z.email().optional(),
  channel: z.enum(["site_chat", "sms", "instagram", "email"]).default("site_chat"),
  message: z.string().trim().min(1).max(1200),
  sessionId: z.string().trim().max(120).optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ScorecardInput = z.infer<typeof scorecardSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type AnalyticsInput = z.infer<typeof analyticsSchema>;
export type ConversationInput = z.infer<typeof conversationSchema>;
