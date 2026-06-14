import { ArrowRight, AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const auditCheckpoints = [
  {
    title: "Lead Response Speed",
    detail: "How long does it take for a lead to hear back?",
  },
  {
    title: "Booking Friction",
    detail: "How many steps exist between interest and a booked call?",
  },
  {
    title: "Follow-Up Coverage",
    detail: "What percentage of leads receive consistent follow-up?",
  },
  {
    title: "Pipeline Visibility",
    detail: "Can you see where opportunities are being lost?",
  },
  {
    title: "Attribution",
    detail: "Do you know which channels produce revenue?",
  },
  {
    title: "Reactivation",
    detail: "Can dormant leads be recovered automatically?",
  },
];

const commonIssues = [
  "Leads contacted too slowly",
  "Missed call opportunities",
  "No follow-up sequence",
  "CRM handoff failures",
  "Unknown lead sources",
  "Manual booking bottlenecks",
];

export function ProofSection() {
  return (
    <section className="border-y border-[var(--line)] bg-black/20 py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Diagnosis"
          title="Every audit starts with the same six checkpoints."
          copy="Before recommending a system, we identify where demand enters, where it stalls, and where revenue is leaking."
        />

        {/* Linear Revenue Path Diagram */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 rounded-[2rem] border border-[var(--line)] bg-white/[0.02] py-5 px-6">
              {["Lead Source", "Response", "Qualification", "Booking", "Follow-Up", "Reporting"].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-3 md:gap-5">
                  <span className="mono text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-[var(--signal)]">
                    {step}
                  </span>
                  {i < arr.length - 1 && <ArrowRight size={14} className="text-[var(--ink-subtle)]" />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Diagnostic Checkpoints & Common Blockages */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {auditCheckpoints.map((card, index) => (
              <Reveal key={card.title} delay={0.15 + index * 0.05}>
                <div className="h-full rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)] hover:bg-white/[0.045]">
                  <h4 className="font-medium text-[var(--ink)]">{card.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{card.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="h-full rounded-[2rem] border border-[var(--line-strong)] bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
                <AlertTriangle size={18} className="text-[var(--copper-2)]" />
                <h4 className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  Common Issues Found
                </h4>
              </div>
              <ul className="mt-5 space-y-4">
                {commonIssues.map((issue) => (
                  <li key={issue} className="flex items-start gap-3">
                    <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]" />
                    <span className="text-sm leading-6 text-[var(--ink-muted)]">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
