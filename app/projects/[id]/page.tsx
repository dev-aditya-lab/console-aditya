import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { formatDate, withProtocol } from "@/lib/format";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { TLink } from "@/components/motion/TransitionProvider";
import { Button } from "@/components/site/Button";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getProject(id);
  if (!p) return { title: "Project not found", robots: { index: false } };
  return {
    title: p.title,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/projects/${p._id}` },
    openGraph: { url: `${BASE_URL}/projects/${p._id}`, images: [{ url: p.imageUrl }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, all] = await Promise.all([getProject(id), getProjects()]);
  if (!project) notFound();

  const idx = all.findIndex((p) => p._id === project._id);
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null;
  const live = withProtocol(project.liveUrl);
  const code = withProtocol(project.githubUrl);

  return (
    <>
      <header className="gutter pb-12 pt-40 md:pt-48">
        <div className="container-wide">
          <Reveal hero y={16} className="label mb-8 flex items-center gap-4 text-muted-foreground">
            <TLink href="/projects" className="group inline-flex items-center gap-2">
              <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
              <span className="u-link">All projects</span>
            </TLink>
            <span className="h-px w-10 bg-ink/20" />
            <span>{formatDate(project.createdAt)}</span>
          </Reveal>
          <SplitReveal as="h1" hero className="display-xl max-w-[18ch] text-balance">
            {project.title}
          </SplitReveal>
          <Reveal hero delay={0.4} y={20} className="mt-10 flex flex-wrap items-center gap-3">
            {project.tags.map((t) => (
              <span key={t} className="label rounded-full border border-ink/15 bg-white/70 px-4 py-2 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </Reveal>
        </div>
      </header>

      <section className="gutter">
        <div className="container-wide">
          <ParallaxImage
            src={project.imageUrl}
            alt={project.title}
            className="aspect-[16/9] rounded-[2rem] shadow-[0_50px_100px_-50px_rgb(10_10_11/0.5)] md:rounded-[3rem]"
          />
        </div>
      </section>

      <section className="gutter py-24 md:py-36">
        <div className="container-wide grid gap-12 md:grid-cols-12">
          <Reveal y={20} className="md:col-span-3">
            <p className="label mb-3 text-muted-foreground">About this project</p>
            <div className="flex flex-wrap gap-3">
              {live && <Button href={live} external>Visit live</Button>}
              {code && <Button href={code} external variant="outline">Source code</Button>}
            </div>
          </Reveal>
          <Reveal y={40} className="md:col-span-8 md:col-start-5">
            <p className="whitespace-pre-line text-xl leading-relaxed text-ink/85 md:text-3xl md:leading-snug">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      {next && (
        <section className="gutter pb-24 md:pb-40">
          <TLink
            href={`/projects/${next._id}`}
            data-cursor="Next"
            className="group container-wide relative block overflow-hidden rounded-[2.5rem] border border-ink/10 bg-surface p-10 md:p-16"
          >
            <span className="absolute inset-x-[-20%] bottom-0 h-[170%] translate-y-[105%] rounded-[50%] bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-8%]" aria-hidden />
            <p className="label relative text-muted-foreground transition-colors duration-500 group-hover:text-white/60">Next project</p>
            <p className="relative mt-4 font-display text-4xl font-semibold leading-none tracking-tight transition-colors duration-500 group-hover:text-white md:text-7xl">
              {next.title} →
            </p>
          </TLink>
        </section>
      )}
    </>
  );
}
