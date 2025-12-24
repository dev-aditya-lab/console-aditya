import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Link from "next/link";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

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
  await connectDB();
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
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">A few things I’ve built recently.</p>
          </div>
          <Link href="/projects" className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium">
            View All
          </Link>
        </div>

        {/* Client-side grid with tag filters */}
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
