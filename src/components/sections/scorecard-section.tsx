import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScorecardClient } from "@/components/sections/scorecard-client";

export function ScorecardSection() {
  return (
    <section id="scorecard" className="border-y border-[var(--line)] bg-white/[0.025] py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="Scorecard"
          title="Find the leak before you book the call."
          copy="Answer five questions about response speed, missed calls, attribution, follow-up, and reactivation. You will know what is costing you money before we talk."
        />
        <Reveal>
          <ScorecardClient />
        </Reveal>
      </div>
    </section>
  );
}
