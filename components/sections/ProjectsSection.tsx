import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Link from "next/link";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

type ProjectItem = {
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

export default async function ProjectsSection() {
  noStore();
  try {
    await connectDB();
  } catch {
    // If DB is unavailable during build or runtime, skip rendering section
    return null;
  }
  const raw = await Project.find().sort({ createdAt: -1 }).lean();
  type LeanProject = {
    _id: unknown;
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[];
    githubUrl?: string;
    liveUrl?: string;
    order?: number;
    createdAt?: Date;
  };
  const docs = raw as unknown as LeanProject[];
  const projects: ProjectItem[] = docs.map((p: LeanProject) => ({
    _id: String(p._id),
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    tags: Array.isArray(p.tags) ? p.tags : [],
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    order: typeof p.order === "number" ? p.order : 0,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
  }));

  projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-20 text-white">
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/80">Featured Work</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">Featured Projects</h2>
            <p className="text-slate-200/75">A curated set of builds that show product thinking, engineering depth, and polish.</p>
          </div>
          <Link href="/projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20">
            View all
          </Link>
        </div>

        {/* Client-side grid with tag filters */}
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
