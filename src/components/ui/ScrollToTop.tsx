"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ScrollToTop() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-10 sm:right-10">
      <MagneticButton>
        <motion.button
          onClick={handleScrollTop}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover="hover"
          className="group relative flex h-[48px] w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(5,10,20,0.8)] shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-[12px] transition-colors hover:border-[#60a5fa]/50 sm:h-[64px] sm:w-[64px]"
          aria-label="Back to top"
        >
          <motion.div
            variants={{
              hover: { y: -40, opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <ArrowUp size={20} className="sm:h-[24px] sm:w-[24px]" />
          </motion.div>
          <motion.div
            variants={{
              hover: { y: 0, opacity: 1 },
            }}
            initial={{ y: 40, opacity: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute text-[20px] sm:text-[24px]"
          >
            🚀
          </motion.div>
        </motion.button>
      </MagneticButton>
    </div>
  );
}
