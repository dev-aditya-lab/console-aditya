"use client";

import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-bold
            prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:font-semibold
            prose-pre:bg-gray-900 prose-pre:shadow-lg prose-pre:rounded-xl
            prose-ul:my-8 prose-ul:space-y-3
            prose-ol:my-8 prose-ol:space-y-3
            prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
            prose-table:shadow-lg prose-table:border-collapse prose-table:w-full prose-table:my-8
            prose-thead:bg-gradient-to-r prose-thead:from-blue-600 prose-thead:to-purple-600
            prose-th:text-white prose-th:font-bold prose-th:p-4 prose-th:text-left prose-th:border-0
            prose-td:p-4 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700
            prose-tr:bg-white dark:prose-tr:bg-gray-800 prose-tr:even:bg-gray-50 dark:prose-tr:even:bg-gray-700/50">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  style={atomDark as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-md text-sm font-semibold border border-pink-200 dark:border-pink-800 cursor-copy"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            img: ({ ...props }: any) => (
              <div className="my-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...props}
                  className="rounded-2xl shadow-2xl mx-auto w-full object-cover border-4 border-gray-100 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300"
                  alt={props.alt || "Blog Image"}
                />
                {props.alt && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
                    {props.alt}
                  </p>
                )}
              </div>
            ),
            a: ({ ...props }) => (
              <a
                {...props}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 pl-6 pr-4 py-4 my-6 rounded-r-lg italic text-gray-700 dark:text-gray-300 shadow-md">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div className="flex-1">{children}</div>
                </div>
              </blockquote>
            ),
            hr: () => (
              <hr className="my-12 border-0 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            ),
            ul: ({ children }) => (
              <ul className="space-y-3 my-8">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-3 my-8 list-decimal">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="relative pl-2">
                <span className="inline-flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  <span className="flex-1">{children}</span>
                </span>
              </li>
            ),
            table: ({ children }) => (
              <div className="my-8 overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full border-collapse">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider border-0">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                {children}
              </td>
            ),
            tr: ({ children }) => (
              <tr className="bg-white dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                {children}
              </tr>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
        
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
        </article>
      </div>
      </div>
    </div>
  );
}
