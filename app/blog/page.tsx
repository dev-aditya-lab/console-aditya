import Link from "next/link";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import type { Metadata } from "next";
import { BookOpen, Clock, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description: "Articles, tutorials, and notes on modern web development by Aditya.",
    alternates: { canonical: "/blog" },
    openGraph: { url: `${BASE_URL}/blog` },
    twitter: { title: "Blog" },
  };
}

type BlogItem = {
  _id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
};

function formatDate(input: string): string {
  try {
    return new Date(input).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return input;
  }
}

function readingTime(text: string): string {
  const words = text?.trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function getExcerpt(text: string, length = 160): string {
  const clean = text.replace(/[#*_`>\-]/g, " ");
  const trimmed = clean.trim();
  if (trimmed.length <= length) return trimmed;
  const clipped = trimmed.slice(0, length);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : length)}…`;
}

export default async function BlogListPage() {
  await connectDB();
  const raw = await Blog.find().sort({ createdAt: -1 }).lean();
  const docs: BlogItem[] = raw.map((d) => ({
    _id: String(d._id),
    title: d.title ?? "Untitled",
    content: d.content ?? "",
    author: d.author ?? "",
    createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
  }));

  if (!docs || docs.length === 0) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium text-white/70">Blog</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
            No posts yet
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Check back soon for articles, tutorials, and insights on modern web development.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* JSON-LD for Blog ItemList */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: docs.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${BASE_URL}/blog/${post._id}`,
              name: post.title,
            })),
          }),
        }}
      />

      {/* Header Section */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pt-24 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-white/10 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Articles & Insights
            </span>
          </div>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/60 backdrop-blur-sm">
            {docs.length} {docs.length === 1 ? "article" : "articles"}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent leading-tight mb-4">
          Developer Blog
        </h1>
        <p className="text-white/60 text-lg max-w-3xl">
          Ideas, tutorials, and notes from my developer journey. Exploring modern web development, TypeScript, React, and beyond.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((post) => (
            <article
              key={post._id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-indigo-500/0 group-hover:from-sky-500/5 group-hover:to-indigo-500/5 rounded-2xl transition-all duration-300" />

              {/* Content */}
              <div className="relative">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-4 text-xs text-white/50">
                  <time className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                    {formatDate(post.createdAt)}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {readingTime(post.content)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  <Link href={`/blog/${post._id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {getExcerpt(post.content)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors group/link"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Article</span>
                    <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                  </Link>
                  {post.author && (
                    <span className="text-xs text-white/40">{post.author}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
