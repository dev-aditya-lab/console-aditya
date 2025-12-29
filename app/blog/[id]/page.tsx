"use client";

import { use, useEffect, useState } from "react";
import { MarkdownRenderer } from "@/components/ui/markdown";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface BlogPageProps {
  params: Promise<{ id?: string | string[] }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const router = useRouter();
  const resolved = use(params);
  const id = Array.isArray(resolved?.id) ? resolved.id[0] : resolved?.id;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-400 rounded-full animate-spin"></div>
            <p className="text-lg text-white/60 font-medium">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
              Article Not Found
            </h2>
            <p className="text-white/60 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <button
              onClick={() => router.push('/blog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil(blog.content.split(' ').length / 200));

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-blue-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* JSON-LD structured data for Article */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            datePublished: new Date(blog.createdAt).toISOString(),
            dateModified: new Date(blog.createdAt).toISOString(),
            author: { '@type': 'Person', name: 'Aditya' },
            mainEntityOfPage: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${blog._id}`,
          }),
        }}
      />

      {/* Back Button */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-8">
        <button
          onClick={() => router.push('/blog')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>
      </div>

      {/* Article Header */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 pb-12">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min read
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent leading-tight mb-6">
          {blog.title}
        </h1>
      </div>

      {/* Article Content */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 pb-24">
        <article className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16 backdrop-blur-sm">
          <MarkdownRenderer content={blog.content} />
        
          {/* Author Section */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center ring-2 ring-white/10">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Aditya Gupta</p>
                  <p className="text-sm text-white/60">Developer & Writer</p>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/blog')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25"
              >
                <ArrowLeft className="w-4 h-4" />
                More Articles
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
