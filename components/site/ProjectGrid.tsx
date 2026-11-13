"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { TLink } from "@/components/motion/TransitionProvider";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowIcon } from "@/components/site/Button";
import { formatDate, withProtocol, type ProjectItem } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Filterable grid of 3D-tilting project cards. */
export function ProjectGrid({ projects, empty }: { projects: ProjectItem[]; empty: string }) {
  const tags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => t && s.add(t)));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [projects]);
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [projects, active],
  );

  if (projects.length === 0) {
    return <p className="rounded-3xl border border-ink/10 bg-surface p-12 text-center text-muted-foreground">{empty}</p>;
  }

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Magnetic key={t} strength={0.25} innerStrength={0.1}>
            <button
              onClick={() => setActive(t)}
              className={cn(
                "label relative rounded-full border px-4 py-2.5 transition-colors duration-300",
                active === t ? "border-ink text-white" : "border-ink/15 text-ink/70 hover:border-ink/50",
              )}
            >
              {active === t && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {t}
            </button>
          </Magnetic>
        ))}
      </div>

      <motion.div layout className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              key={p._id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <TiltCard max={7} lift={20} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
                <TLink href={`/projects/${p._id}`} data-cursor="View" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface shadow-[0_30px_60px_-30px_rgb(10_10_11/0.35)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="tilt-z-md absolute left-5 top-5 flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="gloss label rounded-full px-3 py-1.5 text-ink">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="tilt-z-lg absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <ArrowIcon />
                    </span>
                  </div>
                  <div className="tilt-z-sm mt-6 flex items-start justify-between gap-6 px-1">
                    <div>
                      <p className="label mb-2 text-muted-foreground">{formatDate(p.createdAt)}</p>
                      <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
                      <p className="mt-3 line-clamp-2 max-w-md text-muted-foreground">{p.description}</p>
                    </div>
                  </div>
                </TLink>
                <div className="mt-5 flex gap-2 px-1">
                  {p.githubUrl && (
                    <a
                      href={withProtocol(p.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 transition-colors hover:bg-ink hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={withProtocol(p.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-white transition-colors hover:bg-accent"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">Nothing tagged &ldquo;{active}&rdquo; yet.</p>
      )}
    </div>
  );
}
