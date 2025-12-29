import Link from "next/link";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import type { Metadata } from "next";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No posts yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              {docs.length} {docs.length === 1 ? "article" : "articles"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Blog
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-3xl">
            Ideas, tutorials, and notes from my developer journey.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {docs.map((post) => (
            <article
              key={post._id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {readingTime(post.content)}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </h2>

                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  {getExcerpt(post.content)}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/blog/${post._id}`}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium shadow-md group-hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Read Article
                  </Link>
                  {post.author && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {post.author}
                    </span>
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
