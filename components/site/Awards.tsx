"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { Award, Trophy } from "lucide-react";
import { accomplishments } from "@/data/site";
import { prefersReducedMotion } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

const icons = [Trophy, Trophy, Award, Award];

/** Compact 4-up grid of tilting award cards (landing page). */
export function AwardCards() {
  return (
    <Reveal stagger={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {accomplishments.items.map((a, i) => {
        const Icon = icons[i % icons.length];
        return (
          <TiltCard key={a.title} max={12} lift={22} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
            <article className="group gloss relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7">
              <DrawIcon className="tilt-z-lg h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </DrawIcon>
              <div className="tilt-z-md">
                <p className="label mb-3 text-accent">{a.rank}</p>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.subtitle}</p>
              </div>
            </article>
          </TiltCard>
        );
      })}
    </Reveal>
  );
}

/** Full-height sticky cards that stack and shrink as the next one slides over (achievements page). */
export function AwardsStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack]", root.current);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.93 - (cards.length - i) * 0.004,
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="space-y-6 md:space-y-10">
      {accomplishments.items.map((a, i) => {
        const Icon = icons[i % icons.length];
        return (
          <article
            key={a.title}
            data-stack
            className={cn(
              "sticky overflow-hidden rounded-[2.5rem] border border-ink/10 p-8 shadow-[0_30px_80px_-40px_rgb(10_10_11/0.45)] md:p-14",
              i % 2 === 0 ? "bg-white" : "bg-[#f4f4f1]",
            )}
            style={{ top: `${6 + i * 1.6}rem` }}
          >
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <div className="mb-10 flex items-center gap-4">
                  <span className="font-display text-7xl font-semibold tracking-tighter text-ink/10 md:text-9xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label rounded-full bg-accent px-4 py-2 text-white">{a.rank}</span>
                </div>
                <h3 className="font-display text-4xl font-semibold leading-none tracking-tight md:text-6xl">{a.title}</h3>
                <p className="label mt-4 text-muted-foreground">{a.subtitle}</p>
              </div>
              <div className="md:col-span-5">
                <DrawIcon className="mb-6 h-16 w-16 items-center justify-center rounded-3xl bg-ink text-white">
                  <Icon className="h-8 w-8" strokeWidth={1.4} />
                </DrawIcon>
                <p className="text-lg leading-relaxed text-ink/80 md:text-xl">{a.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
