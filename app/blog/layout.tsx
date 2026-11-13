import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tutorials, lessons and notes on web development, TypeScript, React and Next.js by Aditya Gupta.",
  authors: [{ name: "Aditya Gupta" }],
  keywords: ["blog", "web development", "TypeScript", "React", "Next.js", "software engineering", "tutorials"],
};

// Shared chrome (nav, footer, transitions) comes from the root layout.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
