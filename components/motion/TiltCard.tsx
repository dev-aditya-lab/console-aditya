"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { canHover } from "./hooks";
import { cn } from "@/lib/utils";

/**
 * 3D hover card. The body rotates toward the pointer in perspective, a glossy glare follows the cursor,
 * and children with `.tilt-z-sm/md/lg` pop forward in Z.
 */
export function TiltCard({
  children,
  className,
  bodyClassName,
  max = 12,
  lift = 14,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** translateZ on hover, px. */
  lift?: number;
  glare?: boolean;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sc = scene.current;
    const bd = body.current;
    if (!sc || !bd || !canHover()) return;

    const rx = gsap.quickTo(bd, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(bd, "rotationY", { duration: 0.6, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = sc.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 2 * max);
      rx(-(py - 0.5) * 2 * max);
      if (shine.current) {
        shine.current.style.background = `radial-gradient(520px circle at ${px * 100}% ${py * 100}%, rgb(255 255 255 / 0.65), transparent 45%)`;
      }
    };
    const enter = () => {
      gsap.to(bd, { z: lift, scale: 1.015, duration: 0.5, ease: "power3.out" });
      if (shine.current) gsap.to(shine.current, { opacity: 1, duration: 0.4 });
    };
    const leave = () => {
      rx(0);
      ry(0);
      gsap.to(bd, { z: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      if (shine.current) gsap.to(shine.current, { opacity: 0, duration: 0.4 });
    };

    sc.addEventListener("pointermove", move);
    sc.addEventListener("pointerenter", enter);
    sc.addEventListener("pointerleave", leave);
    return () => {
      sc.removeEventListener("pointermove", move);
      sc.removeEventListener("pointerenter", enter);
      sc.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(bd);
    };
  }, [max, lift]);

  return (
    <div ref={scene} className={cn("tilt-scene", className)}>
      <div ref={body} className={cn("tilt-body relative h-full", bodyClassName)}>
        {children}
        {glare && (
          <div
            ref={shine}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-soft-light"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
