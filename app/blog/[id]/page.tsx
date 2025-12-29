"use client";

import { use, useEffect, useState } from "react";
import { MarkdownRenderer } from "@/components/ui/markdown";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = use(params);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-2">Article Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <p className="text-sm font-medium text-white">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            {/* <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <p className="text-sm font-medium text-white">
                {Math.ceil(blog.content.split(' ').length / 200)} min read
              </p>
            </div> */}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
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
          <MarkdownRenderer content={blog.content} />
        
          {/* Footer Section */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Aditya</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Developer & Writer</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                ← Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
