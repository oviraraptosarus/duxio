"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceGroups } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Services"
          title="Build the missing system, not another disconnected tool."
          copy="Services are organized by operating function: capture the demand, move it through pipeline, and learn from every action."
        />

        <Tabs.Root
          defaultValue={serviceGroups[0].value}
          className="mt-8 md:mt-12"
        >
          <Tabs.List className="scan-mask flex gap-2 overflow-x-auto rounded-full border border-[var(--line)] bg-white/[0.025] p-1">
            {serviceGroups.map((group) => (
              <Tabs.Trigger
                key={group.value}
                value={group.value}
                className={cn(
                  "focus-visible-ring whitespace-nowrap rounded-full px-4 py-3 text-sm text-[var(--ink-muted)] transition md:px-5",
                  "data-[state=active]:bg-[var(--ink)] data-[state=active]:text-[#08090b]"
                )}
              >
                {group.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {serviceGroups.map((group) => (
            <Tabs.Content
              key={group.value}
              value={group.value}
              className="mt-5 md:mt-6 outline-none"
            >
              <div className="grid gap-4 md:grid-cols-3">
                {group.services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.05}>
                    <article className="panel group relative min-h-full overflow-hidden rounded-[2rem] p-5 md:p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.28)]">
                      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_18%_0%,rgba(244,209,155,0.12),transparent_34%)]" />

                      <service.icon
                        size={22}
                        className="relative text-[var(--signal)] transition duration-300 group-hover:scale-110"
                      />

                      <h3 className="relative mt-6 md:mt-8 text-xl font-semibold tracking-[-0.035em] text-[var(--ink)]">
                        {service.title}
                      </h3>

                      <p className="relative mt-3 text-sm leading-6 md:leading-7 text-[var(--ink-muted)]">
                        {service.detail}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
