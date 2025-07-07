import HeroSection from "@/components/sections/hero-section";
import { MainNavbar } from "@/components/MainNavbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { TimelineSection } from "@/components/sections/TimeLineSection";


export default function Home():React.ReactNode {
  return (
    <>
    <MainNavbar/>
    <HeroSection/>
    <AboutSection/>
    <TimelineSection/>
    <Contact/>
    </>
  )
}
