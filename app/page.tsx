import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import WhatIBuild from "@/components/WhatIBuild";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Ambient from "@/components/Ambient";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";

// Content comes from Supabase, so always render fresh.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Ambient />
      <Navbar />
      <Hero />
      <Stats />
      <TechMarquee />
      <About />
      <Projects />
      <Skills />
      <Writing />
      <WhatIBuild />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
