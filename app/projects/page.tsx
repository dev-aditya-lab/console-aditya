import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { PageHero } from "@/components/site/PageHero";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { projectsPage } from "@/data/site";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Projects",
  description: "Apps, tools and experiments by Aditya Gupta — full-stack products built to be used.",
  alternates: { canonical: "/projects" },
  openGraph: { url: `${BASE_URL}/projects` },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${BASE_URL}/projects/${p._id}`,
              name: p.title,
            })),
          }),
        }}
      />
      <PageHero index="07" eyebrow={projectsPage.eyebrow} title={projectsPage.heading} subtitle={projectsPage.subheading} />
      <section className="gutter pb-24 pt-10 md:pb-40">
        <div className="container-wide">
          <ProjectGrid projects={projects} empty={projectsPage.empty} />
        </div>
      </section>
    </>
  );
}
