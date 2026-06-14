"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type SignalScannerProps = {
  className?: string;
};

export function SignalScanner({ className }: SignalScannerProps) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--scanner-x", `${x}%`);
    event.currentTarget.style.setProperty("--scanner-y", `${y}%`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      style={
        {
          "--scanner-x": "72%",
          "--scanner-y": "24%",
        } as CSSProperties
      }
      className={cn(
        "group relative mx-auto max-w-[45rem] overflow-hidden rounded-[1.75rem] border border-[var(--line-strong)] bg-[#08090b] shadow-[0_24px_80px_rgba(0,0,0,0.44),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 will-change-transform hover:-translate-y-1 hover:border-[rgba(244,209,155,0.32)] hover:shadow-[0_28px_90px_rgba(0,0,0,0.52),0_0_36px_rgba(244,209,155,0.05),inset_0_1px_0_rgba(255,255,255,0.12)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,209,155,0.18),transparent_26%),radial-gradient(circle_at_86%_22%,rgba(188,213,223,0.1),transparent_26%),linear-gradient(145deg,rgba(255,255,255,0.06),transparent_40%)]" />

      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_var(--scanner-x)_var(--scanner-y),rgba(244,209,155,0.22),transparent_28%)]" />

      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative p-4 md:p-5">
        <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/[0.08] bg-black/35 p-3.5 backdrop-blur transition duration-500 group-hover:border-white/[0.14] group-hover:bg-black/45">
          <div className="flex items-center gap-3">
            <Image
              src="/duxio-symbol.png"
              alt=""
              width={40}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />

            <div>
              <Image
                src="/duxio-wordmark.png"
                alt="Duxio"
                width={138}
                height={26}
                className="h-3.5 w-auto object-contain brightness-110"
                priority
              />

              <div className="mono mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Lead capture system
              </div>
            </div>
          </div>

          <div className="rounded-full border border-[rgba(159,210,138,0.28)] bg-[rgba(159,210,138,0.08)] px-3 py-1 text-xs font-medium text-[var(--success)]">
            Online
          </div>
        </div>

        <div className="relative mt-4 h-[15rem] overflow-hidden">
          <div className="relative grid grid-cols-8 grid-rows-3 gap-2">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="relative min-h-8 rounded-2xl border border-white/[0.045] bg-white/[0.025] opacity-30"
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--signal)] opacity-40",
                    index % 7 === 0 && "scanner-dot"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-4 md:mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["01", "Capture", "DM, form, call"],
            ["02", "Qualify", "Fit + urgency"],
            ["03", "Book", "Calendar + CRM"],
          ].map(([number, label, detail]) => (
            <div
              key={label}
              className="rounded-[1.35rem] border border-white/[0.09] bg-[#0c0f12]/90 p-3 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[rgba(244,209,155,0.34)] hover:bg-[#11151a]/95"
            >
              <div className="mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                {number}
              </div>

              <div className="mt-4 text-base font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {label}
              </div>

              <div className="mt-1 text-xs leading-5 text-[var(--ink-subtle)]">
                {detail}
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-3 rounded-[1.5rem] border border-[var(--line)] bg-[#08090b]/92 p-4 shadow-2xl backdrop-blur transition duration-500 group-hover:border-white/[0.14] group-hover:bg-[#0b0d10]/94">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                Response window
              </div>

              <div className="mt-2 text-lg font-semibold tracking-[-0.035em] text-[var(--ink)]">
                Reply before interest goes cold
              </div>
            </div>

            <div className="hidden rounded-2xl border border-[var(--line)] bg-white/[0.04] px-4 py-3 text-right sm:block">
              <div className="serif text-2xl leading-none tracking-[-0.05em] text-[var(--signal)]">
                &lt;5m
              </div>

              <div className="mono mt-1 text-[0.56rem] uppercase tracking-[0.18em] text-[var(--ink-subtle)]">
                Target reply
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scanner-beam absolute -left-1/3 top-0 h-[15rem] w-1/3 rotate-6 bg-gradient-to-r from-transparent via-[rgba(244,209,155,0.12)] to-transparent" />
    </div>
  );
}
