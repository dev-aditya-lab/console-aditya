import type { Metadata } from "next";
import { getBlogs } from "@/lib/content";
import { excerpt, formatDate, readingTime } from "@/lib/format";
import { PageHero } from "@/components/site/PageHero";
import { TLink } from "@/components/motion/TransitionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/site/Button";
import { Scramble } from "@/components/motion/Scramble";
import { blogPage } from "@/data/site";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tutorials, lessons and notes on modern web development by Aditya Gupta.",
  alternates: { canonical: "/blog" },
  openGraph: { url: `${BASE_URL}/blog` },
};

export default async function BlogListPage() {
  const posts = await getBlogs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${BASE_URL}/blog/${p._id}`,
              name: p.title,
            })),
          }),
        }}
      />
      <PageHero index="08" eyebrow={blogPage.eyebrow} title={blogPage.heading} subtitle={blogPage.subheading} />

      <section className="gutter pb-24 pt-10 md:pb-40">
        <div className="container-wide">
          {posts.length === 0 ? (
            <p className="rounded-3xl border border-ink/10 bg-surface p-12 text-center text-muted-foreground">{blogPage.empty}</p>
          ) : (
            <ul className="border-t border-ink/15">
              {posts.map((p, i) => (
                <Reveal as="li" key={p._id} y={30} className="border-b border-ink/15">
                  <TLink
                    href={`/blog/${p._id}`}
                    data-cursor="Read"
                    className="group relative grid gap-4 py-9 transition-all duration-500 hover:px-5 md:grid-cols-12 md:items-center md:gap-8 md:py-12"
                  >
                    <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" aria-hidden />
                    <span className="label text-muted-foreground md:col-span-2">
                      <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {formatDate(p.createdAt)}
                    </span>
                    <div className="md:col-span-8">
                      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                        <Scramble text={p.title} />
                      </h2>
                      <p className="mt-3 line-clamp-2 max-w-2xl text-muted-foreground">{excerpt(p.content)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                      <span className="label text-muted-foreground">{readingTime(p.content)}</span>
                      <ArrowIcon className="text-3xl" />
                    </div>
                  </TLink>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
