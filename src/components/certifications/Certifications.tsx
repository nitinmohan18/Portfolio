"use client";

import { motion } from "framer-motion";
import {
  Award,
  Brain,
  CheckCircle2,
  Clock3,
  Code2,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CertificationCard from "./CertificationCard";
import { certifications } from "@/data/certifications";

const credentialTracks = [
  {
    title: "AI/ML foundations",
    status: "In progress",
    icon: Brain,
    accent: "96, 165, 250",
    focus: "Model evaluation, applied ML, and responsible AI workflows.",
  },
  {
    title: "Full-stack systems",
    status: "Planned",
    icon: Code2,
    accent: "167, 139, 250",
    focus: "Modern React, API design, deployment, and production reliability.",
  },
  {
    title: "Cloud deployment",
    status: "Planned",
    icon: ShieldCheck,
    accent: "52, 211, 153",
    focus: "Hosting, observability, secure configuration, and CI/CD practice.",
  },
];

const verificationPrinciples = [
  "Public verification links",
  "Credential IDs when available",
  "Skills mapped to real projects",
];

export default function Certifications() {
  const skillCount = new Set(certifications.flatMap((cert) => cert.skills)).size;
  const categoryCount = new Set(certifications.map((cert) => cert.category)).size;

  return (
    <SectionWrapper id="certifications" className="!py-24 md:!py-32">
      <div className="relative flex flex-col gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-400/70" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-blue-300 drop-shadow-[0_0_12px_rgba(96,165,250,0.55)]">
              Credential Vault
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-blue-400/70" />
          </div>

          <h2 className="font-display text-[clamp(2.25rem,6.5vw,4.9rem)] font-extrabold leading-[1] tracking-tight text-white">
            Proof that feels{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              earned
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
            Certifications are treated as verifiable proof, not decoration. Each
            credential will connect back to skills, issuer data, and project evidence.
          </p>
        </motion.div>

        {certifications.length > 0 ? (
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                { label: "Verified credentials", value: certifications.length, icon: Award },
                { label: "Skill signals", value: skillCount, icon: Sparkles },
                { label: "Domains covered", value: categoryCount, icon: FileCheck },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/38">
                          {item.label}
                        </p>
                        <p className="mt-2 font-display text-3xl font-extrabold text-white">
                          {item.value}
                        </p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/18 bg-blue-300/[0.07] text-blue-300">
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2" style={{ perspective: "1200px" }}>
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(5,10,20,0.74)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 bg-blue-300/[0.04]" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-300/[0.08] text-blue-300">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/38">
                      Verification desk
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Credentials coming with proof
                    </h3>
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                      In progress
                    </span>
                    <Clock3 size={18} className="text-white/36" />
                  </div>

                  <div className="mt-12">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-white/32">
                      Public certificate preview
                    </p>
                    <h4 className="mt-2 font-display text-3xl font-extrabold leading-tight text-white">
                      Verified achievements will appear here
                    </h4>
                    <p className="mt-4 text-sm leading-7 text-white/56">
                      Until the first certificate is earned, this section highlights
                      the standards used for future credentials: verifiable issuer
                      links, clear skill mapping, and no inflated claims.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-2">
                    {verificationPrinciples.map((principle) => (
                      <div
                        key={principle}
                        className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/15 px-3 py-2 text-sm text-white/68"
                      >
                        <CheckCircle2 size={15} className="text-emerald-300" />
                        {principle}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {credentialTracks.map((track, index) => {
                const Icon = track.icon;

                return (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.09, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:border-white/18 hover:bg-white/[0.055]"
                  >
                    <div
                      className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      style={{ backgroundImage: `linear-gradient(90deg, transparent, rgba(${track.accent}, 0.8), transparent)` }}
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-white/[0.035]"
                        style={{
                          borderColor: `rgba(${track.accent}, 0.22)`,
                          color: `rgb(${track.accent})`,
                          backgroundColor: `rgba(${track.accent}, 0.08)`,
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display text-xl font-bold text-white">
                            {track.title}
                          </h4>
                          <span
                            className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                            style={{
                              borderColor: `rgba(${track.accent}, 0.22)`,
                              color: `rgb(${track.accent})`,
                              backgroundColor: `rgba(${track.accent}, 0.08)`,
                            }}
                          >
                            {track.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-white/58">
                          {track.focus}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
