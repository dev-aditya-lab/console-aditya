import HeroSection from "@/components/sections/hero-section";
import { MainNavbar } from "@/components/MainNavbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { TimelineSection } from "@/components/sections/TimeLineSection";
import MySkills from "@/components/sections/MySkills";
import Footer from "@/components/sections/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";


export default function Home():React.ReactNode {
  return (
    <>
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
