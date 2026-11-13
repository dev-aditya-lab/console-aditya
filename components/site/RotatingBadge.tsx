"use client";

import { useId } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { TLink } from "@/components/motion/TransitionProvider";
import { cn } from "@/lib/utils";

/** Circular text on a path that spins forever; speeds up on hover. Arrow in the middle. */
export function RotatingBadge({
  text,
  href,
  className,
}: {
  text: string;
  href: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const ring = `${text} ✦ ${text} ✦ `;
  return (
    <Magnetic strength={0.5} innerStrength={0.2}>
      <TLink
        href={href}
        data-cursor="link"
        aria-label={text}
        className={cn(
          "group gloss relative flex h-36 w-36 items-center justify-center rounded-full md:h-44 md:w-44",
          className,
        )}
      >
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-spin-slow group-hover:[animation-duration:6s]"
          aria-hidden
        >
          <defs>
            <path id={id} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
          </defs>
          <text className="fill-ink" style={{ fontSize: 15, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
            <textPath href={`#${id}`} startOffset="0">
              {ring}
            </textPath>
          </text>
        </svg>
        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </TLink>
    </Magnetic>
  );
}
