import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/sections/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";

export function ConversionSection() {
  return (
    <section id="book" className="border-y border-[var(--line)] bg-black/25 py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Book"
            title="Bring the leak. Leave with the first system to fix."
            copy="Tell us where leads are slipping right now. We will identify the highest-impact system to build first and show you exactly what happens next."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-5">
              <div className="flex gap-3">
                <ShieldCheck size={20} className="mt-1 shrink-0 text-[var(--success)]" />
                <p className="text-sm leading-7 text-[var(--ink-muted)]">
                  Your inquiry is used to diagnose the revenue path, not to start a spam sequence. We keep the call focused:
                  where demand enters, where it stalls, and which system should be built first.
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
