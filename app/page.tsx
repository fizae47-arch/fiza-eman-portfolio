import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import WhatIBuild from "@/components/WhatIBuild";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WhatIBuild />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
