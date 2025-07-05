import HeroSection from "@/components/sections/hero-section";
import { MainNavbar } from "@/components/MainNavbar";
import { AboutSection } from "@/components/sections/AboutSection";


export default function Home():React.ReactNode {
  return (
    <>
    <MainNavbar/>
    <HeroSection/>
    <AboutSection/>
    </>
  )
}
