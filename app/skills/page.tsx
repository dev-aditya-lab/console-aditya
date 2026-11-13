import type { Metadata } from "next";
import { PageHero, SectionHead } from "@/components/site/PageHero";
import { SkillGroups } from "@/components/site/SkillIcons";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/site/Button";
import { marqueeWords, skills } from "@/data/site";

export const metadata: Metadata = {
  title: "Skills",
  description: "The stack behind the work: TypeScript, React, Next.js, Node.js, MongoDB, Firebase, generative-AI tooling and more.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero index="05" eyebrow={skills.eyebrow} title={skills.heading} subtitle={skills.subheading} />

      <section className="gutter py-20 md:py-32">
        <div className="container-wide">
          <SkillGroups />
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/10 bg-white/70 py-8 backdrop-blur-sm">
        <Marquee items={marqueeWords} itemClassName="font-display text-6xl font-semibold tracking-tight text-outline md:text-8xl" speed={50} />
      </section>

      <section className="gutter py-28 md:py-40">
        <div className="container-wide">
          <SectionHead eyebrow="More than tools" title={skills.strengthsHeading} className="mb-16" />
          <Reveal stagger={0.08} className="grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.strengths.map((s, i) => (
              <div key={s} className="group relative flex min-h-44 flex-col justify-between overflow-hidden bg-white p-8 transition-colors duration-500 hover:bg-ink hover:text-white">
                <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-2xl font-medium leading-tight tracking-tight">{s}</p>
              </div>
            ))}
          </Reveal>
          <Reveal y={20} className="mt-16">
            <Button href="/projects">See it in action</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
