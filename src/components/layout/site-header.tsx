"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/content";

function DuxioMark() {
  return (
    <Link href="/" className="focus-visible-ring group flex items-center gap-3 rounded-full">
      <Image
        src="/duxio-symbol.png"
        alt=""
        width={40}
        height={48}
        className="h-10 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-[1.04]"
        priority
      />
      <span className="flex flex-col gap-1">
        <Image
          src="/duxio-wordmark.png"
          alt="Duxio"
          width={150}
          height={28}
          className="h-[1.05rem] w-auto object-contain opacity-95 brightness-110 contrast-110"
          priority
        />
        <span className="mono hidden text-[0.55rem] uppercase tracking-[0.22em] text-[var(--ink-subtle)] sm:block">
          Revenue systems
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#07080a]/86 shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="container-shell flex h-[4.5rem] items-center justify-between gap-4">
        <DuxioMark />

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-white/[0.035] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-visible-ring rounded-full px-4 py-2 text-sm font-medium text-[var(--ink-muted)] transition hover:bg-white/[0.065] hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
            <a href="#book">
              Book diagnosis
              <ArrowUpRight size={15} />
            </a>
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.035] transition hover:bg-white/[0.08] md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--line)] bg-[#07080a]/98 backdrop-blur-xl md:hidden">
          <nav className="container-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-[var(--ink)] transition hover:bg-white/[0.05]"
              >
                {item.label}
              </a>
            ))}

            <Button asChild className="mt-2">
              <a href="#book" onClick={() => setMobileOpen(false)}>
                Book diagnosis
                <ArrowUpRight size={15} />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
