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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("preloader-shown") === "true") {
      setLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("preloader-shown", "true");
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <PagePreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="relative z-[1] flex-1 w-full">
          <ParallaxStarsBackground />
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
