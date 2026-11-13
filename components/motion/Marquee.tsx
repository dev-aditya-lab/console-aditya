"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { store } from "@/lib/motion-store";
import { prefersReducedMotion } from "./hooks";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee that speeds up and skews with scroll velocity.
 * Pass `reverse` to run the other way.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  speed = 60,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  /** px per second */
  speed?: number;
  reverse?: boolean;
  separator?: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tr = track.current;
      const wp = wrap.current;
      if (!tr || !wp) return;
      const reduced = prefersReducedMotion();
      let x = 0;
      const dir = reverse ? 1 : -1;
      const setX = gsap.quickSetter(tr, "x", "px");
      const setSkew = gsap.quickSetter(wp, "skewX", "deg");
      let skew = 0;

      const tick = (_: number, dt: number) => {
        const half = tr.scrollWidth / 2;
        if (!half) return;
        const boost = reduced ? 0 : Math.min(Math.abs(store.velocity), 60) * 22;
        const v = (speed + boost) * (dt / 1000) * dir;
        x += v;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        setX(x);
        const target = reduced ? 0 : gsap.utils.clamp(-8, 8, -store.velocity * 0.35 * -dir);
        skew += (target - skew) * 0.12;
        setSkew(skew);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: wrap, dependencies: [reverse, speed] },
  );

  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex shrink-0 items-center gap-[0.6em] pr-[0.6em]">
          <span className={itemClassName}>{t}</span>
          <span className="text-accent" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div ref={wrap} className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden>
      <div ref={track} className="flex w-max will-change-transform">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
