import {
  Activity,
  BrainCircuit,
  CalendarCheck,
  ChartNoAxesCombined,
  Gauge,
  Handshake,
  Inbox,
  MessageSquareText,
  PhoneMissed,
  Radar,
  ShieldCheck,
  Split,
  Workflow,
} from "lucide-react";

export const navItems = [
  { label: "Leaks", href: "#leaks" },
  { label: "System", href: "#system" },
  { label: "Services", href: "#services" },
  { label: "Audit", href: "#audit" },
  { label: "Scorecard", href: "#scorecard" },
  { label: "Book", href: "#book" },
];

export const revenueLeaks = [
  {
    label: "Response leak",
    title: "New inquiries wait until someone has time.",
    detail:
      "A person raises their hand, then sits in an inbox while your team is busy. By the time someone replies, the urgency is gone or a competitor has already answered.",
  },
  {
    label: "Capture leak",
    title: "Attention does not become a contact.",
    detail:
      "Social views, ad clicks, QR scans, and site visits create interest, but the business has no reliable mechanism to turn that interest into a reachable lead.",
  },
  {
    label: "Booking leak",
    title: "Scheduling depends on back-and-forth.",
    detail:
      "Qualified prospects still have to ask for times, wait for replies, miss reminders, and fall out of the pipeline before the first real conversation.",
  },
  {
    label: "Pipeline leak",
    title: "Every lead lives in a different place.",
    detail:
      "Calls, forms, DMs, and referrals scatter across tools. Nobody has one clean view of who is hot, who needs follow-up, and what is stuck.",
  },
  {
    label: "Follow-up leak",
    title: "Revenue depends on memory.",
    detail:
      "Reviews, referrals, upsells, reactivations, and no-show recovery happen only when someone remembers to do them.",
  },
  {
    label: "Visibility leak",
    title: "You cannot improve what you cannot see.",
    detail:
      "The business can feel that leads are slipping, but it cannot see the source, delay, stage, and conversion behavior clearly enough to fix the right thing first.",
  },
];

export const heroMetrics = [
  { value: "<5m", label: "Target first response", detail: "The system routes new demand before interest decays." },
  { value: "7d", label: "Pilot launch window", detail: "One contained system ships before momentum goes cold." },
  { value: "24/7", label: "Capture coverage", detail: "Calls, forms, DMs, scorecards, and booking events stay connected." },
];

export const leakCards = [
  {
    icon: PhoneMissed,
    title: "Missed calls",
    before: "A prospect calls, gets voicemail, and moves on.",
    after: "Instant text-back, qualification, routing, and booking.",
  },
  {
    icon: MessageSquareText,
    title: "Slow DMs",
    before: "Interest lands in Instagram while the owner is busy.",
    after: "AI-assisted triage qualifies intent and escalates real opportunities.",
  },
  {
    icon: Inbox,
    title: "Loose forms",
    before: "Contact forms create emails, not pipeline movement.",
    after: "Every submission becomes a scored contact with next-step automation.",
  },
  {
    icon: CalendarCheck,
    title: "Manual booking",
    before: "Scheduling depends on back-and-forth messages.",
    after: "Calendar, reminders, no-show recovery, and CRM stage updates run together.",
  },
];

export const operatingSystem = [
  {
    icon: Radar,
    title: "Demand capture",
    detail: "Pages, QR paths, social triggers, forms, calls, and DMs built around a single conversion spine.",
  },
  {
    icon: BrainCircuit,
    title: "Qualification logic",
    detail: "Scorecards and intake flows segment fit, urgency, source, budget, and operational pain before a call is booked.",
  },
  {
    icon: Workflow,
    title: "Automation layer",
    detail: "CRM stages, SMS, email, internal alerts, reminders, handoffs, and recovery sequences with human override.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Revenue telemetry",
    detail: "Event streams show where demand enters, where it stalls, what converts, and which systems need refinement.",
  },
];

export const methodSteps = [
  {
    step: "01",
    title: "Map the leak",
    detail: "We model the business around demand source, response window, qualification friction, booking friction, and follow-up debt.",
  },
  {
    step: "02",
    title: "Ship the smallest revenue machine",
    detail: "One focused pilot: missed-call recovery, DM capture, funnel page, CRM routing, or reactivation sequence.",
  },
  {
    step: "03",
    title: "Instrument the behavior",
    detail: "Every meaningful user action becomes an event that informs lead score, attribution, and system improvement.",
  },
  {
    step: "04",
    title: "Compound what works",
    detail: "The pilot becomes the first module in a larger operating system instead of a one-off automation.",
  },
];

export const serviceGroups = [
  {
    value: "capture",
    label: "Capture",
    services: [
      { icon: PhoneMissed, title: "Missed-call recovery", detail: "Text-back, qualification, routing, and booking after every unanswered call." },
      { icon: MessageSquareText, title: "DM and chat triage", detail: "Structured AI-assisted responses for social, SMS, and site conversations." },
      { icon: Split, title: "Conversion pages", detail: "Focused pages with one job: convert attention into a scored contact." },
    ],
  },
  {
    value: "pipeline",
    label: "Pipeline",
    services: [
      { icon: Workflow, title: "CRM cleanup", detail: "Stages, owners, alerts, and follow-up rules that make every lead easy to see and move." },
      { icon: CalendarCheck, title: "Booking orchestration", detail: "Calendar routing, reminders, no-show recovery, and post-call transitions." },
      { icon: Handshake, title: "Reactivation loops", detail: "Referral, review, upsell, and win-back sequences for existing customers." },
    ],
  },
  {
    value: "intelligence",
    label: "Intelligence",
    services: [
      { icon: Gauge, title: "Lead scoring", detail: "Fit, urgency, source, budget, and behavior translated into priority." },
      { icon: Activity, title: "Analytics pipeline", detail: "Client-side events, server-side events, attribution, and conversion reporting." },
      { icon: ShieldCheck, title: "System controls", detail: "Clear permissions, handoff rules, data hygiene, and alerts when an integration needs attention." },
    ],
  },
];

export const proofPoints = [
  "No package is sold before the leak is named.",
  "Every build has an owner, an SLA, and a measurement plan.",
  "Automation is designed with human override and failure states.",
  "Clients leave with infrastructure, not just a prettier page.",
];

export const scorecardQuestions = [
  {
    id: "response_speed",
    question: "When a qualified inquiry arrives, what happens in the first five minutes?",
    options: [
      { label: "Nothing reliable", score: 0 },
      { label: "A basic auto-reply", score: 1 },
      { label: "It is routed, scored, and moved forward", score: 2 },
    ],
  },
  {
    id: "missed_calls",
    question: "What happens after a missed call from a potential buyer?",
    options: [
      { label: "They call back if they want to", score: 0 },
      { label: "Someone follows up manually", score: 1 },
      { label: "Text-back and booking fire automatically", score: 2 },
    ],
  },
  {
    id: "source_tracking",
    question: "Can you see which demand sources become booked conversations?",
    options: [
      { label: "No, mostly guesswork", score: 0 },
      { label: "Some source visibility", score: 1 },
      { label: "Yes, tied to pipeline and outcomes", score: 2 },
    ],
  },
  {
    id: "follow_up",
    question: "How much follow-up happens without someone remembering to do it?",
    options: [
      { label: "Almost none", score: 0 },
      { label: "Some reminders and templates", score: 1 },
      { label: "Sequences run by stage and behavior", score: 2 },
    ],
  },
  {
    id: "reactivation",
    question: "What happens after a customer buys once?",
    options: [
      { label: "The relationship goes quiet", score: 0 },
      { label: "Occasional manual outreach", score: 1 },
      { label: "Review, referral, upsell, and win-back loops run", score: 2 },
    ],
  },
];

export const trustSystems = [
  { icon: ShieldCheck, title: "Human override", detail: "Automations handle speed and routing. Your team keeps control over edge cases, approvals, and high-value conversations." },
  { icon: Gauge, title: "Measured outcomes", detail: "Every system starts with a target behavior: response time, booked calls, recovered leads, show rate, or reactivation volume." },
  { icon: Workflow, title: "Clean handoffs", detail: "Each trigger has an owner, a next step, a failure state, and a fallback so leads do not disappear between tools." },
  { icon: ChartNoAxesCombined, title: "Visible pipeline", detail: "You can see what came in, where it came from, who followed up, and what needs attention next." },
];

export const faqs = [
  {
    question: "Is Duxio a website agency?",
    answer:
      "No. A page may be part of the build, but the core work is the system behind it: capture, qualification, booking, CRM routing, follow-up, measurement, and improvement.",
  },
  {
    question: "What is built in the first week?",
    answer:
      "One constrained revenue system with a measurable behavior change. Examples include missed-call recovery, DM triage, booking automation, CRM routing, a scorecard funnel, or a reactivation sequence.",
  },
  {
    question: "How do you avoid generic AI automation?",
    answer:
      "Every automation is designed from the business workflow backward. It has a specific trigger, qualification logic, owner, failure state, and metric. AI is used where it improves judgment or speed, not as a visual gimmick.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Usually access to the tools involved, a short walkthrough of how leads currently arrive, and quick feedback when the first version is live. We keep the lift on your side low.",
  },
];
