import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { methodSteps } from "@/lib/content";

export function MethodSection() {
  return (
    <section className="border-y border-[var(--line)] bg-white/[0.025] py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Method"
          title="Less campaign. More operating discipline."
          copy="A premium site should make the buying decision safer. The method shows how Duxio finds the highest-leverage leak, ships a focused system, and measures the behavior change."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {methodSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="group relative min-h-full overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#08090b]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)] hover:bg-[#0d1115]/80 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_24%_0%,rgba(244,209,155,0.12),transparent_34%)]" />
                <div className="relative serif text-5xl leading-none tracking-[-0.05em] text-white/[0.12] transition duration-300 group-hover:text-[rgba(244,209,155,0.28)]">
                  {step.step}
                </div>
                <h3 className="relative mt-7 text-lg font-semibold tracking-[-0.025em] text-[var(--ink)]">{step.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-[var(--ink-muted)]">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
