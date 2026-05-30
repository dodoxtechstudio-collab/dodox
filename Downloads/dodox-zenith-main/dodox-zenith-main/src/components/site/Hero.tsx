import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CodeWindow } from "./CodeWindow";
import { useRef, useEffect, useState } from "react";

const TAGLINES = ["Build Smarter.", "Scale Faster.", "Automate More.", "Ship Sooner."];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TAGLINES[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 65);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIdx((p) => (p + 1) % TAGLINES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-[var(--cyan-soft)]/90">
      {displayed}
      <span className="animate-cursor-blink inline-block w-0.5 h-[0.85em] bg-[#67e8f9] ml-0.5 align-middle" />
    </span>
  );
}

// Only used on desktop — no mobile overhead
function MagneticWrapper({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // ── Scroll parallax — DESKTOP ONLY ──────────────────────────────
  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "25%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "15%"]);
  const cardY  = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);

  // ── 3D tilt — DESKTOP ONLY ──────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);
  const springRX = useSpring(rotateX, { stiffness: 160, damping: 32 });
  const springRY = useSpring(rotateY, { stiffness: 160, damping: 32 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Static ambient background — no animated gradients */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="grid-mask absolute inset-0" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full blur-3xl bg-[#67e8f9]/[0.07] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full blur-3xl bg-white/[0.03] pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center"
      >
        {/* ── Left content ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/70 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--cyan-soft)]" />
            Next-gen DodoX Tech studio · 2026
          </motion.div>

          <h1 className="text-[clamp(2rem,8vw,5.25rem)] leading-[1.05] font-semibold tracking-tight">
            {["Still", "Managing", "Your"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-platinum inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {["Business", "Manually?"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-platinum inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="text-silver-glow italic font-light"
            >
              <Typewriter />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed"
          >
            DodoX Tech builds custom digital solutions that automate business operations,
            improve productivity, and accelerate growth — engineered with luxurious precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <MagneticWrapper>
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full silver-gradient text-[#030712] px-6 sm:px-7 py-3.5 font-medium ambient-halo transition-transform hover:-translate-y-0.5">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 sm:px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition">
                Book Free Consultation
              </a>
            </MagneticWrapper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/35"
          >
            {["ERPNext", "React", "AI Automation", "Mobile app","DevOps & Cloud"].map((tech, i) => (
              <span key={tech} className={`cursor-default transition-colors hover:text-white/70 ${tech === "MongoDB" ? "hidden sm:inline" : ""}`}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: floating code window (desktop 3D tilt) ── */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          <motion.div
            style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d", perspective: 1000 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden ambient-halo animate-float"
          >
            <CodeWindow />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#030712]/40 via-transparent to-transparent" />
          </motion.div>

          {/* Floating stat cards — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, x: -3 }}
            className="absolute -left-6 top-16 glass-strong rounded-2xl px-4 py-3 hidden md:block cursor-default"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Uptime</div>
            <div className="text-xl font-semibold text-platinum">99.99%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, x: 3 }}
            className="absolute -right-4 bottom-10 glass-strong rounded-2xl px-4 py-3 hidden md:block cursor-default"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Workflows</div>
            <div className="text-xl font-semibold text-platinum">+82 automated</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute -right-2 top-6 glass-strong rounded-2xl px-3 py-2 hidden md:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Clients</div>
            <div className="text-base font-semibold text-[var(--cyan-soft)]">50+ ✓</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">Scroll</span>
      </motion.div>
    </section>
  );
}
