import { redirect } from "next/navigation";
import { Activity, CalendarCheck, MessageSquareText, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { LiveStatus } from "@/components/admin/live-status";
import { readSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
};

function formatEventType(type: string) {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function AdminPage() {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  const [totalLeads, qualifiedLeads, bookedCalls, conversations, recentLeads, recentEvents] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { priority: { in: ["hot", "qualified"] } } }),
    db.booking.count(),
    db.conversation.count(),
    db.lead.findMany({
      include: { contact: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const pipeline = [
    { label: "New leads", value: totalLeads, detail: "All captured inquiries", icon: Users },
    { label: "Qualified", value: qualifiedLeads, detail: "Hot or qualified score", icon: TrendingUp },
    { label: "Booked calls", value: bookedCalls, detail: "Calendly or booking requests", icon: CalendarCheck },
    { label: "Conversations", value: conversations, detail: "Chat, SMS, email, social", icon: MessageSquareText },
  ];

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">Duxio operations</div>
            <h1 className="serif mt-4 text-5xl leading-none tracking-[-0.06em] text-[var(--ink)] md:text-6xl">
              Live lead desk
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">
              Optional internal view for leads, bookings, conversations, analytics events, and CRM handoff state. The public site can run on
              Formspree and Calendly without exposing this dashboard.
            </p>
          </div>
          <div className="grid gap-3">
            <LiveStatus />
            <div className="rounded-2xl border border-[var(--line)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--ink-muted)]">
              Signed in as <span className="text-[var(--ink)]">{session.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {pipeline.map((item) => (
            <div key={item.label} className="panel rounded-[2rem] p-5">
              <div className="flex items-center justify-between">
                <item.icon size={19} className="text-[var(--signal)]" />
                <span className="mono text-[0.66rem] text-[var(--success)]">live</span>
              </div>
              <div className="serif mt-8 text-5xl leading-none tracking-[-0.06em] text-[var(--ink)]">{item.value}</div>
              <div className="mt-2 text-sm text-[var(--ink-muted)]">{item.label}</div>
              <div className="mt-1 text-xs text-[var(--ink-faint)]">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Lead qualification queue</h2>
              <Activity size={18} className="text-[var(--ink-subtle)]" />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--line)]">
              {recentLeads.length ? (
                recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="grid gap-3 border-b border-[var(--line)] p-4 last:border-b-0 md:grid-cols-[1fr_120px_90px_110px]"
                  >
                    <div>
                      <div className="font-medium text-[var(--ink)]">{lead.company ?? lead.contact.company ?? "New lead"}</div>
                      <div className="mt-1 text-sm text-[var(--ink-subtle)]">{lead.problem}</div>
                      <div className="mt-1 text-xs text-[var(--ink-faint)]">
                        {lead.contact.name ?? "Unknown"} / {lead.contact.email}
                        {lead.contact.phone ? ` / ${lead.contact.phone}` : ""}
                      </div>
                    </div>
                    <div className="text-sm text-[var(--ink-muted)]">{lead.leadSource}</div>
                    <div className="text-sm text-[var(--signal)]">{lead.score}/100</div>
                    <div className="mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--ink-subtle)]">{lead.priority}</div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-sm leading-7 text-[var(--ink-muted)]">
                  No leads yet. When the public form is submitted, qualified leads will appear here automatically.
                </div>
              )}
            </div>
          </section>

          <section className="panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">System health</h2>
              <ShieldCheck size={18} className="text-[var(--success)]" />
            </div>
            <div className="mt-6 grid gap-3">
              {recentEvents.length ? (
                recentEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-[var(--line)] bg-white/[0.025] p-4 text-sm leading-6 text-[var(--ink-muted)]">
                    <div className="text-[var(--ink)]">{formatEventType(event.type)}</div>
                    <div className="mt-1 text-xs text-[var(--ink-faint)]">{event.createdAt.toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-[var(--line)] bg-white/[0.025] p-4 text-sm leading-6 text-[var(--ink-muted)]">
                  Waiting for analytics events. Page views, leads, scorecards, and booking requests will stream into this panel.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
