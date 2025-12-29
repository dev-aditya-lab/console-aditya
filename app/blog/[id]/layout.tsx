import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function stripMarkdown(md: string): string {
  return md
    .replace(/`{1,3}[^`]*`{1,3}/g, " ") // inline/backtick code
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, " ") // images
    .replace(/\[[^\]]*\]\([^\)]*\)/g, " ") // links
    .replace(/[#>*_~`\-]+/g, " ") // markdown tokens
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id).lean();
    if (!blog) {
      return {
        title: "Blog | Not Found",
        description: "Article not found",
        robots: { index: false, follow: true },
      };
    }

    const title = blog.title || "Blog";
    const description = stripMarkdown(String(blog.content || "")).slice(0, 160);
    const url = `${BASE_URL}/blog/${String(blog._id)}`;
    const publishedTime = blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined;

    return {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: "article",
        title,
        description,
        url,
        siteName: "Dev Aditya",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      other: publishedTime ? { "article:published_time": publishedTime } : undefined,
    };
  } catch {
    return {
      title: "Blog",
      description: "Articles on development and projects",
    };
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
