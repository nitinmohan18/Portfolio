import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import FooterBorder from "@/components/layout/FooterBorder";
import Hero from "@/components/hero/Hero";
import ParallaxStarsBackground from "@/components/hero/ParallaxStarsBackground";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";

import Certifications from "@/components/certifications/Certifications";
import Contact from "@/components/contact/Contact";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="relative z-[1] flex-1 w-full flex flex-col gap-0 overflow-x-hidden">
          <ParallaxStarsBackground />
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />

          <Certifications />
          <div className="section-divider" />
          <div className="pb-24">
            <Contact />
          </div>

          {/* Absolute Bottom Footer Border */}
          <FooterBorder />
        </main>
      </div>
      <ScrollToTop />
    </ClientLayout>
  );
}
