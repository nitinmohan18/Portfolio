"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PagePreloader from "@/components/ui/PagePreloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import ParallaxStarsBackground from "@/components/hero/ParallaxStarsBackground";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Education from "@/components/education/Education";
import Certifications from "@/components/certifications/Certifications";
import Contact from "@/components/contact/Contact";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Skip on subsequent visits this session
    if (sessionStorage.getItem("visited") === "1") {
      setShowPreloader(false);
      setShowContent(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("visited", "1");
    setShowContent(true);
    setTimeout(() => setShowPreloader(false), 500); // let overlay fade
  };

  return (
    <>
      <AnimatePresence>
        {showPreloader && <PagePreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="relative z-[1] flex-1 w-full flex flex-col gap-0">
          <ParallaxStarsBackground />
          <Hero isVisible={showContent} />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Education />
          <div className="section-divider" />
          <Certifications />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
