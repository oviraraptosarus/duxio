import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { leakCards, operatingSystem } from "@/lib/content";

export function SystemSection() {
  return (
    <section id="system" className="py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Revenue OS"
            title="A system that turns weak moments into measured handoffs."
            copy="You do not need another disconnected tool. You need the moments between interest and revenue to happen automatically, visibly, and on time."
          />
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {leakCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-[var(--line)] bg-white/[0.03] p-5">
                  <card.icon size={20} className="text-[var(--signal)]" />
                  <h3 className="mt-5 text-lg font-semibold text-[var(--ink)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-subtle)]">Before: {card.before}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">After: {card.after}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {operatingSystem.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="panel min-h-full rounded-[2rem] p-6">
                <item.icon size={22} className="text-[var(--copper-2)]" />
                <h3 className="mt-10 text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
