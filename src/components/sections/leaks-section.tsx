import { AlertTriangle, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { revenueLeaks } from "@/lib/content";

export function LeaksSection() {
  return (
    <section id="leaks" className="border-y border-[var(--line)] bg-black/20 py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Revenue leaks"
          title="Most lost revenue does not look dramatic. It looks delayed."
          copy="A lead waits. A call is missed. A DM gets buried. A form becomes an email instead of a pipeline event. These are small operational gaps that compound into real lost revenue."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--line)] lg:grid-cols-3">
          {revenueLeaks.map((finding, index) => (
            <Reveal key={finding.title} delay={index * 0.04}>
              <article className="group relative min-h-full overflow-hidden bg-[var(--panel)] p-6 transition duration-300 hover:bg-[var(--panel-2)]">
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_20%_0%,rgba(244,209,155,0.11),transparent_34%)]" />
                <div className="relative mb-8 flex items-center justify-between">
                  <span className="mono rounded-full border border-[var(--line)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--ink-subtle)]">
                    {finding.label}
                  </span>
                  <AlertTriangle size={16} className="text-[var(--copper-2)] transition duration-300 group-hover:scale-110" />
                </div>
                <h3 className="relative text-xl font-semibold leading-7 tracking-[-0.03em] text-[var(--ink)]">{finding.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-[var(--ink-muted)]">{finding.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16}>
          <div className="panel mt-8 rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">The fix</div>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--ink-muted)]">
                  Duxio finds the highest-impact leak, builds the missing system around that moment, then measures whether
                  the business is capturing more demand with less manual work.
                </p>
              </div>
              <div className="flex min-w-52 items-center gap-3 rounded-2xl border border-[var(--line)] bg-white/[0.035] p-4 text-sm text-[var(--ink)]">
                <Check size={18} className="text-[var(--success)]" />
                One leak fixed first
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
