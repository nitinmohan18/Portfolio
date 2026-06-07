"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { GithubRepo } from "@/types/project";

export default function ProjectCard({ repo, index }: { repo: GithubRepo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, borderColor: "rgba(96,165,250,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
      style={{
        background: "rgba(5, 10, 20, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "14px",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="flex flex-col h-full overflow-hidden group cursor-default"
    >
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="px-[20px] pt-[20px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <h3 className="text-[18px] font-[600] text-white tracking-wide truncate">
              {repo.name}
            </h3>
          </div>
          <div className="px-[8px] py-[3px] rounded-[20px] text-[10px] font-[600] tracking-wider bg-[rgba(40,202,65,0.15)] text-[#28ca41] border border-[rgba(40,202,65,0.3)] shrink-0">
            ACTIVE
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-[rgba(255,255,255,0.65)] leading-[1.6] px-[20px] py-[16px] flex-1">
          {repo.description}
        </p>

        {/* Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 px-[20px] pb-[20px]">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.08)]"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex gap-[10px] px-[20px] pb-[20px]">
          <motion.a
            whileHover={{ opacity: 0.85, y: -1 }}
            transition={{ duration: 0.2 }}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.8)] p-[10px] rounded-[8px] text-[13px] font-[500] cursor-pointer"
          >
            <Github size={16} />
            Git Repo
          </motion.a>
          
          {repo.homepage && (
            <motion.a
              whileHover={{ opacity: 0.85, y: -1 }}
              transition={{ duration: 0.2 }}
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] text-white border-none p-[10px] rounded-[8px] text-[13px] font-[600] cursor-pointer"
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
