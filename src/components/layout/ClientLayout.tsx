"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import PagePreloader from "@/components/ui/PagePreloader";

const PreloaderContext = createContext({ showContent: false });

export const usePreloader = () => useContext(PreloaderContext);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("visited") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPreloader(false);
      setShowContent(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("visited", "1");
    setShowContent(true);
    setTimeout(() => setShowPreloader(false), 500);
  };

  return (
    <PreloaderContext.Provider value={{ showContent }}>
      <AnimatePresence>
        {showPreloader && <PagePreloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}
