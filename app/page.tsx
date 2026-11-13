import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { WordFill } from "@/components/motion/WordFill";
import { Marquee } from "@/components/motion/Marquee";
import { ParallaxImage } from "@/components/motion/Parallax";
import { TLink } from "@/components/motion/TransitionProvider";
import { Button } from "@/components/site/Button";
import { SectionHead } from "@/components/site/PageHero";
import { RotatingBadge } from "@/components/site/RotatingBadge";
import { Services } from "@/components/site/Services";
import { Stats } from "@/components/site/Stats";
import { ProjectRows } from "@/components/site/ProjectRows";
import { ExperienceScroller } from "@/components/site/ExperienceScroller";
import { AwardCards } from "@/components/site/Awards";
import { SkillCloud } from "@/components/site/SkillIcons";
import {
  about,
  accomplishments,
  hero,
  manifesto,
  marqueeWords,
  services,
  siteConfig,
  skills,
  stats,
  timeline,
} from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Aditya Gupta — Full-stack & Generative-AI Developer" },
  description:
    "I build fast, polished web products and AI-native features. Explore projects, experience, skills and achievements of Aditya Gupta.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const projects = await getProjects(5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
            jobTitle: siteConfig.tagline,
            email: siteConfig.email,
            sameAs: ["https://github.com/dev-aditya-lab", "https://www.linkedin.com/in/aditya-gupta9608/", "https://x.com/dev_aditya_x"],
          }),
        }}
      />

      {/* 01 — Hero */}
      <section className="gutter relative flex min-h-[100svh] flex-col justify-end pb-10 pt-36 md:pb-14">
        <div className="container-wide">
          <Reveal hero y={16} className="label mb-8 flex items-center gap-3 text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </Reveal>

          <SplitReveal as="h1" hero className="display-xl max-w-[13ch] text-balance">
            {hero.headline}
          </SplitReveal>

          <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Reveal hero delay={0.45} y={24} className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {hero.subhead}
              </Reveal>
              <Reveal hero delay={0.6} y={24} className="mt-8 flex flex-wrap gap-3">
                <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
                <Button href={hero.ctaSecondary.href} variant="outline">
                  {hero.ctaSecondary.label}
                </Button>
              </Reveal>
            </div>
            <Reveal hero delay={0.75} y={30} className="self-end">
              <RotatingBadge text={hero.badge} href="/contact" />
            </Reveal>
          </div>

          <Reveal
            hero
            delay={0.9}
            y={20}
            className="mt-14 grid grid-cols-1 gap-6 border-t border-ink/10 pt-6 sm:grid-cols-3"
          >
            {hero.facts.map((f) => (
              <div key={f.label}>
                <p className="label mb-1.5 text-muted-foreground">{f.label}</p>
                <p className="font-display text-lg font-medium tracking-tight">{f.value}</p>
              </div>
            ))}
          </Reveal>

          <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden>
            <span className="label text-muted-foreground">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-0 animate-scroll-cue bg-ink" />
            </span>
          </div>
        </div>
      </section>

      {/* 02 — Marquee */}
      <section className="relative z-10 -rotate-1 overflow-hidden border-y border-ink/10 bg-white/70 py-6 backdrop-blur-sm md:py-8">
        <Marquee items={marqueeWords} itemClassName="font-display text-5xl font-semibold tracking-tight md:text-7xl" speed={70} />
        <Marquee
          items={[...marqueeWords].reverse()}
          itemClassName="font-display text-5xl font-semibold tracking-tight text-outline md:text-7xl"
          speed={60}
          reverse
          className="mt-2"
        />
      </section>

      {/* 03 — Manifesto */}
      <section className="gutter py-32 md:py-48">
        <div className="container-wide">
          <Reveal y={16} className="label mb-10 flex items-center gap-3 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {manifesto.eyebrow}
          </Reveal>
          <WordFill text={manifesto.text} className="display-md max-w-6xl font-medium !leading-[1.12]" />
        </div>
      </section>

      {/* 04 — About teaser */}
      <section className="gutter pb-32 md:pb-48">
        <div className="container-wide grid items-center gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ParallaxImage
              src={about.photo}
              alt="Portrait of Aditya Gupta"
              className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(10_10_11/0.5)]"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHead eyebrow={about.eyebrow} title={about.heading} />
            <Reveal y={24} className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{about.bioParagraphs[0]}</p>
              <p>{about.bioParagraphs[1]}</p>
            </Reveal>
            <Reveal y={20} className="mt-10">
              <Button href="/about" variant="outline">More about me</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — Services */}
      <section className="gutter pb-32 md:pb-48">
        <div className="container-wide">
          <SectionHead eyebrow={services.eyebrow} title={services.heading} className="mb-16" />
          <Services />
        </div>
      </section>

      {/* 06 — Stats */}
      <section className="gutter pb-32 md:pb-48">
        <div className="container-wide">
          <Stats items={stats} />
        </div>
      </section>

      {/* 07 — Selected work (database-backed) */}
      {projects.length > 0 && (
        <section className="gutter pb-32 md:pb-48">
          <div className="container-wide">
            <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHead eyebrow="Selected work" title="Things I've *shipped*" />
              <Reveal y={20}>
                <Button href="/projects" variant="outline">All projects</Button>
              </Reveal>
            </div>
            <ProjectRows projects={projects} />
          </div>
        </section>
      )}

      {/* 08 — Experience (pinned horizontal scroll) */}
      <ExperienceScroller />

      {/* 09 — Achievements */}
      <section className="gutter py-32 md:py-48">
        <div className="container-wide">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead eyebrow={accomplishments.eyebrow} title={accomplishments.heading} />
            <Reveal y={20}>
              <Button href="/achievements" variant="outline">All achievements</Button>
            </Reveal>
          </div>
          <AwardCards />
        </div>
      </section>

      {/* 10 — Skills */}
      <section className="gutter pb-32 md:pb-48">
        <div className="container-wide">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead eyebrow={skills.eyebrow} title={skills.heading} body={skills.subheading} />
            <Reveal y={20}>
              <Button href="/skills" variant="outline">The full stack</Button>
            </Reveal>
          </div>
          <SkillCloud />
        </div>
      </section>

      {/* 11 — Journey teaser */}
      <section className="gutter pb-32 md:pb-48">
        <div className="container-wide">
          <SectionHead eyebrow="Journey" title="Five years, *one* direction" className="mb-14" />
          <Reveal stagger={0.08} className="grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t) => (
              <TLink key={t.year} href="/journey" data-cursor="Journey" className="group relative isolate flex min-h-52 flex-col justify-between overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-ink hover:text-white">
                <span className="absolute inset-x-0 bottom-0 -z-10 h-0 bg-accent transition-all duration-500 group-hover:h-1.5" aria-hidden />
                <span className="font-display text-6xl font-semibold tracking-tighter text-ink/15 transition-colors duration-500 group-hover:text-white/30">
                  {t.year}
                </span>
                <span className="font-display text-xl font-medium leading-snug tracking-tight">{t.title}</span>
              </TLink>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
