import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustSystems } from "@/lib/content";

export function TrustSection() {
  return (
    <section id="trust" className="py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Control"
          title="Automation should make the business calmer, not harder to trust."
          copy="Every Duxio system is designed with ownership, fallback states, human override, and measurement. The goal is not to add more tools. The goal is to make the revenue path easier to see and harder to break."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
