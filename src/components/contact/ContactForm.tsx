"use client";

import type { ComponentType, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Mail,
  Check,
  Loader2,
  Lock,
  Send,
  TextCursorInput,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/* ─── Constants ─── */
const MAX_MESSAGE_LENGTH = 2000;

/* ─── Types ─── */
type FormState = "idle" | "loading" | "success" | "error";
type FieldName = keyof FormData;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldFrameProps {
  id: string;
  label: string;
  error?: string;
  icon?: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  children: ReactNode;
}

/* ─── Field Frame ─── */
function FieldFrame({ id, label, error, icon: Icon, children }: FieldFrameProps) {
  return (
    <div className="group flex flex-col" style={{ gap: "6px" }}>
      <label
        className="text-[13px] font-medium text-white/70 transition-colors duration-300 group-focus-within:text-cyan-400"
        htmlFor={id}
      >
        {label}
      </label>

      <div
        className={cn(
          "relative overflow-hidden border bg-[#05070c] transition-all duration-500",
          "border-white/[0.1] shadow-[inset_0_2px_12px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.05)]",
          "hover:border-cyan-400/30 hover:bg-[#070a12] hover:shadow-[0_0_15px_rgba(34,211,238,0.05),inset_0_2px_12px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.05)]",
          "focus-within:!border-cyan-400/60 focus-within:bg-[#080b14] focus-within:shadow-[0_0_20px_rgba(34,211,238,0.15),inset_0_2px_12px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(0,0,0,0.5)]",
          error &&
            "border-red-400/50 bg-red-400/[0.04] focus-within:!border-red-400/60 focus-within:shadow-[0_0_20px_rgba(248,113,113,0.12)]"
        )}
        style={{ borderRadius: "14px" }}
      >
        {/* Animated top border tracing effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] -translate-x-[100%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-all duration-700 ease-out group-focus-within:translate-x-0 group-focus-within:opacity-100" />
        
        {/* Active state neon dot */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-5 w-[3px] -translate-x-full -translate-y-1/2 rounded-r-full bg-cyan-400 opacity-0 shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-all duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100" />

        {Icon && (
          <Icon
            size={16}
            className={cn(
              "pointer-events-none absolute text-white/30 transition-colors duration-300 group-focus-within:text-cyan-400",
              error && "text-red-400/80"
            )}
            style={{ left: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
        )}
        {children}
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
            className="flex items-center gap-1.5 mt-1.5 ml-1"
          >
            <AlertCircle size={14} strokeWidth={2.5} className="text-rose-400" />
            <p className="font-sans text-[13px] font-medium text-rose-400/90">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Contact Form Component ─── */
export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const disabled = state === "loading" || state === "success";

  function getSequentialErrors(currentForm: FormData): Partial<FormData> {
    const newErrors: Partial<FormData> = {};
    if (!currentForm.name.trim()) newErrors.name = "Please provide your name to proceed.";
    else if (!currentForm.email.trim()) newErrors.email = "An email address is required for correspondence.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentForm.email))
      newErrors.email = "The email format provided appears to be invalid.";
    else if (!currentForm.subject.trim()) newErrors.subject = "Please specify the purpose of your inquiry.";
    else if (!currentForm.message.trim()) newErrors.message = "Kindly provide the details of your request.";
    return newErrors;
  }

  function updateField(field: FieldName, value: string) {
    if (field === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((current) => {
      const nextForm = { ...current, [field]: value };
      setErrors((currentErrors) => {
        if (Object.keys(currentErrors).length > 0) {
          return getSequentialErrors(nextForm);
        }
        return currentErrors;
      });
      return nextForm;
    });
    if (state === "error") setState("idle");
  }

  function validate(): boolean {
    const newErrors = getSequentialErrors(form);
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
      } else {
        window.open(
          `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        );
      }

      setState("success");
      setErrors({});
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setState("idle");
      }, 2600);
    } catch {
      setState("error");
    }
  }

  const getInputClass = () =>
    cn(
      "w-full border-0 bg-transparent text-[13px] font-medium text-white/90 placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-300"
    );

  return (
    <div className="relative">
      <style>{`
        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 55%, rgba(130,215,238,0.22) 70%, transparent 78%);
          transform: translate(-50%, -50%) scale(0);
          filter: blur(1.5px);
          animation: rippleOut 6s ease-out infinite;
        }
        @keyframes rippleOut {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
          60% { opacity: 0.25; }
          100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
        @keyframes still-shine-sweep {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      {/* Soft cyan edge illumination / outer glow */}
      <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-br from-cyan-400/40 via-purple-500/10 to-transparent blur-2xl opacity-70" />

      {/* Card - Premium 3D Metallic Surface */}
      <div className="group/maincard relative overflow-hidden rounded-[28px] border border-white/[0.18] bg-gradient-to-br from-[#12182B] via-[#0A0F1C] to-[#04060A] shadow-[0_40px_100px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-3xl transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.8),inset_0_0_25px_rgba(34,211,238,0.15)] hover:border-cyan-400/40 hover:-translate-y-1">
        {/* Top Edge Neon Highlight */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_1px_10px_2px_rgba(34,211,238,0.6)] opacity-60 transition-opacity duration-500 group-hover/maincard:opacity-100" />
        
        {/* Subtle Ambient Radial Glow inside the card */}
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(400px_circle_at_0%_0%,rgba(34,211,238,0.3),transparent_70%)] transition-opacity duration-500 group-hover/maincard:opacity-40" />

        {/* Decorative corner circle */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/[0.08] bg-white/[0.02]" />

        <div className="relative z-10 w-full" style={{ padding: "1.5rem", boxSizing: "border-box" }}>
          {/* ── Card Header ── */}
          <div className="flex items-center gap-2" style={{ marginBottom: "1.5rem" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            </span>
            <h3 className="font-mono text-[13px] font-bold uppercase tracking-widest text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
              START A CONVERSATION
            </h3>
          </div>

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 flex flex-col"
            style={{ gap: "1.25rem" }}
          >
            {/* Row 1: Name + Email */}
            <div className="grid sm:grid-cols-2" style={{ gap: "1.25rem" }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <FieldFrame
                  id="contact-name"
                  label="Name"
                  icon={User}
                  error={errors.name}
                >
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={getInputClass()}
                    style={{ paddingTop: "13px", paddingBottom: "13px", paddingRight: "14px", paddingLeft: "38px" }}
                    disabled={disabled}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                </FieldFrame>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <FieldFrame
                  id="contact-email"
                  label="Email"
                  icon={Mail}
                  error={errors.email}
                >
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={getInputClass()}
                    style={{ paddingTop: "13px", paddingBottom: "13px", paddingRight: "14px", paddingLeft: "38px" }}
                    disabled={disabled}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                </FieldFrame>
              </motion.div>
            </div>

            {/* Row 2: Subject */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FieldFrame
                id="contact-subject"
                label="Subject"
                icon={TextCursorInput}
                error={errors.subject}
              >
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className={getInputClass()}
                  style={{ paddingTop: "13px", paddingBottom: "13px", paddingRight: "14px", paddingLeft: "38px" }}
                  disabled={disabled}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                />
              </FieldFrame>
            </motion.div>

            {/* Row 3: Message with character counter */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <FieldFrame
                id="contact-message"
                label="Message"
                error={errors.message}
              >
                <textarea
                  id="contact-message"
                  placeholder="Share details about the opportunity or collaboration."
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={cn(getInputClass(), "resize-none leading-6")}
                  style={{ minHeight: "110px", paddingTop: "13px", paddingBottom: "36px", paddingRight: "14px", paddingLeft: "14px" }}
                  disabled={disabled}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {/* Character counter */}
                <span className="pointer-events-none absolute font-mono text-[10px] tabular-nums text-white/22" style={{ bottom: "10px", right: "12px" }}>
                  {form.message.length} / {MAX_MESSAGE_LENGTH}
                </span>
              </FieldFrame>
            </motion.div>

            {/* ── Error / Success Messages ── */}
            <AnimatePresence mode="wait">
              {state === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm font-semibold leading-6 text-red-100"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-300"
                  />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}

              {state === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm font-semibold leading-6 text-emerald-100"
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-300"
                  />
                  Message sent successfully. Thanks for reaching out!
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Submit Button ── */}
            <div className="flex flex-col pt-2" style={{ gap: "0.75rem" }}>
              <motion.button
                type="submit"
                disabled={disabled}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 10px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.5), 0 0 0px rgba(34,211,238,0)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -4px 10px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.1)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1],
                  boxShadow: { type: "spring", bounce: 0.4, duration: 0.6 }
                }}
                whileHover={disabled ? undefined : { 
                  y: -2, 
                  scale: 1.01,
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -4px 10px rgba(0,0,0,0.8), 0 12px 25px rgba(0,0,0,0.6), 0 0 25px rgba(34,211,238,0.25)" 
                }}
                whileTap={disabled ? undefined : { 
                  scale: 0.98, 
                  y: 2, 
                  boxShadow: "inset 0 4px 12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.5), 0 0 10px rgba(34,211,238,0)",
                  transition: { type: "spring", stiffness: 400, damping: 25, mass: 0.8 }
                }}
                className="group relative w-full cursor-pointer overflow-hidden px-6 text-[14px] font-extrabold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:cursor-not-allowed disabled:opacity-70"
                style={{ 
                  height: "54px", 
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, #1e293b, #020617)",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                {/* Expanding Concentric Ripple Rings */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="ripple" style={{ animationDelay: "0s" }} />
                  <div className="ripple" style={{ animationDelay: "2s" }} />
                  <div className="ripple" style={{ animationDelay: "4s" }} />
                </div>

                {/* Sunlight Shine Sweep */}
                <span 
                  className="absolute inset-0 w-[80%] pointer-events-none mix-blend-screen"
                  style={{ 
                    background: "linear-gradient(105deg, transparent, rgba(255,244,222,0.13), rgba(150,225,255,0.08), transparent)",
                    animation: "still-shine-sweep 5s linear infinite" 
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "loading" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5"
                      >
                        <Loader2 size={19} className="animate-spin" />
                        Sending...
                      </motion.span>
                    ) : state === "success" ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.82 }}
                        className="flex items-center gap-2.5"
                      >
                        <Check size={20} />
                        Sent Successfully
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5"
                      >
                        <Send
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>

              {/* ── Privacy Footer ── */}
              <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-white/32">
                <Lock size={13} className="shrink-0 text-white/28" />
                Your information will be kept confidential.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
