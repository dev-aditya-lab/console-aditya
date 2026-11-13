import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Stats } from "@/components/site/Stats";
import { Button } from "@/components/site/Button";
import { experience, leadership } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles and ventures: Founder at Vibesites, Full Stack & Generative AI Developer at Schoolasium, and a full-stack internship at Kisaan Station.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero index="03" eyebrow={experience.eyebrow} title={experience.heading} subtitle={experience.subheading} />

      <section className="gutter py-20 md:py-32">
        <div className="container-wide space-y-6 md:space-y-8">
          {experience.items.map((e, i) => (
            <Reveal key={e.org} y={60}>
              <TiltCard max={3} lift={10} className="rounded-[2.5rem]" bodyClassName="rounded-[2.5rem]">
                <article className="group gloss relative grid gap-8 overflow-hidden rounded-[2.5rem] p-8 md:grid-cols-12 md:gap-10 md:p-14">
                  <span
                    className="absolute inset-x-[-20%] bottom-0 h-[170%] translate-y-[105%] rounded-[50%] bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-6%]"
                    aria-hidden
                  />
                  <div className="relative md:col-span-3">
                    <p className="font-display text-7xl font-semibold tracking-tighter text-ink/10 transition-colors duration-500 group-hover:text-white/25 md:text-8xl">
                      0{i + 1}
                    </p>
                    <p className="label mt-4 inline-block rounded-full bg-ink px-3.5 py-2 text-white transition-colors duration-500 group-hover:bg-accent">{e.period}</p>
                  </div>
                  <div className="relative transition-colors duration-500 group-hover:text-white md:col-span-9">
                    <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{e.role}</h2>
                    <p className="mt-3 text-xl text-accent">
                      {e.orgUrl ? (
                        <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="u-link">
                          {e.org} ↗
                        </a>
                      ) : (
                        e.org
                      )}
                      {e.location && <span className="text-muted-foreground transition-colors group-hover:text-white/60"> · {e.location}</span>}
                    </p>
                    <ul className="mt-8 space-y-4 text-lg text-muted-foreground transition-colors duration-500 group-hover:text-white/75">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-4 leading-relaxed">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="gutter py-24 md:py-36">
        <div className="container-wide">
          <SectionHead eyebrow={leadership.eyebrow} title={leadership.heading} className="mb-16" />
          <div className="grid gap-14 md:grid-cols-12">
            <Reveal stagger={0.1} className="md:col-span-7">
              <ul className="border-t border-ink/15">
                {leadership.bullets.map((b, i) => (
                  <li key={b} className="group flex gap-6 border-b border-ink/15 py-7 transition-all duration-500 hover:pl-4">
                    <span className="label pt-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-xl leading-relaxed md:text-2xl">{b}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="md:col-span-5">
              <Stats items={leadership.stats.slice(0, 2)} />
            </div>
          </div>
          <Reveal y={20} className="mt-16 flex flex-wrap gap-3">
            <Button href="/journey">Follow the journey</Button>
            <Button href="/achievements" variant="outline">Achievements</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
