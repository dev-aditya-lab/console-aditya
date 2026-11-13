"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";
import { useTransition } from "./TransitionProvider";
import { prefersReducedMotion } from "./hooks";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  type?: "lines" | "words" | "chars";
  /** Wait for the page transition to finish instead of waiting for scroll. */
  hero?: boolean;
  delay?: number;
  stagger?: number;
};

/** Renders `*word*` as serif-italic accent text, returns React nodes. */
export function renderAccent(text: string, accentClass = "serif-i") {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <em key={i} className={cn(accentClass, "pr-[0.06em]")}>
        {p.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

/**
 * Masked line/word/char reveal powered by GSAP SplitText.
 * Supports `*accent*` markup inside the string.
 */
export function SplitReveal({
  children,
  as = "div",
  className,
  type = "lines",
  hero = false,
  delay = 0,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { revealed } = useTransition();

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.visibility = "visible";
        return;
      }
      if (hero && !revealed) return;

      let split: SplitText | undefined;
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled || !ref.current) return;
        split = SplitText.create(el, {
          type: type === "chars" ? "lines,chars" : type === "words" ? "lines,words" : "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) => {
            el.style.visibility = "visible";
            const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
            return contextSafe!(() =>
              gsap.from(targets, {
                yPercent: 135,
                rotate: type === "lines" ? 2 : 0,
                duration: 1.1,
                ease: "expo.out",
                delay,
                stagger: stagger ?? (type === "chars" ? 0.02 : type === "words" ? 0.06 : 0.1),
                scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
              }),
            )();
          },
        });
      });

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [hero ? revealed : null, children], revertOnUpdate: true },
  );

  return createElement(as, { ref, className, "data-split": "" }, renderAccent(children));
}
