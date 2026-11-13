import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { TiltCard } from "@/components/motion/TiltCard";
import { Stats } from "@/components/site/Stats";
import { Button } from "@/components/site/Button";
import { about, education, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Aditya Gupta is a computer-science student, founder and full-stack developer building AI-native web products.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero index="02" eyebrow={about.eyebrow} title={about.heading} subtitle={about.subheading} />

      {/* Bio */}
      <section className="gutter py-24 md:py-36">
        <div className="container-wide grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <ParallaxImage
                src={about.photo}
                alt="Portrait of Aditya Gupta"
                className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(10_10_11/0.5)]"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal stagger={0.12} className="space-y-8 text-xl leading-relaxed text-ink/85 md:text-2xl">
              {about.bioParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal stagger={0.08} className="mt-14 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <div key={h} className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/70 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_40px_-24px_rgb(255_74_28/0.6)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-[360deg]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  <span className="font-medium">{h}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="gutter py-24 md:py-36">
        <div className="container-wide">
          <SectionHead eyebrow={about.principles.eyebrow} title={about.principles.heading} className="mb-16" />
          <Reveal stagger={0.12} className="grid gap-5 md:grid-cols-3">
            {about.principles.items.map((p, i) => (
              <TiltCard key={p.title} max={9} lift={20} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
                <article className="gloss flex h-full min-h-80 flex-col justify-between rounded-[2rem] p-8">
                  <span className="tilt-z-lg font-display text-7xl font-semibold tracking-tighter text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div className="tilt-z-md">
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </article>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="gutter py-24 md:py-36">
        <div className="container-wide">
          <SectionHead eyebrow="Education" title="Where I *studied*" className="mb-14" />
          <ul className="border-t border-ink/15">
            {education.map((e) => (
              <Reveal as="li" key={e.degree} y={30} className="group grid items-center gap-3 border-b border-ink/15 py-8 transition-all duration-500 hover:bg-surface hover:px-6 md:grid-cols-12 md:gap-8 md:py-10">
                <span className="font-display text-4xl font-semibold tracking-tighter text-ink/25 transition-colors duration-500 group-hover:text-accent md:col-span-2 md:text-6xl">
                  {e.year}
                </span>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{e.degree}</h3>
                  <p className="mt-1 text-muted-foreground">{e.institution}</p>
                </div>
                <p className="label text-muted-foreground md:col-span-3 md:text-right">{e.location}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="gutter pb-24 md:pb-36">
        <div className="container-wide">
          <Stats items={stats} />
          <Reveal y={20} className="mt-16 flex flex-wrap gap-3">
            <Button href="/experience">See my experience</Button>
            <Button href="/contact" variant="outline">Get in touch</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
