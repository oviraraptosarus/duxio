import { AlertTriangle, ArrowRight, CheckCircle2, GitMerge, Activity, FileText, Map, LayoutTemplate } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function ExampleAuditSection() {
  return (
    <section id="audit" className="border-y border-[var(--line)] bg-black/20 py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Procedural Proof"
          title="How we isolate a revenue leak."
          copy="A sample teardown of a standard service business. We do not guess. We map the intake flow, find the friction, and engineer the bypass."
        />

        {/* Trust Strip */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-[var(--ink-muted)]">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[var(--copper-2)]" />
              <span>15 Pages</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[var(--copper-2)]" />
              <span>Revenue Flow Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Map size={16} className="text-[var(--copper-2)]" />
              <span>Implementation Roadmap</span>
            </div>
            <div className="flex items-center gap-2">
              <LayoutTemplate size={16} className="text-[var(--copper-2)]" />
              <span>System Architecture</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Phase 1: The Diagnosis */}
          <Reveal delay={0.2}>
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
          <Reveal delay={0.3}>
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

        {/* Conversion Layer */}
        <Reveal delay={0.4}>
          <div className="mt-14 flex flex-col items-start border-t border-[var(--line)] pt-10">
            <p className="mb-6 text-sm font-medium text-[var(--ink-muted)]">
              See the complete audit methodology used by Duxio.
            </p>
            {/* The button classes are now updated to be glass-themed with visible white text */}
            <Button asChild size="lg" className="rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-xl text-[var(--ink)] hover:bg-white/[0.12]">
              <a 
                href="https://drive.google.com/file/d/1InXc3bf74VdJKK7BS5fAtnFT88zR2LHL/view?usp=drivesdk" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Full Audit
                <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
