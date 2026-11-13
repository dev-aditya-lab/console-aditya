"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { canHover, prefersReducedMotion } from "./hooks";

/**
 * Custom cursor (desktop / fine pointer only).
 * Mark elements with `data-cursor="link"` for a filled bubble, or `data-cursor="View"` (any other text) for a labelled bubble.
 * Links and buttons get the "link" state automatically.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canHover() || prefersReducedMotion()) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;
    document.documentElement.classList.add("has-cursor");
    r.style.display = "flex";
    d.style.display = "block";

    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "none" });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, [role=button]");
      if (!t) {
        r.dataset.state = "";
        return;
      }
      const custom = t.dataset.cursor;
      if (custom && custom !== "link") {
        r.dataset.state = "label";
        if (label.current) label.current.textContent = custom;
      } else {
        r.dataset.state = "link";
      }
    };
    const down = () => (r.dataset.down = "true");
    const up = () => (r.dataset.down = "false");
    const leaveDoc = () => gsap.to([r, d], { opacity: 0, duration: 0.2 });
    const enterDoc = () => gsap.to([r, d], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leaveDoc);
    document.documentElement.addEventListener("pointerenter", enterDoc);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leaveDoc);
      document.documentElement.removeEventListener("pointerenter", enterDoc);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
