"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { TiltCard } from "@/components/motion/TiltCard";
import { TLink } from "@/components/motion/TransitionProvider";
import { Button } from "@/components/site/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { experience } from "@/data/site";

/** Pinned horizontal scroller on desktop; a normal vertical stack on touch / small screens. */
export function ExperienceScroller() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tr = track.current!;
        const dist = () => tr.scrollWidth - window.innerWidth;
        gsap.to(tr, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Parallax on the big index numerals as the track slides.
        gsap.utils.toArray<HTMLElement>("[data-index]").forEach((el) => {
          gsap.to(el, {
            x: -80,
            ease: "none",
            scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${dist()}`, scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="relative overflow-hidden lg:h-screen">
      <div className="gutter pt-24 lg:absolute lg:inset-y-0 lg:left-0 lg:z-20 lg:w-[38rem] lg:bg-[linear-gradient(to_right,#fff_0,#fff_74%,transparent_100%)] lg:pr-24 lg:pt-32">
        <p className="label mb-5 flex items-center gap-3 text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {experience.eyebrow}
        </p>
        <SplitReveal as="h2" className="display-lg text-balance">
          {experience.heading}
        </SplitReveal>
        <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">{experience.subheading}</p>
        <div className="mt-8 hidden lg:block">
          <Button href="/experience" variant="outline">Full experience</Button>
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-6 px-[clamp(1.25rem,4vw,3.5rem)] py-12 lg:h-full lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pl-[40rem] lg:pr-[10vw]"
      >
        {experience.items.map((e, i) => (
          <TiltCard key={e.org} max={6} lift={20} className="w-full shrink-0 rounded-[2.2rem] lg:w-[34rem]" bodyClassName="rounded-[2.2rem]">
            <article className="gloss relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2.2rem] p-8 md:p-10 lg:min-h-[30rem]">
              <span data-index className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[10rem] font-semibold leading-none tracking-tighter text-ink/[0.05]">
                0{i + 1}
              </span>
              <div className="tilt-z-md relative flex items-center justify-between">
                <span className="label rounded-full bg-ink px-3.5 py-2 text-white">{e.period}</span>
                <span className="label text-muted-foreground">{e.type.replace("-", " ")}</span>
              </div>
              <div className="tilt-z-lg relative mt-16">
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{e.role}</h3>
                <p className="mt-2 text-lg text-accent">
                  {e.orgUrl ? (
                    <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="u-link">
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                  {e.location && <span className="text-muted-foreground"> · {e.location}</span>}
                </p>
                <ul className="mt-6 space-y-3 text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </TiltCard>
        ))}
        <div className="flex shrink-0 items-center px-6 lg:w-[22rem] lg:justify-center">
          <TLink href="/journey" data-cursor="Journey" className="group font-display text-4xl font-semibold tracking-tight">
            <span className="u-link">See the full journey →</span>
          </TLink>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1 bg-ink/5 lg:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </section>
  );
}
