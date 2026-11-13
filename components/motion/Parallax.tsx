"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./hooks";
import { cn } from "@/lib/utils";

/** Clip-reveals an image on scroll and drifts it inside its frame. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 10,
  reveal = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  reveal?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !frame.current || !img.current) return;
      if (reveal) {
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(12% 12% 12% 12% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: frame.current, start: "top 88%", once: true },
          },
        );
      }
      gsap.fromTo(
        img.current,
        { yPercent: -amount, scale: 1.2 },
        {
          yPercent: amount,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} src={src} alt={alt} className={cn("h-full w-full object-cover", imgClassName)} />
    </div>
  );
}
