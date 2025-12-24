import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import ProjectsGrid, { ProjectItem } from "@/components/sections/ProjectsGrid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectDB();
  const raw = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  const projects: ProjectItem[] = raw.map((p: any) => ({
    _id: String(p._id),
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    tags: p.tags ?? [],
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    order: typeof p.order === "number" ? p.order : 0,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Projects</h1>
        {/* Client-side grid with filters */}
        {/* @ts-expect-error Server-to-client prop */}
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
