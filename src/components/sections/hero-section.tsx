import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SignalScanner } from "@/components/motion/signal-scanner";
import { Button } from "@/components/ui/button";
import { Metric } from "@/components/ui/metric";
import { heroMetrics } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-[6.5rem] md:pb-20 md:pt-[7.5rem]">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.98fr_0.96fr] lg:items-center xl:grid-cols-[0.95fr_0.98fr]">
        <div>
          <Reveal>
            <div className="mono mb-6 inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-white/[0.035] px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
              <span className="size-2 rounded-full bg-[var(--success)] shadow-[0_0_18px_rgba(159,210,138,0.6)]" />
              Revenue systems for growing businesses
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="serif max-w-[11.5ch] text-balance text-[clamp(2.55rem,5.7vw,4.95rem)] leading-[0.94] tracking-[-0.052em] text-[var(--ink)]">
              Turn missed demand into booked revenue.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--ink-muted)] md:text-[1.05rem] md:leading-8">
              Duxio builds the systems that respond faster, qualify better, book cleaner, and follow up automatically,
              so good leads stop disappearing between tools.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#book">
                  Find my biggest leak
                  <ArrowRight size={17} />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#scorecard">Run the leak scorecard</a>
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--ink-subtle)]">
              {["15-minute diagnosis", "One-week pilot", "Measured outcomes"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[var(--success)]" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.18}>
          <SignalScanner className="premium-ring lg:translate-y-4" />
        </Reveal>
      </div>
      <div className="container-shell mt-10 grid gap-3 md:grid-cols-3">
        {heroMetrics.map((metric, index) => (
          <Reveal key={metric.label} delay={0.08 * index}>
            <Metric {...metric} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
