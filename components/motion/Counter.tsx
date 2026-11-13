"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./hooks";

/** Number that counts up when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const set = (v: number) => (el.textContent = `${Math.round(v)}${suffix}`);
      if (prefersReducedMotion()) return set(value);
      const o = { v: 0 };
      set(0);
      gsap.to(o, {
        v: value,
        duration: 2.2,
        ease: "expo.out",
        onUpdate: () => set(o.v),
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref, dependencies: [value, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
