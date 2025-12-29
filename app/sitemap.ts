import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Project from "@/models/Project";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  try {
    await connectDB();
    const blogs = await Blog.find().select(["_id", "updatedAt"]).lean();
    for (const b of blogs) {
      routes.push({
        url: `${BASE_URL}/blog/${String(b._id)}`,
        lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    const projects = await Project.find().select(["_id", "updatedAt"]).lean();
    for (const p of projects) {
      routes.push({
        url: `${BASE_URL}/projects#${String(p._id)}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // Fallback to static routes if DB is unavailable
  }

  return routes;
}
