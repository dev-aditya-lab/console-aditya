import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";

import type { ProjectItem, BlogItem } from "@/lib/format";

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

type LeanBlog = {
  _id: unknown;
  title?: string;
  content?: string;
  author?: string;
  createdAt?: Date;
};

const toProject = (p: LeanProject): ProjectItem => ({
  _id: String(p._id),
  title: p.title,
  description: p.description,
  imageUrl: p.imageUrl,
  tags: Array.isArray(p.tags) ? p.tags : [],
  githubUrl: p.githubUrl,
  liveUrl: p.liveUrl,
  order: typeof p.order === "number" ? p.order : 0,
  createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
});

const toBlog = (b: LeanBlog): BlogItem => ({
  _id: String(b._id),
  title: b.title ?? "Untitled",
  content: b.content ?? "",
  author: b.author ?? "",
  createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
});

/** All content reads fail soft: if the database is unreachable the pages render their empty states. */
export async function getProjects(limit?: number): Promise<ProjectItem[]> {
  try {
    await connectDB();
    let q = Project.find().sort({ order: 1, createdAt: -1 });
    if (limit) q = q.limit(limit);
    const raw = (await q.lean()) as unknown as LeanProject[];
    return raw.map(toProject);
  } catch {
    return [];
  }
}

export async function getProject(id: string): Promise<ProjectItem | null> {
  try {
    if (!isValidObjectId(id)) return null;
    await connectDB();
    const raw = (await Project.findById(id).lean()) as unknown as LeanProject | null;
    return raw ? toProject(raw) : null;
  } catch {
    return null;
  }
}

export async function getBlogs(): Promise<BlogItem[]> {
  try {
    await connectDB();
    const raw = (await Blog.find().sort({ createdAt: -1 }).lean()) as unknown as LeanBlog[];
    return raw.map(toBlog);
  } catch {
    return [];
  }
}

export async function getBlog(id: string): Promise<BlogItem | null> {
  try {
    if (!isValidObjectId(id)) return null;
    await connectDB();
    const raw = (await Blog.findById(id).lean()) as unknown as LeanBlog | null;
    return raw ? toBlog(raw) : null;
  } catch {
    return null;
  }
}
