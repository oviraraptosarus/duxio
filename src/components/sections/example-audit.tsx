import { AlertTriangle, ArrowRight, CheckCircle2, GitMerge, Activity } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExampleAuditSection() {
  return (
    <section id="audit" className="border-y border-[var(--line)] bg-black/20 py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Procedural Proof"
          title="How we isolate a revenue leak."
          copy="A sample teardown of a standard service business. We do not guess. We map the intake flow, find the friction, and engineer the bypass."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Phase 1: The Diagnosis */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 md:p-8 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)] hover:bg-white/[0.045]">
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-5">
                <Activity size={20} className="text-[var(--ink-muted)]" />
                <h3 className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  Baseline Architecture
                </h3>
              </div>
              
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                    Profile
                  </div>
                  <div className="mt-2 text-sm font-medium text-[var(--ink)]">
                    High-Ticket B2B Service
                  </div>
                </div>
                <div>
                  <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                    Current Flow
                  </div>
                  <div className="mt-2 text-sm font-medium text-[var(--ink)]">
                    Contact Form → Email → Manual Triage
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--line-strong)] bg-white/[0.02] p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[var(--copper-2)]" />
                  <div>
                    <div className="font-medium text-[var(--ink)]">The Primary Leak</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                      48-hour delay between inbound inquiry and qualification. High-intent leads are cooling off before a human initiates the booking sequence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Phase 2: The Engineering */}
          <Reveal delay={0.2}>
            <div className="h-full rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 md:p-8 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)] hover:bg-white/[0.045]">
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-5">
                <GitMerge size={20} className="text-[var(--signal)]" />
                <h3 className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  System Implementation
                </h3>
              </div>

              <div className="mt-6">
                <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  The Fix: Triage & Routing Engine
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.02] p-4">
                    <CheckCircle2 size={16} className="text-[var(--signal)]" />
                    <span className="text-sm text-[var(--ink-muted)]">Instant data capture via conditional logic form</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.02] p-4">
                    <CheckCircle2 size={16} className="text-[var(--signal)]" />
                    <span className="text-sm text-[var(--ink-muted)]">Automated CRM scoring based on budget inputs</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.02] p-4">
                    <CheckCircle2 size={16} className="text-[var(--signal)]" />
                    <span className="text-sm text-[var(--ink-muted)]">Direct Calendly routing for qualified profiles</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--line-strong)] bg-[var(--success)]/10 p-5">
                <div className="flex items-start gap-3">
                  <ArrowRight size={18} className="mt-0.5 shrink-0 text-[var(--success)]" />
                  <div>
                    <div className="font-medium text-[var(--success)]">Projected Impact</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--success)]/80">
                      Speed-to-lead drops to 0 minutes. Qualification happens asynchronously. Estimated 30%+ increase in booked meetings from existing demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
