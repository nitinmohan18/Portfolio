"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, AlertCircle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");

    try {
      const { EMAILJS_CONFIG } = await import("@/lib/constants");
      if (
        EMAILJS_CONFIG.serviceId &&
        EMAILJS_CONFIG.templateId &&
        EMAILJS_CONFIG.publicKey
      ) {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          EMAILJS_CONFIG.publicKey
        );
        setState("success");
        setTimeout(() => {
           setForm({ name: "", email: "", subject: "", message: "" });
           setState("idle");
        }, 3000);
      } else {
        window.open(
          `mailto:mohannitin494@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        );
        setState("success");
        setTimeout(() => setState("idle"), 3000);
      }
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[12px] px-[16px] py-[14px] text-[14px] text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#60a5fa] focus:bg-[rgba(255,255,255,0.06)] focus:ring-4 focus:ring-[#60a5fa]/20 transition-all duration-300";

  const labelClass = "text-[12px] text-[rgba(255,255,255,0.65)] font-[600] font-mono tracking-widest uppercase mb-[8px] block";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className={labelClass} htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            disabled={state === "loading" || state === "success"}
          />
          {errors.name && <p className="text-[11px] font-mono text-red-400 mt-1">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className={labelClass} htmlFor="contact-email">Your Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            disabled={state === "loading" || state === "success"}
          />
          {errors.email && <p className="text-[11px] font-mono text-red-400 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          placeholder="What's this about?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
          disabled={state === "loading" || state === "success"}
        />
        {errors.subject && <p className="text-[11px] font-mono text-red-400 mt-1">{errors.subject}</p>}
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          placeholder="Tell me about your project or opportunity…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} min-h-[140px] resize-y`}
          disabled={state === "loading" || state === "success"}
        />
        {errors.message && <p className="text-[11px] font-mono text-red-400 mt-1">{errors.message}</p>}
      </div>

      <AnimatePresence mode="wait">
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-400 text-[13px] font-mono px-4 py-3 rounded-[12px] bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]"
          >
            <AlertCircle size={16} /> Something went wrong. Please try again or email me directly.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2 flex justify-start">
        <MagneticButton>
          <motion.button
            type="submit"
            disabled={state === "loading" || state === "success"}
            layout
            initial={false}
            animate={{
              width: state === "success" ? "56px" : "180px",
              backgroundColor: state === "success" ? "#34d399" : "#60a5fa",
              borderRadius: state === "success" ? "50px" : "12px",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="h-[56px] text-white font-[600] text-[15px] border-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 overflow-hidden shadow-[0_8px_20px_-8px_rgba(96,165,250,0.5)]"
          >
            <AnimatePresence mode="wait">
              {state === "idle" || state === "error" ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </motion.div>
              ) : state === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center"
                >
                  <Loader2 size={24} className="animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex items-center"
                >
                  <Check size={28} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </MagneticButton>
      </div>
    </form>
  );
}
