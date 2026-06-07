import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Education from "@/components/education/Education";
import Certifications from "@/components/certifications/Certifications";
import Contact from "@/components/contact/Contact";
import HeroBackground from "@/components/ui/HeroBackground";

export default function Home() {
  return (
    <>
      <HeroBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
