"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./hooks";
import { cn } from "@/lib/utils";

/**
 * Wraps any stroke-based SVG icon (lucide, tabler) and animates its paths drawing themselves in —
 * once when scrolled into view and again every time the parent `.group` (or the icon) is hovered.
 * Also adds a small hover pop/rotate to the icon container.
 */
export function DrawIcon({
  children,
  className,
  onView = true,
  hoverDraw = true,
}: {
  children: React.ReactNode;
  className?: string;
  onView?: boolean;
  hoverDraw?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const shapes = Array.from(
      el.querySelectorAll<SVGGeometryElement>("path, line, polyline, polygon, circle, ellipse, rect"),
    );
    if (!shapes.length) return;
    shapes.forEach((s) => {
      s.setAttribute("pathLength", "1");
      s.style.strokeDasharray = "1";
    });
    if (prefersReducedMotion()) {
      shapes.forEach((s) => (s.style.strokeDashoffset = "0"));
      return;
    }

    const draw = () =>
      gsap.fromTo(
        shapes,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.06, overwrite: true },
      );

    let st: ScrollTrigger | undefined;
    if (onView) {
      gsap.set(shapes, { strokeDashoffset: 1 });
      st = ScrollTrigger.create({ trigger: el, start: "top 95%", once: true, onEnter: draw });
    } else {
      shapes.forEach((s) => (s.style.strokeDashoffset = "0"));
    }

    const host = (el.closest(".group") as HTMLElement | null) ?? el;
    const pop = () => {
      if (hoverDraw) draw();
      gsap.fromTo(el, { rotate: -8, scale: 0.9 }, { rotate: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    };
    host.addEventListener("pointerenter", pop);
    return () => {
      host.removeEventListener("pointerenter", pop);
      st?.kill();
      gsap.killTweensOf([el, ...shapes]);
    };
  }, [onView, hoverDraw]);

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
