"use client";

import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/site";

/** 2×2 grid of 3D-tilting capability cards. Each fills with accent from below on hover. */
export function Services() {
  return (
    <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-2 md:gap-6">
      {services.items.map((s) => (
        <TiltCard key={s.index} max={8} lift={24} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
          <article className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-ink/10 bg-white/80 p-8 shadow-[0_24px_60px_-30px_rgb(10_10_11/0.3)] backdrop-blur-md md:p-10">
            <span
              className="absolute inset-x-[-20%] bottom-0 h-[170%] translate-y-[105%] rounded-[50%] bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-8%]"
              aria-hidden
            />
            <div className="tilt-z-md relative flex items-start justify-between transition-colors duration-500 group-hover:text-white">
              <span className="font-display text-6xl font-semibold tracking-tighter text-ink/10 transition-colors duration-500 group-hover:text-white/25 md:text-7xl">
                {s.index}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-white/30">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
            <div className="tilt-z-lg relative transition-colors duration-500 group-hover:text-white">
              <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/70">
                {s.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="label rounded-full border border-ink/15 px-3 py-1.5 transition-colors duration-500 group-hover:border-white/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </TiltCard>
      ))}
    </Reveal>
  );
}
