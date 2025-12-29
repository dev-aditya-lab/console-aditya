"use client";
import { useMemo, useState } from "react";

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  order?: number;
  createdAt: string;
};

function withProtocol(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function formatDate(input: string): string {
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return input;
  }
}

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => t && s.add(t)));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [projects]);
  const [activeTag, setActiveTag] = useState<string>("All");

  const visible = useMemo(() => {
    const base = activeTag === "All" ? projects : projects.filter((p) => p.tags?.includes(activeTag));
    return [...base].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [projects, activeTag]);

  return (
    <div className="space-y-8">
      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={
              `px-3 py-1.5 rounded-full text-sm font-semibold border transition ` +
              (activeTag === tag
                ? `bg-gradient-to-r from-sky-500 to-indigo-500 text-white border-transparent shadow-lg shadow-sky-500/20`
                : `bg-white/10 text-slate-100 border-white/10 hover:border-white/30 hover:bg-white/15`)
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article
            key={p._id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/90 text-gray-900 shadow">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col p-6 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-200/60">{formatDate(p.createdAt)}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-200/80 line-clamp-3">{p.description}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-200/80">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-300">Built with care</div>
                <div className="flex items-center gap-2">
                  {p.githubUrl && (
                    <a
                      href={withProtocol(p.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/20"
                    >
                      GitHub
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={withProtocol(p.liveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:shadow-sky-500/30"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
