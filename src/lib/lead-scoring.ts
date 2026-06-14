import type { LeadInput } from "@/lib/schemas";

const sourceWeights: Record<LeadInput["leadSource"], number> = {
  calls: 18,
  paid: 16,
  website: 14,
  referrals: 13,
  social: 11,
  mixed: 12,
};

const revenueWeights: Record<string, number> = {
  "250k-plus": 28,
  "50k-250k": 24,
  "10k-50k": 17,
  "under-10k": 8,
  "pre-revenue": 2,
  unknown: 6,
};

const urgencyKeywords = ["missed", "cold", "manual", "slow", "follow", "booking", "calls", "dm", "ads", "crm", "leads"];

export function scoreLead(input: LeadInput) {
  const source = sourceWeights[input.leadSource] ?? 8;
  const revenue = revenueWeights[input.monthlyRevenue ?? "unknown"] ?? 6;
  const problemText = input.problem.toLowerCase();
  const urgency = urgencyKeywords.reduce((sum, keyword) => sum + (problemText.includes(keyword) ? 4 : 0), 0);
  const lengthSignal = Math.min(12, Math.floor(input.problem.length / 80) * 3);
  const score = Math.min(100, source + revenue + urgency + lengthSignal + 18);

  let priority = "review";
  if (score >= 78) priority = "hot";
  else if (score >= 58) priority = "qualified";
  else if (score <= 36) priority = "nurture";

  return { score, priority };
}
