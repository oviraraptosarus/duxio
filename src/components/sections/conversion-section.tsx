import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/sections/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";

export function ConversionSection() {
  return (
    <section id="book" className="border-y border-[var(--line)] bg-black/25 py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Revenue Audit"
            title="Find the revenue leak costing you the most."
            copy="In 15 minutes, we'll identify the highest-impact bottleneck in your revenue path and show you the next system worth building."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 md:p-8">
              <div className="mono mb-5 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--signal)]">
                15-Minute Revenue Diagnosis
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--copper-2)]" />
                  <span className="text-[var(--ink)]">Identify the largest revenue leak</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--copper-2)]" />
                  <span className="text-[var(--ink)]">Prioritize the highest-leverage fix</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--copper-2)]" />
                  <span className="text-[var(--ink)]">Leave with a clear implementation path</span>
                </li>
              </ul>

              <div className="mt-7 border-t border-[var(--line-strong)] pt-5">
                <p className="text-sm font-medium text-[var(--ink-muted)]">
                  No obligation. You'll leave with a clear next step whether we work together or not.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
