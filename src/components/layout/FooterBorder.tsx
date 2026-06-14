"use client";
import { motion } from "framer-motion";

export default function FooterBorder() {
  return (
    <motion.div 
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.8) 50%, transparent 100%)",
        backgroundSize: "200% auto"
      }}
      className="absolute bottom-0 left-0 right-0 h-[2px] shadow-[0_-2px_15px_rgba(34,211,238,0.6)]"
    />
  );
}
