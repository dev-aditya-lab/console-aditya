"use client";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

type Stat = { label: string; value: number; suffix: string };

/** Count-up numbers, each in a glossy tilting tile with a stroke-drawn ring. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <Reveal stagger={0.1} className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
      {items.map((s) => (
        <TiltCard key={s.label} max={10} lift={18} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
          <div className="gloss group flex aspect-square flex-col justify-between rounded-[2rem] p-6 md:p-8">
            <svg viewBox="0 0 48 48" className="tilt-z-md h-10 w-10 text-accent" fill="none" aria-hidden>
              <circle cx="24" cy="24" r="21" stroke="currentColor" strokeOpacity=".2" strokeWidth="2" />
              <circle
                cx="24"
                cy="24"
                r="21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="0.25"
                className="origin-center -rotate-90 transition-all duration-1000 group-hover:[stroke-dashoffset:0] group-hover:rotate-[270deg]"
              />
            </svg>
            <div className="tilt-z-lg">
              <div className="font-display text-5xl font-semibold tracking-tighter md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
            </div>
          </div>
        </TiltCard>
      ))}
    </Reveal>
  );
}
