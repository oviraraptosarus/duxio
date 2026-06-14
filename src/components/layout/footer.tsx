import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { navItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-black/25 py-12">
      <div className="container-shell rounded-[2rem] border border-[var(--line)] bg-white/[0.025] p-6 md:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/duxio-symbol.png" alt="" width={44} height={52} className="h-11 w-auto object-contain" />
              <Image
                src="/duxio-wordmark.png"
                alt="Duxio"
                width={154}
                height={29}
                className="h-[1.1rem] w-auto object-contain brightness-110"
              />
            </div>
            <p className="mt-2 max-w-md text-sm leading-6 text-[var(--ink-subtle)]">
              Revenue infrastructure for businesses that already have attention and need the system that turns it into booked work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink-subtle)]">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[var(--ink)]">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="https://www.instagram.com/duxio.ai/"
            aria-label="Instagram"
            className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-white/[0.03] text-[var(--ink-subtle)] transition hover:border-white/25 hover:bg-white/[0.08] hover:text-[var(--ink)]"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-5 text-xs text-[var(--ink-faint)]">
          (c) 2026 Duxio. Built for faster capture, cleaner handoffs, and less revenue leakage.
        </div>
      </div>
    </footer>
  );
}
