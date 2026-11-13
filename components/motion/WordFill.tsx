"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./hooks";
import { cn } from "@/lib/utils";

/** Paragraph whose words light up one by one as you scroll through it. `*word*` renders serif-italic. */
export function WordFill({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = text.split(" ");

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-w]");
      if (!words?.length || prefersReducedMotion()) {
        words?.forEach((w) => (w.style.opacity = "1"));
        return;
      }
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => {
        const accent = t.startsWith("*") && t.replace(/[.,!?]+$/, "").endsWith("*");
        const clean = accent ? t.replace(/\*/g, "") : t;
        return (
          <span key={i}>
            <span data-w className={cn("inline-block opacity-[0.14]", accent && "serif-i text-accent")}>
              {clean}
            </span>
            {i < tokens.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
