import HeroSection from "@/components/sections/hero-section";
import { MainNavbar } from "@/components/MainNavbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { Contact } from "@/components/sections/Contact";
import { TimelineSection } from "@/components/sections/TimeLineSection";
import MySkills from "@/components/sections/MySkills";
import Footer from "@/components/sections/Footer";


export default function Home():React.ReactNode {
  return (
    <>
    <MainNavbar/>
    <HeroSection/>
    <AboutSection/>
    <TimelineSection/>
    <MySkills/>
    <Contact/>
    <Footer/>
    </>
  )
}
