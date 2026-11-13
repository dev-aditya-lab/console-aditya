"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/ui/code-block";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div
      className="prose prose-lg max-w-none
             prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink
             prose-h1:text-5xl md:prose-h1:text-6xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
             prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:pb-3 prose-h2:leading-snug
                 prose-h2:border-b prose-h2:border-ink/15
                 prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mb-3 prose-h3:mt-6
                 prose-h4:text-xl prose-h4:mt-4
                 prose-p:text-ink/80 prose-p:leading-relaxed prose-p:my-4
                 prose-a:text-accent hover:prose-a:text-ink prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                 prose-strong:text-ink prose-strong:font-bold
                 prose-code:bg-ink/5 prose-code:text-accent prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-ink/10
                 prose-pre:bg-transparent prose-pre:shadow-none prose-pre:rounded-xl prose-pre:!p-0
                 prose-ul:my-6 prose-ol:my-6 prose-ul:list-outside prose-ol:list-outside
                 prose-li:marker:text-accent
                 prose-li:text-ink/80 prose-li:leading-relaxed
                 prose-img:rounded-2xl prose-img:shadow-xl"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-ink mt-8 mb-6 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mt-10 mb-5 pb-3 border-b border-ink/15 leading-snug">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink/90 mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold tracking-tight text-ink/90 mt-4 mb-2">
              {children}
            </h4>
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code({ inline, className, children, ...props }: any) {
            const match = /language-([\w-]+)/.exec(className || "");
            const raw = String(children).replace(/\n$/, "");
            if (!inline && match) {
              return (
                <CodeBlock language={match[1]} filename="" highlightLines={[]} code={raw} />
              );
            }
            return (
              <code
                className="bg-ink/5 text-accent px-2 py-0.5 rounded-md text-sm font-semibold border border-ink/10"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Avoid invalid <div> inside <p> by returning only the image element
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          img: ({ ...props }: any) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              className="my-8 rounded-xl shadow-2xl mx-auto w-full object-cover border border-ink/10"
              alt={props.alt || "Image"}
            />
          ),
          a: ({ ...props }) => (
            <a
              {...props}
              className="text-accent hover:text-ink font-medium underline decoration-2 underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent bg-accent-soft pl-6 pr-4 py-4 my-6 rounded-r-2xl italic text-ink/75">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-10 border-0 h-[1px] bg-ink/15" />
          ),
          ul: ({ children }) => <ul className="space-y-2 my-6">{children}</ul>,
          ol: ({ children }) => <ol className="space-y-2 my-6 list-decimal">{children}</ol>,
          li: ({ children }) => (
            <li className="relative pl-2 text-ink/80">
              <span className="inline-flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="flex-1">{children}</span>
              </span>
            </li>
          ),
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-ink">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-white font-bold text-sm uppercase tracking-wider border-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-ink/80 border-t border-ink/10 bg-white">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="bg-white even:bg-surface hover:bg-accent-soft transition-colors">
              {children}
            </tr>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
