"use client";

import { ArrowRight } from "lucide-react";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <a
        href="#scorecard"
        className="
          group
          flex
          h-14
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/[0.08]
          backdrop-blur-xl
          shadow-[0_12px_40px_rgba(0,0,0,0.35)]
          transition-all
          duration-300
          hover:bg-white/[0.12]
          active:scale-[0.98]
        "
      >
        <span className="font-medium text-[var(--ink)]">
          Find My Biggest Leak
        </span>

        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}
