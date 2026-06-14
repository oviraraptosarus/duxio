import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { proofPoints } from "@/lib/content";

export function ProofSection() {
  return (
    <section className="border-y border-[var(--line)] bg-black/20 py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Trust"
          title="Built fast, but not loose."
          copy="The first system is intentionally small enough to ship quickly and important enough to matter. Scope, owner, success metric, fallback, and next step are defined before anything goes live."
        />
        <Reveal>
          <div className="panel rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.03] p-4">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-[var(--success)]" />
                  <p className="text-sm leading-6 text-[var(--ink-muted)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
