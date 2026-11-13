"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/motion/gsap";
import { store } from "@/lib/motion-store";

/** Thin accent bar across the top that fills as you read. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const set = gsap.quickSetter(bar.current, "scaleX");
    const tick = () => {
      const y = store.scroll || window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[99] h-1" aria-hidden>
      <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}
