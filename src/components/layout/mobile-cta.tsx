"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed inset-x-0 bottom-4 z-40 px-4 md:hidden
        transition-all duration-500 ease-out
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        }
      `}
    >
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
