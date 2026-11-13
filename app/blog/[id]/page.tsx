import { notFound } from "next/navigation";
import { getBlog } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/format";
import { MarkdownRenderer } from "@/components/ui/markdown";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { TLink } from "@/components/motion/TransitionProvider";
import { Button } from "@/components/site/Button";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            datePublished: blog.createdAt,
            dateModified: blog.createdAt,
            author: { "@type": "Person", name: siteConfig.name },
            mainEntityOfPage: `${BASE_URL}/blog/${blog._id}`,
          }),
        }}
      />

      <header className="gutter pb-12 pt-40 md:pt-48">
        <div className="mx-auto max-w-4xl">
          <Reveal hero y={16} className="label mb-8 flex flex-wrap items-center gap-4 text-muted-foreground">
            <TLink href="/blog" className="group inline-flex items-center gap-2">
              <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
              <span className="u-link">All posts</span>
            </TLink>
            <span className="h-px w-10 bg-ink/20" />
            <span>{formatDate(blog.createdAt, true)}</span>
            <span>{readingTime(blog.content)}</span>
          </Reveal>
          <SplitReveal as="h1" hero className="display-lg text-balance">
            {blog.title}
          </SplitReveal>
        </div>
      </header>

      <article className="gutter pb-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-[0_40px_90px_-50px_rgb(10_10_11/0.35)] backdrop-blur-md sm:p-10 md:p-14">
          <MarkdownRenderer content={blog.content} />
        </div>
      </article>

      <section className="gutter pb-24 md:pb-40">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-10">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-white">AG</span>
            <div>
              <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
              <p className="text-sm text-muted-foreground">Developer & writer</p>
            </div>
          </div>
          <Button href="/blog" variant="outline">More posts</Button>
        </div>
      </section>
    </>
  );
}
