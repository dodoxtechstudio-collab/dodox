import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import p1 from "@/assets/project-extension.jpg";
import p2 from "@/assets/project-silambam.jpg";
import p3 from "@/assets/project-n8n.jpg";
import p4 from "@/assets/project-erp.jpg";
import p5 from "@/assets/project-school.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

type Project = {
  img: string;
  tag: string;
  title: string;
  desc: string;
  tech: string[];
  link?: string;
  year: string;
  color: string; // accent tint
};

const projects: Project[] = [
  {
    img: p1, tag: "Chrome Extension · AI", year: "2025",
    title: "AI-Powered Product Extraction Extension",
    desc: "Smart browser extension that automates product data extraction using AI-powered attribute matching and schema-based processing.",
    tech: ["Chrome APIs", "JavaScript", "JSON", "Excel"],
    color: "rgba(103,232,249,0.08)",
  },
  {
    img: p2, tag: "Mobile App", year: "2025",
    title: "Vagai Silambam Management App",
    desc: "Modern mobile application for managing student attendance, records and training workflows for martial arts institutions.",
    tech: ["React Native", "Realtime", "Dashboard"],
    link: "https://vagai-silambam.lovable.app",
    color: "rgba(209,213,219,0.06)",
  },
  {
    img: p3, tag: "AI Automation · n8n", year: "2025",
    title: "AI-Powered N8N Automation System",
    desc: "Automated ERP document processing using n8n, OCR and AI classification — invoices, POs, RFQs and quotations.",
    tech: ["n8n", "MongoDB", "OCR", "AI"],
    color: "rgba(103,232,249,0.08)",
  },
  {
    img: p4, tag: "ERPNext", year: "2024",
    title: "ERPNext Textile & Manufacturing Solution",
    desc: "Customized ERPNext implementation for purchase, sales, inventory, invoicing, payments and production workflows.",
    tech: ["ERPNext", "Custom Modules", "API"],
    color: "rgba(209,213,219,0.06)",
  },
  {
    img: p5, tag: "ERPNext · Education", year: "2024",
    title: "ERPNext School Management System",
    desc: "Customized ERPNext platform for admissions, fees, attendance, timetables, exams and staff management.",
    tech: ["ERPNext", "Workflows", "Reports"],
    color: "rgba(103,232,249,0.06)",
  },
];

const projectCategories = ["All", "AI Automation", "ERPNext", "Mobile Apps"];

/** Fires once when the element enters viewport — zero JS scroll overhead */
function useOnce(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.visible = "true";
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.dataset.visible = "true"; obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── Mobile stack card ───────────────────────────────────────────────── */
function MobileCard({ p, i }: { p: Project; i: number }) {
  const ref = useOnce(0.08) as React.RefObject<HTMLElement>;
  return (
    <article
      ref={ref}
      className="project-reveal group glass-strong rounded-3xl overflow-hidden hairline-border"
      data-visible={undefined}
      style={{ animationDelay: `${i * 0.07}s` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={p.img} alt={p.title} loading="lazy" decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-[#030712]/20 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/85">{p.tag}</span>
          <span className="glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/50">{p.year}</span>
        </div>
        <div className="absolute bottom-3 right-3 glass rounded-full px-2.5 py-1 text-[10px] tracking-widest text-white/60">
          {String(i + 1).padStart(2, "0")}
        </div>
      </div>
        <div className="p-5">
        <h3 className="text-base font-semibold text-white/95 tracking-tight leading-snug">{p.title}</h3>
        <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-widest text-white/50 glass px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ─── Desktop editorial row ───────────────────────────────────────────── */
function DesktopRow({ p, i, total }: { p: Project; i: number; total: number }) {
  const rowRef   = useOnce(0.05) as React.RefObject<HTMLElement>;
  const imgRef   = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const reverse  = i % 2 === 1;

  // Add visible class to child elements on parent reveal
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.dataset.visible === "true") {
        if (imgRef.current)  imgRef.current.dataset.visible  = "true";
        if (textRef.current) textRef.current.dataset.visible = "true";
        obs.disconnect();
      }
    });
    obs.observe(el, { attributes: true });
    return () => obs.disconnect();
  }, [rowRef]);

  return (
    <article
      ref={rowRef}
      className="project-reveal group py-16 grid lg:grid-cols-12 gap-8 lg:gap-14 items-center border-t border-white/[0.06] first:border-t-0"
      data-visible={undefined}
    >
      {/* Index number — big typographic accent */}
      <div
        ref={imgRef as React.RefObject<HTMLDivElement>}
        className={`lg:col-span-7 project-reveal-left ${reverse ? "lg:order-2" : ""}`}
        data-visible={undefined}
      >
        <div
          className="relative rounded-3xl overflow-hidden glass-strong hairline-border transition-transform duration-500 ease-out hover:scale-[1.013]"
          style={{ boxShadow: `0 0 60px ${p.color}, 0 0 0 1px rgba(255,255,255,0.06)` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={p.img} alt={p.title} loading="lazy" decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#030712]/50 via-transparent to-transparent pointer-events-none" />

            {/* Tag badge */}
            <div className="absolute top-4 left-4">
              <span className="glass-strong rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-widest text-white/90 font-medium">
                {p.tag}
              </span>
            </div>

            {/* Project counter */}
            <div className="absolute bottom-4 right-4 font-mono text-[11px] text-white/40 tracking-widest">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>

            {/* Shimmer on hover */}
            <div
              className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-[200%] skew-x-12"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                transition: "transform 1.0s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Text column */}
      <div
        ref={textRef as React.RefObject<HTMLDivElement>}
        className={`lg:col-span-5 project-reveal-right ${reverse ? "lg:order-1" : ""}`}
        data-visible={undefined}
      >
        {/* Large typographic index */}
        <div className="text-[80px] font-black leading-none text-white/[0.04] select-none mb-1 -ml-1 font-mono">
          {String(i + 1).padStart(2, "0")}
        </div>

        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-3 font-semibold -mt-2">
          {p.year} · Case Study
        </p>
        <h3 className="text-2xl md:text-[1.75rem] font-bold text-platinum tracking-tight leading-[1.18]">
          {p.title}
        </h3>
        <p className="mt-4 text-white/55 leading-relaxed text-sm md:text-[0.95rem]">
          {p.desc}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-widest text-white/50 glass px-3 py-1 rounded-full font-medium transition-colors duration-200 hover:text-white/80"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8">
          {p.link ? (
            <a
              href={p.link} target="_blank" rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2.5 rounded-full silver-gradient text-[#030712] px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform duration-300"
            >
              View Project
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:scale-110" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-white/55">
              Private Engagement <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export function Projects() {
  const isMobile = useIsMobile();
  const headRef = useOnce(0.1) as React.RefObject<HTMLElement>;
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI Automation") return p.tag.includes("AI");
    if (activeCategory === "ERPNext") return p.tag.includes("ERPNext");
    if (activeCategory === "Mobile Apps") return p.tag.includes("Mobile App");
    return true;
  });

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      {/* Static ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Header */}
        <header
          ref={headRef}
          className="project-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
          data-visible={undefined}
        >
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 mb-4 font-semibold">
              Selected Work
            </p>
            <h2 className="text-[clamp(1.85rem,4.5vw,3.5rem)] font-bold tracking-tight text-platinum leading-[1.05]">
              Project builds for
              <br />
              <span className="italic font-light text-silver-glow">real-world businesses.</span>
            </h2>
          </div>
          <p className="text-white/45 max-w-xs text-sm leading-relaxed">
            A curated selection of recent engagements — from AI automation to enterprise ERP.
          </p>
        </header>

        {/* Premium Category Filter Bar */}
        <div className="flex flex-wrap gap-2 pt-2 mb-10">
          {projectCategories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  active
                    ? "silver-gradient text-[#030712] shadow-[0_0_15px_rgba(103,232,249,0.25)] scale-102"
                    : "bg-white/[0.02] border border-white/5 text-white/55 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {isMobile ? (
              <motion.div 
                layout 
                className="grid gap-5"
                key={`mobile-grid-${activeCategory}`}
              >
                {filteredProjects.map((p, i) => (
                  <motion.div
                    layout
                    key={p.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <MobileCard p={p} i={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                layout 
                className="space-y-0"
                key={`desktop-grid-${activeCategory}`}
              >
                {filteredProjects.map((p, i) => (
                  <motion.div
                    layout
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <DesktopRow p={p} i={i} total={filteredProjects.length} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
