"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        node.style.setProperty("--mx", `${(event.clientX / window.innerWidth) * 100}%`);
        node.style.setProperty("--my", `${(event.clientY / window.innerHeight) * 100}%`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="motion-bg">
      <div className="motion-bg__glow motion-bg__glow--one" />
      <div className="motion-bg__glow motion-bg__glow--two" />
      <div className="motion-bg__cursor" />
      <div className="motion-bg__grid" />
      <div className="motion-bg__line motion-bg__line--one" />
      <div className="motion-bg__line motion-bg__line--two" />
    </div>
  );
}
