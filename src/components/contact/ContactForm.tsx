"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

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
      // EmailJS integration — add your keys to .env.local
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
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // Fallback — mailto link
        window.open(
          `mailto:mohannitin494@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        );
        setState("success");
      }
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-[10px] px-[16px] py-[14px] text-[14px] text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[rgba(96,165,250,0.5)] focus:bg-[rgba(255,255,255,0.07)] transition-colors duration-200";

  const labelClass = "text-[12px] text-[rgba(255,255,255,0.5)] font-[500] mb-[6px] block";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className={labelClass} htmlFor="contact-name">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Nitin Mohan"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            disabled={state === "loading"}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className={labelClass} htmlFor="contact-email">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            disabled={state === "loading"}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="What's this about?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
          disabled={state === "loading"}
        />
        {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
      </div>

      <div className="flex flex-col">
        <label className={labelClass} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Tell me about your project or opportunity…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} min-h-[120px] resize-y`}
          disabled={state === "loading"}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
      </div>

      <AnimatePresence mode="wait">
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-emerald-400 text-sm p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle size={16} /> Message sent successfully! I&apos;ll get back to you soon.
          </motion.div>
        )}
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20"
          >
            <AlertCircle size={16} /> Something went wrong. Please try again or email me directly.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={state === "loading"}
        whileHover={{ opacity: 0.9 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-[16px] rounded-[10px] bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] text-white font-[600] text-[15px] border-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {state === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}
