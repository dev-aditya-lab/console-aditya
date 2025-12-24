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
    <div>
      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={
              `px-3 py-1.5 rounded-full text-sm font-medium border transition ` +
              (activeTag === tag
                ? `bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow`
                : `bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700`)
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visible.map((p) => (
          <article
            key={p._id}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/90 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{p.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{p.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(p.createdAt)}</div>
                <div className="flex items-center gap-2">
                  {p.githubUrl && (
                    <a href={withProtocol(p.githubUrl)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xs font-medium">
                      GitHub
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={withProtocol(p.liveUrl)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium">
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
