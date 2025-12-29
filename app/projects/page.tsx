import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import ProjectsGrid, { ProjectItem } from "@/components/sections/ProjectsGrid";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "All projects by Aditya — full-stack apps, tools, and experiments.",
    alternates: { canonical: "/projects" },
    openGraph: { url: `${BASE_URL}/projects` },
    twitter: { title: "Projects" },
  };
}

export default async function ProjectsPage() {
  await connectDB();
  const raw = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* JSON-LD for Projects ItemList */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: projects.map((p, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: p.liveUrl || `${BASE_URL}/projects#${p._id}`,
              name: p.title,
            })),
          }),
        }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Projects</h1>
        {/* Client-side grid with filters */}
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
