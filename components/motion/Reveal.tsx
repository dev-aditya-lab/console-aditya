"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, useGSAP } from "./gsap";
import { useTransition } from "./TransitionProvider";
import { prefersReducedMotion } from "./hooks";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  /** Wait for the page transition instead of scroll. */
  hero?: boolean;
  start?: string;
};

/** Fade + slide in when scrolled into view. */
export function Reveal({
  children,
  as = "div",
  className,
  stagger,
  y = 48,
  x = 0,
  delay = 0,
  duration = 1.1,
  hero = false,
  start = "top 90%",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { revealed } = useTransition();
  const staggered = stagger !== undefined;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = staggered ? Array.from(el.children) : el;
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1 });
        return;
      }
      if (hero && !revealed) {
        if (staggered) gsap.set(targets, { opacity: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "expo.out",
          stagger: stagger ?? 0,
          scrollTrigger: hero ? undefined : { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref, dependencies: [hero ? revealed : null] },
  );

  // Non-staggered: the wrapper itself starts hidden via CSS. Staggered: GSAP hides the children.
  const attrs = staggered ? {} : { "data-reveal": "" };
  return createElement(as, { ref, className, ...attrs }, children);
}
