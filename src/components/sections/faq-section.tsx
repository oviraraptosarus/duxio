"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FaqSection() {
  return (
    <section className="py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before the first call."
          copy="The goal is clarity before commitment: what Duxio is, what gets built first, how automation is controlled, and what we need from you."
          align="center"
        />
        <Accordion.Root type="single" collapsible className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-[var(--line)]">
          {faqs.map((item) => (
            <Accordion.Item key={item.question} value={item.question} className="border-b border-[var(--line)] last:border-b-0">
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "group flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-medium text-[var(--ink)] outline-none transition hover:bg-white/[0.035]",
                    "focus-visible-ring",
                  )}
                >
                  {item.question}
                  <ChevronDown size={18} className="shrink-0 text-[var(--ink-subtle)] transition group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                <p className="px-6 pb-6 text-sm leading-7 text-[var(--ink-muted)]">{item.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
