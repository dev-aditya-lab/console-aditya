import HeroSection from "@/components/sections/hero-section";
import { MainNavbar } from "@/components/MainNavbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { TimelineSection } from "@/components/sections/TimeLineSection";
import MySkills from "@/components/sections/MySkills";
import Footer from "@/components/sections/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Aditya Dev Portfolio";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SITE_NAME,
    description:
      "Portfolio and blog by Aditya — showcasing projects, skills, and articles on modern web development.",
    alternates: { canonical: "/" },
    openGraph: { url: BASE_URL },
    twitter: { title: SITE_NAME },
  };
}


export default function Home():React.ReactNode {
  return (
    <>
    {/* JSON-LD for WebSite & Organization */}
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: BASE_URL,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${BASE_URL}/blog?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Aditya',
          url: BASE_URL,
        }),
      }}
    />
    <MainNavbar/>
    <section id="home">
      <HeroSection/>
    </section>
    <section id="about">
      <AboutSection/>
    </section>
    <section id="timeline">
      <TimelineSection/>
    </section>
    <section id="skills">
      <MySkills/>
    </section>
    {/* Projects Section placed before Contact & Footer */}
    <section id="projects">
      <ProjectsSection />
    </section>
    <section id="contact">
      <Contact/>
    </section>
    <Footer/>
    </>
  )
}
