import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustSystems } from "@/lib/content";

export function TrustSection() {
  return (
    <section id="trust" className="py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Trust"
          title="Built around systems, not guesswork."
          copy="Every recommendation starts with a measurable leak, bottleneck, or breakdown in the revenue path. The goal is not more tools. The goal is fewer leaks and more booked revenue."
        />
        
        <div className="mt-12 grid gap-4 rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 md:grid-cols-3">
          <div>
            <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
              Approach
            </div>
            <div className="mt-2 font-medium text-[var(--ink)]">
              Diagnosis before implementation
            </div>
          </div>

          <div>
            <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
              Focus
            </div>
            <div className="mt-2 font-medium text-[var(--ink)]">
              Revenue infrastructure, not random automation
            </div>
          </div>

          <div>
            <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
              Goal
            </div>
            <div className="mt-2 font-medium text-[var(--ink)]">
              More qualified conversations. More booked revenue.
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustSystems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)] hover:bg-white/[0.045]">
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_20%_0%,rgba(201,123,69,0.12),transparent_34%)]" />
                <item.icon size={22} className="relative text-[var(--copper-2)] transition duration-300 group-hover:scale-110" />
                <h3 className="relative mt-9 text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-[var(--ink-muted)]">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
