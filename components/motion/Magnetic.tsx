"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { canHover } from "./hooks";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper: the element is pulled toward the pointer while it's near,
 * and its inner content drifts a little further for a layered, elastic feel.
 */
export function Magnetic({
  children,
  className,
  strength = 0.4,
  innerStrength = 0.25,
  radius = 1.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  innerStrength?: number;
  /** Hot-zone size relative to the element (1 = its own box). */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const inner = el.firstElementChild as HTMLElement | null;

    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.35)" });
    const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.9, ease: "elastic.out(1, 0.35)" }) : null;
    const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.9, ease: "elastic.out(1, 0.35)" }) : null;

    let inside = false;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const hotX = (r.width / 2) * radius;
      const hotY = (r.height / 2) * radius;
      const near = Math.abs(dx) < hotX + 24 && Math.abs(dy) < hotY + 24;
      if (near) {
        inside = true;
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo?.(dx * innerStrength);
        iyTo?.(dy * innerStrength);
      } else if (inside) {
        inside = false;
        xTo(0);
        yTo(0);
        ixTo?.(0);
        iyTo?.(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set([el, inner].filter(Boolean), { x: 0, y: 0 });
    };
  }, [strength, innerStrength, radius]);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      <div className="will-change-transform">{children}</div>
    </div>
  );
}
