"use client";

import { motion } from "framer-motion";

interface PagePreloaderProps {
  onComplete: () => void;
}

export default function PagePreloader({ onComplete }: PagePreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 2.6, times: [0, 2.0 / 2.6, 1], ease: "easeInOut" }}
      onAnimationComplete={(definition) => {
        if (definition === "opacity") {
          onComplete();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#090A0F]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1, boxShadow: "0 0 0px rgba(96,165,250,0)" }}
        animate={{
          opacity: [0, 1, 1],
          scale: [1, 1, 40],
          boxShadow: [
            "0 0 0px rgba(96,165,250,0)",
            "0 0 20px rgba(96,165,250,0.4)",
            "0 0 0px rgba(96,165,250,0)",
          ],
        }}
        transition={{ duration: 2.0, times: [0, 0.6, 1], ease: "easeInOut" }}
        style={{
          padding: "1.5px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
        }}
      >
        <div
          style={{
            width: 117,
            height: 117,
            borderRadius: "50%",
            background: "#090A0F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 1.2 / 1.4, 1], ease: "linear" }}
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 700,
              fontSize: 20,
              color: "white",
            }}
          >
            NM
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
